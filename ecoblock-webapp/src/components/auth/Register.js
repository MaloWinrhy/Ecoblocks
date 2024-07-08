import React, { useState } from 'react';
import './Auth.css';
import { sanitizeInput, validateEmail, validatePassword, validatePasswordMatch } from '../../utils/validationUtils';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);
    const sanitizedConfirmPassword = sanitizeInput(confirmPassword);

    if (!validateEmail(sanitizedEmail)) {
      setError('Invalid email format');
      return;
    }

    if (!validatePassword(sanitizedPassword)) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (!validatePasswordMatch(sanitizedPassword, sanitizedConfirmPassword)) {
      setError('Passwords do not match');
      return;
    }

  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
