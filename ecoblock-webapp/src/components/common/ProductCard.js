import React from 'react';
import './ProductCard.css';

const ProductCard = ({ image, title, description, tag }) => {
  return (
    <div className="product-card">
      <div className="image-container">
        <img src={image || 'default_image_path'} alt={title} className="product-image" />
        <div className="product-tag">{tag}</div>
      </div>
      <div className="content-container">
        <h3 className="product-title">{title}</h3>
        <p className="product-description">{description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
