"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Github, ExternalLink, ArrowRight } from "lucide-react"
import SectionHeader from "@/components/section-header"
import { motion, AnimatePresence } from "framer-motion"

const projects = [
  {
    id: 1,
    title: "Clarisse Portfolio",
    description: "A modern, customizable, and responsive portfolio template built with Next.js and TypeScript.",
    image: "/project_images/Clarisse.png",
    tags: ["Next.js", "Node.js", "React", "Portfolio"],
    github: "https://github.com/VoxDroid/Clarisse-Portfolio",
    demo: "https://clarisse-portfolio.vercel.app/",
    category: "UI/UX",
    slug: "Clarisse-Portfolio",
    glowColor: "glow-blue",
  },
  {
    id: 2,
    title: "Zylthra",
    description: "A PyQt6 app to generate synthetic datasets with DataLLM.",
    image: "/project_images/zylthra.png",
    tags: ["Python", "PyQt6", "DataLLM", "Dataset Generator"],
    github: "https://github.com/VoxDroid",
    demo: "https://github.com/VoxDroid/Zylthra",
    category: "Application",
    slug: "project-2",
    glowColor: "glow-blue",
  },
  {
    id: 3,
    title: "Kemono Downloader",
    description: "A cross-platform Python app built with PyQt6 to download posts and creator content from Kemono.su. ",
    image: "/project_images/KemonoDownloader.png",
    tags: ["Python", "Kemono.su", "PyQt6", "Downloader"],
    github: "https://github.com/VoxDroid",
    demo: "https://github.com/VoxDroid/KemonoDownloader",
    category: "Application",
    slug: "project-2",
    glowColor: "glow-blue",
  },
  {
    id: 4,
    title: "Java Quiz App",
    description: "A Java desktop application built with JavaFX in IntelliJ IDEA.",
    image: "/project_images/JavaQuiz.png",
    tags: ["Java", "JavaFX", "IntelliJ", "Quiz App"],
    github: "https://github.com/VoxDroid",
    demo: "https://github.com/VoxDroid/Java-Quiz-App?tab=readme-ov-file",
    category: "Application",
    slug: "project-3",
    glowColor: "glow-blue",
  },
  {
    id: 5,
    title: "Advanced Tab Manager",
    description:
      "A powerful GUI tool built with Python, PyQt6, and Selenium to automate Chrome tab management.",
    image: "/project_images/ATM.png",
    tags: ["Python", "Selenium", "PyQt6", "Automation"],
    github: "https://github.com/VoxDroid",
    demo: "https://github.com/VoxDroid/Advanced-Tab-Manager",
    category: "Application",
    slug: "project-4",
    glowColor: "glow-blue",
  },
  {
    id: 6,
    title: "Portfolio Website",
    description:
      "My Personal Portfolio Website.",
    image: "/profile/VoxDroid.jpg",
    tags: ["Next.js", "Node.js", "React", "Portfolio"],
    github: "https://github.com/VoxDroid",
    demo: "https://github.com/VoxDroid/VoxDroid",
    category: "UI/UX",
    slug: "project-5",
    glowColor: "glow-blue",
  },
  {
    id: 7,
    title: "PyExe Builder",
    description:
      "A feature-rich GUI tool for converting Python scripts into standalone executables using PyInstaller.",
    image: "/project_images/PyExe.png",
    tags: ["Python", "PyInstaller", "PyQt6", "Build Tool"],
    github: "https://github.com/VoxDroid",
    demo: "https://github.com/VoxDroid/PyExe-Builder",
    category: "Application",
    slug: "project-6",
    glowColor: "glow-blue",
  },
  {
    id: 8,
    title: "Number System Converter",
    description:
      "A comprehensive web application for number system conversion and bitwise operations with an intuitive user interface and advanced features.",
    image: "/project_images/NumSysCon.png",
    tags: ["HTML", "JavaScript", "CSS3", "Number Systems"],
    github: "https://github.com/VoxDroid",
    demo: "https://github.com/VoxDroid/Number-Systems-Converter",
    category: "Web",
    slug: "project-7",
    glowColor: "glow-blue",
  },
  {
    id: 9,
    title: "Chess Ultimate",
    description:
      "A simple web application for playing chess that can be played anytime.",
    image: "/project_images/ChessUlt.png",
    tags: ["HTML", "JavaScript", "CSS3", "Chess"],
    github: "https://github.com/VoxDroid",
    demo: "https://github.com/VoxDroid/Chess-Ultimate",
    category: "Web",
    slug: "project-8",
    glowColor: "glow-blue",
  },
  {
    id: 10,
    title: "Ultimate Tic-Tac-Toe",
    description:
      "A multilingual, feature-rich Tic-Tac-Toe game built with HTML, CSS, and JavaScript.",
    image: "/project_images/UltT3.png",
    tags: ["HTML", "CSS", "JavaScript", "Tic-Tac-Toe"],
    github: "https://github.com/VoxDroid",
    demo: "https://github.com/VoxDroid/Ultimate-Tic-Tac-Toe",
    category: "Web",
    slug: "project-9",
    glowColor: "glow-blue",
  },
  {
    id: 11,
    title: "Image Binder",
    description: "A versatile application crafted for effortlessly converting and binding multiple images into a single PDF document. ",
    image: "/project_images/ImageBinder.png",
    tags: ["C#", ".NET Framework", "Guna UI", "Images-to-PDF"],
    github: "https://github.com/VoxDroid",
    demo: "https://github.com/VoxDroid/Image-Binder",
    category: "Application",
    slug: "project-11",
    glowColor: "glow-blue",
  },
  {
    id: 12,
    title: "ZapisAxis",
    description: "A college project developed as part of the ITEC 204 course @ Laguna State Polytechnic University SCC.",
    image: "/project_images/ZapisAxis.png",
    tags: ["C#", ".NET Framework", "Guna UI", "Management System"],
    github: "https://github.com/VoxDroid",
    demo: "https://github.com/VoxDroid/FMS",
    category: "Application",
    slug: "project-12",
    glowColor: "glow-blue",
  },
]

