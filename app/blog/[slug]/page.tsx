import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Tag, ArrowLeft, Twitter, Linkedin, Share2 } from "lucide-react"

const post = {
  title: "VoxDroid's Blog",
  date: "March 25, 2025",
  readTime: "8 min read",
  category: "AI/ML",
  image: "/profile/VoxDroid.jpg?",
  content: `
    <p>Blog Content</p>
  `,
  author: {
    name: "VoxDroid",
    image: "/profile/VoxDroid.jpg",
    bio: "Web developer passionate about creating beautiful and functional digital experiences.",
  },
  relatedPosts: [
    {
      id: 2,
      title: "Related Article 1",
      slug: "related-article-1",
      image: "/profile/VoxDroid.jpg",
    },
    {
      id: 6,
      title: "Related Article 2",
      slug: "related-article-2",
      image: "/profile/VoxDroid.jpg",
    },
    {
      id: 3,
      title: "Related Article 3",
      slug: "related-article-3",
      image: "/profile/VoxDroid.jpg",
    },
  ],
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog */}
          <Link
            href="/blog"
            className="inline-flex items-center text-accent-dark dark:text-accent-light hover:text-primary dark:hover:text-primary-light mb-8 transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>

          {/* Post Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center text-sm text-accent-dark dark:text-accent-light mb-6">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {post.date}
              </span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime}
              </span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <Tag className="h-4 w-4 mr-1" />
                {post.category}
              </span>
            </div>

            {/* Featured Image */}
            <div className="rounded-lg overflow-hidden mb-8 shadow-custom dark:shadow-custom-dark">
              <Image
                src={post.image || "/profile/VoxDroid.jpg"}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </header>

          {/* Post Content */}
          <article className="prose prose-lg dark:prose-invert max-w-none mb-12 bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark p-8">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>

          {/* Author Bio */}
          <div className="bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark p-6 mb-12 flex items-center">
            <div className="mr-4 rounded-full overflow-hidden w-16 h-16 border-2 border-primary/20 dark:border-primary-light/20">
              <Image
                src={post.author.image || "/profile/VoxDroid.jpg"}
                alt={post.author.name}
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-bold text-lg">Written by {post.author.name}</h4>
              <p className="text-accent-dark dark:text-accent-light">{post.author.bio}</p>
            </div>
          </div>

          {/* Share Links */}
          <div className="mb-12">
            <h4 className="font-bold mb-4">Share this article</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-3 bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light rounded-full hover:bg-primary/20 dark:hover:bg-primary-light/20 transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-3 bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light rounded-full hover:bg-primary/20 dark:hover:bg-primary-light/20 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-3 bg-primary/10 dark:bg-primary-light/10 text-primary dark:text-primary-light rounded-full hover:bg-primary/20 dark:hover:bg-primary-light/20 transition-colors"
                aria-label="Share link"
              >
                <Share2 className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Related Posts */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {post.relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="bg-white/80 dark:bg-accent-dark/40 backdrop-blur-sm rounded-lg shadow-custom dark:shadow-custom-dark overflow-hidden transition-all duration-500 hover:translate-y-[-5px] hover:shadow-xl"
                >
                  <div className="relative h-40">
                    <Image
                      src={relatedPost.image || "/profile/VoxDroid.jpg"}
                      alt={relatedPost.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold line-clamp-2">{relatedPost.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

