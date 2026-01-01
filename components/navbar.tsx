"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Sun, Moon, Github, Terminal } from "lucide-react"
import { useTheme } from "next-themes"
import ScrollProgressBar from "./scroll-progress-bar"
import { useTerminal } from "@/context/terminal-context"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
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
      // Store theme preference in localStorage
      localStorage.setItem("theme", "light")
    } else {
      setTheme("dark")
      // Store theme preference in localStorage
      localStorage.setItem("theme", "dark")
    }
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    // Initial check
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

  return (
    <header
      className={`sticky top-0 z-50 w-full ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      } transition-all duration-300`}
    >
      <ScrollProgressBar />
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-bold text-foreground font-mono group-hover:text-primary transition-colors">~/voxdroid</span>
            <span className="animate-pulse w-2 h-5 bg-primary block"></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-all duration-300 hover:text-primary dark:hover:text-primary-light ${
                  pathname === link.href
                    ? "text-primary dark:text-primary-light scale-105"
                    : "text-accent-dark dark:text-accent-light"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* GitHub Link */}
            <a
              href="https://github.com/VoxDroid"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-primary transition-colors duration-300"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5" />
            </a>

            {/* Terminal Toggle */}
            <button
              onClick={toggleTerminal}
              className="p-2 hover:text-primary transition-colors duration-300 hidden md:block"
              aria-label="Open Terminal"
            >
              <Terminal className="h-5 w-5" />
            </button>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 hover:text-primary dark:hover:text-primary-light transition-colors duration-300"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } md:hidden transition-opacity duration-300 ease-in-out`}
        style={{ top: "64px" }}
      >
        <nav className="flex flex-col items-center mt-10 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-xl font-medium transition-all duration-300 ${
                pathname === link.href
                  ? "text-primary scale-105"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              openTerminal()
            }}
            className="text-xl font-medium text-muted-foreground hover:text-primary transition-all duration-300 flex items-center gap-2"
          >
            <Terminal className="h-5 w-5" /> Terminal
          </button>
        </nav>
      </div>
    </header>
  )
}

