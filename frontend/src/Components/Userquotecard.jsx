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
    <Box
      mt={{ xs: 4, sm: 6, md: 8 }}
      px={{ xs: 2, sm: 4 }}
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
          width: '100%',
          maxWidth: '800px',
          background: randomGradient,
          color: '#fff',
          boxShadow: 3,
        }}
      >
        <Card
          sx={{
            background: 'transparent',
            color: '#fff',
            borderRadius: 3,
            overflow: 'hidden',
            mb: 2,
            border: 'none',
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              fontStyle="italic"
              sx={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: {
                  xs: '1rem',
                  sm: '1.2rem',
                  md: '1.5rem',
                },
              }}
            >
              "{quote}"
            </Typography>
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Typography
                variant="body2"
                sx={{
                  color: '#ddd',
                  fontStyle: 'italic',
                  fontSize: {
                    xs: '0.8rem',
                    sm: '0.9rem',
                    md: '1rem',
                  },
                }}
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
