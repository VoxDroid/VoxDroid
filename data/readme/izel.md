# IZEL

Izel is a compiled systems programming language implemented in Rust, with first-class effect tracking, witness types, and zone-based memory semantics.

This repository contains the compiler, toolchain, standard library wards, language server, formatter, package manager, and playground.

## Repository Layout

- `crates/`: compiler and toolchain crates.
- `examples/`: runnable Izel source examples.
- `sample_applications/`: 001-100 practical app-style examples and tutorials.
- `library/std/` and `std/`: standard library ward sources.
- `tests/`: integration, compile-pass/fail, and feature-specific fixtures.
- `docs/`: book chapters, reference/spec content, and project overviews.
- `tools/`: grammar, playground, CI helpers, bootstrap utilities.

## Prerequisites

- Rust toolchain (workspace default in `rust-toolchain.toml`).
- LLVM 17 (`llvm-config`, `clang`, `lld`) for LLVM-backed codegen crates.
- `cmake` for native dependency builds.

macOS setup:

```bash
brew install llvm@17 cmake
```

Validate system dependencies:

```bash
bash tools/ci/check_system_deps.sh
```

## Build

```bash
bash tools/ci/with_llvm_env.sh cargo build --workspace
```

## Compile and Run Izel Code

Compile through the driver frontend/codegen path:

```bash
bash tools/ci/with_llvm_env.sh cargo run -p izel_driver -- examples/hello.iz
```

Format an Izel source file:

```bash
cargo run -p izel_driver -- fmt examples/hello.iz
```

Compile-check a sample application (full frontend + lowering + LLVM IR path):

```bash
bash tools/ci/with_llvm_env.sh cargo run -p izel_driver -- sample_applications/001_budget_forecast_calculator.iz
```

Run the package manager entrypoint:

```bash
cargo run -p izel_pm -- new demo --bin
cd demo
../target/debug/izel build
```

If `izel` is installed on your PATH, use `izel build` instead of the relative binary path.

## Validation Commands

Use these before release or pull requests:

```bash
pre-commit run --all-files
bash tools/ci/with_llvm_env.sh cargo check --workspace --all-targets
bash tools/ci/with_llvm_env.sh cargo test --workspace
cargo fmt --all -- --check
bash tools/ci/with_llvm_env.sh cargo clippy --workspace --all-targets -- -D warnings
```

## Example Programs

Feature-focused examples live under `examples/`, including:

- `hello.iz`
- `effects_valid.iz`
- `contracts_valid.iz`
- `witness_valid.iz`
- `zones_valid.iz`
- `temporal_constraints.iz`

## Sample Applications (001-100)

Practical app-style examples now live under `sample_applications/`, with coverage for calculators,
planning models, monitoring workloads, and terminal GUI-style dashboards (`std/tui`).

Start here:
- `sample_applications/README.md`
- `sample_applications/TUTORIAL.md`

Compile-check the whole suite:

```bash
for f in sample_applications/[0-9][0-9][0-9]_*.iz; do
	bash tools/ci/with_llvm_env.sh cargo run -p izel_driver -- "$f" || break
done
```

## Browser Playground (WASM)

Build and run the playground:

```bash
cd tools/playground
rustup target add wasm32-unknown-unknown
cargo install wasm-bindgen-cli --locked
npm install
npm run build:wasm
npm run serve
```

Then open `http://localhost:4173`.

The playground Run action now performs frontend validation in WASM and then executes through a local runtime endpoint (`/api/run`) backed by `izel_driver --run`.
This runtime path supports string literals, so programs like `println("Hello from Izel")` execute in the playground.

Runtime note: `to_str(int)` returns an owned runtime string buffer.
Use `free_str(...)` after use (the std `println_int(...)` helper already handles this cleanup).
`eprintln(...)` is stderr-backed in the runtime path, so stdout and stderr can be captured separately.
`read_stdin()` and `read_file(path)` return owned runtime string buffers; call `free_str(...)` after use.
`write_file(path, content)` writes content to disk and returns the byte count (or `-1` on open failure).
`append_file(path, content)` appends bytes and returns the appended byte count (or `-1` on open failure).
`remove_file(path)` returns `0` on success and `-1` on failure.
`file_exists(path)` returns `1` when a path is present, and `file_exists_bool(path)` provides a boolean helper.
`list_dir(path)` returns an owned newline-delimited listing buffer that should be released with `free_str(...)` after use.
`list_dir_structured(path)` returns an owned tab-delimited `name<TAB>kind` listing (`kind` is `file`, `dir`, `symlink`, or `other`).
`read_stdin_int()` and `read_stdin_float()` parse numeric input directly from stdin for interactive workflows.
`io_last_status()` exposes the last runtime IO status code (`0` success, nonzero error).
`io_last_error_kind()` exposes normalized runtime error categories (`0` ok, `1` not_found, `2` permission_denied, `3` already_exists, `4` interrupted, `5` parse_error, `6` invalid_input, `7` out_of_memory, `255` unknown).
`io_error_kind_name(kind)` and `io_last_error_kind_name()` return readable error category names.
`read_file_bytes_hex(path)` and `write_file_bytes_hex(path, hex)` provide binary-safe file IO via lowercase hex payloads.

### std/io cookbook

Status-first workflow with `try_*` wrappers and normalized error kinds:

```iz
draw std/io

forge main() -> int {
	let payload = try_read_file("input.txt")

	given io_last_status_ok() {
		println(payload)
		free_str(payload)
		give 0
	}

	free_str(payload)
	println(io_last_error_kind_name())
	give 1
}
```

Binary-safe roundtrip with hex helpers:

```iz
draw std/io

forge main() -> int {
	write_file_bytes_hex("blob.bin", "000102ff")
	let encoded = read_file_bytes_hex("blob.bin")
	println(encoded)
	free_str(encoded)
	give 0
}
```

For frontend-only static serving (no runtime execution), use:

```bash
cd tools/playground
npm run serve:static
```

## Syntax Highlighting (VS Code)

An installable VS Code package is provided at `tools/grammar/vscode-izel`.

Build a VSIX locally:

```bash
cd tools/grammar/vscode-izel
npm install
npm run package
```

Install in VS Code:

```bash
code --install-extension <generated-file>.vsix
```

## Documentation

- Book: `docs/book/`
- Reference/spec: `docs/reference/`, `docs/spec/`
- Project overview: `docs/project_overview.md`
- Verification checklists: `docs/po_checklist.md`, `docs/tests_checklist.md`

## License

MIT.
