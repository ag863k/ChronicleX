# ChronicleX - Full-Stack Blog Application

## Overview

ChronicleX is a dynamic full-stack web application designed to provide users with a seamless platform for creating, sharing, and discovering blog posts. It features robust user authentication, allowing users to manage their own content, while public users can browse and read all published articles. The application boasts a responsive, modern dark-themed interface for an enjoyable experience on both desktop and mobile devices.

## Features Implemented

* **User Authentication:**
    * Secure user signup with username, email, and password.
    * User login using username and password.
    * Token-based authentication (via Django REST Framework's AuthToken) for securing API endpoints.
    * User logout functionality.
    * Protected routes on the frontend to restrict access to certain pages (e.g., create/edit post) to authenticated users.
* **Blog Post Management (CRUD):**
    * Authenticated users can create new blog posts with a title and rich content.
    * Blog posts are automatically associated with the logged-in author.
    * Authors can edit their own blog posts.
    * Authors can delete their own blog posts.
    * Backend permissions ensure only authors can modify or delete their respective posts.
* **Public Viewing & Interaction:**
    * A public-facing list of all published blog posts, accessible to everyone.
    * Pagination for the blog list to handle a large number of posts.
    * Dedicated detail pages for each blog post, allowing anyone to read the full content.
* **Frontend User Experience:**
    * Built as a Single Page Application (SPA) using React (with Vite).
    * Client-side routing handled by React Router DOM.
    * Modern, responsive user interface styled with Material-UI (MUI), featuring a custom dark theme inspired by professional developer platforms.
    * Global state management for user authentication using React Context.
    * Asynchronous API communication with the backend managed by Axios.
* **Backend API:**
    * RESTful API built with Python and Django, utilizing Django REST Framework (DRF).
    * Endpoints for user authentication (signup, login, logout) and blog post CRUD operations.
    * CORS (Cross-Origin Resource Sharing) configured to allow secure communication with the frontend application.
* **Database:**
    * SQLite is used as the database for development, managed by Django's ORM.

## Tech Stack

* **Frontend:**
    * React (v18+) with Vite
    * JavaScript (ES6+)
    * React Router DOM v6
    * Material-UI (MUI) v5
    * Axios
    * Emotion (for MUI styling)
* **Backend:**
    * Python (3.8+)
    * Django (Latest or 5.x)
    * Django REST Framework (DRF)
* **Database:**
    * SQLite 3 (for development)
* **Version Control:**
    * Git & GitHub

## Setup and Running Instructions

### Prerequisites

* **Backend:**
    * Python (3.8+ recommended) installed.
    * `pip` (Python package installer) installed.
    * `venv` (Python virtual environment tool) installed (usually comes with Python).
* **Frontend:**
    * Node.js (LTS version, e.g., 18.x or 20.x) installed.
    * `npm` (Node package manager - comes with Node.js) installed.

---

### Backend Setup

1.  **Clone the Repository (if you haven't already):**
    ```bash
    git clone <your-github-repository-url>
    cd <repository-name> # e.g., cd chroniclex
    ```

2.  **Navigate to the Backend Directory:**
    ```bash
    cd backend
    ```

3.  **Create and Activate a Virtual Environment:**
    * On Windows:
        ```bash
        python -m venv venv_chroniclex
        .\venv_chroniclex\Scripts\activate
        ```
    * On macOS/Linux:
        ```bash
        python3 -m venv venv_chroniclex
        source venv_chroniclex/bin/activate
        ```
    (You should see `(venv_chroniclex)` at the beginning of your terminal prompt)

4.  **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

5.  **Set Up Environment Variables:**
    * In the `chroniclex/backend/` directory, create a file named `.env`.
    * Add the following content, replacing `'your_strong_django_secret_key_here'` with a unique, strong secret key (you can generate one online or use Django's utilities if needed for production):
        ```env
        SECRET_KEY='your_strong_django_secret_key_here'
        DEBUG=True
        # For production, DEBUG should be False and ALLOWED_HOSTS set appropriately.
        # ALLOWED_HOSTS=127.0.0.1,localhost,your_deployed_domain.com 
        ```

6.  **Run Database Migrations:**
    This will create the necessary database tables (including for users and blogs).
    ```bash
    python manage.py migrate
    ```

7.  **(Optional) Create a Superuser:**
    This allows you to access the Django admin panel (`/admin/`) to manage users and blogs directly.
    ```bash
    python manage.py createsuperuser
    ```
    Follow the prompts to set a username, email (optional), and password.

8.  **Run the Backend Development Server:**
    ```bash
    python manage.py runserver
    ```
    The Django backend API should now be running, typically at `http://127.0.0.1:8000/`. Keep this terminal window open.

---

### Frontend Setup

1.  **Open a New Terminal Window/Tab.**

2.  **Navigate to the Frontend Directory:**
    ```bash
    cd path/to/chroniclex/frontend 
    # (If you cloned, this would be from the root of your repository)
    ```

3.  **Install Dependencies:**
    ```bash
    npm install
    ```

4.  **Set Up Environment Variables:**
    * In the `chroniclex/frontend/` directory, create a file named `.env`.
    * Add the following line, ensuring your backend server is running on port 8000:
        ```env
        VITE_API_BASE_URL=[http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)
        ```

5.  **Run the Frontend Development Server:**
    ```bash
    npm run dev
    ```
    The React frontend application should now be running, typically at `http://localhost:5173/` (Vite will indicate the port if 5173 is busy). Open this URL in your web browser.

---

## API Endpoints Overview (Backend: `/api`)

* **Authentication:**
    * `POST /auth/signup/` - User registration.
    * `POST /auth/login/` - User login, returns an authentication token.
    * `POST /auth/logout/` - User logout (requires token authentication).
* **Blogs:**
    * `GET /blogs/` - List all published blog posts (public, paginated).
    * `POST /blogs/` - Create a new blog post (requires token authentication).
    * `GET /blogs/{id}/` - Retrieve a specific blog post by its ID (public).
    * `PUT /blogs/{id}/` - Update a specific blog post (requires token authentication, author only).
    * `DELETE /blogs/{id}/` - Delete a specific blog post (requires token authentication, author only).

## Future Enhancements (Potential Next Steps)

* Implement a rich text editor (e.g., Quill, TinyMCE) for blog content creation.
* Add user profile pages where users can view their posts and potentially update profile information.
* Implement avatar/profile picture uploads.
* Add social login options (e.g., Google, GitHub).
* Introduce categories or tags for blog posts.
* Implement more advanced search and filtering capabilities for blogs.
* Full deployment to a cloud platform (e.g., AWS, Google Cloud, Azure) with a production-grade database.


## Author

* **Abhishek Garg**

## License

This project is licensed under the MIT License.

MIT LicenseCopyright (c) 2025 Abhishek Garg Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the "Software"), to dealin the Software without restriction, including without limitation the rightsto use, copy, modify, merge, publish, distribute, sublicense, and/or sellcopies of the Software, and to permit persons to whom the Software isfurnished to do so, subject to the following conditions:The above copyright notice and this permission notice shall be included in allcopies or substantial portions of the Software.THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS ORIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THEAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHERLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THESOFTWARE.
