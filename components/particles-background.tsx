"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>(0)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Initialize particles
  useEffect(() => {
    setMounted(true)

    if (dimensions.width === 0 || dimensions.height === 0) return

    const particles: Particle[] = []
    const particleCount = Math.min(Math.floor((dimensions.width * dimensions.height) / 10000), 100)

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    particlesRef.current = particles
  }, [dimensions])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || !mounted) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Set particle color based on theme
      // Dark mode: Indigo (99, 102, 241)
      // Light mode: Darker Indigo/Slate (79, 70, 229) for visibility against light bg
      const particleColor = theme === "dark" ? "99, 102, 241" : "79, 70, 229"

      // Draw and update particles
      particlesRef.current.forEach((particle) => {
        ctx.beginPath()
        // Draw squares for terminal feel
        ctx.rect(particle.x, particle.y, particle.size, particle.size)
        ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > dimensions.width) {
          particle.speedX *= -1
        }
        if (particle.y < 0 || particle.y > dimensions.height) {
          particle.speedY *= -1
        }
      })

      // Draw connections
      ctx.beginPath()
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x
          const dy = particlesRef.current[i].y - particlesRef.current[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.strokeStyle = `rgba(${particleColor}, ${0.2 * (1 - distance / 150)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y)
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y)
          }
        }
      }
      ctx.stroke()

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [dimensions, theme, mounted])

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  )
}

