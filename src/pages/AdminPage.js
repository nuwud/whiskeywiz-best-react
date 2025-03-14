import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

function AdminPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [quarters, setQuarters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newQuarter, setNewQuarter] = useState({
    id: '',
    name: '',
    active: false,
    releaseDate: ''
  });

  // Check if user is admin, if not redirect
  useEffect(() => {
    // This would be replaced with actual admin check in a real application
    const checkAdmin = async () => {
      if (!currentUser || currentUser.email !== 'admin@whiskeywiz.com') {
        navigate('/');
      } else {
        fetchQuarters();
      }
    };

    checkAdmin();
  }, [currentUser, navigate]);

  const fetchQuarters = async () => {
    setLoading(true);
    try {
      const quartersCollection = collection(db, 'quarters');
      const quartersSnapshot = await getDocs(quartersCollection);
      const quartersList = quartersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setQuarters(quartersList);
    } catch (err) {
      console.error('Error fetching quarters:', err);
      setError('Failed to load quarters');
    } finally {
      setLoading(false);
    }
  };

  const handleQuarterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewQuarter({
      ...newQuarter,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const quartersCollection = collection(db, 'quarters');
      await addDoc(quartersCollection, {
        name: newQuarter.name,
        active: newQuarter.active,
        releaseDate: newQuarter.releaseDate,
        createdAt: new Date().toISOString()
      });
      setNewQuarter({
        id: '',
        name: '',
        active: false,
        releaseDate: ''
      });
      fetchQuarters();
    } catch (err) {
      console.error('Error adding quarter:', err);
      setError('Failed to add quarter');
    }
  };

  const toggleQuarterActive = async (id, currentActive) => {
    try {
      const quarterRef = doc(db, 'quarters', id);
      await updateDoc(quarterRef, {
        active: !currentActive
      });
      fetchQuarters();
    } catch (err) {
      console.error('Error updating quarter:', err);
      setError('Failed to update quarter');
    }
  };

  const deleteQuarter = async (id) => {
    if (window.confirm('Are you sure you want to delete this quarter?')) {
      try {
        const quarterRef = doc(db, 'quarters', id);
        await deleteDoc(quarterRef);
        fetchQuarters();
      } catch (err) {
        console.error('Error deleting quarter:', err);
        setError('Failed to delete quarter');
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Add New Quarter</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Quarter Name</label>
              <input
                type="text"
                name="name"
                value={newQuarter.name}
                onChange={handleQuarterChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Release Date</label>
              <input
                type="date"
                name="releaseDate"
                value={newQuarter.releaseDate}
                onChange={handleQuarterChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="active"
                  checked={newQuarter.active}
                  onChange={handleQuarterChange}
                  className="mr-2"
                />
                <span className="text-gray-700">Active</span>
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Add Quarter
            </button>
          </form>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Manage Quarters</h2>
          {quarters.length === 0 ? (
            <p>No quarters found.</p>
          ) : (
            <ul className="divide-y">
              {quarters.map((quarter) => (
                <li key={quarter.id} className="py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{quarter.name}</h3>
                      <p className="text-sm text-gray-600">Release: {quarter.releaseDate}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleQuarterActive(quarter.id, quarter.active)}
                        className={`px-3 py-1 rounded text-xs font-bold ${quarter.active ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                      >
                        {quarter.active ? 'Active' : 'Inactive'}
                      </button>
                      <button
                        onClick={() => deleteQuarter(quarter.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;