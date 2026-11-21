# Clarisse Portfolio

![Clarisse Portfolio Preview](public/Preview.png) 

A modern, customizable, and responsive portfolio template built with **Next.js** and **TypeScript**. Designed to showcase your skills, projects, and personality with a sleek interface, animated background, and professional features.

### **Live Demo**: Check out the deployed version at [clarisse-portfolio.vercel.app](https://clarisse-portfolio.vercel.app)

---

## Badges

[![Next.js](https://img.shields.io/badge/Next.js-13+-000000.svg?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4+-3178C6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat)](https://github.com/voxdroid/clarisse-portfolio/blob/main/LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/voxdroid/clarisse-portfolio.svg?style=flat)](https://github.com/voxdroid/clarisse-portfolio)
[![GitHub Issues](https://img.shields.io/github/issues/voxdroid/clarisse-portfolio.svg?style=flat)](https://github.com/voxdroid/clarisse-portfolio/issues)
[![Last Commit](https://img.shields.io/github/last-commit/voxdroid/clarisse-portfolio.svg?style=flat)](https://github.com/voxdroid/clarisse-portfolio/commits/main)
[![Downloads](https://img.shields.io/github/downloads/voxdroid/clarisse-portfolio/total.svg?style=flat)](https://github.com/voxdroid/clarisse-portfolio/releases)
[![Live Demo](https://img.shields.io/badge/Live_Demo-clarisse--portfolio.vercel.app-58a6ff.svg?style=flat&logo=vercel)](https://clarisse-portfolio.vercel.app)

---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Customization](#customization)
- [Project Structure](#project-structure)
- [Built With](#built-with)
- [Dependencies](#dependencies)
- [Releases](#releases)
- [Key Features Explained](#key-features-explained)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)
- [Contributing](#contributing)
- [Support](#support)

---

## Features

- Light/Dark Mode: Toggle between light and dark themes seamlessly.
- Fully Customizable: Adjust colors, fonts, and content to match your brand.
- Responsive Design: Optimized for mobile, tablet, and desktop devices.
- Animated Background: Dynamic particle animations for visual appeal.
- Smooth Animations: Powered by Framer Motion for fluid transitions.
- Modular Components: Well-organized, reusable component structure.
- Interactive UI: Includes tooltips, hover effects, and engaging elements.
- SEO Optimized: Built with search engine visibility in mind.
- High Performance: Fast load times and optimized assets.
- Skills Visualization: Dynamic representation of your expertise.
- Blog Section: Share articles and insights.
- Testimonials: Display feedback from clients or peers.
- Contact Form: Easy way for visitors to reach out.

---

## Screenshots

| Feature            | Light Mode                          | Dark Mode                          |
|--------------------|-------------------------------------|------------------------------------|
| Home Page          | ![Light Mode](public/Screenshots/S_Home_W.png) | ![Dark Mode](public/Screenshots/S_Home_D.png) |
| Projects Section   | ![Projects Light](public/Screenshots/S_Projects_W.png) | ![Projects Dark](public/Screenshots/S_Projects_D.png) |
| Skills Section     | ![Skills Light](public/Screenshots/S_Skills_W.png) | ![Skills Dark](public/Screenshots/S_Skills_D.png) |

---

## Getting Started

Set up and run the portfolio locally with these steps.

### Prerequisites

- **Node.js**: Version 18.0 or higher
- **Package Manager**: `npm` or `yarn`

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/VoxDroid/Clarisse-Portfolio
   ```

2. **Navigate to the Project Directory**
   ```bash
   cd Clarisse-Portfolio
   ```

3. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Start the Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the portfolio.

---

## Usage

Once the portfolio is running, you can explore and customize it to suit your needs. Below are key sections and how to use them effectively.

### Getting Started
- Launch the development server as described above.
- Navigate the site via the browser to preview the default layout and content.
- Use the customization options below to personalize it.

### Hero Section
- **Purpose**: Introduce yourself with a striking headline and background animation.
- **How to Use**: Edit `components/hero.tsx` to update your name, tagline, and image.

### Projects Section
- **Purpose**: Showcase your work with interactive filters and project cards.
- **How to Use**: Add projects to `components/projects.tsx` (see [Adding Projects](#adding-projects)) and test the filters in the browser.

### Skills Section
- **Purpose**: Visualize your skills dynamically.
- **How to Use**: Update the skills list in `components/skills.tsx` with your expertise.

### Settings (Theme Toggle)
- **Purpose**: Switch between light and dark modes.
- **How to Use**: Test the toggle in `components/theme-toggle.tsx` via the UI; no additional setup needed.

---

## Customization

Tailor the template to reflect your personal style and content.

### Changing Colors
Modify the color scheme in `tailwind.config.ts`:

```typescript
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(330, 73%, 60%)", // Customize here
          foreground: "hsl(330, 10%, 95%)",
        },
      },
    },
  },
};
```

Adjust CSS variables in `app/globals.css`:

```css
:root {
  --primary: 330 73% 60%; /* Light mode */
}

.dark {
  --primary: 330 73% 70%; /* Dark mode */
}
```

### Updating Content
Edit these files to update your information:
- Hero: `components/hero.tsx`
- About: `components/about.tsx`
- Projects: `components/projects.tsx`
- Skills: `components/skills.tsx`
- Testimonials: `components/testimonials.tsx`
- Blog: `components/blog.tsx`
- Contact: `components/contact.tsx`

### Adding Projects
Add projects to the `projects` array in `components/projects.tsx`:

```typescript
const projects = [
  {
    title: "Sample Project",
    description: "A brief overview of the project.",
    image: "/images/sample-project.jpg",
    tags: ["React", "TypeScript"],
    github: "https://github.com/voxdroid/sample-project",
    demo: "https://sample-project-demo.com",
    icon: <CodeIcon className="h-6 w-6" />,
  },
  // Add more projects here
];
```

### Customizing Particle Background
Tweak the animation in `components/particles-background.tsx`:

```typescript
const particleCount = Math.min(120, Math.floor((window.innerWidth * window.innerHeight) / 9000));
const colors = [
  "rgba(236, 72, 153, 0.5)", // Adjust colors
  "rgba(219, 39, 119, 0.5)",
];
```

---

## Project Structure

```plaintext
clarisse-portfolio/
├── app/                    # Next.js app directory
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # Reusable React components
│   ├── about.tsx           # About section
│   ├── blog.tsx            # Blog section
│   ├── contact.tsx         # Contact form
│   ├── hero.tsx            # Hero section
│   ├── navbar.tsx          # Navigation bar
│   ├── particles-background.tsx # Animated background
│   ├── projects.tsx        # Projects showcase
│   ├── skills.tsx          # Skills visualization
│   ├── testimonials.tsx    # Testimonials display
│   └── theme-toggle.tsx    # Theme switcher
├── public/                 # Static assets (images, etc.)
├── styles/                 # Additional CSS
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

---

## Built With

- [Next.js](https://nextjs.org/) - React framework for production-grade apps
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript for reliability
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide Icons](https://lucide.dev/) - Consistent icon set
- [shadcn/ui](https://ui.shadcn.com/) - Reusable UI components

---

## Dependencies

To run this project, the following Node.js packages are required (listed in `package.json`):
- `next` - Core framework
- `react` and `react-dom` - React libraries
- `typescript` - Type checking
- `tailwindcss` - Styling
- `framer-motion` - Animations
- `@lucide/react` - Icons
- Various `shadcn/ui` dependencies (e.g., `@radix-ui/*`)

Install them with:
```bash
npm install
```

---

## Releases

- Check the [Releases page](https://github.com/voxdroid/clarisse-portfolio/releases) for versioned updates.
- Each release includes notes on new features, bug fixes, and improvements.
- The source code is the primary distribution method; no pre-built binaries are provided.

---

## Key Features Explained

### Animated Particle Background
A semi-transparent particle system moves diagonally, customizable in `components/particles-background.tsx`.

### Interactive Project Filters
Category filters with animated icons and glow effects, implemented in `components/projects.tsx`.

### Custom Tooltip System
Toggleable tooltips managed in `context/tooltip-context.tsx` for enhanced interactivity.

### Responsive Design
Mobile-first design ensures compatibility across devices, built into all components.

---

## License

This project is licensed under the [MIT License](LICENSE). See the license file for details.

---

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Reusable UI components
- [Lucide Icons](https://lucide.dev/) - Beautiful icon library
- [Framer Motion](https://www.framer.com/motion/) - Smooth animations
- [Tailwind CSS](https://tailwindcss.com/) - Efficient styling
- [Next.js](https://nextjs.org/) - Robust framework

---

## Contact

Questions or feedback? Reach out:

- **GitHub**: [@VoxDroid](https://github.com/VoxDroid)

---

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on how to contribute, and review our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a positive and inclusive community.

To contribute:
1. Fork the repository: [https://github.com/VoxDroid/Clarisse-Portfolio](https://github.com/VoxDroid/Clarisse-Portfolio)
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Open a pull request

---

## Support

For support, please refer to our [Support Guide](SUPPORT.md). If you encounter security issues, please review our [Security Policy](SECURITY.md).

If you find this project useful, consider supporting its development:

- **Ko-fi**: [Buy me a coffee](https://ko-fi.com/izeno)  
  [![Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/izeno)
- **Star the Repository**: Give it a star on [GitHub](https://github.com/voxdroid/clarisse-portfolio)  
- **Report Issues**: Submit bugs or suggestions on the [Issues page](https://github.com/voxdroid/clarisse-portfolio/issues)

---

**Developed by VoxDroid**  
[GitHub](https://github.com/VoxDroid) | [Ko-fi](https://ko-fi.com/izeno)