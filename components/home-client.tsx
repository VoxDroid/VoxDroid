"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ArrowDown, Github, Code, Cpu, Monitor, ExternalLink, Terminal, GitBranch, Calendar, Briefcase, Star, Users, Flame, GitFork, FileCode, Clock, GitCommit, Activity } from "lucide-react"
import TypingAnimation from "@/components/typing-animation"
import BootSequence from "@/components/boot-sequence"
import type { ProjectData, GitHubUserStats } from "@/lib/github"

const hyprlandBezier = [0.22, 1, 0.36, 1] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: hyprlandBezier,
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

// ASCII Art from section_about.svg - VOX Logo
const voxAsciiArt = [
  "oooooooooooooo              oooooooooooooo",
  "`oooooooooooooo            oooooooooooooo`",
  " `oooooooooooooo          oooooooooooooo`",
  "  `oooooooooooooo        oooooooooooooo`",
  "   `oooooooooooooo      oooooooooooooo`",
  "    `oooooooooooooo    oooooooooooooo`",
  "     `oooooooooooooo  oooooooooooooo`",
  "      `oooooooooooooooooooooooooooo`",
  "       `oooooooooooooooooooooooooo`",
  "        `oooooooooooooooooooooooo`",
  "         `oooooooooooooooooooooo`",
  "          `oooooooooooooooooooo`",
  "           `oooooooooooooooooo`",
  "            `oooooooooooooooo`",
  "             `oooooooooooooo`",
  "              `oooooooooooo`",
  "               `oooooooooo`",
  "                `oooooooo`",
  "                 `oooooo`",
  "                  `oooo`",
  "                   `oo`",
]

// Glitch text component
function GlitchText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute top-0 left-0 -z-10 opacity-0 group-hover:opacity-70 text-red-500 group-hover:animate-glitch-1" aria-hidden="true">
        {children}
      </span>
      <span className="absolute top-0 left-0 -z-10 opacity-0 group-hover:opacity-70 text-cyan-500 group-hover:animate-glitch-2" aria-hidden="true">
        {children}
      </span>
    </span>
  )
}

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
  githubStats: GitHubUserStats | null
}

