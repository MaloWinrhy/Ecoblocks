import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { getProfile } from '../services/profileServices';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    bio: '',
    ecoBlocks: 0,
    rank: 0,
    walletNumber: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile({
          username: data.username,
          email: data.email,
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-page">
      <div className="main-content-profile">
        <main className="content-profile">
          <h1 id="profile">Profile</h1>
          <div className="profile-details">
            <div className="profile-item">
              <h2>Username</h2>
              <p>{profile.username}</p>
            </div>
            <div className="profile-item">
              <h2>Email</h2>
              <p>{profile.email}</p>
            </div>
            <div className="profile-item">
              <h2>Bio</h2>
              <p>{profile.bio}</p>
            </div>
            <div className="profile-item">
              <h2>EcoBlocks</h2>
              <p>{profile.ecoBlocks}</p>
            </div>
            <div className="profile-item">
              <h2>Rank</h2>
              <p>{profile.rank}</p>
            </div>
            <div className="profile-item">
              <h2>Wallet Number</h2>
              <p className="blur-text">{profile.walletNumber}</p>
            </div>
            <div className="profile-item">
              <h2>Wallet Stats</h2>
              <div className="blur-text">

              </div>
            </div>
          </div>
          <div className="upcoming-features">
            <h2>Upcoming Profile Features</h2>
            <div className="feature-item">
              <h3>Wallet Connection</h3>
              <p>Connect your crypto wallet to manage and trade EcoBlocks securely.</p>
            </div>
            <div className="feature-item">
              <h3>Contribution Analysis</h3>
              <p>Detailed insights and analytics on your contributions to the ecosystem.</p>
            </div>
            <div className="feature-item">
              <h3>Reward System</h3>
              <p>Earn rewards for your contributions and engagement within the community.</p>
            </div>
            <div className="feature-item">
              <h3>Profile Customization</h3>
              <p>Personalize your profile with themes, avatars, and more.</p>
            </div>
            <div className="feature-item">
              <h3>EcoBlock Marketplace</h3>
              <p>Trade EcoBlocks with other users in a secure and transparent marketplace.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProfilePage;
