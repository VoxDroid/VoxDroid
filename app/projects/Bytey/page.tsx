"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  Tag,
  ChevronRight,
  Eye,
  Code,
  Layout,
  Server,
  Cpu,
  ChevronLeft,
  X,
} from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

const project = {
  id: 1,
  title: "Bytey",
  description: "A gamified coding companion web app built with Next.js and TypeScript.",
  longDescription: `
  <p>A gamified coding companion web app built with <span style="color: #3b82f6 !important;">Next.js</span>. and <span style="color: #3b82f6 !important;">TypeScript</span>.</p> 
  <br>
  <p>Bytey is a UI template designed to transform your coding journey into an engaging experience, where a virtual pet grows as you code. 
  This project serves as a foundation with a functional UI and minimal game logic, ready for further development to enhance features like trading, GitHub integration, and more.</p>
`,
  image: "/project_images/Bytey.png",
  date: "April 2025",
  client: "Open Source Community",
  role: "Lead Developer",
  tags: ["Next.js", "TypeScript", "Tailwind CSS", "Pet Companion", "UI/UX", "Template"],
  category: "Web Development",
  github: "https://github.com/VoxDroid/Bytey",
  demo: "https://bytey.vercel.app/",
  screenshots: [
    "/project_screenshots/Bytey/bytey_collect.png",
    "/project_screenshots/Bytey/bytey_game.png",
    "/project_screenshots/Bytey/bytey_items.png",
  ],
  features: [
    "<strong>Gamified UI Template:</strong> A sleek, dark-mode-only interface for a virtual pet that grows with coding activity (basic logic implemented).",
    "<strong>Interactive UI:</strong> Pet interactions with animations powered by Framer Motion.",
    "<strong>Inventory System:</strong> Display and manage items like Energy Drink and Debug Potion (functional UI, minimal logic).",
    "<strong>Collectibles Gallery:</strong> Showcase collectibles with rarity tiers (UI only).",
    "<strong>Daily Tasks Panel:</strong> Task interface for future daily engagement features (UI only).",
    "<strong>Responsive Design:</strong> Optimized for mobile, tablet, and desktop devices.",
    "<strong>Modular Components:</strong> Reusable React components for easy extension.",
    "<strong>SEO Optimized:</strong> Built for search engine visibility.",
    "<strong>High Performance:</strong> Fast load times with Next.js rendering."
  ],
  challenges: [
  ],
  solutions: [
  ],
  techStack: [
    { name: "Next.js", description: "React framework for production" },
    { name: "TypeScript", description: "Typed JavaScript for better development" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework" },
    { name: "Framer Motion", description: "Animation library for React" },
    { name: "React", description: "JavaScript library for building user interfaces" },
    { name: "ESLint", description: "Code quality tool" },
    { name: "Prettier", description: "Code formatter" },
    { name: "Vercel", description: "Deployment platform" },
    { name: "Lucide Icons", description: "Icon set"},
    { name: "Zustand", description: "State management"}
  ],
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 },
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

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 },
  },
}

// Tech stack card variants with different colors
const techCardColors = [
  "from-blue-500 to-blue-600",
  "from-indigo-500 to-indigo-600",
  "from-purple-500 to-purple-600",
  "from-pink-500 to-pink-600",
  "from-red-500 to-red-600",
  "from-orange-500 to-orange-600",
  "from-amber-500 to-amber-600",
  "from-yellow-500 to-yellow-600",
  "from-lime-500 to-lime-600",
  "from-green-500 to-green-600",
  "from-emerald-500 to-emerald-600",
  "from-teal-500 to-teal-600",
  "from-cyan-500 to-cyan-600",
  "from-sky-500 to-sky-600",
]

