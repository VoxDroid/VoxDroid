# Bytey

![Bytey Preview](public/assets/img/Bytey.png)

A gamified coding companion web app built with **Next.js** and **TypeScript**. Bytey is a UI template designed to transform your coding journey into an engaging experience, where a virtual pet grows as you code. This project serves as a foundation with a functional UI and minimal game logic, ready for further development to enhance features like trading, GitHub integration, and more.

### **Live Demo**: Check out the deployed version at [bytey.vercel.app](https://bytey.vercel.app)

---

## Badges

[![Next.js](https://img.shields.io/badge/Next.js-13+-000000.svg?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4+-3178C6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat)](https://github.com/VoxDroid/Bytey/blob/main/LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/VoxDroid/Bytey.svg?style=flat)](https://github.com/VoxDroid/Bytey)
[![GitHub Issues](https://img.shields.io/github/issues/VoxDroid/Bytey.svg?style=flat)](https://github.com/VoxDroid/Bytey/issues)
[![Last Commit](https://img.shields.io/github/last-commit/VoxDroid/Bytey.svg?style=flat)](https://github.com/VoxDroid/Bytey/commits/main)
[![Live Demo](https://img.shields.io/badge/Live_Demo-bytey.vercel.app-58a6ff.svg?style=flat&logo=vercel)](https://bytey.vercel.app)

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
- [Current Limitations](#current-limitations)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)
- [Contributing](#contributing)
- [Support](#support)

---

## Features

- **Gamified UI Template**: A sleek, dark-mode-only interface for a virtual pet that grows with coding activity (basic logic implemented).
- **Interactive UI**: Pet interactions with animations powered by Framer Motion.
- **Inventory System**: Display and manage items like Energy Drink and Debug Potion (functional UI, minimal logic).
- **Collectibles Gallery**: Showcase collectibles with rarity tiers (UI only).
- **Daily Tasks Panel**: Task interface for future daily engagement features (UI only).
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices.
- **Modular Components**: Reusable React components for easy extension.
- **SEO Optimized**: Built for search engine visibility.
- **High Performance**: Fast load times with Next.js rendering.

**Note**: The app currently focuses on UI with bare minimum game logic. Features like trading, GitHub integration, full pet evolution, and other functionalities are not yet implemented but can be built upon this template.

---

## Screenshots

| Feature            | Screenshot                          |
|--------------------|-------------------------------------|
| Game Interface     | ![Game Dark](public/assets/previews/bytey_game.png) |
| Inventory Panel    | ![Inventory Dark](public/assets/previews/bytey_items.png) |
| Collectibles Panel | ![Collectibles Dark](public/assets/previews/bytey_collect.png) |

---

## Getting Started

Set up and run Bytey locally to explore or develop the template further.

### Prerequisites

- **Node.js**: Version 18.0 or higher
- **Package Manager**: `npm` or `yarn`

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/VoxDroid/Bytey
   ```

2. **Navigate to the Project Directory**
   ```bash
   cd Bytey
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

5. Open **[http://localhost:3000](http://localhost:3000)** in your browser to view Bytey.

---

## Usage

Bytey is a UI-focused template with minimal functionality. You can interact with the pet, view inventory, and explore tabs like Collectibles and Tasks, but full game logic (e.g., trading, stat progression) requires further development.

### Game Interface
- **Purpose**: Core UI where you see your pet and interact with inventory and tabs.
- **How to Use**: Check `components/index.tsx` for the main game layout and `components/pet-visual.tsx` for pet animations.

### Inventory Panel
- **Purpose**: Displays items and collectibles with basic filtering.
- **How to Use**: Modify `components/inventory-panel.tsx` to extend item interactions.

### Collectibles Panel
- **Purpose**: Shows collectibles with rarity and sorting options (UI only).
- **How to Use**: Update `components/collectibles-panel.tsx` to add functionality.

---

## Customization

Extend Bytey’s template by tweaking styles or adding logic.

### Changing Colors
Modify the dark-mode color scheme in `tailwind.config.ts`:

```typescript
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(220, 80%, 60%)", // Customize here
          foreground: "hsl(220, 10%, 95%)",
        },
      },
    },
  },
};
```

Adjust CSS variables in `app/globals.css`:

```css
:root {
  --primary: 220 80% 60%; /* Dark mode */
}
```

### Updating Content
Edit these files to customize the UI:
- Game: `components/index.tsx`
- Inventory: `components/inventory-panel.tsx`
- Collectibles: `components/collectibles-panel.tsx`
- Daily Tasks: `components/daily-tasks-panel.tsx`
- Shop: `components/shop-panel.tsx`

### Adding Collectibles
Add new collectibles to `lib/pet-store.ts` (or equivalent):

```typescript
const collectibles = [
  {
    id: "new-item",
    name: "New Collectible",
    description: "A shiny new item.",
    image: "new-icon",
    value: 100,
    rarity: "rare",
    owned: false,
  },
];
```

Update `components/collectibles-panel.tsx` for new icons:

```typescript
case "new-icon":
  return (
    <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 22h20L12 2z" />
    </svg>
  );
```

### Enhancing Animations
Tweak pet animations in `components/pet-visual.tsx`:

```typescript
const animationVariants = {
  idle: { y: [0, -10, 0], transition: { duration: 2, repeat: Infinity } },
  bounce: { y: [0, -20, 0], transition: { duration: 0.5, repeat: 3 } },
};
```

---

## Project Structure

```plaintext
Bytey/
├── app/                    # Next.js app directory
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # Reusable React components
│   ├── index.tsx           # Main game interface
│   ├── pet-visual.tsx      # Pet visualization
│   ├── status-bars.tsx     # Pet status bars
│   ├── action-buttons.tsx  # Interaction buttons
│   ├── inventory-panel.tsx # Inventory management
│   ├── collectibles-panel.tsx # Collectibles gallery
│   ├── daily-tasks-panel.tsx # Daily tasks
│   ├── shop-panel.tsx      # Shop interface
│   └── settings-panel.tsx  # Settings
├── lib/                    # Utilities and state management
│   └── pet-store.ts        # Zustand store for pet state
├── public/                 # Static assets
├── styles/                 # Additional CSS
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

---

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide Icons](https://lucide.dev/) - Icon set
- [Zustand](https://zustand-demo.pmnd.rs/) - State management

---

## Dependencies

Required packages (in `package.json`):
- `next` - Core framework
- `react`, `react-dom` - React libraries
- `typescript` - Type checking
- `tailwindcss` - Styling
- `framer-motion` - Animations
- `@lucide/react` - Icons
- `zustand` - State management

Install with:
```bash
npm install
```

---

## Releases

- See the [Releases page](https://github.com/VoxDroid/Bytey/releases) for updates.
- Currently a UI template; future releases may add full functionality.

---

## Current Limitations

- **Dark Mode Only**: No light mode implemented.
- **Minimal Functionality**: Basic game logic (e.g., pet stats, inventory display) works, but features like trading, GitHub integration, and pet evolution are UI-only.
- **Trading System**: Not implemented; requires backend and logic development.
- **Placeholder Data**: Stats, coins, and items are static or minimally interactive.

This template is a starting point for developers to build a fully functional app.

---

## License

Licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- [Lucide Icons](https://lucide.dev/) - Icon library
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Next.js](https://nextjs.org/) - Framework
- [Zustand](https://zustand-demo.pmnd.rs/) - State management

---

## Contact

Questions or feedback? Reach out:

- **GitHub**: [@VoxDroid](https://github.com/VoxDroid)
- **Email**: Contact via GitHub issues for now

---

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on how to contribute, and review our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a positive and inclusive community.

To contribute:
1. Fork the repository: [https://github.com/VoxDroid/Bytey](https://github.com/VoxDroid/Bytey)
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Add feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Open a pull request

---

## Support

For support, please refer to our [Support Guide](SUPPORT.md). If you encounter security issues, please review our [Security Policy](SECURITY.md).

If you find this project useful, consider supporting its development:

- **Ko-fi**: [Buy me a coffee](https://ko-fi.com/voxdroid)  
  [![Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/voxdroid)
- **Star the Repository**: Give it a star on [GitHub](https://github.com/VoxDroid/Bytey)
- **Report Issues**: Submit bugs or suggestions on the [Issues page](https://github.com/VoxDroid/Bytey/issues)

---

**Developed by VoxDroid**  
[GitHub](https://github.com/VoxDroid) | [Ko-fi](https://ko-fi.com/voxdroid)