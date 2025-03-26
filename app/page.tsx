import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowDown, Github, Code, Cpu, Monitor, ExternalLink, Quote } from "lucide-react"
import TypingAnimation from "@/components/typing-animation"

const featuredProjects = [
  {
    id: 1,
    title: "Zylthra",
    description: "A PyQt6 app to generate synthetic datasets with DataLLM.",
    image: "/project_images/zylthra.png",
    tags: ["Python", "PyQt6", "DataLLM", "Dataset Generator"],
    github: "https://github.com/VoxDroid",
    demo: "https://github.com/VoxDroid/Zylthra",
    slug: "project-13",
  },
  {
    id: 2,
    title: "Clarisse Portfolio",
    description: "A modern, customizable, and responsive portfolio template built with Next.js and TypeScript.",
    image: "/project_images/Clarisse.png",
    tags: ["Next.js", "Node.js", "React", "Portfolio"],
    github: "https://github.com/VoxDroid/Clarisse-Portfolio",
    demo: "https://clarisse-portfolio.vercel.app/",
    slug: "Clarisse-Portfolio",
  },
  {
    id: 3,
    title: "Java Quiz App",
    description: "A Java desktop application built with JavaFX in IntelliJ IDEA.",
    image: "/project_images/JavaQuiz.png",
    tags: ["Java", "JavaFX", "IntelliJ", "Quiz App"],
    github: "https://github.com/VoxDroid",
    demo: "https://github.com/VoxDroid/Java-Quiz-App?tab=readme-ov-file",
    slug: "project-3",
  },
]

