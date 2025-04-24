import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';

function QuoteCard({ quote, author, imageUrl, onLike }) {
  const defaultImageUrl = 'https://via.placeholder.com/800x600';
  const backgroundStyle = {
    backgroundImage: `url(${imageUrl || defaultImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    borderRadius: '10px',
    padding: '20px',
    color: 'black',
    marginTop: 10,
  };

  return (
    <Paper
      elevation={3}
      sx={{
        ...backgroundStyle,
        height: {
          xs: '180px',
          sm: '200px',
          md: '250px',
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontStyle: 'italic',
          color: 'black',
          fontSize: {
            xs: '1rem',
            sm: '1.2rem',
            md: '1.4rem',
          },
        }}
      >
        "{quote}"
      </Typography>
      <Typography
        variant="body2"
        align="right"
        sx={{
          mt: 2,
          color: 'black',
          fontSize: {
            xs: '0.8rem',
            sm: '0.9rem',
            md: '1rem',
          },
        }}
      >
        - {author}
      </Typography>
      {onLike && (
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              fontSize: {
                xs: '0.7rem',
                sm: '0.9rem',
              },
              padding: {
                xs: '6px 12px',
                sm: '8px 16px',
              },
            }}
            onClick={onLike}
          >
            Like
          </Button>
        </Box>
      )}
    </Paper>
  );
}

export default QuoteCard;
