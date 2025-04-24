import React from 'react';
import { Card, Typography, CardContent, Box, Paper } from '@mui/material';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getRandomGradient = () => {
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
};

function Userquotecard({ quote, author }) {
  const randomGradient = getRandomGradient();

  return (
    <Box mt={8} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          width: '100%',
          background: randomGradient,
          color: '#fff',
          boxShadow: 3,
        }}
      >
        <Card
          sx={{
            background: 'transparent', // Making the card background transparent for the gradient effect
            color: '#fff',
            borderRadius: 3,
            overflow: 'hidden', // Ensure content doesn't spill over rounded corners
            mb: 2,
            border:"none",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              fontStyle="italic"
              sx={{ color: '#fff', fontWeight: 'bold' }}
            >
              "{quote}"
            </Typography>
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Typography
                variant="body2"
                sx={{ color: '#bbb', fontWeight: 'light', fontStyle: 'italic' }}
              >
                - {author}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
}

export default Userquotecard;
