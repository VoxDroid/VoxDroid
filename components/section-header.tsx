interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
}

export default function SectionHeader({ title, subtitle, centered = false }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:gradient-text-light inline-block">
        {title}
      </h2>
      {subtitle && <p className="text-accent-dark dark:text-accent-light text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}

