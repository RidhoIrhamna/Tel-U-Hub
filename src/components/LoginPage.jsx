import React, { useState } from 'react';
import './LoginPage.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoApp from '../assets/logo app.png';
import vectorBg from '../assets/login vector.png';
import decorationImg from '../assets/login img.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://skillhub-esdlaboratory.loca.lt/api/login', {
        email: email,
        password: password,
      });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userId', response.data.user.id);
        alert('Login successful! Redirecting to dashboard...');
        navigate('/dashboard');
      }
      
    } catch (error) {
      setErrorMessage('Login gagal. email dan password invalid.');
      alert('Login failed. Please check your email and password.');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="login-container">
      <img src={logoApp} alt="Logo" className="login-app-logo" />
      <img src={vectorBg} alt="Vector" className="login-vector-bg" />
      <div className="login-content">
        <div className="login-left-content">
          <div className="login-promo-section">
            <h1>Find your place, Fuel your passion.</h1>
            <img src={decorationImg} alt="Decoration" className="login-decoration-img" />
          </div>
        </div>
        <div className="login-right-content">
          <div className="login-form-section">
            <h2>Start your journey here.</h2>
            <form className="login-login-form" onSubmit={handleSubmit}>
              <div className="login-form-group">
                <label>Email:</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="on"
                  aria-label="Email"
                />
              </div>
              <div className="login-form-group login-password-group">
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="on"
                  aria-label="Password"
                />
              </div>
              {errorMessage && <p className="login-error-message">{errorMessage}</p>}
              <button type="submit" className="login-btn-login">Login</button>
            </form>
            <p className="login-signup-text">
              Don't have an account? <a href="/signup">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
