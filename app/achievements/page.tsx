"use client"

import { motion } from "framer-motion"
import { Award, Calendar, Trophy, Star, BadgeIcon as Certificate, BookOpen } from "lucide-react"
import Image from "next/image"
import SectionHeader from "@/components/section-header"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 20 } },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const achievements = [
  {
    id: 1,
    title: "God of Developers Award",
    organization: "Tech Innovation Summit",
    date: "November 2024",
    description: "Recognized for surpassing human limits in technology development and innovative solutions.",
    icon: Trophy,
    image: "/profile/VoxDroid.jpg",
  },
  {
    id: 2,
    title: "Immortal Contributor",
    organization: "Open Source Community",
    date: "August 2024",
    description: "Recognized as the top contributor to open source projects in the web development ecosystem.",
    icon: Star,
    image: "/profile/VoxDroid.jpg",
  },
  {
    id: 3,
    title: "Supreme Full Stack Certification",
    organization: "Web Technologies Institute",
    date: "June 2024",
    description: "Completed supreme-level certification in full stack development with distinction.",
    icon: Certificate,
    image: "/profile/VoxDroid.jpg",
  },
  {
    id: 4,
    title: "Hackathon Architect",
    organization: "Global CodeFest",
    date: "October 2024",
    description: "First place in a 5,040-hour hackathon for developing an innovative accessibility solution.",
    icon: Award,
    image: "/profile/VoxDroid.jpg",
  },
]

export default function AchievementsPage() {
  return (
    <div className="min-h-screen py-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4"
      >
        <motion.div variants={fadeInUp}>
          <SectionHeader
            title="Achievements"
            subtitle="Recognition and milestones throughout my professional journey"
            centered
          />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-0 md:left-1/2 h-full w-1 bg-gradient-to-b from-primary to-primary-light/30 transform md:translate-x-[-50%]"
            ></motion.div>

            {/* Achievements */}
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon
              const isEven = index % 2 === 0

              return (
                <motion.div variants={fadeInUp} key={achievement.id} className="mb-16 last:mb-0">
                  <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center`}>
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-1/2 w-12 h-12 rounded-full bg-white dark:bg-accent-dark/70 border-4 border-primary dark:border-primary-light flex items-center justify-center transform translate-x-[-50%] z-10 shadow-lg">
                      <Icon className="h-5 w-5 text-primary dark:text-primary-light" />
                    </div>

                    {/* Content box */}
                    <div
                      className={`md:w-[calc(50%-3rem)] ${isEven ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"} pt-12 md:pt-0`}
                    >
                      <div className="bg-white/90 dark:bg-accent-dark/40 backdrop-blur-sm rounded-xl shadow-custom dark:shadow-custom-dark p-6 transform transition-all duration-500 hover:scale-[1.03] hover:shadow-xl">
                        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={achievement.image || "/profile/VoxDroid.jpg"}
                            alt={achievement.title}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-primary dark:text-primary-light">
                          {achievement.title}
                        </h3>
                        <div className="flex items-center text-sm text-accent-dark dark:text-accent-light mb-4">
                          <span className="mr-2">{achievement.organization}</span>
                          <span>•</span>
                          <span className="flex items-center ml-2">
                            <Calendar className="h-3 w-3 mr-1" />
                            {achievement.date}
                          </span>
                        </div>
                        <p className="text-accent-dark dark:text-accent-light">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Stats section */}
        <motion.div
          variants={fadeInUp}
          className="mt-20 bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark p-8"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">By the Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "25+", label: "Projects Completed", icon: Trophy },
              { value: "40+", label: "Satisfied Clients", icon: Star },
              { value: "15+", label: "Awards Received", icon: Award },
              { value: "5+", label: "Years Experience", icon: Calendar },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="p-4 transition-all duration-500 transform hover:scale-110">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 dark:bg-primary-light/10 rounded-full flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary dark:text-primary-light" />
                  </div>
                  <div className="text-3xl font-bold mb-2 gradient-text dark:gradient-text-light">{stat.value}</div>
                  <div className="text-accent-dark dark:text-accent-light">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

