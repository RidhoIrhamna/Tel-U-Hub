import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css'; // Importing the CSS file

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    jurusan: localStorage.getItem('jurusan') || '',
    kepribadian: localStorage.getItem('kepribadian') || '',
    mottoHidup: localStorage.getItem('mottoHidup') || '',
    profileImage: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');

      if (!token) {
        alert('You are not logged in!');
        navigate('/login');
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
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user data');
        }

        const data = await response.json();
        setUserData((prevData) => ({
          ...prevData,
          name: data.name || '',
          phone: data.phone || '',
          profileImage: data.profileImage
            ? `https://skillhub-esdlaboratory.loca.lt${data.profileImage}`
            : '../src/assets/user-profile.jpg',
        }));
      } catch (error) {
        setError(error.message);
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleUpdateProfile = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('authToken');
  const userId = localStorage.getItem('userId');

  const formData = new FormData();
  formData.append('name', userData.name);
  formData.append('phone', userData.phone);
  if (userData.profileImage) {
    formData.append('profileImage', userData.profileImage); // Pastikan gambar diunggah
  }

  try {
    const response = await fetch(`https://skillhub-esdlaboratory.loca.lt/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        // Jangan gunakan 'Content-Type', karena FormData akan menambah header yang sesuai secara otomatis
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update user data');
    }

    // Save jurusan, kepribadian, and mottoHidup to localStorage
    localStorage.setItem('jurusan', userData.jurusan);
    localStorage.setItem('kepribadian', userData.kepribadian);
    localStorage.setItem('mottoHidup', userData.mottoHidup);

    alert('Profile updated successfully!');
    setIsEditing(false);
  } catch (error) {
    setError(error.message);
    console.error('Error updating user data:', error);
  }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, profileImage: file });
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="userProfile-container">
      <h2 className="userProfile-title">User Profile</h2>
      {error && <p className="userProfile-error">{error}</p>}
      
      <form onSubmit={handleUpdateProfile} className="userProfile-form">
        <div className="userProfile-image-container">
          <img src={userData.profileImage} alt="Profile" className="userProfile-image" />
          {isEditing && (
            <input type="file" accept="image/*" className="userProfile-input-file" onChange={handleImageChange} />
          )}
        </div>
  
        <div className="userProfile-input-group">
          <label className="userProfile-label">Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="userProfile-input"
            />
          ) : (
            <span className="userProfile-display">{userData.name}</span>
          )}
        </div>
  
        <div className="userProfile-input-group">
          <label className="userProfile-label">Phone:</label>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              className="userProfile-input"
            />
          ) : (
            <span className="userProfile-display">{userData.phone}</span>
          )}
        </div>
  
        <div className="userProfile-input-group">
          <label className="userProfile-label">Jurusan:</label>
          {isEditing ? (
            <input
              type="text"
              name="jurusan"
              value={userData.jurusan}
              onChange={handleInputChange}
              className="userProfile-input"
            />
          ) : (
            <span className="userProfile-display">{userData.jurusan}</span>
          )}
        </div>
  
        <div className="userProfile-input-group">
          <label className="userProfile-label">Kepribadian:</label>
          {isEditing ? (
            <input
              type="text"
              name="kepribadian"
              value={userData.kepribadian}
              onChange={handleInputChange}
              className="userProfile-input"
            />
          ) : (
            <span className="userProfile-display">{userData.kepribadian}</span>
          )}
        </div>
  
        <div className="userProfile-input-group">
          <label className="userProfile-label">Motto Hidup:</label>
          {isEditing ? (
            <input
              type="text"
              name="mottoHidup"
              value={userData.mottoHidup}
              onChange={handleInputChange}
              className="userProfile-input"
            />
          ) : (
            <span className="userProfile-display">{userData.mottoHidup}</span>
          )}
        </div>
  
        <button type="button" className="userProfile-button" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
  
        {isEditing && <button type="submit" className="userProfile-button">Save Changes</button>}
      </form>
    </div>
  );
};

export default UserProfile;