import React from 'react'
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import QuoteCard from '../QuoteCard';
import axios from 'axios';
import Userquotecard from '../Userquotecard';



const StyledContainer = styled(Container)`
  margin-top: 2rem;
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
`;

const SectionTitle = styled(Typography)`
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 2rem;
  color: #ffffff;
`;

const SubSectionTitle = styled(Typography)`
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 3rem;
  color: #ffffff;
`;

const StyledButton = styled(Button)`
  margin-top: 1.5rem;
  text-transform: none;
  font-weight: 600;
  padding: 0.6rem 2rem;
`;

const LoadingBox = styled(Box)`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;





function Home({isLoggedIn}) {
    const [quote, setQuote] = useState(null);
    const [author, setAuthor] = useState("");
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [userQuotes, setUserQuotes] = useState([]);
    
    
    const fetchQuote = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/quotes/random');
        setQuote(res.data.quote);
        setAuthor(res.data.author);
        setImageUrl(res.data.imageUrl); // Setting the image URL fetched from the API
        setLoading(false); // Setting loading to false after fetching is complete
      } catch (err) {
        console.error("Error fetching quote:", err);
        alert("Failed to fetch quote.");
        setLoading(false); // Ensure loading is set to false in case of error
      }
    };
    const fetchUserQuotes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/quotes/user');
        setUserQuotes(res.data);
      } catch (err) {
        console.error("Error fetching user quotes:", err);
      }
    };




    useEffect(() => {
      fetchQuote(); // Call the async function
      fetchUserQuotes(); //own quotes
    }, []); 

    if (loading) {
      return
      <StyledContainer>
        <LoadingBox>
          <CircularProgress color="success" />
        </LoadingBox>
      </StyledContainer>
    }
  
    if (!isLoggedIn) {
      return (
        <Box
            mt={8}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h5"
              color="#bbb" // Light gray text for dark theme
              sx={{
                textAlign: 'center', // Center the text
              }}
            >
              Please log in to view your quotes.
            </Typography>
          </Box>

      );
    }
 
  
  return (
    <StyledContainer>
      <Box>
        <SectionTitle>Random Quote</SectionTitle>

        {quote ? (
          <QuoteCard quote={quote} author={author} imageUrl={imageUrl} />
        ) : (
          <LoadingBox>
            <CircularProgress color="success" />
          </LoadingBox>
        )}

        <StyledButton
          onClick={fetchQuote}
          variant="contained"
          color="success"
        >
          New Quote
        </StyledButton>
      </Box>

      <Box>
        <SubSectionTitle>User Submitted Quotes</SubSectionTitle>
        {userQuotes.length > 0 ? (
        userQuotes.map((q, idx) => (
          <Userquotecard key={idx} quote={q.quote} author={q.author} />
        ))
      ) : (
        <Typography color="#bbbbbb">No user quotes found.</Typography>
      )}
      </Box>
    </StyledContainer>
  )
}

export default Home
