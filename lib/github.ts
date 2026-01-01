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
  Vue: "#41b883",
  Svelte: "#ff3e00",
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

// GitHub User Stats
export interface RecentActivity {
  type: string
  repo: string
  message: string
  date: string
  timeAgo: string
}

export interface StreakStats {
  totalContributions: number
  currentStreak: number
  currentStreakStart: string
  currentStreakEnd: string
  longestStreak: number
  longestStreakStart: string
  longestStreakEnd: string
  firstContribution: string
}

export interface GitHubUserStats {
  publicRepos: number
  publicGists: number
  followers: number
  following: number
  totalStars: number
  totalForks: number
  topLanguages: { name: string; percentage: number; color: string }[]
  accountAge: number // years
  accountCreated: string // formatted date
  totalCommits: number
  currentStreak: number
  currentStreakStart: string
  currentStreakEnd: string
  longestStreak: number
  longestStreakStart: string
  longestStreakEnd: string
  totalContributions: number // lifetime total
  contributionsThisYear: number
  contributionGraph: number[] // last 52 weeks of contributions
  recentActivity: RecentActivity[]
  firstContribution: string
}

// Fetch streak stats from GitHub Readme Streak Stats API
async function fetchStreakStats(username: string): Promise<StreakStats | null> {
  try {
    // Try multiple possible API endpoints
    const urls = [
      `https://github-readme-streak-stats.herokuapp.com/api?user=${username}&type=json`,
      `https://streak-stats.demolab.com/api?user=${username}&type=json`,
    ]
    
    for (const url of urls) {
      try {
        const response = await fetch(url, { 
          next: { revalidate: 3600 },
          headers: { 'Accept': 'application/json' }
        })
        
        if (!response.ok) continue
        const text = await response.text()
        
        // Check if response is JSON
        if (!text.startsWith('{')) continue
        
        const data = JSON.parse(text)
        
        // Format date helper
        const formatDate = (dateStr: string): string => {
          if (!dateStr) return ''
          const date = new Date(dateStr)
          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        }
        
        // The API returns different formats - handle both
        const currentStreakLength = typeof data.currentStreak === 'object' 
          ? parseInt(data.currentStreak?.length) || 0
          : parseInt(data.currentStreak) || 0
        const longestStreakLength = typeof data.longestStreak === 'object'
          ? parseInt(data.longestStreak?.length) || 0
          : parseInt(data.longestStreak) || 0
        
        return {
          totalContributions: parseInt(data.totalContributions) || 0,
          currentStreak: currentStreakLength,
          currentStreakStart: formatDate(data.currentStreak?.start || ''),
          currentStreakEnd: formatDate(data.currentStreak?.end || ''),
          longestStreak: longestStreakLength,
          longestStreakStart: formatDate(data.longestStreak?.start || ''),
          longestStreakEnd: formatDate(data.longestStreak?.end || ''),
          firstContribution: formatDate(data.firstContribution || ''),
        }
      } catch {
        continue
      }
    }
    
    // If all APIs fail, return null to use calculated values
    return null
  } catch (error) {
    console.error('Failed to fetch streak stats:', error)
    return null
  }
}

// GraphQL query to fetch contributions for a specific year
const CONTRIBUTIONS_QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
        }
      }
    }
  }
`

// GraphQL query to fetch contribution calendar with daily data for streak calculation
const STREAK_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`

