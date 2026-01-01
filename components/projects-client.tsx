"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Github, ExternalLink, ArrowRight, Star, GitFork, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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
      className="group bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700/50 rounded-lg overflow-hidden hover:translate-y-[-10px] hover:shadow-xl hover:shadow-green-500/10 hover:border-green-500/50 flex flex-col h-full transition-all duration-300"
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
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#0d1117] dark:to-[#161b22] font-mono text-sm">
            <div className="text-green-600 dark:text-green-400 mb-1">voxdroid@vox ~</div>
            <div className="flex items-center gap-1">
              <span className="text-primary dark:text-primary-light">$</span>
              <span className="text-gray-600 dark:text-gray-300">./</span>
              <span className="text-cyan-600 dark:text-cyan-400 truncate max-w-[150px]">{project.slug}</span>
              <span className="w-2 h-4 bg-green-500 dark:bg-green-400 animate-pulse"></span>
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
          <h3 className="text-xl font-bold truncate text-gray-900 dark:text-white">{project.name}</h3>
          <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 rounded-full whitespace-nowrap font-mono">
            {project.category}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow line-clamp-2">
          {project.description}
        </p>
        
        {/* Language and Last Updated */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400 font-mono">
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
                  className="px-2 py-0.5 bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-xs rounded-md font-mono"
                >
                  {topic}
                </span>
              ))}
              {project.topics.length > 4 && (
                <span className="px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400 font-mono">
                  +{project.topics.length - 4}
                </span>
              )}
            </div>
          )}
          
          <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700/50">
            <div className="flex space-x-3">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                aria-label={`View ${project.name} source code on GitHub`}
              >
                <Github className="h-4 w-4" />
                <span className="text-sm font-mono">source</span>
              </a>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  aria-label={`View ${project.name} live demo`}
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="text-sm font-mono">demo</span>
                </a>
              )}
            </div>
            <Link
              href={`/projects/${project.slug}`}
              className="flex items-center text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 font-mono text-sm transition-colors"
            >
              <span className="mr-1">$</span> cat README <ArrowRight className="ml-1 h-4 w-4" />
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
        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: smoothBezier }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
            <span className="text-green-600 dark:text-green-400">$</span> <span className="text-gray-700 dark:text-gray-300">ls -la</span> <span className="text-cyan-600 dark:text-cyan-400">./projects/</span>
          </h1>
          <p className="text-gray-500 font-mono text-sm">// Explore my GitHub repositories and recent work</p>
        </motion.div>

        {/* Category Filter - Terminal Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: smoothBezier, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: smoothBezier }}
              className={`px-4 py-2 rounded-md font-mono text-sm transition-all duration-300 ${
                activeCategory === category
                  ? "bg-green-600 text-white shadow-lg shadow-green-500/25"
                  : "bg-gray-100 dark:bg-[#161b22] border border-gray-200 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 hover:border-green-500/50 hover:text-green-600 dark:hover:text-green-400"
              }`}
            >
              {activeCategory === category && <span className="mr-1">●</span>}
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
                <div className="inline-block bg-white dark:bg-[#0d1117] rounded-lg border border-gray-200 dark:border-gray-700/50 p-8">
                  <p className="text-lg text-gray-600 dark:text-gray-400 font-mono mb-4">
                    <span className="text-yellow-600 dark:text-yellow-400">⚠</span> No projects found in <span className="text-cyan-600 dark:text-cyan-400">{activeCategory}</span> category
                  </p>
                  <motion.button
                    onClick={() => setActiveCategory("All")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-md font-mono text-sm transition-colors"
                  >
                    <span className="mr-2">$</span> ls ./all-projects
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* More Projects CTA - Terminal Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: smoothBezier, delay: 0.3 }}
          className="mt-16"
        >
          <div className="bg-white dark:bg-[#0d1117] rounded-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-gray-500 dark:text-gray-400 text-sm font-mono ml-2">github-profile</span>
            </div>
            
            {/* Content */}
            <div className="p-8 text-center">
              <div className="font-mono text-sm text-gray-500 dark:text-gray-400 mb-2">
                <span className="text-green-600 dark:text-green-400">voxdroid@vox</span>:<span className="text-blue-600 dark:text-blue-400">~</span>$ <span className="text-gray-700 dark:text-gray-300">echo $MORE_PROJECTS</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Interested in more projects?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Check out my GitHub profile for more repositories, experiments, and open-source contributions.
              </p>
              <a
                href="https://github.com/VoxDroid"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-md shadow-lg transition-all duration-300 hover:translate-y-[-3px] hover:shadow-green-500/25 inline-flex items-center font-mono text-sm"
              >
                <Github className="mr-2 h-5 w-5" />
                <span className="text-green-300 mr-2">$</span> open github.com/VoxDroid
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
