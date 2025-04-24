import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setUser ,setIsLoggedIn}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.name);
      setIsLoggedIn(true);
      alert('Login successful!');
      nav('/');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid credentials.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={8} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 2,
            width: '100%',
            backgroundColor: '#333', // Dark background for the paper component
            color: '#fff', // Light text color for contrast
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#fff' }}
          >
            Login
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              borderRadius: 1,
              backgroundColor: '#555', // Darker input background
              '& .MuiInputBase-root': {
                color: '#fff', // Light text in inputs
              },
              '& .MuiInputLabel-root': {
                color: '#bbb', // Light label text
              },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              borderRadius: 1,
              backgroundColor: '#555',
              '& .MuiInputBase-root': {
                color: '#fff',
              },
              '& .MuiInputLabel-root': {
                color: '#bbb',
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              padding: '10px 0',
              fontWeight: 'bold',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;
