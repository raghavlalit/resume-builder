# Resume Builder - React Application

A modern resume builder application built with React, featuring both user-facing resume creation tools and a comprehensive admin panel.

## Project Structure

```
resume-builder/
├── public/
│   └── vite.svg
├── src/
│   ├── admin/                          # Admin Panel Components
│   │   ├── AdminDashboard.jsx          # Admin dashboard page
│   │   ├── AdminHeader.jsx             # Admin header component
│   │   ├── AdminFooter.jsx             # Admin footer component
│   │   ├── AdminLayout.jsx             # Admin layout wrapper
│   │   ├── AdminLogin.jsx              # Admin login page
│   │   ├── AdminManagement.jsx         # Admin CRUD management
│   │   ├── UserManagement.jsx          # User CRUD management
│   │   ├── UserResumeView.jsx          # User resume detail view
│   │   ├── ProtectedAdminRoute.jsx     # Admin route protection
│   │   ├── AdminLayout.css             # Admin layout styles
│   │   ├── AdminHeader.css             # Admin header styles
│   │   └── AdminFooter.css             # Admin footer styles
│   ├── components/                     # Shared Components
│   │   ├── Header.jsx                  # Main site header
│   │   ├── Footer.jsx                  # Main site footer
│   │   ├── ProtectedRoute.jsx          # User route protection
│   │   ├── Header.css                  # Header styles
│   │   └── Footer.css                  # Footer styles
│   ├── pages/                          # User Pages
│   │   ├── Home.jsx                    # Landing page
│   │   ├── About.jsx                   # About page
│   │   ├── Login.jsx                   # User login
│   │   ├── Register.jsx                # User registration
│   │   ├── ResumeBuilder.jsx           # Resume creation tool
│   │   ├── Home.css                    # Home page styles
│   │   ├── About.css                   # About page styles
│   │   ├── Auth.css                    # Auth pages styles
│   │   └── ResumeBuilder.css           # Resume builder styles
│   ├── utils/                          # Utilities
│   │   └── api.js                      # API service functions
│   ├── assets/                         # Static Assets
│   │   └── react.svg
│   ├── App.jsx                         # Main app component
│   ├── App.css                         # App styles
│   ├── main.jsx                        # App entry point
│   └── index.css                       # Global styles
├── index.html                          # HTML template
├── package.json                        # Dependencies & scripts
├── package-lock.json                   # Locked dependencies
├── vite.config.js                      # Vite configuration
├── eslint.config.js                    # ESLint configuration
└── README.md                           # Project documentation
```

## Features

### User Features
- **Resume Builder**: Interactive resume creation tool
- **User Authentication**: Login and registration system
- **Responsive Design**: Works on desktop and mobile devices

### Admin Panel Features
- **Secure Admin Login**: Separate admin authentication at `/admin`
- **Dashboard**: Overview of system statistics
- **Admin Management**: CRUD operations for admin users
- **User Management**: CRUD operations for regular users
- **User Resume View**: Detailed view of user resumes and profiles
- **Protected Routes**: Secure access control for admin pages
- **Modern UI**: Material-UI components for professional interface

## Admin Routes

- `/admin` - Admin login page
- `/admin/dashboard` - Admin dashboard
- `/admin/admins` - Admin user management
- `/admin/users` - User management
- `/admin/users/:userId` - User resume detail view

## Technologies Used

- **React 18** - Frontend framework
- **React Router** - Client-side routing
- **Material-UI** - UI component library
- **Vite** - Build tool and development server
- **ESLint** - Code linting

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Development

The project uses a modular structure with separate concerns:
- **User pages** in `src/pages/` for the main application
- **Admin components** in `src/admin/` for the admin panel
- **Shared components** in `src/components/` for reusable UI elements
- **API utilities** in `src/utils/` for backend communication
