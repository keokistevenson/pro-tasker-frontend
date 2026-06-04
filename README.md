# Pro-Tasker Frontend

## Overview

Pro-Tasker Frontend is a React and TypeScript single-page application that provides a user-friendly interface for managing projects and tasks.

The application allows users to register, authenticate, create projects, organize tasks, update task progress, and manage their work through a secure and responsive interface.

The frontend communicates with the Pro-Tasker Backend API using JWT authentication and RESTful API requests.

---

## Features

### Authentication

- User registration
- User login
- Persistent authentication using JWT tokens
- Protected routes
- Secure logout functionality

### Project Management

- Create projects
- View all projects
- Edit project details
- Delete projects

### Task Management

- Create tasks
- View project tasks
- Edit task details
- Update task status
- Delete tasks

### Accessibility

- Semantic HTML
- Form labels and input associations
- ARIA attributes for interactive controls
- Screen reader-friendly error handling

### User Experience

- Responsive layout
- Loading states
- Error handling
- Empty-state messaging

---

## Technologies Used

### Frontend

- React
- TypeScript
- React Router
- Vite
- Fetch API
- CSS

### Backend Integration

- REST API
- JSON Web Tokens (JWT)

---

## Application Screens

### Home Page

Provides an introduction to the application and entry points for registration and login.

### Authentication Pages

- Register
- Login

### Dashboard

- View all projects
- Create projects
- Edit projects
- Delete projects

### Project Details

- View project information
- Create tasks
- Edit tasks
- Update task status
- Delete tasks

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd pro-tasker-frontend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Environment Variables

| Variable | Description |
|-----------|-------------|
| VITE_API_BASE_URL | Backend API URL |

---

## Project Structure

```text
pro-tasker-frontend/
│
├── public/
│
├── src/
│   │
│   ├── api/
│   │   └── api.ts
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectForm.tsx
│   │   ├── TaskForm.tsx
│   │   ├── TaskItem.tsx
│   │   ├── TaskList.tsx
│   │   └── ProtectedRoute.tsx
│   │
│   ├── context/
│   │   └── AuthContext.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Dashboard.tsx
│   │   └── ProjectDetails.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── App.css
│   └── index.css
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── vite.config.ts
```

---

## Folder Descriptions

| Folder | Purpose |
|-----------|-------------|
| api | API communication layer |
| assets | Images and static assets |
| components | Reusable UI components |
| context | Global authentication state |
| pages | Route-based page components |

---

## Authentication Flow

```text
User Login
     │
     ▼
Backend Authentication
     │
     ▼
JWT Token Issued
     │
     ▼
Token Stored in Browser
     │
     ▼
Protected Routes Accessible
```

---

## Future Enhancements

- Project filtering and sorting
- Task due dates
- Task priority levels
- Project analytics dashboard
- Dark mode
- Team collaboration features
- Drag-and-drop task organization

---

## Screenshots

### Dashboard

_Add screenshot here_

### Project Details

_Add screenshot here_

---

## Author

**Keoki Stevenson**

Capstone Project – Software Engineering Program