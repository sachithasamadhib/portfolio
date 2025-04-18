"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import RevealElement from "@/components/shared/reveal-element"
import SectionHeading from "@/components/shared/section-heading"
import AnimatedButton from "@/components/shared/animated-button"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle form submission, e.g., send data to an API
    console.log("Form submitted:", formState)
    // Reset form
    setFormState({ name: "", email: "", message: "" })
    // Show success message
    alert("Message sent successfully!")
  }

  return (
    <section id="contact" className="py-32">
      <div className="container mx-auto px-4">
        <SectionHeading title="Get In Touch" decoration={true} glitchEffect={true} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <RevealElement direction="left" delay={0.2} stayVisible={true}>
            <div className="glass-morphism p-8 border border-primary/20 rounded-xl shadow-lg h-full">
              <h3 className="text-2xl font-bold mb-8 text-primary">Contact Information</h3>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-primary/20 p-4 mr-6 border border-primary/50 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-white">Email</h4>
                    <a
                      href="mailto:alex.morgan@example.com"
                      className="text-zinc-400 hover:text-primary transition-colors"
                    >
                      alex.morgan@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/20 p-4 mr-6 border border-primary/50 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-white">Phone</h4>
                    <a href="tel:+1234567890" className="text-zinc-400 hover:text-primary transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/20 p-4 mr-6 border border-primary/50 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-white">Location</h4>
                    <p className="text-zinc-400">San Francisco, California</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-bold mb-6 text-white">Follow Me</h3>
                <div className="flex space-x-4">
                  {["GitHub", "Twitter", "LinkedIn", "Instagram"].map((platform) => (
                    <a
                      key={platform}
                      href="#"
                      className="bg-zinc-800 p-3 text-zinc-400 hover:text-primary hover:bg-primary/10 transition-all duration-300 border border-primary/30 rounded-full w-10 h-10 flex items-center justify-center"
                    >
                      {platform.charAt(0)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </RevealElement>

          <RevealElement direction="right" delay={0.4} stayVisible={true}>
            <div className="glass-morphism p-8 border border-primary/20 rounded-xl shadow-lg h-full">
              <h3 className="text-2xl font-bold mb-8 text-primary">Send Me a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-white">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Sachitha Samadhi"
                    required
                    className="w-full border-primary/30 focus:border-primary bg-zinc-800/80 text-white rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="alex.morgan@example.com"
                    required
                    className="w-full border-primary/30 focus:border-primary bg-zinc-800/80 text-white rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-white">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Hello, I'd like to talk about..."
                    required
                    className="w-full min-h-[150px] border-primary/30 focus:border-primary bg-zinc-800/80 text-white rounded-lg"
                  />
                </div>

                <AnimatedButton
                  type="submit"
                  variant="gradient"
                  size="lg"
                  fullWidth
                  icon={<Send className="h-5 w-5" />}
                  iconPosition="left"
                  glowEffect={true}
                >
                  Send Message
                </AnimatedButton>
              </form>
            </div>
          </RevealElement>
        </div>
      </div>
    </section>
  )
}
