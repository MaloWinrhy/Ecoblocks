import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import './PrivacyPage.css';

const PrivacyPage = () => {
  return (
    <div className="PrivacyPage">
      <Header />
      <div className="content">
        <h1>Privacy Policy</h1>
        <p>
          Welcome to our Privacy Policy page. Here we explain how we handle your personal data and privacy.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
