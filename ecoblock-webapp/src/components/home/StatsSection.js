import React from 'react';
import './StatsSection.css';

const StatsSection = () => {
  return (
    <section className="stats-section">
      <h2>Cool title that explains what your company does</h2>
      <p>Some more info in a paragraph supporting the headline, explaining the specific issue you solve for your customers.</p>
      <div className="stats">
        <div className="stat">
          <h3>24+</h3>
          <p>Burger Blisses across the country</p>
        </div>
        <div className="stat">
          <h3>17M</h3>
          <p>Burger eaters and counting</p>
        </div>
        <div className="stat">
          <h3>+95%</h3>
          <p>Customer satisfaction</p>
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
