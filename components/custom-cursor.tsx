"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isEnabled, setIsEnabled] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    // Skip cursor tracking if disabled
    if (!isEnabled) {
      document.body.style.cursor = "auto"
      document.querySelectorAll("*").forEach((el) => {
        el.style.cursor = ""
      })
      return
    }

    // Hide default cursor when custom cursor is enabled
    document.body.style.cursor = "none"
    document.querySelectorAll("*").forEach((el) => {
      el.style.cursor = "none"
    })

    // Throttle mouse move updates for better performance
    let lastUpdate = 0
    const throttleMs = 10 // Only update every 10ms

    const updateCursorPosition = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastUpdate < throttleMs) return

      lastUpdate = now
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => {
      setIsHidden(false)
    }

    const handleMouseLeave = () => {
      setIsHidden(true)
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    const handleLinkHover = () => {
      setIsHovering(true)
    }

    const handleLinkLeave = () => {
      setIsHovering(false)
    }

    // Add event listeners
    document.addEventListener("mousemove", updateCursorPosition, { passive: true })
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    // Only add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll("a, button, input, textarea, [role='button']")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleLinkHover)
      el.addEventListener("mouseleave", handleLinkLeave)
    })

    // Add keyboard shortcut to toggle cursor
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "c" && e.ctrlKey) {
        setIsEnabled((prev) => !prev)
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousemove", updateCursorPosition)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("keydown", handleKeyDown)

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHover)
        el.removeEventListener("mouseleave", handleLinkLeave)
      })

      // Reset cursor styles
      document.body.style.cursor = "auto"
      document.querySelectorAll("*").forEach((el) => {
        el.style.cursor = ""
      })
    }
  }, [isEnabled])

  // Don't render anything if disabled
  if (!isEnabled) return null

  return (
    <>
      <div
        className={`cursor-dot ${isHidden ? "opacity-0" : "opacity-100"} ${isClicking ? "scale-50" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          backgroundColor: theme === "dark" ? "hsl(var(--primary))" : "hsl(var(--primary))",
        }}
      />
      <div
        className={`cursor-outline ${isHidden ? "opacity-0" : "opacity-100"} ${isHovering ? "cursor-hover" : ""} ${
          isClicking ? "scale-75" : ""
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transitionDuration: "150ms",
          transitionTimingFunction: "ease-out",
          borderColor: theme === "dark" ? "hsl(var(--primary))" : "hsl(var(--primary))",
        }}
      />
      <div className="fixed bottom-4 right-4 z-[100] text-xs bg-background/80 backdrop-blur-sm p-2 rounded-md">
        Press <kbd className="px-1 py-0.5 bg-muted rounded">Ctrl+C</kbd> to toggle cursor
      </div>
    </>
  )
}