// Calculate streak from contribution days
function calculateStreaksFromDays(days: { date: string; contributionCount: number }[]): {
  currentStreak: number
  longestStreak: number
  currentStreakStart: string
  currentStreakEnd: string
  longestStreakStart: string
  longestStreakEnd: string
} {
  // Sort days in reverse chronological order (most recent first)
  const sortedDays = [...days].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  let currentStreak = 0
  let currentStreakStart = ''
  let currentStreakEnd = ''
  let longestStreak = 0
  let longestStreakStart = ''
  let longestStreakEnd = ''
  
  // Calculate current streak (consecutive days from today/yesterday)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  let streakActive = false
  let tempStreak = 0
  let tempStart = ''
  let tempEnd = ''
  
  for (let i = 0; i < sortedDays.length; i++) {
    const day = sortedDays[i]
    const dayDate = new Date(day.date)
    dayDate.setHours(0, 0, 0, 0)
    
    // For current streak, start from today or yesterday
    if (i === 0) {
      const diffDays = Math.floor((today.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24))
      if (diffDays <= 1 && day.contributionCount > 0) {
        streakActive = true
        tempStreak = 1
        tempEnd = day.date
        tempStart = day.date
      } else if (diffDays > 1) {
        // No contribution today or yesterday, current streak is 0
        break
      }
      continue
    }
    
    if (!streakActive) break
    
    // Check if this day is consecutive
    const prevDay = new Date(sortedDays[i - 1].date)
    const diffFromPrev = Math.floor((prevDay.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffFromPrev === 1 && day.contributionCount > 0) {
      tempStreak++
      tempStart = day.date
    } else {
      break
    }
  }
  
  currentStreak = tempStreak
  currentStreakStart = tempStart
  currentStreakEnd = tempEnd
  
  // Calculate longest streak (iterate through all days)
  const chronologicalDays = [...days].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  
  tempStreak = 0
  tempStart = ''
  tempEnd = ''
  
  for (let i = 0; i < chronologicalDays.length; i++) {
    const day = chronologicalDays[i]
    
    if (day.contributionCount > 0) {
      if (tempStreak === 0) {
        tempStart = day.date
      }
      tempStreak++
      tempEnd = day.date
      
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak
        longestStreakStart = tempStart
        longestStreakEnd = tempEnd
      }
    } else {
      tempStreak = 0
      tempStart = ''
      tempEnd = ''
    }
  }
  
  const formatDate = (dateStr: string): string => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }
  
  return {
    currentStreak,
    longestStreak,
    currentStreakStart: formatDate(currentStreakStart),
    currentStreakEnd: formatDate(currentStreakEnd),
    longestStreakStart: formatDate(longestStreakStart),
    longestStreakEnd: formatDate(longestStreakEnd),
  }
}

// Fetch streak data using GraphQL
async function fetchStreakFromGraphQL(username: string): Promise<{
  currentStreak: number
  longestStreak: number
  currentStreakStart: string
  currentStreakEnd: string
  longestStreakStart: string
  longestStreakEnd: string
} | null> {
  if (!GITHUB_TOKEN) return null
  
  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: STREAK_QUERY,
        variables: { username },
      }),
      next: { revalidate: 3600 },
    })
    
    const data = await response.json()
    const weeks = data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks
    
    if (!weeks) return null
    
    // Flatten all contribution days
    const allDays: { date: string; contributionCount: number }[] = []
    for (const week of weeks) {
      for (const day of week.contributionDays) {
        allDays.push(day)
      }
    }
    
    return calculateStreaksFromDays(allDays)
  } catch (error) {
    console.error('Failed to fetch streak from GraphQL:', error)
    return null
  }
}

// Fetch lifetime contributions using GitHub GraphQL API
async function fetchLifetimeContributions(username: string, accountCreatedAt: string): Promise<number> {
  if (!GITHUB_TOKEN) {
    console.warn('GITHUB_TOKEN not set - cannot fetch lifetime contributions via GraphQL')
    return 0
  }

  try {
    const createdYear = new Date(accountCreatedAt).getFullYear()
    const currentYear = new Date().getFullYear()
    
    // Fetch contributions for each year from account creation to now
    const yearPromises: Promise<number>[] = []
    
    for (let year = createdYear; year <= currentYear; year++) {
      const from = new Date(year, 0, 1).toISOString() // Jan 1
      const to = year === currentYear 
        ? new Date().toISOString() // Now for current year
        : new Date(year, 11, 31, 23, 59, 59).toISOString() // Dec 31 for past years
      
      const promise = fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: CONTRIBUTIONS_QUERY,
          variables: { username, from, to },
        }),
        next: { revalidate: 3600 },
      })
        .then(res => res.json())
        .then(data => {
          return data?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0
        })
        .catch(() => 0)
      
      yearPromises.push(promise)
    }
    
    const yearlyContributions = await Promise.all(yearPromises)
    const totalLifetime = yearlyContributions.reduce((sum, count) => sum + count, 0)
    
    console.log(`Lifetime contributions for ${username}: ${totalLifetime} (${currentYear - createdYear + 1} years)`)
    return totalLifetime
  } catch (error) {
    console.error('Failed to fetch lifetime contributions via GraphQL:', error)
    return 0
  }
}

