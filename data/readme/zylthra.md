<div align="center">
  <h1>Zylthra</h1>
</div>

<div align="center">
  <img src="assets/img/zylthra.png" alt="Zylthra" width="600"/>
</div>

<div align="center">
  <a href="https://github.com/VoxDroid/Zylthra/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/VoxDroid/Zylthra?color=blue" alt="License">
  </a>
  <a href="https://github.com/VoxDroid/Zylthra/releases">
    <img src="https://img.shields.io/github/downloads/VoxDroid/Zylthra/total?color=orange" alt="Downloads">
  </a>
  <a href="https://github.com/VoxDroid/Zylthra">
    <img src="https://img.shields.io/github/stars/VoxDroid/Zylthra?color=yellow" alt="Stars">
  </a>
  <a href="https://github.com/VoxDroid/Zylthra/forks">
    <img src="https://img.shields.io/github/forks/VoxDroid/Zylthra?color=green" alt="Forks">
  </a>
  <a href="https://github.com/VoxDroid/Zylthra/commits/main">
    <img src="https://img.shields.io/github/last-commit/VoxDroid/Zylthra?color=purple" alt="Last Commit">
  </a>
  <a href="https://github.com/VoxDroid/Zylthra/issues">
    <img src="https://img.shields.io/github/issues/VoxDroid/Zylthra?color=red" alt="Issues">
  </a>
  <a href="https://www.python.org/downloads/">
    <img src="https://img.shields.io/badge/python-3.9%2B-blueviolet" alt="Python Version">
  </a>
  <a href="https://github.com/VoxDroid/Zylthra">
    <img src="https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey" alt="Platforms">
  </a>
  <a>
    <img src="https://img.shields.io/github/v/release/VoxDroid/Zylthra?label=Latest%20Release" alt="Latest Release">
  </a>
  <a href="https://github.com/VoxDroid/Zylthra/releases">
    <img src="https://img.shields.io/badge/version-v2.1.0-brightgreen" alt="Version">
  </a>
</div>

<br>

<p align="center">
  <a href="https://ko-fi.com/O4O6LO7Q1" target="_blank">
    <img src="https://ko-fi.com/img/githubbutton_sm.svg" alt="ko-fi" style="border: 0;">
  </a>
</p>

<hr style="border: 1px dashed #4A6B9A; margin: 20px 0;">

