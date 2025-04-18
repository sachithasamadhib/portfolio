"use client"

import { useEffect, useRef } from "react"

interface KineticTextProps {
  text: string
  className?: string
  reducedMotion?: boolean
}

export default function KineticText({ text, className = "", reducedMotion = false }: KineticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const spans = container.querySelectorAll("span")

    // Skip animation if reduced motion is preferred
    if (reducedMotion) return

    spans.forEach((span, index) => {
      // Limit the number of animated characters for performance
      if (index < 20) {
        span.style.animationDelay = `${index * 0.1}s`
      } else {
        span.style.animation = "none"
      }
    })
  }, [text, reducedMotion])

  return (
    <div ref={containerRef} className={`${className} ${reducedMotion ? "" : "kinetic-text"}`}>
      {text.split("").map((char, index) => (
        <span key={index} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  )
}
