"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, ArrowDown, Github, Code, Cpu, Monitor, ExternalLink, Terminal } from "lucide-react"
import TypingAnimation from "@/components/typing-animation"
import BootSequence from "@/components/boot-sequence"
import type { ProjectData } from "@/lib/github"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 20,
    },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Linux-style command phrases
const terminalCommands = [
  "cat /etc/vox/skills.conf",
  "sudo systemctl start creativity.service",
  "grep -r 'innovation' ./projects/*",
  "man voxdroid | head -n 1",
  "curl -s https://api.github.com/users/VoxDroid",
  "neofetch --ascii vox",
  "pacman -S expertise --noconfirm",
  "chmod +x ./solve-problems.sh",
]

// Project card component with image error handling - Terminal Style
function FeaturedProjectCard({ project }: { project: ProjectData }) {
  const [imageError, setImageError] = useState(false)
  
  return (
    <motion.div
      variants={fadeInUp}
      className="group bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700/50 rounded-lg overflow-hidden transition-all duration-500 hover:translate-y-[-5px] hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 flex flex-col h-full"
    >
      {/* Project Image */}
      <div className="h-48 relative overflow-hidden bg-gray-100 dark:bg-[#161b22]">
        {!imageError && project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#0d1117] dark:to-[#161b22] font-mono text-sm">
            <div className="text-green-600 dark:text-green-400 mb-1">voxdroid@vox ~</div>
            <div className="flex items-center gap-1">
              <span className="text-green-600 dark:text-green-400">$</span>
              <span className="text-gray-600 dark:text-gray-300">./</span>
              <span className="text-cyan-600 dark:text-cyan-400 truncate max-w-[150px]">{project.slug}</span>
              <span className="w-2 h-4 bg-green-500 dark:bg-green-400 animate-pulse"></span>
            </div>
            <div className="text-gray-500 text-xs mt-2">[no preview available]</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0d1117] to-transparent opacity-60"></div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.name}</h3>
          <div className="flex space-x-2">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              aria-label={`View ${project.name} source code`}
            >
              <Github className="h-5 w-5" />
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                aria-label={`View ${project.name} demo`}
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow line-clamp-2 text-sm">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.topics.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs rounded font-mono"
            >
              {tag}
            </span>
          ))}
          {project.language && !project.topics.includes(project.language) && (
            <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-xs rounded font-mono">
              {project.language}
            </span>
          )}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300 font-mono text-sm transition-colors"
        >
          <span className="mr-1">$</span> cat README.md <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  )
}

interface HomeClientProps {
  featuredProjects: ProjectData[]
}

