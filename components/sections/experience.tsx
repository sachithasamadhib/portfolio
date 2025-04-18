"use client"

import { Briefcase, Calendar } from "lucide-react"
import RevealElement from "@/components/shared/reveal-element"
import SectionHeading from "@/components/shared/section-heading"
import GridBackground from "@/components/grid-background"

export default function Experience() {
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

  return (
    <section id="experience" className="py-32 diagonal-section relative">
      <GridBackground spacing={30} opacity={0.15} />
      <div className="container mx-auto px-4">
        <SectionHeading title="Work Experience" decoration={true} glitchEffect={true} />

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/30 hidden md:block"></div>

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <RevealElement
                key={exp.title + exp.company}
                direction="left"
                delay={0.2 * index}
                stayVisible={true}
                className="flex gap-8"
              >
                <div className="flex-shrink-0 mt-1 relative">
                  <div className="w-12 h-12 bg-primary/20 backdrop-blur-sm flex items-center justify-center z-10 border border-primary/50 rounded-full">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                </div>

                <div className="flex-grow glass-morphism p-8 border border-primary/20 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-2xl font-bold text-primary">{exp.title}</h3>
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
              </RevealElement>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
