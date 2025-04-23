import React from 'react'
import { Paper, Typography, Button, Box } from "@mui/material";





function QuoteCard({ quote, author, onLike }) {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ fontStyle: 'italic', color: 'gray.800' }}>
        "{quote}"
      </Typography>
      <Typography variant="body2" align="right" sx={{ mt: 2, color: 'gray.600' }}>
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
