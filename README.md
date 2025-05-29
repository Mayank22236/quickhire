Task Dashboard Frontend

Dependencies to Install and Run

To set up and run the frontend application locally:

1 : Clone the repository:

git clone (https://github.com/Mayank22236/quickhire.git)
cd task-dashboard-frontend

2 : Install dependencies:

npm install

3 : Start the development server:

npm start

4 : Core Dependencies:

A : axios

B : react

C : react-dom, react-scripts

D : tailwindcss (for styling)

% : Flow of the Application

User logs in, token is saved in localStorage.

Axios uses the token to make authorized API calls.

The app has three main pages:

TaskListView: Shows tasks with status and creation date.

TimeTrackingView: Shows task timers.

StatisticsView: Shows task stats and tracked time.

API base URL and auth token setup is done in src/api/axiosInstance.js.

6 : Working of the Code

TaskListView

Calls /api/tasks

Displays task ID, status, and creation date

TimeTrackingView

Calls /api/time

Displays taskId, userId, and timestamps

StatisticsView

Calls /api/stats

Displays total and completed tasks, and minutes logged

Axios Instance

In axiosInstance.js

Adds token to each request via interceptors

7 : Error Boundaries

ErrorBoundary.js
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

8 : Notes

Backend should run on http://localhost:9000

Token must exist in localStorage under the key token

You can enhance the UI with loading states, modals, and notifications
