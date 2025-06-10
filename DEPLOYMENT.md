# ChronicleX Deployment Guide

## Backend Deployment to Render

### Step 1: Prepare Your Backend
1. Ensure all files are committed to your Git repository
2. Your backend should have these deployment files:
   - `Procfile` - Contains `web: gunicorn chroniclex_project.wsgi:application`
   - `build.sh` - Build script for Render
   - `requirements.txt` - Python dependencies

### Step 2: Deploy to Render
1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `chroniclex-backend` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `./build.sh`
   - **Start Command**: `gunicorn chroniclex_project.wsgi:application`

### Step 3: Environment Variables
Add these environment variables in Render:
- `SECRET_KEY`: Generate a strong secret key (you can use Django's secret key generator)
- `DEBUG`: `False`
- `ALLOWED_HOSTS`: `your-app-name.onrender.com,localhost,127.0.0.1`
- `CORS_ALLOWED_ORIGINS`: `https://your-frontend-domain.netlify.app,http://localhost:5173`
- `DATABASE_URL`: (Render will provide this if you add a PostgreSQL database)

### Step 4: Database (Optional - for production)
1. In Render, go to "New +" → "PostgreSQL"
2. Create a database and copy the connection URL
3. Add the database URL to your environment variables

---

## Frontend Deployment to Netlify

### Step 1: Prepare Your Frontend
1. Ensure your frontend code is committed to Git
2. Your frontend should have:
   - `netlify.toml` - Netlify configuration
   - `public/_redirects` - SPA routing support

### Step 2: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and select your repository
4. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### Step 3: Environment Variables
Add these environment variables in Netlify:
- `VITE_API_BASE_URL`: `https://your-backend-app.onrender.com/api`

### Step 4: Update CORS Settings
After deploying frontend, update your backend's CORS settings:
1. Go to your Render dashboard
2. Update the `CORS_ALLOWED_ORIGINS` environment variable to include your Netlify URL

---

## Local Development Quick Start

### Backend
```bash
cd backend
python -m venv venv_chroniclex
# Windows:
venv_chroniclex\Scripts\activate
# macOS/Linux:
source venv_chroniclex/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Environment Files
Create `.env` files:

**backend/.env:**
```
SECRET_KEY='your-secret-key-here'
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

**frontend/.env:**
```
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

---

## Troubleshooting

### Common Issues:

1. **CORS Errors**: 
   - Check that your frontend URL is in `CORS_ALLOWED_ORIGINS`
   - Ensure no trailing slashes in URLs

2. **API Connection Issues**:
   - Verify `VITE_API_BASE_URL` is correct
   - Check browser dev tools for network errors

3. **Authentication Issues**:
   - Clear browser localStorage
   - Check token is being sent in requests

4. **Build Failures**:
   - Check all dependencies are in `requirements.txt`
   - Ensure Python version compatibility

### Debug Commands:
```bash
# Check Django settings
python manage.py shell -c "from django.conf import settings; print(settings.CORS_ALLOWED_ORIGINS)"

# Test API endpoints
curl -X GET http://127.0.0.1:8000/api/blogs/

# Check environment variables
python -c "import os; print(os.environ.get('SECRET_KEY'))"
```
