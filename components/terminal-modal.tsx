"use client"

import { useState, useEffect, useRef } from "react"
import { X, Terminal as TerminalIcon, Minimize2, Maximize2 } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useTerminal } from "@/context/terminal-context"
import { useTheme } from "next-themes"

interface Command {
  cmd: string
  output: React.ReactNode
}

// Available pages/directories
const pages: Record<string, string[]> = {
  "~": ["about", "projects", "services", "skills", "achievements", "blog", "testimonials", "contact"],
  "projects": [
    "Advanced-Tab-Manager",
    "linux-auto",
    "vox-md",
    "Vox-Hash",
    "Python-1000-Snippets",
    "Assembly-300-Snippets",
    "Bytey",
    "Chess-Master-Ultimate",
    "Chess-Ultimate",
    "Number-Systems-Converter",
    "Ultimate-Tic-Tac-Toe",
    "Shibaccus-Web",
    "Clarisse-Portfolio",
    "Zylthra",
    "KemonoDownloader",
    "Java-Quiz-App",
    "Image-Binder",
    "PyExe-Builder",
    "ZapisAxis",
    "VoxSpace",
    "llm-wikipedia",
    "VoxDroid",
  ],
  "blog": [], // Blog posts would be dynamic
}

export default function TerminalModal() {
  const { isOpen, closeTerminal } = useTerminal()
  const { theme, setTheme } = useTheme()
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [history, setHistory] = useState<Command[]>([
    { cmd: "welcome", output: "Welcome to VoxDroid Terminal v2.0. Type 'help' for available commands." },
  ])
  const [isMaximized, setIsMaximized] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Get current directory from pathname
  const getCurrentDir = () => {
    if (pathname === "/") return "~"
    const parts = pathname.split("/").filter(Boolean)
    if (parts.length === 1) return parts[0]
    if (parts.length === 2) return `${parts[0]}/${parts[1]}`
    return parts.join("/")
  }

  const [currentDir, setCurrentDir] = useState(getCurrentDir())

  // Update currentDir when pathname changes
  useEffect(() => {
    setCurrentDir(getCurrentDir())
  }, [pathname])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [history])

  // Handle up/down arrow for command history
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      handleTabCompletion()
    }
  }

  // Tab completion
  const handleTabCompletion = () => {
    const parts = input.trim().split(" ")
    if (parts.length !== 2 || parts[0] !== "cd") return
    
    const partial = parts[1].toLowerCase()
    const baseDir = currentDir === "~" ? "~" : currentDir.split("/")[0]
    const availableDirs = pages[baseDir] || pages["~"]
    
    const matches = availableDirs.filter(d => d.toLowerCase().startsWith(partial))
    if (matches.length === 1) {
      setInput(`cd ${matches[0]}`)
    }
  }

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    const rawInput = input.trim()
    if (!rawInput) return

    // Add to command history
    setCommandHistory(prev => [...prev, rawInput])
    setHistoryIndex(-1)

    const cmd = rawInput.toLowerCase()
    const parts = cmd.split(" ")
    const command = parts[0]
    const args = parts.slice(1).join(" ")

    let output: React.ReactNode = ""

    switch (command) {
      case "help":
        output = (
          <div className="space-y-1">
            <p className="text-cyan-400 font-bold">Navigation:</p>
            <p className="pl-4"><span className="text-yellow-400">cd &lt;dir&gt;</span> - Change directory (e.g., cd about, cd projects/Bytey)</p>
            <p className="pl-4"><span className="text-yellow-400">cd ..</span> - Go back / Go home</p>
            <p className="pl-4"><span className="text-yellow-400">ls</span> - List contents of current directory</p>
            <p className="pl-4"><span className="text-yellow-400">pwd</span> - Print working directory</p>
            <p className="mt-2 text-cyan-400 font-bold">Theme:</p>
            <p className="pl-4"><span className="text-yellow-400">theme dark</span> - Switch to dark mode</p>
            <p className="pl-4"><span className="text-yellow-400">theme light</span> - Switch to light mode</p>
            <p className="pl-4"><span className="text-yellow-400">theme toggle</span> - Toggle theme</p>
            <p className="mt-2 text-cyan-400 font-bold">Other:</p>
            <p className="pl-4"><span className="text-yellow-400">whoami</span> - Display current user</p>
            <p className="pl-4"><span className="text-yellow-400">neofetch</span> - System info</p>
            <p className="pl-4"><span className="text-yellow-400">cat README.md</span> - About this site</p>
            <p className="pl-4"><span className="text-yellow-400">clear</span> - Clear terminal</p>
            <p className="pl-4"><span className="text-yellow-400">exit</span> - Close terminal</p>
            <p className="mt-2 text-gray-500 text-xs">Tip: Use Tab for auto-completion, ↑/↓ for command history</p>
          </div>
        )
        break

      case "cd":
        if (!args || args === "~" || args === "/") {
          output = <span className="text-green-400">Navigating to home...</span>
          router.push("/")
          setCurrentDir("~")
        } else if (args === "..") {
          const parts = currentDir.split("/")
          if (parts.length > 1) {
            const parent = parts[0]
            output = <span className="text-green-400">Navigating to /{parent}...</span>
            router.push(`/${parent}`)
            setCurrentDir(parent)
          } else {
            output = <span className="text-green-400">Navigating to home...</span>
            router.push("/")
            setCurrentDir("~")
          }
        } else if (args === "-") {
          output = <span className="text-green-400">Navigating back...</span>
          router.back()
        } else {
          // Handle nested paths like projects/Bytey
          const targetParts = args.split("/").filter(Boolean)
          const baseDir = currentDir === "~" ? "~" : currentDir.split("/")[0]
          
          // Check if it's a direct child of current dir
          const availableDirs = pages[baseDir] || pages["~"]
          const matchedDir = availableDirs.find(d => d.toLowerCase() === targetParts[0].toLowerCase())
          
          if (matchedDir && currentDir === "~") {
            // Going from home to a main page
            output = <span className="text-green-400">Navigating to /{matchedDir}...</span>
            router.push(`/${matchedDir.toLowerCase()}`)
            setCurrentDir(matchedDir.toLowerCase())
          } else if (matchedDir && baseDir === "projects") {
            // Going to a project from projects page
            output = <span className="text-green-400">Navigating to /projects/{matchedDir}...</span>
            router.push(`/projects/${matchedDir}`)
            setCurrentDir(`projects/${matchedDir}`)
          } else if (currentDir === "~" && targetParts.length === 2) {
            // Handle direct path like "projects/Bytey" from home
            const pageDir = targetParts[0].toLowerCase()
            const subDir = pages[pageDir]?.find(d => d.toLowerCase() === targetParts[1].toLowerCase())
            if (subDir) {
              output = <span className="text-green-400">Navigating to /{pageDir}/{subDir}...</span>
              router.push(`/${pageDir}/${subDir}`)
              setCurrentDir(`${pageDir}/${subDir}`)
            } else {
              output = <span className="text-red-400">cd: no such directory: {args}</span>
            }
          } else if (pages["~"].some(d => d.toLowerCase() === args.toLowerCase())) {
            // Going to a main page from anywhere
            const targetDir = pages["~"].find(d => d.toLowerCase() === args.toLowerCase())!
            output = <span className="text-green-400">Navigating to /{targetDir}...</span>
            router.push(`/${targetDir.toLowerCase()}`)
            setCurrentDir(targetDir.toLowerCase())
          } else {
            output = <span className="text-red-400">cd: no such directory: {args}</span>
          }
        }
        break

      case "ls":
        const lsDir = args || currentDir
        const baseLsDir = lsDir === "~" ? "~" : lsDir.split("/")[0]
        const contents = pages[baseLsDir] || pages["~"]
        
        if (currentDir === "~" || !args) {
          output = (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-4 gap-y-1">
              {(currentDir === "~" ? pages["~"] : (pages[currentDir.split("/")[0]] || pages["~"])).map((item, i) => (
                <span key={i} className="text-blue-400">{item}/</span>
              ))}
              {currentDir === "~" && (
                <>
                  <span className="text-gray-300">README.md</span>
                  <span className="text-gray-300">cv.pdf</span>
                </>
              )}
            </div>
          )
        } else {
          output = (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-4 gap-y-1">
              {contents.map((item, i) => (
                <span key={i} className="text-blue-400">{item}/</span>
              ))}
            </div>
          )
        }
        break

      case "pwd":
        output = <span className="text-gray-300">/{currentDir === "~" ? "" : currentDir}</span>
        break

      case "theme":
        if (args === "dark") {
          setTheme("dark")
          localStorage.setItem("theme", "dark")
          output = <span className="text-green-400">Theme set to dark mode</span>
        } else if (args === "light") {
          setTheme("light")
          localStorage.setItem("theme", "light")
          output = <span className="text-green-400">Theme set to light mode</span>
        } else if (args === "toggle") {
          const newTheme = theme === "dark" ? "light" : "dark"
          setTheme(newTheme)
          localStorage.setItem("theme", newTheme)
          output = <span className="text-green-400">Theme toggled to {newTheme} mode</span>
        } else {
          output = <span className="text-gray-300">Current theme: {theme}. Usage: theme [dark|light|toggle]</span>
        }
        break

      case "whoami":
        output = <span className="text-cyan-400">guest</span>
        break

      case "neofetch":
        output = (
          <div className="flex gap-4">
            <pre className="text-green-400 text-xs leading-tight">
{`    ____
   / __ \\
  / / / /
 / /_/ /
/_____/ `}
            </pre>
            <div className="space-y-0.5 text-sm">
              <p><span className="text-cyan-400">guest</span>@<span className="text-cyan-400">voxdroid</span></p>
              <p>-----------------</p>
              <p><span className="text-cyan-400">OS:</span> VoxDroid Web v2.0</p>
              <p><span className="text-cyan-400">Host:</span> voxdroid.vercel.app</p>
              <p><span className="text-cyan-400">Shell:</span> vox-sh 1.0</p>
              <p><span className="text-cyan-400">Theme:</span> {theme}</p>
              <p><span className="text-cyan-400">Terminal:</span> VoxTerm</p>
              <p><span className="text-cyan-400">Framework:</span> Next.js 16.1.1</p>
            </div>
          </div>
        )
        break

      case "cat":
        if (args === "readme.md" || args === "README.md") {
          output = (
            <div className="space-y-2 text-sm">
              <p className="text-cyan-400 font-bold"># VoxDroid Portfolio</p>
              <p>A Linux-themed developer portfolio built with Next.js, TypeScript, and Tailwind CSS.</p>
              <p className="text-cyan-400 font-bold mt-2">## Features</p>
              <p>- Linux terminal interface</p>
              <p>- Dark/Light theme support</p>
              <p>- GitHub stats integration</p>
              <p>- Hyprland-inspired animations</p>
              <p className="text-cyan-400 font-bold mt-2">## Navigation</p>
              <p>Use `cd` to navigate, `ls` to list, `theme` to change appearance.</p>
            </div>
          )
        } else {
          output = <span className="text-red-400">cat: {args || "?"}: No such file</span>
        }
        break

      case "clear":
        setHistory([])
        setInput("")
        return

      case "exit":
      case "quit":
      case "q":
        closeTerminal()
        setInput("")
        return

      case "sudo":
        output = <span className="text-red-500">[sudo] password for guest: <br/>Sorry, user guest is not allowed to execute &apos;{args || "command"}&apos; as root.</span>
        break

      case "rm":
        if (args.includes("-rf") || args.includes("*")) {
          output = <span className="text-red-500">Nice try 😏</span>
        } else {
          output = <span className="text-red-400">rm: cannot remove &apos;{args}&apos;: Permission denied</span>
        }
        break

      case "echo":
        output = <span>{args || ""}</span>
        break

      case "date":
        output = <span>{new Date().toString()}</span>
        break

      case "uname":
        if (args === "-a") {
          output = <span>VoxDroid Web 2.0.0-vox x86_64 VoxDroid/Next.js</span>
        } else {
          output = <span>VoxDroid</span>
        }
        break

      case "history":
        output = (
          <div className="space-y-0.5">
            {commandHistory.map((cmd, i) => (
              <p key={i}><span className="text-gray-500 mr-2">{i + 1}</span>{cmd}</p>
            ))}
          </div>
        )
        break

      default:
        output = <span className="text-red-400">Command not found: {command}. Type &apos;help&apos; for available commands.</span>
    }

    setHistory([...history, { cmd: rawInput, output }])
    setInput("")
  }

  // Format the prompt to show current directory
  const getPrompt = () => {
    const dir = currentDir === "~" ? "~" : `~/${currentDir}`
    return `guest@voxdroid:${dir}$`
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
              <span className="text-gray-400">{getPrompt().replace("$", "")}</span>
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
                <div className="flex gap-2 flex-wrap">
                  <span className="text-green-500">{getPrompt()}</span>
                  <span>{item.cmd}</span>
                </div>
                <div className="mt-1 ml-2">{item.output}</div>
              </div>
            ))}
            
            <form onSubmit={handleCommand} className="flex gap-2 mt-2 flex-wrap">
              <span className="text-green-500">{getPrompt()}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 min-w-[100px] bg-transparent outline-none border-none text-gray-300 focus:ring-0 p-0"
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
