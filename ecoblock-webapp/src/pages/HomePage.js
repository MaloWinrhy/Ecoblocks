import React from 'react';
import MainSection from '../components/home/MainSection';
import StatsSection from '../components/home/StatsSection';
import ProductsSection from '../components/home/ProductsSection';
import PresentationSection from '../components/home/PresentationSection';
import Newsletter from '../components/newsletter/Newsletter';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="HomePage">
      <MainSection />
      <PresentationSection />
      <ProductsSection />
      <StatsSection />
      <Newsletter />
    </div>
  );
}

export default HomePage;


