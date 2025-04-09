import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-accent/10 dark:border-accent/20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-accent-dark dark:text-accent-light text-sm">
              © {currentYear} VoxDroid. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://github.com/VoxDroid"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-dark dark:text-accent-light hover:text-primary dark:hover:text-primary-light transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="mailto:izeno.contact@gmail.com"
              className="text-accent-dark dark:text-accent-light hover:text-primary dark:hover:text-primary-light transition-colors duration-300"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-dark dark:text-accent-light hover:text-primary dark:hover:text-primary-light transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-dark dark:text-accent-light hover:text-primary dark:hover:text-primary-light transition-colors duration-300"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

