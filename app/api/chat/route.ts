import { streamText } from "ai"
import { google } from "@ai-sdk/google"
import { NextResponse } from "next/server"
import { githubRepos } from "@/config/projects"
import { getAllProjects, getGitHubUserStats } from "@/lib/github"

export const runtime = "edge"
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    // Check if AI chat is enabled
    const aiEnabled = process.env.ENABLE_AI_CHAT !== 'false' // Default to enabled if not set

    if (!aiEnabled) {
      return NextResponse.json({
        error: "AI chat is currently disabled. Contact the administrator to enable this feature."
      }, { status: 403 })
    }

    const body = await req.json()
    const messages = body?.messages
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Missing messages array" }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.google_generative_ai_api_key
    if (!apiKey) {
      return NextResponse.json({ error: 'Server not configured. Set GOOGLE_GENERATIVE_AI_API_KEY in your environment.' }, { status: 500 })
    }

    // Compose the system prompt from About page content + detailed projects info
    const aboutSummary = `You are "VoxDroid", a calm, curious full-stack developer who likes building helpful projects and prefers clear, step-by-step answers. Answer concisely and helpfully. Use only the information provided below when answering.`

    // Get detailed project information
    let projectsInfo = ""
    try {
      const projects = await getAllProjects()
      projectsInfo = projects.map(project => {
        const readmeExcerpt = project.readme
          ? project.readme.replace(/#+\s*/g, '').substring(0, 500) + (project.readme.length > 500 ? '...' : '')
          : 'No README available'

        return `
Project: ${project.name}
Description: ${project.description}
Language: ${project.language || 'Not specified'}
Topics: ${project.topics.join(', ') || 'None'}
Stars: ${project.stars}, Forks: ${project.forks}
README: ${readmeExcerpt}
URL: ${project.url}
${project.homepage ? `Homepage: ${project.homepage}` : ''}
---`
      }).join('\n')
    } catch (error) {
      console.error('Failed to fetch project data:', error)
      // Fallback to simple list
      projectsInfo = `Known projects: ${githubRepos.map((r) => r.split("/")[1]).join(", ")}.`
    }

    // Get GitHub profile statistics
    let githubStats = ""
    try {
      const stats = await getGitHubUserStats('VoxDroid')
      if (stats) {
        githubStats = `
GitHub Profile Statistics:
- Public Repositories: ${stats.publicRepos}
- Total Stars: ${stats.totalStars}
- Total Forks: ${stats.totalForks}
- Followers: ${stats.followers}
- Following: ${stats.following}
- Account Age: ${stats.accountAge} years (created ${stats.accountCreated})
- Total Contributions: ${stats.totalContributions}
- Contributions This Year: ${stats.contributionsThisYear}
- Current Streak: ${stats.currentStreak} days
- Longest Streak: ${stats.longestStreak} days
- Top Languages: ${stats.topLanguages.map(l => `${l.name} (${l.percentage}%)`).join(', ')}
---`
      }
    } catch (error) {
      console.error('Failed to fetch GitHub stats:', error)
    }

    // Comprehensive about information
    const aboutInfo = `
ABOUT VOXDROID:
Name: VoxDroid (Full Stack Developer)
Role: Full Stack Developer specializing in Intelligent Systems
Education: 
- Bachelor of Science in Computer Science (Intelligent Systems Specialization) - Laguna State Polytechnic University (2022-Present, Dean's Lister)
- Senior High School (STEM) - Laguna Senior High School (2020-2022, With High Honors)
- High School (STEM) - Pedro Guevera Memorial National High School (2016-2020, With High Honors)

Technical Skills:
Programming Languages: Python, C/C++/C#, Java, JavaScript, Rust, VBS, Batch, Lua, PHP, TypeScript, Dart, Swift
Operating Systems: Windows (Proficient), Linux (Proficient), Android (Proficient), MacOS/iOS (Intermediate)
Hardware: PC Assembly, Networking, Electronics, Single-board Computers, Embedded Systems Prototyping
Software: Git/GitHub, Docker, Tmux, VMware
Other: Shell Scripting, Vim/Neovim, CLI, Pacman

Languages: English (Fluent), Tagalog (Native)

Journey:
- 2015-2016: Started with LUA, BATCH scripts, and SHELL scripts
- 2017-2020: Learned desktop software, web development, Android development, and machine learning
- 2021-2023: Worked on personal projects, refined skills in system architecture, AI/ML, and application development
- 2024-Present: Focused on Next.js, TypeScript, Rust, web development, and Data Science

Interests: Open-source development, AI Experiments, Reading novels, Music, Games, Computers
---`

    // Services offered
    const servicesInfo = `
SERVICES OFFERED:
1. Web Development: Modern, responsive websites and web applications using React, Next.js, TypeScript, Tailwind CSS, Node.js, PHP
2. Desktop Applications: Cross-platform desktop apps using Rust, C#, Python, Electron, Tauri, Qt
3. Mobile Development: iOS & Android apps using Flutter, Dart, Swift, React Native, Firebase
4. Backend & APIs: Scalable backend systems using Node.js, Python, Rust, PostgreSQL, MongoDB, Docker
5. Automation & Scripting: Custom scripts using Python, Bash, PowerShell, Rust, GitHub Actions
6. AI & Machine Learning: ML models using Python, TensorFlow, PyTorch, OpenAI, LangChain, Pandas
7. PC Building & Repair: Custom PC builds using Intel/AMD CPUs, NVIDIA/AMD GPUs, SSDs/NVMe, Custom Cooling
8. Networking Solutions: Network infrastructure using Cisco, MikroTik, Ubiquiti, pfSense, VLANs, Firewalls
9. Embedded Systems: IoT devices using Raspberry Pi, Arduino, ESP32, C/C++, Python, MQTT
10. System Administration: Server management using Arch Linux, Ubuntu, Windows Server, Docker, Proxmox, Nginx
---`

    const systemPrompt = `${aboutSummary}\n\n${aboutInfo}\n\n${servicesInfo}\n\n${githubStats}\n\nPROJECT PORTFOLIO:\n${projectsInfo}`

    console.log('api/chat incoming messages:', messages?.length)

    // Enable streaming SDK attempts by setting ENABLE_GEMINI_SDK=1 in your .env.local.
    const useSdk = process.env.ENABLE_GEMINI_SDK === '1'

    if (!useSdk) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1/models/text-bison-001:generate?key=${apiKey}`
        const payload = {
          prompt: { text: `${systemPrompt}\n\nUser: ${messages.map((m:any)=>m.content).join('\n')}` },
          temperature: 0.2,
          max_output_tokens: 512,
        }
        const r = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!r.ok) {
          const details = await r.text().catch(()=>null)
          console.error('REST generate error', r.status, details)
          return NextResponse.json({ error: 'Model error (REST)', details }, { status: 502 })
        }
        const j = await r.json()
        const text = j?.candidates?.[0]?.output ?? j?.output?.[0]?.content ?? ''
        return new Response(text, { status: 200, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
      } catch (restErr:any) {
        console.error('REST call failed', restErr)
        return NextResponse.json({ error: String(restErr?.message || restErr) }, { status: 500 })
      }
    }

    // If SDK streaming is explicitly enabled, attempt it.
    try {
      // Prefer the latest Gemini models with best performance/cost ratio
      // Include low-usage Gemma models for quota conservation
      const modelCandidates = [
        // "gemini-2.5-flash",      // Primary: Latest fast model (1M input, 65K output)
        // "gemini-flash-latest",   // Fallback: Always latest flash model
        // "gemini-2.0-flash",      // Fallback: Stable 2.0 flash
        // "gemini-2.5-pro",        // More capable but slower
        // "gemma-3-4b-it",         // Low usage: 32K input, 8K output
        "gemma-3-1b-it"          // Lowest usage Gemma model
      ]
      let lastErr: any = null

      for (const m of modelCandidates) {
        try {
          const result = await streamText({
            model: google(m),
            system: systemPrompt,
            messages,
          })
          console.log('streamText started with model', m, 'type', typeof result, 'keys:', Object.keys(result || {}))

          // Use the correct streaming method for text responses
          if (result && typeof (result as any).toTextStreamResponse === "function") {
            return (result as any).toTextStreamResponse()
          }

          // Fallback: if toTextStreamResponse doesn't exist, try toDataStreamResponse
          if (result && typeof (result as any).toDataStreamResponse === "function") {
            return (result as any).toDataStreamResponse()
          }

          // Last resort: iterate over textStream if available
          if (result && (result as any).textStream && Symbol.asyncIterator in (result as any).textStream) {
            const encoder = new TextEncoder()
            const stream = new ReadableStream({
              async start(controller) {
                try {
                  for await (const chunk of (result as any).textStream) {
                    if (typeof chunk === 'string') {
                      controller.enqueue(encoder.encode(chunk))
                    } else if (chunk && typeof chunk === 'object') {
                      const text = chunk?.text ?? chunk?.content ?? String(chunk)
                      controller.enqueue(encoder.encode(text))
                    }
                  }
                } catch (err) {
                  console.error('error while iterating textStream', err)
                } finally {
                  controller.close()
                }
              },
            })
            return new Response(stream, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
          }

          if (result && typeof result === 'object') {
            const maybeText = (result as any)?.text ?? (result as any)?.output ?? JSON.stringify(result)
            return new Response(String(maybeText), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
          }

          // If no usable format, continue to next model
        } catch (err: any) {
          console.error('streamText failed for model', m, err?.message || err)
          lastErr = err
          // try next model
        }
      }

      console.error('all streaming models failed, last error:', lastErr)
      return NextResponse.json({ error: 'No streaming model available', details: String(lastErr?.message || lastErr) }, { status: 502 })
    } catch (err: any) {
      console.error('unexpected error in streaming logic', err)
      return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
    }
  } catch (err: any) {
    console.error('api/chat top-level error', err)
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}
