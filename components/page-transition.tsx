"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { type ReactNode } from "react"

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.15,
        ease: "easeOut",
      }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  )
}

