#!/usr/bin/env bash
# Build script for Render with SQLite

set -o errexit  # exit on error

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Creating static files..."
python manage.py collectstatic --no-input

echo "Running database migrations..."
python manage.py migrate

echo "Creating initial data (if needed)..."
# Create a superuser for admin access (optional)
# python manage.py shell -c "
# from django.contrib.auth.models import User
# if not User.objects.filter(username='admin').exists():
#     User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
#     print('Superuser created')
# else:
#     print('Superuser already exists')
# "

echo "Build completed successfully!"

# Create superuser if it doesn't exist (optional)
# python manage.py shell -c "
# from django.contrib.auth import get_user_model;
# User = get_user_model();
# User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
# "
