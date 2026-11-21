# 📜 vox-md

🌟 A Rust-Based CLI Tool to Convert Markdown Files to PDF with Customizable Formatting and Templates 🌟

<div align="center">
  <a href="https://github.com/VoxDroid/vox-md/releases">
    <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000">
  </a>
  <a href="https://github.com/VoxDroid/vox-md/blob/main/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
  <a href="https://www.rust-lang.org/">
    <img alt="Built with: Rust" src="https://img.shields.io/badge/Built%20with-Rust-000000?logo=rust&logoColor=white">
  </a>
</div>

<div align="center">
  <a href="https://github.com/VoxDroid/vox-md/stargazers">
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/VoxDroid/vox-md?color=gold">
  </a>
  <a href="https://github.com/VoxDroid/vox-md/network/members">
    <img alt="GitHub Forks" src="https://img.shields.io/github/forks/VoxDroid/vox-md?color=silver">
  </a>
  <a href="https://github.com/VoxDroid/vox-md/issues">
    <img alt="GitHub Issues" src="https://img.shields.io/github/issues/VoxDroid/vox-md?color=orange">
  </a>
  <a href="https://github.com/VoxDroid/vox-md/commits/main">
    <img alt="GitHub Commits" src="https://img.shields.io/github/commit-activity/m/VoxDroid/vox-md">
  </a>
