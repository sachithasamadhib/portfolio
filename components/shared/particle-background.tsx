"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"

interface ParticleBackgroundProps {
  className?: string
  particleCount?: number
  particleColor?: string
  lineColor?: string
  particleSize?: number
  speed?: number
  maxDistance?: number
  responsive?: boolean
  disableOnMobile?: boolean
}

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

export default function ParticleBackground({
  className = "",
  particleCount = 50,
  particleColor,
  lineColor,
  particleSize = 2,
  speed = 0.5,
  maxDistance = 120,
  responsive = true,
  disableOnMobile = true,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { theme } = useTheme()

  // Check for reduced motion preference and mobile device
  useEffect(() => {
    const mediaQueryReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const mediaQueryMobile = window.matchMedia("(max-width: 768px)")

    setIsReducedMotion(mediaQueryReducedMotion.matches)
    setIsMobile(mediaQueryMobile.matches)

    const handleReducedMotionChange = () => setIsReducedMotion(mediaQueryReducedMotion.matches)
    const handleMobileChange = () => setIsMobile(mediaQueryMobile.matches)

    mediaQueryReducedMotion.addEventListener("change", handleReducedMotionChange)
    mediaQueryMobile.addEventListener("change", handleMobileChange)

    return () => {
      mediaQueryReducedMotion.removeEventListener("change", handleReducedMotionChange)
      mediaQueryMobile.removeEventListener("change", handleMobileChange)
    }
  }, [])

  // Adjust particle count for mobile
  const adjustedParticleCount = isMobile && responsive ? Math.floor(particleCount / 2) : particleCount

  // Skip animation if reduced motion is preferred or on mobile if disabled
  const shouldAnimate = !(isReducedMotion || (isMobile && disableOnMobile))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for better rendering
    const updateDimensions = () => {
      if (!canvas) return

      const dpr = window.devicePixelRatio || 1
      const displayWidth = Math.floor(window.innerWidth)
      const displayHeight = Math.floor(window.innerHeight)

      setDimensions({ width: displayWidth, height: displayHeight })

      canvas.width = displayWidth * dpr
      canvas.height = displayHeight * dpr
      canvas.style.width = `${displayWidth}px`
      canvas.style.height = `${displayHeight}px`
      ctx.scale(dpr, dpr)
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    // Determine colors based on theme
    const getParticleColor = () => {
      if (particleColor) return particleColor
      return theme === "dark" ? "hsla(263, 70%, 60%, 0.6)" : "hsla(263, 70%, 50%, 0.6)"
    }

    const getLineColor = () => {
      if (lineColor) return lineColor
      return theme === "dark" ? "rgba(123, 97, 255, 0.3)" : "rgba(123, 97, 255, 0.2)"
    }

    // Create particles
    const createParticles = () => {
      const particles: Particle[] = []
      const baseColor = getParticleColor()

      for (let i = 0; i < adjustedParticleCount; i++) {
        // Create particles with slightly varied colors for visual interest
        const hue = Number.parseInt(baseColor.split(",")[0].replace("hsla(", ""), 10)
        const saturation = Number.parseInt(baseColor.split(",")[1], 10)
        const lightness = Number.parseInt(baseColor.split(",")[2], 10)
        const alpha = Number.parseFloat(baseColor.split(",")[3])

        const hueVariation = Math.random() * 20 - 10 // ±10
        const saturationVariation = Math.random() * 10 - 5 // ±5
        const lightnessVariation = Math.random() * 10 - 5 // ±5
        const alphaVariation = Math.random() * 0.2 - 0.1 // ±0.1

        const particleColor = `hsla(${hue + hueVariation}, ${saturation + saturationVariation}%, ${lightness + lightnessVariation}%, ${alpha + alphaVariation})`

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * particleSize + 1,
          speedX: (Math.random() - 0.5) * speed,
          speedY: (Math.random() - 0.5) * speed,
          color: particleColor,
        })
      }

      return particles
    }

    // Initialize particles
    particlesRef.current = createParticles()

    // Animation loop with throttling
    let lastConnectCheck = 0
    const connectThrottleMs = 30 // Only check connections every 30ms

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Move particles
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0
        else if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        else if (particle.y < 0) particle.y = canvas.height

        // React to mouse position - only if close enough for better performance
        const dx = particle.x - mousePosition.x
        const dy = particle.y - mousePosition.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 80) {
          const angle = Math.atan2(dy, dx)
          const force = (80 - distance) / 80
          particle.speedX -= Math.cos(angle) * force * 0.1
          particle.speedY -= Math.sin(angle) * force * 0.1
        }

        // Draw particle
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Connect particles with lines - throttled for performance
      const now = Date.now()
      if (now - lastConnectCheck > connectThrottleMs) {
        lastConnectCheck = now
        connectParticles()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Connect nearby particles with lines
    const connectParticles = () => {
      if (!ctx) return

      const particles = particlesRef.current
      const lineColor = getLineColor()

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            // Calculate opacity based on distance
            const opacity = (1 - distance / maxDistance) * 0.5

            ctx.beginPath()
            ctx.strokeStyle = lineColor.replace(/[\d.]+\)$/, `${opacity})`)
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Track mouse position with throttling
    let lastMouseUpdate = 0
    const mouseThrottleMs = 50 // Only update every 50ms

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastMouseUpdate < mouseThrottleMs) return

      lastMouseUpdate = now
      const rect = canvas.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    // Start animation if not using reduced motion
    if (shouldAnimate) {
      animationRef.current = requestAnimationFrame(animate)
    } else {
      // Draw static particles for reduced motion
      particlesRef.current.forEach((particle) => {
        if (!ctx) return
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })
      connectParticles()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", updateDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [
    theme,
    particleCount,
    particleColor,
    lineColor,
    particleSize,
    speed,
    maxDistance,
    shouldAnimate,
    adjustedParticleCount,
  ])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 -z-10 ${className}`}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        background: "transparent",
      }}
      aria-hidden="true"
    />
  )
}
