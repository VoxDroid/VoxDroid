"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Monitor, 
  Smartphone, 
  Server, 
  Terminal, 
  Brain, 
  Cpu, 
  Network, 
  CircuitBoard, 
  Settings,
  ChevronDown,
  ChevronRight,
  Mail,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "web-dev",
    title: "Web Development",
    icon: Globe,
    category: "software",
    description: "Modern, responsive websites and web applications built with cutting-edge technologies.",
    features: [
      "Responsive Design (Mobile-First)",
      "Single Page Applications (SPA)",
      "Progressive Web Apps (PWA)",
      "E-commerce Solutions",
      "Content Management Systems",
      "SEO Optimization"
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PHP"]
  },
  {
    id: "desktop-apps",
    title: "Desktop Applications",
    icon: Monitor,
    category: "software",
    description: "Cross-platform desktop applications with native performance and modern interfaces.",
    features: [
      "Cross-Platform Development",
      "Native Performance",
      "System Integration",
      "Offline-First Applications",
      "Custom Business Software",
      "Legacy System Modernization"
    ],
    technologies: ["Rust", "C#", "Python", "Electron", "Tauri", "Qt"]
  },
  {
    id: "mobile-dev",
    title: "Mobile Development",
    icon: Smartphone,
    category: "software",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    features: [
      "iOS & Android Development",
      "Cross-Platform Solutions",
      "App Store Optimization",
      "Push Notifications",
      "Offline Functionality",
      "Payment Integration"
    ],
    technologies: ["Flutter", "Dart", "Swift", "React Native", "Firebase"]
  },
  {
    id: "backend-apis",
    title: "Backend & APIs",
    icon: Server,
    category: "software",
    description: "Scalable backend systems and RESTful/GraphQL APIs for your applications.",
    features: [
      "RESTful API Design",
      "GraphQL Implementation",
      "Database Design & Optimization",
      "Authentication & Authorization",
      "Microservices Architecture",
      "Cloud Deployment"
    ],
    technologies: ["Node.js", "Python", "Rust", "PostgreSQL", "MongoDB", "Docker"]
  },
  {
    id: "automation",
    title: "Automation & Scripting",
    icon: Terminal,
    category: "software",
    description: "Custom scripts and automation tools to streamline your workflows.",
    features: [
      "Task Automation",
      "Data Processing Pipelines",
      "Web Scraping Solutions",
      "CI/CD Pipeline Setup",
      "System Administration Scripts",
      "Batch Processing"
    ],
    technologies: ["Python", "Bash", "PowerShell", "Rust", "GitHub Actions"]
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    icon: Brain,
    category: "software",
    description: "Intelligent solutions powered by machine learning and AI technologies.",
    features: [
      "Custom ML Models",
      "Natural Language Processing",
      "Computer Vision",
      "Chatbot Development",
      "Data Analysis & Visualization",
      "AI Integration"
    ],
    technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI", "LangChain", "Pandas"]
  },
  {
    id: "pc-building",
    title: "PC Building & Repair",
    icon: Cpu,
    category: "hardware",
    description: "Custom PC builds, upgrades, and repairs tailored to your needs.",
    features: [
      "Custom Gaming PCs",
      "Workstation Builds",
      "Server Assembly",
      "Hardware Upgrades",
      "Troubleshooting & Repair",
      "Performance Optimization"
    ],
    technologies: ["Intel/AMD CPUs", "NVIDIA/AMD GPUs", "SSDs/NVMe", "Custom Cooling", "Cable Management"]
  },
  {
    id: "networking",
    title: "Networking Solutions",
    icon: Network,
    category: "hardware",
    description: "Network setup, configuration, and security for homes and businesses.",
    features: [
      "Network Infrastructure Design",
      "Router/Switch Configuration",
      "Wireless Network Setup",
      "VPN Configuration",
      "Network Security",
      "Performance Monitoring"
    ],
    technologies: ["Cisco", "MikroTik", "Ubiquiti", "pfSense", "VLANs", "Firewalls"]
  },
  {
    id: "embedded",
    title: "Embedded Systems",
    icon: CircuitBoard,
    category: "hardware",
    description: "IoT devices and embedded solutions using single-board computers.",
    features: [
      "Raspberry Pi Projects",
      "Arduino Development",
      "Sensor Integration",
      "Home Automation",
      "Custom IoT Solutions",
      "Prototype Development"
    ],
    technologies: ["Raspberry Pi", "Arduino", "ESP32", "C/C++", "Python", "MQTT"]
  },
  {
    id: "sysadmin",
    title: "System Administration",
    icon: Settings,
    category: "other",
    description: "Linux/Windows server management and system optimization.",
    features: [
      "Server Setup & Configuration",
      "Linux Administration",
      "Windows Server Management",
      "Backup Solutions",
      "Security Hardening",
      "Performance Tuning"
    ],
    technologies: ["Arch Linux", "Ubuntu", "Windows Server", "Docker", "Proxmox", "Nginx"]
  }
];

const categories = [
  { id: "all", label: "All Services", count: services.length },
  { id: "software", label: "Software", count: services.filter(s => s.category === "software").length },
  { id: "hardware", label: "Hardware", count: services.filter(s => s.category === "hardware").length },
  { id: "other", label: "Other", count: services.filter(s => s.category === "other").length }
];

const workflow = [
  { step: 1, title: "Discuss", description: "We talk about your project requirements and goals" },
  { step: 2, title: "Plan", description: "I create a detailed plan with timeline and deliverables" },
  { step: 3, title: "Build", description: "Development with regular updates and feedback loops" },
  { step: 4, title: "Deliver", description: "Final delivery with documentation and support" }
];

