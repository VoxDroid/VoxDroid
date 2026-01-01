"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(true)

  const bootLogs = [
    "[  OK  ] Started VoxDroid Kernel v1.2.0-generic.",
    "[  OK  ] Mounted /dev/portfolio as read-only filesystem.",
    "[  OK  ] Started Network Manager Script Dispatcher Service.",
    "[  OK  ] Reached target Graphical Interface.",
    "[  OK  ] Started User Manager for UID 1000.",
    "[  OK  ] Started Session 1 of user voxdroid.",
    "Loading assets...",
    "Initializing React Hydration...",
    "Loading Next.js modules...",
    "Compiling styles...",
    "Starting UI components...",
    "Welcome to VoxDroid OS.",
  ]

  useEffect(() => {
    let currentIndex = 0
    
    const interval = setInterval(() => {
      if (currentIndex < bootLogs.length) {
        const logToAdd = bootLogs[currentIndex]
        setLogs((prev) => [...prev, logToAdd])
        currentIndex++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setIsVisible(false)
          setTimeout(onComplete, 500) // Wait for fade out
        }, 800)
      }
    }, 150) // Speed of logs

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-[#050505] text-green-500 font-mono p-4 md:p-10 overflow-hidden flex flex-col justify-end"
        >
          <div className="max-w-3xl w-full mx-auto">
            {logs.map((log, index) => (
              <div key={index} className="mb-1">
                <span className="text-gray-500 mr-2">[{new Date().toLocaleTimeString()}]</span>
                {log && log.startsWith("[  OK  ]") ? (
                  <span>
                    <span className="text-green-400 font-bold">[ OK ]</span> {log.substring(8)}
                  </span>
                ) : (
                  log
                )}
              </div>
            ))}
            <div className="animate-pulse mt-2">_</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
