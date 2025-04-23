const Quote = require('../model/Quote');
const User = require('../model/User');

const getRandomQuote = async (req, res) => {
  const count = await Quote.countDocuments();
  const random = Math.floor(Math.random() * count);
  const quote = await Quote.findOne().skip(random);
  res.json(quote);
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