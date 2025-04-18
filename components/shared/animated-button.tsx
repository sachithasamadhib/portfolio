"use client"

import type React from "react"

import { useState, useRef, useEffect, forwardRef, type ButtonHTMLAttributes } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "gradient" | "ghost"
  size?: "sm" | "md" | "lg" | "xl"
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  fullWidth?: boolean
  magnetic?: boolean
  glowEffect?: boolean
  hoverScale?: number
  className?: string
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "left",
      fullWidth = false,
      magnetic = true,
      glowEffect = false,
      hoverScale = 1.02,
      className,
      ...props
    },
    ref,
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)
    const [isReducedMotion, setIsReducedMotion] = useState(false)

    // Check for reduced motion preference
    useEffect(() => {
      if (typeof window !== "undefined") {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
        setIsReducedMotion(mediaQuery.matches)

        const handleChange = () => setIsReducedMotion(mediaQuery.matches)
        mediaQuery.addEventListener("change", handleChange)
        return () => mediaQuery.removeEventListener("change", handleChange)
      }
    }, [])

    // Skip magnetic effect if reduced motion is preferred
    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current || isReducedMotion || !magnetic) return

      const { clientX, clientY } = e
      const { left, top, width, height } = buttonRef.current.getBoundingClientRect()

      const x = (clientX - (left + width / 2)) * 0.15 // Reduced movement
      const y = (clientY - (top + height / 2)) * 0.15

      setPosition({ x, y })
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
      setIsHovered(false)
    }

    // Variant styles
    const variantStyles = {
      primary: "bg-primary text-white hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border border-primary/50 bg-background/30 backdrop-blur-sm text-primary hover:bg-primary/10",
      gradient: "bg-gradient-to-r from-primary to-purple-600/80 text-white",
      ghost: "bg-transparent hover:bg-primary/10 text-primary",
    }

    // Size styles
    const sizeStyles = {
      sm: "text-sm py-2 px-4",
      md: "text-base py-2.5 px-5",
      lg: "text-lg py-3 px-6",
      xl: "text-xl py-4 px-8",
    }

    return (
      <motion.button
        ref={buttonRef as any}
        className={cn(
          "relative flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-300",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth ? "w-full" : "",
          glowEffect && isHovered ? "shadow-glow" : "shadow-md hover:shadow-lg",
          className,
        )}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${isHovered ? hoverScale : 1})`,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.98 }}
        ref={ref as any}
        {...props}
      >
        {icon && iconPosition === "left" && <span className="flex-shrink-0">{icon}</span>}
        <span className="flex-1 text-center">{children}</span>
        {icon && iconPosition === "right" && <span className="flex-shrink-0">{icon}</span>}

        {glowEffect && (
          <span
            className={cn(
              "absolute inset-0 rounded-xl bg-gradient-to-r from-primary/40 to-purple-600/40 opacity-0 blur-xl transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0",
            )}
            aria-hidden="true"
          />
        )}
      </motion.button>
    )
  },
)

AnimatedButton.displayName = "AnimatedButton"

export default AnimatedButton
