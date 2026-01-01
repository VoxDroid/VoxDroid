import { getFeaturedProjects } from "@/lib/github"
import HomeClient from "@/components/home-client"

export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  const featuredProjects = await getFeaturedProjects()
  
  return <HomeClient featuredProjects={featuredProjects} />
}

