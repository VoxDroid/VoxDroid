import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Github, ExternalLink, Calendar, Tag } from "lucide-react"
import ImageGallery from "@/components/image-gallery"

const project = {
  id: 1,
  title: "VoxDroid's Project",
  description:
    "My project description.",
  longDescription: `
    My long description.

    This is a longer description that can span multiple lines.

    Here's another line.
  `,
  image: "/profile/VoxDroid.jpg",
  date: "March 2025",
  client: "Open Source Community",
  role: "Lead Developer",
  tags: ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"],
  category: "Development",
  github: "https://github.com/VoxDroid",
  demo: "#",
  screenshots: [
    "/profile/VoxDroid.jpg?height=400&width=800&text=Image1",
    "/profile/VoxDroid.jpg?height=400&width=800&text=Image1",
    "/profile/VoxDroid.jpg?height=400&width=800&text=Image1",
    "/profile/VoxDroid.jpg?height=400&width=800&text=Image1",
  ],
  features: [
    "Feature 1",
    "Feature 2",
    "Feature 3",
    "Feature 4",
    "Feature 5",
    "Feature 6",
    "Feature 7",
    "Feature 8",
    "Feature 9",
    "Feature 10",
  ],
  challenges: [
    "Challenge 1",
    "Challenge 2",
    "Challenge 3",
    "Challenge 4",
    "Challenge 5"
  ],
  solutions: [
    "Solution 1",
    "Solution 2",
    "Solution 3",
    "Solution 4",
    "Solution 5"
  ],
}

export default function ProjectDetailPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Back to Projects */}
        <Link
          href="/projects"
          className="inline-flex items-center text-accent-dark dark:text-accent-light hover:text-primary dark:hover:text-primary-light mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="max-w-5xl mx-auto">
          <div className="rounded-lg overflow-hidden mb-8 shadow-custom dark:shadow-custom-dark">
            <Image
              src={project.image || "/profile/VoxDroid.jpg"}
              alt={project.title}
              width={1200}
              height={600}
              className="w-full h-auto"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
              <p className="text-lg text-accent-dark dark:text-accent-light mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-primary dark:bg-primary-light text-white rounded-md shadow-custom-dark transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg inline-flex items-center"
                >
                  <Github className="mr-2 h-5 w-5" />
                  View Source
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-primary dark:border-primary-light text-primary dark:text-primary-light rounded-md transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg inline-flex items-center"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Live Demo
                </a>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark p-6 h-fit">
              <h3 className="text-xl font-bold mb-4">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-accent-dark dark:text-accent-light">Date</h4>
                  <p className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary dark:text-primary-light" />
                    {project.date}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-accent-dark dark:text-accent-light">Client</h4>
                  <p>{project.client}</p>
                </div>
                <div>
                  <h4 className="font-medium text-accent-dark dark:text-accent-light">Role</h4>
                  <p>{project.role}</p>
                </div>
                <div>
                  <h4 className="font-medium text-accent-dark dark:text-accent-light">Category</h4>
                  <p className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-primary dark:text-primary-light" />
                    {project.category}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div className="mb-12 bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark p-8">
            <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>{project.longDescription}</p>
            </div>
          </div>

          {/* Project Screenshots */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Screenshots</h2>
            <ImageGallery images={project.screenshots} alt={project.title} />
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark p-6">
              <h2 className="text-2xl font-bold mb-6">Key Features</h2>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary dark:bg-primary-light rounded-full mt-2 mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark p-6">
              <h2 className="text-2xl font-bold mb-6">Challenges & Solutions</h2>
              <div className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <div key={index}>
                    <h4 className="font-bold text-primary dark:text-primary-light">Challenge:</h4>
                    <p className="mb-2">{challenge}</p>
                    <h4 className="font-bold text-primary dark:text-primary-light">Solution:</h4>
                    <p>{project.solutions[index]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark p-8">
            <h2 className="text-2xl font-bold mb-4">Interested in working together?</h2>
            <p className="text-accent-dark dark:text-accent-light mb-6 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            <Link
              href="/contact"
              className="px-6 py-3 bg-primary dark:bg-primary-light text-white rounded-md shadow-custom-dark transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg inline-flex items-center"
            >
              Get In Touch <ExternalLink className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

