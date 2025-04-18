"use client"

import Image from "next/image"
import { FileText } from "lucide-react"
import RevealElement from "@/components/shared/reveal-element"
import SectionHeading from "@/components/shared/section-heading"
import AnimatedButton from "@/components/shared/animated-button"

export default function About() {
  return (
    <section id="about" className="py-32 diagonal-section">
      <div className="container mx-auto px-4">
        <SectionHeading title="About Me" decoration={true} glitchEffect={true} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <RevealElement direction="left" delay={0.2} stayVisible={true} className="relative">
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
          </RevealElement>

          <div className="space-y-6">
            <RevealElement direction="right" delay={0.3} stayVisible={true} className="text-3xl font-bold text-primary">
              I'm Sachitha Samadhi
            </RevealElement>

            <RevealElement direction="right" delay={0.4} stayVisible={true} className="text-zinc-400 leading-relaxed">
              I'm a digital creator and full-stack developer with over 5 years of experience crafting unique digital
              experiences. I specialize in experimental interfaces and creative coding to build applications that stand
              out from the crowd.
            </RevealElement>

            <RevealElement direction="right" delay={0.5} stayVisible={true} className="text-zinc-400 leading-relaxed">
              My journey began when I built my first experimental website at 15. Since then, I've worked with
              forward-thinking startups and established companies to deliver innovative digital solutions that challenge
              conventional design.
            </RevealElement>

            <RevealElement direction="right" delay={0.6} stayVisible={true} className="text-zinc-400 leading-relaxed">
              When I'm not pushing the boundaries of web development, you can find me exploring generative art,
              contributing to open-source projects, or experimenting with new technologies.
            </RevealElement>

            <RevealElement direction="up" delay={0.7} stayVisible={true}>
              <AnimatedButton
                variant="gradient"
                size="lg"
                icon={<FileText className="h-5 w-5" />}
                iconPosition="left"
                glowEffect={true}
              >
                Download Resume
              </AnimatedButton>
            </RevealElement>
          </div>
        </div>
      </div>
    </section>
  )
}
