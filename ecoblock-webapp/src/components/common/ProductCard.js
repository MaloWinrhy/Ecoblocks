import React from 'react';
import './ProductCard.css';

const ProductCard = ({ image, title, description, tag }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />
      <div className="product-tag">{tag}</div>
      <h3 className="product-title">{title}</h3>
      <p className="product-description">{description}</p>
    </div>
  );
};

export default ProductCard;
