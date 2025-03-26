import Link from "next/link"
import { Home, ArrowRight, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl md:text-8xl font-bold gradient-text dark:gradient-text-light mb-6">503</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Coming Soon</h2>
        <p className="text-accent-dark dark:text-accent-light mb-8">
            The content you're looking for isn't available yet, but it's on its way!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/projects"
            className="px-6 py-3 bg-primary dark:bg-primary-light text-white rounded-md shadow-custom-dark transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg inline-flex items-center justify-center"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Projects
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border border-primary dark:border-primary-light text-primary dark:text-primary-light rounded-md transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg inline-flex items-center justify-center"
          >
            Contact Me <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

