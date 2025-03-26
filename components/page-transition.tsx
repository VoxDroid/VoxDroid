"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { type ReactNode, useEffect, useState } from "react"

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [renderKey, setRenderKey] = useState(pathname)

  useEffect(() => {
    const timer = setTimeout(() => {
      setRenderKey(pathname)
    }, 50)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.div
        key={renderKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1], // Custom ease curve for smoother transition
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

