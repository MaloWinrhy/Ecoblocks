import React from 'react';
import { NavLink } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = ({ errorCode, errorMessage }) => {
  const firstChar = errorCode.charAt(0);
  const lastChar = errorCode.charAt(errorCode.length - 1);
  const middleChars = errorCode.slice(1, -1);

  return (
    <div className="error-page-container">
      <h1>
        <span className="primary-color">{firstChar}</span>
        {middleChars}
        <span className="primary-color">{lastChar}</span>
      </h1>
      <p>{errorMessage}</p>
      <NavLink to="/" className="home-link">Return to Home</NavLink>
    </div>
  );
};

export default ErrorPage;
