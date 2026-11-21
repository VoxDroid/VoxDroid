# 🎮 Ultimate Tic-Tac-Toe

[中文](README/README_zh.md) | [日本語](README/README_jp.md) | [한국어](README/README_kr.md) | [Русский](README/README_ru.md) | [Español](README/README_es.md) | [Français](README/README_fr.md) | [Deutsch](README/README_de.md)

🌐 A Modern, Multilingual, and Feature-Rich Web-Based Tic-Tac-Toe Game 🌐

<div align="center">
  <img width="128px" src="https://raw.githubusercontent.com/VoxDroid/Ultimate-Tic-Tac-Toe/refs/heads/main/assets/logo/UT.png" alt="Ultimate Tic-Tac-Toe Logo">
</div>

<div align="center">
  <a href="https://github.com/VoxDroid/Ultimate-Tic-Tac-Toe/releases">
    <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000">
  </a>
  <a href="https://github.com/VoxDroid/Ultimate-Tic-Tac-Toe/blob/main/LICENSE">
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
  <a href="https://github.com/VoxDroid/Ultimate-Tic-Tac-Toe/stargazers">
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/VoxDroid/Ultimate-Tic-Tac-Toe?color=gold">
  </a>
  <a href="https://github.com/VoxDroid/Ultimate-Tic-Tac-Toe/network/members">
    <img alt="GitHub Forks" src="https://img.shields.io/github/forks/VoxDroid/Ultimate-Tic-Tac-Toe?color=silver">
  </a>
  <a href="https://github.com/VoxDroid/Ultimate-Tic-Tac-Toe/issues">
    <img alt="GitHub Issues" src="https://img.shields.io/github/issues/VoxDroid/Ultimate-Tic-Tac-Toe?color=orange">
  </a>
  <a href="https://github.com/VoxDroid/Ultimate-Tic-Tac-Toe/commits/main">
    <img alt="GitHub Commits" src="https://img.shields.io/github/commit-activity/m/VoxDroid/Ultimate-Tic-Tac-Toe">
  </a>
</div>

<div align="center">
  <a href="https://voxdroid.github.io/Ultimate-Tic-Tac-Toe/" target="_blank">
    <img src="https://img.shields.io/badge/Play%20Now-Ultimate%20Tic%20Tac%20Toe-brightgreen?style=for-the-badge" alt="Play Ultimate Tic-Tac-Toe">
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

**Ultimate Tic-Tac-Toe** is an open-source, web-based implementation of the classic Tic-Tac-Toe game, enhanced with modern features and a polished user experience. Built with HTML5, CSS3, and JavaScript, it offers multilingual support, customizable themes, an AI opponent, and gameplay enhancements like timers, score tracking, and undo functionality. Designed for players of all ages, it provides a fun and accessible way to enjoy Tic-Tac-Toe on any device.

Hosted on GitHub Pages, Ultimate Tic-Tac-Toe is available online without installation, but can also be run locally. As an open-source project, it welcomes contributions to improve features, fix bugs, or enhance accessibility.

> **Note**: This project is actively maintained. Some features, such as the AI's strategy or animation performance, may have limitations. Your feedback is appreciated!

## Features

- **Classic Tic-Tac-Toe Gameplay**: Standard 3x3 grid with X and O symbols, aiming for three in a row (horizontal, vertical, or diagonal).
- **Play Modes**:
  - Human vs. Human (local play on the same device).
  - Human vs. AI (basic random-move AI for the opponent).
- **Multilingual Support**: Available in 8 languages:
  - English, Chinese (中文), Japanese (日本語), Korean (한국어), Russian (Русский), Spanish (Español), French (Français), German (Deutsch).
- **Customizable UI**:
  - **Color Schemes**: Choose from Default, Dark, Light, or Colorful themes.
  - **Fonts**: Select from Poppins, Roboto, or Open Sans.
- **Game Features**:
  - **Timer**: Tracks game duration with start, stop, and reset controls.
  - **Score Tracking**: Displays wins for Player X, Player O, and draws.
  - **Undo Move**: Revert the last move during an active game.
  - **Player Names**: Customize names for Player X and Player O.
  - **Win Celebration**: Confetti animation on victory.
- **Settings**:
  - Change language, color scheme, or font via a settings modal.
  - Save preferences to local storage for persistence across sessions.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Visual Effects**:
  - Animated landing page with a loading effect and bubble background.
  - Highlighted winning cells for clear victory indication.
- **Accessibility**: Includes `data-i18n` attributes for translations and basic keyboard support.
- **No Ads**: A distraction-free gaming experience.

## System Requirements

To run Ultimate Tic-Tac-Toe, ensure you have:

- **Web Browser**: Modern browser (e.g., Chrome, Firefox, Edge, Safari) with JavaScript enabled.
- **Operating System**: Any (Windows, macOS, Linux, iOS, Android) with a compatible browser.
- **Disk Space**: Minimal (~5 MB for application files, including assets).
- **Internet Connection**: Required for initial asset loading (e.g., Google Fonts) unless hosted locally.
- **Dependencies**: None (all assets are loaded via CDNs or local files).

## Installation

Follow these steps to set up Ultimate Tic-Tac-Toe locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/VoxDroid/Ultimate-Tic-Tac-Toe.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd Ultimate-Tic-Tac-Toe
   ```

3. **Open the Application**:
   - Double-click `index.html` to open it in your default web browser.
   - Alternatively, serve the files using a local server (recommended for proper asset loading):
     ```bash
     python -m http.server 8000
     ```
     Then access `http://localhost:8000` in your browser.

