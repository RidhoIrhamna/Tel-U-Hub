import React, { useState } from 'react';
import './SignUp.css'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom'; 

const SignUpPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('https://skillhub-esdlaboratory.loca.lt/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) 
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Sign Up Successful!', data);
                alert('Sign Up Successful! Redirecting to dashboard...');
                navigate('/dashboard'); 
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('userId', data.user.id);
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again later.');
            alert('Register failed. Please check your email and password.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <img src="../src/assets/logo app.png" alt="Logo" className="signup-app-logo" />
            <img src="../src/assets/login vector.png" alt="Vector" className="signup-vector-bg" />

            <div className="signup-content">
                <div className="signup-left-content">
                    <div className="signup-promo-section">
                        <h1>Join us and fuel your passion!</h1>
                        <img src="../src/assets/login img.png" alt="Decoration" className="signup-decoration-img" />
                    </div>
                </div>

                <div className="signup-right-content">
                    <div className="signup-form-section">
                        <h2>Create your account</h2>
                        <form className="signup-form" onSubmit={handleSubmit}>
                            <div className="signup-form-group">
                                <label>Name:</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name" 
                                    required 
                                />
                            </div>
                            <div className="signup-form-group">
                                <label>Email:</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email" 
                                    required 
                                />
                            </div>
                            <div className="signup-form-group">
                                <label>Phone Number:</label>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter your phone number" 
                                    required 
                                />
                            </div>
                            <div className="signup-form-group signup-password-group">
                                <label>Password:</label>
                                <input 
                                    type={passwordVisible ? "text" : "password"} 
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password" 
                                    required 
                                />
                                <span 
                                    className="signup-password-toggle-icon" 
                                    onClick={togglePasswordVisibility}
                                >
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <button type="submit" className="signup-btn-signup" disabled={isLoading}>
                                {isLoading ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </form>
                        {error && <p className="signup-error-message">{error}</p>}
                        <p className="signup-login-text">
                            Already have an account? <a href="/">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
