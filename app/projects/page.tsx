import type { Metadata } from "next";
import { editions } from "@/editions";
import { getProjects } from "@/lib/content";
import { CATEGORIES } from "@/lib/content/schema";
import { getEdition } from "@/lib/edition-server";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Every project by VoxDroid: apps, command-line tools, developer tools and learning material.",
};

export default async function ProjectsPage() {
  const { ProjectsIndex } = editions[await getEdition()];
  const projects = getProjects();
  const present = new Set(projects.map((p) => p.category));
  return (
    <ProjectsIndex
      projects={projects}
      categories={CATEGORIES.filter((c) => present.has(c))}
    />
  );
}
