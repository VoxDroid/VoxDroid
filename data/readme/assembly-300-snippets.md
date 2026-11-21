# Assembly 300 Snippets

> ## *Current Repository Progress:* 
> - *Snippets: **`210/300`***
> - *Cheatsheets: **`210/300`***
> - *Samples: **`210/300`***

Welcome to the **Assembly 300 Snippets** repository! This project is a comprehensive collection of 300 x86-64 assembly language code snippets (using NASM syntax on Linux) for learning and demonstration. The snippets are categorized into three difficulty levels:

- **Basic (1–100)**: Foundational concepts for beginners, covering syntax, registers, and basic operations.
- **Intermediate (101–200)**: More complex techniques, including functions, memory management, and optimization.
- **Advanced (201–300)**: Specialized applications, such as OS development, reverse engineering, and performance-critical code.

Each snippet resides in its own folder (`assembly-300-snippets/XXXX-Title-Name`) with a `CHEETSHEET.md` and `SAMPLES.md` files, and a `README.md` explaining the code, its purpose, and usage instructions.

## Folder Structure
```
assembly-300-snippets/
├── assembly-300-snippets/
│   ├── 0001-Hello-World/
│   │   ├── code.asm
│   │   └── README.md
│   ├── 0002-Move-Register/
│   │   ├── code.asm
│   │   └── README.md
│   ├── ...
│   └── 0300-Shellcode-Execve/
│       ├── code.asm
│       └── README.md
```

## Prerequisites
- **Assembler**: NASM (`sudo apt install nasm` on Ubuntu).
- **Linker**: GNU ld (`sudo apt install binutils`).
- **OS**: Linux (Ubuntu recommended for compatibility).
- **Build Command**: `nasm -f elf64 code.asm && ld code.o -o code && ./code`.

## Contributing
We welcome contributions! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to submit snippets, improve documentation, or report issues.

## Community Guidelines
To ensure a welcoming environment, please adhere to our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Support
For help or questions, refer to [SUPPORT.md](SUPPORT.md).

## Security
Found a security issue? Please report it following the guidelines in [SECURITY.md](SECURITY.md).

## License
This repository is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

# Snippet List

Below is the complete list of snippet titles, hyperlinked to their respective folders in this repository.

