"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface AnimatedBackgroundProps {
  patternSize?: number
  patternColor?: string
  speed?: number
}

export default function AnimatedBackground({ patternSize = 20, speed = 0.5 }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    // Animation variables
    let animationFrameId: number
    let offset = 0

    // Draw pattern
    const draw = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set pattern color based on theme
      const patternColor = theme === "dark" ? "rgba(59, 130, 246, 0.05)" : "rgba(30, 58, 138, 0.05)"

      // Draw grid pattern
      ctx.strokeStyle = patternColor
      ctx.lineWidth = 1

      // Vertical lines
      for (let x = offset % patternSize; x < canvas.width; x += patternSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Horizontal lines
      for (let y = offset % patternSize; y < canvas.height; y += patternSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Update offset for animation
      offset += speed
      if (offset > patternSize * 2) offset = 0

      // Continue animation
      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", updateDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [patternSize, speed, theme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-70" />
}

