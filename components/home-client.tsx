"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, ArrowDown, Github, Code, Cpu, Monitor, ExternalLink } from "lucide-react"
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

// Typing animation sentences
const typingPhrases = [
  "Bow to my profile.",
  "I am your king.",
  "Kneel before the God of Developers."
]

// Project card component with image error handling
function FeaturedProjectCard({ project }: { project: ProjectData }) {
  const [imageError, setImageError] = useState(false)
  
  return (
    <motion.div
      variants={fadeInUp}
      className="group bg-white/90 dark:bg-accent-dark/90 backdrop-blur-sm rounded-xl shadow-xl transition-all duration-500 hover:translate-y-[-10px] hover:shadow-2xl flex flex-col h-full glow-effect glow-blue"
    >
      {/* Project Image */}
      <div className="h-48 relative overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-800">
        {!imageError && project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0d1117] to-[#161b22] font-mono text-sm">
            <div className="text-green-400 mb-1">voxdroid@arch ~</div>
            <div className="flex items-center gap-1">
              <span className="text-primary dark:text-primary-light">$</span>
              <span className="text-gray-300">./</span>
              <span className="text-cyan-400 truncate max-w-[150px]">{project.slug}</span>
              <span className="w-2 h-4 bg-green-400 animate-pulse"></span>
            </div>
            <div className="text-gray-500 text-xs mt-2">[no preview available]</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{project.name}</h3>
          <div className="flex space-x-2">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-primary-light hover:scale-110 transition-transform"
              aria-label={`View ${project.name} source code`}
            >
              <Github className="h-5 w-5" />
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary dark:text-primary-light hover:scale-110 transition-transform"
                aria-label={`View ${project.name} demo`}
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        <p className="text-accent-dark dark:text-accent-light mb-4 flex-grow line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.topics.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {project.language && !project.topics.includes(project.language) && (
            <span className="px-2 py-1 bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light text-xs rounded-full">
              {project.language}
            </span>
          )}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center text-primary dark:text-primary-light font-medium hover:underline"
        >
          View Details <ArrowRight className="ml-1 h-4 w-4" />
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
      
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 flex flex-col md:flex-row items-center"
        >
          <motion.div variants={fadeInUp} className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Hi, I'm <span className="gradient-text dark:gradient-text-light">VoxDroid</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-accent-dark dark:text-accent-light h-[3rem]">
              <TypingAnimation text={typingPhrases} speed={50} delay={1000} loop={true} />
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="px-6 py-3 bg-primary dark:bg-primary-light text-white rounded-md shadow-custom-dark transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg inline-flex items-center"
              >
                View My Work <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border border-primary dark:border-primary-light text-primary dark:text-primary-light rounded-md transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg inline-flex items-center"
              >
                Get In Touch
              </Link>
              <a
                href="/cv/VoxDroid_CV.pdf"
                className="px-6 py-3 bg-accent/10 dark:bg-accent-dark/20 text-accent-dark dark:text-accent-light rounded-md transition-all duration-300 hover:translate-y-[-5px] hover:bg-accent/20 dark:hover:bg-accent-dark/30 inline-flex items-center border border-accent/20 dark:border-accent/10"
                download
              >
                Download CV <ArrowDown className="ml-2 h-5 w-5" />
              </a>
            </div>
          </motion.div>
          <motion.div variants={fadeInUp} className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 animate-floatUp">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light rounded-full opacity-20 blur-xl"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-custom-dark">
                <Image
                  src="/profile/VoxDroid.jpg"
                  alt="VoxDroid"
                  width={320}
                  height={320}
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
      <section className="py-16 bg-accent/5 dark:bg-accent-dark/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center dark:gradient-text-light inline-block w-full">
            Featured Projects
          </h2>

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
              className="px-6 py-3 bg-primary dark:bg-primary-light text-white rounded-md shadow-custom-dark transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg inline-flex items-center"
            >
              See All Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      )}

      {/* Skills Overview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center dark:gradient-text-light inline-block w-full">
            My Expertise
          </h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeInUp}
              className="p-6 bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark text-center transition-all duration-500 hover:translate-y-[-10px] hover:shadow-xl"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 dark:bg-primary-light/10 rounded-full flex items-center justify-center">
                <Code className="h-8 w-8 text-primary dark:text-primary-light" />
              </div>
              <h3 className="text-xl font-bold mb-2">Machine Learning</h3>
              <p className="text-accent-dark dark:text-accent-light">
                Designing and implementing machine learning models for data analysis, prediction, and automation using Python.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="p-6 bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark text-center transition-all duration-500 hover:translate-y-[-10px] hover:shadow-xl"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 dark:bg-primary-light/10 rounded-full flex items-center justify-center">
                <Monitor className="h-8 w-8 text-primary dark:text-primary-light" />
              </div>
              <h3 className="text-xl font-bold mb-2">Desktop Applications</h3>
              <p className="text-accent-dark dark:text-accent-light">
                Building cross-platform desktop applications with Python, focusing on functionality and user-friendly interfaces.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="p-6 bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark text-center transition-all duration-500 hover:translate-y-[-10px] hover:shadow-xl"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 dark:bg-primary-light/10 rounded-full flex items-center justify-center">
                <Cpu className="h-8 w-8 text-primary dark:text-primary-light" />
              </div>
              <h3 className="text-xl font-bold mb-2">Software Development</h3>
              <p className="text-accent-dark dark:text-accent-light">
                Crafting efficient, scalable software solutions with a focus on clean Python code and robust architectures.
              </p>
            </motion.div>
          </motion.div>

          <div className="mt-12 text-center">
            <Link
              href="/skills"
              className="px-6 py-3 border border-primary dark:border-primary-light text-primary dark:text-primary-light rounded-md transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg inline-flex items-center"
            >
              Explore My Skills <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-light to-primary opacity-90 dark:opacity-80"></div>
        <div className="absolute inset-0 bg-[url('/profile/VoxDroid.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Interested in working together?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
          <Link
            href="/contact"
            className="px-8 py-4 bg-white/90 hover:bg-white text-gray-800 font-semibold border-2 border-white rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl inline-flex items-center"
          >
            Let's Talk <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent"></div>
      </section>
    </div>
  )
}
