# TaskTracker App

A responsive web application for managing tasks, tracking time, and viewing productivity statistics.

## Features

- **Task Management**: Create, update, delete, and track status of your daily tasks
- **Time Tracking**: Monitor time spent on each task with a built-in timer
- **Statistics Dashboard**: View your productivity metrics and completion rates
- **Responsive Design**: Works on desktop and mobile devices
- **User Authentication**: Secure login and registration system

## Technologies Used

- **Frontend**: React.js, React Router, Context API for state management
- **UI**: Tailwind CSS for styling
- **Forms**: React Hook Form for validation
- **HTTP**: Axios for API requests
- **Build**: Vite for fast development and production builds

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
2. Install the dependencies:

```bash
cd client
npm install
```

### Running the app

Start the development server:

```bash
npm run dev
```

The app will be available at http://localhost:5173

## Project Structure

- `/src/components`: Reusable UI components
- `/src/context`: Context API for state management
- `/src/pages`: Main page components
- `/src/hooks`: Custom React hooks

## Backend API

The app communicates with a RESTful API that provides the following endpoints:

- `/api/auth`: Authentication endpoints (login, register)
- `/api/tasks`: Task management endpoints
- `/api/time`: Time entry endpoints
- `/api/stats`: Statistics endpoints

## Learn More

To learn more about the technologies used:

- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Vite](https://vitejs.dev/)
