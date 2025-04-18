"use client"

import { useState, useEffect } from "react"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Skills from "@/components/sections/skills"
import Projects from "@/components/sections/projects"
import Experience from "@/components/sections/experience"
import Contact from "@/components/sections/contact"
import Footer from "@/components/sections/footer"
import ScrollProgress from "@/components/layout/scroll-progress"
import LoadingScreen from "@/components/loading-screen"
import GridBackground from "@/components/grid-background"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  // Optional: Skip loading screen in development for faster refresh
  useEffect(() => {
    // Check if we're in development and if we've already shown the loading screen
    const hasSeenLoading = sessionStorage.getItem("hasSeenLoading")
    if (process.env.NODE_ENV === "development" && hasSeenLoading) {
      setIsLoading(false)
    } else {
      // Set the flag for future refreshes
      sessionStorage.setItem("hasSeenLoading", "true")
    }
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    // Enable scrolling after loading
    document.body.style.overflow = "auto"
  }

  // Disable scrolling during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isLoading])

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      <main
        className={`min-h-screen text-foreground overflow-hidden transition-opacity duration-1000 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <GridBackground />
        <div className="noise" aria-hidden="true" />
        <ScrollProgress />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
