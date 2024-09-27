// Dashboard.js
import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';
import Sidebar from './Sidebar';
import Home from '../pages/Home';
import Community from '../pages/Community';
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

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');

      try {
        const response = await fetch(`https://skillhub-esdlaboratory.loca.lt/api/users/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user data');
        }

        const data = await response.json();
        setUserData({
          name: data.name,
          profileImage: data.profileImage ? `https://skillhub-esdlaboratory.loca.lt${data.profileImage}` : '../src/assets/user-profile.jpg',
        });
      } catch (error) {
        setError(error.message);
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

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
              onChange={(e) => setSearchQuery(e.target.value)}
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

        <div className="dashboard-main-content">
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="community" element={<Community searchQuery={searchQuery} />} />
            {/* Hapus rute untuk Organization */}
            {/* <Route path="organization" element={<Organization />} /> */}
            <Route path="mbti-test" element={<MBTITest />} />
            <Route path="user-profile" element={<UserProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
