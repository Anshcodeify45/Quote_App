import React from 'react'
import { Paper, Typography, Button, Box } from "@mui/material";





function QuoteCard({ quote, author, imageUrl,onLike }) {
  const defaultImageUrl = 'https://via.placeholder.com/800x600';
  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '150px', // You can adjust this height as needed
    width: '100%',
    borderRadius: '10px', // Optional: For rounded corners on the background image
    padding: '20px', // Add padding to the content inside
    color:'black',
    marginTop:10,
  };
  return (
    <Paper
    elevation={3} 
    sx={backgroundStyle}
  >
    <Typography variant="h6" sx={{ fontStyle: 'italic', color: 'black' }}>
      "{quote}"
    </Typography>
    <Typography variant="body2" align="right" sx={{ mt: 2, color: 'black' }}>
      - {author}
    </Typography>
    {onLike && (
      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={onLike}>
          Like
        </Button>
      </Box>
    )}
  </Paper>
  )
}

export default QuoteCard
