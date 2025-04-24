const Quote = require('../model/Quote');
const User = require('../model/User');
const axios = require('axios');
const UserQuote = require('../model/quotes');
const getRandomQuote = async (req, res) => {
  try {
    const response = await axios.get('https://zenquotes.io/api/random');
    const quote = response.data[0].q;
    const author = response.data[0].a;


        // Fetch random image from Unsplash API (replace YOUR_ACCESS_KEY with actual key)
        const imageresponse = await axios.get('https://api.pexels.com/v1/curated', {
          headers: {
            Authorization: 'HwI1bWSrNedwas5DTKlEYEgXcZvM4vO8SF7dgIa8au5PDiED89NrRYzC'
          }});
          if (imageresponse.data.photos.length === 0) {
            return res.status(404).json({ message: 'No images found' });
          }
      
          const imageUrl = imageresponse.data.photos[0].src.original;

    res.json({ quote, author , imageUrl});
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



const submitUserQuote = async (req, res) => {
  try {
    const { quote, author } = req.body;
    if (!quote || !author) {
      return res.status(400).json({ message: 'Quote and author are required' });
    }

    const newQuote = new UserQuote({ quote, author });
    await newQuote.save();

    res.status(201).json({ message: 'Quote submitted successfully' });
  } catch (error) {
    console.error('Error submitting quote:', error);
    res.status(500).json({ message: 'Failed to submit quote' });
  }
};

const getUserQuotes = async (req, res) => {
  try {
    const quotes = await UserQuote.find().sort({ createdAt: -1 }); // latest first
    res.json(quotes);
  } catch (error) {
    console.error('Error fetching user quotes:', error);
    res.status(500).json({ message: 'Failed to fetch user quotes' });
  }
};



module.exports = { getRandomQuote, getSavedQuotes, submitUserQuote,getUserQuotes };