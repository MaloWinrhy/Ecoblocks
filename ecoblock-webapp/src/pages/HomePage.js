import React from 'react';
import Header from '../components/common/Header';
import MainSection from '../components/home/MainSection';
import StatsSection from '../components/home/StatsSection';
import ProductsSection from '../components/home/ProductsSection';
import PresentationSection from '../components/home/PresentationSection';
import Footer from '../components/common/Footer';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="HomePage">
      <Header />
      <MainSection />
      <PresentationSection />
      <ProductsSection />
      <StatsSection />
      <Footer />
    </div>
  );
}

export default HomePage;
