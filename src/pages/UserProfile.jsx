import React, { useState, useEffect, useRef } from 'react';
import './UserProfile.css';

const UserProfile = () => {
  const profileFormRef = useRef(null);

  const [profile, setProfile] = useState({
    name: '',
    jurusan: 'Computer Science',
    kepribadian: 'Introvert',
    noTelpon: '',
    motto: 'Live life to the fullest',
    interestsList: ['Programming', 'Music'],
    skills: [
      { name: 'JavaScript', level: 80 },
      { name: 'React', level: 70 },
      { name: 'CSS', level: 90 },
    ],
  });

  const [profilePicture, setProfilePicture] = useState('https://via.placeholder.com/150');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPicture, setIsEditingPicture] = useState(false);
  const [isEditingInterestIndex, setIsEditingInterestIndex] = useState(null);
  const [isEditingSkillIndex, setIsEditingSkillIndex] = useState(null);
  const [newInterest, setNewInterest] = useState('');
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [isAddingInterest, setIsAddingInterest] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', level: 0 });
  const [canEditSkills, setCanEditSkills] = useState(false);
  const [canEditInterests, setCanEditInterests] = useState(false);

  // Fetch user data from the API
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("You are not logged in!");
        window.location.href = ""; // Redirect to login page
        return;
      }

      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(`https://skillhub-esdlaboratory.loca.lt/api/users/${userId}`, {
          method: "GET",
          mode: "cors",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          // Update profile state with fetched data
          setProfile((prev) => ({
            ...prev,
            name: data.name,
            noTelpon: data.phone,
          }));

          // Update profile picture
          const baseUrl = "https://skillhub-esdlaboratory.loca.lt";
          setProfilePicture(data.profileImage ? `${baseUrl}${data.profileImage}` : 'https://via.placeholder.com/150');
        } else {
          alert("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Profile input handler
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result); // Set the image as a base64 string for preview
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Interest modification functions
  const addInterest = () => {
    if (newInterest) {
      setProfile((prev) => ({
        ...prev,
        interestsList: [...prev.interestsList, newInterest],
      }));
      setNewInterest('');
      setIsAddingInterest(false);
    }
  };
  
  const deleteInterest = (index) => {
    const updatedInterests = profile.interestsList.filter((_, i) => i !== index);
    setProfile((prev) => ({ ...prev, interestsList: updatedInterests }));
  };

  const startEditingInterest = (index) => {
    setIsEditingInterestIndex(index);
    setNewInterest(profile.interestsList[index]);
  };

  const saveInterest = () => {
    const updatedInterests = [...profile.interestsList];
    updatedInterests[isEditingInterestIndex] = newInterest;
    setProfile((prev) => ({ ...prev, interestsList: updatedInterests }));
    setIsEditingInterestIndex(null);
    setNewInterest(''); 
  };

  // Skill modification functions
  const addSkill = () => {
    if (newSkill.name && newSkill.level) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
      setNewSkill({ name: '', level: 0 }); 
      setIsAddingSkill(false);
    }
  };

  const deleteSkill = (index) => {
    const updatedSkills = profile.skills.filter((_, i) => i !== index);
    setProfile((prev) => ({ ...prev, skills: updatedSkills }));
  };

  const startEditingSkill = (index) => {
    setIsEditingSkillIndex(index);
    setNewSkill(profile.skills[index]);
  };

  const saveSkill = () => {
    const updatedSkills = [...profile.skills];
    updatedSkills[isEditingSkillIndex] = newSkill;
    setProfile((prev) => ({ ...prev, skills: updatedSkills }));
    setIsEditingSkillIndex(null);
    setNewSkill({ name: '', level: 0 }); 
  };

  // Toggle editing modes
  const handleEditToggle = () => {
    setIsEditingProfile(!isEditingProfile);
    setIsEditingPicture(!isEditingPicture);
  };

  return (
    <div className="user-profile-page">
      <h1>User Profile</h1>
      {/* Profile container */}
      <div className="profile-container">
        <div className="profile-left">
          <h2>
            Profile{' '}
            <span className="edit-icon" onClick={handleEditToggle}>✏️</span>
          </h2>
          <div>
            <img
              src={profilePicture}
              alt="Profile"
              className="profile-picture"
            />
            {isEditingPicture && (
              <>
                <label htmlFor="profile-picture-input" className="profile-picture-label">
                  Ubah Foto
                </label>
                <input
                  id="profile-picture-input"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="profile-picture-input"
                />
              </>
            )}
          </div>

          <div className="profile-info" ref={profileFormRef}>
            {isEditingProfile ? (
              <>
                <p>
                  <strong>Nama:</strong>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                  />
                </p>
                <p>
                  <strong>Jurusan:</strong>
                  <input
                    type="text"
                    name="jurusan"
                    value={profile.jurusan}
                    onChange={handleProfileChange}
                  />
                </p>
                <p>
                  <strong>Kepribadian:</strong>
                  <input
                    type="text"
                    name="kepribadian"
                    value={profile.kepribadian}
                    onChange={handleProfileChange}
                  />
                </p>
                <p>
                  <strong>No Telpon:</strong>
                  <input
                    type="text"
                    name="noTelpon"
                    value={profile.noTelpon}
                    onChange={handleProfileChange}
                  />
                </p>
                <p>
                  <strong>Motto Hidup:</strong>
                  <input
                    type="text"
                    name="motto"
                    value={profile.motto}
                    onChange={handleProfileChange}
                  />
                </p>
                <button onClick={() => setIsEditingProfile(false)}>Simpan</button>
              </>
            ) : (
              <>
                <p><strong>Nama:</strong> {profile.name}</p>
                <p><strong>Jurusan:</strong> {profile.jurusan}</p>
                <p><strong>Kepribadian:</strong> {profile.kepribadian}</p>
                <p><strong>No Telpon:</strong> {profile.noTelpon}</p>
                <p><strong>Motto Hidup:</strong> {profile.motto}</p>
              </>
            )}
          </div>
        </div>

        {/* Interest container */}
        <div className="profile-right">
          <div className="interest-container">
            <h2>
              Interest{' '}
              <span className="edit-icon" onClick={() => setCanEditInterests(!canEditInterests)}>✏️</span>
            </h2>
            {profile.interestsList.length > 0 && (
              <ul>
                {profile.interestsList.map((interest, index) => (
                  <li key={index}>
                    {isEditingInterestIndex === index && canEditInterests ? (
                      <>
                        <input
                          type="text"
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                        />
                        <button onClick={saveInterest}>Simpan</button>
                      </>
                    ) : (
                      <>
                        {interest}
                        {canEditInterests && (
                          <>
                            <button onClick={() => startEditingInterest(index)}>✏️</button>
                            <button onClick={() => deleteInterest(index)}>Delete</button>
                          </>
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {canEditInterests && (
              <>
                {!isAddingInterest ? (
                  <button onClick={() => setIsAddingInterest(true)}>Tambah Interest</button>
                ) : (
                  <>
                    <input
                      type="text"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                    />
                    <button onClick={addInterest}>Tambah</button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Skills container */}
          <div className="skills-container">
            <h2>
              Skills{' '}
              <span className="edit-icon" onClick={() => setCanEditSkills(!canEditSkills)}>✏️</span>
            </h2>
            {profile.skills.length > 0 && (
              <ul>
                {profile.skills.map((skill, index) => (
                  <li key={index}>
                    {isEditingSkillIndex === index && canEditSkills ? (
                      <>
                        <input
                          type="text"
                          value={newSkill.name}
                          onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                        />
                        <input
                          type="number"
                          value={newSkill.level}
                          onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                        />
                        <button onClick={saveSkill}>Simpan</button>
                      </>
                    ) : (
                      <>
                        {skill.name} - Level: {skill.level}
                        {canEditSkills && (
                          <>
                            <button onClick={() => startEditingSkill(index)}>✏️</button>
                            <button onClick={() => deleteSkill(index)}>Delete</button>
                          </>
                        )}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {canEditSkills && (
              <>
                {!isAddingSkill ? (
                  <button onClick={() => setIsAddingSkill(true)}>Tambah Skill</button>
                ) : (
                  <>
                    <input
                      type="text"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    />
                    <input
                      type="number"
                      value={newSkill.level}
                      onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                    />
                    <button onClick={addSkill}>Tambah</button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
 