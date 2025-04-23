const express = require('express');
const { getRandomQuote, getSavedQuotes, saveQuote } = require('../controllers/quoteController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/random', getRandomQuote);
router.get('/saved', protect, getSavedQuotes);
router.post('/save', protect, saveQuote);

module.exports = router;