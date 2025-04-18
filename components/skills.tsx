"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Database, Server, Cpu } from "lucide-react"

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const skills = [
    {
      category: "Creative Coding",
      icon: <Code className="h-6 w-6 text-primary" />,
      description: "Building experimental interfaces",
      items: ["Three.js", "WebGL", "Canvas API", "GSAP", "p5.js"],
    },
    {
      category: "Frontend",
      icon: <Server className="h-6 w-6 text-primary" />,
      description: "Crafting unique user experiences",
      items: ["React", "Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    },
    {
      category: "Backend",
      icon: <Database className="h-6 w-6 text-primary" />,
      description: "Powering digital experiences",
      items: ["Node.js", "GraphQL", "Prisma", "tRPC", "Supabase"],
    },
    {
      category: "Design",
      icon: <Cpu className="h-6 w-6 text-primary" />,
      description: "Creating visual identities",
      items: ["Figma", "Blender", "After Effects", "Photoshop", "Illustrator"],
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="skills" className="py-32 diagonal-section-reverse bg-zinc-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            <span className="glitch" data-text="My Skills">
              My Skills
            </span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <motion.div
          className="staggered-grid"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {skills.map((skillGroup) => (
            <motion.div
              key={skillGroup.category}
              variants={item}
              className="neumorphic p-8 backdrop-blur-sm border border-primary/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary/10 mr-4 rounded-full">{skillGroup.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-white">{skillGroup.category}</h3>
                  <p className="text-sm text-zinc-400">{skillGroup.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {skillGroup.items.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center p-3 bg-zinc-800/80 border-l-2 border-primary hover:bg-primary/10 transition-colors duration-300 rounded-lg"
                  >
                    <span className="text-sm font-medium text-zinc-300">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
