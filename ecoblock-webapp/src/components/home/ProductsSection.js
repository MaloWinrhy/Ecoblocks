import React, { useRef } from 'react';
import ProductCard from '../common/ProductCard';
import './ProductsSection.css';

const products = [
  {
    image: 'path_to_green_track_app_image',
    title: 'GreenTrack App',
    description: 'A mobile app using blockchain to track and certify eco-friendly practices of businesses and individuals.',
    tag: 'SUSTAINABILITY'
  },
  {
    image: 'path_to_eco_sensor_network_image',
    title: 'EcoSensor Network',
    description: 'An IoT network of sensors deployed in cities to monitor air, water, and soil quality, with data secured on the blockchain.',
    tag: 'IoT & ENVIRONMENT'
  },
  {
    image: 'path_to_smart_grid_manager_image',
    title: 'SmartGrid Manager',
    description: 'A blockchain platform to manage and optimize energy in smart grids, integrating renewable energy sources.',
    tag: 'ENERGY MANAGEMENT'
  },
  {
    image: 'path_to_waste_chain_image',
    title: 'WasteChain',
    description: 'A blockchain solution for managing the recycling and waste treatment chain, ensuring transparency and efficiency.',
    tag: 'WASTE MANAGEMENT'
  },
  {
    image: 'path_to_eco_travel_image',
    title: 'EcoTravel',
    description: 'A mobile app to promote and book eco-friendly travel options, with crypto rewards for sustainable choices.',
    tag: 'ECO TRAVEL'
  },
  {
    image: 'path_to_smart_city_connect_image',
    title: 'SmartCity Connect',
    description: 'An IoT and mobile platform connecting citizens to smart city infrastructure, with data secured on the blockchain.',
    tag: 'SMART CITY'
  }
];

const ProductsSection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        top: 0,
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="products-section">
      <h2 className='products-title'>Our products</h2>
      <div className="scroll-buttons">
        <div className="scroll-button left" onClick={() => scroll('left')}>&#9664;</div>
        <div className="scroll-button right" onClick={() => scroll('right')}>&#9654;</div>
      </div>
      <div className="product-list" ref={scrollRef}>
        {products.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            title={product.title}
            description={product.description}
            tag={product.tag}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
