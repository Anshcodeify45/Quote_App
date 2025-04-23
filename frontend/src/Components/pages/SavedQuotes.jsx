import React from 'react'
import { Container, Typography, Box, Paper } from "@mui/material";
import axios from 'axios';
import { useState,useEffect } from 'react';

function SavedQuotes() {
    const [quotes, setQuotes] = useState([]);
    const savedQuotes = [
        "The best way to predict the future is to create it.",
        "Do something today that your future self will thank you for.",
      ];

      useEffect(() => {
        const fetchSavedQuotes = async () => {
          const token = localStorage.getItem('token');
          if (!token) return alert('You must be logged in to view saved quotes.');
    
          try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/quotes/saved`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            setQuotes(res.data);
          } catch (error) {
            console.error('Error fetching saved quotes:', error);
            alert('Failed to load saved quotes.');
          }
        };
        fetchSavedQuotes();
      }, []);
  return (
    <Container>
    <Box mt={8}>
      <Typography variant="h4" gutterBottom>
        Saved Quotes
      </Typography>
      {savedQuotes.map((quote, index) => (
        <Paper key={index} sx={{ p: 2, mb: 2 }}>
          {quote}
        </Paper>
      ))}
    </Box>
  </Container>
  )
}

export default SavedQuotes
