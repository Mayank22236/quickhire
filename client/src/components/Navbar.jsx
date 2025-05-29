import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-bold mb-4 md:mb-0">TaskTracker</div>
          <div className="flex items-center space-x-2">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-md hover:bg-blue-700 transition ${isActive('/')}`}
            >
              Tasks
            </Link>
            <Link 
              to="/time-tracking" 
              className={`px-4 py-2 rounded-md hover:bg-blue-700 transition ${isActive('/time-tracking')}`}
            >
              Time Tracking
            </Link>
            <Link 
              to="/stats" 
              className={`px-4 py-2 rounded-md hover:bg-blue-700 transition ${isActive('/stats')}`}
            >
              Statistics
            </Link>
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 