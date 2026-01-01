import { notFound } from "next/navigation"
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/github"
import ProjectDetailClient from "@/components/project-detail-client"

// Revalidate every hour
export const revalidate = 3600

// Generate static params for all projects
export async function generateStaticParams() {
  const slugs = getAllProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: "Project Not Found | VoxDroid",
    }
  }

  return {
    title: `${project.name} | VoxDroid Projects`,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      type: "website",
      images: project.image ? [project.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.description,
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetailClient project={project} />
}
