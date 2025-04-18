"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import RevealText from "./reveal-text"
import MagneticButton from "./magnetic-button"
import { FileText } from "lucide-react"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  return (
    <section id="about" className="py-32 diagonal-section">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            <span className="glitch" data-text="About Me">
              About Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto aspect-square overflow-hidden rounded-2xl glass-morphism">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-600/20 z-10 mix-blend-overlay rounded-2xl"></div>
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Sachitha Samadhi"
                width={400}
                height={400}
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500 z-0 rounded-2xl"
              />
              <div className="absolute inset-0 border border-primary/30 z-20 m-4 rounded-xl"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <RevealText className="text-3xl font-bold mb-6 text-primary">I'm Sachitha Samadhi</RevealText>

            <RevealText className="text-zinc-400 mb-6 leading-relaxed">
              I'm a digital creator and full-stack developer with over 5 years of experience crafting unique digital
              experiences. I specialize in experimental interfaces and creative coding to build applications that stand
              out from the crowd.
            </RevealText>

            <RevealText className="text-zinc-400 mb-6 leading-relaxed">
              My journey began when I built my first experimental website at 15. Since then, I've worked with
              forward-thinking startups and established companies to deliver innovative digital solutions that challenge
              conventional design.
            </RevealText>

            <RevealText className="text-zinc-400 mb-8 leading-relaxed">
              When I'm not pushing the boundaries of web development, you can find me exploring generative art,
              contributing to open-source projects, or experimenting with new technologies.
            </RevealText>

            <MagneticButton className="gradient-button text-white px-8 py-4 rounded-xl text-lg font-medium shadow-lg">
              <FileText className="mr-2 h-5 w-5" />
              Download Resume
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
