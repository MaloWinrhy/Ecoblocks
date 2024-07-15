import React, { useState } from 'react';
import './Auth.css';
import { sanitizeInput, validateEmail, validatePassword, validatePasswordMatch } from '../../utils/validationUtils';
import { register } from '../../services/authServices';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const sanitizedEmail = sanitizeInput(email);
    const sanitizedUsername = sanitizeInput(username);
    const sanitizedPassword = sanitizeInput(password);
    const sanitizedConfirmPassword = sanitizeInput(confirmPassword);

    if (!validateEmail(sanitizedEmail)) {
      setError('Invalid email format');
      return;
    }

    if (!validatePassword(sanitizedPassword)) {
      setError('Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, and one digit.');
      return;
    }

    if (!validatePasswordMatch(sanitizedPassword, sanitizedConfirmPassword)) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(sanitizedUsername, sanitizedEmail, sanitizedPassword);
      setSuccess('Registration successful!');
    } catch (error) {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
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
        {success && <p className="success">{success}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
