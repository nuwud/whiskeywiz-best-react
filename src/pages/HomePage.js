import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function HomePage() {
  const { currentUser } = useAuth();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Whiskey Wiz</h1>
      <p className="mb-6">Welcome to the Whiskey Wiz application, the quarterly interactive whiskey tasting experience.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Latest Quarter</h2>
          <p className="mb-4">Test your whiskey knowledge with our latest quarterly tasting challenge!</p>
          <Link 
            to="/game" 
            className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded"
          >
            Play Now
          </Link>
        </div>
        
        {currentUser && currentUser.email === 'admin@whiskeywiz.com' && (
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
            <p className="mb-4">Manage quarters, questions, and view analytics.</p>
            <Link 
              to="/admin" 
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
            >
              Admin Panel
            </Link>
          </div>
        )}
      </div>
      
      {!currentUser ? (
        <div className="flex gap-4">
          <Link 
            to="/login" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </Link>
        </div>
      ) : (
        <p>You are logged in as {currentUser.email}</p>
      )}
    </div>
  );
}

export default HomePage;