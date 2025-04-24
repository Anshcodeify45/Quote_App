import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      alert('Registration successful!');
      nav('/login');
    } catch (error) {
      console.error('Error registering:', error);
      alert('Failed to register.');
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
            backgroundColor: '#333', // Dark background
            color: '#fff', // Light text color
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#fff' }}>
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              onChange={(e) => setName(e.target.value)}
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
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
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
              type="submit"
            >
              Register
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default Register;
