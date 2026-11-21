/*
 * Everything on the site that is not a project. Every edition (and, later, every CV)
 * renders from this one object, so wording changes happen here and nowhere else.
 * The shape is checked by lib/content/schema.ts in the unit tests.
 */
export const site = {
  handle: "VoxDroid",
  role: "Full Stack Developer",
  tagline: "Systems. Intelligence. Code.",
  intro:
    "Writing code for 6+ years in Python, JavaScript, TypeScript, Rust and C++. I build command-line tools, web and desktop apps and machine-learning projects, and I run a self-hosted homelab.",
  availability: "Available for opportunities",
  email: "izeno.contact@gmail.com",
  links: [
    {
      label: "GitHub",
      href: "https://github.com/VoxDroid",
      handle: "github.com/VoxDroid",
    },
    {
      label: "Kaggle",
      href: "https://www.kaggle.com/VoxDroid",
      handle: "kaggle.com/VoxDroid",
    },
    {
      label: "Hugging Face",
      href: "https://huggingface.co/iZELX1",
      handle: "huggingface.co/iZELX1",
    },
  ],
  about: {
    lead: "I like making things that help people.",
    paragraphs: [
      "I enjoy working on problems step by step, trying different ideas, and learning from others. I listen more than I speak, stay calm when things go wrong, and always try to do better.",
      "I still have a lot to learn, but I am happy to bring care and effort to any project. I look forward to working with good teams and growing.",
      "I am in this field because I truly enjoy it. Computers fascinate me, and I work on them mostly for my own curiosity and happiness. I love understanding how they work, from the simple flow of electricity through small parts, to how basic switches build into complex programs we use every day.",
      "I like both the hardware side, such as circuits and memory, and the software side, such as writing clear code and making systems that run smoothly.",
    ],
    now: "Always exploring new technologies.",
  },
  focus: [
    {
      title: "AI and machine learning",
      detail: "LLMs, computer vision, neural networks and agents.",
    },
    {
      title: "Web development",
      detail: "Modern, high-performance, responsive applications.",
    },
    {
      title: "Open source",
      detail: "Contributing, maintaining, and scaling core modules.",
    },
    {
      title: "Cybersecurity",
      detail: "Ethical hacking, privacy, and network defense.",
    },
    {
      title: "Linux and homelab",
      detail: "Self-hosted infrastructure and system-level automation.",
    },
    {
      title: "Cloud and DevOps",
      detail:
        "Containers, Kubernetes, CI/CD pipelines, and scalable architecture.",
    },
  ],
  stack: [
    {
      group: "Languages",
      items: ["Python", "TypeScript", "JavaScript", "PHP", "Rust", "C++"],
    },
    {
      group: "Machine learning",
      items: ["PyTorch", "TensorFlow", "scikit-learn", "Jupyter"],
    },
    { group: "Web", items: ["React", "Next.js", "FastAPI"] },
    {
      group: "Infrastructure",
      items: ["Docker", "Kubernetes", "Linux", "Proxmox", "nginx", "WireGuard"],
    },
  ],
  skills: {
    programmingLanguages: [
      "Python",
      "C/C++/C#",
      "Java",
      "JavaScript",
      "Rust",
      "VBS",
      "Batch",
      "Lua",
      "PHP",
      "TypeScript",
      "Dart",
      "Swift",
    ],
    operatingSystems: [
      { name: "Windows", level: "Proficient" },
      { name: "Linux", level: "Proficient" },
      { name: "Android", level: "Proficient" },
      { name: "macOS/iOS", level: "Intermediate" },
    ],
    hardware: [
      "PC Assembly",
      "Networking",
      "Electronics",
      "Single-board Computers",
      "Embedded Systems Prototyping",
    ],
    software: ["Git/GitHub", "Docker", "Tmux", "VMware"],
    other: ["Shell Scripting", "Vim/Neovim", "CLI", "Pacman"],
  },
  spokenLanguages: [
    { name: "English", level: "Fluent" },
    { name: "Tagalog", level: "Native" },
  ],
  interests: [
    "Open-source development",
    "AI experiments",
    "Reading novels",
    "Music",
    "Games",
    "Computers",
  ],
  education: [
    {
      school: "Laguna State Polytechnic University",
      campus: "Santa Cruz (Main) Campus",
      period: "2022 – Present",
      degree: "Bachelor of Science in Computer Science",
      detail: "Intelligent Systems Specialization",
      honors: ["Consistent Dean's Lister"],
    },
    {
      school: "Laguna Senior High School",
      campus: "Santa Cruz, Laguna",
      period: "2020 – 2022",
      degree: "Science, Technology, Engineering, and Math",
      detail: "",
      honors: ["Award for Exemplary Performance", "With High Honors (95)"],
    },
    {
      school: "Pedro Guevera Memorial National High School",
      campus: "Santa Cruz, Laguna",
      period: "2016 – 2020",
      degree: "Science, Technology, Engineering, and Math",
      detail: "",
      honors: ["With High Honors (95)"],
    },
  ],
  certifications: [
    {
      name: "Ethical Hacker",
      href: "https://www.credly.com/badges/fec2454c-f8f9-45a8-8517-1c8fe16e1e2f/public_url",
    },
    {
      name: "Network Defense",
      href: "https://www.credly.com/badges/d66e78e8-fa4a-4508-b2ae-1163d12d51b7/public_url",
    },
    {
      name: "AI Fundamentals",
      href: "https://www.credly.com/badges/2994ace5-22c4-4138-8034-587fe29ba000/public_url",
    },
    {
      name: "AI Fundamentals",
      href: "https://www.credly.com/badges/ef13af48-9c36-4421-b642-1c22a02c6e47/public_url",
    },
    {
      name: "I2CS",
      href: "https://www.credly.com/badges/49ec359c-80b8-4be6-a7ec-ba1825ed99b5/public_url",
    },
    {
      name: "CHB",
      href: "https://www.credly.com/badges/cb281905-4563-4f86-9f15-c2a06fba9184/public_url",
    },
  ],
  journey: [
    {
      period: "2015 – 2016",
      title: "init_journey.sh",
      detail:
        "My interest in computer related things sparked in 2015, and I started learning LUA, BATCH scripts, and SHELL scripts.",
      command: "chmod +x ./learning.sh && ./learning.sh",
    },
    {
      period: "2017 – 2020",
      title: "expand_skills.sh",
      detail:
        "I began learning desktop software and web development. I also started learning android development and machine learning.",
      command: "pacman -S webdev android ml --noconfirm",
    },
    {
      period: "2021 – 2023",
      title: "level_up.sh",
      detail:
        "Worked on several personal side projects, refining my skills in system architecture, AI/ML, and application development.",
      command: "git commit -m 'feat: personal growth'",
    },
    {
      period: "2024 – Present",
      title: "current_status.sh",
      detail:
        "Currently focused on advanced technologies like Next.js, TypeScript, Rust Programming Language, and exploring new frontiers in web development and Data Science.",
      command: "systemctl status voxdroid.service",
    },
  ],
  services: [
    {
      title: "Web Development",
      kind: "software",
      description:
        "Modern, responsive websites and web applications built with cutting-edge technologies.",
      features: [
        "Responsive Design (Mobile-First)",
        "Single Page Applications (SPA)",
        "Progressive Web Apps (PWA)",
        "E-commerce Solutions",
        "Content Management Systems",
        "SEO Optimization",
      ],
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Node.js",
        "PHP",
      ],
    },
    {
      title: "Desktop Applications",
      kind: "software",
      description:
        "Cross-platform desktop applications with native performance and modern interfaces.",
      features: [
        "Cross-Platform Development",
        "Native Performance",
        "System Integration",
        "Offline-First Applications",
        "Custom Business Software",
        "Legacy System Modernization",
      ],
      technologies: ["Rust", "C#", "Python", "Electron", "Tauri", "Qt"],
    },
    {
      title: "Mobile Development",
      kind: "software",
      description:
        "Native and cross-platform mobile applications for iOS and Android.",
      features: [
        "iOS & Android Development",
        "Cross-Platform Solutions",
        "App Store Optimization",
        "Push Notifications",
        "Offline Functionality",
        "Payment Integration",
      ],
      technologies: ["Flutter", "Dart", "Swift", "React Native", "Firebase"],
    },
    {
      title: "Backend & APIs",
      kind: "software",
      description:
        "Scalable backend systems and RESTful/GraphQL APIs for your applications.",
      features: [
        "RESTful API Design",
        "GraphQL Implementation",
        "Database Design & Optimization",
        "Authentication & Authorization",
        "Microservices Architecture",
        "Cloud Deployment",
      ],
      technologies: [
        "Node.js",
        "Python",
        "Rust",
        "PostgreSQL",
        "MongoDB",
        "Docker",
      ],
    },
    {
      title: "Automation & Scripting",
      kind: "software",
      description:
        "Custom scripts and automation tools to streamline your workflows.",
      features: [
        "Task Automation",
        "Data Processing Pipelines",
        "Web Scraping Solutions",
        "CI/CD Pipeline Setup",
        "System Administration Scripts",
        "Batch Processing",
      ],
      technologies: ["Python", "Bash", "PowerShell", "Rust", "GitHub Actions"],
    },
    {
      title: "AI & Machine Learning",
      kind: "software",
      description:
        "Intelligent solutions powered by machine learning and AI technologies.",
      features: [
        "Custom ML Models",
        "Natural Language Processing",
        "Computer Vision",
        "Chatbot Development",
        "Data Analysis & Visualization",
        "AI Integration",
      ],
      technologies: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "OpenAI",
        "LangChain",
        "Pandas",
      ],
    },
    {
      title: "PC Building & Repair",
      kind: "hardware",
      description:
        "Custom PC builds, upgrades, and repairs tailored to your needs.",
      features: [
        "Custom Gaming PCs",
        "Workstation Builds",
        "Server Assembly",
        "Hardware Upgrades",
        "Troubleshooting & Repair",
        "Performance Optimization",
      ],
      technologies: [
        "Intel/AMD CPUs",
        "NVIDIA/AMD GPUs",
        "SSDs/NVMe",
        "Custom Cooling",
        "Cable Management",
      ],
    },
    {
      title: "Networking Solutions",
      kind: "hardware",
      description:
        "Network setup, configuration, and security for homes and businesses.",
      features: [
        "Network Infrastructure Design",
        "Router/Switch Configuration",
        "Wireless Network Setup",
        "VPN Configuration",
        "Network Security",
        "Performance Monitoring",
      ],
      technologies: [
        "Cisco",
        "MikroTik",
        "Ubiquiti",
        "pfSense",
        "VLANs",
        "Firewalls",
      ],
    },
    {
      title: "Embedded Systems",
      kind: "hardware",
      description:
        "IoT devices and embedded solutions using single-board computers.",
      features: [
        "Raspberry Pi Projects",
        "Arduino Development",
        "Sensor Integration",
        "Home Automation",
        "Custom IoT Solutions",
        "Prototype Development",
      ],
      technologies: [
        "Raspberry Pi",
        "Arduino",
        "ESP32",
        "C/C++",
        "Python",
        "MQTT",
      ],
    },
    {
      title: "System Administration",
      kind: "other",
      description: "Linux/Windows server management and system optimization.",
      features: [
        "Server Setup & Configuration",
        "Linux Administration",
        "Windows Server Management",
        "Backup Solutions",
        "Security Hardening",
        "Performance Tuning",
      ],
      technologies: [
        "Arch Linux",
        "Ubuntu",
        "Windows Server",
        "Docker",
        "Proxmox",
        "Nginx",
      ],
    },
  ],
  process: [
    {
      title: "Discuss",
      detail: "We talk about your project requirements and goals",
    },
    {
      title: "Plan",
      detail: "I create a detailed plan with timeline and deliverables",
    },
    {
      title: "Build",
      detail: "Development with regular updates and feedback loops",
    },
    {
      title: "Deliver",
      detail: "Final delivery with documentation and support",
    },
  ],
  contact: {
    heading: "Interested in working together?",
    body: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.",
  },
  faq: [
    {
      q: "What services do you offer?",
      a: "I specialize in web development, creating responsive and user-friendly websites and web applications using modern technologies like React, Next.js, and more.",
    },
    {
      q: "How quickly can you complete a project?",
      a: "Project timelines vary depending on complexity and scope. After discussing your requirements, I can provide a more accurate estimate. I always strive to deliver high-quality work within agreed timeframes.",
    },
    {
      q: "Do you offer maintenance services?",
      a: "Yes, I offer maintenance and support services to ensure your website or application continues to function optimally after launch. This includes updates, bug fixes, and performance improvements.",
    },
    {
      q: "How do we get started working together?",
      a: "The process begins by reaching out via email. We'll schedule a consultation to discuss your project requirements, timeline, and budget. After that, I'll provide a detailed proposal for your consideration.",
    },
  ],
} as const;

export type Site = typeof site;
