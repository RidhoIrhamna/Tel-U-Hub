import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faChartPie, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    alert('You have been logged out. Redirecting to login page.');
    navigate('/');
  };

  return (
    <div className="sidebar">
      <img src="../src/assets/Logo App.png" alt="Logo" className="sidebar-logo" />
      <ul>
        <li>
          <Link to="" className="oval-button">
            <FontAwesomeIcon icon={faHome} className="icon" /> Home
          </Link>
        </li>
        <li>
          <Link to="community" className="oval-button">
            <FontAwesomeIcon icon={faUsers} className="icon" /> Community
          </Link>
        </li>
        <li>
          <Link to="mbti-test" className="oval-button">
            <FontAwesomeIcon icon={faChartPie} className="icon" /> MBTI Test
          </Link>
        </li>
      </ul>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="oval-button">
          <FontAwesomeIcon icon={faSignOutAlt} className="icon" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
