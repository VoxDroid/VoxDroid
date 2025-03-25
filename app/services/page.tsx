"use client"

import { useState } from "react"
import { Code, Layout, Server, Smartphone, Database, Search, Zap, Layers, ChevronDown, CheckCircle } from "lucide-react"
import Link from "next/link"
import SectionHeader from "@/components/section-header"
// Import the AnimatedBackground component at the top
import AnimatedBackground from "@/components/animated-background"

const services = [
  {
    id: 1,
    title: "Web Development",
    description:
      "Creating responsive, performant websites and web applications using modern technologies and frameworks.",
    icon: Code,
    features: [
      "Responsive design that works on all devices",
      "Modern frameworks (React, Next.js, Vue.js)",
      "Performance optimization",
      "Accessibility compliance",
      "SEO-friendly structure",
      "Interactive UI elements",
    ],
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Designing intuitive user interfaces and experiences that delight users and achieve business goals.",
    icon: Layout,
    features: [
      "User research and persona development",
      "Wireframing and prototyping",
      "Visual design and branding",
      "Interaction design",
      "Usability testing",
      "Design systems creation",
    ],
  },
  {
    id: 3,
    title: "Backend Development",
    description: "Building robust, scalable backend systems and APIs to power your applications.",
    icon: Server,
    features: [
      "API development and integration",
      "Database design and optimization",
      "Authentication and security",
      "Serverless functions",
      "Microservices architecture",
      "Performance monitoring",
    ],
  },
  {
    id: 4,
    title: "Mobile App Development",
    description: "Developing cross-platform mobile applications that provide native-like experiences.",
    icon: Smartphone,
    features: [
      "React Native development",
      "Cross-platform compatibility",
      "Native device feature integration",
      "Offline functionality",
      "Push notifications",
      "App store submission assistance",
    ],
  },
  {
    id: 5,
    title: "Database Solutions",
    description: "Designing and implementing efficient database solutions for your data needs.",
    icon: Database,
    features: [
      "Database architecture design",
      "SQL and NoSQL solutions",
      "Data migration and integration",
      "Performance optimization",
      "Backup and recovery systems",
      "Data security implementation",
    ],
  },
  {
    id: 6,
    title: "SEO Optimization",
    description: "Improving your website's visibility in search engines to drive organic traffic.",
    icon: Search,
    features: [
      "Technical SEO audit and implementation",
      "Content optimization",
      "Performance optimization",
      "Schema markup implementation",
      "SEO-friendly architecture",
      "Analytics and reporting",
    ],
  },
  {
    id: 7,
    title: "Performance Optimization",
    description: "Boosting the speed and efficiency of your websites and applications.",
    icon: Zap,
    features: [
      "Loading speed optimization",
      "Code and asset optimization",
      "Caching strategies",
      "Database query optimization",
      "Core Web Vitals improvement",
      "Performance monitoring setup",
    ],
  },
  {
    id: 8,
    title: "Full Stack Solutions",
    description: "End-to-end development services covering all aspects of your project.",
    icon: Layers,
    features: [
      "Frontend and backend integration",
      "Database design and implementation",
      "Third-party service integration",
      "DevOps and deployment",
      "Testing and quality assurance",
      "Documentation and knowledge transfer",
    ],
  },
]

