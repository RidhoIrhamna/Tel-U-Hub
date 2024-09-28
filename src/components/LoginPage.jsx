import React, { useState } from 'react';
import './LoginPage.css'; // Import CSS
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS untuk toastify

// Import assets
import logoApp from '../assets/logo app.png';
import vectorBg from '../assets/login vector.png';
import decorationImg from '../assets/login img.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://skillhub-esdlaboratory.loca.lt/api/login', {
        email: email,
        password: password,
      });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userId', response.data.user.id);

        toast.success('Login successful! Redirecting to dashboard...', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (error) {
      setErrorMessage('Login gagal. email dan password invalid.');
      setTimeout(() => {
        setErrorMessage('');
      }, 1500);
      toast.error('Login failed. Please check your email and password.', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="unique-login-container">
      <img src={logoApp} alt="Logo" className="unique-app-logo" />
      <img src={vectorBg} alt="Vector" className="unique-vector-bg" />
      <div className="unique-content">
        <div className="unique-left-content">
          <div className="unique-promo-section">
            <h1>Find your place, Fuel your passion.</h1>
            <img src={decorationImg} alt="Decoration" className="unique-decoration-img" />
          </div>
        </div>
        <div className="unique-right-content">
          <div className="unique-form-section">
            <h2>Start your journey here.</h2>
            <form className="unique-login-form" onSubmit={handleLogin}>
              <div className="unique-form-group">
                <label>Email:</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="unique-form-group unique-password-group">
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {errorMessage && <p className="unique-error-message">{errorMessage}</p>}
              <button type="submit" className="unique-btn-login">Login</button>
            </form>
            <p className="unique-signup-text">
              Don't have an account? <a href="/signup">Sign Up</a>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default LoginPage;
