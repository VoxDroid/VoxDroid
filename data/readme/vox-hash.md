# 🔒 vox-hash

🌟 A High-Performance Rust CLI Tool for SHA1 and MD5 Hashing and Brute-Force Hash Matching 🌟

<div align="center">
  <a href="https://github.com/VoxDroid/vox-hash/releases">
    <img alt="Version" src="https://img.shields.io/badge/version-1.4-blue.svg?cacheSeconds=2592000">
  </a>
  <a href="https://github.com/VoxDroid/vox-hash/blob/main/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
  <a href="https://www.rust-lang.org/">
    <img alt="Built with: Rust" src="https://img.shields.io/badge/Built%20with-Rust-000000?logo=rust&logoColor=white">
  </a>
</div>

<div align="center">
  <a href="https://github.com/VoxDroid/vox-hash/stargazers">
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/VoxDroid/vox-hash?color=gold">
  </a>
  <a href="https://github.com/VoxDroid/vox-hash/network/members">
    <img alt="GitHub Forks" src="https://img.shields.io/github/forks/VoxDroid/vox-hash?color=silver">
  </a>
  <a href="https://github.com/VoxDroid/vox-hash/issues">
    <img alt="GitHub Issues" src="https://img.shields.io/github/issues/VoxDroid/vox-hash?color=orange">
  </a>
  <a href="https://github.com/VoxDroid/vox-hash/commits/main">
    <img alt="GitHub Commits" src="https://img.shields.io/github/commit-activity/m/VoxDroid/vox-hash">
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

**vox-hash** is an open-source command-line interface (CLI) tool written in Rust for generating SHA1 and MD5 hashes and performing brute-force hash matching. Designed for security researchers, penetration testers, and developers, it provides a fast and flexible solution for hashing strings and cracking hashes using customizable charsets, wordlists, patterns, and rainbow tables. The tool leverages Rust's performance and parallelism (via `rayon`) to handle single and bulk operations efficiently, with progress bars (`indicatif`) and verbose logging for transparency.

The CLI supports five main commands: `enc` (hash a single string), `dec` (brute-force a single hash), `bulk-enc` (hash multiple strings), `bulk-dec` (brute-force multiple hashes), `generate-table` (create a rainbow table), and `benchmark` (measure hashing speed). With features like JSON output, concurrent processing, and pattern-based cracking, vox-hash is ideal for security testing and hash analysis.

> **Note**: This project is actively maintained. Brute-forcing hashes can be computationally intensive and may be subject to legal restrictions in some jurisdictions. Use responsibly and ethically. Contributions to enhance performance, add features, or improve documentation are welcome!

## Features

- **Hashing**:
  - Supports SHA1 and MD5 algorithms for single and bulk string hashing.
  - Validates hash formats (40 characters for SHA1, 32 for MD5).
- **Brute-Force Hash Matching**:
  - Cracks hashes using customizable charsets (alphanumeric, lowercase, uppercase, digits, custom).
  - Supports prefix/suffix, minimum/maximum length, and fixed-length constraints.
  - Uses patterns (e.g., `[a-z]{4}`) for targeted cracking.
  - Tries common patterns (e.g., "password", "123456") for quick matches.
  - Integrates wordlists and rainbow tables for efficient decryption.
- **Parallel Processing**:
  - Leverages `rayon` for multi-threaded brute-forcing with configurable concurrency.
  - Processes bulk operations in batches to optimize memory usage.
- **Rainbow Tables**:
  - Generates JSON-based rainbow tables for precomputed hashes.
  - Supports lookups from existing rainbow tables.
- **Benchmarking**:
  - Measures hashing speed (hashes per second) for SHA1 and MD5.
- **Output Options**:
  - Outputs results to console or files.
  - Supports JSON format for structured output.
  - Filters successful matches in bulk decryption with `--only-success`.
- **User Interface**:
  - Displays progress bars with ETA and elapsed time (`indicatif`).
  - Provides verbose logging for debugging and transparency.
  - Supports `--noverbose` to reduce output.
- **Error Handling**:
  - Validates inputs (e.g., file existence, hash format, length constraints).
  - Provides clear error messages for invalid configurations.
- **Cross-Platform**:
  - Runs on Windows, macOS, and Linux with minimal dependencies.
- **Performance**:
  - Optimized for speed using Rust and parallel processing.
  - Efficient memory usage with batch processing for large datasets.

## System Requirements

To run vox-hash, ensure you have:

- **Operating System**: Windows, macOS, or Linux.
- **Rust**: Stable toolchain (version 1.56 or higher recommended).
- **Disk Space**: ~10 MB for the compiled binary and dependencies (wordlists and rainbow tables vary by size).
- **Dependencies** (managed by Cargo):
  - `clap`: CLI argument parsing.
  - `sha1`, `md5`: Hashing algorithms.
  - `rayon`: Parallel processing.
  - `indicatif`: Progress bars.
  - `chrono`: Timestamp logging.
  - `serde_json`: JSON handling for rainbow tables.
  - `regex`: Pattern parsing.
