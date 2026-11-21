# ♟️ Chess Ultimate

[![English](https://img.shields.io/badge/Language-English-blue?style=for-the-badge)](README/README.md)
[![Español](https://img.shields.io/badge/Idioma-Español-green?style=for-the-badge)](README/README_espanol.md)
[![Français](https://img.shields.io/badge/Langue-Français-red?style=for-the-badge)](README/README_francais.md)
[![Deutsch](https://img.shields.io/badge/Sprache-Deutsch-yellow?style=for-the-badge)](README/README_deutsch.md)
[![日本語](https://img.shields.io/badge/言語-日本語-orange?style=for-the-badge)](README/README_japanese.md)
[![한국어](https://img.shields.io/badge/언어-한국어-purple?style=for-the-badge)](README/README_korean.md)
[![中文](https://img.shields.io/badge/语言-中文-brown?style=for-the-badge)](README/README_chinese.md)

---

🌐 A Modern, Feature-Rich Web-Based Chess Game for All Players 🌐

<div align="center">
  <img width="128px" src="https://raw.githubusercontent.com/VoxDroid/Chess-Ultimate/refs/heads/main/assets/logo/logo.png" alt="Chess Ultimate Logo">
</div>

<div align="center">
  <a href="https://github.com/VoxDroid/Chess-Ultimate/releases">
    <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000">
  </a>
  <a href="https://github.com/VoxDroid/Chess-Ultimate/blob/main/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
  <a href="https://html.spec.whatwg.org/">
    <img alt="Built with: HTML5" src="https://img.shields.io/badge/Built%20with-HTML5-E34F26?logo=html5&logoColor=white">
  </a>
  <a href="https://www.w3.org/Style/CSS/Overview.en.html">
    <img alt="Styled with: CSS3" src="https://img.shields.io/badge/Styled%20with-CSS3-1572B6?logo=css3&logoColor=white">
  </a>
  <a href="https://javascript.info/">
    <img alt="Powered by: JavaScript" src="https://img.shields.io/badge/Powered%20by-JavaScript-F7DF1E?logo=javascript&logoColor=black">
  </a>
</div>

<div align="center">
  <a href="https://github.com/VoxDroid/Chess-Ultimate/stargazers">
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/VoxDroid/Chess-Ultimate?color=gold">
  </a>
  <a href="https://github.com/VoxDroid/Chess-Ultimate/network/members">
    <img alt="GitHub Forks" src="https://img.shields.io/github/forks/VoxDroid/Chess-Ultimate?color=silver">
  </a>
  <a href="https://github.com/VoxDroid/Chess-Ultimate/issues">
    <img alt="GitHub Issues" src="https://img.shields.io/github/issues/VoxDroid/Chess-Ultimate?color=orange">
  </a>
  <a href="https://github.com/VoxDroid/Chess-Ultimate/commits/main">
    <img alt="GitHub Commits" src="https://img.shields.io/github/commit-activity/m/VoxDroid/Chess-Ultimate">
  </a>
</div>

<div align="center">
  <a href="https://voxdroid.github.io/Chess-Ultimate/" target="_blank">
    <img src="https://img.shields.io/badge/Play%20Now-Chess%20Ultimate-brightgreen?style=for-the-badge" alt="Play Chess Ultimate">
  </a>
</div>

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Demo](#demo)
- [Contributing](#contributing)
- [Security](#security)
- [Code of Conduct](#code-of-conduct)
- [Support](#support)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Introduction

**Chess Ultimate** is an open-source, web-based chess game designed to provide a seamless and engaging experience for players of all skill levels. Built with HTML5, CSS3, and JavaScript, it adheres to classic chess rules while offering modern features like multilingual support, customizable themes, and an AI opponent. The game is responsive, works across devices, and includes advanced functionalities such as move history, timers, and pawn promotion, making it ideal for casual play, learning, or competitive practice.

Hosted on GitHub Pages, Chess Ultimate is accessible online without installation, though it can also be run locally. As an open-source project, it encourages contributions to enhance its features, fix bugs, or improve accessibility.

> **Note**: This project is under active development. Some features (e.g., sound effects, AI sophistication) may have limitations or bugs. Your feedback is invaluable!

## Features

- **Classic Chess Gameplay**: Implements standard chess rules, including castling, en passant, and pawn promotion.
- **Play Modes**:
  - Human vs. Human (local play on the same device).
  - Human vs. AI (basic random-move AI for black pieces).
- **Multilingual Support**: Available in English, Spanish, French, German, Japanese, Korean, and Chinese.
- **Customizable UI**:
  - **Color Schemes**: Choose from 23 themes (e.g., Blue, Rainbow, Galaxy, Vintage).
  - **Piece Styles**: Select from Unicode, Classic, Modern, Aesthetic, Pixel, 2D Brown & White, or 3D Brown & White.
  - **Board Size**: Adjust board size via a slider (50–100 vmin).
- **Game Features**:
  - **Move History**: Tracks moves in standard algebraic notation, with support for undo/redo.
  - **Timers**: Optional 10-minute timers for white and black, with start/pause functionality.
  - **Captured Pieces**: Displays captured pieces for both players.
  - **Analysis Bar**: Visualizes material balance based on piece values.
  - **Pawn Promotion**: Interactive modal for choosing Queen, Rook, Bishop, or Knight.
- **Settings**:
  - Toggle board labels (ranks/files).
  - Adjust animation speed (0.1x to 2x).
  - Enable/disable sound effects (note: audio paths are currently invalid).
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Visual Effects**:
  - Animated piece movements with customizable speed.
  - Particle.js background for a dynamic landing page.
  - Flashing squares for move feedback.
- **Accessibility**: Keyboard-navigable controls and ARIA attributes for screen readers.
- **Local Storage**: Saves settings (language, theme, piece style, etc.) across sessions.
- **No Ads**: A distraction-free experience.

## System Requirements

To run Chess Ultimate, ensure you have:

- **Web Browser**: Modern browser (e.g., Chrome, Firefox, Edge, Safari) with JavaScript enabled.
- **Operating System**: Any (Windows, macOS, Linux, iOS, Android) with a compatible browser.
- **Disk Space**: Minimal (~5 MB for the application files, including assets).
- **Internet Connection**: Required for initial asset loading (e.g., Bootstrap, Font Awesome) unless hosted locally.
- **Dependencies**: None (all assets are loaded via CDNs or local files).

## Installation

Follow these steps to set up Chess Ultimate locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/VoxDroid/Chess-Ultimate.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd Chess-Ultimate
   ```

3. **Open the Application**:
   - Double-click `index.html` to open it in your default web browser.
   - Alternatively, serve the files using a local server (recommended for proper asset loading):
     ```bash
     python -m http.server 8000
     ```
     Then access `http://localhost:8000` in your browser.

4. **Verify Functionality**:
   - Ensure the landing page loads with the logo and "Play Game" button.
   - Click "Play" to start a game and test a move (e.g., move a pawn from e2 to e4).
   - Check that the navbar, settings, and game info panel are functional.

> **Note**: Sound effects are currently disabled due to invalid audio file paths in `chess_script.js`. Update the `SOUND_EFFECTS` object to point to valid `.mp3` files to enable them.

## Getting Started

To start playing Chess Ultimate:

1. **Access the Game**:
   - Play online at [voxdroid.github.io/Chess-Ultimate](https://voxdroid.github.io/Chess-Ultimate/).
   - Or open `index.html` locally as described in [Installation](#installation).

2. **Navigate the Landing Page**:
   - Click the "Play Game" button to enter the game interface.
   - The landing page features a logo with a floating animation and a particle.js background.

3. **Explore the Interface**:
   - **Navbar**: Access language, color scheme, piece style, settings, and game info toggles.
   - **Chessboard**: Displays an 8x8 board with optional rank/file labels.
   - **Game Info Panel**: Shows timers, move history, analysis bar, and controls (new game, undo, redo, flip board, AI move).
   - **Captured Pieces**: Lists pieces captured by each player.

4. **Start a Game**:
   - Click "Play Game" to initialize a new board.
   - Move pieces by clicking a piece and then a valid destination square.
   - Use the AI Move button to let the AI (black) make a random move.

5. **Customize Settings**:
   - Open the settings modal via the cog icon.
   - Adjust board size, animation speed, sound effects, or toggle labels.
   - Save settings automatically to local storage.

## Usage

### Playing a Game
- **Human vs. Human**:
  - Players take turns moving pieces (white moves first).
  - Click a piece to highlight valid moves, then click a destination square.
  - Special moves (castling, en passant, promotion) are supported.
- **Human vs. AI**:
  - Play as white; click the "AI Move" button to let the AI move black pieces.
  - The AI currently selects random valid moves with a 1.5-second delay.
- **Controls**:
  - **New Game**: Resets the board and timers.
  - **Undo/Redo**: Reverts or reapplies the last move.
  - **Flip Board**: Switches the board orientation (white/black perspective).
  - **Start/Pause Timer**: Activates 10-minute timers for each player.
  - **AI Move**: Triggers an AI move for black.

### Customization
- **Language**: Select from 7 languages via the navbar dropdown.
- **Color Scheme**: Choose from 23 themes to style the board and UI.
- **Piece Style**: Switch between Unicode or image-based piece sets.
- **Settings**:
  - Toggle board labels for ranks (1-8) and files (a-h).
  - Adjust board size using the slider or +/- buttons.
  - Set animation speed for piece movements.
  - Enable/disable sound effects (requires valid audio files).

### Game Features
- **Move History**: View moves in algebraic notation (e.g., "e4", "Nxf3").
- **Timers**: Track time for each player (10 minutes default).
- **Analysis Bar**: Shows material advantage based on piece values (Pawn=1, Knight/Bishop=3, Rook=5, Queen=9).
- **Captured Pieces**: Displays captured pieces with the selected piece style.
- **Pawn Promotion**: Choose a piece when a pawn reaches the opponent’s back rank.
- **Notifications**: Alerts for check, checkmate, stalemate, or turn changes.

## Demo

<div align="center">
  <img src="https://raw.githubusercontent.com/VoxDroid/Chess-Ultimate/refs/heads/main/assets/demo/en_cub.png" alt="Chess Ultimate Gameplay" width="800">
</div>

Try Chess Ultimate live at [voxdroid.github.io/Chess-Ultimate](https://voxdroid.github.io/Chess-Ultimate/).

## Contributing

We welcome contributions to Chess Ultimate! To get involved:

- Review the [Contributing Guidelines](CONTRIBUTING.md) for details on submitting issues, feature requests, or pull requests.
- Fork the repository, make changes, and submit a pull request.
- Adhere to the [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a respectful community.

Example contributions:
- Improve the AI with a stronger algorithm (e.g., minimax with alpha-beta pruning).
- Fix sound effect paths or add new audio files.
- Enhance accessibility (e.g., better ARIA support, keyboard navigation).
- Add new piece styles or color schemes.

## Security

Security is a priority for Chess Ultimate. If you discover a vulnerability:

- Report it privately as outlined in the [Security Policy](SECURITY.md).
- Avoid public disclosure until the issue is resolved.

## Code of Conduct

All contributors and users are expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md) to maintain a welcoming and inclusive environment.

## Support

Need help with Chess Ultimate? Visit the [Support page](SUPPORT.md) for resources, including:

- Filing bug reports or feature requests.
- Community discussions and contact information.
- FAQs for common issues (e.g., sound effects, AI behavior).

## License

Chess Ultimate is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Bootstrap**: For responsive layout and UI components.
- **Font Awesome**: For icons used in the navbar and controls.
- **Google Fonts**: For the Poppins font family.
- **particles.js**: For the dynamic landing page background.
- **VoxDroid**: For creating and maintaining the project.
- **Contributors**: Thanks to all who report issues, suggest features, or contribute code.
- **Chess Community**: For inspiring this project with resources like [chess.com](https://www.chess.com/learn-how-to-play-chess).

---

<div align="center">
  <p><strong>Developed by <a href="https://github.com/VoxDroid">VoxDroid</a></strong></p>
  <p>Enjoying Chess Ultimate? Star the project on <a href="https://github.com/VoxDroid/Chess-Ultimate">GitHub</a>!</p>
</div>