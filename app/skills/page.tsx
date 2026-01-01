"use client"

import { useState } from "react"
import {
  Code,
  Server,
  Layout,
  Database,
  Star,
  PenToolIcon as Tool,
  Brain,
  Cpu,
  BarChart,
  Terminal,
  Monitor,
} from "lucide-react"
import SectionHeader from "@/components/section-header"
import { motion } from "framer-motion"
import { Cloud, Workflow, GitBranch, Book, Award, Lightbulb, SmartphoneIcon as MobileIcon } from "lucide-react"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 20,
    },
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

type SkillCategory =
  | "frontend"
  | "backend"
  | "design"
  | "database"
  | "tools"
  | "soft"
  | "ml"
  | "desktop"
  | "languages"
  | "methodologies"
  | "cloud"
  | "mobile"

interface Skill {
  name: string
  proficiency: number
  category: SkillCategory
}

const skills: Skill[] = [
  // Frontend
  { name: "HTML5 & CSS3", proficiency: 95, category: "frontend" },
  { name: "JavaScript (ES6+)", proficiency: 90, category: "frontend" },
  { name: "React.js", proficiency: 92, category: "frontend" },
  { name: "Next.js", proficiency: 88, category: "frontend" },
  { name: "Tailwind CSS", proficiency: 90, category: "frontend" },
  { name: "Redux", proficiency: 82, category: "frontend" },
  { name: "GraphQL (Client)", proficiency: 78, category: "frontend" },

  // Backend
  { name: "Node.js", proficiency: 85, category: "backend" },
  { name: "Express.js", proficiency: 88, category: "backend" },
  { name: "REST API Design", proficiency: 90, category: "backend" },
  { name: "GraphQL (Server)", proficiency: 80, category: "backend" },
  { name: "Authentication & Security", proficiency: 82, category: "backend" },
  { name: "Microservices", proficiency: 78, category: "backend" },
  { name: "API Gateway", proficiency: 75, category: "backend" },
  { name: "Serverless Architecture", proficiency: 80, category: "backend" },

  // Database
  { name: "MongoDB", proficiency: 85, category: "database" },
  { name: "PostgreSQL", proficiency: 80, category: "database" },
  { name: "Firebase", proficiency: 88, category: "database" },
  { name: "Redis", proficiency: 75, category: "database" },
  { name: "SQLite", proficiency: 85, category: "database" },
  { name: "MySQL", proficiency: 82, category: "database" },
  { name: "Database Design", proficiency: 88, category: "database" },
  { name: "ORM (Sequelize, Mongoose)", proficiency: 85, category: "database" },

  // Design
  { name: "UI/UX Principles", proficiency: 88, category: "design" },
  { name: "Responsive Design", proficiency: 92, category: "design" },
  { name: "Figma", proficiency: 85, category: "design" },
  { name: "CSS Animations", proficiency: 82, category: "design" },

  // Tools
  { name: "Git & GitHub", proficiency: 90, category: "tools" },
  { name: "Docker", proficiency: 78, category: "tools" },
  { name: "Webpack", proficiency: 82, category: "tools" },
  { name: "VS Code", proficiency: 95, category: "tools" },
  { name: "CI/CD", proficiency: 80, category: "tools" },
  { name: "Jupyter Notebooks", proficiency: 90, category: "tools" },
  { name: "PyCharm", proficiency: 88, category: "tools" },
  { name: "Anaconda", proficiency: 85, category: "tools" },
  { name: "Google Colab", proficiency: 92, category: "tools" },
  { name: "Postman", proficiency: 88, category: "tools" },

  // Soft Skills
  { name: "Problem Solving", proficiency: 92, category: "soft" },
  { name: "Team Collaboration", proficiency: 90, category: "soft" },
  { name: "Communication", proficiency: 88, category: "soft" },
  { name: "Adaptability", proficiency: 92, category: "soft" },
  { name: "Time Management", proficiency: 85, category: "soft" },
  { name: "Critical Thinking", proficiency: 90, category: "soft" },
  { name: "Research Skills", proficiency: 88, category: "soft" },
  { name: "Project Management", proficiency: 85, category: "soft" },

  // Machine Learning / AI
  { name: "Python for ML/AI", proficiency: 92, category: "ml" },
  { name: "TensorFlow", proficiency: 85, category: "ml" },
  { name: "PyTorch", proficiency: 82, category: "ml" },
  { name: "Scikit-learn", proficiency: 88, category: "ml" },
  { name: "Keras", proficiency: 84, category: "ml" },
  { name: "Natural Language Processing", proficiency: 80, category: "ml" },
  { name: "Computer Vision", proficiency: 78, category: "ml" },
  { name: "Deep Learning", proficiency: 82, category: "ml" },
  { name: "Machine Learning Algorithms", proficiency: 86, category: "ml" },
  { name: "Data Preprocessing", proficiency: 90, category: "ml" },
  { name: "Feature Engineering", proficiency: 85, category: "ml" },
  { name: "Model Deployment", proficiency: 80, category: "ml" },
  { name: "Hugging Face Transformers", proficiency: 78, category: "ml" },
  { name: "NLTK", proficiency: 82, category: "ml" },
  { name: "spaCy", proficiency: 80, category: "ml" },
  { name: "OpenCV", proficiency: 75, category: "ml" },

  // Desktop Application Development
  { name: "PyQt", proficiency: 90, category: "desktop" },
  { name: "Qt Designer", proficiency: 88, category: "desktop" },
  { name: "Tkinter", proficiency: 85, category: "desktop" },
  { name: "Electron.js", proficiency: 78, category: "desktop" },
  { name: "WinForms (.NET)", proficiency: 75, category: "desktop" },
  { name: "JavaFX", proficiency: 80, category: "desktop" },
  { name: "Cross-platform Development", proficiency: 85, category: "desktop" },
  { name: "Desktop UI/UX", proficiency: 82, category: "desktop" },
  { name: "Application Packaging", proficiency: 80, category: "desktop" },
  { name: "Multithreading", proficiency: 85, category: "desktop" },

  // Programming Languages
  { name: "Python", proficiency: 95, category: "languages" },
  { name: "JavaScript", proficiency: 90, category: "languages" },
  { name: "TypeScript", proficiency: 85, category: "languages" },
  { name: "Java", proficiency: 82, category: "languages" },
  { name: "C#", proficiency: 78, category: "languages" },
  { name: "C++", proficiency: 75, category: "languages" },
  { name: "SQL", proficiency: 88, category: "languages" },
  { name: "Bash/Shell", proficiency: 80, category: "languages" },
  { name: "R", proficiency: 75, category: "languages" },
  { name: "Go/Golang", proficiency: 78, category: "languages" },
  { name: "Rust", proficiency: 70, category: "languages" },
  { name: "PHP", proficiency: 75, category: "languages" },
  { name: "Ruby", proficiency: 72, category: "languages" },
  { name: "Swift", proficiency: 68, category: "languages" },
  { name: "Kotlin", proficiency: 72, category: "languages" },
  { name: "Dart", proficiency: 65, category: "languages" },
  { name: "Scala", proficiency: 58, category: "languages" },
  { name: "Haskell", proficiency: 55, category: "languages" },
  { name: "MATLAB", proficiency: 80, category: "languages" },
  { name: "Assembly", proficiency: 60, category: "languages" },
  { name: "Lua", proficiency: 75, category: "languages" },
  { name: "Perl", proficiency: 62, category: "languages" },

  // Add cloud skills
  { name: "AWS", proficiency: 82, category: "cloud" },
  { name: "Azure", proficiency: 78, category: "cloud" },
  { name: "Google Cloud Platform", proficiency: 75, category: "cloud" },
  { name: "Serverless", proficiency: 85, category: "cloud" },
  { name: "Kubernetes", proficiency: 80, category: "cloud" },
  { name: "Docker Swarm", proficiency: 76, category: "cloud" },
  { name: "Terraform", proficiency: 72, category: "cloud" },
  { name: "CloudFormation", proficiency: 68, category: "cloud" },
  { name: "CI/CD Pipelines", proficiency: 85, category: "cloud" },

  // Add methodologies
  { name: "Agile/Scrum", proficiency: 90, category: "methodologies" },
  { name: "Test-Driven Development", proficiency: 85, category: "methodologies" },
  { name: "DevOps", proficiency: 82, category: "methodologies" },
  { name: "Clean Code", proficiency: 88, category: "methodologies" },
  { name: "Design Patterns", proficiency: 85, category: "methodologies" },
  { name: "Object-Oriented Programming", proficiency: 92, category: "methodologies" },
  { name: "Functional Programming", proficiency: 80, category: "methodologies" },
  { name: "Microservices Architecture", proficiency: 83, category: "methodologies" },
  { name: "Monolithic Architecture", proficiency: 86, category: "methodologies" },
  { name: "RESTful API Design", proficiency: 90, category: "methodologies" },
  { name: "GraphQL API Design", proficiency: 82, category: "methodologies" },

  // Add mobile development skills
  { name: "React Native", proficiency: 85, category: "mobile" },
  { name: "Flutter", proficiency: 78, category: "mobile" },
  { name: "iOS Development", proficiency: 70, category: "mobile" },
  { name: "Android Development", proficiency: 72, category: "mobile" },
  { name: "Mobile UI/UX", proficiency: 85, category: "mobile" },
  { name: "App Store Optimization", proficiency: 75, category: "mobile" },
  { name: "Mobile Testing", proficiency: 80, category: "mobile" },
  { name: "Progressive Web Apps", proficiency: 88, category: "mobile" },
]

