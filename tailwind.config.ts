import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Add specific classes that might be getting purged
    "rounded-lg",
    "rounded-xl",
    "rounded-2xl",
    "rounded-full",
    "animate-fadeIn",
    "animate-slideUp",
    "animate-pulse",
    "animate-floatUp",
    "glow-blue",
    "glow-effect",
    "card-hover",
    "button-hover",
  ],
  theme: {
    extend: {
      colors: {
        linux: {
          bg: "#050505",
          primary: "#6366f1",
          success: "#27c93f",
          error: "#ff5f56",
          warning: "#ffbd2e",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "#818cf8", // Indigo 400
          DEFAULT_OLD: "#1e3a8a", // dark blue
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          light: "#94a3b8", // lighter gray for light mode
          dark: "#1e1e2e", // Darker blue-gray for Linux theme
          DEFAULT_OLD: "#64748b", // gray/silver
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        text: {
          dark: "#f1f5f9", // light gray/silver
          light: "#1e293b", // dark gray/black for light mode
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        sans: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        custom: "0 4px 12px rgba(0, 0, 0, 0.15)",
        "custom-light": "0 4px 12px rgba(0, 0, 0, 0.08)",
        "custom-dark": "0 4px 12px rgba(0, 0, 0, 0.25)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        floatUp: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-in-out",
        slideUp: "slideUp 0.5s ease-out",
        pulse: "pulse 2s ease-in-out infinite",
        floatUp: "floatUp 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config

