"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef } from "react"

interface GridBackgroundProps {
  className?: string
  color?: string
  spacing?: number
  lineWidth?: number
  opacity?: number
}

export default function GridBackground({
  className = "",
  color,
  spacing = 40,
  lineWidth = 0.5,
  opacity = 0.15,
}: GridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for better rendering
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      const displayWidth = Math.floor(window.innerWidth)
      const displayHeight = Math.floor(window.innerHeight)

      canvas.width = displayWidth * dpr
      canvas.height = displayHeight * dpr
      canvas.style.width = `${displayWidth}px`
      canvas.style.height = `${displayHeight}px`
      ctx.scale(dpr, dpr)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Determine grid color based on theme
    const gridColor = color || (theme === "dark" ? "rgba(100, 110, 255, 0.15)" : "rgba(100, 110, 255, 0.1)")

    // Draw grid
    const drawGrid = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = gridColor
      ctx.lineWidth = lineWidth
      ctx.globalAlpha = opacity

      // Calculate grid dimensions
      const width = canvas.width / window.devicePixelRatio
      const height = canvas.height / window.devicePixelRatio

      // Draw vertical lines
      for (let x = 0; x <= width; x += spacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      // Draw horizontal lines
      for (let y = 0; y <= height; y += spacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
    }

    drawGrid()

    // Redraw grid when theme changes
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [theme, color, spacing, lineWidth, opacity])

  return <canvas ref={canvasRef} className={`fixed inset-0 -z-10 ${className}`} aria-hidden="true" />
}
