"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Github, ExternalLink, ArrowRight, Star, GitFork, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import SectionHeader from "@/components/section-header"
import type { ProjectData } from "@/lib/github"
import { formatNumber, formatRelativeTime } from "@/lib/github"

interface ProjectsClientProps {
  projects: ProjectData[]
  categories: string[]
}

// Hyprland-style smooth bezier curves
const smoothBezier: [number, number, number, number] = [0.22, 1, 0.36, 1] // Similar to Hyprland's default animation curve
const snappyBezier: [number, number, number, number] = [0.16, 1, 0.3, 1] // Snappier version for exits

// Container variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
}

// Card variants with smooth Hyprland-style animations
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40, 
    scale: 0.92,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: smoothBezier,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.95,
    filter: "blur(4px)",
    transition: { 
      duration: 0.3,
      ease: snappyBezier,
    },
  },
}

function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  const [imageError, setImageError] = useState(false)
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="group bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark overflow-hidden hover:translate-y-[-10px] hover:shadow-xl flex flex-col h-full transition-shadow duration-300"
      style={{ 
        willChange: "transform, opacity, filter",
      }}
    >
      <div className="h-48 relative overflow-hidden bg-gray-100 dark:bg-gray-800">
        {!imageError ? (
          <Image
            src={project.image || "/project_images/placeholder.png"}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0d1117] to-[#161b22] font-mono text-sm">
            <div className="text-green-400 mb-1">voxdroid@vox ~</div>
            <div className="flex items-center gap-1">
              <span className="text-primary dark:text-primary-light">$</span>
              <span className="text-gray-300">./</span>
              <span className="text-cyan-400 truncate max-w-[150px]">{project.slug}</span>
              <span className="w-2 h-4 bg-green-400 animate-pulse"></span>
            </div>
            <div className="text-gray-500 text-xs mt-2">[no preview available]</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Stats Badge */}
        <div className="absolute top-3 right-3 flex gap-2">
          {project.stars > 0 && (
            <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-400" />
              {formatNumber(project.stars)}
            </span>
          )}
          {project.forks > 0 && (
            <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full flex items-center gap-1">
              <GitFork className="h-3 w-3 text-blue-400" />
              {formatNumber(project.forks)}
            </span>
          )}
        </div>
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-primary text-white text-xs rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-2 gap-2">
          <h3 className="text-xl font-bold truncate">{project.name}</h3>
          <span className="px-2 py-1 text-xs bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light rounded-full whitespace-nowrap">
            {project.category}
          </span>
        </div>
        
        <p className="text-accent-dark dark:text-accent-light mb-4 flex-grow line-clamp-2">
          {project.description}
        </p>
        
        {/* Language and Last Updated */}
        <div className="flex items-center gap-4 mb-4 text-sm text-accent-dark dark:text-accent-light">
          {project.language && (
            <div className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor:
                    project.languagePercentages.find((l) => l.name === project.language)?.color || "#808080",
                }}
              />
              <span>{project.language}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{formatRelativeTime(project.pushedAt)}</span>
          </div>
        </div>
        
        <div className="mt-auto">
          {/* Topics */}
          {project.topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.topics.slice(0, 4).map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-0.5 bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light text-xs rounded-md"
                >
                  {topic}
                </span>
              ))}
              {project.topics.length > 4 && (
                <span className="px-2 py-0.5 text-xs text-accent-dark dark:text-accent-light">
                  +{project.topics.length - 4}
                </span>
              )}
            </div>
          )}
          
          <div className="flex justify-between items-center pt-3 border-t border-accent/10 dark:border-accent/20">
            <div className="flex space-x-3">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-accent-dark dark:text-accent-light hover:text-primary dark:hover:text-primary-light transition-colors"
                aria-label={`View ${project.name} source code on GitHub`}
              >
                <Github className="h-4 w-4" />
                <span className="text-sm">Source</span>
              </a>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-accent-dark dark:text-accent-light hover:text-primary dark:hover:text-primary-light transition-colors"
                  aria-label={`View ${project.name} live demo`}
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="text-sm">Demo</span>
                </a>
              )}
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

export default function ProjectsClient({ projects, categories }: ProjectsClientProps) {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects = useMemo(() => {
    return activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory)
  }, [activeCategory, projects])

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: smoothBezier }}
        >
          <SectionHeader
            title="My Projects"
            subtitle="Explore my GitHub repositories and recent work"
            centered
          />
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: smoothBezier, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              animate={{
                backgroundColor: activeCategory === category 
                  ? "var(--category-active-bg)" 
                  : "var(--category-inactive-bg)",
              }}
              transition={{ duration: 0.3, ease: smoothBezier }}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                activeCategory === category
                  ? "bg-primary dark:bg-primary-light text-white shadow-lg [--category-active-bg:var(--primary)] dark:[--category-active-bg:var(--primary-light)]"
                  : "bg-accent/10 dark:bg-accent-dark/20 text-accent-dark dark:text-accent-light hover:bg-primary/20 dark:hover:bg-primary-light/20 [--category-inactive-bg:transparent]"
              }`}
              style={{
                ["--category-active-bg" as string]: activeCategory === category ? undefined : "transparent",
              }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard key={project.fullName} project={project} index={index} />
              ))
            ) : (
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="col-span-full text-center py-12"
              >
                <p className="text-lg text-accent-dark dark:text-accent-light">
                  No projects found in the {activeCategory} category.
                </p>
                <motion.button
                  onClick={() => setActiveCategory("All")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 px-4 py-2 bg-primary dark:bg-primary-light text-white rounded-md"
                >
                  View all projects
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* More Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: smoothBezier, delay: 0.3 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.3, ease: smoothBezier } }}
          className="mt-16 p-8 bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark text-center"
        >
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
        </motion.div>
      </div>
    </div>
  )
}
