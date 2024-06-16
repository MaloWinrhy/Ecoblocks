import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import './TermsPage.css';

const TermsPage = () => {
  return (
    <div className="TermsPage">
      <Header />
      <div className="content">
        <h1>Terms and Conditions</h1>
        <p>
          Welcome to our Terms and Conditions page. Here we explain the rules and regulations for using our website.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default TermsPage;
