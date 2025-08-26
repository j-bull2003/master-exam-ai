const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

export type Assessment = { id: number; name: string };
export type Test = { id: number; name: string };
export type Domain = { id: number; code: string; name: string };
export type Skill = { id: number; code: string; name: string; domain: number };
export type Item = {
  uid: string; // UUID primary key
  question_id?: string | null;
  program: string;     // "SAT", "PSAT"
  module: string;      // "math", "reading"
  difficulty?: string | null; // "easy|med|hard" or arbitrary
  primary_class_cd?: string | null;
  primary_class_desc?: string | null;
  score_band_range_cd?: number | null;

  assessment?: number | null;
  test?: number | null;
  domain?: number | null;
  skill?: number | null;

  stem: string;
  rationale: string;
  external_id?: string | null;
  correct_answers: string[]; // expecting array of option letters or values
  update_date?: number | null;
  create_date?: number | null;

  // --- UI helper fields (your serializer can add these) ---
  // If your items store options in another table, have the API expand them:
  // e.g. [{"key":"A","text":"..."}, ...]
  choices?: { key: string; text: string }[];
};

export type Paginated<T> = { results: T[]; next: string | null; previous: string | null; count: number };

export async function fetchJSON<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { headers: { "Content-Type": "application/json" }, ...init });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export const ExamAPI = {
  listAssessments: () => fetchJSON<Assessment[]>(`${API_BASE}/assessments/`),
  listTests: () => fetchJSON<Test[]>(`${API_BASE}/tests/`),
  listDomains: () => fetchJSON<Domain[]>(`${API_BASE}/domains/`),
  listSkills: (domainId?: number) =>
    fetchJSON<Skill[]>(`${API_BASE}/skills/${domainId ? `?domain=${domainId}` : ""}`),

  /** Query params you likely expose from DRF:
   *  ?assessment=<id>&test=<id>&domain=<id>&skill=<id>&module=math&difficulty=easy&limit=50&offset=0
   */
  listItems: (params: Record<string, string | number | undefined> = {}) => {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) qs.set(k, String(v));
    });
    return fetchJSON<Paginated<Item>>(`${API_BASE}/items/${qs.toString() ? `?${qs}` : ""}`);
  },
};