4. **Verify Functionality**:
   - Ensure the landing page loads with the logo, title, and "Start Game" button.
   - Click "Start Game" to enter the game interface and test a move (e.g., place an X in a cell).
   - Check that the settings modal, language selector, and game controls (e.g., timer, undo) work.

> **Note**: Ensure CDN-loaded assets (e.g., Google Fonts) are accessible. For offline use, consider downloading fonts and hosting them locally.

## Getting Started

To start playing Ultimate Tic-Tac-Toe:

1. **Access the Game**:
   - Play online at [voxdroid.github.io/Ultimate-Tic-Tac-Toe](https://voxdroid.github.io/Ultimate-Tic-Tac-Toe/).
   - Or open `index.html` locally as described in [Installation](#installation).

2. **Navigate the Landing Page**:
   - Select a language from the dropdown (English by default).
   - Click "Start Game" to transition to the game interface with a loading animation.

3. **Explore the Interface**:
   - **Game Board**: A 3x3 grid for placing X or O symbols.
   - **Game Info Panel**: Includes player name inputs, timer, score display, and controls (undo, new game, AI move, reset score).
   - **Settings**: Access via the settings button to adjust language, color scheme, or font.
   - **Status Bar**: Shows the current player's turn or game outcome.

4. **Start a Game**:
   - Click "Start Game" to initialize the board.
   - Click a cell to place your symbol (X starts first).
   - Use the AI Move button to let the AI play as the opponent.

5. **Customize Settings**:
   - Open the settings modal to change the color scheme, font, or language.
   - Enter player names in the input fields.
   - Save settings automatically to local storage.

## Usage

### Playing a Game
- **Human vs. Human**:
  - Players alternate placing X or O in empty cells (X moves first).
  - Click a cell to make a move.
  - Aim for three symbols in a row (horizontal, vertical, or diagonal).
- **Human vs. AI**:
  - Play as X or O; click the "AI Move" button to let the AI make a random move.
  - The AI selects a random empty cell.
- **Controls**:
  - **New Game**: Resets the board and timer.
  - **Undo**: Reverts the last move (if the game is active).
  - **AI Move**: Triggers an AI move for the opponent.
  - **Start/Stop/Reset Timer**: Manages the game timer.
  - **Reset Score**: Clears the win/draw counters.

### Customization
- **Language**: Select from 8 languages via the dropdown on the landing page or game interface.
- **Color Scheme**: Choose Default, Dark, Light, or Colorful in the settings modal.
- **Font**: Switch between Poppins, Roboto, or Open Sans.
- **Player Names**: Enter custom names for Player X and Player O in the input fields.

### Game Features
- **Timer**: Displays elapsed time in MM:SS format, with controls to start, stop, or reset.
- **Score Tracking**: Tracks wins for X, O, and draws, displayed in the game info panel.
- **Undo Move**: Allows reverting the last move, preserving game state.
- **Win Celebration**: Triggers a confetti animation when a player wins.
- **Notifications**: Shows turn indicators, win messages, or draw/game-over alerts in the selected language.

## Demo

<div align="center">
  <img src="https://raw.githubusercontent.com/VoxDroid/Ultimate-Tic-Tac-Toe/refs/heads/main/assets/img/preview.png" alt="Ultimate Tic-Tac-Toe Gameplay" width="800">
</div>

Try Ultimate Tic-Tac-Toe live at [voxdroid.github.io/Ultimate-Tic-Tac-Toe](https://voxdroid.github.io/Ultimate-Tic-Tac-Toe/).

## Contributing

We welcome contributions to Ultimate Tic-Tac-Toe! To get involved:

- Review the [Contributing Guidelines](CONTRIBUTING.md) for details on submitting issues, feature requests, or pull requests.
- Fork the repository, make changes, and submit a pull request.
- Adhere to the [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a respectful community.

Example contributions:
- Enhance the AI with a smarter algorithm (e.g., minimax).
- Add new color schemes or fonts.
- Improve accessibility (e.g., ARIA attributes, keyboard navigation).
- Implement ultimate Tic-Tac-Toe rules (9x9 grid with sub-boards).

## Security

Security is a priority for Ultimate Tic-Tac-Toe. If you discover a vulnerability:

- Report it privately as outlined in the [Security Policy](SECURITY.md).
- Avoid public disclosure until the issue is resolved.

## Code of Conduct

All contributors and users are expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md) to maintain a welcoming and inclusive environment.

## Support

Need help with Ultimate Tic-Tac-Toe? Visit the [Support page](SUPPORT.md) for resources, including:

- Filing bug reports or feature requests.
- Community discussions and contact information.
- FAQs for common issues (e.g., AI behavior, timer issues).

## License

Ultimate Tic-Tac-Toe is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Google Fonts**: For providing Poppins, Roboto, and Open Sans fonts.
- **VoxDroid**: For creating and maintaining the project.
- **Contributors**: Thanks to all who report issues, suggest features, or contribute code.
- **Tic-Tac-Toe Community**: For inspiring this project with resources and ideas.

---

<div align="center">
  <p><strong>Developed by <a href="https://github.com/VoxDroid">VoxDroid</a></strong></p>
  <p>Enjoying Ultimate Tic-Tac-Toe? Star the project on <a href="https://github.com/VoxDroid/Ultimate-Tic-Tac-Toe">GitHub</a>!</p>
</div>