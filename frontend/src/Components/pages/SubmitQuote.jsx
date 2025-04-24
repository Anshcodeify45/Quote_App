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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import axios from 'axios';

function SubmitQuote() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState('');

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
      setError('');
    } catch (err) {
      setError('Failed to submit quote.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={isSmallScreen ? 4 : 8} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper
          elevation={3}
          sx={{
            p: isSmallScreen ? 2 : 4,
            width: '100%',
            backgroundColor: '#333',
            color: '#fff',
            borderRadius: 2,
          }}
        >
          <Typography
            variant={isSmallScreen ? 'h6' : 'h5'}
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#fff', textAlign: 'center' }}
          >
            Submit Your Quote
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Quote"
              variant="outlined"
              multiline
              rows={isSmallScreen ? 2 : 3}
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              sx={{
                mb: 3,
                backgroundColor: '#555',
                '& .MuiInputBase-root': { color: '#fff' },
                '& .MuiInputLabel-root': { color: '#bbb' },
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
                '& .MuiInputBase-root': { color: '#fff' },
                '& .MuiInputLabel-root': { color: '#bbb' },
              }}
            />
            {error && (
              <Typography color="error" sx={{ mb: 2, fontSize: '0.9rem' }}>
                {error}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                width: '100%',
                fontSize: isSmallScreen ? '0.9rem' : '1rem',
                py: 1.2,
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#1565c0' },
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