// Typing animation sentences
const typingPhrases = [
  "Bow to my profile.",
  "I am your king.",
  "Kneel before the God of Developers."
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <Head>
        <link rel="icon" href="/ico/vox.ico" />
      </Head>
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Hi, I'm <span className="gradient-text dark:gradient-text-light">VoxDroid</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-accent-dark dark:text-accent-light h-[3rem]">
              <TypingAnimation text={typingPhrases} speed={50} delay={1000} loop={true} />
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="px-6 py-3 bg-primary dark:bg-primary-light text-white rounded-md shadow-custom-dark transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg inline-flex items-center"
              >
                View My Work <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border border-primary dark:border-primary-light text-primary dark:text-primary-light rounded-md transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg inline-flex items-center"
              >
                Get In Touch
              </Link>
              <a
                href="/cv/VoxDroid_CV.pdf"
                className="px-6 py-3 bg-accent/10 dark:bg-accent-dark/20 text-accent-dark dark:text-accent-light rounded-md transition-all duration-300 hover:translate-y-[-5px] hover:bg-accent/20 dark:hover:bg-accent-dark/30 inline-flex items-center border border-accent/20 dark:border-accent/10"
                download
              >
                Download CV <ArrowDown className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center animate-fadeIn">
            <div className="relative w-64 h-64 md:w-80 md:h-80 animate-floatUp">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light rounded-full opacity-20 blur-xl"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-custom-dark">
                <Image
                  src="/profile/VoxDroid.jpg"
                  alt="VoxDroid"
                  width={320}
                  height={320}
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-accent/5 dark:bg-accent-dark/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text dark:gradient-text-light inline-block">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white/90 dark:bg-accent-dark/90 backdrop-blur-sm rounded-xl shadow-xl transition-all duration-500 hover:translate-y-[-10px] hover:shadow-2xl flex flex-col h-full glow-effect glow-blue"
              >
                {/* Project Image */}
                <div className="h-48 relative overflow-hidden rounded-t-xl">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content Container */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <div className="flex space-x-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary dark:text-primary-light hover:scale-110 transition-transform"
                        aria-label={`View ${project.title} source code`}
                      >
                        <Github className="h-5 w-5" />
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary dark:text-primary-light hover:scale-110 transition-transform"
                        aria-label={`View ${project.title} demo`}
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                  </div>

                  <p className="text-accent-dark dark:text-accent-light mb-4 flex-grow">{project.description}</p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center text-primary dark:text-primary-light font-medium hover:underline"
                    >
                      View Details <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="px-6 py-3 bg-primary dark:bg-primary-light text-white rounded-md shadow-custom-dark transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg inline-flex items-center"
            >
              See All Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Overview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text dark:gradient-text-light inline-block">
            My Expertise
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark text-center transition-all duration-500 hover:translate-y-[-10px] hover:shadow-xl">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 dark:bg-primary-light/10 rounded-full flex items-center justify-center">
                <Code className="h-8 w-8 text-primary dark:text-primary-light" />
              </div>
              <h3 className="text-xl font-bold mb-2">Machine Learning</h3>
              <p className="text-accent-dark dark:text-accent-light">
                Designing and implementing machine learning models for data analysis, prediction, and automation using Python.
              </p>
            </div>

            <div
              className="p-6 bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark text-center transition-all duration-500 hover:translate-y-[-10px] hover:shadow-xl"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 dark:bg-primary-light/10 rounded-full flex items-center justify-center">
                <Monitor className="h-8 w-8 text-primary dark:text-primary-light" />
              </div>
              <h3 className="text-xl font-bold mb-2">Desktop Applications</h3>
              <p className="text-accent-dark dark:text-accent-light">
                Building cross-platform desktop applications with Python, focusing on functionality and user-friendly interfaces.
              </p>
            </div>

            <div
              className="p-6 bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark text-center transition-all duration-500 hover:translate-y-[-10px] hover:shadow-xl"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 dark:bg-primary-light/10 rounded-full flex items-center justify-center">
                <Cpu className="h-8 w-8 text-primary dark:text-primary-light" />
              </div>
              <h3 className="text-xl font-bold mb-2">Software Development</h3>
              <p className="text-accent-dark dark:text-accent-light">
                Crafting efficient, scalable software solutions with a focus on clean Python code and robust architectures.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/skills"
              className="px-6 py-3 border border-primary dark:border-primary-light text-primary dark:text-primary-light rounded-md transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg inline-flex items-center"
            >
              Explore My Skills <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-light to-primary opacity-90 dark:opacity-80"></div>
        <div className="absolute inset-0 bg-[url('/profile/VoxDroid.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Interested in working together?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
          <Link
            href="/contact"
            className="px-8 py-4 bg-white/90 hover:bg-white text-gray-800 font-semibold border-2 border-white rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl inline-flex items-center"
          >
            Let's Talk <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Latest Blog Posts Section */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text dark:gradient-text-light inline-block">
            Latest Articles
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "VoxDroid's Blog",
                excerpt: "Placeholder",
                date: "March 15, 2025",
                image: "/placeholder.svg?height=200&width=400&text=Web+Development",
                slug: "future",
              },
            ].map((post, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark overflow-hidden transition-all duration-500 hover:translate-y-[-10px] hover:shadow-xl flex flex-col h-full"
              >
                <div className="h-40 relative">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="text-sm text-accent-dark dark:text-accent-light mb-2">{post.date}</div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-accent-dark dark:text-accent-light mb-4 flex-grow">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary dark:text-primary-light font-medium hover:underline mt-auto"
                  >
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="px-6 py-3 border border-primary dark:border-primary-light text-primary dark:text-primary-light rounded-md transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg inline-flex items-center"
            >
              View All Articles <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section> */}

      {/* Testimonials Preview */}
      {/* <section className="py-16 bg-accent/5 dark:bg-accent-dark/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text dark:gradient-text-light inline-block">
            What Clients Say
          </h2>

          <div className="max-w-4xl mx-auto bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark p-8 md:p-12 relative">
            <div className="absolute top-8 left-8 text-primary/20 dark:text-primary-light/20">
              <Quote className="h-16 w-16" />
            </div>

            <div className="relative z-10">
              <p className="text-lg md:text-xl italic mb-8 text-accent-dark dark:text-accent-light">
                "Their word..."
              </p>

              <div className="flex items-center">
                <div className="mr-4 rounded-full overflow-hidden w-16 h-16 border-2 border-primary/20 dark:border-primary-light/20">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Alex Johnson"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg">VoxDroid</h4>
                  <p className="text-accent-dark dark:text-accent-light">CTO, TechStart</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/testimonials"
              className="px-6 py-3 border border-primary dark:border-primary-light text-primary dark:text-primary-light rounded-md transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg inline-flex items-center"
            >
              View All Testimonials <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  )
}

