import { getFeaturedProjects, getGitHubUserStats } from "@/lib/github"
import HomeClient from "@/components/home-client"

export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  const [featuredProjects, githubStats] = await Promise.all([
    getFeaturedProjects(),
    getGitHubUserStats("VoxDroid")
  ])
  
  return <HomeClient featuredProjects={featuredProjects} githubStats={githubStats} />
}

