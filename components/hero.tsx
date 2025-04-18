"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import MagneticButton from "./magnetic-button"
import KineticText from "./kinetic-text"
import NavBar from "./navbar"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setIsReducedMotion(mediaQuery.matches)

    const handleReducedMotionChange = () => setIsReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleReducedMotionChange)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for better rendering
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle system - optimized
    const particleCount = isReducedMotion ? 30 : 60 // Reduce particles for better performance

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1 // Smaller particles
        this.speedX = Math.random() * 1 - 0.5 // Slower movement
        this.speedY = Math.random() * 1 - 0.5
        this.color = `hsla(${Math.random() * 60 + 260}, 70%, 60%, ${Math.random() * 0.3 + 0.2})`
      }

      update() {
        // Move particles
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height

        // React to mouse position - only if close enough for better performance
        const dx = this.x - mousePosition.x
        const dy = this.y - mousePosition.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 80) {
          // Reduced reaction distance
          const angle = Math.atan2(dy, dx)
          const force = (80 - distance) / 80
          this.speedX -= Math.cos(angle) * force * 0.1 // Reduced force
          this.speedY -= Math.sin(angle) * force * 0.1
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize particles
    particlesRef.current = []
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle())
    }

    // Animation loop with throttling
    let lastConnectCheck = 0
    const connectThrottleMs = 30 // Only check connections every 30ms

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Connect particles with lines - throttled for performance
      const now = Date.now()
      if (now - lastConnectCheck > connectThrottleMs) {
        lastConnectCheck = now
        connectParticles()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Connect nearby particles with lines - optimized
    const connectParticles = () => {
      const maxDistance = 120 // Reduced connection distance
      const particles = particlesRef.current

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(123, 97, 255, ${(1 - distance / maxDistance) * 0.5})` // Reduced opacity
            ctx.lineWidth = 0.3 // Thinner lines
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Start animation if not using reduced motion
    if (!isReducedMotion) {
      animationRef.current = requestAnimationFrame(animate)
    } else {
      // Draw static particles for reduced motion
      particlesRef.current.forEach((particle) => particle.draw())
      connectParticles()
    }

    // Track mouse position with throttling
    let lastMouseUpdate = 0
    const mouseThrottleMs = 50 // Only update every 50ms

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastMouseUpdate < mouseThrottleMs) return

      lastMouseUpdate = now
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
      mediaQuery.removeEventListener("change", handleReducedMotionChange)
    }
  }, [isReducedMotion])

  return (
    <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
      <NavBar />

      <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ background: "transparent" }} />

      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex flex-col items-center md:items-start text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm uppercase tracking-[0.3em] text-primary mb-4 font-medium">Digital Creator</span>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight glitch" data-text="Sachitha Samadhi">
              Sachitha Samadhi
            </h1>

            <div className="mb-8">
              <KineticText
                text="I create digital experiences that challenge the ordinary."
                className="text-xl md:text-2xl text-zinc-400 max-w-xl font-light"
                reducedMotion={isReducedMotion}
              />
            </div>

            <div className="flex items-center gap-8 mt-4 mb-12">
              {["GitHub", "Twitter", "LinkedIn"].map((platform, index) => (
                <motion.a
                  key={platform}
                  href="#"
                  className="text-zinc-500 hover:text-primary transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-primary/5"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  {platform}
                </motion.a>
              ))}
            </div>

            <MagneticButton
              className="gradient-button text-white px-8 py-4 rounded-xl text-lg font-medium shadow-lg"
              onClick={() => {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Explore My Universe
              <ArrowDown className="ml-2 h-4 w-4" />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.8,
          repeat: isReducedMotion ? 0 : Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
      >
        <ArrowDown className="h-6 w-6 text-primary animate-bounce" />
      </motion.div>
    </section>
  )
}
