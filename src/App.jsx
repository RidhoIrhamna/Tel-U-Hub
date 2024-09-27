import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Login page route */}
        <Route path="/signup" element={<Signup />} /> {/* Signup page route */}
        <Route path="/dashboard/*" element={<Dashboard />} /> {/* Dashboard with nested routes */}
      </Routes>
    </Router>
  );
};

export default App;