export default function HomeClient({ featuredProjects, githubStats }: HomeClientProps) {
  const [showBoot, setShowBoot] = useState(true)
  const [asciiVisible, setAsciiVisible] = useState<number[]>([])
  const heroRef = useRef<HTMLDivElement>(null)
  
  // Dynamic GitHub stats for neofetch display - Top row stats
  const primaryStats = [
    { 
      icon: GitBranch, 
      label: "Repos", 
      value: githubStats ? `${githubStats.publicRepos}` : "50+", 
      color: "green" 
    },
    { 
      icon: Star, 
      label: "Stars", 
      value: githubStats ? `${githubStats.totalStars}` : "100+", 
      color: "yellow" 
    },
    { 
      icon: GitFork, 
      label: "Forks", 
      value: githubStats ? `${githubStats.totalForks}` : "50+", 
      color: "cyan" 
    },
    { 
      icon: Users, 
      label: "Followers", 
      value: githubStats ? `${githubStats.followers}` : "50+", 
      color: "purple" 
    },
  ]
  
  // Secondary stats - streak and activity (all lifetime data)
  const secondaryStats = [
    { 
      icon: FileCode, 
      label: "Total Contributions", 
      value: githubStats ? `${githubStats.totalContributions.toLocaleString()}` : "1000+",
      subtitle: githubStats?.firstContribution ? `Since ${githubStats.firstContribution}` : "Lifetime",
      color: "green" 
    },
    { 
      icon: Flame, 
      label: "Current Streak", 
      value: githubStats ? `${githubStats.currentStreak} days` : "0 days",
      subtitle: githubStats?.currentStreakStart && githubStats?.currentStreakEnd 
        ? `${githubStats.currentStreakStart} - ${githubStats.currentStreakEnd}` 
        : "Consecutive days",
      color: "red" 
    },
    { 
      icon: Calendar, 
      label: "Longest Streak", 
      value: githubStats ? `${githubStats.longestStreak} days` : "0 days",
      subtitle: githubStats?.longestStreakStart && githubStats?.longestStreakEnd 
        ? `${githubStats.longestStreakStart} - ${githubStats.longestStreakEnd}` 
        : "All-time record",
      color: "orange" 
    },
    { 
      icon: GitCommit, 
      label: "This Year", 
      value: githubStats ? `${githubStats.contributionsThisYear.toLocaleString()}` : "500+",
      subtitle: new Date().getFullYear().toString(),
      color: "cyan" 
    },
    { 
      icon: Clock, 
      label: "Member Since", 
      value: githubStats?.accountCreated || "2019",
      subtitle: `${githubStats?.accountAge || 6}+ years coding`,
      color: "blue" 
    },
    { 
      icon: Activity, 
      label: "Account Age", 
      value: githubStats ? `${githubStats.accountAge} years` : "6+ years",
      subtitle: githubStats?.accountCreated ? `Since ${githubStats.accountCreated}` : "",
      color: "purple" 
    },
  ]
  
  // Parallax scroll effect
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 500], [0, 150])
  const parallaxOpacity = useTransform(scrollY, [0, 300], [1, 0.3])

  useEffect(() => {
    // Check if we've already shown the boot sequence this session
    const hasBooted = sessionStorage.getItem("hasBooted")
    if (hasBooted) {
      setShowBoot(false)
    }
  }, [])

  // Animate ASCII art line by line
  useEffect(() => {
    if (!showBoot) {
      const timer = setInterval(() => {
        setAsciiVisible(prev => {
          if (prev.length >= voxAsciiArt.length) {
            clearInterval(timer)
            return prev
          }
          return [...prev, prev.length]
        })
      }, 80)
      return () => clearInterval(timer)
    }
  }, [showBoot])

  const handleBootComplete = () => {
    setShowBoot(false)
    sessionStorage.setItem("hasBooted", "true")
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {showBoot && <BootSequence onComplete={handleBootComplete} />}
      
      {/* Parallax Background Layer */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{ y: parallaxY, opacity: parallaxOpacity }}
      >
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Chevron Pattern like SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="chevronPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 10 10 L 20 20 L 10 30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-green-500" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#chevronPattern)" />
        </svg>
        
        {/* Floating terminal commands background */}
        <div className="absolute inset-0 font-mono text-[10px] text-gray-500/5 dark:text-gray-400/5 overflow-hidden select-none">
          <div className="absolute top-20 left-10">git clone https://github.com/voxdroid/core.git</div>
          <div className="absolute top-40 right-20">Cloning into &apos;core&apos;...</div>
          <div className="absolute top-60 left-1/4">remote: Enumerating objects: 1042, done.</div>
          <div className="absolute top-80 right-1/3">npm install --production</div>
          <div className="absolute top-[400px] left-20">[READY] Systems initialized in 42ms</div>
          <div className="absolute top-[500px] right-40">[CORE] Neural interface connected</div>
        </div>
      </motion.div>
      
      {/* Hero Section - Enhanced Terminal Style */}
      <section ref={heroRef} className="py-20 md:py-28 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-8"
        >
          {/* Main Terminal - Fastfetch Style */}
          <motion.div variants={fadeInUp} className="lg:w-3/5 w-full">
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
                  <span className="text-gray-500 dark:text-gray-400 text-sm font-mono">vox-terminal — zsh — 120×40</span>
                </div>
                <Terminal className="h-4 w-4 text-gray-400 dark:text-gray-500" />
              </div>
              
              {/* Terminal Content - Fastfetch Layout */}
              <div className="p-4 sm:p-6 font-mono text-sm">
                {/* Command prompt */}
                <div className="text-gray-500 dark:text-gray-400 mb-4">
                  <span className="text-green-600 dark:text-green-400">voxdroid@vox</span>
                  <span className="text-gray-400 dark:text-gray-500">:</span>
                  <span className="text-blue-600 dark:text-blue-400">~</span>
                  <span className="text-gray-400 dark:text-gray-500">$</span>
                  <span className="text-gray-700 dark:text-gray-300 ml-2">fastfetch --vox</span>
                </div>
                
                {/* Fastfetch Style Layout - ASCII Left, Info Right */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                  {/* ASCII Art - Left Side with Wave Glow Animation */}
                  <div className="flex-shrink-0 text-[6px] sm:text-[8px] md:text-[9px] leading-[1.1] font-mono">
                    {voxAsciiArt.map((line, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: asciiVisible.includes(index) ? 1 : 0,
                        }}
                        transition={{ duration: 0.05 }}
                        className="whitespace-pre ascii-glow-line"
                        style={{ 
                          animationDelay: `${index * 0.095}s`,
                          ['--reverse-delay' as string]: `${(voxAsciiArt.length - 1 - index) * 0.095}s`,
                        }}
                      >
                        {line}
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Info - Right Side */}
                  <div className="flex-grow text-xs sm:text-sm space-y-1">
                    <motion.div 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: asciiVisible.length > 2 ? 1 : 0, x: asciiVisible.length > 2 ? 0 : 10 }}
                      className="flex items-center gap-2"
                    >
                      <span className="text-green-600 dark:text-green-400 font-bold">voxdroid</span>
                      <span className="text-gray-400">@</span>
                      <span className="text-green-600 dark:text-green-400 font-bold">vox</span>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: asciiVisible.length > 3 ? 1 : 0 }}
                      className="text-gray-400 dark:text-gray-500"
                    >
                      ─────────────────
                    </motion.div>
                    
                    {[
                      { label: "OS", value: "VoxCore Linux x86_64", delay: 4 },
                      { label: "Host", value: "Voxstation", delay: 5 },
                      { label: "Kernel", value: "6.x-voxcore", delay: 6 },
                      { label: "Uptime", value: "6+ years coding", delay: 7 },
                      { label: "Shell", value: "zsh 5.9", delay: 8 },
                      { label: "DE", value: "Voxyland", delay: 9 },
                      { label: "Terminal", value: "Capybara", delay: 10 },
                      { label: "CPU", value: "Neural Engine @ ∞ GHz", delay: 11 },
                      { label: "Memory", value: "Unlimited Ideas", delay: 12 },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ 
                          opacity: asciiVisible.length > item.delay ? 1 : 0, 
                          x: asciiVisible.length > item.delay ? 0 : 10 
                        }}
                        transition={{ duration: 0.1 }}
                        className="flex"
                      >
                        <span className="text-green-600 dark:text-green-400 w-20 flex-shrink-0">{item.label}</span>
                        <span className="text-gray-700 dark:text-gray-300">{item.value}</span>
                      </motion.div>
                    ))}
                    
                    {/* Color palette */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: asciiVisible.length >= voxAsciiArt.length ? 1 : 0 }}
                      className="flex gap-1 pt-2"
                    >
                      {['bg-black', 'bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-blue-500', 'bg-purple-500', 'bg-cyan-500', 'bg-white'].map((color, i) => (
                        <div key={i} className={`w-4 h-4 ${color} rounded-sm`} />
                      ))}
                    </motion.div>
                  </div>
                </div>
                
                {/* Status bar */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: asciiVisible.length >= voxAsciiArt.length ? 1 : 0 }}
                  className="text-gray-500 text-xs pt-4 border-t border-gray-200 dark:border-gray-700/50 mt-4 flex items-center justify-between"
                >
                  <div>
                    <span className="text-green-500 dark:text-green-400">●</span> System ready
                  </div>
                  <div>
                    <span className="text-yellow-500">λ</span> SYST_OK
                  </div>
                  <div className="text-gray-400">
                    VOXDROID v1.2.0 | UTF-8
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
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
          
          {/* Profile Image - Right Side */}
          <motion.div variants={fadeInUp} className="lg:w-2/5 flex justify-center">
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

      {/* Neofetch Stats Section */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: hyprlandBezier }}
            className="bg-white dark:bg-[#0d1117] rounded-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden"
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-gray-500 dark:text-gray-400 text-sm font-mono ml-2">voxdroid@vox:~</span>
            </div>
            
            {/* Neofetch Style Stats */}
            <div className="p-6 font-mono text-sm">
              {/* Command */}
              <div className="text-gray-500 dark:text-gray-400 mb-6">
                <span className="text-green-600 dark:text-green-400">$</span>
                <span className="text-gray-700 dark:text-gray-300 ml-2">neofetch --github-stats</span>
              </div>
              
              {/* Main Stats Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Stats */}
                <div className="space-y-4">
                  {/* Primary Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    {primaryStats.map((stat, index) => {
                      const Icon = stat.icon
                      const colors: Record<string, { text: string; bar: string }> = {
                        green: { text: "text-green-500", bar: "bg-green-500" },
                        cyan: { text: "text-cyan-500", bar: "bg-cyan-500" },
                        purple: { text: "text-purple-500", bar: "bg-purple-500" },
                        yellow: { text: "text-yellow-500", bar: "bg-yellow-500" },
                        red: { text: "text-red-500", bar: "bg-red-500" },
                        orange: { text: "text-orange-500", bar: "bg-orange-500" },
                        blue: { text: "text-blue-500", bar: "bg-blue-500" },
                      }
                      const color = colors[stat.color]
                      
                      return (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1, ease: hyprlandBezier }}
                          className="group"
                        >
                          <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 dark:bg-[#161b22] border border-gray-200 dark:border-gray-700/50 hover:border-green-500/50 transition-colors">
                            <Icon className={`w-4 h-4 ${color.text}`} />
                            <div className="flex-grow min-w-0">
                              <div className="flex items-baseline justify-between gap-2">
                                <span className={`${color.text} text-xs truncate`}>{stat.label}</span>
                                <span className="text-gray-900 dark:text-white font-bold text-sm">
                                  <GlitchText>{stat.value}</GlitchText>
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                  
                  {/* Secondary Stats - 3x2 grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {secondaryStats.map((stat, index) => {
                      const Icon = stat.icon
                      const colors: Record<string, { text: string; bar: string }> = {
                        green: { text: "text-green-500", bar: "bg-green-500" },
                        cyan: { text: "text-cyan-500", bar: "bg-cyan-500" },
                        purple: { text: "text-purple-500", bar: "bg-purple-500" },
                        yellow: { text: "text-yellow-500", bar: "bg-yellow-500" },
                        red: { text: "text-red-500", bar: "bg-red-500" },
                        orange: { text: "text-orange-500", bar: "bg-orange-500" },
                        blue: { text: "text-blue-500", bar: "bg-blue-500" },
                      }
                      const color = colors[stat.color]
                      
                      return (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: (index + 4) * 0.1, ease: hyprlandBezier }}
                          className="group"
                        >
                          <div className="flex flex-col p-3 rounded-lg bg-gray-50 dark:bg-[#161b22] border border-gray-200 dark:border-gray-700/50 hover:border-green-500/50 transition-colors h-full min-h-[70px]">
                            <div className="flex items-center gap-2 mb-1">
                              <Icon className={`w-4 h-4 ${color.text} flex-shrink-0`} />
                              <span className={`${color.text} text-xs`}>{stat.label}</span>
                            </div>
                            <div className="text-gray-900 dark:text-white font-bold text-lg">
                              <GlitchText>{stat.value}</GlitchText>
                            </div>
                            <div className="text-[10px] text-gray-500 dark:text-gray-500 mt-auto">
                              {stat.subtitle}
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
                
                {/* Right Column - Contribution Graph & Languages */}
                <div className="space-y-4">
                  {/* Contribution Graph */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3, ease: hyprlandBezier }}
                    className="p-4 rounded-lg bg-gray-50 dark:bg-[#161b22] border border-gray-200 dark:border-gray-700/50"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-cyan-500 text-xs">contributions</span>
                      <span className="text-gray-400 text-xs">~</span>
                      <span className="text-gray-500 text-xs">last 52 weeks</span>
                    </div>
                    
                    {/* Contribution Graph Bars */}
                    <div className="flex items-end gap-[2px] h-16">
                      {(githubStats?.contributionGraph || Array(52).fill(0)).map((count, i) => {
                        const maxCount = Math.max(...(githubStats?.contributionGraph || [1]), 1)
                        const height = count > 0 ? Math.max(15, (count / maxCount) * 100) : 5
                        const intensity = count > 0 ? Math.min(count / 5, 1) : 0
                        
                        return (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${height}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.01, ease: hyprlandBezier }}
                            className="flex-1 rounded-sm min-w-[3px]"
                            style={{
                              backgroundColor: count > 0 
                                ? `rgba(34, 197, 94, ${0.3 + intensity * 0.7})` 
                                : 'rgba(107, 114, 128, 0.2)'
                            }}
                            title={`Week ${i + 1}: ${count} contributions`}
                          />
                        )
                      })}
                    </div>
                    
                    {/* Graph Legend */}
                    <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                      <span>Less</span>
                      <div className="flex gap-1">
                        {[0.2, 0.4, 0.6, 0.8, 1].map((opacity, i) => (
                          <div
                            key={i}
                            className="w-3 h-3 rounded-sm"
                            style={{ backgroundColor: `rgba(34, 197, 94, ${opacity})` }}
                          />
                        ))}
                      </div>
                      <span>More</span>
                    </div>
                  </motion.div>
                  
                  {/* Top Languages */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4, ease: hyprlandBezier }}
                    className="p-4 rounded-lg bg-gray-50 dark:bg-[#161b22] border border-gray-200 dark:border-gray-700/50"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="w-4 h-4 text-purple-500" />
                      <span className="text-purple-500 text-xs">languages</span>
                    </div>
                    
                    {/* Language Bar */}
                    <div className="h-3 rounded-full overflow-hidden flex mb-3">
                      {(githubStats?.topLanguages || [
                        { name: 'TypeScript', percentage: 35, color: '#3178c6' },
                        { name: 'Python', percentage: 25, color: '#3572A5' },
                        { name: 'JavaScript', percentage: 20, color: '#f1e05a' },
                        { name: 'Java', percentage: 15, color: '#b07219' },
                        { name: 'Other', percentage: 5, color: '#858585' },
                      ]).map((lang, i) => (
                        <motion.div
                          key={lang.name}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: i * 0.1, ease: hyprlandBezier }}
                          style={{ backgroundColor: lang.color }}
                          title={`${lang.name}: ${lang.percentage}%`}
                        />
                      ))}
                    </div>
                    
                    {/* Language Labels */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {(githubStats?.topLanguages || [
                        { name: 'TypeScript', percentage: 35, color: '#3178c6' },
                        { name: 'Python', percentage: 25, color: '#3572A5' },
                        { name: 'JavaScript', percentage: 20, color: '#f1e05a' },
                      ]).slice(0, 5).map((lang) => (
                        <div key={lang.name} className="flex items-center gap-1.5">
                          <div 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: lang.color }}
                          />
                          <span className="text-xs text-gray-600 dark:text-gray-400">{lang.name}</span>
                          <span className="text-xs text-gray-400 dark:text-gray-500">{lang.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Recent Activity Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5, ease: hyprlandBezier }}
                className="mt-6 p-4 rounded-lg bg-gray-50 dark:bg-[#161b22] border border-gray-200 dark:border-gray-700/50"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-4 h-4 text-cyan-500" />
                  <span className="text-cyan-500 text-xs">recent_activity</span>
                  <span className="text-gray-400 text-xs">~</span>
                  <span className="text-gray-500 text-xs">last 10 events</span>
                </div>
                
                {/* Activity List */}
                <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
                  {(githubStats?.recentActivity || [
                    { type: 'push', repo: 'VoxDroid', message: 'Updated components', date: 'Jan 1', timeAgo: '2h ago' },
                    { type: 'create', repo: 'NewProject', message: 'Created branch main', date: 'Dec 31', timeAgo: '1d ago' },
                    { type: 'star', repo: 'awesome-repo', message: 'Starred repository', date: 'Dec 30', timeAgo: '2d ago' },
                  ]).map((activity, i) => {
                    const activityIcons: Record<string, { icon: typeof GitCommit; color: string }> = {
                      push: { icon: GitCommit, color: 'text-green-500' },
                      create: { icon: GitBranch, color: 'text-purple-500' },
                      pr: { icon: GitFork, color: 'text-blue-500' },
                      issue: { icon: FileCode, color: 'text-yellow-500' },
                      star: { icon: Star, color: 'text-yellow-500' },
                      fork: { icon: GitFork, color: 'text-cyan-500' },
                      activity: { icon: Activity, color: 'text-gray-500' },
                    }
                    const { icon: ActivityIcon, color } = activityIcons[activity.type] || activityIcons.activity
                    
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.05, ease: hyprlandBezier }}
                        className="flex items-start gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-[#1c2128] transition-colors"
                      >
                        <ActivityIcon className={`w-4 h-4 mt-0.5 ${color} flex-shrink-0`} />
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">{activity.repo}</span>
                            <span className="text-xs text-gray-400">{activity.timeAgo}</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{activity.message}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
                
                {/* Activity Summary */}
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700/50 flex items-center justify-between text-xs">
                  <span className="text-gray-500">
                    <span className="text-green-500">{githubStats?.contributionsThisYear || 0}</span> contributions this year
                  </span>
                  <a 
                    href="https://github.com/VoxDroid" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-500 hover:text-cyan-400 flex items-center gap-1"
                  >
                    View on GitHub
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
              
              {/* Terminal color blocks like neofetch */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {['bg-gray-900 dark:bg-gray-100', 'bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-blue-500', 'bg-purple-500', 'bg-cyan-500', 'bg-gray-100 dark:bg-gray-900'].map((color, i) => (
                      <div key={i} className={`w-6 h-3 ${color} rounded-sm`} />
                    ))}
                  </div>
                  <div className="text-xs text-gray-400">
                    <span className="text-green-500">█</span> github.api loaded • {githubStats ? 'live data' : 'cached'} 
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
      <section className="py-16 bg-gray-100/50 dark:bg-[#0d1117]/50 backdrop-blur-sm relative z-10">
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
              href="/about"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 rounded-md transition-all duration-300 hover:translate-y-[-3px] inline-flex items-center font-mono text-sm"
            >
              <span className="text-green-600 dark:text-green-400 mr-2">$</span> cat ./about/skills <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action - Terminal Style */}
      <section className="py-20 relative overflow-hidden bg-gray-100 dark:bg-[#0d1117] z-10">
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
