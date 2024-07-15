import React, { useState, useEffect } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    bio: 'Eco enthusiast and blockchain lover.',
    ecoBlocks: 120,
    rank: 5,
    walletNumber: '1234-5678-9123-4567',
    walletStats: {
      balance: 250.75,
      transactions: 48,
      rewards: 30.5
    }
  });

  useEffect(() => {
    // Fetch user profile data from API and set it to state
    // For now, using static data for demonstration
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
                <p>Balance: {profile.walletStats.balance} EcoBlocks</p>
                <p>Transactions: {profile.walletStats.transactions}</p>
                <p>Rewards: {profile.walletStats.rewards} EcoBlocks</p>
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
