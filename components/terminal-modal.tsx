"use client"

import { useState, useEffect, useRef } from "react"
import { X, Terminal as TerminalIcon, Minimize2, Maximize2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useTerminal } from "@/context/terminal-context"

interface Command {
  cmd: string
  output: React.ReactNode
}

export default function TerminalModal() {
  const { isOpen, closeTerminal } = useTerminal()
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<Command[]>([
    { cmd: "welcome", output: "Welcome to VoxDroid Terminal. Type 'help' for available commands." },
  ])
  const [isMaximized, setIsMaximized] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [history])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = input.trim().toLowerCase()
    if (!cmd) return

    let output: React.ReactNode = ""

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1">
            <p>Available commands:</p>
            <p className="pl-4"><span className="text-yellow-400">about</span> - View about me</p>
            <p className="pl-4"><span className="text-yellow-400">projects</span> - List projects</p>
            <p className="pl-4"><span className="text-yellow-400">contact</span> - Get contact info</p>
            <p className="pl-4"><span className="text-yellow-400">clear</span> - Clear terminal</p>
            <p className="pl-4"><span className="text-yellow-400">exit</span> - Close terminal</p>
            <p className="pl-4"><span className="text-yellow-400">sudo</span> - ???</p>
          </div>
        )
        break
      case "about":
        output = "Navigating to /about..."
        router.push("/about")
        break
      case "projects":
        output = "Navigating to /projects..."
        router.push("/projects")
        break
      case "contact":
        output = "Navigating to /contact..."
        router.push("/contact")
        break
      case "clear":
        setHistory([])
        setInput("")
        return
      case "exit":
        closeTerminal()
        setInput("")
        return
      case "sudo":
        output = <span className="text-red-500">Permission denied: You are not in the sudoers file. This incident will be reported.</span>
        break
      case "ls":
        output = (
          <div className="grid grid-cols-3 gap-2 text-blue-400">
            <span>about/</span>
            <span>projects/</span>
            <span>contact/</span>
            <span>skills/</span>
            <span>cv.pdf</span>
            <span>README.md</span>
          </div>
        )
        break
      default:
        output = <span className="text-red-400">Command not found: {cmd}. Type 'help' for commands.</span>
    }

    setHistory([...history, { cmd: input, output }])
    setInput("")
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="terminal-modal"
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: 1,
          }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 30,
          }}
          className={`fixed z-[100] overflow-hidden shadow-2xl border border-gray-800 bg-[#0c0c0c]/95 backdrop-blur-md flex flex-col font-mono text-sm transition-[width,height,bottom,right,border-radius] duration-200 ${
            isMaximized 
              ? "w-screen h-screen bottom-0 right-0 rounded-none" 
              : "w-[min(600px,90vw)] h-[500px] bottom-4 right-4 rounded-lg"
          }`}
        >
          {/* Terminal Header */}
          <div 
            className="bg-[#1a1a1a] px-4 py-2 flex items-center justify-between border-b border-gray-800 cursor-move select-none"
            onDoubleClick={() => setIsMaximized(!isMaximized)}
          >
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">guest@voxdroid:~</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsMaximized(!isMaximized)} className="text-gray-400 hover:text-white transition-colors">
                {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button onClick={closeTerminal} className="text-gray-400 hover:text-red-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="flex-1 p-4 overflow-y-auto text-gray-300 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent" onClick={() => inputRef.current?.focus()}>
            {history.map((item, i) => (
              <div key={i} className="mb-2">
                <div className="flex gap-2">
                  <span className="text-green-500">guest@voxdroid:~$</span>
                  <span>{item.cmd}</span>
                </div>
                <div className="mt-1 ml-2">{item.output}</div>
              </div>
            ))}
            
            <form onSubmit={handleCommand} className="flex gap-2 mt-2">
              <span className="text-green-500">guest@voxdroid:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none border-none text-gray-300 focus:ring-0 p-0"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </form>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
