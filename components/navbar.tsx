"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Sun, Moon, Github, Terminal } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import ScrollProgressBar from "./scroll-progress-bar"
import { useTerminal } from "@/context/terminal-context"

const navLinks = [
  { href: "/", label: "~", fullLabel: "home" },
  { href: "/about", label: "./about", fullLabel: "about" },
  { href: "/projects", label: "./projects", fullLabel: "projects" },
  { href: "/services", label: "./services", fullLabel: "services" },
  { href: "/contact", label: "./contact", fullLabel: "contact" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { toggleTerminal, openTerminal } = useTerminal()
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  // Check if the DOM is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle theme toggle
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
      localStorage.setItem("theme", "light")
    } else {
      setTheme("dark")
      localStorage.setItem("theme", "dark")
    }
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Load theme from localStorage on mount
  useEffect(() => {
    if (mounted) {
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme) {
        setTheme(savedTheme)
      }
    }
  }, [mounted, setTheme])

  // Check if current path matches link
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full ${
        scrolled
          ? "bg-white/90 dark:bg-[#0d1117]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
          : "bg-transparent"
      } transition-all duration-300`}
    >
      <ScrollProgressBar />
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-3">
          {/* Logo - Terminal Style */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center gap-1.5 font-mono text-sm">
              <span className="text-green-600 dark:text-green-400">voxdroid</span>
              <span className="text-gray-400">@</span>
              <span className="text-cyan-600 dark:text-cyan-400">vox</span>
              <span className="text-gray-400">:</span>
              <span className="text-blue-600 dark:text-blue-400">~</span>
              <span className="text-gray-400">$</span>
            </div>
            <span className="w-2 h-4 bg-green-500 dark:bg-green-400 animate-[blink_1s_step-end_infinite]"></span>
          </Link>

          {/* Desktop Navigation - Terminal Style with Sliding Indicator */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center bg-gray-100 dark:bg-[#161b22] rounded-lg p-1 border border-gray-200 dark:border-gray-700/50">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative ${link.href === "/" ? "px-7" : "px-3"} py-1.5 font-mono text-sm transition-colors duration-200 rounded-md ${
                    isActive(link.href)
                      ? "text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                  }`}
                >
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute inset-0 bg-green-600 dark:bg-green-600 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1">
            {/* GitHub Link */}
            <a
              href="https://github.com/VoxDroid"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-[#161b22] transition-all duration-200"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5" />
            </a>

            {/* Terminal Toggle */}
            <button
              onClick={toggleTerminal}
              className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-[#161b22] transition-all duration-200 hidden md:flex items-center gap-1.5 font-mono text-xs"
              aria-label="Open Terminal"
            >
              <Terminal className="h-4 w-4" />
              <span className="hidden lg:inline">term</span>
            </button>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-[#161b22] transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#161b22] transition-all duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Terminal Style */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-white dark:bg-[#0d1117] border-t border-gray-200 dark:border-gray-800"
          >
            <nav className="container mx-auto px-4 py-4">
              <div className="font-mono text-xs text-gray-500 dark:text-gray-500 mb-3">
                <span className="text-green-600 dark:text-green-400">$</span> ls ./pages/
              </div>
              <div className="space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-mono text-sm transition-all duration-200 ${
                        isActive(link.href)
                          ? "bg-green-600 text-white"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#161b22]"
                      }`}
                    >
                      <span className={isActive(link.href) ? "text-green-200" : "text-green-600 dark:text-green-400"}>→</span>
                      <span>{link.label}</span>
                      <span className="text-xs opacity-50">/{link.fullLabel}</span>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Terminal option in mobile */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      openTerminal()
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-mono text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#161b22] transition-all duration-200"
                  >
                    <span className="text-cyan-600 dark:text-cyan-400">→</span>
                    <Terminal className="h-4 w-4" />
                    <span>./terminal</span>
                  </button>
                </motion.div>
              </div>
              
              {/* Terminal footer */}
              <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700/50 font-mono text-xs text-gray-400">
                <span className="text-green-500">●</span> {navLinks.length} items | voxdroid.vercel.app
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

