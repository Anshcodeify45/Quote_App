import React from 'react'
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login({setUser}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Implement login logic
        console.log("login email & password>>>>",email,password);
        try {
          const res = await axios.post('http://localhost:5000/api/auth/login', {
            email,
            password
          });
          const data=localStorage.setItem('token', res.data.token);
          console.log("Data>>>",res.data.name);
          setUser(res.data.name);
          alert('Login successful!');
          nav('/');
        } catch (error) {
          console.error('Error logging in:', error);
          alert('Invalid credentials.');
        }
      };
  return (
    <Container maxWidth="xs">
    <Box mt={8}>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <TextField fullWidth margin="normal" label="Email" onChange={(e) => setEmail(e.target.value)} />
      <TextField fullWidth margin="normal" label="Password" type="password" onChange={(e) => setPassword(e.target.value)}  />
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
        Login
      </Button>
    </Box>
  </Container>
  )
}

export default Login
