import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './Auth.css';
import { login, setToken } from '../../services/authServices';
import { sanitizeInput, validateEmail } from '../../utils/validationUtils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    if (!validateEmail(sanitizedEmail)) {
      toast.error('Invalid email format');
      return;
    }

    try {
      const response = await login(sanitizedEmail, sanitizedPassword);
      setToken(response.token);
      toast.success('Login successful!');
      window.location.href = '/';
    } catch (error) {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
