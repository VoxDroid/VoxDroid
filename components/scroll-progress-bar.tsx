"use client"

import { useState, useEffect } from "react"

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPosition = window.scrollY
      if (totalHeight) {
        setScrollProgress((scrollPosition / totalHeight) * 100)
      }
    }

    // Initial calculation
    handleScroll()

    // Add event listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div
        className="h-full bg-gradient-to-r from-primary via-primary-light to-primary-light dark:from-primary-light dark:via-primary dark:to-primary-light transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </div>
  )
}

