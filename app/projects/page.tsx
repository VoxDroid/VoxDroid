import { getAllProjects } from "@/lib/github"
import ProjectsClient from "@/components/projects-client"
import { projectCategories } from "@/config/projects"

// Revalidate every hour
export const revalidate = 3600

export const metadata = {
  title: "Projects | VoxDroid",
  description: "Explore my GitHub projects and repositories",
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()
  
  return <ProjectsClient projects={projects} categories={projectCategories} />
}

