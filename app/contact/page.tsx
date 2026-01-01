"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Github, Linkedin, Send, Phone, MapPin, Terminal, MessageSquare } from "lucide-react"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSubmitStatus({
      success: true,
      message: "Thank you for your message! I will get back to you soon.",
    })

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })

    setIsSubmitting(false)

    // Reset status after 5 seconds
    setTimeout(() => {
      setSubmitStatus(null)
    }, 5000)
  }

  return (
    <div className="min-h-screen py-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4"
      >
        {/* Terminal Header */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700/50 rounded-lg mb-4">
            <Terminal className="h-4 w-4 text-green-600 dark:text-green-400" />
            <code className="text-sm font-mono text-gray-700 dark:text-gray-300">$ mail --compose</code>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-mono mb-4 text-gray-900 dark:text-white">
            <span className="text-green-600 dark:text-green-400">~/</span>contact
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-mono">
            <span className="text-yellow-600 dark:text-yellow-400">#</span> Have a question or want to work together? Let me know!
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-8">
          {/* Contact Information */}
          <motion.div
            variants={fadeInUp}
            className="md:col-span-2"
          >
            <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700/50 rounded-lg overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-[#0d1117] border-b border-gray-200 dark:border-gray-700/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs font-mono text-gray-500 dark:text-gray-400 ml-2">contact.json</span>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-green-600 dark:text-green-400 font-mono">$</span>
                  <span className="font-mono text-gray-700 dark:text-gray-300">cat ./contact.json</span>
                </div>

                <div className="space-y-4 font-mono text-sm">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-[#0d1117] rounded-lg border border-gray-200 dark:border-gray-700/50">
                    <Mail className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <p className="text-gray-500 dark:text-gray-500 text-xs">"email":</p>
                      <a
                        href="mailto:izeno.contact@gmail.com"
                        className="text-cyan-600 dark:text-cyan-400 hover:underline"
                      >
                        "izeno.contact@gmail.com"
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-[#0d1117] rounded-lg border border-gray-200 dark:border-gray-700/50">
                    <Phone className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-gray-500 dark:text-gray-500 text-xs">"phone":</p>
                      <p className="text-gray-700 dark:text-gray-300">"+63 (999) 888-7777"</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-[#0d1117] rounded-lg border border-gray-200 dark:border-gray-700/50">
                    <MapPin className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                    <div>
                      <p className="text-gray-500 dark:text-gray-500 text-xs">"location":</p>
                      <p className="text-gray-700 dark:text-gray-300">"Tokyo, Japan"</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700/50">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-green-600 dark:text-green-400 font-mono">$</span>
                    <span className="font-mono text-gray-700 dark:text-gray-300 text-sm">echo $SOCIAL_LINKS</span>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href="https://github.com/VoxDroid"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-100 dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 rounded-lg hover:border-green-500 dark:hover:border-green-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-100 dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="mailto:izeno.contact@gmail.com"
                      className="p-3 bg-gray-100 dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 rounded-lg hover:border-cyan-500 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={fadeInUp}
            className="md:col-span-3"
          >
            <div className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700/50 rounded-lg overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-[#0d1117] border-b border-gray-200 dark:border-gray-700/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs font-mono text-gray-500 dark:text-gray-400 ml-2">compose-message.sh</span>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <h3 className="text-lg font-bold font-mono text-gray-900 dark:text-white">Send Message</h3>
                </div>
                <p className="mb-6 text-sm font-mono text-gray-500 dark:text-gray-500">
                  <span className="text-yellow-600 dark:text-yellow-400">#</span> Form disabled - contact via email directly
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-mono text-gray-500 dark:text-gray-500 mb-2">
                        name=""
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent font-mono text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600"
                        placeholder="VoxDroid"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-mono text-gray-500 dark:text-gray-500 mb-2">
                        email=""
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent font-mono text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600"
                        placeholder="voxdroid@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-mono text-gray-500 dark:text-gray-500 mb-2">
                      subject=""
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent font-mono text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-mono text-gray-500 dark:text-gray-500 mb-2">
                      message=""
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent font-mono text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600 resize-none"
                      placeholder="Hello, I would like to talk about..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-green-600 dark:bg-green-500 text-white rounded-lg font-mono text-sm hover:bg-green-700 dark:hover:bg-green-600 transition-colors inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>$ sending...</>
                    ) : (
                      <>
                        $ send <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>

                  {submitStatus && (
                    <div
                      className={`p-4 rounded-lg font-mono text-sm border ${
                        submitStatus.success
                          ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                          : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
                      }`}
                    >
                      <span className="text-green-600 dark:text-green-400">✓</span> {submitStatus.message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div variants={fadeInUp} className="max-w-3xl mx-auto mt-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700/50 rounded-lg mb-4">
              <span className="text-green-600 dark:text-green-400 font-mono text-sm">$</span>
              <span className="font-mono text-sm text-gray-700 dark:text-gray-300">man faq</span>
            </div>
            <h3 className="text-2xl font-bold font-mono text-gray-900 dark:text-white">Frequently Asked Questions</h3>
          </div>

          <motion.div variants={staggerContainer} className="space-y-4">
            {[
              {
                question: "What services do you offer?",
                answer:
                  "I specialize in web development, creating responsive and user-friendly websites and web applications using modern technologies like React, Next.js, and more.",
              },
              {
                question: "How quickly can you complete a project?",
                answer:
                  "Project timelines vary depending on complexity and scope. After discussing your requirements, I can provide a more accurate estimate. I always strive to deliver high-quality work within agreed timeframes.",
              },
              {
                question: "Do you offer maintenance services?",
                answer:
                  "Yes, I offer maintenance and support services to ensure your website or application continues to function optimally after launch. This includes updates, bug fixes, and performance improvements.",
              },
              {
                question: "How do we get started working together?",
                answer:
                  "The process begins by reaching out through this contact form or via email. We'll schedule a consultation to discuss your project requirements, timeline, and budget. After that, I'll provide a detailed proposal for your consideration.",
              },
            ].map((faq, index) => (
              <motion.div
                variants={fadeInUp}
                key={index}
                className="bg-white dark:bg-[#161b22] border border-gray-200 dark:border-gray-700/50 rounded-lg overflow-hidden"
              >
                <div className="p-4 bg-gray-50 dark:bg-[#0d1117] border-b border-gray-200 dark:border-gray-700/50">
                  <h4 className="font-mono text-sm text-gray-900 dark:text-white flex items-center gap-2">
                    <span className="text-cyan-600 dark:text-cyan-400">Q{index + 1}:</span>
                    {faq.question}
                  </h4>
                </div>
                <div className="p-4">
                  <p className="font-mono text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    <span className="text-green-600 dark:text-green-400">→</span> {faq.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

