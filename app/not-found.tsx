"use client"

import Link from "next/link"
import { Home, ArrowRight, Terminal } from "lucide-react"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#050505] text-red-500 font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-left max-w-2xl w-full border border-red-900/50 p-8 rounded-lg bg-red-950/10 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2 mb-6 border-b border-red-900/30 pb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-4 text-sm text-red-400/60">KERNEL_PANIC</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-2">ERROR 404</h1>
        <h2 className="text-xl md:text-2xl mb-6 text-red-400">SEGMENTATION FAULT (CORE DUMPED)</h2>

        <div className="space-y-2 mb-8 text-sm md:text-base text-red-300/80 font-mono">
          <p>{`> The requested resource could not be found at the specified memory address.`}</p>
          <p>{`> Stack trace:`}</p>
          <p className="pl-4 opacity-70">at /app/pages/unknown_route.tsx:404:12</p>
          <p className="pl-4 opacity-70">at NextServer.render (server.js:123:45)</p>
          <p className="pl-4 opacity-70">at process.emit (events.js:321:10)</p>
          <p>{`> System halted.`}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-red-900/20 border border-red-500/50 text-red-400 hover:bg-red-900/40 hover:text-red-200 transition-all duration-300 rounded flex items-center justify-center group"
          >
            <Terminal className="mr-2 h-4 w-4 group-hover:animate-pulse" />
            ./reboot_system.sh
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 bg-transparent border border-red-900/30 text-red-500/70 hover:text-red-400 hover:border-red-500/50 transition-all duration-300 rounded flex items-center justify-center"
          >
            ./report_bug.sh <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

