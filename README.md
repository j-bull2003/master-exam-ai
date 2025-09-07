# UniHack.ai Platform

University admission test preparation platform with AI-driven personalized learning.

## Project Structure 

✅ **FIXED**: Removed duplicate React app from root directory

```
/
├── frontend/          # React + TypeScript frontend (MAIN APP)
├── backend/          # Django backend 
├── scripts/          # CI/structure validation scripts
└── README.md         # This file
```

**Note**: The duplicate React application in the root directory has been removed. All frontend development should now occur in the `/frontend` directory.

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Python 3.9+ and pip

### Frontend Development

```bash
# Install dependencies
cd frontend && npm install

# Start development server
npm run dev

# Build for production  
npm run build

# Run linting
npm run lint
```

### Backend Development

```bash
# Install dependencies
cd backend && pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start development server
python manage.py runserver
```

### Full Stack Development

From the root directory:

```bash
# Install all dependencies
npm run install:frontend
npm run install:backend

# Start frontend dev server
npm run dev:frontend

# Start backend dev server (in another terminal)
npm run dev:backend
```

## Current Features

### Available Exams ✅ **IMPLEMENTED**
- ✅ **SAT** - Scholastic Assessment Test (US) - **ACTIVE**
- ✅ **TMUA** - Test of Mathematics for University Admission (UK) - **ACTIVE**
- 🔒 **UCAT** - University Clinical Aptitude Test (Coming soon - disabled)
- 🔒 **STEP** - Sixth Term Examination Paper (Coming soon - disabled)  
- 🔒 **GRE** - Graduate Record Examinations (Coming soon - disabled)
- 🔒 **GMAT** - Graduate Management Admission Test (Coming soon - disabled)
- 🔒 **MAT** - Mathematics Admissions Test (Coming soon - disabled)

**Exam Gating**: Only SAT and TMUA are selectable. Other exams appear disabled with "Coming soon" badges and cannot be selected.

### Core Functionality
- User authentication and profiles
- Exam selection with availability gating
- University target selection
- Dashboard with personalized content
- Practice questions and mock tests
- Progress analytics
- Admin content management

## Architecture

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Shadcn/ui
- **Backend**: Django, PostgreSQL, Supabase
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Deployment**: Lovable platform

## Development Guidelines

### File Organization
- Keep components focused and single-purpose
- Use the established design system tokens
- Follow TypeScript strict mode practices
- Implement proper error handling

### UI/UX Standards  
- All colors must use semantic tokens from design system
- Implement proper loading and error states
- Ensure accessibility (ARIA labels, keyboard navigation)
- Maintain consistent spacing and typography

### API Integration
- Use React Query for data fetching
- Implement proper error boundaries
- Add loading states for better UX
- Follow REST conventions

## Contributing

1. Make changes in feature branches
2. Ensure all tests pass
3. Follow existing code style
4. Update documentation as needed

## Project Structure Validation ✅

**COMPLETED**: Duplicate React app removed from root directory.

Run the structure validation script:
```bash
node scripts/structure-check.js
```

The script checks for:
- ❌ No `/src` directory in root (should be in `/frontend` only)  
- ❌ No duplicate config files (vite.config.ts, tailwind.config.ts) in root
- ✅ Required directories (`/frontend`, `/backend`) exist
- ✅ Required files (`frontend/package.json`, `backend/requirements.txt`) exist

## Changes Made

1. **✅ Structure Fixed**: Removed duplicate React app from root (`/src`, `/public`, `/package.json`, etc.)
2. **✅ Exam Gating**: Only SAT & TMUA are selectable; others show "Coming soon"
3. **✅ Data-Driven**: Exam availability controlled by `enabled` flag in `admissionTests.ts`
4. **✅ UI Feedback**: Disabled exams show lock icon, "Coming soon" badge, and toast warning
5. **✅ API Validation**: Profile API rejects disabled exams with `EXAM_DISABLED` error
6. **✅ Accessibility**: Proper disabled states and keyboard navigation