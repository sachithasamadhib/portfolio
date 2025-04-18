"use client"

import { useState, useEffect, useRef, type RefObject } from "react"

type IntersectionOptions = {
  threshold?: number | number[]
  rootMargin?: string
  root?: Element | null
  triggerOnce?: boolean
  delay?: number
  stayVisible?: boolean
}

export function useIntersection<T extends Element>(
  options: IntersectionOptions = {},
): [RefObject<T>, boolean, IntersectionObserverEntry | null] {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    root = null,
    triggerOnce = false,
    delay = 0,
    stayVisible = true,
  } = options

  const ref = useRef<T>(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || (triggerOnce && hasTriggered)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update the entry
        setEntry(entry)

        // Handle visibility state
        if (entry.isIntersecting) {
          if (delay) {
            const timer = setTimeout(() => {
              setIsIntersecting(true)
              if (triggerOnce) {
                setHasTriggered(true)
              }
            }, delay)
            return () => clearTimeout(timer)
          } else {
            setIsIntersecting(true)
            if (triggerOnce) {
              setHasTriggered(true)
            }
          }
        } else if (!stayVisible) {
          setIsIntersecting(false)
        }
      },
      { threshold, rootMargin, root },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, root, triggerOnce, hasTriggered, delay, stayVisible])

  return [ref, isIntersecting, entry]
}