- **Input Files** (optional):
  - Wordlist files (text, one word per line).
  - Hash files (text, one hash per line).
  - Rainbow table files (JSON format).
- **Memory**: At least 4GB RAM for brute-forcing; more for large charsets or lengths.
- **Development Tools**:
  - `pre-commit`: For automated code quality checks.

## Modular Architecture

vox-hash has been refactored into a modular, layered architecture:
- **CLI Layer** (`src/cli`): Command-line argument parsing and validation.
- **App Layer** (`src/app`): Use case orchestration (e.g., `execute_dec`).
- **Domain Layer** (`src/domain`): Core hashing algorithms, candidate generation, and matching logic.
- **Infra Layer** (`src/infra`): File I/O and external integrations.

## Installation

Follow these steps to install and set up vox-hash:

1. **Install Rust**:
   - Install the Rust toolchain via [rustup](https://rustup.rs/):
     ```bash
     curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
     ```
   - Update Rust:
     ```bash
     rustup update
     ```

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/VoxDroid/vox-hash.git
   ```

3. **Navigate to the Project Directory**:
   ```bash
   cd vox-hash
   ```

4. **Build the Project**:
   ```bash
   cargo build --release
   ```
   The compiled binary will be located at `target/release/vox-hash`.

5. **Install via Cargo**:
   - You can also install directly from the local path:
     ```bash
     cargo install --path .
     ```

6. **(Optional) Install Globally (Manual)**:
   - Copy the binary to a directory in your PATH (e.g., `/usr/local/bin` on Linux/macOS):
     ```bash
     sudo cp target/release/vox-hash /usr/local/bin/
     ```

- **Verify Installation**:
   ```bash
   vox-hash --help
   ```
   This should display the CLI help message with available commands and options.

## Development

### Pre-commit Hooks
We use `pre-commit` to ensure code quality. To set it up:
1. Install `pre-commit`: `pip install pre-commit`
2. Install the hooks: `pre-commit install`
3. Run manually: `pre-commit run --all-files`

### Running Tests
```bash
cargo test
```
Integration tests are located in the `tests/` directory.

7. **Prepare Input Files** (optional):
   - Create a wordlist file (e.g., `words.txt`):
     ```
     password
     admin
     test123
     ```
   - Create a hash file for bulk decryption (e.g., `hashes.txt`):
     ```
     5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8
     d41d8cd98f00b204e9800998ecf8427e
     ```
   - Generate or use a rainbow table (JSON format, created via `generate-table`).

## Getting Started

To start using vox-hash:

1. **Hash a Single String**:
   - Hash "test" with SHA1:
     ```bash
     vox-hash enc --algo sha1 --str test
     ```
   - Output: `5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8`

2. **Brute-Force a Hash**:
   - Crack a SHA1 hash using a wordlist:
     ```bash
     vox-hash dec --key 5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8 --wordlist words.txt
     ```
   - Output: `test` (if in wordlist)

3. **Bulk Hashing**:
   - Hash strings from a file:
     ```bash
     vox-hash bulk-enc --algo md5 --input strings.txt --output hashes.txt
     ```

4. **Bulk Hash Cracking**:
   - Crack multiple hashes with auto-detection:
     ```bash
     vox-hash bulk-dec --input hashes.txt --auto --only-success
     ```

5. **Generate a Rainbow Table**:
   - Create a table for alphanumeric strings (length 1-4):
     ```bash
     vox-hash generate-table --output table.json --min-len 1 --max-len 4 --algo sha1
     ```

6. **Benchmark Hashing Speed**:
   - Measure SHA1 performance:
     ```bash
     vox-hash benchmark --algo sha1
     ```

## Usage

### Commands

1. **enc**: Hash a single string.
   ```bash
   vox-hash enc --algo sha1 --str "hello" --json
   ```
   - Options: `--algo` (sha1/md5), `--str`, `--output`, `--json`.
   - Output: JSON or plain hash (e.g., `2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c`).

2. **dec**: Brute-force a single hash.
   ```bash
   vox-hash dec --key 5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8 --auto --wordlist words.txt --conc 10
   ```
   - Options: `--key`, `--auto`, `--algo`, `--conc`, `--wordlist`, `--prefix`, `--suffix`, `--min-len`, `--length`, `--common-patterns`, `--pattern`, `--rainbow-table`, `--output`, `--json`.
   - Global Options: `--max-len`, `--charset-type`, `--charset`, `--noverbose`.
   - Output: Matching plaintext or "No match found".

3. **bulk-enc**: Hash multiple strings from a file.
   ```bash
   vox-hash bulk-enc --algo md5 --input strings.txt --output hashes.json --json
   ```
   - Options: `--algo`, `--input`, `--output`, `--json`.
   - Output: List of hashes or JSON array.

4. **bulk-dec**: Brute-force multiple hashes from a file.
   ```bash
   vox-hash bulk-dec --input hashes.txt --auto --wordlist words.txt --only-success --batch-size 500
   ```
   - Options: `--input`, `--auto`, `--algo`, `--conc`, `--wordlist`, `--prefix`, `--suffix`, `--min-len`, `--length`, `--common-patterns`, `--pattern`, `--rainbow-table`, `--output`, `--json`, `--batch-size`, `--only-success`.
   - Global Options: `--max-len`, `--charset-type`, `--charset`, `--noverbose`.
   - Output: Matching plaintexts or "No match found" per hash.

5. **generate-table**: Create a rainbow table.
   ```bash
   vox-hash generate-table --output table.json --min-len 1 --max-len 3 --algo md5
   ```
   - Options: `--output`, `--min-len`, `--max-len`, `--algo`.
   - Global Options: `--charset-type`, `--charset`, `--noverbose`.
   - Output: JSON file with hash-to-plaintext mappings.

6. **benchmark**: Measure hashing speed.
   ```bash
   vox-hash benchmark --algo sha1 --iterations 1000000
   ```
   - Options: `--algo`, `--iterations`.
   - Output: Hashes per second (e.g., `123456.78 hashes/second`).

### Example Workflow

1. **Hash a Password**:
   ```bash
   vox-hash enc --algo sha1 --str passkord
   ```
   Output: `ae47f9f0f1be2d94c0e8f4fd4c6d4e10e6d5e1e9`

2. **Crack the Hash**:
   ```bash
   vox-hash dec --key ae47f9f0f1be2d94c0e8f4fd4c6d4e10e6d5e1e9 --auto --common-patterns
   ```
   Output: `passkord` (found in common patterns)

3. **Bulk Process Strings**:
   - Create `strings.txt`:
     ```
     password
     admin
     test
     ```
   - Run:
     ```bash
     vox-hash bulk-enc --algo md5 --input strings.txt --output hashes.txt
     ```

4. **Generate and Use a Rainbow Table**:
   - Generate:
     ```bash
     vox-hash generate-table --output table.json --min-len 1 --max-len 4 --algo sha1
     ```
   - Crack:
     ```bash
     vox-hash dec --key 5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8 --rainbow-table table.json
     ```

To try vox-hash:
1. Clone the repository and install as described in [Installation](#installation).
2. Create a sample input file (e.g., `hashes.txt` with `5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8`).
3. Run:
   ```bash
   vox-hash dec --key 5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8 --wordlist words.txt
   ```
4. View the output: `test`.

## Contributing

We welcome contributions to vox-hash! To get involved:

- Review the [Contributing Guidelines](CONTRIBUTING.md) for details on submitting issues, feature requests, or pull requests.
- Fork the repository, make changes, and submit a pull request.
- Adhere to the [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a respectful community.

Example contributions:
- Add support for additional hashing algorithms (e.g., SHA256).
- Optimize brute-force performance for large charsets.
- Enhance pattern support with more regex formats.
- Improve rainbow table generation for larger datasets.

## Security

Security is a priority for vox-hash. If you discover a vulnerability:

- Report it privately as outlined in the [Security Policy](SECURITY.md).
- Avoid public disclosure until the issue is resolved.

## Code of Conduct

All contributors and users are expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md) to maintain a welcoming and inclusive environment.

## Support

Need help with vox-hash? Visit the [Support page](SUPPORT.md) for resources, including:

- Filing bug reports or feature requests.
- Community discussions and contact information (email: izeno.contact@gmail.com).
- FAQs for common issues (e.g., wordlist errors, performance optimization).

## License

vox-hash is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **VoxDroid**: For creating and maintaining the project.
- **Rust Community**: For providing robust libraries like `clap`, `rayon`, and `indicatif`.
- **Contributors**: Thanks to all who report issues, suggest features, or contribute code.
- **Security Community**: For inspiring tools that support ethical security testing.

---

<div align="center">
  <p><strong>Developed by <a href="https://github.com/VoxDroid">VoxDroid</a></strong></p>
  <p>Enjoying vox-hash? Star the project on <a href="https://github.com/VoxDroid/vox-hash">GitHub</a>!</p>
  <p>Consider supporting the project!</p>
  <a href="https://ko-fi.com/O4O6LO7Q1" target="_blank">
    <img src="https://ko-fi.com/img/githubbutton_sm.svg" alt="Support on Ko-fi" style="border: 0;">
  </a>
</div>