const categories = [
  { id: "all", label: "All Skills", icon: Star },
  { id: "frontend", label: "Frontend", icon: Code },
  { id: "backend", label: "Backend", icon: Server },
  { id: "database", label: "Database", icon: Database },
  { id: "ml", label: "Machine Learning/AI", icon: Brain },
  { id: "desktop", label: "Desktop Apps", icon: Monitor },
  { id: "languages", label: "Languages", icon: Terminal },
  { id: "design", label: "Design", icon: Layout },
  { id: "tools", label: "Tools", icon: Tool },
  { id: "soft", label: "Soft Skills", icon: Star },
  { id: "cloud", label: "Cloud & DevOps", icon: Server },
  { id: "methodologies", label: "Methodologies", icon: BarChart },
  { id: "mobile", label: "Mobile Development", icon: MobileIcon },
]

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredSkills = activeCategory === "all" ? skills : skills.filter((skill) => skill.category === activeCategory)

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 260, damping: 20, delay: 0.1 }}
        >
          <SectionHeader
            title="My Skills"
            subtitle="A comprehensive overview of my technical expertise and capabilities"
            centered
          />
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 260, damping: 20, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors duration-300 button-hover ${
                  activeCategory === category.id
                    ? "bg-primary dark:bg-primary-light text-white"
                    : "bg-accent/10 dark:bg-accent-dark/20 text-accent-dark dark:text-accent-light hover:bg-primary/20 dark:hover:bg-primary-light/20"
                }`}
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </button>
            )
          })}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.03, duration: 0.2 }}
              className="p-4 bg-white dark:bg-accent-dark/20 rounded-lg shadow-custom dark:shadow-custom-dark"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{skill.name}</h3>
                <span className="text-sm font-medium">{skill.proficiency}%</span>
              </div>
              <div className="h-2 bg-accent/10 dark:bg-accent/30 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.proficiency}%` }}
                  transition={{ delay: 0.3 + index * 0.03, duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill Expertise Areas */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-white dark:bg-accent-dark/20 rounded-lg shadow-custom dark:shadow-custom-dark"
          >
            <Brain className="h-8 w-8 mb-4 text-primary dark:text-primary-light" />
            <h3 className="text-xl font-bold mb-2">Machine Learning & AI</h3>
            <p className="text-accent-dark dark:text-accent-light">
              Developing machine learning models and AI solutions using Python, TensorFlow, PyTorch, and other modern
              frameworks for data analysis, prediction, and automation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="p-6 bg-white dark:bg-accent-dark/20 rounded-lg shadow-custom dark:shadow-custom-dark"
          >
            <Monitor className="h-8 w-8 mb-4 text-primary dark:text-primary-light" />
            <h3 className="text-xl font-bold mb-2">Desktop Applications</h3>
            <p className="text-accent-dark dark:text-accent-light">
              Building cross-platform desktop applications with PyQt, Tkinter, and Electron, focusing on functionality,
              performance, and user-friendly interfaces.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="p-6 bg-white dark:bg-accent-dark/20 rounded-lg shadow-custom dark:shadow-custom-dark"
          >
            <Cpu className="h-8 w-8 mb-4 text-primary dark:text-primary-light" />
            <h3 className="text-xl font-bold mb-2">Software Development</h3>
            <p className="text-accent-dark dark:text-accent-light">
              Crafting efficient, scalable software solutions with a focus on clean code, robust architectures, and
              modern development practices across multiple languages and platforms.
            </p>
          </motion.div>
        </div>

        {/* Cloud & DevOps Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 p-8 bg-white dark:bg-accent-dark/20 rounded-lg shadow-custom dark:shadow-custom-dark"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Cloud className="h-7 w-7 mr-3 text-primary dark:text-primary-light" />
            Cloud & DevOps Expertise
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col space-y-4">
              <div className="flex items-start gap-3">
                <Server className="h-6 w-6 text-primary dark:text-primary-light mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Cloud Infrastructure</h4>
                  <p className="text-accent-dark dark:text-accent-light">
                    Experience with AWS, Azure, and Google Cloud Platform for deploying scalable and resilient
                    applications.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GitBranch className="h-6 w-6 text-primary dark:text-primary-light mt-1" />
                <div>
                  <h4 className="font-bold text-lg">CI/CD Pipelines</h4>
                  <p className="text-accent-dark dark:text-accent-light">
                    Building automated workflows for continuous integration and deployment using GitHub Actions,
                    Jenkins, and GitLab CI.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-start gap-3">
                <Workflow className="h-6 w-6 text-primary dark:text-primary-light mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Container Orchestration</h4>
                  <p className="text-accent-dark dark:text-accent-light">
                    Managing containerized applications with Kubernetes and Docker Swarm for optimal performance and
                    scalability.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Terminal className="h-6 w-6 text-primary dark:text-primary-light mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Infrastructure as Code</h4>
                  <p className="text-accent-dark dark:text-accent-light">
                    Using Terraform and CloudFormation to define and provision infrastructure in a consistent and
                    repeatable way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Data Science Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 p-8 bg-white dark:bg-accent-dark/20 rounded-lg shadow-custom dark:shadow-custom-dark"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <BarChart className="h-7 w-7 mr-3 text-primary dark:text-primary-light" />
            Data Science Expertise
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col space-y-4">
              <div className="flex items-start gap-3">
                <BarChart className="h-6 w-6 text-primary dark:text-primary-light mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Data Analysis & Visualization</h4>
                  <p className="text-accent-dark dark:text-accent-light">
                    Proficient in analyzing complex datasets and creating insightful visualizations using Pandas, NumPy,
                    Matplotlib, and Seaborn.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Brain className="h-6 w-6 text-primary dark:text-primary-light mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Natural Language Processing</h4>
                  <p className="text-accent-dark dark:text-accent-light">
                    Experience in text analysis, sentiment analysis, and language modeling using NLTK, spaCy, and
                    Hugging Face Transformers.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-start gap-3">
                <Cpu className="h-6 w-6 text-primary dark:text-primary-light mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Deep Learning</h4>
                  <p className="text-accent-dark dark:text-accent-light">
                    Building and training neural networks for image recognition, text generation, and predictive
                    modeling using TensorFlow and PyTorch.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Database className="h-6 w-6 text-primary dark:text-primary-light mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Big Data Processing</h4>
                  <p className="text-accent-dark dark:text-accent-light">
                    Working with large datasets using tools like Pandas, Dask, and SQL for efficient data processing and
                    analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Development Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 p-8 bg-white dark:bg-accent-dark/20 rounded-lg shadow-custom dark:shadow-custom-dark"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <MobileIcon className="h-7 w-7 mr-3 text-primary dark:text-primary-light" />
            Mobile Development
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col space-y-4">
              <div className="flex items-start gap-3">
                <Code className="h-6 w-6 text-primary dark:text-primary-light mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Cross-Platform Development</h4>
                  <p className="text-accent-dark dark:text-accent-light">
                    Building mobile applications for iOS and Android using React Native and Flutter to maximize code
                    reuse and efficiency.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Layout className="h-6 w-6 text-primary dark:text-primary-light mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Mobile UI/UX Design</h4>
                  <p className="text-accent-dark dark:text-accent-light">
                    Creating intuitive and engaging mobile interfaces that follow platform guidelines while providing a
                    distinctive user experience.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-start gap-3">
                <MobileIcon className="h-6 w-6 text-primary dark:text-primary-light mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Native Development</h4>
                  <p className="text-accent-dark dark:text-accent-light">
                    Experience with Swift for iOS and Kotlin for Android to build high-performance native applications
                    when required.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Cpu className="h-6 w-6 text-primary dark:text-primary-light mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Progressive Web Apps</h4>
                  <p className="text-accent-dark dark:text-accent-light">
                    Developing PWAs that combine the best of web and mobile apps, providing offline functionality and
                    app-like experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Software Development Methodologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 p-8 bg-white dark:bg-accent-dark/20 rounded-lg shadow-custom dark:shadow-custom-dark"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <Workflow className="h-7 w-7 mr-3 text-primary dark:text-primary-light" />
            Development Methodologies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Agile/Scrum", icon: Workflow },
              { name: "Test-Driven Development", icon: Code },
              { name: "DevOps", icon: Server },
              { name: "Clean Code", icon: Code },
              { name: "Design Patterns", icon: Layout },
              { name: "Object-Oriented Programming", icon: Code },
              { name: "Functional Programming", icon: Code },
              { name: "Microservices Architecture", icon: Server },
            ].map((method, index) => {
              const Icon = method.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                  className="p-4 border border-accent/10 dark:border-accent/20 rounded-lg text-center hover:border-primary/30 dark:hover:border-primary-light/30 transition-colors"
                >
                  <Icon className="h-8 w-8 mx-auto mb-3 text-primary dark:text-primary-light" />
                  <div className="font-semibold">{method.name}</div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Learning Path */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-16 p-8 bg-white dark:bg-accent-dark/20 rounded-lg shadow-custom dark:shadow-custom-dark"
        >
          <h3 className="text-2xl font-bold mb-4 text-center flex items-center justify-center">
            <Lightbulb className="h-7 w-7 mr-3 text-primary dark:text-primary-light" />
            Currently Learning
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Generative AI",
              "Large Language Models",
              "Rust Programming",
              "MLOps",
              "Reinforcement Learning",
              "Computer Vision",
              "Quantum Computing",
              "Edge ML Deployment",
              "Web3 & Blockchain",
              "Serverless Architecture",
              "IoT Development",
              "AR/VR Technologies",
            ].map((item, index) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.05, duration: 0.4 }}
                className="px-4 py-2 bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light rounded-full"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Certifications Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 p-8 bg-white dark:bg-accent-dark/20 rounded-lg shadow-custom dark:shadow-custom-dark"
        >
          <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
            <Award className="h-7 w-7 mr-3 text-primary dark:text-primary-light" />
            Certifications & Education
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Certificate / Education",
                issuer: "Company Name / University",
                date: "2025",
                description: "Description of the Certificate or Education.",
              },
              {
                title: "Certificate / Education",
                issuer: "Company Name / University",
                date: "2025",
                description: "Description of the Certificate or Education.",
              },
              {
                title: "Certificate / Education",
                issuer: "Company Name / University",
                date: "2025",
                description: "Description of the Certificate or Education.",
              },
              {
                title: "Certificate / Education",
                issuer: "Company Name / University",
                date: "2025",
                description: "Description of the Certificate or Education.",
              },
              {
                title: "Certificate / Education",
                issuer: "Company Name / University",
                date: "2025",
                description: "Description of the Certificate or Education.",
              },
              {
                title: "Certificate / Education",
                issuer: "Company Name / University",
                date: "2025",
                description: "Description of the Certificate or Education.",
              },
              {
                title: "Certificate / Education",
                issuer: "Company Name / University",
                date: "2025",
                description: "Description of the Certificate or Education.",
              },
              {
                title: "Certificate / Education",
                issuer: "Company Name / University",
                date: "2025",
                description: "Description of the Certificate or Education.",
              },
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                className="p-4 border border-accent/10 dark:border-accent/20 rounded-lg hover:border-primary/30 dark:hover:border-primary-light/30 transition-colors"
              >
                <h4 className="font-bold text-lg text-primary dark:text-primary-light">{cert.title}</h4>
                <div className="flex justify-between text-sm mb-2">
                  <span>{cert.issuer}</span>
                  <span>{cert.date}</span>
                </div>
                <p className="text-accent-dark dark:text-accent-light text-sm">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring" as const, stiffness: 260, damping: 20 }}
          className="mt-16 p-8 bg-white dark:bg-accent-dark/20 rounded-lg shadow-custom dark:shadow-custom-dark"
        >
          <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
            <Book className="h-7 w-7 mr-3 text-primary dark:text-primary-light" />
            Education
          </h3>
          <div className="space-y-6">
            {[
              {
                degree: "Doctor of Philosophy in Computer Science",
                institution: "Harvard University",
                date: "2025 - 2025",
                description:
                  "Description of the Educations",
              },
              {
                degree: "Master of Science in Computer Science",
                institution: "Harvard University",
                date: "2025 - 2025",
                description:
                  "Description of the Educations",
              },
              {
                degree: "Bachelor of Science in Computer Science",
                institution: "Massachusetts Institute of Technology",
                date: "2025 - 2025",
                description:
                  "Description of the Education",
              },
            ].map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 border-l-4 border-primary dark:border-primary-light bg-white/50 dark:bg-accent-dark/30 rounded-r-lg"
              >
                <h4 className="font-bold text-xl text-primary dark:text-primary-light">{edu.degree}</h4>
                <div className="flex justify-between text-sm mb-2 mt-1">
                  <span className="font-medium text-base">{edu.institution}</span>
                  <span>{edu.date}</span>
                </div>
                <p className="text-accent-dark dark:text-accent-light">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Development */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring" as const, stiffness: 260, damping: 20 }}
          className="mt-16 p-8 bg-white dark:bg-accent-dark/20 rounded-lg shadow-custom dark:shadow-custom-dark"
        >
          <h3 className="text-2xl font-bold mb-6">Professional Development</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Open Source Contributions",
                description:
                  "Active contributor to various open-source projects on GitHub, focusing on Python libraries.",
              },
              {
                title: "Hackathons",
                description: "Participated and won awards in various hackathons focused on AI and web technologies.",
              },
              {
                title: "Hackathons",
                description: "Participated and won awards in various hackathons focused on AI and web technologies.",
              },
              {
                title: "Hackathons",
                description: "Participated and won awards in various hackathons focused on AI and web technologies.",
              },
              {
                title: "Hackathons",
                description: "Participated and won awards in various hackathons focused on AI and web technologies.",
              },
              {
                title: "Hackathons",
                description: "Participated and won awards in various hackathons focused on AI and web technologies.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white/50 dark:bg-accent-dark/30 rounded-lg"
              >
                <h4 className="font-bold mb-2 text-primary dark:text-primary-light">{item.title}</h4>
                <p className="text-accent-dark dark:text-accent-light text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