## Basic Snippets (1–100)
| # | Name | Description | Snippet | Cheatsheet | Sample |
|---|------|-------------|:-------:|:----------:|:------:|
| 1 | [Hello World](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0001-Hello-World) | Print "Hello, World!" to console using syscall. | ✅ | ✅ | ✅ |
| 2 | [Move Register](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0002-Move-Register) | Move data between registers using `mov`. | ✅ | ✅ | ✅ |
| 3 | [Add Numbers](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0003-Add-Numbers) | Add two numbers using `add`. | ✅ | ✅ | ✅ |
| 4 | [Subtract Numbers](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0004-Subtract-Numbers) | Subtract two numbers using `sub`. | ✅ | ✅ | ✅ |
| 5 | [Multiply Numbers](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0005-Multiply-Numbers) | Multiply two numbers using `imul`. | ✅ | ✅ | ✅ |
| 6 | [Divide Numbers](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0006-Divide-Numbers) | Divide two numbers using `idiv`. | ✅ | ✅ | ✅ |
| 7 | [Compare Numbers](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0007-Compare-Numbers) | Compare numbers using `cmp`. | ✅ | ✅ | ✅ |
| 8 | [Conditional Jump](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0008-Conditional-Jump) | Use `je` for conditional branching. | ✅ | ✅ | ✅ |
| 9 | [Simple Loop](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0009-Simple-Loop) | Implement a loop using `jmp`. | ✅ | ✅ | ✅ |
| 10 | [Push Pop Stack](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0010-Push-Pop-Stack) | Push and pop data on the stack. | ✅ | ✅ | ✅ |
| 11 | [Exit Program](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0011-Exit-Program) | Exit with a status code using syscall. | ✅ | ✅ | ✅ |
| 12 | [Define Variable](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0012-Define-Variable) | Define a variable in `.data` section. | ✅ | ✅ | ✅ |
| 13 | [Print String](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0013-Print-String) | Print a string using `write` syscall. | ✅ | ✅ | ✅ |
| 14 | [Read Input](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0014-Read-Input) | Read user input from stdin. | ✅ | ✅ | ✅ |
| 15 | [Bitwise AND](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0015-Bitwise-AND) | Perform bitwise AND operation. | ✅ | ✅ | ✅ |
| 16 | [Bitwise OR](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0016-Bitwise-OR) | Perform bitwise OR operation. | ✅ | ✅ | ✅ |
| 17 | [Bitwise XOR](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0017-Bitwise-XOR) | Perform bitwise XOR operation. | ✅ | ✅ | ✅ |
| 18 | [Shift Left](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0018-Shift-Left) | Shift bits left using `shl`. | ✅ | ✅ | ✅ |
| 19 | [Shift Right](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0019-Shift-Right) | Shift bits right using `shr`. | ✅ | ✅ | ✅ |
| 20 | [Direct Addressing](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0020-Direct-Addressing) | Access memory using direct addressing. | ✅ | ✅ | ✅ |
| 21 | [Indirect Addressing](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0021-Indirect-Addressing) | Access memory using indirect addressing. | ✅ | ✅ | ✅ |
| 22 | [Indexed Addressing](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0022-Indexed-Addressing) | Access array elements with indexing. | ✅ | ✅ | ✅ |
| 23 | [Increment Register](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0023-Increment-Register) | Increment a register using `inc`. | ✅ | ✅ | ✅ |
| 24 | [Decrement Register](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0024-Decrement-Register) | Decrement a register using `dec`. | ✅ | ✅ | ✅ |
| 25 | [Zero Register](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0025-Zero-Register) | Zero a register using `xor`. | ✅ | ✅ | ✅ |
| 26 | [Flags Register](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0026-Flags-Register) | Check flags after arithmetic operation. | ✅ | ✅ | ✅ |
| 27 | [Jump Not Equal](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0027-Jump-Not-Equal) | Use `jne` for conditional branching. | ✅ | ✅ | ✅ |
| 28 | [Jump Greater](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0028-Jump-Greater) | Use `jg` for conditional branching. | ✅ | ✅ | ✅ |
| 29 | [Jump Less](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0029-Jump-Less) | Use `jl` for conditional branching. | ✅ | ✅ | ✅ |
| 30 | [Loop Counter](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0030-Loop-Counter) | Loop using `loop` instruction. | ✅ | ✅ | ✅ |
| 31 | [Print Integer](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0031-Print-Integer) | Convert and print an integer to stdout. | ✅ | ✅ | ✅ |
| 32 | [Read Integer](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0032-Read-Integer) | Read an integer from stdin. | ✅ | ✅ | ✅ |
| 33 | [Define Byte](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0033-Define-Byte) | Define a byte variable in `.data`. | ✅ | ✅ | ✅ |
| 34 | [Define Word](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0034-Define-Word) | Define a word variable in `.data`. | ✅ | ✅ | ✅ |
| 35 | [Define Doubleword](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0035-Define-Doubleword) | Define a doubleword in `.data`. | ✅ | ✅ | ✅ |
| 36 | [Uninitialized Variable](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0036-Uninitialized-Variable) | Define variable in `.bss` section. | ✅ | ✅ | ✅ |
| 37 | [Move Immediate](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0037-Move-Immediate) | Move immediate value to register. | ✅ | ✅ | ✅ |
| 38 | [Load Effective Address](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0038-Load-Effective-Address) | Use `lea` for address calculation. | ✅ | ✅ | ✅ |
| 39 | [Negate Number](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0039-Negate-Number) | Negate a number using `neg`. | ✅ | ✅ | ✅ |
| 40 | [Logical NOT](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0040-Logical-NOT) | Perform logical NOT using `not`. | ✅ | ✅ | ✅ |
| 41 | [Swap Registers](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0041-Swap-Registers) | Swap two registers using `xchg`. | ✅ | ✅ | ✅ |
| 42 | [Test Instruction](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0042-Test-Instruction) | Use `test` to check bits. | ✅ | ✅ | ✅ |
| 43 | [Clear Carry Flag](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0043-Clear-Carry-Flag) | Clear carry flag using `clc`. | ✅ | ✅ | ✅ |
| 44 | [Set Carry Flag](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0044-Set-Carry-Flag) | Set carry flag using `stc`. | ✅ | ✅ | ✅ |
| 45 | [Check Zero Flag](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0045-Check-Zero-Flag) | Branch based on zero flag. | ✅ | ✅ | ✅ |
| 46 | [Signed Multiply](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0046-Signed-Multiply) | Signed multiplication with `imul`. | ✅ | ✅ | ✅ |
| 47 | [Unsigned Divide](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0047-Unsigned-Divide) | Unsigned division with `div`. | ✅ | ✅ | ✅ |
| 48 | [Print Newline](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0048-Print-Newline) | Print a newline character. | ✅ | ✅ | ✅ |
| 49 | [Simple If Else](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0049-Simple-If-Else) | Implement if-else logic with jumps. | ✅ | ✅ | ✅ |
| 50 | [Nested Loop](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0050-Nested-Loop) | Implement nested loops. | ✅ | ✅ | ✅ |
| 51 | [Bitwise Rotate Left](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0051-Bitwise-Rotate-Left) | Rotate bits left using `rol`. | ✅ | ✅ | ✅ |
| 52 | [Bitwise Rotate Right](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0052-Bitwise-Rotate-Right) | Rotate bits right using `ror`. | ✅ | ✅ | ✅ |
| 53 | [Print Hex Number](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0053-Print-Hex-Number) | Convert and print number in hex. | ✅ | ✅ | ✅ |
| 54 | [Read Character](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0054-Read-Character) | Read a single character from stdin. | ✅ | ✅ | ✅ |
| 55 | [Stack Alignment](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0055-Stack-Alignment) | Align stack to 16 bytes. | ✅ | ✅ | ✅ |
| 56 | [Compare Strings](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0056-Compare-Strings) | Compare two strings using `cmpsb`. | ✅ | ✅ | ✅ |
| 57 | [Move String](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0057-Move-String) | Move string using `movsb`. | ✅ | ✅ | ✅ |
| 58 | [Clear Register](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0058-Clear-Register) | Clear register using `mov`. | ✅ | ✅ | ✅ |
| 59 | [Check Sign Flag](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0059-Check-Sign-Flag) | Branch based on sign flag. | ✅ | ✅ | ✅ |
| 60 | [Basic Array Sum](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0060-Basic-Array-Sum) | Sum elements of an array. | ✅ | ✅ | ✅ |
| 61 | [Modulo Operation](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0061-Modulo-Operation) | Compute modulus using `div`. | ✅ | ✅ | ✅ |
| 62 | [Print Boolean](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0062-Print-Boolean) | Print true/false based on condition. | ✅ | ✅ | ✅ |
| 63 | [Basic Switch Case](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0063-Basic-Switch-Case) | Implement switch-case with jumps. | ✅ | ✅ | ✅ |
| 64 | [Count Bits](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0064-Count-Bits) | Count set bits in a number. | ✅ | ✅ | ✅ |
| 65 | [Reverse Bits](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0065-Reverse-Bits) | Reverse bits in a register. | ✅ | ✅ | ✅ |
| 66 | [Check Parity](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0066-Check-Parity) | Check parity using `test`. | ✅ | ✅ | ✅ |
| 67 | [Simple Macro](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0067-Simple-Macro) | Define a NASM macro for reuse. | ✅ | ✅ | ✅ |
| 68 | [Print Array](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0068-Print-Array) | Print elements of an array. | ✅ | ✅ | ✅ |
| 69 | [Copy Array](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0069-Copy-Array) | Copy array using loop. | ✅ | ✅ | ✅ |
| 70 | [Find Max](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0070-Find-Max) | Find maximum in array. | ✅ | ✅ | ✅ |
| 71 | [Find Min](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0071-Find-Min) | Find minimum in array. | ✅ | ✅ | ✅ |
| 72 | [Basic Sort](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0072-Basic-Sort) | Simple bubble sort implementation. | ✅ | ✅ | ✅ |
| 73 | [String Length](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0073-String-Length) | Calculate string length. | ✅ | ✅ | ✅ |
| 74 | [Reverse String](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0074-Reverse-String) | Reverse a string in place. | ✅ | ✅ | ✅ |
| 75 | [Convert Case](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0075-Convert-Case) | Convert string case (upper/lower). | ✅ | ✅ | ✅ |
| 76 | [Basic Stack Frame](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0076-Basic-Stack-Frame) | Set up a basic stack frame. | ✅ | ✅ | ✅ |
| 77 | [Call Subroutine](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0077-Call-Subroutine) | Call a subroutine with `call`. | ✅ | ✅ | ✅ |
| 78 | [Return Value](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0078-Return-Value) | Return a value from subroutine. | ✅ | ✅ | ✅ |
| 79 | [Local Variable](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0079-Local-Variable) | Define local variable on stack. | ✅ | ✅ | ✅ |
| 80 | [Basic While Loop](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0080-Basic-While-Loop) | Implement a while loop. | ✅ | ✅ | ✅ |
| 81 | [Print Decimal](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0081-Print-Decimal) | Print number in decimal format. | ✅ | ✅ | ✅ |
| 82 | [Read String](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0082-Read-String) | Read a string from stdin. | ✅ | ✅ | ✅ |
| 83 | [Bitwise Shift Variable](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0083-Bitwise-Shift-Variable) | Shift a variable’s bits. | ✅ | ✅ | ✅ |
| 84 | [Check Overflow](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0084-Check-Overflow) | Check overflow flag after addition. | ✅ | ✅ | ✅ |
| 85 | [Simple Array Init](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0085-Simple-Array-Init) | Initialize an array with values. | ✅ | ✅ | ✅ |
| 86 | [Basic Pointer](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0086-Basic-Pointer) | Use a pointer to access memory. | ✅ | ✅ | ✅ |
| 87 | [Swap Variables](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0087-Swap-Variables) | Swap two variables in memory. | ✅ | ✅ | ✅ |
| 88 | [Basic Constant](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0088-Basic-Constant) | Define a constant using `equ`. | ✅ | ✅ | ✅ |
| 89 | [Check Even Odd](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0089-Check-Even-Odd) | Check if a number is even or odd. | ✅ | ✅ | ✅ |
| 90 | [Print ASCII](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0090-Print-ASCII) | Print ASCII character from code. | ✅ | ✅ | ✅ |
| 91 | [Basic Input Validation](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0091-Basic-Input-Validation) | Validate numeric input. | ✅ | ✅ | ✅ |
| 92 | [Simple Counter](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0092-Simple-Counter) | Count from 1 to N. | ✅ | ✅ | ✅ |
| 93 | [Basic Factorial](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0093-Basic-Factorial) | Compute factorial iteratively. | ✅ | ✅ | ✅ |
| 94 | [Fibonacci Sequence](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0094-Fibonacci-Sequence) | Generate Fibonacci numbers. | ✅ | ✅ | ✅ |
| 95 | [Array Reverse](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0095-Array-Reverse) | Reverse an array in place. | ✅ | ✅ | ✅ |
| 96 | [String Concat](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0096-String-Concat) | Concatenate two strings. | ✅ | ✅ | ✅ |
| 97 | [Basic GCD](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0097-Basic-GCD) | Compute GCD of two numbers. | ✅ | ✅ | ✅ |
| 98 | [Prime Check](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0098-Prime-Check) | Check if a number is prime. | ✅ | ✅ | ✅ |
| 99 | [Sum Digits](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0099-Sum-Digits) | Sum digits of a number. | ✅ | ✅ | ✅ |
| 100 | [Basic Array Access](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0100-Basic-Array-Access) | Access array elements using indexed addressing. | ✅ | ✅ | ✅ |