export async function getGitHubUserStats(username: string): Promise<GitHubUserStats | null> {
  try {
    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
    })
    
    if (!userResponse.ok) return null
    const userData = await userResponse.json()
    
    // Fetch user's repos to calculate stars, forks, and languages
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers,
      next: { revalidate: 3600 },
    })
    
    let totalStars = 0
    let totalForks = 0
    const languageBytes: Record<string, number> = {}
    
    if (reposResponse.ok) {
      const repos = await reposResponse.json()
      
      // Fetch languages for each repo to get byte counts
      const languagePromises = repos.slice(0, 30).map(async (repo: GitHubRepo) => {
        totalStars += repo.stargazers_count || 0
        totalForks += repo.forks_count || 0
        
        try {
          const langResponse = await fetch(`https://api.github.com/repos/${repo.full_name}/languages`, {
            headers,
            next: { revalidate: 3600 },
          })
          if (langResponse.ok) {
            const langs = await langResponse.json()
            for (const [lang, bytes] of Object.entries(langs)) {
              languageBytes[lang] = (languageBytes[lang] || 0) + (bytes as number)
            }
          }
        } catch {
          // Ignore individual repo language fetch errors
        }
      })
      
      await Promise.all(languagePromises)
    }
    
    // Calculate language percentages
    const totalBytes = Object.values(languageBytes).reduce((a, b) => a + b, 0)
    const topLanguages = Object.entries(languageBytes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, bytes]) => ({
        name,
        percentage: Math.round((bytes / totalBytes) * 100),
        color: languageColors[name] || '#858585',
      }))
    
    // Calculate account age
    const createdAt = new Date(userData.created_at)
    const now = new Date()
    const accountAge = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24 * 365))
    const accountCreated = createdAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    
    // Fetch streak stats and lifetime contributions in parallel
    const [streakStats, lifetimeContributions, graphqlStreak] = await Promise.all([
      fetchStreakStats(username),
      fetchLifetimeContributions(username, userData.created_at),
      fetchStreakFromGraphQL(username),
    ])
    
    // Fetch contribution data from GitHub's public events
    const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=100`, {
      headers,
      next: { revalidate: 3600 },
    })
    
    let contributionsThisYear = 0
    let currentStreak = 0
    let longestStreak = 0
    let totalCommits = 0
    const contributionGraph: number[] = new Array(52).fill(0)
    const recentActivity: RecentActivity[] = []
    
    // Helper function to calculate time ago
    const getTimeAgo = (date: Date): string => {
      const now = new Date()
      const diffMs = now.getTime() - date.getTime()
      const diffMins = Math.floor(diffMs / 60000)
      const diffHours = Math.floor(diffMs / 3600000)
      const diffDays = Math.floor(diffMs / 86400000)
      
      if (diffMins < 60) return `${diffMins}m ago`
      if (diffHours < 24) return `${diffHours}h ago`
      if (diffDays < 7) return `${diffDays}d ago`
      if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
      return `${Math.floor(diffDays / 30)}mo ago`
    }
    
    if (eventsResponse.ok) {
      const events = await eventsResponse.json()
      
      // Process all events for recent activity
      for (const event of events.slice(0, 10)) {
        const eventDate = new Date(event.created_at)
        let activityType = ''
        let message = ''
        
        switch (event.type) {
          case 'PushEvent':
            activityType = 'push'
            const commits = event.payload?.commits || []
            totalCommits += commits.length
            message = commits.length > 0 
              ? commits[0].message?.split('\n')[0] || 'Pushed commits'
              : 'Pushed commits'
            if (commits.length > 1) message += ` (+${commits.length - 1} more)`
            break
          case 'CreateEvent':
            activityType = 'create'
            message = `Created ${event.payload?.ref_type || 'branch'} ${event.payload?.ref || ''}`
            break
          case 'PullRequestEvent':
            activityType = 'pr'
            message = `${event.payload?.action || 'Updated'} PR: ${event.payload?.pull_request?.title || ''}`
            break
          case 'IssuesEvent':
            activityType = 'issue'
            message = `${event.payload?.action || 'Updated'} issue: ${event.payload?.issue?.title || ''}`
            break
          case 'WatchEvent':
            activityType = 'star'
            message = 'Starred repository'
            break
          case 'ForkEvent':
            activityType = 'fork'
            message = 'Forked repository'
            break
          default:
            activityType = 'activity'
            message = event.type.replace('Event', '')
        }
        
        recentActivity.push({
          type: activityType,
          repo: event.repo?.name?.split('/')[1] || event.repo?.name || 'unknown',
          message: message.slice(0, 60) + (message.length > 60 ? '...' : ''),
          date: eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          timeAgo: getTimeAgo(eventDate),
        })
      }
      
      const pushEvents = events.filter((e: { type: string }) => e.type === 'PushEvent')
      
      // Count contributions and calculate streaks
      const contributionDays = new Set<string>()
      const now = new Date()
      const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
      
      for (const event of pushEvents) {
        const eventDate = new Date(event.created_at)
        const commits = event.payload?.commits || []
        
        if (eventDate >= oneYearAgo) {
          contributionsThisYear += commits.length || 1
          const dateStr = eventDate.toISOString().split('T')[0]
          contributionDays.add(dateStr)
          
          // Calculate week index for contribution graph
          const weekDiff = Math.floor((now.getTime() - eventDate.getTime()) / (7 * 24 * 60 * 60 * 1000))
          if (weekDiff < 52) {
            contributionGraph[51 - weekDiff] += commits.length || 1
          }
        }
      }
      
      // Calculate streaks (simplified)
      const sortedDates = Array.from(contributionDays).sort().reverse()
      let tempStreak = 0
      let prevDate: Date | null = null
      
      for (const dateStr of sortedDates) {
        const date = new Date(dateStr)
        if (!prevDate) {
          tempStreak = 1
          prevDate = date
        } else {
          const diff = (prevDate.getTime() - date.getTime()) / (24 * 60 * 60 * 1000)
          if (diff <= 1.5) {
            tempStreak++
          } else {
            if (tempStreak > longestStreak) longestStreak = tempStreak
            tempStreak = 1
          }
          prevDate = date
        }
      }
      if (tempStreak > longestStreak) longestStreak = tempStreak
      
      // Current streak - check if most recent contribution was today or yesterday
      if (sortedDates.length > 0) {
        const lastContrib = new Date(sortedDates[0])
        const daysDiff = Math.floor((now.getTime() - lastContrib.getTime()) / (24 * 60 * 60 * 1000))
        if (daysDiff <= 1) {
          currentStreak = tempStreak
        }
      }
    }
    
    return {
      publicRepos: userData.public_repos || 0,
      publicGists: userData.public_gists || 0,
      followers: userData.followers || 0,
      following: userData.following || 0,
      totalStars,
      totalForks,
      topLanguages,
      accountAge,
      accountCreated,
      totalCommits,
      // Use GraphQL streak data if available, then API, then calculated
      currentStreak: graphqlStreak?.currentStreak ?? streakStats?.currentStreak ?? currentStreak,
      currentStreakStart: graphqlStreak?.currentStreakStart || streakStats?.currentStreakStart || '',
      currentStreakEnd: graphqlStreak?.currentStreakEnd || streakStats?.currentStreakEnd || '',
      longestStreak: graphqlStreak?.longestStreak ?? streakStats?.longestStreak ?? longestStreak,
      longestStreakStart: graphqlStreak?.longestStreakStart || streakStats?.longestStreakStart || '',
      longestStreakEnd: graphqlStreak?.longestStreakEnd || streakStats?.longestStreakEnd || '',
      // Use lifetime contributions from GraphQL (most accurate)
      totalContributions: lifetimeContributions || streakStats?.totalContributions || contributionsThisYear,
      contributionsThisYear: streakStats?.totalContributions || contributionsThisYear,
      contributionGraph,
      recentActivity,
      firstContribution: streakStats?.firstContribution || '',
    }
  } catch (error) {
    console.error('Failed to fetch GitHub user stats:', error)
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
