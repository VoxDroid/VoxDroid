# Eventra (EMS)

### A Premium Event Management System built with Laravel 12 & Filament v4

Eventra is a modern, high-performance event management platform designed for universities, organizations, and professional communities. It features a stunning glassmorphic dark theme, real-time interactivity, and a robust administrative core.

## Key Features

-   **Multi-Step Event Submission**: A stateful wizard with real-time venue conflict detection.
-   **Interactive Calendar**: FullCalendar v6 integration with category color-coding and responsive views.
-   **Threaded Discussions**: Real-time comments with infinite scrolling and inline replies.
-   **Advanced Directory**: Explore Venues and Organizations with a sleek, searchable interface.
-   **Security First**: Built-in XSS protection, rate limiting, and role-based access control (RBAC).
-   **Admin Suite**: Comprehensive management for events, users, and system monitoring powered by Filament.

## Tech Stack

-   **Backend**: [Laravel 12](https://laravel.com/) (latest)
-   **Admin Panel**: [Filament v4](https://filamentphp.com/)
-   **Interactivity**: [Livewire v3](https://livewire.laravel.com/) & [Alpine.js](https://alpinejs.dev/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Vite integration)
-   **Animations**: [GSAP](https://greensock.com/gsap/) & [Animate.css](https://animate.style/)
-   **Database**: MySQL 8.0 & Redis 7.0

## Quick Start

### Prerequisites

-   PHP 8.3+
-   MySQL 8.0+
-   Redis 7.0+
-   Node.js 20+

### Installation

```bash
# 1. Clone & Setup
git clone https://github.com/your-repo/eventra.git
cd eventra
composer install
npm install

# 2. Environment
cp .env.example .env
php artisan key:generate

# 3. Database & Assets
php artisan migrate --seed
npm run build

# 4. Launch
php artisan serve
```

Detailed installation and deployment instructions can be found in the [docs/INSTALLATION.md](docs/INSTALLATION.md) and [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Documentation

-   [Installation Guide](docs/INSTALLATION.md)
-   [Architecture Overview](docs/ARCHITECTURE.md)
-   [Deployment Guide](docs/DEPLOYMENT.md)
-   [Contributing](CONTRIBUTING.md)
-   [Security Policy](SECURITY.md)

## License

This project is open-sourced software licensed under the [GNU General Public License v3.0](LICENSE).
