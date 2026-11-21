# Number System Converter v1

🌐 A Comprehensive Web Application for Number System Conversion and Bitwise Operations 🌐

<div align="center">
  <img width="128px" src="https://raw.githubusercontent.com/VoxDroid/Number-Systems-Converter/main/img/nsc.png" alt="Number System Converter Logo">
</div>

<div align="center">
  <a href="https://github.com/VoxDroid/Number-Systems-Converter/releases">
    <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000">
  </a>
  <a href="https://github.com/VoxDroid/Number-Systems-Converter/blob/main/LICENSE">
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
  <a href="https://ko-fi.com/O4O6LO7Q1" target="_blank">
    <img src="https://ko-fi.com/img/githubbutton_sm.svg" alt="Support on Ko-fi" style="border: 0;">
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

**Number System Converter v1** is a feature-rich web application designed to simplify number system conversions and bitwise operations. Built with HTML5, CSS3, and JavaScript, it offers an intuitive interface for converting numbers between binary, octal, decimal, hexadecimal, and custom bases (2-36). Additionally, it supports a wide range of bitwise operations, detailed conversion explanations, and a history tracker, making it an ideal tool for students, developers, and enthusiasts.

The application features a responsive design, customizable themes, and optional animations like a matrix-style background, ensuring an engaging user experience. As an open-source project, it welcomes contributions to enhance its functionality and reach.

## Features

- **Number System Conversion**: Convert numbers between binary, octal, decimal, hexadecimal, base32, base36, and custom bases (2-36) with real-time validation.
- **Bitwise Operations**: Perform operations like AND, OR, XOR, NOT, left shift, right shift, addition, subtraction, multiplication, and division on binary inputs.
- **Conversion Table**: Display conversions for bases 2 through 36 in a clear, tabular format.
- **Explanation System**: View step-by-step explanations for conversions and bitwise operations, aiding learning and debugging.
- **History Tracking**: Maintain a record of recent conversions and bitwise operations, stored in local storage (up to 10 entries per type).
- **Customizable UI**:
  - Toggle between light and dark themes.
  - Choose from multiple theme colors (blue, green, red, orange, purple).
  - Enable/disable matrix background animation for a futuristic aesthetic.
- **Auto-Convert**: Optionally enable automatic conversion as you type, streamlining workflows.
- **Sound Effects**: Toggle sound feedback for successful conversions or errors (note: audio file path needs updating).
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices with a collapsible sidebar.
- **Tooltips**: Interactive tooltips guide users through key actions like converting or calculating.
- **Local Storage**: Persist history and settings across sessions using browser local storage.

## System Requirements

To run Number System Converter v1, ensure you have:

- **Web Browser**: Modern browser (e.g., Chrome, Firefox, Edge, Safari) with JavaScript enabled.
- **Operating System**: Any (Windows, macOS, Linux, iOS, Android) with a compatible browser.
- **Disk Space**: Minimal (~1 MB for the application files).
- **Internet Connection**: Optional (required only for initial asset loading, e.g., Font Awesome, Google Fonts).
- **Dependencies**: None (all assets are loaded via CDNs or local files).

## Installation

Follow these steps to set up Number System Converter v1 locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/VoxDroid/Number-Systems-Converter.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd Number-Systems-Converter
   ```

3. **Open the Application**:
   - Double-click `index.html` to open it in your default web browser.
   - Alternatively, serve the files using a local server (e.g., with Python):
     ```bash
     python -m http.server 8000
     ```
     Then access `http://localhost:8000` in your browser.

4. **Verify Functionality**:
   - Ensure the interface loads, and test a conversion (e.g., enter "42" in decimal and convert).
   - Check that all sections (Bitwise Operation, Conversion Table, etc.) are accessible.

> **Note**: If sound effects are enabled, update the `playSound` function in `script.js` to point to valid audio files, as the current `hellnaw` path is invalid.

## Getting Started

To start using Number System Converter v1:

1. **Open the Application**:
   - Launch `index.html` in a web browser.

