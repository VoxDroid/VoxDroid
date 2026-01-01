import type React from "react"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import ParticlesBackground from "@/components/particles-background"
import PageTransition from "@/components/page-transition"
import { TerminalProvider } from "@/context/terminal-context"
import TerminalModal from "@/components/terminal-modal"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata = {
  title: "VoxDroid | Portfolio",
  description: "Personal portfolio website for VoxDroid showcasing skills, projects, and contact information.",
  generator: "VoxDroid",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/ico/vox.ico" />
      </head>
      <body className={`${jetbrainsMono.variable} font-mono relative min-h-screen bg-background text-foreground`}>
        <ThemeProvider defaultTheme="system" attribute="class">
          <TerminalProvider>
            <ParticlesBackground />
            <div className="flex flex-col min-h-screen relative z-10">
              <Navbar />
              <main className="flex-grow">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
              <ScrollToTop />
            </div>
            <TerminalModal />
          </TerminalProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

