import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
      <Box mt={isSmallScreen ? 4 : 8} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper
          elevation={3}
          sx={{
            padding: isSmallScreen ? 3 : 4,
            borderRadius: 2,
            width: '100%',
            backgroundColor: '#333',
            color: '#fff',
          }}
        >
          <Typography
            variant={isSmallScreen ? 'h5' : 'h4'}
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#fff' }}
          >
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
                '& .MuiInputBase-root': { color: '#fff' },
                '& .MuiInputLabel-root': { color: '#bbb' },
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                borderRadius: 1,
                backgroundColor: '#555',
                '& .MuiInputBase-root': { color: '#fff' },
                '& .MuiInputLabel-root': { color: '#bbb' },
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
                '& .MuiInputBase-root': { color: '#fff' },
                '& .MuiInputLabel-root': { color: '#bbb' },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                py: 1.2,
                fontWeight: 'bold',
                fontSize: isSmallScreen ? '0.9rem' : '1rem',
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
