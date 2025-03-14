import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <header className="bg-amber-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">WhiskeyWiz</Link>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/game" className="hover:text-amber-200 transition">Play Game</Link>
            </li>
            {currentUser && currentUser.email === 'admin@whiskeywiz.com' && (
              <li>
                <Link to="/admin" className="hover:text-amber-200 transition">Admin</Link>
              </li>
            )}
            {!currentUser ? (
              <>
                <li>
                  <Link to="/login" className="hover:text-amber-200 transition">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-amber-200 transition">Register</Link>
                </li>
              </>
            ) : (
              <li>
                <button 
                  onClick={handleLogout}
                  className="hover:text-amber-200 transition bg-transparent border-none p-0"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;