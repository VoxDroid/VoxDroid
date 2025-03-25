"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Github, Linkedin, Send, Phone, MapPin } from "lucide-react"
import SectionHeader from "@/components/section-header"
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

    // Simulate form submission
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
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Get In Touch"
          subtitle="Have a question or want to work together? Let me know!"
          centered
        />

        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-8">
          {/* Contact Information */}
          <div className="md:col-span-2 bg-white dark:bg-accent-dark/20 p-6 rounded-lg shadow-custom dark:shadow-custom-dark animate-fadeIn">
            <h3 className="text-xl font-bold mb-6">Contact Information</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 dark:bg-primary-light/10 rounded-full">
                  <Mail className="h-5 w-5 text-primary dark:text-primary-light" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:voxdroid@comingsoon.com"
                    className="text-accent-dark dark:text-accent-light hover:text-primary dark:hover:text-primary-light transition-colors"
                  >
                    voxdroid@comingsoon.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 dark:bg-primary-light/10 rounded-full">
                  <Phone className="h-5 w-5 text-primary dark:text-primary-light" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-accent-dark dark:text-accent-light">+63 (999) 888-7777</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 dark:bg-primary-light/10 rounded-full">
                  <MapPin className="h-5 w-5 text-primary dark:text-primary-light" />
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-accent-dark dark:text-accent-light">Tokyo, Japan</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-medium mb-4">Connect with me</h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/VoxDroid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light rounded-full hover:bg-primary/20 dark:hover:bg-primary-light/20 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light rounded-full hover:bg-primary/20 dark:hover:bg-primary-light/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:voxdroid@comingsoon.com"
                  className="p-3 bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light rounded-full hover:bg-primary/20 dark:hover:bg-primary-light/20 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3 bg-white dark:bg-accent-dark/20 p-6 rounded-lg shadow-custom dark:shadow-custom-dark animate-slideUp">
            <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-accent/20 dark:border-accent/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light dark:bg-accent-dark/10"
                    placeholder="VoxDroid"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-accent/20 dark:border-accent/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light dark:bg-accent-dark/10"
                    placeholder="voxdroid@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-accent/20 dark:border-accent/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light dark:bg-accent-dark/10"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-accent/20 dark:border-accent/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light dark:bg-accent-dark/10 resize-none"
                  placeholder="Hello, I would like to talk about..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-primary dark:bg-primary-light text-white rounded-md shadow-custom-dark button-hover inline-flex items-center"
              >
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>

              {submitStatus && (
                <div
                  className={`p-4 rounded-lg ${
                    submitStatus.success
                      ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                      : "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-20">
          <h3 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h3>

          <div className="space-y-6">
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
              <div
                key={index}
                className="p-6 bg-white dark:bg-accent-dark/20 rounded-lg shadow-custom dark:shadow-custom-dark animate-slideUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h4 className="text-lg font-semibold mb-2">{faq.question}</h4>
                <p className="text-accent-dark dark:text-accent-light">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