const hyprlandBezier = [0.22, 1, 0.36, 1] as const;

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: hyprlandBezier }}
          className="mb-12"
        >
          <div className="bg-white dark:bg-[#161b22] rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden">
            {/* Terminal Title Bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-[#21262d] border-b border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 font-mono">
                voxdroid@arch:~/services
              </span>
            </div>
            
            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm">
              <div className="text-gray-600 dark:text-gray-400 mb-2">
                <span className="text-green-600 dark:text-green-400">$</span> cat services.txt
              </div>
              <div className="text-gray-800 dark:text-gray-200 space-y-2">
                <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
                  Freelance Services
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed max-w-3xl">
                  I work with both software and hardware because I enjoy the whole picture. I can build web applications from start to finish, handle servers and databases, and also put together custom computers or fix hardware issues. I try to keep things simple, reliable, and useful. Whatever the project needs code or physical components, I bring the same care and patience to make it work well.
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-gray-600 dark:text-gray-400">
                  <span className="text-green-600 dark:text-green-400">$</span> echo $AVAILABILITY
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-600 dark:text-green-400">Available for new projects</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: hyprlandBezier }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-[#161b22] rounded-lg border border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center gap-2 mb-3 font-mono text-sm text-gray-600 dark:text-gray-400">
              <span className="text-green-600 dark:text-green-400">$</span> ls --category
            </div>
            <div className="flex flex-wrap gap-2 relative">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 py-2 rounded-md font-mono text-sm transition-colors duration-300 ${
                    activeCategory === cat.id
                      ? "text-white"
                      : "bg-gray-100 dark:bg-[#21262d] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#30363d]"
                  }`}
                >
                  {activeCategory === cat.id && (
                    <motion.div
                      layoutId="activeCategoryBg"
                      className="absolute inset-0 bg-green-600 rounded-md"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {cat.label} <span className="opacity-60">({cat.count})</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-4 mb-12">
          <AnimatePresence mode="sync">
            {filteredServices.map((service, index) => {
              const Icon = service.icon;
              const isExpanded = expandedService === service.id;
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ 
                    duration: 0.35, 
                    delay: index * 0.03, 
                    ease: hyprlandBezier
                  }}
                >
                  <div className="bg-white dark:bg-[#161b22] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
                    {/* Service Header - Clickable */}
                    <button
                      onClick={() => setExpandedService(isExpanded ? null : service.id)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#21262d] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-gray-100 dark:bg-[#21262d] text-green-600 dark:text-green-400">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-mono">
                            {service.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-gray-400"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>
                    
                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ 
                            height: { duration: 0.4, ease: hyprlandBezier },
                            opacity: { duration: 0.3, ease: hyprlandBezier }
                          }}
                          className="overflow-hidden"
                        >
                          <motion.div 
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            exit={{ y: -10 }}
                            transition={{ duration: 0.3, ease: hyprlandBezier }}
                            className="px-6 pb-6 pt-2 border-t border-gray-200 dark:border-gray-700"
                          >
                            <div className="grid md:grid-cols-2 gap-6">
                              {/* Features */}
                              <div>
                                <div className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-3">
                                  <span className="text-cyan-600 dark:text-cyan-400">#</span> Features
                                </div>
                                <ul className="space-y-2">
                                  {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                      <ChevronRight className="w-4 h-4 text-green-500" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              {/* Technologies */}
                              <div>
                                <div className="font-mono text-sm text-gray-600 dark:text-gray-400 mb-3">
                                  <span className="text-cyan-600 dark:text-cyan-400">#</span> Technologies
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {service.technologies.map((tech, i) => (
                                    <span
                                      key={i}
                                      className="px-3 py-1 text-sm font-mono bg-gray-100 dark:bg-[#21262d] text-gray-700 dark:text-gray-300 rounded-md border border-gray-200 dark:border-gray-700"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Workflow Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: hyprlandBezier }}
          className="mb-12"
        >
          <div className="bg-white dark:bg-[#161b22] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="px-6 py-4 bg-gray-100 dark:bg-[#21262d] border-b border-gray-200 dark:border-gray-700">
              <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                <span className="text-green-600 dark:text-green-400">$</span> ./workflow.sh
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 font-mono">
                How I Work
              </h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {workflow.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1, ease: hyprlandBezier }}
                    className="relative"
                  >
                    <div className="p-4 bg-gray-50 dark:bg-[#21262d] rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-green-600 text-white font-mono font-bold text-sm">
                          {item.step}
                        </span>
                        <h3 className="font-semibold text-gray-900 dark:text-white font-mono">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                    
                    {/* Connector Line */}
                    {index < workflow.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gray-300 dark:bg-gray-600" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: hyprlandBezier }}
        >
          <div className="bg-white dark:bg-[#161b22] rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="px-6 py-4 bg-gray-100 dark:bg-[#21262d] border-b border-gray-200 dark:border-gray-700">
              <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                <span className="text-green-600 dark:text-green-400">$</span> ./start-project.sh
              </div>
            </div>
            
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center p-4 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 font-mono">
                Ready to Start Your Project?
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Whether you need a website, an app, automation scripts, or help with hardware,
                I&apos;m here to turn your ideas into reality. Let&apos;s discuss your project!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-mono font-medium transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    Get in Touch
                  </motion.button>
                </Link>
                
                <Link href="/projects">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-[#21262d] hover:bg-gray-300 dark:hover:bg-[#30363d] text-gray-900 dark:text-white rounded-lg font-mono font-medium transition-colors border border-gray-300 dark:border-gray-600"
                  >
                    View My Work
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

