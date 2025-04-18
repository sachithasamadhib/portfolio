"use client"

import { useEffect, useState } from "react"

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    // Throttled scroll handler for better performance
    let lastScrollUpdate = 0
    const scrollThrottleMs = 50 // Only update every 50ms

    const handleScroll = () => {
      const now = Date.now()
      if (now - lastScrollUpdate < scrollThrottleMs) return

      lastScrollUpdate = now
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
}
