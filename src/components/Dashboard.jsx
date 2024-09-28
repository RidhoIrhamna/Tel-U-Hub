// Dashboard.js
import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';
import Sidebar from './Sidebar';
import Home from '../pages/Home';
import Community from '../pages/Community';
import Organization from '../pages/Organization';
import MBTITest from '../pages/MBTITest';
import UserProfile from '../pages/UserProfile';

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: '',
    profileImage: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');

      if (!token) {
        alert('You are not logged in!');
        navigate('/login'); // Redirect to login page if no token
        return;
      }

      try {
        const response = await fetch(`https://skillhub-esdlaboratory.loca.lt/api/users/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json(); // Capture error response
          throw new Error(errorData.message || 'Failed to fetch user data'); // Provide more context
        }

        const data = await response.json();
        setUserData({
          name: data.name,
          profileImage: data.profileImage ? `https://skillhub-esdlaboratory.loca.lt${data.profileImage}` : '../src/assets/user-profile.jpg',
        });
      } catch (error) {
        setError(error.message); // Set detailed error message
        console.error('Error fetching user data:', error); // Log error details
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <div>Loading user data...</div>; // Loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error if fetching fails
  }

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="dashboard-search-bar-container">
            <FontAwesomeIcon icon={faSearch} className="dashboard-search-icon" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="dashboard-search-bar"
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            />
          </div>
          <div className="dashboard-user-profile">
            <Link to="user-profile" className="dashboard-user-name">
              <img
                src={userData.profileImage}
                alt="Profile"
                className="dashboard-user-profile-pic"
              />
              <span>{userData.name}</span>
            </Link>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="dashboard-main-content">
          <Routes>
            <Route path="/*" element={<Home />} /> {/* Default route */}
            <Route path="community" element={<Community searchQuery={searchQuery} />} /> {/* Pass searchQuery as a prop */}
            <Route path="organization" element={<Organization />} />
            <Route path="mbti-test" element={<MBTITest />} />
            <Route path="user-profile" element={<UserProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
