"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase, Calendar } from "lucide-react"
import RevealText from "./reveal-text"

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

  const experiences = [
    {
      title: "Creative Technologist",
      company: "Digital Frontiers Studio",
      period: "2021 - Present",
      description:
        "Leading experimental web projects and developing innovative digital experiences using WebGL, Three.js, and creative coding techniques.",
      technologies: ["WebGL", "Three.js", "GLSL", "React", "Creative Coding"],
    },
    {
      title: "Interactive Developer",
      company: "Immersive Labs",
      period: "2018 - 2021",
      description:
        "Created interactive installations and web experiences with a focus on animation, 3D graphics, and unconventional user interfaces.",
      technologies: ["Canvas API", "GSAP", "p5.js", "React", "Node.js"],
    },
    {
      title: "Frontend Developer",
      company: "Experimental Design Agency",
      period: "2016 - 2018",
      description:
        "Developed experimental websites and digital experiences with a focus on animation and interactive storytelling.",
      technologies: ["JavaScript", "CSS", "SVG Animation", "WebGL"],
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="experience" className="py-32 diagonal-section bg-zinc-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            <span className="glitch" data-text="Work Experience">
              Work Experience
            </span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/30 hidden md:block"></div>

          <motion.div
            className="space-y-16"
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            {experiences.map((exp, index) => (
              <motion.div key={exp.title + exp.company} variants={item} className="flex gap-8">
                <div className="flex-shrink-0 mt-1 relative">
                  <div className="w-12 h-12 bg-primary/20 backdrop-blur-sm flex items-center justify-center z-10 border border-primary/50 rounded-full">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                </div>

                <div className="flex-grow glass-morphism p-8 border border-primary/20 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <RevealText className="text-2xl font-bold text-primary">{exp.title}</RevealText>
                    <div className="flex items-center text-zinc-400 text-sm mt-2 md:mt-0 bg-zinc-800/80 px-4 py-2 rounded-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      {exp.period}
                    </div>
                  </div>

                  <h4 className="text-lg text-white font-medium mb-4">{exp.company}</h4>

                  <p className="text-zinc-400 mb-6 leading-relaxed">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="text-xs bg-primary/10 text-primary px-4 py-1.5 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
