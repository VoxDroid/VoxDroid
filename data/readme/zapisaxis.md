# ZapisAxis - Financial Management System for SOCCS

<div align="center">
  <img width="500px" src="https://github.com/VoxDroid/ZapisAxis/blob/master/ZapisAxisL.png" alt="ZapisAxis Logo">
</div>

<div align="center">
  <br>
  <img alt="GitHub all releases" src="https://img.shields.io/github/downloads/VoxDroid/ZapisAxis/total?style=flat-square&svg=true">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/VoxDroid/ZapisAxis?style=flat-square&svg=true">
  <img alt="Last Commit" src="https://img.shields.io/github/last-commit/VoxDroid/ZapisAxis?style=flat-square&svg=true">
  <img alt="License" src="https://img.shields.io/github/license/VoxDroid/ZapisAxis?style=flat-square&svg=true">
</div>

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [System Architecture](#system-architecture)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Database Structure](#database-structure)
- [Security Features](#security-features)
- [Export Options](#export-options)
- [Backup and Recovery](#backup-and-recovery)
- [Demo Images](#demo-images)
- [Contributing](#contributing)
- [Code of Conduct](#code-of-conduct)
- [Security](#security)
- [Support](#support)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## Introduction

ZapisAxis is a comprehensive Financial Management System (FMS) developed as a college project for the **ITEC 204** course at **Laguna State Polytechnic University - San Pablo City Campus (LSPU-SCC)**. Designed specifically for the **Student Organization of the College of Computer Studies (SOCCS)**, ZapisAxis provides an intuitive and robust platform to manage financial operations, including budgeting, expense tracking, student payment records, and transaction logging. Built using **C#** with a **MySQL** backend, this application serves as both a practical learning tool for students and a functional solution for SOCCS's financial management needs.

The system aims to streamline financial processes, enhance transparency, and ensure accountability while offering a user-friendly interface tailored to the needs of a student organization. ZapisAxis is open-source, allowing for further development and customization by the community.

## Features

ZapisAxis offers a wide range of features to support efficient financial management:

- **User-Friendly Interface**: A clean, intuitive design built with **Bunifu UI** and **Guna UI** frameworks, ensuring ease of navigation for users with varying technical expertise.
- **Budget Tracking**: Manage budgets for events, projects, and activities with real-time tracking of allocations and remaining funds (`SubBudMan.cs`, `ModBudMan.cs`).
- **Expense Management**: Record, categorize, and analyze expenses to monitor spending patterns and make informed financial decisions (`SubTranLo.cs`, `ModTranLo.cs`).
- **Student Payment Management**: Track student charges, payments, and debts, with automated status updates (e.g., Paid, Partial) (`StudentFile.cs`, `ModStudFil.cs`).
- **Transaction Logs**: Maintain a detailed history of financial transactions for auditing and reference purposes (`SubTranLo.cs`, `ModTranLo.cs`).
- **Dashboard**: Provides a quick overview of key financial metrics, including total funds, uncollected dues, and charged amounts.
- **Export Options**: Export financial data in multiple formats (CSV, Excel, PDF, JSON, XML, SQLite, TXT) for reporting and external analysis (`Export.cs`).
- **Backup and Recovery**: Safeguard data with backup generation and database restoration capabilities (`Settings.cs`).
- **Data Migrations**: Seamlessly migrate data between environments to support scalability and testing.
- **Security Features**: Implement user authentication, role-based access, security questions for account recovery, and animated login transitions (`Login.cs`, `SetupSQ.cs`, `Recovery.cs`).
- **Database Management**: Reset or delete specific data categories (e.g., budget management, transaction logs, student files) with reset key authentication (`Settings.cs`).
- **Admin Controls**: Manage user accounts, set reset keys, and configure security settings (exclusive to admin users) (`AdminPage.cs`).

## System Architecture

ZapisAxis is built using a client-server architecture with the following components:

- **Frontend**: A Windows Forms application developed in **C#**, utilizing **Bunifu UI** and **Guna UI** for a modern, responsive interface.
- **Backend**: A **MySQL** database (`zapisaxisfms`) hosted locally via **XAMPP**, storing financial and user data.
- **Data Access**: The application interacts with the MySQL database using the **MySql.Data.MySqlClient** library for secure and efficient data operations.
- **External Libraries**:
  - **ClosedXML**: For exporting data to Excel.
  - **PdfSharp**: For generating PDF reports.
  - **Newtonsoft.Json**: For JSON serialization.
  - **System.Data.SQLite**: For exporting data to SQLite databases.

The system follows a modular design, with separate classes for managing different functionalities (e.g., `Dashboard.cs`, `StudentFile.cs`, `ModStudFil.cs`, `SubBudMan.cs`, `ModBudMan.cs`, `SubTranLo.cs`, `ModTranLo.cs`, `Export.cs`, `AdminPage.cs`, `Login.cs`), ensuring maintainability and scalability.

## System Requirements

To run ZapisAxis, ensure your system meets the following requirements:

- **Operating System**: Windows 10 or later (64-bit recommended)
- **.NET Framework**: Version 4.7.2 or higher
- **Database**: MySQL (via XAMPP 7.4.8 or later)
- **Hardware**:
  - Processor: 1 GHz or faster
  - RAM: 4 GB or more
  - Disk Space: 500 MB for installation and database storage
- **Dependencies**:
  - XAMPP (for MySQL and Apache)
  - Visual C++ Redistributable for Visual Studio 2015-2022
- **Optional**: Internet connection for downloading dependencies or updates

## Installation

Follow these steps to install ZapisAxis on your system:

1. **Install XAMPP**:
   - Download XAMPP from [https://www.apachefriends.org](https://www.apachefriends.org).
   - Install XAMPP, ensuring MySQL and Apache are selected.
   - Start the Apache and MySQL services using the XAMPP Control Panel.

2. **Download ZapisAxis**:
   - Download the latest executable (`.msi`) from the [GitHub Releases page](https://github.com/VoxDroid/ZapisAxis/releases).
   - Alternatively, clone the repository:
     ```bash
     git clone https://github.com/VoxDroid/ZapisAxis.git
     ```

3. **Run the Installer**:
   - Double-click the `.msi` file and follow the on-screen instructions to install ZapisAxis.
   - If building from source, open the project in **Visual Studio**, restore NuGet packages, and build the solution.

4. **Set Up the Database**:
   - Open the XAMPP Control Panel and ensure MySQL is running.
   - Access **phpMyAdmin** (http://localhost/phpmyadmin) and create a database named `zapisaxisfms`.
   - The application will automatically initialize the database schema upon first run (`DatabaseInitializer.cs`).

5. **Verify Installation**:
   - Launch ZapisAxis and log in using the default credentials (username: `admin`, password: `admin`).
   - Ensure the application connects to the MySQL database without errors.

## Getting Started

1. **Launch XAMPP**:
   - Start the MySQL and Apache services via the XAMPP Control Panel.

2. **Run ZapisAxis**:
   - Open the ZapisAxis application from the Start menu or by double-clicking the executable.

3. **Log In**:
   - Use the default credentials (username: `admin`, password: `admin`) for initial access.
   - For security, update the admin password and set up security questions via the **Admin Page** (`AdminPage.cs`).

4. **Explore Features**:
   - Navigate through the dashboard, budget management, transaction logs, student file, and other modules.
   - Customize settings, manage users, and configure backups as needed.

## Usage

ZapisAxis is designed for ease of use, with a modular interface organized into the following pages:

- **Dashboard** (`Dashboard.cs`):
  - Displays key financial metrics (total funds, uncollected dues, charged amounts).
  - Lists recent transactions from the `studfil` table.
  - Supports refreshing data with a single click.

- **Budget Management** (`SubBudMan.cs`, `ModBudMan.cs`):
  - Create budgets with details like name, category, allocation, and remaining funds (`SubBudMan.cs`).
  - Modify or delete existing budgets, with validation to prevent duplicates (`ModBudMan.cs`).
  - Filter budgets by category, allocation, or name, with sorting options.

- **Transaction Logs** (`SubTranLo.cs`, `ModTranLo.cs`):
  - Record financial transactions with details like date, name, description, category, and amount (`SubTranLo.cs`).
  - Modify or delete transactions, with confirmation dialogs for changes (`ModTranLo.cs`).
  - Supports sorting, filtering, and recent category suggestions.

- **Student File** (`StudentFile.cs`, `ModStudFil.cs`):
  - Manage student payment records, including charges, amounts paid, payment dates, and statuses (`StudentFile.cs`).
  - Update payment records and automatically adjust debt amounts in the `studdeb` table (`ModStudFil.cs`).
  - Display total charges and funds collected, with filtering by payment status.

- **Export** (`Export.cs`):
  - Export data from budget management, transaction logs, or student files in various formats.
  - Choose a destination folder and file format via a user-friendly dialog.

- **Admin Page** (`AdminPage.cs`):
  - Manage user accounts (create, update, delete).
  - Set or generate reset keys for database operations.
  - Export user account details to a recovery file (`za_recoveraccounts_YYYYMMDD.txt`).

- **Settings** (`Settings.cs`):
  - Reset specific data categories (budget management, transaction logs, student files) with reset key authentication.
  - Generate database backups or import existing backups.
  - Reset the entire database (drops and recreates `zapisaxisfms`).

- **Login** (`Login.cs`):
  - Animated login interface with loading animations and control box toggles.
  - Validates credentials against the `users` table and enforces security question setup for first-time logins.

- **Security Questions** (`SetupSQ.cs`):
  - Set up or update three security questions for account recovery.
  - View stored questions and answers (admin-only).

- **Recovery** (`Recovery.cs`):
  - Recover admin credentials by answering security questions.
  - Displays questions and validates answers against stored data.

### Key Workflows

- **Creating a Budget**:
  1. Navigate to **Budget Management** (`SubBudMan.cs`).
  2. Click **Create Budget** to open the budget creation form.
  3. Enter details (name, category, allocation, remaining) and save.

- **Recording a Student Payment**:
  1. Go to **Student File** (`StudentFile.cs`).
  2. Click **Create** to add a new payment record.
  3. Enter student details, charge, and amount paid; the system updates debt and status automatically.

- **Exporting Data**:
  1. Go to the **Export** page (`Export.cs`).
  2. Select a table (e.g., Student File) and format (e.g., PDF).
  3. Choose a save location and export the file.

- **Recovering Admin Access**:
  1. Open the **Recovery** form from the login screen (`Recovery.cs`).
  2. Answer the three security questions.
  3. Retrieve the admin username and password if answers are correct.

## Database Structure

The `zapisaxisfms` database consists of the following key tables:

- **budman** (Budget Management):
  - `bm_id` (Primary Key): Unique budget ID.
  - `name`: Budget name.
  - `category`: Budget category (e.g., Event, Project).
  - `allocation`: Allocated amount.
  - `remaining`: Remaining budget.

- **tranlo** (Transaction Logs):
  - `tl_id` (Primary Key): Unique transaction ID.
  - `date`: Transaction date.
  - `name`: Transaction name.
  - `description`: Transaction details.
  - `category`: Transaction category.
  - `amount`: Transaction amount.

- **studfil** (Student File):
  - `pm_id` (Primary Key): Payment ID.
  - `sn_id`: Student ID (links to `studname`).
  - `name`: Student name.
  - `charge`: Charged amount.
  - `amountpaid`: Paid amount.
  - `paymentdate`: Payment date.
  - `paymentstatus`: Payment status (e.g., Paid, Partial).

- **studdeb** (Student Debts):
  - `sn_id` (Primary Key): Student ID.
  - `debtamount`: Total unpaid dues.
  - `hasdebt`: Boolean indicating debt status.

- **studname** (Student Names):
  - `sn_id` (Primary Key): Unique student ID.
  - `name`: Student full name.

- **users**:
  - `user_id` (Primary Key): Unique user ID.
  - `username`: User login name.
  - `password`: User password (stored in plain text; consider encryption in future versions).

- **su** (Super Users):
  - `user_id`: Links to `users` table to identify admin accounts.

- **securityquestions**:
  - `sqs_id` (Primary Key): Unique ID (set to 1).
  - `sq1`, `sq2`, `sq3`: Security questions.
  - `sq1a`, `sq2a`, `sq3a`: Corresponding answers.

- **resetkeys**:
  - `id` (Primary Key): Unique ID (set to 1).
  - `reset_key`: Key for authorizing database resets.

The database is initialized automatically upon first run (`DatabaseInitializer.cs`), creating all necessary tables and setting default values (e.g., admin user).

## Security Features

ZapisAxis incorporates several security mechanisms to protect data and access:

- **User Authentication**:
  - Users log in with a username and password stored in the `users` table (`Login.cs`).
  - Admin accounts (marked in the `su` table) have elevated privileges.

- **Role-Based Access**:
  - Only admin users can access the **Admin Page** and perform actions like user management or reset key configuration (`AdminPage.cs`).

- **Security Questions**:
  - Users can set three security questions for account recovery (`SetupSQ.cs`).
  - Answers are stored in the `securityquestions` table and validated case-insensitively.

- **Reset Key**:
  - A unique reset key (stored in `resetkeys`) is required for sensitive operations like data deletion or database resets.
  - Admins can generate or update the reset key via the **Admin Page** (`AdminPage.cs`).

- **Recovery File**:
  - User account details are exported to a `za_recoveraccounts_YYYYMMDD.txt` file when creating, updating, or deleting users, ensuring a backup for recovery.

- **Animated Login**:
  - The login interface features smooth animations for loading, control toggles, and transitions, enhancing user experience (`Login.cs`).

**Note**: Passwords are currently stored in plain text. For production use, consider implementing password hashing (e.g., using BCrypt or SHA-256) to enhance security.

## Export Options

ZapisAxis supports exporting data in the following formats:

- **CSV**: Comma-separated values for easy import into spreadsheets.
- **Excel (XLSX)**: Formatted spreadsheets using ClosedXML.
- **PDF**: Printable reports generated with PdfSharp.
- **JSON**: Structured data for interoperability, using Newtonsoft.Json.
- **XML**: Hierarchical data format for compatibility with other systems.
- **SQLite**: Portable database file for offline use.
- **TXT**: Plain text with tab-separated values.

To export data:
1. Navigate to the **Export** page (`Export.cs`).
2. Select the table (Budget Management, Transaction Logs, or Student File).
3. Choose the desired format and save location.
4. The system validates data availability before exporting.

## Backup and Recovery

ZapisAxis provides robust backup and recovery options to ensure data safety:

- **Backup Database**:
  - Generates a `.sql` file (e.g., `zapisaxisfms_backup_YYYYMMDD_HHMMSS.sql`) containing the entire database.
  - Requires reset key authentication.
  - Accessible via the **Settings** page (`Settings.cs`).

- **Import Database**:
  - Overwrites the existing database with data from a selected `.sql` file.
  - Requires reset key and confirmation text (`IMPORT`).
  - Restarts the application upon successful import.

- **Reset Database**:
  - Drops and recreates the `zapisaxisfms` database, initializing it with default schema and data.
  - Requires reset key and confirmation text (`RESET`).
  - Restarts the application after completion.

- **Account Recovery**:
  - Admins can recover credentials by answering security questions via the **Recovery** form (`Recovery.cs`).
  - The system retrieves the admin username and password from the `users` table if answers match.

## Demo Images

Below are screenshots showcasing ZapisAxis's interface and functionality:

<div align="center">
  <img src="https://github.com/VoxDroid/ZapisAxis/blob/master/Demo_Images/ZAPISAXIS%20(6).PNG" alt="Dashboard" width="400">
  <img src="https://github.com/VoxDroid/ZapisAxis/blob/master/Demo_Images/ZAPISAXIS%20(1).PNG" alt="Budget Management" width="400">
  <img src="https://github.com/VoxDroid/ZapisAxis/blob/master/Demo_Images/ZAPISAXIS%20(2).PNG" alt="Transaction Logs" width="400">
  <img src="https://github.com/VoxDroid/ZapisAxis/blob/master/Demo_Images/ZAPISAXIS%20(3).PNG" alt="Export Page" width="400">
  <img src="https://github.com/VoxDroid/ZapisAxis/blob/master/Demo_Images/ZAPISAXIS%20(4).PNG" alt="Settings" width="400">
</div>

## Contributing

We welcome contributions to ZapisAxis! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started, submit changes, and adhere to our guidelines.

## Code of Conduct

To foster a positive and inclusive community, all contributors and users are expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it to understand the expectations for behavior in our project.

## Security

Security is a priority for ZapisAxis. If you discover any security vulnerabilities, please report them responsibly by following the guidelines in our [Security Policy](SECURITY.md).

## Support

Need help with ZapisAxis? Check out our [Support Guide](SUPPORT.md) for resources, troubleshooting tips, and ways to get assistance from the community or maintainers.

## License

ZapisAxis is licensed under the [Apache License 2.0](LICENSE). You are free to use, modify, and distribute the software, provided you include the original copyright notice and disclaimers.

## Contact

For questions, bug reports, or feature requests, please contact:

- **Maintainer**: VoxDroid
- **Email**: izeno.contact@gmail.com
- **GitHub Issues**: [https://github.com/VoxDroid/ZapisAxis/issues](https://github.com/VoxDroid/ZapisAxis/issues)

## Acknowledgements

- **Laguna State Polytechnic University - SCC**: For providing the academic framework for this project.
- **Bunifu UI and Guna UI**: For their sleek and modern UI components.
- **MySQL and XAMPP**: For reliable database and server management.
- **Open-Source Community**: For libraries like ClosedXML, PdfSharp, and Newtonsoft.Json.

---

<div align="center">
  <p><strong>Developed by <a href="https://github.com/VoxDroid">VoxDroid</a></strong></p>
  <p>Enjoying ZapisAxis? Consider supporting the project!</p>
  <a href="https://ko-fi.com/O4O6LO7Q1" target="_blank">
    <img src="https://ko-fi.com/img/githubbutton_sm.svg" alt="Support on Ko-fi" style="border: 0;">
  </a>
</div>

---