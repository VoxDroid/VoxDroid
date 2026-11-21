# PyExe Builder Professional

![GitHub release (latest by date)](https://img.shields.io/github/v/release/VoxDroid/PyExe-Builder?label=Latest%20Release&style=flat-square)
![GitHub license](https://img.shields.io/github/license/VoxDroid/PyExe-Builder?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/VoxDroid/PyExe-Builder?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/VoxDroid/PyExe-Builder?style=flat-square)
![GitHub forks](https://img.shields.io/github/forks/VoxDroid/PyExe-Builder?style=flat-square)
![Python Version](https://img.shields.io/badge/Python-3.8%2B-blue?style=flat-square)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20Linux%20%7C%20macOS-green?style=flat-square)

---

## 📖 Overview

**PyExe Builder Professional** is a powerful, user-friendly GUI application designed to simplify the process of converting Python scripts into standalone executable files (.exe) using PyInstaller. Built with PyQt6, this tool offers a sleek, modern interface with multilingual support, customizable themes, and advanced build options, making it ideal for developers of all skill levels. Whether you're packaging a simple script or a complex application with dependencies, PyExe Builder Professional streamlines the process with an intuitive workflow.

---

## ✨ Features

- **Graphical User Interface**: A clean, tabbed interface for easy navigation.
- **Multilingual Support**: Available in English, Japanese, Korean, and Filipino.
- **Custom Themes**: Six professionally designed dark themes for a personalized experience.
- **Advanced Build Options**: Support for one-file builds, console/no-console modes, admin access, and more.
- **Dependency Management**: Automatically install dependencies from `requirements.txt`.
- **Metadata Customization**: Add company details, version info, and legal metadata to your executables.
- **Real-Time Build Console**: Monitor the build process with color-coded logs.
- **System Tray Integration**: Minimize to tray for convenience.
- **Cross-Platform**: Compatible with Windows, Linux, and macOS (with minor adjustments).

---

## 🚀 Installation

### Prerequisites

- **Python 3.8+**: Ensure Python is installed on your system.
- **Pip**: Python package manager (usually included with Python).
- **Dependencies**: Automatically installed via `start.py`.

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/VoxDroid/PyExe-Builder.git
   cd PyExe-Builder
   ```

2. **Run the Application**:
   ```bash
   python start.py
   ```
   - This creates a virtual environment (`.builder_env`) and installs required packages (`PyQt6`, `psutil`, `pyinstaller`, `qtawesome`).

3. **Launch the GUI**: The app will start automatically after setup.

### Alternative: Build the Executable

To create a standalone `.exe`:

1. Open the GUI by running `start.py`.
2. In the **Main Tab**, select `start.py` as the "Python Script".
3. In the **Dependencies Tab**, add:
   ```
   app.py;.
   Poppins-Regular.ttf;.
   ```
4. Check "One File" and "Clean Build" options.
5. Click "Build Executable" and specify an output directory.

---

## 📋 Usage

### Main Interface

| Tab             | Description                                      |
|-----------------|--------------------------------------------------|
| **Main**        | Select script, set output options, and build.    |
| **Metadata**    | Add company and product details.                |
| **Dependencies**| Specify hidden imports, binaries, and data files.|
| **Advanced**    | Configure build and runtime options.            |
| **Settings**    | Customize theme, language, and UI preferences.  |

### Building an Executable

1. **Main Tab**:
   - Choose your Python script.
   - Set application name and output directory.
   - Optionally select an icon.

2. **Dependencies Tab** (if needed):
   - Add external files or imports.

3. **Build**:
   - Click "Build Executable" and monitor progress in the console.

---

## 🎨 Customization

### Themes

Choose from six dark themes:
- **Dark Soft**
- **Midnight Blue**
- **Slate Gray**
- **Deep Forest**
- **Velvet Night**
- **Charcoal Glow**

Adjust in the **Settings Tab** under "Theme".

### Languages

Supported languages:
- English
- Japanese (日本語)
- Korean (한국어)
- Filipino (Tagalog)

Set in the **Settings Tab** under "Language".

---

## 🛠️ Technical Details

### Dependencies

| Package       | Version | Purpose                     |
|---------------|---------|-----------------------------|
| PyQt6         | Latest  | GUI framework              |
| psutil        | Latest  | System information         |
| PyInstaller   | Latest  | Executable packaging       |
| qtawesome     | Latest  | Icon library               |

### File Structure

```
PyExe-Builder/
├── start.py              # Entry point and environment setup
├── app.py                # Main GUI application
├── Poppins-Regular.ttf   # Font file
├── .builder_env/         # Virtual environment (auto-generated)
├── build/                # Build artifacts (auto-generated)
└── dist/                 # Output executables (auto-generated)
```

---

## 🌟 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on how to contribute, and review our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a positive and inclusive community.

To get started:

1. **Fork the Repository**: Click "Fork" on GitHub.
2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/VoxDroid/PyExe-Builder.git
   ```
3. **Create a Branch**:
   ```bash
   git checkout -b feature/your-feature
   ```
4. **Make Changes**: Implement your feature or fix.
5. **Commit and Push**:
   ```bash
   git add .
   git commit -m "Add your feature description"
   git push origin feature/your-feature
   ```
6. **Submit a Pull Request**: Open a PR on GitHub.

### Guidelines

- Follow PEP 8 for Python code.
- Test changes locally before submitting.
- Update documentation if applicable.

---

## 🐛 Issues and Support

For support, please refer to our [Support Guide](SUPPORT.md). If you encounter security issues, please review our [Security Policy](SECURITY.md).

Found a bug? Have a question?

- **Open an Issue**: Use the [Issues](https://github.com/VoxDroid/PyExe-Builder/issues) tab.
- **Contact**: Reach out via GitHub Discussions or email (if provided).

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🙌 Acknowledgments

- **PyQt6 Team**: For an excellent GUI framework.
- **PyInstaller Contributors**: For making Python packaging possible.
- **qtawesome**: For beautiful icons.
- **Poppins Font**: For a sleek typography experience.

---

## 📈 Roadmap

- [ ] Add support for additional languages.
- [ ] Implement drag-and-drop for file inputs.
- [ ] Enhance theme customization with light mode options.
- [ ] Add pre-build validation checks.
- [ ] Support for macOS-specific optimizations.

---

## 📊 Stats

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/VoxDroid/PyExe-Builder?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/VoxDroid/PyExe-Builder?style=flat-square)
![Contributors](https://img.shields.io/github/contributors/VoxDroid/PyExe-Builder?style=flat-square)

---

## 💡 Tips and Tricks

- **Speed Up Builds**: Enable "Clean Build" to avoid caching issues.
- **Debugging**: Use the "Debug Mode" option to troubleshoot build errors.
- **Portable Builds**: Use "One File" for easy distribution.

---

## 📸 Screenshots

### Main Tab
![Main Tab](assets/img/Screenshots/Main.png)

### Metadata Tab
![Metadata Tab](assets/img/Screenshots/Metadata.png)

### Dependencies Tab
![Metadata Tab](assets/img/Screenshots/Dependencies.png)

### Advanced Tab
![Advanced Tab](assets/img/Screenshots/Advanced.png)

### Settings Tab
![Settings Tab](assets/img/Screenshots/Settings.png)

---

## 🔗 Links

- **Repository**: [github.com/VoxDroid/PyExe-Builder](https://github.com/VoxDroid/PyExe-Builder)
- **Issues**: [github.com/VoxDroid/PyExe-Builder/issues](https://github.com/VoxDroid/PyExe-Builder/issues)
- **Author**: [VoxDroid](https://github.com/VoxDroid)

---

## 🎉 Final Words

Thank you for checking out **PyExe Builder Professional**! We hope it simplifies your Python packaging needs. Star the repo if you find it useful, and happy coding! 🚀

---