## Intermediate Snippets (101–200)
| # | Name | Description | Snippet | Cheatsheet | Sample |
|---|------|-------------|:-------:|:----------:|:------:|
| 101 | [Function Call](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0101-Function-Call) | Create and call a function with stack frame. | ✅ | ✅ | ✅ |
| 102 | [Recursive Factorial](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0102-Recursive-Factorial) | Compute factorial recursively. | ✅ | ✅ | ✅ |
| 103 | [Call C Function](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0103-Call-C-Function) | Call C’s `printf` from assembly. | ✅ | ✅ | ✅ |
| 104 | [Floating Point Add](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0104-Floating-Point-Add) | Add floating-point numbers using x87 FPU. | ✅ | ✅ | ✅ |
| 105 | [SSE Vector Add](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0105-SSE-Vector-Add) | Perform vector addition with SSE. | ✅ | ✅ | ✅ |
| 106 | [String Copy](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0106-String-Copy) | Copy a string using `movsb`. | ✅ | ✅ | ✅ |
| 107 | [Heap Allocation](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0107-Heap-Allocation) | Allocate memory using `mmap`. | ✅ | ✅ | ✅ |
| 108 | [File Write](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0108-File-Write) | Write to a file using syscalls. | ✅ | ✅ | ✅ |
| 109 | [Thread Creation](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0109-Thread-Creation) | Create a thread using `clone`. | ✅ | ✅ | ✅ |
| 110 | [Inline Assembly](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0110-Inline-Assembly) | Embed assembly in C code. | ✅ | ✅ | ✅ |
| 111 | [String Compare](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0111-String-Compare) | Compare strings using `cmpsb`. | ✅ | ✅ | ✅ |
| 112 | [Array Sort](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0112-Array-Sort) | Implement quicksort for array. | ✅ | ✅ | ✅ |
| 113 | [Matrix Addition](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0113-Matrix-Addition) | Add two matrices. | ✅ | ✅ | ✅ |
| 114 | [Floating Point Multiply](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0114-Floating-Point-Multiply) | Multiply floats using x87 FPU. | ✅ | ✅ | ✅ |
| 115 | [SSE Vector Multiply](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0115-SSE-Vector-Multiply) | Multiply vectors with SSE. | ✅ | ✅ | ✅ |
| 116 | [Dynamic Array](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0116-Dynamic-Array) | Allocate dynamic array on heap. | ✅ | ✅ | ✅ |
| 117 | [File Read](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0117-File-Read) | Read from a file using syscalls. | ✅ | ✅ | ✅ |
| 118 | [Function Parameters](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0118-Function-Parameters) | Pass multiple parameters to function. | ✅ | ✅ | ✅ |
| 119 | [Stack Frame Cleanup](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0119-Stack-Frame-Cleanup) | Clean up stack after function call. | ✅ | ✅ | ✅ |
| 120 | [Loop Unrolling](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0120-Loop-Unrolling) | Optimize loop with unrolling. | ✅ | ✅ | ✅ |
| 121 | [String Tokenize](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0121-String-Tokenize) | Split string by delimiter. | ✅ | ✅ | ✅ |
| 122 | [Struct Access](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0122-Struct-Access) | Access fields in a C-style struct. | ✅ | ✅ | ✅ |
| 123 | [Matrix Multiply](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0123-Matrix-Multiply) | Multiply two matrices. | ✅ | ✅ | ✅ |
| 124 | [Recursive Fibonacci](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0124-Recursive-Fibonacci) | Compute Fibonacci recursively. | ✅ | ✅ | ✅ |
| 125 | [Binary Search](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0125-Binary-Search) | Implement binary search on array. | ✅ | ✅ | ✅ |
| 126 | [Linked List Create](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0126-Linked-List-Create) | Create a linked list node. | ✅ | ✅ | ✅ |
| 127 | [Linked List Traverse](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0127-Linked-List-Traverse) | Traverse a linked list. | ✅ | ✅ | ✅ |
| 128 | [File Append](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0128-File-Append) | Append to a file using syscalls. | ✅ | ✅ | ✅ |
| 129 | [Mutex Lock](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0129-Mutex-Lock) | Use mutex for thread synchronization. | ✅ | ✅ | ✅ |
| 130 | [SSE Matrix Add](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0130-SSE-Matrix-Add) | Add matrices using SSE instructions. | ✅ | ✅ | ✅ |
| 131 | [String Search](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0131-String-Search) | Search for substring in string. | ✅ | ✅ | ✅ |
| 132 | [Memory Copy](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0132-Memory-Copy) | Copy memory block using `rep movsb`. | ✅ | ✅ | ✅ |
| 133 | [Floating Point Divide](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0133-Floating-Point-Divide) | Divide floats using x87 FPU. | ✅ | ✅ | ✅ |
| 134 | [Dynamic Stack Alloc](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0134-Dynamic-Stack-Alloc) | Allocate dynamic space on stack. | ✅ | ✅ | ✅ |
| 135 | [Function Return Struct](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0135-Function-Return-Struct) | Return a struct from function. | ✅ | ✅ | ✅ |
| 136 | [Recursive GCD](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0136-Recursive-GCD) | Compute GCD recursively. | ✅ | ✅ | ✅ |
| 137 | [Heap Free](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0137-Heap-Free) | Free heap memory using `munmap`. | ✅ | ✅ | ✅ |
| 138 | [Thread Join](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0138-Thread-Join) | Join a thread using syscalls. | ✅ | ✅ | ✅ |
| 139 | [Matrix Determinant](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0139-Matrix-Determinant) | Compute matrix determinant. | ✅ | ✅ | ✅ |
| 140 | [String Replace](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0140-String-Replace) | Replace characters in a string. | ✅ | ✅ | ✅ |
| 141 | [Linked List Insert](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0141-Linked-List-Insert) | Insert node in linked list. | ✅ | ✅ | ✅ |
| 142 | [Linked List Delete](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0142-Linked-List-Delete) | Delete node from linked list. | ✅ | ✅ | ✅ |
| 143 | [SSE Dot Product](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0143-SSE-Dot-Product) | Compute dot product using SSE. | ✅ | ✅ | ✅ |
| 144 | [File Seek](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0144-File-Seek) | Seek to position in file. | ✅ | ✅ | ✅ |
| 145 | [Macro Function](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0145-Macro-Function) | Define a macro for function-like behavior. | ✅ | ✅ | ✅ |
| 146 | [Array Filter](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0146-Array-Filter) | Filter array based on condition. | ✅ | ✅ | ✅ |
| 147 | [String Trim](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0147-String-Trim) | Trim whitespace from string. | ✅ | ✅ | ✅ |
| 148 | [Floating Point Compare](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0148-Floating-Point-Compare) | Compare floats using x87 FPU. | ✅ | ✅ | ✅ |
| 149 | [Recursive Power](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0149-Recursive-Power) | Compute power recursively. | ✅ | ✅ | ✅ |
| 150 | [Dynamic Matrix](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0150-Dynamic-Matrix) | Allocate matrix on heap. | ✅ | ✅ | ✅ |
| 151 | [Bit Manipulation](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0151-Bit-Manipulation) | Advanced bit manipulation techniques. | ✅ | ✅ | ✅ |
| 152 | [Array Map](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0152-Array-Map) | Apply function to array elements. | ✅ | ✅ | ✅ |
| 153 | [String Format](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0153-String-Format) | Format string with placeholders. | ✅ | ✅ | ✅ |
| 154 | [SSE Matrix Multiply](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0154-SSE-Matrix-Multiply) | Multiply matrices using SSE. | ✅ | ✅ | ✅ |
| 155 | [File Copy](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0155-File-Copy) | Copy contents of one file to another. | ✅ | ✅ | ✅ |
| 156 | [Recursive Sum](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0156-Recursive-Sum) | Sum array recursively. | ✅ | ✅ | ✅ |
| 157 | [Thread Pool](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0157-Thread-Pool) | Implement a simple thread pool. | ✅ | ✅ | ✅ |
| 158 | [Struct Array](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0158-Struct-Array) | Array of structs in memory. | ✅ | ✅ | ✅ |
| 159 | [String Parse Int](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0159-String-Parse-Int) | Parse string to integer. | ✅ | ✅ | ✅ |
| 160 | [Matrix Inverse](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0160-Matrix-Inverse) | Compute matrix inverse. | ✅ | ✅ | ✅ |
| 161 | [Linked List Reverse](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0161-Linked-List-Reverse) | Reverse a linked list. | ✅ | ✅ | ✅ |
| 162 | [SSE Vector Normalize](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0162-SSE-Vector-Normalize) | Normalize vector using SSE. | ✅ | ✅ | ✅ |
| 163 | [File Delete](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0163-File-Delete) | Delete a file using `unlink`. | ✅ | ✅ | ✅ |
| 164 | [Recursive Binary Search](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0164-Recursive-Binary-Search) | Recursive binary search on array. | ✅ | ✅ | ✅ |
| 165 | [Macro Loop](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0165-Macro-Loop) | Use macro for loop generation. | ✅ | ✅ | ✅ |
| 166 | [String Split](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0166-String-Split) | Split string into array of strings. | ✅ | ✅ | ✅ |
| 167 | [Floating Point Power](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0167-Floating-Point-Power) | Compute power for floats. | ✅ | ✅ | ✅ |
| 168 | [Heap Realloc](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0168-Heap-Realloc) | Reallocate heap memory. | ✅ | ✅ | ✅ |
| 169 | [Thread Synchronization](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0169-Thread-Synchronization) | Synchronize threads with spinlock. | ✅ | ✅ | ✅ |
| 170 | [Matrix Transpose](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0170-Matrix-Transpose) | Transpose a matrix using loops. | ✅ | ✅ | ✅ |
| 171 | [Linked List Sort](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0171-Linked-List-Sort) | Sort a linked list. | ✅ | ✅ | ✅ |
| 172 | [SSE Cross Product](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0172-SSE-Cross-Product) | Compute cross product using SSE. | ✅ | ✅ | ✅ |
| 173 | [File Permissions](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0173-File-Permissions) | Change file permissions using `chmod`. | ✅ | ✅ | ✅ |
| 174 | [Recursive Merge Sort](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0174-Recursive-Merge-Sort) | Implement merge sort recursively. | ✅ | ✅ | ✅ |
| 175 | [String To Float](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0175-String-To-Float) | Parse string to floating-point number. | ✅ | ✅ | ✅ |
| 176 | [Dynamic Struct](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0176-Dynamic-Struct) | Allocate struct on heap. | ✅ | ✅ | ✅ |
| 177 | [SSE Matrix Inverse](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0177-SSE-Matrix-Inverse) | Compute matrix inverse using SSE. | ✅ | ✅ | ✅ |
| 178 | [File Lock](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0178-File-Lock) | Lock a file using `flock`. | ✅ | ✅ | ✅ |
| 179 | [Recursive Tree Traversal](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0179-Recursive-Tree-Traversal) | Traverse a binary tree recursively. | ✅ | ✅ | ✅ |
| 180 | [String Encode](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0180-String-Encode) | Encode string (e.g., Base64). | ✅ | ✅ | ✅ |
| 181 | [Linked List Merge](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0181-Linked-List-Merge) | Merge two linked lists. | ✅ | ✅ | ✅ |
| 182 | [SSE Vector Distance](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0182-SSE-Vector-Distance) | Compute vector distance using SSE. | ✅ | ✅ | ✅ |
| 183 | [File Rename](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0183-File-Rename) | Rename a file using `rename`. | ✅ | ✅ | ✅ |
| 184 | [Recursive Quick Sort](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0184-Recursive-Quick-Sort) | Implement quicksort recursively. | ✅ | ✅ | ✅ |
| 185 | [String Decode](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0185-String-Decode) | Decode string (e.g., Base64). | ✅ | ✅ | ✅ |
| 186 | [Dynamic Tree Node](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0186-Dynamic-Tree-Node) | Allocate binary tree node on heap. | ✅ | ✅ | ✅ |
| 187 | [SSE Matrix Determinant](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0187-SSE-Matrix-Determinant) | Compute determinant using SSE. | ✅ | ✅ | ✅ |
| 188 | [File Truncate](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0188-File-Truncate) | Truncate a file using `truncate`. | ✅ | ✅ | ✅ |
| 189 | [Recursive Factorial Tail](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0189-Recursive-Factorial-Tail) | Tail-recursive factorial. | ✅ | ✅ | ✅ |
| 190 | [String Hash](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0190-String-Hash) | Compute hash of a string. | ✅ | ✅ | ✅ |
| 191 | [Linked List Cycle](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0191-Linked-List-Cycle) | Detect cycle in linked list. | ✅ | ✅ | ✅ |
| 192 | [SSE Matrix Transpose](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0192-SSE-Matrix-Transpose) | Transpose matrix using SSE. | ✅ | ✅ | ✅ |
| 193 | [File Stats](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0193-File-Stats) | Get file stats using `stat`. | ✅ | ✅ | ✅ |
| 194 | [Recursive Heap Sort](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0194-Recursive-Heap-Sort) | Implement heap sort recursively. | ✅ | ✅ | ✅ |
| 195 | [String Compress](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0195-String-Compress) | Compress string using run-length encoding. | ✅ | ✅ | ✅ |
| 196 | [Dynamic Hash Table](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0196-Dynamic-Hash-Table) | Implement a hash table on heap. | ✅ | ✅ | ✅ |
| 197 | [SSE Vector Rotate](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0197-SSE-Vector-Rotate) | Rotate vector using SSE. | ✅ | ✅ | ✅ |
| 198 | [File Monitor](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0198-File-Monitor) | Monitor file changes using `inotify`. | ✅ | ✅ | ✅ |
| 199 | [Recursive Tree Search](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0199-Recursive-Tree-Search) | Search binary tree recursively. | ✅ | ✅ | ✅ |
| 200 | [Matrix Transpose](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0200-Matrix-Transpose) | Transpose a matrix using loops. | ✅ | ✅ | ✅ |

