# UNIHACK Platform

A comprehensive platform for university admission test preparation with AI-driven features.

## Project Structure

```
/frontend   -> React + TypeScript app (main frontend)
/backend    -> Django app (API server)
/           -> Project root (README, configs, scripts)
```

## Quick Start

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Development

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

## Available Scripts

### Frontend (`/frontend`)

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend (`/backend`)

- `python manage.py runserver` - Start development server
- `python manage.py migrate` - Run database migrations
- `python manage.py test` - Run tests
- `python manage.py collectstatic` - Collect static files

## Current Features

### Exam Support Status

- ✅ **SAT** - Fully supported
- ✅ **TMUA** - Fully supported  
- 🚧 **UCAT** - Coming soon
- 🚧 **STEP** - Coming soon
- 🚧 **GRE** - Coming soon
- 🚧 **GMAT** - Coming soon
- 🚧 **MAT** - Coming soon

### Core Features

- **Multi-exam support** - Prepare for multiple admission tests
- **University selection** - Choose target universities with intelligent filtering
- **Smart onboarding** - Personalized setup based on exam choice
- **Progress tracking** - Monitor your preparation progress
- **Practice sessions** - AI-driven practice with adaptive difficulty

## Architecture

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Django + Django REST Framework
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Deployment**: Lovable platform

## Development Guidelines

### Project Structure Rules

- **NO React files in project root** - All frontend code must be in `/frontend`
- **Backend isolation** - Django app lives entirely in `/backend`
- **Separate concerns** - Frontend and backend have independent package management

### Exam Gating

Only SAT and TMUA are currently enabled. Other exams appear in the UI but are disabled with "Coming soon" labels. This is enforced both in the UI and API validation.

## CI/CD

The project includes automated checks to ensure:
- No stray React files in project root
- Frontend builds successfully from `/frontend`
- Backend tests pass from `/backend`
- Code quality standards are met

## Contributing

1. Ensure you're working in the correct directory (`/frontend` for UI, `/backend` for API)
2. Run tests before submitting changes
3. Follow the existing code style and patterns
4. Update this README if you add new features or change the structure

## License

Copyright © 2024 UNIHACK. All rights reserved.