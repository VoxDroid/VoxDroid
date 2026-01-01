import { githubRepos, projectOverrides, screenshotPaths } from "@/config/projects"

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

const headers: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
  ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
}

export interface GitHubRepo {
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  watchers_count: number
  forks_count: number
  open_issues_count: number
  language: string | null
  topics: string[]
  license: {
    key: string
    name: string
    spdx_id: string
    url: string
  } | null
  created_at: string
  updated_at: string
  pushed_at: string
  default_branch: string
  visibility: string
  archived: boolean
  disabled: boolean
  fork: boolean
  size: number
  owner: {
    login: string
    avatar_url: string
    html_url: string
  }
}

export interface GitHubCommit {
  sha: string
  commit: {
    message: string
    author: {
      name: string
      email: string
      date: string
    }
    committer: {
      name: string
      email: string
      date: string
    }
  }
  html_url: string
  author: {
    login: string
    avatar_url: string
    html_url: string
  } | null
}

export interface GitHubLanguages {
  [language: string]: number
}

export interface GitHubContributor {
  login: string
  avatar_url: string
  html_url: string
  contributions: number
}

export interface GitHubRelease {
  tag_name: string
  name: string
  body: string
  html_url: string
  published_at: string
  prerelease: boolean
  draft: boolean
  assets: {
    name: string
    download_url: string
    size: number
    download_count: number
  }[]
}

export interface GitHubTreeItem {
  path: string
  mode: string
  type: "blob" | "tree"
  sha: string
  size?: number
  url: string
}

export interface GitHubTree {
  sha: string
  url: string
  tree: GitHubTreeItem[]
  truncated: boolean
}

export interface FileTreeNode {
  name: string
  path: string
  type: "file" | "folder"
  size?: number
  children?: FileTreeNode[]
}

export interface ProjectData {
  // Basic Info
  slug: string
  name: string
  fullName: string
  description: string
  url: string
  homepage: string | null
  demoUrl: string | null
  
  // Stats
  stars: number
  watchers: number
  forks: number
  openIssues: number
  size: number
  
  // Meta
  language: string | null
  languages: GitHubLanguages
  languagePercentages: { name: string; percentage: number; color: string }[]
  topics: string[]
  license: string | null
  licenseUrl: string | null
  
  // Dates
  createdAt: string
  updatedAt: string
  pushedAt: string
  
  // Content
  readme: string | null
  commits: GitHubCommit[]
  contributors: GitHubContributor[]
  releases: GitHubRelease[]
  fileTree: FileTreeNode[]
  
  // Custom
  category: string
  featured: boolean
  screenshots: string[]
  image: string | null
  
  // Owner
  owner: {
    login: string
    avatar: string
    url: string
  }
  
  // Status
  archived: boolean
  fork: boolean
}

// Language colors from GitHub
const languageColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  Rust: "#dea584",
  Go: "#00ADD8",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#239120",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Shell: "#89e051",
  PowerShell: "#012456",
  Assembly: "#6E4C13",
  Lua: "#000080",
  Vim: "#199f4b",
  Dockerfile: "#384d54",
  Makefile: "#427819",
}

async function fetchGitHub<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await fetch(`https://api.github.com${endpoint}`, {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    })
    
    if (!response.ok) {
      console.error(`GitHub API error for ${endpoint}: ${response.status}`)
      return null
    }
    
    return response.json()
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error)
    return null
  }
}

export async function getRepoData(fullName: string): Promise<GitHubRepo | null> {
  return fetchGitHub<GitHubRepo>(`/repos/${fullName}`)
}