## Advanced Snippets (201–300)
| # | Name | Description | Snippet | Cheatsheet | Sample |
|---|------|-------------|:-------:|:----------:|:------:|
| 201 | [Simple Bootloader](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0201-Simple-Bootloader) | Write a minimal bootloader. | ✅ | ✅ | ✅ |
| 202 | [Kernel Module](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0202-Kernel-Module) | Create a Linux kernel module. | ✅ | ✅ | ✅ |
| 203 | [Interrupt Handler](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0203-Interrupt-Handler) | Set up an interrupt handler. | ✅ | ✅ | ✅ |
| 204 | [Memory Allocator](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0204-Memory-Allocator) | Implement a simple heap allocator. | ✅ | ✅ | ✅ |
| 205 | [Port IO](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0205-Port-IO) | Read/write to hardware ports. | ✅ | ✅ | ✅ |
| 206 | [Disassemble Binary](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0206-Disassemble-Binary) | Disassemble a binary with `objdump`. | ✅ | ✅ | ✅ |
| 207 | [Self Modifying Code](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0207-Self-Modifying-Code) | Write self-modifying code. | ✅ | ✅ | ✅ |
| 208 | [AES Encryption](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0208-AES-Encryption) | Implement AES encryption. | ✅ | ✅ | ✅ |
| 209 | [Shellcode Spawn](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0209-Shellcode-Spawn) | Write shellcode to spawn a shell. | ✅ | ✅ | ✅ |
| 210 | [Custom ISA Emulator](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0210-Custom-ISA-Emulator) | Emulate a toy instruction set. | ✅ | ✅ | ✅ |
| 211 | [VGA Graphics](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0211-VGA-Graphics) | Draw pixels in VGA mode. | ❌ | ❌ | ❌ |
| 212 | [Kernel Syscall](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0212-Kernel-Syscall) | Implement custom syscall in kernel. | ❌ | ❌ | ❌ |
| 213 | [IDT Setup](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0213-IDT-Setup) | Set up Interrupt Descriptor Table. | ❌ | ❌ | ❌ |
| 214 | [Page Table](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0214-Page-Table) | Configure a page table. | ❌ | ❌ | ❌ |
| 215 | [Device Driver](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0215-Device-Driver) | Write a simple device driver. | ❌ | ❌ | ❌ |
| 216 | [Code Obfuscation](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0216-Code-Obfuscation) | Obfuscate code with jump table. | ❌ | ❌ | ❌ |
| 217 | [SHA Hash](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0217-SHA-Hash) | Implement SHA-256 hash. | ❌ | ❌ | ❌ |
| 218 | [Shellcode Reverse Shell](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0218-Shellcode-Reverse-Shell) | Shellcode for reverse shell. | ❌ | ❌ | ❌ |
| 219 | [AVX Vector Add](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0219-AVX-Vector-Add) | Vector addition using AVX. | ❌ | ❌ | ❌ |
| 220 | [Simple OS Kernel](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0220-Simple-OS-Kernel) | Minimal OS kernel with boot. | ❌ | ❌ | ❌ |
| 221 | [Memory Protection](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0221-Memory-Protection) | Set memory protection with `mprotect`. | ❌ | ❌ | ❌ |
| 222 | [Keyboard Interrupt](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0222-Keyboard-Interrupt) | Handle keyboard interrupt. | ❌ | ❌ | ❌ |
| 223 | [Custom Allocator](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0223-Custom-Allocator) | Advanced custom memory allocator. | ❌ | ❌ | ❌ |
| 224 | [GPU Shader](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0224-GPU-Shader) | Write a simple GPU shader. | ❌ | ❌ | ❌ |
| 225 | [Reverse Engineer Loop](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0225-Reverse-Engineer-Loop) | Reverse engineer a loop construct. | ❌ | ❌ | ❌ |
| 226 | [RSA Encryption](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0226-RSA-Encryption) | Implement RSA encryption. | ❌ | ❌ | ❌ |
| 227 | [Shellcode Inject](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0227-Shellcode-Inject) | Inject shellcode into process. | ❌ | ❌ | ❌ |
| 228 | [AVX Matrix Multiply](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0228-AVX-Matrix-Multiply) | Matrix multiply using AVX. | ❌ | ❌ | ❌ |
| 229 | [Simple File System](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0229-Simple-File-System) | Implement a basic file system. | ❌ | ❌ | ❌ |
| 230 | [Timer Interrupt](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0230-Timer-Interrupt) | Handle timer interrupt. | ❌ | ❌ | ❌ |
| 231 | [Memory Cache Optimize](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0231-Memory-Cache-Optimize) | Optimize code for cache efficiency. | ❌ | ❌ | ❌ |
| 232 | [Network Socket](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0232-Network-Socket) | Create a TCP socket. | ❌ | ❌ | ❌ |
| 233 | [Code Polymorphism](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0233-Code-Polymorphism) | Write polymorphic code. | ❌ | ❌ | ❌ |
| 234 | [SHA512 Hash](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0234-SHA512-Hash) | Implement SHA-512 hash. | ❌ | ❌ | ❌ |
| 235 | [Shellcode Bind Shell](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0235-Shellcode-Bind-Shell) | Shellcode for bind shell. | ❌ | ❌ | ❌ |
| 236 | [AVX Vector Normalize](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0236-AVX-Vector-Normalize) | Normalize vector using AVX. | ❌ | ❌ | ❌ |
| 237 | [Task Scheduler](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0237-Task-Scheduler) | Implement a simple task scheduler. | ❌ | ❌ | ❌ |
| 238 | [Page Fault Handler](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0238-Page-Fault-Handler) | Handle page faults in kernel. | ❌ | ❌ | ❌ |
| 239 | [Memory Compression](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0239-Memory-Compression) | Compress memory block. | ❌ | ❌ | ❌ |
| 240 | [Network Packet](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0240-Network-Packet) | Craft a network packet. | ❌ | ❌ | ❌ |
| 241 | [Anti Debugging](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0241-Anti-Debugging) | Implement anti-debugging techniques. | ❌ | ❌ | ❌ |
| 242 | [ECDSA Signature](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0242-ECDSA-Signature) | Implement ECDSA signature. | ❌ | ❌ | ❌ |
| 243 | [Shellcode Stealth](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0243-Shellcode-Stealth) | Write stealthy shellcode. | ❌ | ❌ | ❌ |
| 244 | [AVX Matrix Inverse](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0244-AVX-Matrix-Inverse) | Compute matrix inverse using AVX. | ❌ | ❌ | ❌ |
| 245 | [Process Fork](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0245-Process-Fork) | Fork a process using syscall. | ❌ | ❌ | ❌ |
| 246 | [Exception Handler](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0246-Exception-Handler) | Handle exceptions in kernel. | ❌ | ❌ | ❌ |
| 247 | [Memory Encryption](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0247-Memory-Encryption) | Encrypt memory block. | ❌ | ❌ | ❌ |
| 248 | [Network Server](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0248-Network-Server) | Implement a simple TCP server. | ❌ | ❌ | ❌ |
| 249 | [Code Encryption](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0249-Code-Encryption) | Encrypt code section. | ❌ | ❌ | ❌ |
| 250 | [AVX Dot Product](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0250-AVX-Dot-Product) | Compute dot product using AVX. | ❌ | ❌ | ❌ |
| 251 | [Virtual Machine](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0251-Virtual-Machine) | Implement a simple VM. | ❌ | ❌ | ❌ |
| 252 | [Signal Handler](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0252-Signal-Handler) | Handle signals using `sigaction`. | ❌ | ❌ | ❌ |
| 253 | [Memory Alignment](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0253-Memory-Alignment) | Align memory for performance. | ❌ | ❌ | ❌ |
| 254 | [Network Client](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0254-Network-Client) | Implement a TCP client. | ❌ | ❌ | ❌ |
| 255 | [Code Packing](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0255-Code-Packing) | Pack code for size optimization. | ❌ | ❌ | ❌ |
| 256 | [AVX Cross Product](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0256-AVX-Cross-Product) | Compute cross product using AVX. | ❌ | ❌ | ❌ |
| 257 | [Process Injection](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0257-Process-Injection) | Inject code into running process. | ❌ | ❌ | ❌ |
| 258 | [Memory Paging](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0258-Memory-Paging) | Implement basic paging. | ❌ | ❌ | ❌ |
| 259 | [Crypto Hash](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0259-Crypto-Hash) | Implement a custom crypto hash. | ❌ | ❌ | ❌ |
| 260 | [Shellcode Loader](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0260-Shellcode-Loader) | Load and execute shellcode. | ❌ | ❌ | ❌ |
| 261 | [Real Time Interrupt](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0261-Real-Time-Interrupt) | Handle real-time interrupts. | ❌ | ❌ | ❌ |
| 262 | [Memory Decompression](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0262-Memory-Decompression) | Decompress memory block. | ❌ | ❌ | ❌ |
| 263 | [Network Sniffer](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0263-Network-Sniffer) | Sniff network packets. | ❌ | ❌ | ❌ |
| 264 | [Code Anti Analysis](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0264-Code-Anti-Analysis) | Anti-analysis techniques for code. | ❌ | ❌ | ❌ |
| 265 | [AVX Matrix Determinant](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0265-AVX-Matrix-Determinant) | Compute determinant using AVX. | ❌ | ❌ | ❌ |
| 266 | [Process Monitor](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0266-Process-Monitor) | Monitor process creation. | ❌ | ❌ | ❌ |
| 267 | [Memory Snapshot](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0267-Memory-Snapshot) | Take snapshot of memory state. | ❌ | ❌ | ❌ |
| 268 | [Network Broadcast](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0268-Network-Broadcast) | Send broadcast packet. | ❌ | ❌ | ❌ |
| 269 | [Code Self Decrypt](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0269-Code-Self-Decrypt) | Self-decrypting code. | ❌ | ❌ | ❌ |
| 270 | [AVX Vector Distance](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0270-AVX-Vector-Distance) | Compute vector distance using AVX. | ❌ | ❌ | ❌ |
| 271 | [Thread Scheduler](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0271-Thread-Scheduler) | Implement thread scheduler. | ❌ | ❌ | ❌ |
| 272 | [Memory Virtualization](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0272-Memory-Virtualization) | Virtualize memory access. | ❌ | ❌ | ❌ |
| 273 | [Crypto Stream Cipher](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0273-Crypto-Stream-Cipher) | Implement stream cipher. | ❌ | ❌ | ❌ |
| 274 | [Shellcode Obfuscation](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0274-Shellcode-Obfuscation) | Obfuscate shellcode. | ❌ | ❌ | ❌ |
| 275 | [AVX Matrix Transpose](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0275-AVX-Matrix-Transpose) | Transpose matrix using AVX. | ❌ | ❌ | ❌ |
| 276 | [Process Fork Exec](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0276-Process-Fork-Exec) | Fork and exec a process. | ❌ | ❌ | ❌ |
| 277 | [Memory Tracing](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0277-Memory-Tracing) | Trace memory accesses. | ❌ | ❌ | ❌ |
| 278 | [Network UDP](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0278-Network-UDP) | Implement UDP communication. | ❌ | ❌ | ❌ |
| 279 | [Code Anti Tamper](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0279-Code-Anti-Tamper) | Implement anti-tamper mechanisms. | ❌ | ❌ | ❌ |
| 280 | [AVX Vector Rotate](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0280-AVX-Vector-Rotate) | Rotate vector using AVX. | ❌ | ❌ | ❌ |
| 281 | [Kernel Thread](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0281-Kernel-Thread) | Create kernel thread. | ❌ | ❌ | ❌ |
| 282 | [Memory Sandbox](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0282-Memory-Sandbox) | Implement memory sandbox. | ❌ | ❌ | ❌ |
| 283 | [Crypto Block Cipher](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0283-Crypto-Block-Cipher) | Implement block cipher. | ❌ | ❌ | ❌ |
| 284 | [Shellcode Anti Debug](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0284-Shellcode-Anti-Debug) | Shellcode with anti-debugging. | ❌ | ❌ | ❌ |
| 285 | [AVX Matrix Solve](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0285-AVX-Matrix-Solve) | Solve matrix system using AVX. | ❌ | ❌ | ❌ |
| 286 | [Process Hooking](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0286-Process-Hooking) | Hook a process function. | ❌ | ❌ | ❌ |
| 287 | [Memory Forensics](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0287-Memory-Forensics) | Analyze memory for forensics. | ❌ | ❌ | ❌ |
| 288 | [Network Firewall](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0288-Network-Firewall) | Implement basic firewall rules. | ❌ | ❌ | ❌ |
| 289 | [Code Signing](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0289-Code-Signing) | Implement code signing. | ❌ | ❌ | ❌ |
| 290 | [AVX Vector Transform](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0290-AVX-Vector-Transform) | Transform vector using AVX. | ❌ | ❌ | ❌ |
| 291 | [Kernel Debug](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0291-Kernel-Debug) | Debug kernel with breakpoints. | ❌ | ❌ | ❌ |
| 292 | [Memory Isolation](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0292-Memory-Isolation) | Isolate memory regions. | ❌ | ❌ | ❌ |
| 293 | [Crypto Key Exchange](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0293-Crypto-Key-Exchange) | Implement key exchange. | ❌ | ❌ | ❌ |
| 294 | [Shellcode Persistence](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0294-Shellcode-Persistence) | Persistent shellcode execution. | ❌ | ❌ | ❌ |
| 295 | [AVX Matrix Eigen](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0295-AVX-Matrix-Eigen) | Compute eigenvalues using AVX. | ❌ | ❌ | ❌ |
| 296 | [Process Migration](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0296-Process-Migration) | Migrate process to another CPU. | ❌ | ❌ | ❌ |
| 297 | [Memory Encryption AES](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0297-Memory-Encryption-AES) | Encrypt memory with AES. | ❌ | ❌ | ❌ |
| 298 | [Network Protocol](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0298-Network-Protocol) | Implement custom protocol. | ❌ | ❌ | ❌ |
| 299 | [Code Virtualization](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0299-Code-Virtualization) | Virtualize code execution. | ❌ | ❌ | ❌ |
| 300 | [Shellcode Execve](https://github.com/VoxDroid/assembly-300-snippets/tree/main/assembly-300-snippets/0300-Shellcode-Execve) | Shellcode to execute a program. | ❌ | ❌ | ❌ |