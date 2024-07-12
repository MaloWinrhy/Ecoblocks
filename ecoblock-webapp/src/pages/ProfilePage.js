import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Sidebar from '../components/common/Sidebar';
import './ProfilePage.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    bio: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', profile);
  };

  return (
    <div className="profile-page">
      <Header />
      <div className="main-content">
        <main className="content">
          <h1 id="profile">Profile</h1>
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={profile.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={profile.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="update-button">Update Profile</button>
          </form>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default ProfilePage;
