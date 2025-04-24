const express = require('express');
const { getRandomQuote, getSavedQuotes, submitUserQuote,getUserQuotes } = require('../controllers/quoteController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/random', getRandomQuote);
router.get('/saved', protect, getSavedQuotes);
router.post('/submit', submitUserQuote);
router.get('/user', getUserQuotes);

module.exports = router;