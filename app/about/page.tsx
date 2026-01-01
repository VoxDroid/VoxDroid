"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Award, BookOpen, UserCheck, Coffee, Terminal, GitBranch, Calendar, Cpu, Monitor, Globe, Wrench, Heart, GraduationCap, Languages, Gamepad2, Music, Book, Code, Server, Laptop, Lock, Unlock } from "lucide-react"

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

const journeyItems = [
  {
    id: 1,
    title: "init_journey.sh",
    period: "2015 - 2016",
    description:
      "My interest in computer related things sparked in 2015, and I started learning LUA, BATCH scripts, and SHELL scripts.",
    command: "chmod +x ./learning.sh && ./learning.sh",
  },
  {
    id: 2,
    title: "expand_skills.sh",
    period: "2017 - 2020",
    description:
      "I began learning desktop software and web development. I also started learning android development and machine learning.",
    command: "pacman -S webdev android ml --noconfirm",
  },
  {
    id: 3,
    title: "level_up.sh",
    period: "2021 - 2023",
    description:
      "Worked on several personal side projects, refining my skills in system architecture, AI/ML, and application development.",
    command: "git commit -m 'feat: personal growth'",
  },
  {
    id: 4,
    title: "current_status.sh",
    period: "2024 - Present",
    description:
      "Currently focused on advanced technologies like Next.js, TypeScript, Rust Programming Language, and exploring new frontiers in web development and Data Science.",
    command: "systemctl status voxdroid.service",
  },
]

const systemInfo = [
  { label: "USER", value: "VoxDroid", icon: UserCheck },
  { label: "ROLE", value: "Full Stack Developer", icon: Cpu },
  { label: "SHELL", value: "/bin/zsh", icon: Terminal },
  { label: "UPTIME", value: "∞", icon: Calendar },
]

const interests = [
  { name: "Open Source", icon: GitBranch, color: "green" },
  { name: "UI/UX Design", icon: Monitor, color: "purple" },
  { name: "Web Performance", icon: Globe, color: "blue" },
  { name: "AI/ML", icon: Cpu, color: "yellow" },
  { name: "DevOps", icon: Wrench, color: "orange" },
  { name: "Linux", icon: Terminal, color: "cyan" },
]

const education = [
  {
    institution: "Laguna State Polytechnic University",
    campus: "Santa Cruz (Main) Campus",
    period: "2022 - Present",
    degree: "Bachelor of Science in Computer Science",
    specialization: "Intelligent Systems Specialization",
    achievements: ["Consistent Dean's Lister"],
  },
  {
    institution: "Laguna Senior High School",
    campus: "Santa Cruz, Laguna",
    period: "2020 - 2022",
    degree: "Science, Technology, Engineering, and Math",
    achievements: ["Award for Exemplary Performance", "With High Honors (95)"],
  },
  {
    institution: "Pedro Guevera Memorial National High School",
    campus: "Santa Cruz, Laguna",
    period: "2016 - 2020",
    degree: "Science, Technology, Engineering, and Math",
    achievements: ["With High Honors (95)"],
  },
]

const technicalSkills = {
  operatingSystems: [
    { name: "Windows", level: "Proficient" },
    { name: "Linux", level: "Proficient" },
    { name: "Android", level: "Proficient" },
    { name: "MacOS/iOS", level: "Intermediate" },
  ],
  programmingLanguages: [
    "Python", "C/C++/C#", "Java", "Javascript",
    "Rust", "VBS", "Batch", "Lua",
    "PHP", "Typescript", "Dart", "Swift",
  ],
  hardware: [
    "PC Assembly", "Networking", "Electronics",
    "Single-board Computers", "Embedded Systems Prototyping",
  ],
  software: ["Git/GitHub", "Docker", "Tmux", "VMware"],
  other: ["Shell Scripting", "Vim/Neovim", "CLI", "Pacman"],
}

const languageSkills = [
  { name: "English", level: "Fluent" },
  { name: "Tagalog", level: "Native" },
]

const personalInterests = [
  { name: "Open-source development", icon: GitBranch },
  { name: "AI Experiments", icon: Cpu },
  { name: "Reading novels", icon: Book },
  { name: "Music", icon: Music },
  { name: "Games", icon: Gamepad2 },
  { name: "Computers", icon: Laptop },
]