// Pricing plans
const pricingPlans = [
  {
    id: "basic",
    name: "Basic",
    price: 1499,
    description: "Perfect for small projects and startups",
    features: [
      "Responsive website development",
      "Basic SEO optimization",
      "Mobile-friendly design",
      "Contact form integration",
      "Up to 5 pages",
      "1 month of support",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: 2499,
    description: "Ideal for growing businesses and organizations",
    features: [
      "Everything in Basic plan",
      "Advanced UI/UX design",
      "Custom animations and interactions",
      "CMS integration",
      "E-commerce functionality",
      "Up to 10 pages",
      "3 months of support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 4999,
    description: "For large-scale projects with complex requirements",
    features: [
      "Everything in Professional plan",
      "Custom backend development",
      "Advanced database solutions",
      "Third-party API integration",
      "Performance optimization",
      "Unlimited pages",
      "6 months of support",
    ],
  },
]

export default function ServicesPage() {
  const [expandedService, setExpandedService] = useState<number | null>(null)

  const toggleService = (id: number) => {
    setExpandedService(expandedService === id ? null : id)
  }

  return (
    <div className="min-h-screen py-16">
      <AnimatedBackground patternSize={30} speed={0.2} />
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Services"
          subtitle="Expert solutions to help your business thrive in the digital world"
          centered
        />

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service) => {
            const Icon = service.icon
            const isExpanded = expandedService === service.id

            return (
              <div
                key={service.id}
                className={`bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark overflow-hidden transition-all duration-500 ${
                  isExpanded ? "transform scale-[1.03] shadow-xl z-10" : "hover:translate-y-[-10px] hover:shadow-xl"
                }`}
              >
                <div className="p-6 cursor-pointer" onClick={() => toggleService(service.id)}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-primary/10 dark:bg-primary-light/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary dark:text-primary-light" />
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-primary dark:text-primary-light transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-accent-dark dark:text-accent-light mb-2">{service.description}</p>
                </div>

                {/* Expandable Features */}
                <div
                  className={`px-6 overflow-hidden transition-all duration-500 ${
                    isExpanded ? "max-h-96 pb-6" : "max-h-0"
                  }`}
                >
                  <div className="pt-4 border-t border-accent/10 dark:border-accent/20">
                    <h4 className="font-bold mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary dark:text-primary-light mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Pricing Section */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text dark:gradient-text-light inline-block">
          Pricing Plans
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark overflow-hidden transition-all duration-500 hover:translate-y-[-10px] hover:shadow-xl flex flex-col"
            >
              <div className="p-6 border-b border-accent/10 dark:border-accent/20 text-center">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold mr-1">$</span>
                  <span className="text-4xl font-bold gradient-text dark:gradient-text-light">{plan.price}</span>
                </div>
                <p className="text-accent-dark dark:text-accent-light">{plan.description}</p>
              </div>

              <div className="p-6 flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-primary dark:text-primary-light mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 text-center">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-primary dark:bg-primary-light text-white rounded-md shadow-custom-dark inline-flex items-center transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg w-full justify-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark p-8 mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">My Working Process</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Discovery", description: "Understanding your needs and project requirements" },
              { step: 2, title: "Planning", description: "Creating a detailed roadmap and technical specification" },
              { step: 3, title: "Execution", description: "Developing the solution with regular progress updates" },
              { step: 4, title: "Launch", description: "Deploying the final product and providing support" },
            ].map((process) => (
              <div key={process.step} className="relative text-center">
                {/* Step number */}
                <div className="w-16 h-16 mx-auto mb-4 bg-primary dark:bg-primary-light text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {process.step}
                </div>

                {/* Connect line (except for last item) */}
                {process.step < 4 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-1 bg-gradient-to-r from-primary to-primary-light"></div>
                )}

                <h3 className="text-xl font-bold mb-2">{process.title}</h3>
                <p className="text-accent-dark dark:text-accent-light">{process.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              {
                question: "How long does it typically take to complete a project?",
                answer:
                  "Project timelines vary based on complexity and scope. A simple website might take 2-3 weeks, while more complex applications can take 2-3 months or longer. After our initial consultation, I'll provide a detailed timeline estimate for your specific project.",
              },
              {
                question: "Do you offer maintenance services after project completion?",
                answer:
                  "Yes, I provide ongoing maintenance and support services to ensure your project continues to run smoothly. Maintenance packages can be customized to fit your needs, from basic updates to comprehensive support.",
              },
              {
                question: "How do we communicate during the project?",
                answer:
                  "Regular communication is key to project success. I typically use a combination of email, video calls, and project management tools to keep you updated on progress, address questions, and gather feedback throughout the development process.",
              },
              {
                question: "What is your payment structure?",
                answer:
                  "I typically work with a 50% upfront deposit to begin work, with the remaining 50% due upon project completion. For larger projects, I can arrange milestone-based payments. All payment terms are clearly outlined in our contract before work begins.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark p-6"
              >
                <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                <p className="text-accent-dark dark:text-accent-light">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 p-8 bg-gradient-to-r from-primary via-primary-light to-primary text-white rounded-lg shadow-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to start your project?</h3>
          <p className="mb-6 max-w-2xl mx-auto">
            Let's discuss how I can help bring your vision to life with tailored solutions that meet your specific
            needs.
          </p>
          <Link
            href="/contact"
            className="px-8 py-4 bg-white/90 hover:bg-white text-gray-800 font-semibold border-2 border-white rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl inline-flex items-center"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  )
}

