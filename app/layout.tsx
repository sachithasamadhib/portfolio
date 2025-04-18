import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Unbounded } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import CustomCursor from "@/components/custom-cursor"

// Load Space Grotesk font - a distinctive geometric sans-serif
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
})

// Load Unbounded font - a unique display font with character
const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-unbounded",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Sachitha Samadhi | Digital Creator",
  description: "An experimental portfolio showcasing the creative work and technical expertise of Sachitha Samadhi.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${unbounded.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
