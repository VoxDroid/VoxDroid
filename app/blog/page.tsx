"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, Tag, ChevronRight } from "lucide-react"
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

const blogPosts = [
  {
    id: 1,
    title: "VoxDroid's Blog Title",
    excerpt:
      "Excerpt of the blog post.",
    image: "/profile/VoxDroid.jpg",
    date: "June 15, 2025",
    readTime: "8 min read",
    category: "Technology Development",
    slug: "blog-page",
  },
  {
    id: 2,
    title: "VoxDroid's Blog Title",
    excerpt:
      "Excerpt of the blog post.",
    image: "/profile/VoxDroid.jpg",
    date: "June 15, 2025",
    readTime: "8 min read",
    category: "Technology Development",
    slug: "blog-page",
  },
  {
    id: 3,
    title: "VoxDroid's Blog Title",
    excerpt:
      "Excerpt of the blog post.",
    image: "/profile/VoxDroid.jpg",
    date: "June 15, 2025",
    readTime: "8 min read",
    category: "Technology Development",
    slug: "blog-page",
  },
  {
    id: 4,
    title: "VoxDroid's Blog Title",
    excerpt:
      "Excerpt of the blog post.",
    image: "/profile/VoxDroid.jpg",
    date: "June 15, 2025",
    readTime: "8 min read",
    category: "Technology Development",
    slug: "blog-page",
  },
  {
    id: 5,
    title: "VoxDroid's Blog Title",
    excerpt:
      "Excerpt of the blog post.",
    image: "/profile/VoxDroid.jpg",
    date: "June 15, 2025",
    readTime: "8 min read",
    category: "Technology Development",
    slug: "blog-page",
  },
  {
    id: 6,
    title: "VoxDroid's Blog Title",
    excerpt:
      "Excerpt of the blog post.",
    image: "/profile/VoxDroid.jpg",
    date: "June 15, 2025",
    readTime: "8 min read",
    category: "Technology Development",
    slug: "blog-page",
  },
  {
    id: 7,
    title: "VoxDroid's Blog Title",
    excerpt:
      "Excerpt of the blog post.",
    image: "/profile/VoxDroid.jpg",
    date: "June 15, 2025",
    readTime: "8 min read",
    category: "Technology Development",
    slug: "blog-page",
  },
]

// Featured post is the first one
const featuredPost = blogPosts[0]
// Recent posts are the rest
const recentPosts = blogPosts.slice(1)

export default function BlogPage() {
  return (
    <div className="min-h-screen py-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4"
      >
        <motion.div variants={fadeInUp}>
          <SectionHeader title="My Blog" subtitle="Thoughts, tutorials, and insights on web development" centered />
        </motion.div>

        {/* Featured Post */}
        <motion.div variants={fadeInUp} className="mb-16">
          <div className="bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark overflow-hidden transition-all duration-500 hover:shadow-xl">
            <div className="md:flex">
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <Image
                  src={featuredPost.image || "/profile/VoxDroid.jpg"}
                  alt={featuredPost.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-8">
                <div className="flex items-center mb-4 text-sm text-accent-dark dark:text-accent-light">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {featuredPost.date}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h2>
                <p className="text-accent-dark dark:text-accent-light mb-6">{featuredPost.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light text-sm rounded-full flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    {featuredPost.category}
                  </span>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="flex items-center text-primary dark:text-primary-light hover:underline"
                  >
                    Read More <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Posts Grid */}
        <motion.div variants={fadeInUp}>
          <h3 className="text-2xl font-bold mb-8">Recent Articles</h3>
        </motion.div>
        <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <motion.div
              variants={fadeInUp}
              key={post.id}
              className="bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark overflow-hidden transition-all duration-500 hover:translate-y-[-10px] hover:shadow-xl"
            >
              <div className="relative h-48">
                <Image
                  src={post.image || "/profile/VoxDroid.jpg"}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3 text-xs text-accent-dark dark:text-accent-light">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.date}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-accent-dark dark:text-accent-light mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="px-2 py-1 bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light text-xs rounded-full flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    {post.category}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center text-primary dark:text-primary-light hover:underline text-sm"
                  >
                    Read More <ChevronRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter Subscription */}
        <motion.div
          variants={fadeInUp}
          className="mt-16 p-8 bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Subscribe to My Newsletter</h3>
          <p className="text-accent-dark dark:text-accent-light mb-6 max-w-2xl mx-auto">
            Stay updated with the latest articles, tutorials, and insights on web development. No spam, just valuable
            content.
          </p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 rounded-l-md border border-accent/20 dark:border-accent/10 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light dark:bg-accent-dark/10"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary dark:bg-primary-light text-white rounded-r-md transition-all duration-300 hover:bg-primary-dark"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  )
}