export default function ProjectDetailPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalImage, setModalImage] = useState("")
  const [modalScale, setModalScale] = useState(1)

  const [particles, setParticles] = useState<Array<{ x: string; y: string; opacity: number }>>([])

  useEffect(() => {
    const generatedParticles = Array(50)
      .fill(0)
      .map(() => ({
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.5 + 0.3,
      }))
    setParticles(generatedParticles)
  }, [])

  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])

  const hasChallengeSolution =
    project.challenges && project.challenges.length > 0 && project.solutions && project.solutions.length > 0

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.screenshots.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const techIcons = [Code, Layout, Server, Cpu]

  const handleImageClick = (image: string, index?: number) => {
    setModalImage(image)
    if (index !== undefined) {
      setCurrentImageIndex(index)
    }
    setModalOpen(true)
    setModalScale(1) 
    document.body.style.overflow = "hidden" 
  }

  const navigateToScreenshots = (index: number) => {
    setActiveTab("screenshots")
    setCurrentImageIndex(index)
    setTimeout(() => {
      document.getElementById("screenshots-section")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const closeModal = () => {
    setModalOpen(false)
    document.body.style.overflow = "auto" 
  }

  return (
    <div className="min-h-screen py-16" ref={targetRef}>
      {/* Animated background particles */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="absolute inset-0">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary dark:bg-primary-light"
              initial={{
                x: particle.x,
                y: particle.y,
                opacity: particle.opacity,
              }}
              animate={{
                y: [particle.y, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
                x: [particle.x, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
              }}
              transition={{
                duration: 15 + Math.random() * 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Back to Projects with animation */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link
            href="/projects"
            className="inline-flex items-center text-accent-dark dark:text-accent-light hover:text-primary dark:hover:text-primary-light mb-8 transition-colors duration-300 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Project Header */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex flex-col md:flex-row gap-8 mb-12 items-center"
          >
            <div className="md:w-1/2">
              <motion.div
                className="rounded-lg overflow-hidden shadow-custom dark:shadow-custom-dark bg-white/50 dark:bg-accent-dark/30 w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Project image with hover effect */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-700 hover:scale-105"
                  />

                  {/* Overlay gradient on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            </div>

            <div className="md:w-1/2">
              <motion.h1
                className="text-3xl md:text-4xl font-bold mb-4 animated-gradient-text bg-gradient-to-r from-primary via-primary-light to-primary dark:from-primary-light dark:via-primary dark:to-primary-light"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: 0.1 },
                  },
                }}
              >
                {project.title}
              </motion.h1>

              <motion.p
                className="text-lg text-accent-dark dark:text-accent-light mb-6"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: 0.2 },
                  },
                }}
              >
                {project.description}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-2 mb-6"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.3,
                    },
                  },
                }}
              >
                {project.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(59, 130, 246, 0.3)",
                      color: "#ffffff",
                    }}
                    className="px-3 py-1 bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light text-sm rounded-full transform transition-all duration-300"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div
                className="flex gap-4"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.4,
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-primary dark:bg-primary-light text-white rounded-md shadow-custom-dark transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg inline-flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="mr-2 h-5 w-5" />
                  View Source
                </motion.a>

                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-primary dark:border-primary-light text-primary dark:text-primary-light rounded-md transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg inline-flex items-center relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Button hover animation */}
                  <span className="absolute inset-0 w-full h-full bg-primary dark:bg-primary-light transition-all duration-300 transform -translate-x-full group-hover:translate-x-0 opacity-20"></span>
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Live Demo
                </motion.a>
              </motion.div>
            </div>
          </motion.div>

          {/* Project Details Card */}
          <motion.div
            className="bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark p-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-accent-dark dark:text-accent-light">Date</h4>
                <p className="flex items-center text-lg font-semibold">
                  <Calendar className="h-4 w-4 mr-2 text-primary dark:text-primary-light" />
                  {project.date}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-accent-dark dark:text-accent-light">Client</h4>
                <p className="text-lg font-semibold">{project.client}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-accent-dark dark:text-accent-light">Role</h4>
                <p className="text-lg font-semibold">{project.role}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-accent-dark dark:text-accent-light">Category</h4>
                <p className="flex items-center text-lg font-semibold">
                  <Tag className="h-4 w-4 mr-2 text-primary dark:text-primary-light" />
                  {project.category}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div
            className={`sticky top-16 z-30 bg-white/80 dark:bg-accent-dark/40 backdrop-blur-md rounded-lg shadow-md mb-8 transition-all duration-300 ${isScrolled ? "py-2" : "py-3"}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex overflow-x-auto hide-scrollbar">
              <div className="flex space-x-1 px-2 mx-auto">
                {[
                  "overview",
                  "features",
                  "screenshots",
                  ...(hasChallengeSolution ? ["challenges & solutions"] : []),
                  "tech stack",
                ].map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-md whitespace-nowrap transition-all duration-300 ${
                      activeTab === tab
                        ? "bg-primary dark:bg-primary-light text-white font-medium"
                        : "hover:bg-primary/10 dark:hover:bg-primary-light/10 text-accent-dark dark:text-accent-light"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Content based on active tab */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-12"
            >
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark p-8 relative overflow-hidden"
                >
                  {/* Animated corner decoration */}
                  <motion.div
                    className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-primary-light/20 dark:from-primary/30 dark:to-primary-light/30 rounded-full blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />

                  <h2 className="text-2xl font-bold mb-6 flex items-center relative z-10">
                    <Eye className="mr-2 h-5 w-5 text-primary dark:text-primary-light" />
                    Project Overview
                  </h2>

                  <div
                    className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-primary dark:prose-headings:text-primary-light prose-a:text-primary dark:prose-a:text-primary-light relative z-10"
                    dangerouslySetInnerHTML={{ __html: project.longDescription }}
                  />

                  {/* Featured screenshot with animation */}
                  <motion.div
                    className="mt-8 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => navigateToScreenshots(currentImageIndex)}
                  >
                    <div className="relative w-full aspect-video overflow-hidden">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                          key={currentImageIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={project.screenshots[currentImageIndex] || "/placeholder.svg"}
                            alt={`${project.title} screenshot`}
                            layout="fill"
                            objectFit="cover"
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Screenshot navigation dots */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
                        {project.screenshots.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentImageIndex(index)
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              currentImageIndex === index ? "bg-white scale-125" : "bg-white/50"
                            }`}
                            aria-label={`View screenshot ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Features Tab */}
              {activeTab === "features" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className="bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark p-8"
                >
                  <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {project.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        variants={item}
                        className="flex items-start p-4 rounded-lg bg-white/50 dark:bg-accent-dark/20 hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] group"
                        whileHover={{
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light mr-3 flex-shrink-0 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary-light dark:group-hover:text-primary-foreground transition-colors duration-300">
                          {index + 1}
                        </span>
                        <div dangerouslySetInnerHTML={{ __html: feature }} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "screenshots" && (
                <motion.div
                  id="screenshots-section"
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark p-8"
                >
                  <h2 className="text-2xl font-bold mb-6">Project Screenshots</h2>

                  {/* Featured screenshot with animation */}
                  <motion.div
                    className="mb-8 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleImageClick(project.screenshots[currentImageIndex], currentImageIndex)}
                  >
                    <div className="relative w-full aspect-video overflow-hidden">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                          key={currentImageIndex}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={project.screenshots[currentImageIndex] || "/placeholder.svg"}
                            alt={`${project.title} screenshot`}
                            layout="fill"
                            objectFit="cover"
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Screenshot navigation arrows */}
                      <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setCurrentImageIndex(
                              (prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length,
                            )
                          }}
                          className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-300"
                          aria-label="Previous screenshot"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setCurrentImageIndex((prev) => (prev + 1) % project.screenshots.length)
                          }}
                          className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-300"
                          aria-label="Next screenshot"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>
                      </div>

                      {/* Screenshot navigation dots */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
                        {project.screenshots.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentImageIndex(index)
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              currentImageIndex === index ? "bg-white scale-125" : "bg-white/50"
                            }`}
                            aria-label={`View screenshot ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Gallery thumbnails */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {project.screenshots.map((screenshot, index) => (
                      <motion.div
                        key={index}
                        variants={item}
                        whileHover={{ scale: 1.05 }}
                        className="relative h-40 rounded-lg overflow-hidden cursor-pointer shadow-md"
                        onClick={() => handleImageClick(screenshot, index)}
                      >
                        <Image
                          src={screenshot || "/placeholder.svg"}
                          alt={`${project.title} thumbnail ${index + 1}`}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-500 hover:scale-110"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "challenges & solutions" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className="bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark p-8"
                >
                  <h2 className="text-2xl font-bold mb-6">Challenges & Solutions</h2>
                  <div className="space-y-6">
                    {project.challenges.map((challenge, index) => (
                      <motion.div
                        key={index}
                        variants={item}
                        className="bg-white/50 dark:bg-accent-dark/20 rounded-lg p-6"
                      >
                        <h4 className="font-bold text-primary dark:text-primary-light text-lg mb-2">Challenge:</h4>
                        <p className="mb-4">{challenge}</p>
                        <h4 className="font-bold text-primary dark:text-primary-light text-lg mb-2">Solution:</h4>
                        <p>{project.solutions[index]}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Tech Stack Tab */}
              {activeTab === "tech stack" && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className="bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark p-8"
                >
                  <h2 className="text-2xl font-bold mb-6">Technology Stack</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {project.techStack.map((tech, index) => {
                      const colorClass = techCardColors[index % techCardColors.length]

                      return (
                        <motion.div
                          key={index}
                          variants={item}
                          whileHover={{
                            y: -10,
                            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                          }}
                          className="flex flex-col p-6 rounded-lg text-center relative overflow-hidden group"
                        >
                          {/* Card background with gradient */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/30 dark:from-accent-dark/80 dark:to-accent-dark/30 group-hover:bg-gradient-to-br group-hover:from-primary/10 group-hover:to-primary-light/10 dark:group-hover:from-primary/20 dark:group-hover:to-primary-light/20 transition-all duration-300"></div>

                          {/* Animated circle decoration */}
                          <div
                            className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${colorClass} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                          ></div>

                          {/* Tech number */}
                          <div className="relative z-10 mb-4">
                            <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary-light/20 dark:from-primary/30 dark:to-primary-light/30 flex items-center justify-center text-xl font-bold text-primary dark:text-primary-light">
                              {index + 1}
                            </div>
                          </div>

                          <h3 className="font-bold text-lg mb-1 relative z-10">{tech.name}</h3>
                          <p className="text-sm text-accent-dark dark:text-accent-light relative z-10">
                            {tech.description}
                          </p>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Call to Action */}
          <motion.div
            className="text-center bg-gradient-to-r from-primary/90 to-primary-light/90 dark:from-primary/80 dark:to-primary-light/80 text-white rounded-lg shadow-lg p-8 transform transition-all duration-500 hover:scale-[1.01] relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Animated background particles */}
            <div className="absolute inset-0">
              {particles.slice(0, 20).map((particle, i) => (
                <motion.div
                  key={`cta-particle-${i}`}
                  className="absolute w-1 h-1 rounded-full bg-white"
                  initial={{
                    x: particle.x,
                    y: particle.y,
                    opacity: particle.opacity,
                  }}
                  animate={{
                    y: [particle.y, `${(Number.parseInt(particle.y) + 30) % 100}%`],
                  }}
                  transition={{
                    duration: 5 + (i % 5),
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-4 relative z-10">Interested in working together?</h2>
            <p className="mb-6 max-w-2xl mx-auto relative z-10">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative z-10">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-full shadow-lg inline-flex items-center transition-all duration-300 hover:shadow-xl relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/10 to-primary-light/10 transition-all duration-300 transform translate-x-full group-hover:translate-x-0"></span>
                <span className="relative z-10">Get In Touch</span>
                <ChevronRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* Image Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={closeModal}>
          <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => {
              e.preventDefault()
              const zoomFactor = e.deltaY > 0 ? -0.1 : 0.1
              setModalScale((prev) => {
                const newScale = prev + zoomFactor
                return Math.min(Math.max(0.5, newScale), 3)
              })
            }}
          >
            <button
              className="absolute top-4 right-4 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors z-50"
              onClick={(e) => {
                e.stopPropagation()
                closeModal()
              }}
            >
              <X className="h-6 w-6" />
            </button>

            <div
              className="relative max-w-[90vw] max-h-[90vh] overflow-auto cursor-move"
              style={{
                transform: `scale(${modalScale})`,
                transition: "transform 0.3s ease",
              }}
            >
              <Image
                src={modalImage || "/placeholder.svg"}
                alt="Screenshot preview"
                width={1200}
                height={800}
                className="object-contain"
              />
            </div>
            <p className="absolute bottom-4 text-white/70 text-center w-full">
              Use mouse wheel to zoom, or click outside to close
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