export async function getRepoReadme(fullName: string): Promise<string | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${fullName}/readme`, {
      headers: {
        ...headers,
        Accept: "application/vnd.github.v3.raw",
      },
      next: { revalidate: 3600 },
    })
    
    if (!response.ok) return null
    return response.text()
  } catch {
    return null
  }
}

export async function getRepoLanguages(fullName: string): Promise<GitHubLanguages> {
  const languages = await fetchGitHub<GitHubLanguages>(`/repos/${fullName}/languages`)
  return languages || {}
}

export async function getRepoCommits(fullName: string, count = 10): Promise<GitHubCommit[]> {
  const commits = await fetchGitHub<GitHubCommit[]>(`/repos/${fullName}/commits?per_page=${count}`)
  return commits || []
}

export async function getRepoContributors(fullName: string): Promise<GitHubContributor[]> {
  const contributors = await fetchGitHub<GitHubContributor[]>(`/repos/${fullName}/contributors?per_page=10`)
  return contributors || []
}

export async function getRepoReleases(fullName: string): Promise<GitHubRelease[]> {
  const releases = await fetchGitHub<GitHubRelease[]>(`/repos/${fullName}/releases?per_page=5`)
  return releases || []
}

export async function getRepoTree(fullName: string, branch = "HEAD"): Promise<FileTreeNode[]> {
  try {
    // Get the tree recursively
    const tree = await fetchGitHub<GitHubTree>(`/repos/${fullName}/git/trees/${branch}?recursive=1`)
    if (!tree || !tree.tree) return []
    
    // Build hierarchical structure from flat list
    return buildFileTree(tree.tree)
  } catch {
    return []
  }
}

function buildFileTree(items: GitHubTreeItem[]): FileTreeNode[] {
  const root: FileTreeNode[] = []
  const nodeMap = new Map<string, FileTreeNode>()
  
  // Sort items so folders come before files, then alphabetically
  const sortedItems = [...items].sort((a, b) => {
    // Folders first
    if (a.type !== b.type) {
      return a.type === "tree" ? -1 : 1
    }
    // Then alphabetically by path
    return a.path.localeCompare(b.path)
  })
  
  for (const item of sortedItems) {
    const parts = item.path.split("/")
    const name = parts[parts.length - 1]
    const parentPath = parts.slice(0, -1).join("/")
    
    const node: FileTreeNode = {
      name,
      path: item.path,
      type: item.type === "tree" ? "folder" : "file",
      size: item.size,
      children: item.type === "tree" ? [] : undefined,
    }
    
    nodeMap.set(item.path, node)
    
    if (parentPath === "") {
      // Root level item
      root.push(node)
    } else {
      // Find parent and add as child
      const parent = nodeMap.get(parentPath)
      if (parent && parent.children) {
        parent.children.push(node)
      }
    }
  }
  
  // Sort children: folders first, then files, both alphabetically
  function sortChildren(nodes: FileTreeNode[]) {
    nodes.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === "folder" ? -1 : 1
      }
      return a.name.localeCompare(b.name)
    })
    for (const node of nodes) {
      if (node.children) {
        sortChildren(node.children)
      }
    }
  }
  
  sortChildren(root)
  return root
}
function calculateLanguagePercentages(languages: GitHubLanguages): { name: string; percentage: number; color: string }[] {
  const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0)
  if (total === 0) return []
  
  return Object.entries(languages)
    .map(([name, bytes]) => ({
      name,
      percentage: Math.round((bytes / total) * 1000) / 10,
      color: languageColors[name] || "#808080",
    }))
    .sort((a, b) => b.percentage - a.percentage)
}

export async function getFullProjectData(fullName: string): Promise<ProjectData | null> {
  const [repo, readme, languages, commits, contributors, releases, fileTree] = await Promise.all([
    getRepoData(fullName),
    getRepoReadme(fullName),
    getRepoLanguages(fullName),
    getRepoCommits(fullName, 15),
    getRepoContributors(fullName),
    getRepoReleases(fullName),
    getRepoTree(fullName),
  ])
  
  if (!repo) return null
  
  const override = projectOverrides[fullName] || {}
  const slug = repo.name
  
  // Try to find an image in public folder or use a placeholder
  const imageBaseName = slug.toLowerCase().replace(/-/g, "")
  const possibleImages = [
    `/project_images/${slug}.png`,
    `/project_images/${imageBaseName}.png`,
    `/project_images/${slug.toUpperCase()}.png`,
  ]
  
  return {
    slug,
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description || "No description provided",
    url: repo.html_url,
    homepage: repo.homepage,
    demoUrl: override.demoUrl || repo.homepage || null,
    
    stars: repo.stargazers_count,
    watchers: repo.watchers_count,
    forks: repo.forks_count,
    openIssues: repo.open_issues_count,
    size: repo.size,
    
    language: repo.language,
    languages,
    languagePercentages: calculateLanguagePercentages(languages),
    topics: repo.topics || [],
    license: repo.license?.name || null,
    licenseUrl: repo.license?.url || null,
    
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
    pushedAt: repo.pushed_at,
    
    readme,
    commits,
    contributors,
    releases,
    fileTree,
    
    category: override.category || getCategoryFromLanguage(repo.language, repo.topics),
    featured: override.featured || false,
    screenshots: screenshotPaths[fullName] || [],
    image: override.image || possibleImages[0],
    
    owner: {
      login: repo.owner.login,
      avatar: repo.owner.avatar_url,
      url: repo.owner.html_url,
    },
    
    archived: repo.archived,
    fork: repo.fork,
  }
}

function getCategoryFromLanguage(language: string | null, topics: string[]): string {
  const topicsLower = topics.map(t => t.toLowerCase())
  
  if (topicsLower.some(t => ["cli", "command-line", "terminal"].includes(t))) return "CLI Tool"
  if (topicsLower.some(t => ["web", "website", "nextjs", "react"].includes(t))) return "Web App"
  if (topicsLower.some(t => ["desktop", "gui", "pyqt", "electron"].includes(t))) return "Desktop App"
  if (topicsLower.some(t => ["library", "package", "module"].includes(t))) return "Library"
  if (topicsLower.some(t => ["tutorial", "learning", "snippets", "examples"].includes(t))) return "Educational"
  
  switch (language) {
    case "Rust":
    case "Go":
      return "CLI Tool"
    case "Python":
      return "Application"
    case "JavaScript":
    case "TypeScript":
      return "Web App"
    case "Java":
      return "Desktop App"
    default:
      return "Project"
  }
}

export async function getAllProjects(): Promise<ProjectData[]> {
  const projects = await Promise.all(
    githubRepos.map(repo => getFullProjectData(repo))
  )
  
  // Filter out null/undefined projects
  const validProjects = projects.filter((p): p is ProjectData => p !== null && p !== undefined)
  
  return validProjects.sort((a, b) => {
    // Featured first, then by stars, then by push date
    const aFeatured = a.featured ?? false
    const bFeatured = b.featured ?? false
    if (aFeatured !== bFeatured) return bFeatured ? 1 : -1
    if (a.stars !== b.stars) return b.stars - a.stars
    return new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime()
  })
}

export async function getFeaturedProjects(fallbackCount: number = 3): Promise<ProjectData[]> {
  const allProjects = await getAllProjects()
  const featured = allProjects.filter(p => p && p.featured === true)
  
  // If no featured projects are set, fall back to top starred projects
  if (featured.length === 0 && fallbackCount > 0) {
    return [...allProjects]
      .sort((a, b) => b.stars - a.stars)
      .slice(0, fallbackCount)
  }
  
  return featured
}

export async function getProjectBySlug(slug: string): Promise<ProjectData | null> {
  const fullName = githubRepos.find(repo => {
    const repoName = repo.split("/")[1]
    return repoName.toLowerCase() === slug.toLowerCase()
  })
  
  if (!fullName) return null
  return getFullProjectData(fullName)
}

export function getAllProjectSlugs(): string[] {
  return githubRepos.map(repo => repo.split("/")[1])
}

// Format utilities
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)
  
  if (minutes < 1) return "just now"
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  if (weeks < 4) return `${weeks}w ago`
  if (months < 12) return `${months}mo ago`
  return `${years}y ago`
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}
