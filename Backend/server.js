require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const quoteRoutes = require('./routes/quoteRoutes');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./Database/connect');




const app = express();

app.use(cors({
    origin: 'https://quote-app-soullines.onrender.com',  // ✅ Frontend URL
    credentials: true,  // if you're using cookies or auth headers
  }));
  
app.use(express.json());

connectDB();

app.use('/api/quotes', quoteRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));