2. **Explore Sections**:
   - Use the sidebar to navigate between Number System Converter, Bitwise Operation, Conversion Table, Explanation System, and History.

3. **Perform a Conversion**:
   - Enter a number (e.g., "1010" for binary).
   - Select the input base (e.g., Binary).
   - Click "Convert" to see results in multiple bases.

4. **Try a Bitwise Operation**:
   - Enter two binary numbers (e.g., "1010" and "1100").
   - Select an operation (e.g., AND).
   - Click "Calculate" to view the result.

5. **Customize Settings**:
   - Toggle the theme (light/dark) using the theme button.
   - Enable matrix animation or auto-convert from the settings panel.
   - Choose a theme color from the color picker.

## Usage

### Number System Conversion
- **Input**: Enter a number in the "Input Number" field.
- **Base Selection**: Choose the input base (Binary, Octal, Decimal, Hexadecimal, or Custom).
- **Custom Base**: For custom bases, specify a value between 2 and 36.
- **Convert**: Click the "Convert" button to display results in binary, octal, decimal, hexadecimal, base32, and base36.
- **Auto-Convert**: Enable auto-convert in settings to update results as you type.
- **History**: View past conversions in the History section under "Conversion History."

### Bitwise Operations
- **Inputs**: Enter two binary numbers (except for NOT, which uses only the first input).
- **Operation**: Select from addition, subtraction, multiplication, division, AND, OR, XOR, NOT, left shift, or right shift.
- **Calculate**: Click "Calculate" to see the result in binary, decimal, 1's complement, and 2's complement.
- **History**: Check past operations in the History section under "Bitwise History."

### Conversion Table
- Displays the input number converted to bases 2 through 36 in a table format.
- Updates automatically after each conversion.

### Explanation System
- Provides detailed, step-by-step explanations for conversions and bitwise operations.
- Includes mathematical processes (e.g., decimal-to-binary division steps).

### Settings
- **Theme**: Toggle light/dark mode or select a custom color.
- **Matrix Animation**: Enable/disable the background matrix effect.
- **Auto-Convert**: Toggle automatic conversions on input change.
- **Sound Effects**: Enable/disable audio feedback (requires valid audio files).

## Demo

<div align="center">
  <img src="https://raw.githubusercontent.com/VoxDroid/Number-Systems-Converter/main/img/preview.png" alt="Number System Converter Interface" width="800">
</div>

## Contributing

We welcome contributions to Number System Converter v1! To get involved:

- Review the [Contributing Guidelines](CONTRIBUTING.md) for details on submitting issues, feature requests, or pull requests.
- Fork the repository, make changes, and submit a pull request.
- Adhere to the [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a respectful community.

## Security

Security is important for Number System Converter v1. If you discover a vulnerability:

- Report it privately as outlined in the [Security Policy](SECURITY.md).
- Avoid public disclosure until the issue is resolved.

## Code of Conduct

All contributors and users are expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md) to maintain a welcoming and inclusive environment.

## Support

Need help with Number System Converter v1? Visit the [Support page](SUPPORT.md) for resources, including:

- Filing bug reports or feature requests.
- Community discussions and contact information.
- FAQs for common issues.

You can also support the project by donating via [Ko-fi](https://ko-fi.com/O4O6LO7Q1).

## License

Number System Converter v1 is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Font Awesome**: For providing the icon set used in the interface.
- **Google Fonts**: For the Poppins font family, enhancing typography.
- **VoxDroid (Izeno)**: For creating and maintaining the project.
- **Contributors**: Gratitude to all who report issues, suggest features, or contribute code.

---

<div align="center">
  <p><strong>Developed by <a href="https://github.com/VoxDroid">Izeno</a></strong></p>
  <p>Love Number System Converter v1? Consider supporting the project!</p>
  <a href="https://ko-fi.com/O4O6LO7Q1" target="_blank">
    <img src="https://ko-fi.com/img/githubbutton_sm.svg" alt="Support on Ko-fi" style="border: 0;">
  </a>
</div>