// Project categories
const categories = ["All", "Web", "Application", "UI/UX"]

// Project card component
const ProjectCard = ({ project }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="group bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark overflow-hidden hover:translate-y-[-10px] hover:shadow-xl flex flex-col h-full glow-effect glow-blue"
    >
      <div className="h-48 relative overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <span className="px-2 py-1 text-xs bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light rounded-full">
            {project.category}
          </span>
        </div>
        <p className="text-accent-dark dark:text-accent-light mb-4 flex-grow">{project.description}</p>
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-accent/10 dark:border-accent/20">
            <div className="flex space-x-3">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-accent-dark dark:text-accent-light hover:text-primary dark:hover:text-primary-light transition-colors"
                aria-label={`View ${project.title} source code on GitHub`}
              >
                <Github className="h-4 w-4" />
                <span className="text-sm">Source</span>
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-accent-dark dark:text-accent-light hover:text-primary dark:hover:text-primary-light transition-colors"
                aria-label={`View ${project.title} live demo`}
              >
                <ExternalLink className="h-4 w-4" />
                <span className="text-sm">Demo</span>
              </a>
            </div>
            <Link
              href={`/projects/${project.slug}`}
              className="flex items-center text-primary dark:text-primary-light hover:underline font-medium"
            >
              Details <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <SectionHeader title="My Projects" subtitle="Explore my recent work and personal projects" centered />

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category
                  ? "bg-primary dark:bg-primary-light text-white shadow-lg"
                  : "bg-accent/10 dark:bg-accent-dark/20 text-accent-dark dark:text-accent-light hover:bg-primary/20 dark:hover:bg-primary-light/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid with Framer Motion Animation */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => <ProjectCard key={project.id} project={project} />)
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center py-12"
              >
                <p className="text-lg text-accent-dark dark:text-accent-light">
                  No projects found in the {activeCategory} category.
                </p>
                <button
                  onClick={() => setActiveCategory("All")}
                  className="mt-4 px-4 py-2 bg-primary dark:bg-primary-light text-white rounded-md"
                >
                  View all projects
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* More Projects CTA */}
        <div className="mt-16 p-8 bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark text-center transform transition-all duration-500 hover:scale-[1.02]">
          <h3 className="text-2xl font-bold mb-4">Interested in more projects?</h3>
          <p className="text-accent-dark dark:text-accent-light mb-6 max-w-2xl mx-auto">
            Check out my GitHub repositories for more projects, experiments, and contributions to open-source.
          </p>
          <a
            href="https://github.com/VoxDroid"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-primary dark:bg-primary-light text-white rounded-md shadow-custom-dark inline-flex items-center transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg"
          >
            <Github className="mr-2 h-5 w-5" />
            View GitHub Profile
          </a>
        </div>
      </div>
    </div>
  )
}

