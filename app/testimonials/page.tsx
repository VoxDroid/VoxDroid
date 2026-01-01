"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import SectionHeader from "@/components/section-header"
import Link from "next/link"

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

const testimonials = [
  {
    id: 1,
    name: "VoxDroid",
    position: "God of Code, Numbers, and Logic",
    image: "/profile/VoxDroid.jpg",
    content:
      "Working with VoxDroid was an absolute pleasure. Their technical expertise and attention to detail resulted in a product that exceeded our expectations. They were responsive, professional, and delivered on time.",
    rating: 5,
  },
  {
    id: 2,
    name: "VoxDroid",
    position: "God of Code, Numbers, and Logic",
    image: "/profile/VoxDroid.jpg",
    content:
      "Working with VoxDroid was an absolute pleasure. Their technical expertise and attention to detail resulted in a product that exceeded our expectations. They were responsive, professional, and delivered on time.",
    rating: 5,
  },
  {
    id: 3,
    name: "VoxDroid",
    position: "God of Code, Numbers, and Logic",
    image: "/profile/VoxDroid.jpg",
    content:
      "Working with VoxDroid was an absolute pleasure. Their technical expertise and attention to detail resulted in a product that exceeded our expectations. They were responsive, professional, and delivered on time.",
    rating: 5,
  },
  {
    id: 4,
    name: "VoxDroid",
    position: "God of Code, Numbers, and Logic",
    image: "/profile/VoxDroid.jpg",
    content:
      "Working with VoxDroid was an absolute pleasure. Their technical expertise and attention to detail resulted in a product that exceeded our expectations. They were responsive, professional, and delivered on time.",
    rating: 5,
  },
  {
    id: 5,
    name: "VoxDroid",
    position: "God of Code, Numbers, and Logic",
    image: "/profile/VoxDroid.jpg",
    content:
      "Working with VoxDroid was an absolute pleasure. Their technical expertise and attention to detail resulted in a product that exceeded our expectations. They were responsive, professional, and delivered on time.",
    rating: 5,
  },
  {
    id: 6,
    name: "VoxDroid",
    position: "God of Code, Numbers, and Logic",
    image: "/profile/VoxDroid.jpg",
    content:
      "Working with VoxDroid was an absolute pleasure. Their technical expertise and attention to detail resulted in a product that exceeded our expectations. They were responsive, professional, and delivered on time.",
    rating: 5,
  },
]

export default function TestimonialsPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState("right")
  const [isAnimating, setIsAnimating] = useState(false)

  const nextTestimonial = () => {
    if (isAnimating) return
    setDirection("right")
    setIsAnimating(true)
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
      setIsAnimating(false)
    }, 300)
  }

  const prevTestimonial = () => {
    if (isAnimating) return
    setDirection("left")
    setIsAnimating(true)
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
      setIsAnimating(false)
    }, 300)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 8000)

    return () => clearInterval(interval)
  }, [activeIndex, isAnimating])

  return (
    <div className="min-h-screen py-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4"
      >
        <motion.div variants={fadeInUp}>
          <SectionHeader title="Client Testimonials" subtitle="What people say about working with me" centered />
        </motion.div>

        {/* Featured Testimonial Carousel */}
        <motion.div variants={fadeInUp} className="max-w-4xl mx-auto mb-16">
          <div className="relative bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark p-8 md:p-12 overflow-hidden">
            <div className="absolute top-8 left-8 text-primary/20 dark:text-primary-light/20">
              <Quote className="h-16 w-16" />
            </div>

            <div className="relative z-10">
              {/* Testimonial Content with Animation */}
              <div className="relative h-[200px] md:h-[150px] overflow-hidden">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`absolute w-full transition-all duration-500 ease-in-out ${
                      index === activeIndex
                        ? "opacity-100 translate-x-0"
                        : index < activeIndex || (index === testimonials.length - 1 && activeIndex === 0)
                          ? "opacity-0 -translate-x-full"
                          : "opacity-0 translate-x-full"
                    }`}
                  >
                    <p className="text-lg md:text-xl italic mb-8 text-accent-dark dark:text-accent-light">
                      "{testimonial.content}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Testimonial Author with Animation */}
              <div className="relative h-[100px] overflow-hidden">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={`author-${testimonial.id}`}
                    className={`absolute w-full transition-all duration-500 ease-in-out ${
                      index === activeIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full overflow-hidden w-16 h-16 border-2 border-primary/20 dark:border-primary-light/20">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{testimonial.name}</h4>
                        <p className="text-accent-dark dark:text-accent-light">{testimonial.position}</p>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute bottom-8 right-8 flex space-x-2">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light hover:bg-primary/20 dark:hover:bg-primary-light/20 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light hover:bg-primary/20 dark:hover:bg-primary-light/20 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? "right" : "left")
                    setActiveIndex(index)
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-primary dark:bg-primary-light scale-125"
                      : "bg-primary/30 dark:bg-primary-light/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* All Testimonials Grid */}
        <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              variants={fadeInUp}
              key={testimonial.id}
              className="bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark p-6 transition-all duration-500 hover:translate-y-[-10px] hover:shadow-xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="mr-4 rounded-full overflow-hidden w-12 h-12 border-2 border-primary/20 dark:border-primary-light/20">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-accent-dark dark:text-accent-light">{testimonial.position}</p>
                  </div>
                </div>
                <Quote className="h-6 w-6 text-primary/40 dark:text-primary-light/40" />
              </div>

              <p className="text-accent-dark dark:text-accent-light mb-4 line-clamp-4">"{testimonial.content}"</p>

              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={fadeInUp}
          className="mt-16 p-8 bg-gradient-to-r from-primary via-primary-light to-primary text-white rounded-lg shadow-lg text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to work together?</h3>
          <p className="mb-6 max-w-2xl mx-auto">Let's create something amazing that exceeds your expectations.</p>
          <Link
            href="/contact"
            className="px-8 py-4 bg-white/90 hover:bg-white text-gray-800 font-semibold border-2 border-white rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl inline-flex items-center"
          >
            Contact Me <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

