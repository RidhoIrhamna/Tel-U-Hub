import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faChartPie, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons
import './Sidebar.css';

const Sidebar = () => {
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
        {/* Hapus tautan untuk Organization */}
        {/* <li>
          <Link to="organization" className="oval-button">
            <FontAwesomeIcon icon={faBuilding} className="icon" /> Organization
          </Link>
        </li> */}
        <li>
          <Link to="mbti-test" className="oval-button">
            <FontAwesomeIcon icon={faChartPie} className="icon" /> MBTI Test
          </Link>
        </li>
      </ul>
      <div className="sidebar-footer">
        <Link to="/" className="oval-button">
          <FontAwesomeIcon icon={faSignOutAlt} className="icon" /> Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
