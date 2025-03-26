import type React from "react"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import ParticlesBackground from "@/components/particles-background"
import PageTransition from "@/components/page-transition"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
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
      <body className={`${poppins.variable} font-sans relative min-h-screen`}>
        <ThemeProvider>
          <ParticlesBackground />
          <div className="flex flex-col min-h-screen relative z-10">
            <Navbar />
            <main className="flex-grow">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

