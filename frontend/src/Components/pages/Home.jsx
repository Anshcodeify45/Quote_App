import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import QuoteCard from '../QuoteCard';
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

function Home({ isLoggedIn }) {
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [userQuotes, setUserQuotes] = useState([]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchQuote = async () => {
    try {
      const res = await axios.get('https://quote-app-vxr4.onrender.com/api/quotes/random');
      setQuote(res.data.quote);
      setAuthor(res.data.author);
      setImageUrl(res.data.imageUrl);
    } catch (err) {
      console.error("Error fetching quote:", err);
      alert("Failed to fetch quote.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserQuotes = async () => {
    try {
      const res = await axios.get('https://quote-app-vxr4.onrender.com/api/quotes/user');
      setUserQuotes(res.data);
    } catch (err) {
      console.error("Error fetching user quotes:", err);
    }
  };

  useEffect(() => {
    fetchQuote();
    fetchUserQuotes();
  }, []);

  if (!isLoggedIn) {
    return (
      <Box
        mt={isSmallScreen ? 6 : 10}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
        }}
      >
        <Typography
          variant={isSmallScreen ? "h6" : "h5"}
          color="#bbb"
          textAlign="center"
        >
          Please log in to view your quotes.
        </Typography>
      </Box>
    );
  }

  return (
    <StyledContainer maxWidth="md">
      <Box>
        <SectionTitle variant={isSmallScreen ? "h5" : "h4"}>
          Random Quote
        </SectionTitle>

        {loading ? (
          <LoadingBox>
            <CircularProgress color="success" />
          </LoadingBox>
        ) : (
          quote && (
            <QuoteCard quote={quote} author={author} imageUrl={imageUrl} />
          )
        )}

        <StyledButton
          onClick={fetchQuote}
          variant="contained"
          color="success"
          sx={{
            fontSize: isSmallScreen ? '0.9rem' : '1rem',
            px: isSmallScreen ? 2 : 4,
            py: 1,
          }}
        >
          New Quote
        </StyledButton>
      </Box>

      <Box>
        <SubSectionTitle variant={isSmallScreen ? "h6" : "h5"}>
          User Submitted Quotes
        </SubSectionTitle>

        {userQuotes.length > 0 ? (
          userQuotes.map((q, idx) => (
            <Userquotecard key={idx} quote={q.quote} author={q.author} />
          ))
        ) : (
          <Typography color="#bbbbbb">No user quotes found.</Typography>
        )}
      </Box>
    </StyledContainer>
  );
}

export default Home;
