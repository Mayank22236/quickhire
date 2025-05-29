import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  
  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);
  
  const handleAuthSuccess = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">TaskTracker</h1>
        <p className="text-center text-gray-600 mb-8">
          Manage tasks, track time, and boost productivity
        </p>
      </div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <div className="flex">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 text-center ${isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 text-center ${!isLogin ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Register
          </button>
        </div>
      </div>
      
      {isLogin ? (
        <LoginForm onLoginSuccess={handleAuthSuccess} />
      ) : (
        <RegisterForm onRegisterSuccess={() => setIsLogin(true)} />
      )}
    </div>
  );
}

export default LoginPage; 