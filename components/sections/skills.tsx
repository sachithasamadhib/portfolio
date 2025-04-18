"use client"

import { Code, Database, Server, Cpu } from "lucide-react"
import RevealElement from "@/components/shared/reveal-element"
import SectionHeading from "@/components/shared/section-heading"
import GridBackground from "@/components/grid-background"

export default function Skills() {
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

  return (
    <section id="skills" className="py-32 diagonal-section-reverse relative">
      <GridBackground spacing={30} opacity={0.15} />
      <div className="container mx-auto px-4">
        <SectionHeading title="My Skills" decoration={true} glitchEffect={true} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skillGroup, index) => (
            <RevealElement
              key={skillGroup.category}
              direction="up"
              delay={0.1 * index}
              stayVisible={true}
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
            </RevealElement>
          ))}
        </div>
      </div>
    </section>
  )
}
