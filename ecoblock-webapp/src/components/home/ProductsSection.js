import React, { useRef, useEffect, useState } from 'react';
import ProductCard from '../common/ProductCard';
import { getAllBlogProducts } from '../../services/productsServices';
import './ProductsSection.css';

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    getAllBlogProducts()
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

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
            description={product.content}
            tag={product.tags && product.tags.length > 0 ? product.tags[0] : ''}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
