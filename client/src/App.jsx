import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import TaskPage from './pages/TaskPage';
import TimeTrackingPage from './pages/TimeTrackingPage';
import StatsPage from './pages/StatsPage';
import LoginPage from './pages/LoginPage';

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-100">
                <Navbar />
                <main>
                  <TaskPage />
                </main>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/time-tracking" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-100">
                <Navbar />
                <main>
                  <TimeTrackingPage />
                </main>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/stats" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-100">
                <Navbar />
                <main>
                  <StatsPage />
                </main>
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
