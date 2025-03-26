import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Github, ExternalLink, Calendar, Tag } from "lucide-react"
import ImageGallery from "@/components/image-gallery"

const project = {
  id: 1,
  title: "Clarisse Portfolio",
  description: "A modern, customizable, and responsive portfolio template built with Next.js and TypeScript.",
  longDescription: `
  <p>A modern, customizable, and responsive portfolio template built with <span style="color: #3b82f6 !important;">Next.js</span>. and <span style="color: #3b82f6 !important;">TypeScript</span>.</p>
  <br>
  <p>Designed to showcase your skills, projects, and personality with a sleek interface, animated background, and professional features.</p>
`,
  image: "/project_images/Clarisse.png",
  date: "March 2025",
  client: "Open Source Community",
  role: "Lead Developer",
  tags: ["Next.js", "TypeScript", "Tailwind CSS", "Portfolio", "UI/UX", "Template"],
  category: "Web Development",
  github: "https://github.com/VoxDroid/Clarisse-Portfolio",
  demo: "https://clarisse-portfolio.vercel.app/",
  screenshots: [
    "/project_screenshots/Clarisse-Portfolio/S_Home_D.png",
    "/project_screenshots/Clarisse-Portfolio/S_Home_W.png",
    "/project_screenshots/Clarisse-Portfolio/S_Projects_D.png",
    "/project_screenshots/Clarisse-Portfolio/S_Projects_W.png",
    "/project_screenshots/Clarisse-Portfolio/S_Skills_D.png",
    "/project_screenshots/Clarisse-Portfolio/S_Skills_W.png",
  ],
  features: [
    "Light/Dark Mode: Toggle between light and dark themes seamlessly.",
    "Fully Customizable: Adjust colors, fonts, and content to match your brand.",
    "Responsive Design: Optimized for mobile, tablet, and desktop devices.",
    "Animated Background: Dynamic particle animations for visual appeal.",
    "Smooth Animations: Powered by Framer Motion for fluid transitions.",
    "Modular Components: Well-organized, reusable component structure.",
    "Interactive UI: Includes tooltips, hover effects, and engaging elements.",
    "SEO Optimized: Built with search engine visibility in mind.",
    "High Performance: Fast load times and optimized assets.",
    "Skills Visualization: Dynamic representation of your expertise.",
    "Blog Section: Share articles and insights.",
    "Testimonials: Display feedback from clients or peers.",
    "Contact Form: Easy way for visitors to reach out.",
  ],
  challenges: [],
  solutions: [],
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
          <div className="flex justify-center mb-8">
            <div className="rounded-lg overflow-hidden shadow-custom dark:shadow-custom-dark p-3 bg-white/50 dark:bg-accent-dark/30 w-auto inline-block">
              <div className="rounded-lg overflow-hidden w-[300px] h-[300px] relative">
                <Image src={project.image || "/project_images/Clarisse.png"} alt={project.title} fill className="object-cover" />
              </div>
            </div>
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
            <div
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-primary dark:prose-headings:text-primary-light prose-a:text-primary dark:prose-a:text-primary-light"
              dangerouslySetInnerHTML={{ __html: project.longDescription }}
            />
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

