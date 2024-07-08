import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUtils } from 'react-admin';
import { jwtDecode }from 'jwt-decode';
import { Card, CardActions, CardContent, Button, TextField, Typography, Box, Alert } from '@mui/material';

const apiUrl = 'http://localhost:8000';

const LoginPage = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const url = `${apiUrl}/login`;
    const options = {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    };

    try {
      const response = await fetchUtils.fetchJson(url, options);
      const { token } = response.json;
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      if (role !== 'ADMIN') {
        setError('Access denied: Admins only');
      } else {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        setAuthenticated(true);
        navigate('/');
      }
    } catch (err) {
      setError('Login failed: Invalid email or password');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Admin Login
          </Typography>
          <form onSubmit={handleLogin} noValidate>
            <Box mb={2}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />
            </Box>
            {error && (
              <Box mb={2}>
                <Alert severity="error">{error}</Alert>
              </Box>
            )}
            <CardActions>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