export default function HomeClient({ featuredProjects }: HomeClientProps) {
  const [showBoot, setShowBoot] = useState(true)

  useEffect(() => {
    // Check if we've already shown the boot sequence this session
    const hasBooted = sessionStorage.getItem("hasBooted")
    if (hasBooted) {
      setShowBoot(false)
    }
  }, [])

  const handleBootComplete = () => {
    setShowBoot(false)
    sessionStorage.setItem("hasBooted", "true")
  }

  return (
    <div className="min-h-screen">
      {showBoot && <BootSequence onComplete={handleBootComplete} />}
      
      {/* Hero Section - Terminal Style */}
      <section className="py-20 md:py-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 flex flex-col md:flex-row items-center"
        >
          <motion.div variants={fadeInUp} className="md:w-1/2 mb-10 md:mb-0">
            {/* Terminal Window */}
            <div className="bg-gray-50 dark:bg-[#0d1117] rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700/50 overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-gray-500 dark:text-gray-400 text-sm font-mono">voxdroid@vox: ~</span>
                </div>
                <Terminal className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>
              
              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm space-y-3">
                <div className="text-gray-500 dark:text-gray-400">
                  <span className="text-green-600 dark:text-green-400">voxdroid@vox</span>
                  <span className="text-gray-400 dark:text-gray-500">:</span>
                  <span className="text-blue-600 dark:text-blue-400">~</span>
                  <span className="text-gray-400 dark:text-gray-500">$</span>
                  <span className="text-gray-700 dark:text-gray-300 ml-2">whoami</span>
                </div>
                <div className="text-cyan-600 dark:text-cyan-400 pl-0">
                  VoxDroid — Developer, Creator, Problem Solver
                </div>
                
                <div className="text-gray-500 dark:text-gray-400 pt-2">
                  <span className="text-green-600 dark:text-green-400">voxdroid@vox</span>
                  <span className="text-gray-400 dark:text-gray-500">:</span>
                  <span className="text-blue-600 dark:text-blue-400">~</span>
                  <span className="text-gray-400 dark:text-gray-500">$</span>
                  <span className="text-gray-700 dark:text-gray-300 ml-2">
                    <TypingAnimation text={terminalCommands} speed={40} delay={800} loop={true} />
                  </span>
                  <span className="inline-block w-2 h-4 bg-green-500 dark:bg-green-400 animate-pulse ml-1 align-middle"></span>
                </div>
                
                <div className="text-gray-500 text-xs pt-4 border-t border-gray-200 dark:border-gray-700/50 mt-4">
                  <span className="text-green-500 dark:text-green-400">●</span> System ready | 
                  <span className="text-yellow-500 dark:text-yellow-400 ml-2">⚡</span> Uptime: ∞ |
                  <span className="text-blue-500 dark:text-blue-400 ml-2">λ</span> Vox Linux
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/projects"
                className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-md shadow-lg transition-all duration-300 hover:translate-y-[-3px] hover:shadow-green-500/25 inline-flex items-center font-mono text-sm"
              >
                <span className="text-green-300 mr-2">$</span> ls ./projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border border-cyan-600 dark:border-cyan-500 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/10 rounded-md transition-all duration-300 hover:translate-y-[-3px] inline-flex items-center font-mono text-sm"
              >
                <span className="text-cyan-500 dark:text-cyan-300 mr-2">$</span> ./contact.sh
              </Link>
              <a
                href="/cv/VoxDroid_CV.pdf"
                className="px-6 py-3 bg-gray-100 dark:bg-[#161b22] border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-white rounded-md transition-all duration-300 hover:translate-y-[-3px] inline-flex items-center font-mono text-sm"
                download
              >
                <ArrowDown className="mr-2 h-4 w-4" /> wget cv.pdf
              </a>
            </div>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 animate-floatUp">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full opacity-20 blur-xl"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-green-500/30 shadow-2xl shadow-green-500/20">
                <Image
                  src="/profile/VoxDroid.jpg"
                  alt="VoxDroid"
                  width={320}
                  height={320}
                  priority
                  className="object-cover"
                />
              </div>
              {/* Decorative terminal elements */}
              <div className="absolute -bottom-4 -right-4 bg-gray-50 dark:bg-[#0d1117] rounded-lg px-3 py-2 border border-gray-200 dark:border-gray-700/50 font-mono text-xs">
                <span className="text-green-500 dark:text-green-400">●</span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">online</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
      <section className="py-16 bg-gray-100/50 dark:bg-[#0d1117]/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 font-mono">
              <span className="text-green-600 dark:text-green-400">$</span> <span className="text-gray-700 dark:text-gray-300">ls</span> <span className="text-cyan-600 dark:text-cyan-400">./featured-projects/</span>
            </h2>
            <p className="text-gray-500 font-mono text-sm">// Highlighted repositories</p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className={`grid gap-8 ${
              featuredProjects.length === 1 
                ? "max-w-md mx-auto" 
                : featuredProjects.length === 2 
                  ? "md:grid-cols-2 max-w-3xl mx-auto" 
                  : "md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {featuredProjects.map((project) => (
              <FeaturedProjectCard key={project.slug} project={project} />
            ))}
          </motion.div>

          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-md shadow-lg transition-all duration-300 hover:translate-y-[-3px] hover:shadow-green-500/25 inline-flex items-center font-mono text-sm"
            >
              <span className="text-green-300 mr-2">$</span> ls -la ./projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      )}

      {/* Skills Overview Section - Terminal Style */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 font-mono">
              <span className="text-green-600 dark:text-green-400">$</span> <span className="text-gray-700 dark:text-gray-300">cat</span> <span className="text-cyan-600 dark:text-cyan-400">/etc/vox/expertise.d/*</span>
            </h2>
            <p className="text-gray-500 font-mono text-sm">// Core competencies loaded</p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700/50 rounded-lg overflow-hidden transition-all duration-500 hover:translate-y-[-5px] hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10"
            >
              <div className="px-4 py-2 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50 flex items-center gap-2">
                <Code className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-gray-600 dark:text-gray-400 font-mono text-sm">machine-learning.service</span>
                <span className="ml-auto text-green-600 dark:text-green-400 text-xs">● active</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Machine Learning</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Designing and implementing ML models for data analysis, prediction, and automation using Python and modern frameworks.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs rounded font-mono">python</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs rounded font-mono">tensorflow</span>
                  <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 text-xs rounded font-mono">pytorch</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700/50 rounded-lg overflow-hidden transition-all duration-500 hover:translate-y-[-5px] hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="px-4 py-2 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50 flex items-center gap-2">
                <Monitor className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <span className="text-gray-600 dark:text-gray-400 font-mono text-sm">desktop-apps.service</span>
                <span className="ml-auto text-green-600 dark:text-green-400 text-xs">● active</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Desktop Applications</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Building cross-platform desktop applications with focus on functionality, performance, and user-friendly interfaces.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 text-xs rounded font-mono">qt</span>
                  <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-xs rounded font-mono">electron</span>
                  <span className="px-2 py-1 bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 text-xs rounded font-mono">tkinter</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700/50 rounded-lg overflow-hidden transition-all duration-500 hover:translate-y-[-5px] hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="px-4 py-2 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50 flex items-center gap-2">
                <Cpu className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-gray-600 dark:text-gray-400 font-mono text-sm">software-dev.service</span>
                <span className="ml-auto text-green-600 dark:text-green-400 text-xs">● active</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Software Development</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Crafting efficient, scalable software solutions with a focus on clean code, robust architectures, and best practices.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 text-xs rounded font-mono">git</span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs rounded font-mono">linux</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs rounded font-mono">docker</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="mt-12 text-center">
            <Link
              href="/skills"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 rounded-md transition-all duration-300 hover:translate-y-[-3px] inline-flex items-center font-mono text-sm"
            >
              <span className="text-green-600 dark:text-green-400 mr-2">$</span> ls -la ./skills <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action - Terminal Style */}
      <section className="py-20 relative overflow-hidden bg-gray-100 dark:bg-[#0d1117]">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-cyan-500/5"></div>
        <div className="absolute inset-0 bg-[url('/profile/VoxDroid.jpg')] bg-cover bg-center opacity-5"></div>
        
        {/* Terminal scanlines effect */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)] pointer-events-none"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block bg-white dark:bg-[#161b22] rounded-lg border border-gray-200 dark:border-gray-700/50 px-8 py-6 mb-8">
            <div className="font-mono text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span className="text-green-600 dark:text-green-400">voxdroid@vox</span>:<span className="text-blue-600 dark:text-blue-400">~</span>$ <span className="text-gray-700 dark:text-gray-300">echo $COLLABORATION_STATUS</span>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 font-mono">
              OPEN_FOR_OPPORTUNITIES=true
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">Interested in working together?</h2>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
          
          <Link
            href="/contact"
            className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-mono rounded-lg shadow-lg shadow-green-500/20 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/30 inline-flex items-center"
          >
            <span className="text-green-300 mr-2">$</span> ./initiate-contact.sh <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent"></div>
      </section>
    </div>
  )
}
