"use client"

import React from "react"
import ReactMarkdown, { Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeRaw from "rehype-raw"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState, useMemo } from "react"
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Star,
  GitFork,
  Eye,
  Calendar,
  Clock,
  Tag,
  FileCode,
  Scale,
  Users,
  Package,
  ChevronLeft,
  ChevronRight,
  X,
  GitCommit,
  Download,
  AlertCircle,
  Archive,
  Code2,
  HardDrive,
  FolderTree,
  File,
  Folder,
  ChevronDown,
} from "lucide-react"
import type { ProjectData, GitHubCommit, FileTreeNode } from "@/lib/github"
import { formatDate, formatRelativeTime, formatNumber, formatBytes } from "@/lib/github"

interface ProjectDetailClientProps {
  project: ProjectData
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Helper function to extract text content from React children
function getTextContent(children: React.ReactNode): string {
  if (typeof children === 'string') {
    // Strip HTML tags from string content
    return children.replace(/<[^>]*>/g, '')
  }
  if (typeof children === 'number') return String(children)
  if (Array.isArray(children)) return children.map(getTextContent).join('')
  if (React.isValidElement(children) && children.props) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return getTextContent((children.props as any).children)
  }
  return ''
}

// Helper function to create URL-friendly slug from text
function slugify(text: string): string {
  return text
    // First strip any HTML tags
    .replace(/<[^>]*>/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Replace multiple hyphens with single
    .replace(/^-|-$/g, '')     // Remove leading/trailing hyphens
}

// Custom markdown components for better rendering
function createMarkdownComponents(repoFullName: string): Components {
  const rawBaseUrl = `https://raw.githubusercontent.com/${repoFullName}/HEAD`
  const repoBaseUrl = `https://github.com/${repoFullName}/blob/HEAD`

  return {
    // Fix relative image URLs - keep badges/shields inline
    img: ({ src, alt, ...props }) => {
      let imageSrc = (src as string) || ""
      
      // Handle relative URLs
      if (imageSrc && !imageSrc.startsWith("http") && !imageSrc.startsWith("data:")) {
        // Remove leading ./ or /
        imageSrc = imageSrc.replace(/^\.?\//, "")
        imageSrc = `${rawBaseUrl}/${imageSrc}`
      }
      
      // Check if this is a badge/shield (common badge services)
      const isBadge = imageSrc.includes("shields.io") || 
                      imageSrc.includes("badge") ||
                      imageSrc.includes("img.shields") ||
                      imageSrc.includes("badgen.net") ||
                      imageSrc.includes("forthebadge.com") ||
                      imageSrc.includes("github.com") && imageSrc.includes("/badge") ||
                      imageSrc.includes("travis-ci") ||
                      imageSrc.includes("circleci") ||
                      imageSrc.includes("codecov") ||
                      imageSrc.includes("coveralls") ||
                      imageSrc.includes("david-dm.org") ||
                      imageSrc.includes("npmjs.com") ||
                      imageSrc.includes("packagephobia") ||
                      imageSrc.includes("snyk.io") ||
                      (alt && alt.toLowerCase().includes("badge")) ||
                      (alt && alt.toLowerCase().includes("shield")) ||
                      (alt && alt.toLowerCase().includes("license")) ||
                      (alt && alt.toLowerCase().includes("version")) ||
                      (alt && alt.toLowerCase().includes("build")) ||
                      (alt && alt.toLowerCase().includes("status"))
      
      // Badges stay inline, regular images are block
      if (isBadge) {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={alt || ""}
            className="inline-block h-auto align-middle mr-1"
            loading="lazy"
            {...props}
          />
        )
      }
      
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={alt || ""}
          className="max-w-full h-auto rounded-lg shadow-md my-4"
          loading="lazy"
          {...props}
        />
      )
    },
    // Fix relative links and handle anchor navigation
    a: ({ href, children, ...props }) => {
      const linkHref = href || ""
      
      // Handle anchor links (table of contents)
      if (linkHref.startsWith("#")) {
        const anchorId = linkHref.slice(1)
        
        return (
          <a
            href={linkHref}
            onClick={(e) => {
              e.preventDefault()
              
              // Generate the slug the same way we do for headings
              const expectedSlug = anchorId
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
              
              // Try to find element by exact ID first
              let element: HTMLElement | null = document.getElementById(expectedSlug) || document.getElementById(anchorId)
              
              // Fallback: search for IDs that END with the expected slug
              // This handles cases like "color546e7asftextimportant-notices" -> matches "important-notices"
              if (!element) {
                const allHeadings = document.querySelectorAll('.readme-content h1[id], .readme-content h2[id], .readme-content h3[id], .readme-content h4[id], .readme-content h5[id], .readme-content h6[id]')
                for (const heading of allHeadings) {
                  // Check if the ID ends with our expected slug (handles the color prefix issue)
                  if (heading.id.endsWith(expectedSlug) || heading.id.endsWith(anchorId.toLowerCase())) {
                    element = heading as HTMLElement
                    break
                  }
                }
              }
              
              // Second fallback: search headings by text content
              if (!element) {
                const headings = document.querySelectorAll('.readme-content h1, .readme-content h2, .readme-content h3, .readme-content h4, .readme-content h5, .readme-content h6')
                for (const heading of headings) {
                  const headingText = heading.textContent?.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
                  if (headingText === expectedSlug || headingText?.endsWith(expectedSlug)) {
                    element = heading as HTMLElement
                    break
                  }
                }
              }
              
              if (element) {
                const yOffset = -100 // Account for fixed header
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
                window.scrollTo({ top: y, behavior: 'smooth' })
                window.history.pushState(null, '', linkHref)
              }
            }}
            className="text-primary hover:text-primary-light underline-offset-2 cursor-pointer"
            {...props}
          >
            {children}
          </a>
        )
      }
      
      // Handle relative URLs (but not mailto links)
      let resolvedHref = linkHref
      if (linkHref && !linkHref.startsWith("http") && !linkHref.startsWith("mailto:")) {
        resolvedHref = linkHref.replace(/^\.?\//, "")
        resolvedHref = `${repoBaseUrl}/${resolvedHref}`
      }
      
      const isExternal = resolvedHref.startsWith("http")
      
      return (
        <a
          href={resolvedHref}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-primary hover:text-primary-light underline-offset-2"
          {...props}
        >
          {children}
        </a>
      )
    },
    // Paragraphs - handle inline content properly
    p: ({ children, node, ...props }) => {
      // Check if paragraph contains only images (for badge rows)
      const hasOnlyInlineContent = Array.isArray(children) && children.every((child: any) => {
        if (typeof child === 'string') return child.trim() === '' || child.trim() === '\n'
        if (child?.type === 'img' || child?.type === 'a') return true
        return false
      })
      
      return (
        <p className={`my-3 leading-relaxed ${hasOnlyInlineContent ? 'space-x-1' : ''}`} {...props}>
          {children}
        </p>
      )
    },
    // Better code blocks
    pre: ({ children, ...props }) => (
      <pre
        className="bg-gray-900 dark:bg-gray-950 text-gray-100 rounded-lg p-4 overflow-x-auto my-4 text-sm"
        {...props}
      >
        {children}
      </pre>
    ),
    // Inline code
    code: ({ className, children, ...props }) => {
      const isInline = !className
      if (isInline) {
        return (
          <code
            className="bg-gray-100 dark:bg-gray-800 text-primary dark:text-primary-light px-1.5 py-0.5 rounded text-sm font-mono"
            {...props}
          >
            {children}
          </code>
        )
      }
      return (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
    // Better tables
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th
        className="border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-4 py-2 text-left font-semibold"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border border-gray-300 dark:border-gray-700 px-4 py-2" {...props}>
        {children}
      </td>
    ),
    // Better blockquotes
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 border-primary pl-4 my-4 italic text-accent-dark dark:text-accent-light bg-gray-50 dark:bg-gray-800/50 py-2 pr-4 rounded-r"
        {...props}
      >
        {children}
      </blockquote>
    ),
    // Better headings with auto-generated IDs for anchor links
    h1: ({ children, ...props }) => {
      const text = getTextContent(children)
      const id = slugify(text)
      return (
        <h1 id={id} className="text-3xl font-bold mt-8 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 scroll-mt-24" {...props}>
          {children}
        </h1>
      )
    },
    h2: ({ children, ...props }) => {
      const text = getTextContent(children)
      const id = slugify(text)
      return (
        <h2 id={id} className="text-2xl font-bold mt-6 mb-3 pb-2 border-b border-gray-200 dark:border-gray-700 scroll-mt-24" {...props}>
          {children}
        </h2>
      )
    },
    h3: ({ children, ...props }) => {
      const text = getTextContent(children)
      const id = slugify(text)
      return (
        <h3 id={id} className="text-xl font-bold mt-5 mb-2 scroll-mt-24" {...props}>
          {children}
        </h3>
      )
    },
    h4: ({ children, ...props }) => {
      const text = getTextContent(children)
      const id = slugify(text)
      return (
        <h4 id={id} className="text-lg font-bold mt-4 mb-2 scroll-mt-24" {...props}>
          {children}
        </h4>
      )
    },
    h5: ({ children, ...props }) => {
      const text = getTextContent(children)
      const id = slugify(text)
      return (
        <h5 id={id} className="text-base font-bold mt-3 mb-2 scroll-mt-24" {...props}>
          {children}
        </h5>
      )
    },
    h6: ({ children, ...props }) => {
      const text = getTextContent(children)
      const id = slugify(text)
      return (
        <h6 id={id} className="text-sm font-bold mt-3 mb-2 scroll-mt-24" {...props}>
          {children}
        </h6>
      )
    },
    // Better lists
    ul: ({ children, ...props }) => (
      <ul className="list-disc list-inside my-4 space-y-1 ml-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal list-inside my-4 space-y-1 ml-2" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="text-accent-dark dark:text-accent-light" {...props}>
        {children}
      </li>
    ),
    // Horizontal rule
    hr: ({ ...props }) => (
      <hr className="my-6 border-gray-200 dark:border-gray-700" {...props} />
    ),
  }
}

// File tree item component
function FileTreeItem({ node, repoUrl, depth = 0 }: { node: FileTreeNode; repoUrl: string; depth?: number }) {
  const [isOpen, setIsOpen] = useState(depth < 1) // Auto-expand first level
  const hasChildren = node.type === "folder" && node.children && node.children.length > 0
  
  const fileUrl = `${repoUrl}/blob/HEAD/${node.path}`
  const folderUrl = `${repoUrl}/tree/HEAD/${node.path}`
  
  // Get file extension for icon coloring
  const extension = node.name.split('.').pop()?.toLowerCase()
  const fileColors: Record<string, string> = {
    ts: "text-blue-500",
    tsx: "text-blue-500",
    js: "text-yellow-500",
    jsx: "text-yellow-500",
    py: "text-green-500",
    rs: "text-orange-500",
    go: "text-cyan-500",
    java: "text-red-500",
    md: "text-gray-500",
    json: "text-yellow-600",
    css: "text-pink-500",
    html: "text-orange-600",
    yml: "text-purple-500",
    yaml: "text-purple-500",
  }
  const fileColor = extension ? fileColors[extension] || "text-gray-400" : "text-gray-400"
  
  return (
    <div>
      <div 
        className={`flex items-center py-1 px-2 hover:bg-gray-100 dark:hover:bg-[#161b22] rounded cursor-pointer group font-mono text-sm`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => {
          if (hasChildren) {
            setIsOpen(!isOpen)
          }
        }}
      >
        {node.type === "folder" ? (
          <>
            <ChevronDown 
              className={`h-4 w-4 mr-1 text-gray-400 transition-transform ${isOpen ? "" : "-rotate-90"} ${!hasChildren ? "invisible" : ""}`} 
            />
            <Folder className="h-4 w-4 mr-2 text-yellow-500" />
            <span className="text-gray-800 dark:text-gray-200">{node.name}/</span>
          </>
        ) : (
          <>
            <span className="w-4 mr-1" /> {/* Spacer for alignment */}
            <File className={`h-4 w-4 mr-2 ${fileColor}`} />
            <a 
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {node.name}
            </a>
            {node.size !== undefined && (
              <span className="ml-auto text-xs text-gray-500 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                {formatBytes(node.size)}
              </span>
            )}
          </>
        )}
      </div>
      
      {/* Children */}
      {hasChildren && isOpen && (
        <div>
          {node.children!.map((child) => (
            <FileTreeItem key={child.path} node={child} repoUrl={repoUrl} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

// File tree view component
function FileTreeView({ nodes, repoUrl }: { nodes: FileTreeNode[]; repoUrl: string }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700/50 rounded-lg overflow-hidden">
      <div className="bg-gray-100 dark:bg-[#161b22] px-4 py-2 border-b border-gray-200 dark:border-gray-700/50 flex items-center">
        <FolderTree className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
        <span className="text-sm font-mono text-gray-700 dark:text-gray-300">$ tree ./</span>
      </div>
      <div className="max-h-[500px] overflow-y-auto p-2 bg-white dark:bg-[#0d1117]">
        {nodes.map((node) => (
          <FileTreeItem key={node.path} node={node} repoUrl={repoUrl} />
        ))}
      </div>
    </div>
  )
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [activeTab, setActiveTab] = useState<"readme" | "files" | "commits" | "releases">("readme")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [imageError, setImageError] = useState(false)

  // Memoize markdown components
  const markdownComponents = useMemo(
    () => createMarkdownComponents(project.fullName),
    [project.fullName]
  )

  const openLightbox = (index: number) => setSelectedImage(index)
  const closeLightbox = () => setSelectedImage(null)
  const nextImage = () => {
    if (selectedImage !== null && project.screenshots.length > 0) {
      setSelectedImage((selectedImage + 1) % project.screenshots.length)
    }
  }
  const prevImage = () => {
    if (selectedImage !== null && project.screenshots.length > 0) {
      setSelectedImage((selectedImage - 1 + project.screenshots.length) % project.screenshots.length)
    }
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-background via-background to-background/95">
      {/* Back Button */}
      <div className="container mx-auto px-4 mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors font-mono text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-green-600 dark:text-green-400">$</span> cd ../projects
        </Link>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header - Terminal Style */}
            <motion.div
              variants={fadeIn}
              className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700/50 rounded-lg overflow-hidden"
            >
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-sm font-mono ml-2">{project.slug}</span>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
                      {project.archived && (
                        <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 text-xs rounded-full flex items-center gap-1 font-mono">
                          <Archive className="h-3 w-3" />
                          archived
                        </span>
                      )}
                      {project.fork && (
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 text-xs rounded-full flex items-center gap-1 font-mono">
                          <GitFork className="h-3 w-3" />
                          fork
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">{project.description}</p>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:scale-105 transition-transform"
                      title="View on GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-green-600 text-white rounded-lg hover:scale-105 transition-transform"
                        title="View Demo"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Stats Row */}
                <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700/50 font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-semibold text-gray-900 dark:text-white">{formatNumber(project.stars)}</span>
                    <span className="text-gray-500 dark:text-gray-400">stars</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GitFork className="h-4 w-4 text-blue-500" />
                    <span className="font-semibold text-gray-900 dark:text-white">{formatNumber(project.forks)}</span>
                    <span className="text-gray-500 dark:text-gray-400">forks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-green-500" />
                    <span className="font-semibold text-gray-900 dark:text-white">{formatNumber(project.watchers)}</span>
                    <span className="text-gray-500 dark:text-gray-400">watchers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span className="font-semibold text-gray-900 dark:text-white">{project.openIssues}</span>
                    <span className="text-gray-500 dark:text-gray-400">issues</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-purple-500" />
                    <span className="font-semibold text-gray-900 dark:text-white">{formatBytes(project.size * 1024)}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Screenshots Gallery */}
            {project.screenshots.length > 0 && (
              <motion.div
                variants={fadeIn}
                className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700/50 rounded-lg overflow-hidden"
              >
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
                  <Eye className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="text-gray-700 dark:text-gray-300 font-mono text-sm">screenshots/</span>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {project.screenshots.map((src, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="relative aspect-video rounded-lg overflow-hidden cursor-pointer bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700/50"
                        onClick={() => openLightbox(index)}
                      >
                        <Image
                          src={src}
                          alt={`${project.name} screenshot ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tabs - Terminal Style */}
            <motion.div
              variants={fadeIn}
              className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700/50 rounded-lg overflow-hidden"
            >
              {/* Tab Headers */}
              <div className="flex border-b border-gray-200 dark:border-gray-700/50 bg-gray-50 dark:bg-[#161b22]">
                <button
                  onClick={() => setActiveTab("readme")}
                  className={`flex-1 px-4 py-3 text-sm font-mono transition-colors ${
                    activeTab === "readme"
                      ? "bg-white dark:bg-[#0d1117] text-green-600 dark:text-green-400 border-b-2 border-green-500"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <FileCode className="h-4 w-4 inline mr-2" />
                  README
                </button>
                <button
                  onClick={() => setActiveTab("files")}
                  className={`flex-1 px-4 py-3 text-sm font-mono transition-colors ${
                    activeTab === "files"
                      ? "bg-white dark:bg-[#0d1117] text-green-600 dark:text-green-400 border-b-2 border-green-500"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <FolderTree className="h-4 w-4 inline mr-2" />
                  Files
                </button>
                <button
                  onClick={() => setActiveTab("commits")}
                  className={`flex-1 px-4 py-3 text-sm font-mono transition-colors ${
                    activeTab === "commits"
                      ? "bg-white dark:bg-[#0d1117] text-green-600 dark:text-green-400 border-b-2 border-green-500"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <GitCommit className="h-4 w-4 inline mr-2" />
                  Commits ({project.commits.length})
                </button>
                <button
                  onClick={() => setActiveTab("releases")}
                  className={`flex-1 px-4 py-3 text-sm font-mono transition-colors ${
                    activeTab === "releases"
                      ? "bg-white dark:bg-[#0d1117] text-green-600 dark:text-green-400 border-b-2 border-green-500"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <Package className="h-4 w-4 inline mr-2" />
                  Releases ({project.releases.length})
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === "readme" && (
                    <motion.div
                      key="readme"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="readme-content"
                    >
                      {project.readme ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm, remarkMath]}
                          rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeSlug, rehypeKatex]}
                          components={markdownComponents}
                        >
                          {project.readme}
                        </ReactMarkdown>
                      ) : (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400 font-mono">
                          <FileCode className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p><span className="text-yellow-600 dark:text-yellow-400">⚠</span> No README.md available for this project.</p>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === "files" && (
                    <motion.div
                      key="files"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {project.fileTree.length > 0 ? (
                        <div className="font-mono text-sm">
                          <FileTreeView nodes={project.fileTree} repoUrl={project.url} />
                        </div>
                      ) : (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400 font-mono">
                          <FolderTree className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p><span className="text-red-600 dark:text-red-400">✗</span> Unable to load file structure.</p>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === "commits" && (
                    <motion.div
                      key="commits"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      {project.commits.length > 0 ? (
                        project.commits.map((commit) => (
                          <CommitItem key={commit.sha} commit={commit} repoUrl={project.url} />
                        ))
                      ) : (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400 font-mono">
                          <GitCommit className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p><span className="text-yellow-600 dark:text-yellow-400">⚠</span> No commits available.</p>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === "releases" && (
                    <motion.div
                      key="releases"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      {project.releases.length > 0 ? (
                        project.releases.map((release) => (
                          <div
                            key={release.tag_name}
                            className="p-4 bg-gray-50 dark:bg-[#161b22] border border-gray-200 dark:border-gray-700/50 rounded-lg"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <a
                                href={release.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg font-semibold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center gap-2 font-mono"
                              >
                                <Tag className="h-4 w-4 text-green-600 dark:text-green-400" />
                                {release.name || release.tag_name}
                              </a>
                              <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                                {formatDate(release.published_at)}
                              </span>
                            </div>
                            {release.body && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
                                {release.body}
                              </p>
                            )}
                            {release.assets.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {release.assets.slice(0, 3).map((asset) => (
                                  <a
                                    key={asset.name}
                                    href={asset.download_url}
                                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-sm rounded-full hover:bg-green-200 dark:hover:bg-green-500/20 transition-colors font-mono"
                                  >
                                    <Download className="h-3 w-3" />
                                    {asset.name}
                                    <span className="text-xs opacity-70">
                                      ({formatBytes(asset.size)})
                                    </span>
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400 font-mono">
                          <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p><span className="text-yellow-600 dark:text-yellow-400">⚠</span> No releases available yet.</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Image */}
            {!imageError && (
              <motion.div
                variants={fadeIn}
                className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700/50 rounded-lg overflow-hidden"
              >
                <div className="relative aspect-video">
                  <Image
                    src={project.image || "/project_images/placeholder.png"}
                    alt={project.name}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                </div>
              </motion.div>
            )}

            {/* Quick Info - Terminal Style */}
            <motion.div
              variants={fadeIn}
              className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700/50 rounded-lg overflow-hidden"
            >
              <div className="px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
                <h3 className="font-mono text-sm text-gray-700 dark:text-gray-300">$ cat ./about.json</h3>
              </div>
              <div className="p-4 space-y-3 text-sm font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <Tag className="h-4 w-4 text-green-600 dark:text-green-400" />
                    category
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">{project.category}</span>
                </div>
                {project.language && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                      language
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">{project.language}</span>
                  </div>
                )}
                {project.license && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <Scale className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      license
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">{project.license}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    created
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatDate(project.createdAt)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    last_push
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatRelativeTime(project.pushedAt)}</span>
                </div>
              </div>
            </motion.div>

            {/* Languages - Terminal Style */}
            {project.languagePercentages.length > 0 && (
              <motion.div
                variants={fadeIn}
                className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700/50 rounded-lg overflow-hidden"
              >
                <div className="px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
                  <h3 className="font-mono text-sm text-gray-700 dark:text-gray-300">$ tokei ./</h3>
                </div>
                <div className="p-4">
                  {/* Language Bar */}
                  <div className="h-2 rounded-full overflow-hidden flex mb-4">
                    {project.languagePercentages.map((lang) => (
                      <div
                        key={lang.name}
                        style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                        title={`${lang.name}: ${lang.percentage}%`}
                      />
                    ))}
                  </div>
                  <div className="space-y-2 font-mono text-sm">
                    {project.languagePercentages.map((lang) => (
                      <div key={lang.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: lang.color }}
                          />
                          <span className="text-gray-900 dark:text-white">{lang.name}</span>
                        </div>
                        <span className="text-gray-500 dark:text-gray-400">
                          {lang.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Topics - Terminal Style */}
            {project.topics.length > 0 && (
              <motion.div
                variants={fadeIn}
                className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700/50 rounded-lg overflow-hidden"
              >
                <div className="px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
                  <h3 className="font-mono text-sm text-gray-700 dark:text-gray-300">$ echo $TOPICS</h3>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {project.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1 bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-sm rounded-full font-mono"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Contributors - Terminal Style */}
            {project.contributors.length > 0 && (
              <motion.div
                variants={fadeIn}
                className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700/50 rounded-lg overflow-hidden"
              >
                <div className="px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50 flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <h3 className="font-mono text-sm text-gray-700 dark:text-gray-300">contributors</h3>
                </div>
                <div className="p-4 space-y-3">
                  {project.contributors.slice(0, 5).map((contributor) => (
                    <a
                      key={contributor.login}
                      href={contributor.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-[#161b22] p-2 rounded-lg transition-colors"
                    >
                      <Image
                        src={contributor.avatar_url}
                        alt={contributor.login}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-sm text-gray-900 dark:text-white truncate">{contributor.login}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                          {contributor.contributions} commits
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Owner - Terminal Style */}
            <motion.div
              variants={fadeIn}
              className="bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700/50 rounded-lg overflow-hidden"
            >
              <div className="px-4 py-3 bg-gray-100 dark:bg-[#161b22] border-b border-gray-200 dark:border-gray-700/50">
                <h3 className="font-mono text-sm text-gray-700 dark:text-gray-300">$ whoami</h3>
              </div>
              <div className="p-4">
                <a
                  href={project.owner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-[#161b22] p-2 rounded-lg transition-colors"
                >
                  <Image
                    src={project.owner.avatar}
                    alt={project.owner.login}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-mono text-gray-900 dark:text-white">{project.owner.login}</p>
                    <p className="text-sm text-green-600 dark:text-green-400 font-mono">
                      <span className="mr-1">$</span> open profile
                    </p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && project.screenshots.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-4 p-2 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl max-h-[80vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={project.screenshots[selectedImage]}
                alt={`Screenshot ${selectedImage + 1}`}
                fill
                className="object-contain"
              />
            </motion.div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-4 p-2 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {selectedImage + 1} / {project.screenshots.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function CommitItem({ commit, repoUrl }: { commit: GitHubCommit; repoUrl: string }) {
  const message = commit.commit.message.split("\n")[0]
  const hasMoreLines = commit.commit.message.includes("\n")

  return (
    <div className="flex gap-4 p-4 bg-gray-50 dark:bg-[#161b22] border border-gray-200 dark:border-gray-700/50 rounded-lg">
      {commit.author ? (
        <Image
          src={commit.author.avatar_url}
          alt={commit.author.login}
          width={40}
          height={40}
          className="rounded-full h-10 w-10 flex-shrink-0"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <a
          href={commit.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors line-clamp-2"
        >
          {message}
          {hasMoreLines && <span className="text-gray-500 dark:text-gray-400">...</span>}
        </a>
        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400 font-mono">
          {commit.author ? (
            <a
              href={commit.author.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
            >
              {commit.author.login}
            </a>
          ) : (
            <span>{commit.commit.author.name}</span>
          )}
          <span>•</span>
          <span>{formatRelativeTime(commit.commit.author.date)}</span>
          <span>•</span>
          <code className="text-xs bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-green-700 dark:text-green-400">
            {commit.sha.substring(0, 7)}
          </code>
        </div>
      </div>
    </div>
  )
}
