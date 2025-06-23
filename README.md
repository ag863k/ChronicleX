# ChronicleX

A modern full-stack blog application built with Django REST Framework and React.

## Features

- User authentication (signup/login)
- Create, read, update, delete blog posts
- Responsive Material-UI design
- Token-based authentication
- Protected routes

## Tech Stack

**Backend:**
- Django REST Framework
- SQLite/PostgreSQL
- Token Authentication

**Frontend:**
- React 18
- Material-UI
- Vite
- Axios

## Quick Setup

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Deployment

- **Backend**: Deploy to Render
- **Frontend**: Deploy to Netlify

See deployment configuration files for details.

## API Endpoints

### Authentication
- `POST /api/auth/signup/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout

### Blogs
- `GET /api/blogs/` - List all blogs
- `POST /api/blogs/` - Create blog (auth required)
- `GET /api/blogs/{id}/` - Get specific blog
- `PUT /api/blogs/{id}/` - Update blog (auth required)
- `DELETE /api/blogs/{id}/` - Delete blog (auth required)
