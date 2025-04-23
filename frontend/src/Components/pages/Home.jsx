import React from 'react'
import { Container, Typography, Box,Button,CircularProgress, } from "@mui/material";
import { useEffect, useState } from 'react';
import QuoteCard from '../QuoteCard';
import axios from 'axios';
function Home() {
    const [quote, setQuote] = useState(null);
    const [author, setAuthor] = useState("");


    const fetchQuote = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/quotes/random');
        setQuote(res.data.quote);
        setAuthor(res.data.author); // res.data will be: { text: "...", author: "..." }
      } catch (err) {
        console.error("Error fetching quote:", err);
        alert("Failed to fetch quote.");
      }
    };
    const saveQuote = async () => {
      const token = localStorage.getItem('token');
      if (!token) return alert('You must be logged in to save quotes.');
      
      try {
        await axios.post(
          'http://localhost:5000/api/quotes/save',
          { text: quote.text, author: quote.author },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert('Quote saved successfully!');
      } catch (error) {
        console.error('Error saving quote:', error);
        alert('Failed to save quote.');
      }
    };

    useEffect(() => {
      fetchQuote();
    }, []);
  
  return (
    <Container>
         <Box>
    <Typography variant="h4" fontWeight="bold" gutterBottom>
        Random Quote
      </Typography>

      {quote ? (
        <QuoteCard quote={quote} author={author} />
      ) : (
        <Box mt={2}>
          <CircularProgress />
        </Box>
      )}

      <Button
        onClick={fetchQuote}
        variant="contained"
        color="success"
        sx={{ mt: 3 }}
      >
        New Quote
      </Button>
    </Box>
  </Container>
  )
}

export default Home
