"use client"

import type React from "react"
import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useIntersection } from "@/hooks/use-intersection"
import { cn } from "@/lib/utils"

type RevealDirection = "up" | "down" | "left" | "right" | "none"

interface RevealElementProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: RevealDirection
  distance?: number
  threshold?: number
  stayVisible?: boolean
  once?: boolean
  as?: React.ElementType
}

export default function RevealElement({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 50,
  threshold = 0.1,
  stayVisible = true,
  once = false,
  as: Component = motion.div,
}: RevealElementProps) {
  const [ref, isVisible] = useIntersection<HTMLDivElement>({
    threshold,
    triggerOnce: once,
    stayVisible,
  })

  // Set initial and animate values based on direction
  const getDirectionalProps = () => {
    switch (direction) {
      case "up":
        return { y: distance, opacity: 0 }
      case "down":
        return { y: -distance, opacity: 0 }
      case "left":
        return { x: distance, opacity: 0 }
      case "right":
        return { x: -distance, opacity: 0 }
      case "none":
        return { opacity: 0 }
      default:
        return { y: distance, opacity: 0 }
    }
  }

  const initialProps = getDirectionalProps()
  const animateProps =
    direction === "none"
      ? { opacity: isVisible ? 1 : 0 }
      : {
          y: isVisible ? 0 : initialProps.y,
          x: isVisible ? 0 : initialProps.x,
          opacity: isVisible ? 1 : 0,
        }

  return (
    <Component
      ref={ref}
      initial={initialProps}
      animate={animateProps}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0], // Custom easing function for smoother animation
      }}
      className={cn(className)}
    >
      {children}
    </Component>
  )
}
