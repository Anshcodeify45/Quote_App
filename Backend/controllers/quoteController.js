const Quote = require('../model/Quote');
const User = require('../model/User');
const axios = require('axios');

const getRandomQuote = async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/random');
    const quote = response.data[0].q;
    const author = response.data[0].a;

    res.json({ quote, author });
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).json({ message: 'Failed to fetch quote' });
  }
};
const getSavedQuotes = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.savedQuotes);
};

const saveQuote = async (req, res) => {
  const user = await User.findById(req.user.id);
  const { text, author } = req.body;
  user.savedQuotes.push({ text, author });
  await user.save();
  res.status(201).json(user.savedQuotes);
};

module.exports = { getRandomQuote, getSavedQuotes, saveQuote };