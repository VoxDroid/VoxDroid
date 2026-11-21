import type { Category } from "./content/schema";

const STAGES: { name: string; categories: Category[] }[] = [
  {
    name: "Apps",
    categories: [
      "Web App",
      "Desktop App",
      "iOS App",
      "Android App",
      "Web Template",
    ],
  },
  { name: "CLI & dev tools", categories: ["CLI Tool", "Dev Tool"] },
  {
    name: "Learning & research",
    categories: ["Educational", "AI/ML/DL", "Other"],
  },
];

/** Groups projects into festival stages by category, keeping their order; empty stages are dropped. */
export function stagesFor<P extends { category: Category }>(projects: P[]) {
  return STAGES.map((stage) => ({
    name: stage.name,
    projects: projects.filter((p) => stage.categories.includes(p.category)),
  })).filter((stage) => stage.projects.length > 0);
}
