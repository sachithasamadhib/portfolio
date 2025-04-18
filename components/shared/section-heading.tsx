import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import RevealElement from "./reveal-element"

interface SectionHeadingProps {
  title: string
  subtitle?: string | ReactNode
  className?: string
  align?: "left" | "center" | "right"
  decoration?: boolean
  glitchEffect?: boolean
}

export default function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
  decoration = true,
  glitchEffect = true,
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }

  return (
    <RevealElement
      className={cn("flex flex-col gap-4 mb-16", alignmentClasses[align], className)}
      direction="up"
      stayVisible={true}
    >
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
        {glitchEffect ? (
          <span className="glitch" data-text={title}>
            {title}
          </span>
        ) : (
          title
        )}
      </h2>

      {decoration && <div className={cn("h-1 bg-primary", align === "center" ? "w-24 mx-auto" : "w-24")}></div>}

      {subtitle && <p className="text-zinc-400 max-w-2xl mt-2">{subtitle}</p>}
    </RevealElement>
  )
}
