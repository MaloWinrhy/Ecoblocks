import React, { useState } from 'react';
import './PresentationSection.css';

const PresentationSection = () => {
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleSquareClick = (index) => {
    setClickedIndex(index);
  };

  return (
    <section className="presentation-section">
      <div className="square-section">
        {[1, 2, 3].map((item, index) => (
          <div
            key={index}
            className={`square ${clickedIndex === index ? 'clicked' : ''}`}
            onClick={() => handleSquareClick(index)}
          >
            Square {item}
          </div>
        ))}
      </div>
    </section>
  );
}

export default PresentationSection;