export default function AboutPage() {
  const [terminalInput, setTerminalInput] = useState("")
  const [terminalHistory, setTerminalHistory] = useState<string[]>([])
  const [secretRevealed, setSecretRevealed] = useState(false)
  const [mounted, setMounted] = useState(false)
  const terminalHistoryRef = useRef<HTMLDivElement>(null)
  
  // Load saved state from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("voxdroid-identity-unlocked")
    if (saved === "true") {
      setSecretRevealed(true)
    }
  }, [])
  
  // Auto-scroll to latest output
  useEffect(() => {
    if (terminalHistoryRef.current) {
      terminalHistoryRef.current.scrollTop = terminalHistoryRef.current.scrollHeight
    }
  }, [terminalHistory])
  
  const SECRET_COMMAND = "sudo reveal --identity"
  const LOCK_COMMAND = "lock"
  
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const input = terminalInput.trim().toLowerCase()
    const newHistory = [...terminalHistory, `$ ${terminalInput}`]
    
    if (input === SECRET_COMMAND.toLowerCase() || input === "sudo reveal --identity") {
      newHistory.push("[sudo] password for voxdroid: ********")
      newHistory.push("")
      newHistory.push("✓ Identity decrypted successfully!")
      newHistory.push("✓ Fastfetch panel extended.")
      newHistory.push("")
      newHistory.push("Type 'lock' to hide identity again.")
      setSecretRevealed(true)
      localStorage.setItem("voxdroid-identity-unlocked", "true")
    } else if (input === LOCK_COMMAND) {
      newHistory.push("✓ Identity locked.")
      newHistory.push("✓ Fastfetch panel collapsed.")
      setSecretRevealed(false)
      localStorage.setItem("voxdroid-identity-unlocked", "false")
    } else if (input === "help" || input === "--help" || input === "-h") {
      newHistory.push("Available commands:")
      newHistory.push("  help          - Show this help message")
      newHistory.push("  clear         - Clear terminal")
      newHistory.push("  whoami        - Display current user")
      newHistory.push("  hint          - Get a hint for the secret")
      newHistory.push("  lock          - Lock the identity (if unlocked)")
      newHistory.push("  ???           - Try: sudo reveal --identity")
    } else if (input === "clear") {
      setTerminalHistory([])
      setTerminalInput("")
      return
    } else if (input === "whoami") {
      newHistory.push("voxdroid")
    } else if (input === "hint") {
      newHistory.push("💡 Hint: To reveal the real identity, you need elevated privileges...")
      newHistory.push("   Try using 'sudo' with 'reveal --identity'")
    } else if (input === "") {
      // Do nothing for empty input
    } else {
      newHistory.push(`bash: ${terminalInput}: command not found`)
      newHistory.push("Type 'help' for available commands")
    }
    
    setTerminalHistory(newHistory)
    setTerminalInput("")
  }

  return (
    <div className="min-h-screen py-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
            <span className="text-green-600 dark:text-green-400">$</span> <span className="text-gray-700 dark:text-gray-300">cat</span> <span className="text-cyan-600 dark:text-cyan-400">/home/voxdroid/about.md</span>
          </h1>
          <p className="text-gray-500 font-mono text-sm">// Personal information loaded</p>
        </motion.div>

        {/* Personal Info - Fastfetch Style */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          <motion.div variants={fadeInUp} className="lg:w-2/5">
            <div className="bg-white dark:bg-[#0d1117] rounded-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm font-mono ml-2">fastfetch</span>
                </div>
                {mounted && (
                  <div className="flex items-center gap-2">
                    {secretRevealed ? (
                      <Unlock className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <Lock className="h-3.5 w-3.5 text-gray-400" />
                    )}
                  </div>
                )}
              </div>
              
              {/* Fastfetch Content */}
              <div className="p-6 flex gap-6">
                {/* ASCII Art / Image */}
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-green-500/30 flex-shrink-0">
                  <Image
                    src="/profile/VoxDroid.jpg"
                    alt="VoxDroid"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* System Info */}
                <div className="font-mono text-sm space-y-1">
                  <div className="text-cyan-600 dark:text-cyan-400 font-bold mb-2">voxdroid@arch</div>
                  <div className="text-gray-400 dark:text-gray-600">─────────────</div>
                  {systemInfo.map((item) => (
                    <div key={item.label} className="flex">
                      <span className="text-green-600 dark:text-green-400 w-20">{item.label}</span>
                      <span className="text-gray-400">: </span>
                      <span className="text-gray-700 dark:text-gray-300">{item.value}</span>
                    </div>
                  ))}
                  <div className="flex">
                    <span className="text-green-600 dark:text-green-400 w-20">STATUS</span>
                    <span className="text-gray-400">: </span>
                    <span className="text-green-600 dark:text-green-400">● Active</span>
                  </div>
                </div>
              </div>
              
              {/* Animated Identity Section */}
              <motion.div
                initial={false}
                animate={{
                  height: mounted && secretRevealed ? "auto" : 0,
                  opacity: mounted && secretRevealed ? 1 : 0,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-2">
                  <div className="border-t border-dashed border-gray-300 dark:border-gray-700 pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Unlock className="h-4 w-4 text-green-500" />
                      <span className="text-green-600 dark:text-green-400 font-mono text-xs font-bold">IDENTITY DECRYPTED</span>
                    </div>
                    <div className="font-mono text-sm space-y-1">
                      <div className="flex">
                        <span className="text-cyan-600 dark:text-cyan-400 w-20">NAME</span>
                        <span className="text-gray-400">: </span>
                        <span className="text-gray-700 dark:text-gray-300">Mhar Andrei C. Macapallag</span>
                      </div>
                      <div className="flex">
                        <span className="text-cyan-600 dark:text-cyan-400 w-20">BORN</span>
                        <span className="text-gray-400">: </span>
                        <span className="text-gray-700 dark:text-gray-300">July 28, 2003</span>
                      </div>
                      <div className="flex">
                        <span className="text-cyan-600 dark:text-cyan-400 w-20">ALIAS</span>
                        <span className="text-gray-400">: </span>
                        <span className="text-gray-700 dark:text-gray-300">VoxDroid</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="lg:w-3/5">
            <div className="bg-white dark:bg-[#0d1117] rounded-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden h-full">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
                <Terminal className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                <span className="text-gray-500 dark:text-gray-400 text-sm font-mono">cat README.md</span>
              </div>
              
              <div className="p-6 font-mono">
                <div className="text-green-600 dark:text-green-400 text-lg mb-4"># Who is VoxDroid?</div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  I like making things that help people. I enjoy working on problems step by step, trying different ideas, and learning from others. I listen more than I speak, stay calm when things go wrong, and always try to do better. I still have a lot to learn, but I am happy to bring care and effort to any project. I look forward to working with good teams and growing together.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  I am in this field because I truly enjoy it. Computers fascinate me, and I work on them mostly for my own curiosity and happiness. I love understanding how they work, from the simple flow of electricity through small parts, to how basic switches build into complex programs we use every day. I like both the hardware side, such as circuits and memory, and the software side, such as writing clear code and making systems that run smoothly.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <UserCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm">Steady Hands</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <BookOpen className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    <span className="text-sm">Curious</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Award className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-sm">Low-Level Thinker</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Coffee className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    <span className="text-sm">Clean Code</span>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-md shadow-lg transition-all duration-300 hover:translate-y-[-3px] hover:shadow-green-500/25 inline-flex items-center font-mono text-sm"
                >
                  <span className="text-green-300 mr-2">$</span> ./contact.sh <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mini Terminal - Secret Identity */}
        <motion.div variants={fadeInUp} className="max-w-3xl mx-auto mb-16">
          <div className="bg-white dark:bg-[#0d1117] rounded-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-sm font-mono ml-2">identity.sh</span>
              </div>
              <div className="flex items-center gap-2">
                {secretRevealed ? (
                  <Unlock className="h-4 w-4 text-green-500" />
                ) : (
                  <Lock className="h-4 w-4 text-yellow-500" />
                )}
                <span className={`text-xs font-mono ${secretRevealed ? 'text-green-500' : 'text-yellow-500'}`}>
                  {secretRevealed ? 'UNLOCKED' : 'LOCKED'}
                </span>
              </div>
            </div>
            
            {/* Terminal Body */}
            <div className="p-4 font-mono text-sm">
              {/* Hint message */}
              <div className="mb-4 p-3 bg-gray-50 dark:bg-[#161b22] rounded border border-gray-200 dark:border-gray-700/50">
                <p className="text-gray-500 dark:text-gray-500 text-xs mb-1">
                  <span className="text-yellow-600 dark:text-yellow-400">#</span> This terminal contains a secret. Type <code className="text-cyan-600 dark:text-cyan-400">help</code> or <code className="text-cyan-600 dark:text-cyan-400">hint</code> to get started.
                </p>
              </div>
              
              {/* Terminal History */}
              <div ref={terminalHistoryRef} className="space-y-1 mb-3 max-h-48 overflow-y-auto scroll-smooth">
                {terminalHistory.map((line, index) => (
                  <div key={index} className={`${
                    line.startsWith('$') 
                      ? 'text-gray-700 dark:text-gray-300' 
                      : line.includes('IDENTITY DECRYPTED') || line.includes('🔓')
                        ? 'text-green-600 dark:text-green-400'
                        : line.includes('NAME') || line.includes('BORN') || line.includes('ALIAS')
                          ? 'text-cyan-600 dark:text-cyan-400'
                          : line.includes('bash:') || line.includes('command not found')
                            ? 'text-red-500 dark:text-red-400'
                            : line.includes('💡')
                              ? 'text-yellow-600 dark:text-yellow-400'
                              : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {line}
                  </div>
                ))}
              </div>
              
              {/* Input Line */}
              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 p-2 rounded-lg border border-transparent focus-within:border-green-500 dark:focus-within:border-green-400 focus-within:bg-gray-50 dark:focus-within:bg-[#161b22] transition-colors">
                <span className="text-green-600 dark:text-green-400">voxdroid@arch</span>
                <span className="text-gray-400">:</span>
                <span className="text-blue-600 dark:text-blue-400">~</span>
                <span className="text-gray-400">$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 font-mono placeholder-gray-400 dark:placeholder-gray-600"
                  placeholder="type a command..."
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
            </div>
          </div>
        </motion.div>

        {/* Journey Timeline - Git Log Style */}
        <motion.div variants={fadeInUp} className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-mono">
              <span className="text-green-600 dark:text-green-400">$</span> <span className="text-gray-700 dark:text-gray-300">git log</span> <span className="text-cyan-600 dark:text-cyan-400">--oneline ./journey</span>
            </h2>
            <p className="text-gray-500 font-mono text-sm mt-2">// Commit history</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Git branch line */}
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-cyan-500 to-green-500/30"></div>
              
              {journeyItems.map((item, index) => (
                <motion.div
                  variants={fadeInUp}
                  key={item.id}
                  className="relative pl-20 pb-12 last:pb-0"
                >
                  {/* Commit dot */}
                  <div className="absolute left-6 top-2 w-5 h-5 rounded-full bg-white dark:bg-[#0d1117] border-2 border-green-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="bg-white dark:bg-[#0d1117] rounded-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden transition-all duration-300 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10">
                    <div className="px-4 py-2 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50 flex items-center justify-between">
                      <span className="text-yellow-600 dark:text-yellow-400 font-mono text-sm">{item.title}</span>
                      <span className="text-gray-500 font-mono text-xs">{item.period}</span>
                    </div>
                    <div className="p-4">
                      <div className="font-mono text-xs text-gray-500 mb-2">
                        <span className="text-green-600 dark:text-green-400">voxdroid@arch</span>:<span className="text-blue-600 dark:text-blue-400">~</span>$ {item.command}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Interests Section - Package List Style */}
        <motion.div variants={fadeInUp}>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-mono">
              <span className="text-green-600 dark:text-green-400">$</span> <span className="text-gray-700 dark:text-gray-300">pacman -Qi</span> <span className="text-cyan-600 dark:text-cyan-400">interests</span>
            </h2>
            <p className="text-gray-500 font-mono text-sm mt-2">// Installed packages</p>
          </div>

          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {interests.map((interest) => {
              const colorClasses: Record<string, string> = {
                green: "border-green-500/50 hover:border-green-500 hover:shadow-green-500/10",
                purple: "border-purple-500/50 hover:border-purple-500 hover:shadow-purple-500/10",
                blue: "border-blue-500/50 hover:border-blue-500 hover:shadow-blue-500/10",
                yellow: "border-yellow-500/50 hover:border-yellow-500 hover:shadow-yellow-500/10",
                orange: "border-orange-500/50 hover:border-orange-500 hover:shadow-orange-500/10",
                cyan: "border-cyan-500/50 hover:border-cyan-500 hover:shadow-cyan-500/10",
              }
              const iconColorClasses: Record<string, string> = {
                green: "text-green-600 dark:text-green-400",
                purple: "text-purple-600 dark:text-purple-400",
                blue: "text-blue-600 dark:text-blue-400",
                yellow: "text-yellow-600 dark:text-yellow-400",
                orange: "text-orange-600 dark:text-orange-400",
                cyan: "text-cyan-600 dark:text-cyan-400",
              }
              
              return (
                <motion.div
                  variants={fadeInUp}
                  key={interest.name}
                  className={`bg-white dark:bg-[#0d1117] rounded-lg border ${colorClasses[interest.color]} p-4 transition-all duration-300 hover:translate-y-[-3px] hover:shadow-lg flex items-center gap-4`}
                >
                  <div className={`p-2 rounded-lg bg-gray-100 dark:bg-[#161b22] ${iconColorClasses[interest.color]}`}>
                    <interest.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-gray-900 dark:text-white font-mono text-sm">{interest.name}</div>
                    <div className="text-gray-500 text-xs font-mono">● installed</div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
          
          {/* Additional interests as tags */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["Modern Frameworks", "Web Performance", "Software Development", "Desktop Applications", "Operating Systems", "Computer Hardware"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-[#161b22] border border-gray-200 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 text-xs rounded-full font-mono hover:border-green-500/50 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div variants={fadeInUp} className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-mono">
              <span className="text-green-600 dark:text-green-400">$</span> <span className="text-gray-700 dark:text-gray-300">cat</span> <span className="text-cyan-600 dark:text-cyan-400">./education.log</span>
            </h2>
            <p className="text-gray-500 font-mono text-sm mt-2">// Academic history</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {education.map((edu, index) => (
              <motion.div
                variants={fadeInUp}
                key={index}
                className="bg-white dark:bg-[#161b22] rounded-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden hover:border-green-500/50 transition-colors"
              >
                <div className="px-4 py-3 bg-gray-100 dark:bg-[#0d1117] border-b border-gray-200 dark:border-gray-700/50 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="font-mono text-sm text-gray-900 dark:text-white">{edu.institution}</span>
                  </div>
                  <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">{edu.period}</span>
                </div>
                <div className="p-4">
                  <p className="text-gray-500 dark:text-gray-500 text-xs font-mono mb-2">📍 {edu.campus}</p>
                  <p className="text-gray-800 dark:text-gray-200 font-mono text-sm mb-1">{edu.degree}</p>
                  {edu.specialization && (
                    <p className="text-yellow-600 dark:text-yellow-400 text-xs font-mono mb-3">└─ {edu.specialization}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {edu.achievements.map((achievement, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-mono rounded"
                      >
                        <Award className="h-3 w-3" /> {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills & Interests Section */}
        <motion.div variants={fadeInUp} className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-mono">
              <span className="text-green-600 dark:text-green-400">$</span> <span className="text-gray-700 dark:text-gray-300">neofetch</span> <span className="text-cyan-600 dark:text-cyan-400">--skills</span>
            </h2>
            <p className="text-gray-500 font-mono text-sm mt-2">// System capabilities</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-[#161b22] rounded-lg border border-gray-200 dark:border-gray-700/50 overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-[#0d1117] border-b border-gray-200 dark:border-gray-700/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-sm font-mono ml-2">skills.sh</span>
              </div>

              <div className="p-6 grid md:grid-cols-2 gap-6">
                {/* Technical Skills */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-mono text-sm font-bold">
                    <Code className="h-4 w-4" />
                    <span>TECHNICAL_SKILLS</span>
                  </div>

                  {/* Operating Systems */}
                  <div className="bg-gray-50 dark:bg-[#0d1117] rounded-lg p-4 border border-gray-200 dark:border-gray-700/50">
                    <div className="text-xs font-mono text-gray-500 dark:text-gray-500 mb-2">operating_systems:</div>
                    <div className="space-y-1">
                      {technicalSkills.operatingSystems.map((os) => (
                        <div key={os.name} className="flex justify-between font-mono text-sm">
                          <span className="text-gray-700 dark:text-gray-300">├─ {os.name}</span>
                          <span className={`text-xs ${os.level === 'Proficient' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                            [{os.level}]
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Programming Languages */}
                  <div className="bg-gray-50 dark:bg-[#0d1117] rounded-lg p-4 border border-gray-200 dark:border-gray-700/50">
                    <div className="text-xs font-mono text-gray-500 dark:text-gray-500 mb-2">programming_languages:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {technicalSkills.programmingLanguages.map((lang) => (
                        <span
                          key={lang}
                          className="px-2 py-0.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-mono rounded"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hardware */}
                  <div className="bg-gray-50 dark:bg-[#0d1117] rounded-lg p-4 border border-gray-200 dark:border-gray-700/50">
                    <div className="text-xs font-mono text-gray-500 dark:text-gray-500 mb-2">hardware:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {technicalSkills.hardware.map((hw) => (
                        <span
                          key={hw}
                          className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-mono rounded"
                        >
                          {hw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Software & Other */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 dark:bg-[#0d1117] rounded-lg p-3 border border-gray-200 dark:border-gray-700/50">
                      <div className="text-xs font-mono text-gray-500 dark:text-gray-500 mb-2">software:</div>
                      <div className="space-y-1">
                        {technicalSkills.software.map((sw) => (
                          <div key={sw} className="text-xs font-mono text-cyan-600 dark:text-cyan-400">• {sw}</div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-[#0d1117] rounded-lg p-3 border border-gray-200 dark:border-gray-700/50">
                      <div className="text-xs font-mono text-gray-500 dark:text-gray-500 mb-2">other:</div>
                      <div className="space-y-1">
                        {technicalSkills.other.map((item) => (
                          <div key={item} className="text-xs font-mono text-purple-600 dark:text-purple-400">• {item}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Languages & Interests */}
                <div className="space-y-4">
                  {/* Language Skills */}
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-mono text-sm font-bold">
                    <Languages className="h-4 w-4" />
                    <span>LANGUAGE_SKILLS</span>
                  </div>

                  <div className="bg-gray-50 dark:bg-[#0d1117] rounded-lg p-4 border border-gray-200 dark:border-gray-700/50">
                    <div className="space-y-2">
                      {languageSkills.map((lang) => (
                        <div key={lang.name} className="flex items-center justify-between font-mono text-sm">
                          <span className="text-gray-700 dark:text-gray-300">{lang.name}</span>
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            lang.level === 'Native' 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                          }`}>
                            {lang.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Personal Interests */}
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-mono text-sm font-bold mt-6">
                    <Heart className="h-4 w-4" />
                    <span>HOBBIES</span>
                  </div>

                  <div className="bg-gray-50 dark:bg-[#0d1117] rounded-lg p-4 border border-gray-200 dark:border-gray-700/50">
                    <div className="grid grid-cols-2 gap-3">
                      {personalInterests.map((interest) => (
                        <div
                          key={interest.name}
                          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-mono text-xs"
                        >
                          <interest.icon className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                          <span>{interest.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status Output */}
                  <div className="bg-gray-50 dark:bg-[#0d1117] rounded-lg p-4 border border-gray-200 dark:border-gray-700/50 mt-4">
                    <div className="font-mono text-xs space-y-1">
                      <div className="text-gray-500">$ echo $STATUS</div>
                      <div className="text-green-600 dark:text-green-400">▸ Available for opportunities</div>
                      <div className="text-gray-500 mt-2">$ echo $LEARNING</div>
                      <div className="text-yellow-600 dark:text-yellow-400">▸ Always exploring new technologies</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

