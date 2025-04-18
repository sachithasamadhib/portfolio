"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import MagneticButton from "./magnetic-button"

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const [activeFilter, setActiveFilter] = useState("All")
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  const projects = [
    {
      id: "project1",
      title: "Neomorphic Music Player",
      description:
        "An experimental music player with a neomorphic design and WebGL audio visualizations that react to the music.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["WebGL", "Three.js", "React", "Web Audio API"],
      category: "Creative Coding",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: "project2",
      title: "Generative Art Gallery",
      description: "A virtual gallery showcasing algorithmic and generative artwork created with p5.js and Canvas API.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["p5.js", "Canvas", "GSAP", "Next.js"],
      category: "Creative Coding",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: "project3",
      title: "Experimental E-Commerce",
      description: "A full-stack e-commerce platform with unconventional navigation and interactive product showcases.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["React", "Framer Motion", "Prisma", "tRPC"],
      category: "Full Stack",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: "project4",
      title: "3D Portfolio Template",
      description: "A customizable 3D portfolio template with interactive scenes and animations built with Three.js.",
      image: "/placeholder.svg?height=300&width=500",
      tags: ["Three.js", "React Three Fiber", "TypeScript", "GLSL"],
      category: "Creative Coding",
      liveUrl: "#",
      githubUrl: "#",
    },
  ]

  const categories = ["All", "Creative Coding", "Full Stack", "Design"]

  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter)

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
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="projects" className="py-32">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            <span className="glitch" data-text="Featured Projects">
              Featured Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-12"></div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? "bg-primary text-white"
                    : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            exit={{ opacity: 0 }}
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={item}
                className="glass-morphism overflow-hidden border border-primary/20 hover:shadow-xl transition-all duration-300"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative overflow-hidden h-60 rounded-t-xl">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 flex items-end rounded-t-xl"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredProject === project.id ? 1 : 0,
                      y: hoveredProject === project.id ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 w-full">
                      <div className="flex space-x-4">
                        <MagneticButton className="bg-zinc-900/80 text-white hover:bg-zinc-800 px-4 py-2 rounded-lg">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </a>
                        </MagneticButton>
                        <MagneticButton className="gradient-button text-white hover:bg-primary/80 px-4 py-2 rounded-lg">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Demo
                          </a>
                        </MagneticButton>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    animate={{
                      scale: hoveredProject === project.id ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover rounded-t-xl"
                    />
                  </motion.div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                  <p className="text-zinc-400 mb-4 line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <MagneticButton className="gradient-button text-white px-8 py-4 text-lg font-medium rounded-xl shadow-lg">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              View More Projects on GitHub
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
