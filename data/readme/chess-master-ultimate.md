# Chess Master Ultimate

![Chess Master Ultimate Preview](public/images/logo/CMU.png)

A modern, feature-rich chess application built with **Next.js** and **React**. Designed for chess players of all levels, it offers a soft, responsive interface, customizable settings, multilingual support, and a smooth gameplay experience.

### **Live Demo**: Check out the deployed version at [chess-master-ultimate.vercel.app](https://chess-master-ultimate.vercel.app) 

---

## Badges

[![Next.js](https://img.shields.io/badge/Next.js-14+-000000.svg?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4+-3178C6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat)](https://github.com/VoxDroid/Chess-Master-Ultimate/blob/main/LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/VoxDroid/Chess-Master-Ultimate.svg?style=flat)](https://github.com/VoxDroid/Chess-Master-Ultimate)
[![GitHub Issues](https://img.shields.io/github/issues/VoxDroid/Chess-Master-Ultimate.svg?style=flat)](https://github.com/VoxDroid/Chess-Master-Ultimate/issues)
[![Last Commit](https://img.shields.io/github/last-commit/VoxDroid/Chess-Master-Ultimate.svg?style=flat)](https://github.com/VoxDroid/Chess-Master-Ultimate/commits/main)
[![Downloads](https://img.shields.io/github/downloads/VoxDroid/Chess-Master-Ultimate/total.svg?style=flat)](https://github.com/VoxDroid/Chess-Master-Ultimate/releases)
[![Live Demo](https://img.shields.io/badge/Live_Demo-chess--master--ultimate.vercel.app-58a6ff.svg?style=flat&logo=vercel)](https://chess-master-ultimate.vercel.app)

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

- Interactive Chess Board: Drag-and-drop or click-to-move piece movement.
- Game Rules Enforcement: Full chess rules including castling, en passant, and checkmate detection.
- Multilingual Support: Available in 12 languages for global accessibility.
- Customizable Themes: Light, dark, or system theme options.
- Responsive Design: Optimized for desktop, tablet, and mobile devices.
- Game Timer: Optional 10-minute timer for timed matches.
- Move History: Real-time tracking in standard chess notation.
- Game Statistics: Displays captured pieces, move count, and game phase.
- Particle Background: Dynamic, interactive background animation.
- Keyboard Shortcuts: Comprehensive controls for all major actions.
- Fullscreen Mode: Toggle for a distraction-free experience.
- Accessibility Features: Tooltips and built-in help system.
- High Performance: Fast load times and smooth gameplay.

---

## Screenshots

| Feature            | Light Mode                          | Dark Mode                          |
|--------------------|-------------------------------------|------------------------------------|
| Home Screen        |![Light Mode](public/images/screenshots/cmu_home_w.png)|![Dark Mode](public/images/screenshots/cmu_home_b.png)|
| Game Screen        |![History Light](public/images/screenshots/cmu_game_w.png)|![History Dark](public/images/screenshots/cmu_game_b.png)|

---

## Getting Started

Set up and run Chess Master Ultimate locally with these steps.

### Prerequisites

- **Node.js**: Version 18.0 or higher
- **Package Manager**: `npm` or `yarn`

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/VoxDroid/Chess-Master-Ultimate.git
   ```

2. **Navigate to the Project Directory**
   ```bash
   cd Chess-Master-Ultimate
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

5. Open **[http://localhost:3000](http://localhost:3000)** in your browser to start playing.

---

## Usage

Once the application is running, you can explore and customize it. Below are key sections and how to use them effectively.

### Getting Started
- Launch the development server as described above.
- Click "Start Playing" on the home page to begin a game with white to move.
- Use the board controls or keyboard shortcuts to play.

### Chess Board
- **Purpose**: Play chess with an interactive board.
- **How to Use**: Click a piece to select it, then click a valid square to move. Drag-and-drop also supported.

### Game Controls
- **Purpose**: Manage gameplay with intuitive controls.
- **How to Use**: Use buttons below the board to undo, redo, reset, flip, or toggle fullscreen mode.

### Settings
- **Purpose**: Customize the game experience.
- **How to Use**: Access the settings menu to adjust themes, fonts, language, and timer options.

---

## Customization

Tailor Chess Master Ultimate to your preferences.

### Changing Colors
Modify the theme in `tailwind.config.ts`:

```typescript
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(210, 50%, 50%)", // Customize here
          foreground: "hsl(210, 10%, 95%)",
        },
      },
    },
  },
};
```

Adjust CSS variables in `styles/global.css`:

```css
:root {
  --primary: 210 50% 50%; /* Light mode */
}

.dark {
  --primary: 210 50% 60%; /* Dark mode */
}
```

### Updating Content
Edit these files to tweak the UI:
- Chessboard: `components/custom-chessboard.tsx`
- Stats: `components/game-stats.tsx`
- Move History: `components/move-history.tsx`
- Translations: `lib/translations.ts`

### Customizing Particle Background
Adjust the animation in `components/particle-background.tsx` (if implemented separately):

```typescript
const particleCount = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 10000));
const colors = [
  "rgba(0, 102, 204, 0.5)", // Adjust colors
  "rgba(51, 153, 255, 0.5)",
];
```

---

## Project Structure

```plaintext
chess-master-ultimate/
├── app/                  # Next.js app directory
│   ├── game/             # Game page
│   ├── providers.tsx     # Context providers
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # Reusable React components
│   ├── custom-chessboard.tsx  # Chess board component
│   ├── game-stats.tsx    # Game statistics widget
│   ├── move-history.tsx  # Move history widget
│   └── ...               # Other UI components
├── lib/                  # Utility functions
│   └── translations.ts   # Translation system
├── hooks/                # Custom React hooks
├── public/               # Static assets
│   ├── images/           # Images and icons
│   └── ...               # Other public files
├── styles/               # Global styles
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

---

## Built With

- [Next.js](https://nextjs.org/) - React framework for production-grade apps
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript for reliability
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [chess.js](https://github.com/jhlywa/chess.js) - Chess logic engine
- [tsparticles](https://particles.js.org/) - Particle effects
- [react-hotkeys-hook](https://github.com/JohannesKlauss/react-hotkeys-hook) - Keyboard shortcuts
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
- `chess.js` - Chess logic
- `tsparticles` - Particle effects
- `react-hotkeys-hook` - Keyboard shortcuts
- `@lucide/react` - Icons
- Various `shadcn/ui` dependencies (e.g., `@radix-ui/*`)

Install them with:
```bash
npm install
```

---

## Releases

- Check the [Releases page](https://github.com/VoxDroid/Chess-Master-Ultimate/releases) for versioned updates.
- Each release includes notes on new features, bug fixes, and improvements.
- The source code is the primary distribution method; no pre-built binaries are provided.

---

## Key Features Explained

### Interactive Chess Board
A fully functional board with drag-and-drop or click-to-move mechanics, powered by `chess.js` and `custom-chessboard.tsx`.

### Multilingual Support
Supports 12 languages with a custom translation system in `lib/translations.ts`.

### Particle Background
Dynamic particle effects using `tsparticles`, enhancing visual appeal.

### Keyboard Shortcuts
Comprehensive controls implemented with `react-hotkeys-hook` for efficient gameplay.

---

## License

This project is licensed under the [MIT License](LICENSE). See the license file for details.

---

## Acknowledgments

- [chess.js](https://github.com/jhlywa/chess.js) - Robust chess logic
- [tsparticles](https://particles.js.org/) - Particle animations
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
1. Fork the repository: [https://github.com/VoxDroid/Chess-Master-Ultimate](https://github.com/VoxDroid/Chess-Master-Ultimate)
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
- **Star the Repository**: Give it a star on [GitHub](https://github.com/VoxDroid/Chess-Master-Ultimate)  
- **Report Issues**: Submit bugs or suggestions on the [Issues page](https://github.com/VoxDroid/Chess-Master-Ultimate/issues)

---

**Developed by VoxDroid**  
[GitHub](https://github.com/VoxDroid) | [Ko-fi](https://ko-fi.com/izeno)  
© 2025 Chess Master Ultimate. All rights reserved.