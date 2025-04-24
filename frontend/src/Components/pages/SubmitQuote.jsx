import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';

function SubmitQuote() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!quote || !author) {
      setError("Both fields are required");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/quotes/submit', {
        quote,
        author,
      });
      setQuote('');
      setAuthor('');
      setOpenSnackbar(true);
    } catch (err) {
      setError('Failed to submit quote.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            backgroundColor: '#333', // Dark background for the Paper
            color: '#fff', // Light text color
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#fff' }}
          >
            Submit Your Quote
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Quote"
              variant="outlined"
              multiline
              rows={3}
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              sx={{
                mb: 3,
                backgroundColor: '#555', // Dark input background
                '& .MuiInputBase-root': {
                  color: '#fff', // White text inside the input
                },
                '& .MuiInputLabel-root': {
                  color: '#bbb', // Light label color
                },
              }}
            />
            <TextField
              fullWidth
              label="Author"
              variant="outlined"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              sx={{
                mb: 3,
                backgroundColor: '#555',
                '& .MuiInputBase-root': {
                  color: '#fff',
                },
                '& .MuiInputLabel-root': {
                  color: '#bbb',
                },
              }}
            />
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                width: '100%',
                backgroundColor: '#1976d2', // Blue button color
                '&:hover': {
                  backgroundColor: '#1565c0', // Darker blue on hover
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          Quote submitted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default SubmitQuote;
