import React from 'react'
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
     const nav = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        // Implement registration logic
        
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password
      });
      localStorage.setItem('token', res.data.token);
      alert('Registration successful!');
      nav("/login")
    } catch (error) {
      console.error('Error registering:', error);
      alert('Failed to register.');
    }
      };
  return (
    <Container maxWidth="xs">
      <Box mt={8}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
        <TextField fullWidth margin="normal" label="Name"  onChange={(e) => setName(e.target.value)}/>
        <TextField fullWidth margin="normal" label="Email"  onChange={(e) => setEmail(e.target.value)}/>
        <TextField fullWidth margin="normal" label="Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} type='submit'>
          Register
        </Button>
        </form>
      </Box>
    </Container>
  )
}

export default Register
