"use client"

import type React from "react"

import { useRef, useEffect } from "react"

interface RevealTextProps {
  children: React.ReactNode
  className?: string
}

export default function RevealText({ children, className = "" }: RevealTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (textRef.current) {
      observer.observe(textRef.current)
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current)
      }
    }
  }, [])

  return (
    <div ref={textRef} className={`reveal-text ${className}`}>
      <span>{children}</span>
    </div>
  )
}
