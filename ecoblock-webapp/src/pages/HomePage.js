import React from 'react';
import Header from '../components/common/Header';
import MainSection from '../components/home/MainSection';
import StatsSection from '../components/home/StatsSection';
import PresentationSection from '../components/home/PresentationSection';
import Footer from '../components/common/Footer';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="HomePage">
      <Header />
      <MainSection />
      <PresentationSection /> {/* Include the new PresentationSection component */}
      <StatsSection />
      <Footer />
    </div>
  );
}

export default HomePage;