</div>

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [Security](#security)
- [Code of Conduct](#code-of-conduct)
- [Support](#support)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Introduction

**vox-md** is an open-source command-line interface (CLI) tool written in Rust that converts Markdown files to professionally formatted PDF documents. Leveraging the `pulldown-cmark` library for Markdown parsing and `wkhtmltopdf` for PDF generation, it offers customizable templates, page sizes, margins, font sizes, and orientations. Designed for developers, writers, and documentation enthusiasts, vox-md simplifies the process of creating polished PDFs from Markdown with minimal setup.

The tool supports three built-in HTML templates (`default`, `modern`, `minimal`) for styling, and users can create custom templates for further personalization. With verbose logging and robust error handling, vox-md ensures a reliable and user-friendly experience.

> **Note**: This project is actively maintained. It requires `wkhtmltopdf` to be installed on your system. Contributions to add new features, templates, or improve performance are welcome!

## Features

- **Markdown to PDF Conversion**:
  - Parses Markdown files using `pulldown-cmark` and converts them to HTML.
  - Generates PDFs using `wkhtmltopdf` with high-quality rendering.
- **Customizable Output**:
  - Supports multiple page sizes: A4, Letter, Legal.
  - Configurable margins (in millimeters).
  - Portrait or landscape orientation.
  - Custom document title and base font size.
- **Template System**:
  - Includes three built-in templates: `default`, `modern`, `minimal`.
  - Allows custom HTML templates stored in the `templates/` directory.
  - Templates support dynamic font size substitution.
- **Command-Line Interface**:
  - Built with `structopt` for intuitive argument parsing.
  - Supports flags for input/output paths, template selection, and verbose logging.
- **Error Handling**:
  - Validates input (`.md` extension) and output (`.pdf` extension) files.
  - Provides clear error messages for missing files, invalid templates, or configuration issues.
- **Verbose Mode**:
  - Detailed logs for debugging (e.g., template loading, PDF generation steps).
- **Cross-Platform**:
  - Runs on Windows, macOS, and Linux with `wkhtmltopdf` installed.
- **Lightweight**:
  - Minimal dependencies and efficient Rust implementation.

## System Requirements

To run vox-md, ensure you have:

- **Operating System**: Windows, macOS, or Linux.
- **Rust**: Stable toolchain (version 1.56 or higher recommended).
- **wkhtmltopdf**: Installed and accessible in your system PATH.
  - Install via package manager:
    - Ubuntu/Debian: `sudo apt-get install wkhtmltopdf`
    - macOS: `brew install wkhtmltopdf`
    - Windows: Download from [wkhtmltopdf.org](https://wkhtmltopdf.org/downloads.html)
- **Disk Space**: ~10 MB for the compiled binary, templates, and dependencies (output PDFs vary by content).
- **Dependencies** (managed by Cargo):
  - `pulldown-cmark`: Markdown parsing.
  - `wkhtmltopdf`: PDF generation.
  - `structopt`: CLI argument parsing.
- **Input Files**:
  - Markdown files with `.md` extension.
  - Optional: Custom HTML templates in the `templates/` directory.

## Installation

Follow these steps to install and set up vox-md:

1. **Install Rust**:
   - Install the Rust toolchain via [rustup](https://rustup.rs/):
     ```bash
     curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
     ```
   - Update Rust:
     ```bash
     rustup update
     ```

2. **Install wkhtmltopdf**:
   - Linux (Ubuntu/Debian):
     ```bash
     sudo apt-get update
     sudo apt-get install wkhtmltopdf
     ```
   - macOS:
     ```bash
     brew install wkhtmltopdf
     ```
   - Windows: Download and install from [wkhtmltopdf.org](https://wkhtmltopdf.org/downloads.html), then add to PATH.

3. **Clone the Repository**:
   ```bash
   git clone https://github.com/VoxDroid/vox-md.git
   ```

4. **Navigate to the Project Directory**:
   ```bash
   cd vox-md
   ```

5. **Build the Project**:
   ```bash
   cargo build --release
   ```
   The compiled binary will be located at `target/release/vox-md`.

6. **(Optional) Install Globally**:
   - Copy the binary to a directory in your PATH (e.g., `/usr/local/bin` on Linux/macOS):
     ```bash
     sudo cp target/release/vox-md /usr/local/bin/
     ```

7. **Verify Installation**:
   ```bash
   vox-md --help
   ```
   This should display the CLI help message with available options.

8. **Prepare Templates**:
   - Ensure the `templates/` directory contains `default.html`, `modern.html`, and `minimal.html`.
   - Example template structure:
     ```html
     <!DOCTYPE html>
     <html>
     <head>
         <style>
             body { font-size: {{FONT_SIZE}}pt; }
         </style>
     </head>
     <body>
         {{CONTENT}}
     </body>
     </html>
     ```

> **Note**: If `wkhtmltopdf` is not in your PATH, you may need to specify its location via environment variables or update your system configuration.

## Getting Started

To start using vox-md:

1. **Prepare a Markdown File**:
   - Create a sample Markdown file (e.g., `sample.md`):
     ```markdown
     # My Document
     This is a **sample** Markdown file.
     - Item 1
     - Item 2
     ```

2. **Run vox-md**:
   - Convert `sample.md` to `output.pdf` using the default template:
     ```bash
     vox-md sample.md
     ```
   - Specify a custom output path and template:
     ```bash
     vox-md sample.md -o mydoc.pdf --template modern --page-size Letter
     ```

3. **Explore Options**:
   - Use verbose mode for detailed logs:
     ```bash
     vox-md sample.md -v
     ```
   - Customize margins and font size:
     ```bash
     vox-md sample.md --margin 20 --font-size 14
     ```
   - Set landscape orientation and title:
     ```bash
     vox-md sample.md --orientation landscape --title "My Custom Document"
     ```

4. **Verify Output**:
   - Open the generated PDF (e.g., `output.pdf`) in a PDF viewer.
   - Check formatting, template styling, and content accuracy.

## Usage

### Basic Command
Convert a Markdown file to PDF with default settings:
```bash
vox-md input.md
```
- Input: `input.md`
- Output: `output.pdf`
- Template: `default`
- Page Size: A4
- Margin: 12mm
- Orientation: Portrait
- Font Size: 12pt
- Title: "Markdown Document"

### Customizing Output
Use flags to customize the PDF:
```bash
vox-md input.md -o custom.pdf --template minimal --page-size Legal --margin 15 --orientation landscape --font-size 10 --title "Project Report"
```
- `-o`: Specify output file.
- `--template`: Choose `default`, `modern`, or `minimal` (or custom template name).
- `--page-size`: Set to A4, Letter, or Legal.
- `--margin`: Set margin in millimeters.
- `--orientation`: Set to portrait or landscape.
- `--font-size`: Set base font size in points.
- `--title`: Set PDF document title.

### Verbose Mode
Enable detailed logging for debugging:
```bash
vox-md input.md -v
```
Output includes template loading, HTML conversion, and PDF generation steps.

### Custom Templates
1. Create a new HTML template in `templates/` (e.g., `custom.html`):
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <style>
           body { font-size: {{FONT_SIZE}}pt; font-family: Arial; }
           h1 { color: navy; }
       </style>
   </head>
   <body>
       {{CONTENT}}
   </body>
   </html>
   ```
2. Use the custom template:
   ```bash
   vox-md input.md --template custom
   ```

### Example Workflow
1. Write a Markdown file (`report.md`):
   ```markdown
   # Annual Report
   ## Summary
   This report covers **2025** performance.
   - Revenue: $1M
   - Growth: 10%
   ```
2. Generate a PDF with the modern template:
   ```bash
   vox-md report.md -o report.pdf --template modern --page-size Letter --margin 10
   ```
3. Open `report.pdf` to view the styled document.

To try vox-md:
1. Clone the repository and install dependencies as described in [Installation](#installation).
2. Create a sample Markdown file (e.g., `sample.md`).
3. Run:
   ```bash
   vox-md sample.md -o sample.pdf --template minimal
   ```
4. Open `sample.pdf` to view the result.

## Contributing

We welcome contributions to vox-md! To get involved:

- Review the [Contributing Guidelines](CONTRIBUTING.md) for details on submitting issues, feature requests, or pull requests.
- Fork the repository, make changes, and submit a pull request.
- Adhere to the [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a respectful community.

Example contributions:
- Add new templates or styling options.
- Support additional Markdown features (e.g., tables, code blocks).
- Improve error messages or add new CLI flags.
- Optimize PDF generation performance.

## Security

Security is a priority for vox-md. If you discover a vulnerability:

- Report it privately as outlined in the [Security Policy](SECURITY.md).
- Avoid public disclosure until the issue is resolved.

## Code of Conduct

All contributors and users are expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md) to maintain a welcoming and inclusive environment.

## Support

Need help with vox-md? Visit the [Support page](SUPPORT.md) for resources, including:

- Filing bug reports or feature requests.
- Community discussions and contact information.
- FAQs for common issues (e.g., wkhtmltopdf setup, template errors).

## License

vox-md is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **VoxDroid**: For creating and maintaining the project.
- **Rust Community**: For providing robust libraries like `pulldown-cmark` and `wkhtmltopdf`.
- **wkhtmltopdf**: For reliable PDF generation.
- **Contributors**: Thanks to all who report issues, suggest features, or contribute code.
- **Markdown Users**: For inspiring tools that simplify documentation workflows.

---

<div align="center">
  <p><strong>Developed by <a href="https://github.com/VoxDroid">VoxDroid</a></strong></p>
  <p>Enjoying vox-md? Star the project on <a href="https://github.com/VoxDroid/vox-md">GitHub</a>!</p>
</div>