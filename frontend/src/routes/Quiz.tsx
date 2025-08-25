// src/routes/Quiz.tsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ExamAPI, Item } from "@/lib/exam-api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle, ArrowRight, Brain } from "lucide-react";

type Step = "intro" | "test" | "results";
type NavState = { items?: Item[] };

export default function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const passed: Item[] = ((location.state as NavState | undefined)?.items) ?? [];

  const [step, setStep] = useState<Step>(passed.length ? "test" : "intro");
  const [items, setItems] = useState<Item[]>(passed);
  const [idx, setIdx] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string>("");

  const startDefault = async () => {
    const page = await ExamAPI.listItems({ limit: 20 });
    setItems(page.results ?? []);
    setIdx(0);
    setAnswers({});
    setSelected("");
    setTimeRemaining(30 * 60);
    setStep("test");
  };

  const startPassed = () => {
    setItems(passed);
    setIdx(0);
    setAnswers({});
    setSelected("");
    setTimeRemaining(30 * 60);
    setStep("test");
  };

  // timer
  useEffect(() => {
    if (step !== "test") return;
    if (timeRemaining <= 0) {
      setStep("results");
      return;
    }
    const t = setInterval(() => setTimeRemaining((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [step, timeRemaining]);

  const progress = useMemo(
    () => (items.length ? ((idx + 1) / items.length) * 100 : 0),
    [idx, items.length]
  );

  const score = useMemo(() => {
    let correct = 0;
    for (const it of items) {
      const userLetter = (answers[it.uid] ?? "").trim().toUpperCase();
      if (!userLetter) continue;
      const okLetters = (it.correct_answers ?? []).map((x) => String(x).trim().toUpperCase());
      if (okLetters.includes(userLetter)) correct++;
    }
    const total = items.length || 1;
    return { correct, total, pct: Math.round((correct / total) * 100) };
  }, [answers, items]);


  const current = items[idx];
  const formatTime = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
  const optionLetter = (i: number) => String.fromCharCode(65 + i);

    const options = useMemo(() => {
    if (!current) return [] as { key: string; html: string }[];

    const ao = (current as any).answer_options as string[] | undefined;
    if (Array.isArray(ao) && ao.length) {
        return ao.map((html, i) => ({ key: optionLetter(i), html: html ?? "" }));
    }

    const contentAO = (current as any)?.content?.answerOptions as any[] | undefined;
    if (Array.isArray(contentAO) && contentAO.length) {
        return contentAO.map((opt: any, i: number) => {
        const html = typeof opt === "string" ? opt : (opt?.content ?? "");
        return { key: optionLetter(i), html: html ?? "" };
        });
    }

  return [
    { key: "A", html: "" },
    { key: "B", html: "" },
    { key: "C", html: "" },
    { key: "D", html: "" },
  ];
}, [current]);


  if (step === "intro") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="question-card max-w-2xl">
          <CardHeader className="text-center">
            <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
            
            <CardDescription className="text-lg">
              Start a 30-minute timed quiz using selected items or a default set.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-3">
              <Button size="lg" className="w-full" onClick={startDefault}>
                Start 30-min Quiz
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={startPassed}
                disabled={passed.length === 0}
                title={passed.length ? "" : "Open from Question Bank to select items"}
              >
                Use Selected Items ({passed.length || 0})
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "test") {
    const q = current!;
    const alreadyAnswered = !!answers[q.uid];
    const showRationale = alreadyAnswered || !!selected;

    const stemHTML = q.stem || "";
    const rationaleHTML = q.rationale || "";

    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Question {idx + 1} of {items.length}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono text-sm">{formatTime(timeRemaining)}</span>
                </div>
              </div>
            </div>
            <Progress value={progress} className="mt-2" />
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Card className="question-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {q.module?.toUpperCase()} {q.difficulty ? `• ${String(q.difficulty).toUpperCase()}` : ""}
                  </CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {idx + 1}/{items.length}
                  </span>
                </div>
                <CardDescription className="text-xs">
                  {q.question_id ? `QID ${q.question_id}` : ""} {q.primary_class_desc ? `• ${q.primary_class_desc}` : ""}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">

                <div className="prose prose-sm max-w-none text-foreground" dangerouslySetInnerHTML={{ __html: stemHTML }} />

                {/* Options */}
                <div className="space-y-3">
                  {options.map((opt) => {
                    const isSelected = selected === opt.key;
                    return (
                      <div
                        key={opt.key}
                        className={`choice-option ${isSelected ? "selected" : ""}`}
                        onClick={() => setSelected(opt.key)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 border border-border rounded-full flex items-center justify-center text-sm font-medium bg-background">
                            {opt.key}
                          </div>
                          <div
                            className="flex-1 prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: opt.html || "" }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {showRationale && !!rationaleHTML && (
                  <div className="mt-4 p-3 rounded-md bg-muted/40">
                    <div className="text-sm font-semibold mb-1">Rationale</div>
                    <div
                      className="prose prose-sm max-w-none text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: rationaleHTML }}
                    />
                  </div>
                )}

                {/* Nav */}
                <div className="flex justify-between pt-6">
                  <Button variant="outline" disabled={idx === 0} onClick={() => setIdx((i) => Math.max(0, i - 1))}>
                    Previous
                  </Button>
                  <Button
                    onClick={() => {
                      const qid = q.uid;
                      setAnswers((a) => ({ ...a, [qid]: selected || a[qid] || "" }));
                      setSelected("");
                      if (idx < items.length - 1) setIdx(idx + 1);
                      else setStep("results");
                    }}
                    disabled={!selected && !alreadyAnswered}
                  >
                    {idx === items.length - 1 ? "Finish" : "Next"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="question-card max-w-2xl">
        <CardHeader className="text-center">
          <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
          <CardTitle className="text-3xl font-display">Assessment Complete!</CardTitle>
          <CardDescription className="text-lg">Here’s how you did.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-success-light rounded-lg">
              <div className="text-2xl font-bold text-success-foreground">{score.pct}%</div>
              <p className="text-sm text-success-foreground">Overall Score</p>
            </div>
            <div className="p-4 bg-accent rounded-lg">
              <div className="text-2xl font-bold text-accent-foreground">
                {score.correct}/{score.total}
              </div>
              <p className="text-sm text-accent-foreground">Correct</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
