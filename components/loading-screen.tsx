"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import GridBackground from "@/components/grid-background"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevProgress + Math.random() * 15
      })
    }, 200)

    // Cleanup interval
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // When progress reaches 100, wait a bit then complete
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setIsComplete(true)
        setTimeout(onLoadingComplete, 1000) // Allow exit animation to play
      }, 500)
      return () => clearTimeout(timeout)
    }
  }, [progress, onLoadingComplete])

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <GridBackground spacing={30} opacity={0.2} />

          <div className="relative z-10 flex flex-col items-center">
            {/* Futuristic logo */}
            <motion.div
              className="relative mb-12"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-primary/20 to-purple-600/20 flex items-center justify-center backdrop-blur-md border border-primary/30">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600/80 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white font-display">AM</span>
                </div>
              </div>

              {/* Orbiting elements */}
              <motion.div
                className="absolute top-0 left-0 right-0 bottom-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full" />
              </motion.div>

              <motion.div
                className="absolute top-0 left-0 right-0 bottom-0"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full" />
              </motion.div>
            </motion.div>

            {/* Glitch text */}
            <motion.div
              className="mb-12"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
                <span className="glitch" data-text="INITIALIZING PORTFOLIO">
                  INITIALIZING PORTFOLIO
                </span>
              </h1>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="w-64 md:w-80 h-1 bg-zinc-800 rounded-full overflow-hidden mb-4"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "20rem", opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-purple-600"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>

            {/* Loading text */}
            <motion.div
              className="text-sm text-zinc-400 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {progress < 100 ? (
                <span>Loading assets... {Math.round(progress)}%</span>
              ) : (
                <span className="text-primary">Ready to launch</span>
              )}
            </motion.div>

            {/* Futuristic decorative elements */}
            <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-[200%] h-8 flex justify-center space-x-2 opacity-20">
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-full bg-primary"
                  initial={{ height: 0 }}
                  animate={{ height: Math.random() * 32 }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
