"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import RevealElement from "@/components/shared/reveal-element"
import SectionHeading from "@/components/shared/section-heading"
import AnimatedButton from "@/components/shared/animated-button"
import GridBackground from "@/components/grid-background"

export default function Projects() {
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

  return (
    <section id="projects" className="py-32 relative">
      <GridBackground spacing={30} opacity={0.15} />
      <div className="container mx-auto px-4">
        <SectionHeading title="Featured Projects" decoration={true} glitchEffect={true} />

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 text-sm font-medium transition-all duration-300 rounded-xl ${
                activeFilter === category
                  ? "bg-primary text-white"
                  : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.map((project, index) => (
              <RevealElement key={project.id} direction="up" delay={0.1 * index} stayVisible={true} className="card-3d">
                <div
                  className="card-3d-inner glass-morphism overflow-hidden border border-primary/20 hover:shadow-xl transition-all duration-300"
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
                          <AnimatedButton
                            variant="outline"
                            size="sm"
                            icon={<Github className="h-4 w-4" />}
                            iconPosition="left"
                          >
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              Code
                            </a>
                          </AnimatedButton>
                          <AnimatedButton
                            variant="gradient"
                            size="sm"
                            icon={<ExternalLink className="h-4 w-4" />}
                            iconPosition="left"
                          >
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              Demo
                            </a>
                          </AnimatedButton>
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
                </div>
              </RevealElement>
            ))}
          </motion.div>
        </AnimatePresence>

        <RevealElement className="text-center mt-16" direction="up" delay={0.6} stayVisible={true}>
          <AnimatedButton
            variant="gradient"
            size="lg"
            glowEffect={true}
            onClick={() => window.open("https://github.com/yourusername", "_blank")}
          >
            View More Projects on GitHub
          </AnimatedButton>
        </RevealElement>
      </div>
    </section>
  )
}