Welcome to **Zylthra**, a powerful Python-based desktop application built with PyQt6, designed to generate synthetic datasets using the DataLLM API from [data.mostly.ai](https://data.mostly.ai). This tool allows users to create custom datasets by defining columns, configuring generation parameters, and saving setups for reuse, all within a sleek, dark-themed interface.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Getting Started](#getting-started)
  - [Generator Tab](#generator-tab)
  - [Configurations Tab](#configurations-tab)
  - [Help Tab](#help-tab)
- [Screenshots](#screenshots)
- [Releases](#releases)
- [Support](#support)
- [Contributing](#contributing)
- [Security](#security)
- [Code of Conduct](#code-of-conduct)
- [License](#license)
- [Dependencies](#dependencies)

## Features
- **Synthetic Data Generation**: Create datasets with custom columns using DataLLM’s AI capabilities.
- **Column Customization**: Define column names, prompts, data types, token limits, regex patterns, and categories.
- **Flexible Row Options**: Generate 10 to 50,000 rows or specify a custom number.
- **Advanced Settings**: Adjust temperature, model selection (e.g., Mistral, Mixtral, LLaMA), and iteration limits.
- **Configuration Management**: Save, load, and delete dataset configurations for quick reuse.
- **Output Control**: Customize filenames, add timestamps, choose save locations, and include ID columns.
- **Progress Tracking**: Real-time progress bar and status updates during generation.
- **Cross-Platform UI**: Modern, dark-themed interface built with PyQt6, compatible with Windows, macOS, and Linux.
- **In-App Help**: Comprehensive documentation accessible via the Help tab.

## Installation
Zylthra is a Python application that runs on any platform with the proper dependencies. Follow these steps to set it up:

### Running the Python Source (All Platforms)
1. Ensure you have **Python 3.9+** installed on your system (Windows, macOS, Linux).
2. Clone this repository:
   ```bash
   git clone https://github.com/VoxDroid/Zylthra.git
   cd Zylthra
   ```
3. Install the required dependencies (see [Dependencies](#dependencies) below):
   ```bash
   pip install -r requirements.txt
   ```
4. Run the application:
   ```bash
   python zylthra.py
   ```
   - **Note**: An internet connection and a valid DataLLM API key are required to generate datasets.

## Usage
Upon launching Zylthra, you’ll see a tabbed interface with three sections: **Generator**, **Configurations**, and **Help**. The Generator tab is for creating datasets, Configurations manages saved setups, and Help provides detailed guidance.

### Getting Started
- Obtain a DataLLM API key from [data.mostly.ai](https://data.mostly.ai).
- The app creates a `voxgen` directory in the working directory for configurations (`database.db`) and outputs (`Generated` folder).
- Use the Help tab for a full user manual if needed.

### Generator Tab
- **Purpose**: Design and generate synthetic datasets.
- **How to Use**:
  1. **API Configuration**: Enter your DataLLM API key in the "DataLLM API Key" field. Click the info icon for API docs.
  2. **Dataset Description**: Describe your dataset (e.g., "Customer purchase records").
  3. **Columns Configuration**:
     - Click "+" to add a column.
     - Set a unique **Name** (e.g., "Price").
     - Write a **Prompt** (e.g., "Cost of an item in USD").
     - Choose a **Type** (string, integer, float, etc.).
     - Set **Max Tokens** (1-64).
     - Optional: Add a **Regex** (e.g., "[0-9]+") or **Categories** (e.g., "Low, High") for category type.
     - Click the trash icon to remove a column.
  4. **Rows Configuration**: Select a preset (10, 100, etc.) or check "Custom" and enter a number.
  5. **Advanced Options**:
     - Adjust **Temperature** (0.0-1.0) for creativity.
     - Select a **Model** (default, mostlyai/datallm-v2-mistral-7b-v0.1, etc.).
     - Set **Max Iterations** (1-5) for text refinement.
  6. **Output Options**:
     - Enter a **CSV Filename** (e.g., "SalesData").
     - Check "Include Timestamp" for a dated suffix.
     - Set a **Save Location** (click "Browse" to change).
     - Check "Include ID Column" to add an ID field.
  7. **Generate**: Click "Generate Dataset" to start. Use "Terminate Generation" to stop if needed.
  8. **Top Buttons**:
     - "Save Configuration": Save your setup.
     - "Clear All Fields": Reset to defaults (confirms with dialog).

### Configurations Tab
- **Purpose**: Manage saved dataset configurations.
- **How to Use**:
  1. View saved configs in the list (format: "Name - Description").
  2. **Load Configuration**: Select a config and click to load (confirms with dialog), or double-click it.
  3. **Delete Configuration**: Select a config and click to delete (confirms with dialog).

### Help Tab
- **Purpose**: Access embedded documentation.
- **How to Use**: Navigate to the Help tab for a detailed guide, including setup instructions, usage tips, and support links.

## Screenshots
Here are previews of the main tabs in Zylthra:

<table align="center">
  <tr>
    <td align="center">
      <img src="assets/preview/z_gen.png" alt="Generator Tab" width="800"/>
      <br>
      <strong>Generator Tab</strong>
    </td>
    <td align="center">
      <img src="assets/preview/z_con.png" alt="Configurations Tab" width="800"/>
      <br>
      <strong>Configurations Tab</strong>
    </td>
  </tr>
</table>

## Releases
- Check the [Releases page](https://github.com/VoxDroid/Zylthra/releases) for version updates and release notes.
- Currently, Zylthra is distributed as Python source code.

## Support
For detailed support options, see the [Support page](SUPPORT.md). You can:
- Access the in-app Help tab for a user manual.
- Engage with the community on the [Discussions tab](https://github.com/VoxDroid/Zylthra/discussions).
- Report bugs or suggest features on the [Issues page](https://github.com/VoxDroid/Zylthra/issues).
- Contact maintainers at [izeno.contact@gmail.com](mailto:izeno.contact@gmail.com).

## Contributing
Contributions are welcome! To get involved, follow the [Contributing Guidelines](CONTRIBUTING.md). Submit pull requests, report bugs, or suggest features while adhering to our [Code of Conduct](CODE_OF_CONDUCT.md).

## Security
If you discover a security vulnerability, please follow our [Security Policy](SECURITY.md) by reporting it to [izeno.contact@gmail.com](mailto:izeno.contact@gmail.com) or opening a private issue labeled "Security Violation."

## Code of Conduct
We are committed to fostering a welcoming community. Please review our [Code of Conduct](CODE_OF_CONDUCT.md) to understand the expected behavior for all contributors and users.

## License
This project is licensed under the [MIT License](LICENSE). Use, modify, and distribute it freely per the license terms.

## Dependencies
To build from source, install the following Python packages:
- `PyQt6` (for the GUI)
- `pandas` (for data handling)
- `datallm` (for synthetic data generation)
- `qtawesome` (for icons)

Create a `requirements.txt` file with these dependencies and run `pip install -r requirements.txt`.

---

**Developed by VoxDroid**  
[GitHub](https://github.com/VoxDroid) | [Ko-fi](https://ko-fi.com/O4O6LO7Q1)