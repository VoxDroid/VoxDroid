import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, BookOpen, UserCheck, Coffee } from "lucide-react"
import SectionHeader from "@/components/section-header"

// Journey timeline data
const journeyItems = [
  {
    id: 1,
    title: "Getting Started",
    period: "2015 - 2016",
    description:
      "My interest in computer related things sparked in 2015, and I started learning LUA, BATCH scripts, and SHELL scripts.",
  },
  {
    id: 2,
    title: "Expanding Skills",
    period: "2017 - 2020",
    description:
      "I began learning desktop software and web development. I also started learning android development and machine learning.",
  },
  {
    id: 3,
    title: "Personal Growth",
    period: "2021 - 2023",
    description:
      "Worked on several personal side projects, refining my skills in system architecture, AI/ML, and application development. ",
  },
  {
    id: 4,
    title: "Present & Future",
    period: "2024 - Present",
    description:
      "Currently focused on advanced technologies like Next.js, TypeScript, Rust Programming Language, and exploring new frontiers in web development and Data Science.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <SectionHeader title="About Me" subtitle="Get to know more about me and my journey" centered />

        {/* Personal Info */}
        <div className="flex flex-col lg:flex-row gap-12 mb-16 items-center">
          <div className="lg:w-2/5 animate-fadeIn">
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden gradient-border shadow-custom-dark">
              <Image
                src="/profile/VoxDroid.jpg"
                alt="VoxDroid"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          <div className="lg:w-3/5 animate-slideUp">
            <h3 className="text-2xl font-bold mb-4">Who is VoxDroid?</h3>
            <p className="text-accent-dark dark:text-accent-light mb-4">
              I'm a developer who enjoys solving tough problems with my keyboard.
            </p>
            <p className="text-accent-dark dark:text-accent-light mb-6">
              When I'm not working on code, I like playing games, reading books, and learning new things.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <UserCheck className="h-5 w-5 text-primary dark:text-primary-light" />
                <span>Full Stack Developer</span>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-primary dark:text-primary-light" />
                <span>Continuous Learner</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-primary dark:text-primary-light" />
                <span>Problem Solver</span>
              </div>
              <div className="flex items-center gap-3">
                <Coffee className="h-5 w-5 text-primary dark:text-primary-light" />
                <span>Coffee Enthusiast</span>
              </div>
            </div>

            <Link
              href="/contact"
              className="px-6 py-3 bg-primary dark:bg-primary-light text-white rounded-md shadow-custom-dark transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg inline-flex items-center"
            >
              Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-12 text-center">My Journey</h3>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-primary-light to-primary/30 rounded-full"></div>

            {journeyItems.map((item, index) => (
              <div
                key={item.id}
                className={`flex flex-col md:flex-row items-center mb-16 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Circle */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary-light text-white flex items-center justify-center text-xl font-bold shadow-lg z-10 border-4 border-white dark:border-background-dark">
                    {item.id}
                  </div>
                </div>

                {/* Content Box */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-xl shadow-custom dark:shadow-custom-dark p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-xl">
                    <div className="font-bold text-xl mb-1 text-primary dark:text-primary-light">{item.title}</div>
                    <div className="text-sm text-accent-dark dark:text-accent-light mb-3 font-medium">
                      {item.period}
                    </div>
                    <p className="text-accent-dark dark:text-accent-light">{item.description}</p>
                  </div>
                </div>

                {/* Empty space for the other side */}
                <div className="w-full md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Interests Section */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">My Interests</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {["Open Source", "UI/UX Design", "Web Performance", "Modern Frameworks", "AI/ML", "DevOps", "Software Development", "Desktop Applications", "Operating Systems", "Linux", "Computer Hardware"].map(
              (interest, index) => (
                <div
                  key={interest}
                  className="p-6 bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark text-center transition-all duration-500 hover:translate-y-[-10px] hover:shadow-xl"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="text-xl font-bold mb-2">{interest}</div>
                  <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary-light mx-auto"></div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

