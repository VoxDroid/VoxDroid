import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { editions } from "@/editions";
import { getProject, getProjects, getReadme } from "@/lib/content";
import { getEdition } from "@/lib/edition-server";

type Props = { params: Promise<{ slug: string }> };

// Every project is known at build time; any other slug is a 404 rendered by app/not-found.tsx
// inside the edition layout, never a bare error shell.
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return {
    title: project.name,
    description:
      project.summary ||
      `${project.name}, a ${project.category.toLowerCase()} by VoxDroid.`,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const { Detail } = editions[await getEdition()];
  return (
    <Detail
      project={project}
      readme={project.private ? null : getReadme(project.slug)}
    />
  );
}
