// Mock data + types simulating an AI analysis pipeline.
// Replace with real API calls (e.g. /api/analyze) when backend is wired.

export interface AnalysisResult {
  filename: string;
  atsScore: number;
  breakdown: { label: string; score: number }[];
  skills: { name: string; level: number }[];
  skillGaps: { skill: string; importance: "high" | "medium" | "low"; reason: string }[];
  suggestions: { title: string; detail: string; impact: "high" | "medium" | "low" }[];
  jobMatches: { title: string; company: string; match: number; location: string }[];
  interviewQuestions: { question: string; category: string; difficulty: "easy" | "medium" | "hard" }[];
}

export const mockAnalysis: AnalysisResult = {
  filename: "Resume_2026.pdf",
  atsScore: 82,
  breakdown: [
    { label: "Keyword Match", score: 78 },
    { label: "Formatting", score: 92 },
    { label: "Experience Depth", score: 85 },
    { label: "Education", score: 88 },
    { label: "Skills Coverage", score: 70 },
    { label: "Action Verbs", score: 80 },
  ],
  skills: [
    { name: "React", level: 92 },
    { name: "TypeScript", level: 88 },
    { name: "Node.js", level: 80 },
    { name: "AWS", level: 65 },
    { name: "System Design", level: 58 },
    { name: "GraphQL", level: 72 },
  ],
  skillGaps: [
    { skill: "Kubernetes", importance: "high", reason: "Required by 78% of matched senior roles" },
    { skill: "Rust", importance: "medium", reason: "Trending in backend infra postings" },
    { skill: "LLM Ops", importance: "high", reason: "Strong demand in AI-forward companies" },
  ],
  suggestions: [
    { title: "Quantify your impact", detail: "Add metrics (%, $, users) to at least 3 more bullets.", impact: "high" },
    { title: "Lead with action verbs", detail: "Replace 'Responsible for' phrasing with 'Led', 'Shipped', 'Architected'.", impact: "medium" },
    { title: "Tighten the summary", detail: "Cut your intro to 2 lines focused on your top 2 differentiators.", impact: "medium" },
    { title: "Add a Projects section", detail: "Showcase 2-3 side projects with links to demonstrate range.", impact: "low" },
  ],
  jobMatches: [
    { title: "Senior Frontend Engineer", company: "Linear", match: 94, location: "Remote" },
    { title: "Full-Stack Engineer", company: "Vercel", match: 89, location: "SF / Remote" },
    { title: "Product Engineer", company: "Notion", match: 86, location: "NYC" },
    { title: "Staff Engineer, Platform", company: "Stripe", match: 79, location: "Remote" },
  ],
  interviewQuestions: [
    { question: "Walk me through how you'd architect a real-time collaborative editor.", category: "System Design", difficulty: "hard" },
    { question: "Describe a time you reduced bundle size or improved perceived performance.", category: "Behavioral", difficulty: "medium" },
    { question: "How do you decide between SSR, SSG, and CSR for a new page?", category: "Frontend", difficulty: "medium" },
    { question: "Explain the difference between useMemo and useCallback with a concrete example.", category: "React", difficulty: "easy" },
    { question: "How would you design rate limiting for a public API?", category: "Backend", difficulty: "hard" },
  ],
};
