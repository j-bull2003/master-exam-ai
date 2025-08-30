# Django Backend Setup

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

6. Start the development server:
```bash
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

## API Endpoints

- Authentication:
  - `POST /api/auth/login/` - User login
  - `POST /api/auth/register/` - User registration
  - `POST /api/auth/logout/` - User logout
  - `GET /api/auth/me/` - Get current user
  - `GET /api/auth/csrf/` - Get CSRF token

- Data:
  - `GET /api/assessments/` - List assessments
  - `GET /api/tests/` - List tests
  - `GET /api/domains/` - List domains
  - `GET /api/skills/` - List skills
  - `GET /api/items/` - List exam items with filtering