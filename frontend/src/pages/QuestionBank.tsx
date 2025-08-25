import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ExamAPI, Item } from "@/lib/exam-api";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { BookOpen, Filter, RefreshCw, PlayCircle, MoreVertical } from "lucide-react";

function useDebounced<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

const PAGE_SIZE = 50;          
const LOAD_MORE_TARGET = 50;   
const INDEX_SCAN_CAP = 200;     
const FILTER_SCAN_CAP = 40;     

export default function QuestionBank() {
  const navigate = useNavigate();

  const [items, setItems] = useState<Item[]>([]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dense, setDense] = useState(false);

  const [primaryClass, setPrimaryClass] = useState<string | undefined>();
  const debouncedPrimaryClass = useDebounced(primaryClass, 200);

  const [allPrimaryClasses, setAllPrimaryClasses] = useState<string[]>([]);
  const [buildingIndex, setBuildingIndex] = useState(false);
  const indexAbortRef = useRef<{ aborted: boolean }>({ aborted: false });

  const DifficultyChip = ({ value }: { value?: string | null }) => {
    if (!value) return <Badge variant="secondary">—</Badge>;
    const v = value.toLowerCase().trim();
    if (v === "e" || v.includes("easy")) {
      return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">E</Badge>;
    }
    if (v === "m" || v.includes("medium")) {
      return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">M</Badge>;
    }
    if (v === "h" || v.includes("hard")) {
      return <Badge variant="destructive" className="bg-error/10 text-error border-error/20">H</Badge>;
    }
    return <Badge variant="outline">{value}</Badge>;
  };

  const matchesFilter = useCallback(
    (i: Item) => {
      if (!debouncedPrimaryClass) return true;
      return (i.primary_class_desc ?? "").trim() === debouncedPrimaryClass.trim();
    },
    [debouncedPrimaryClass]
  );

  const fetchFirstPage = useCallback(async (extraParams: Record<string, any> = {}) => {
    const params = { limit: PAGE_SIZE, ...(debouncedPrimaryClass ? { primary_class_desc: debouncedPrimaryClass } : {}), ...extraParams };
    return ExamAPI.listItems(params);
  }, [debouncedPrimaryClass]);

  const load = useCallback(async (reset = true) => {
    setLoading(true);
    setError(null);
    try {
      if (!debouncedPrimaryClass) {
        const { results = [], next = null } = await fetchFirstPage();
        setItems(results);
        setNextUrl(next);
        setSelected({});
      } else {
        const seen: Item[] = [];
        let { results = [], next = null } = await fetchFirstPage();
        seen.push(...results.filter(matchesFilter));

        let pagesScanned = 1;
        while (seen.length < PAGE_SIZE && next && pagesScanned < FILTER_SCAN_CAP) {
          const res = await fetch(next);
          if (!res.ok) break;
          const data = await res.json();
          results = data?.results ?? [];
          next = data?.next ?? null;
          seen.push(...results.filter(matchesFilter));
          pagesScanned += 1;
        }

        setItems(seen);
        setNextUrl(next);
        setSelected({});
      }
    } catch (e: any) {
      setError(e?.message || "Failed to load items");
    } finally {
      setLoading(false);
    }
  }, [debouncedPrimaryClass, fetchFirstPage, matchesFilter]);

  const loadMore = useCallback(async () => {
    if (!nextUrl) return;
    setLoading(true);
    try {
      if (!debouncedPrimaryClass) {
        const res = await fetch(nextUrl);
        const data = await res.json();
        const results: Item[] = data?.results ?? [];
        setItems(prev => [...prev, ...results]);
        setNextUrl(data?.next ?? null);
      } else {
        let url: string | null = nextUrl;
        const acc: Item[] = [];
        let pagesScanned = 0;

        while (url && acc.length < LOAD_MORE_TARGET && pagesScanned < FILTER_SCAN_CAP) {
          const res = await fetch(url);
          if (!res.ok) break;
          const data = await res.json();
          const results: Item[] = data?.results ?? [];
          acc.push(...results.filter(matchesFilter));
          url = data?.next ?? null;
          pagesScanned += 1;
        }

        setItems(prev => [...prev, ...acc]);
        setNextUrl(url);
      }
    } finally {
      setLoading(false);
    }
  }, [nextUrl, debouncedPrimaryClass, matchesFilter]);

  const buildPrimaryClassIndex = useCallback(async () => {
    setBuildingIndex(true);
    indexAbortRef.current.aborted = false;
    try {
      const seen = new Set<string>();

      const first = await ExamAPI.listItems({ limit: 200 });
      (first.results ?? []).forEach((i: Item) => {
        const s = (i?.primary_class_desc ?? "").trim();
        if (s) seen.add(s);
      });

      let next = first.next;
      let pagesScanned = 1;

      while (next && !indexAbortRef.current.aborted && pagesScanned < INDEX_SCAN_CAP) {
        const res = await fetch(next);
        if (!res.ok) break;
        const data = await res.json();
        (data?.results ?? []).forEach((i: Item) => {
          const s = (i?.primary_class_desc ?? "").trim();
          if (s) seen.add(s);
        });
        next = data?.next ?? null;
        pagesScanned += 1;
      }

      if (!indexAbortRef.current.aborted) {
        setAllPrimaryClasses(Array.from(seen).sort((a, b) => a.localeCompare(b)));
      }
    } catch {
    } finally {
      if (!indexAbortRef.current.aborted) setBuildingIndex(false);
    }
  }, []);

  // Initial load + index build
  useEffect(() => {
    load(true);
    buildPrimaryClassIndex();
    return () => {
      indexAbortRef.current.aborted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load(true);
  }, [load]);

  const selectedItems = useMemo(
    () => items.filter(i => selected[i.uid]),
    [items, selected]
  );

  const startQuiz = () => {
    if (selectedItems.length === 0) return;
    navigate("/quiz", { state: { items: selectedItems } });
  };

  return (
    <Card className="border-border/40">
      <CardHeader className="border-b border-border/40 bg-muted/20">
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-primary" />
              Question Bank
            </CardTitle>
            <CardDescription className="text-sm">
              Filter quizzes by subject
            </CardDescription>
          </div>

          <div className="flex gap-2">
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              Dense
              <Switch checked={dense} onCheckedChange={setDense} className="data-[state=checked]:bg-primary" />
            </div>
            <Button
              variant="outline"
              onClick={() => {
                load(true);
                buildPrimaryClassIndex();
              }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button disabled={selectedItems.length === 0} onClick={startQuiz}>
              <PlayCircle className="h-4 w-4 mr-2" />
              Start Quiz ({selectedItems.length})
            </Button>
          </div>
        </div>

        {/* The ONLY filter (fed by global index) */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2">
          <Select
            value={primaryClass ?? "all"}
            onValueChange={(v) => setPrimaryClass(v === "all" ? undefined : v)}
          >
            <SelectTrigger>
              <SelectValue placeholder={buildingIndex ? "Loading subjects…" : "Primary class (Any)"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              {allPrimaryClasses.map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {error && <div className="px-4 pt-4 text-sm text-red-600">{error}</div>}

        {loading && items.length === 0 ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="grid grid-cols-12 gap-3 items-center">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 col-span-7" />
                <Skeleton className="h-4 col-span-2" />
                <Skeleton className="h-4 col-span-2" />
                <Skeleton className="h-6 w-8 justify-self-end" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <Table>
              <TableHeader className="bg-muted/30 sticky top-0 z-10">
                <TableRow className="border-border/40 hover:bg-muted/50">
                  <TableHead className={dense ? "py-2" : "py-3"}>Select</TableHead>
                  <TableHead className={dense ? "py-2" : "py-3"}>Quiz</TableHead>
                  <TableHead className={dense ? "py-2" : "py-3"}>Primary Class</TableHead>
                  <TableHead className={dense ? "py-2" : "py-3"}>Module</TableHead>
                  <TableHead className={dense ? "py-2" : "py-3"}>Difficulty</TableHead>
                  <TableHead className={dense ? "py-2" : "py-3"}></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                      {debouncedPrimaryClass
                        ? `No items found for "${debouncedPrimaryClass}".`
                        : "No items found."}
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map(item => {
                    const isChecked = !!selected[item.uid];
                    return (
                      <TableRow
                        key={item.uid}
                        className="border-border/40 hover:bg-muted/30 cursor-pointer"
                        onClick={() => setSelected(prev => ({ ...prev, [item.uid]: !isChecked }))}
                        onDoubleClick={() => navigate("/quiz", { state: { items: [item] } })}
                      >
                        <TableCell className={dense ? "py-2" : "py-3"} onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => setSelected(prev => ({ ...prev, [item.uid]: e.target.checked }))}
                          />
                        </TableCell>

                        {/* STEM */}
                        <TableCell className={`max-w-[700px] ${dense ? "py-2" : "py-3"}`}>
                          <div
                            className="prose prose-sm max-w-none text-foreground line-clamp-3 [&_*]:!my-0"
                            dangerouslySetInnerHTML={{ __html: item.stem || "" }}
                          />
                          <div className="text-xs text-muted-foreground mt-1">
                            {item.primary_class_desc ? ` • ${item.primary_class_desc}` : ""}
                          </div>
                        </TableCell>

                        <TableCell className={dense ? "py-2" : "py-3"}>
                          <Badge variant="secondary">{item.primary_class_desc || "—"}</Badge>
                        </TableCell>

                        <TableCell className={dense ? "py-2" : "py-3"}>
                          <Badge variant="outline">{item.module || "—"}</Badge>
                        </TableCell>

                        <TableCell className={dense ? "py-2" : "py-3"}>
                          <DifficultyChip value={item.difficulty} />
                        </TableCell>

                        <TableCell className={dense ? "py-2" : "py-3"}>
                          <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>

            <div className="p-4 flex items-center justify-between text-sm text-muted-foreground">
              <div>Shown: {items.length}</div>
              <div className="flex items-center gap-2">
                <div>Selected: {selectedItems.length}</div>
                {nextUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={loading}
                    onClick={loadMore}
                  >
                    Load more
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
