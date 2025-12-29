require('dotenv').config();
const express = require('express');
// ... rest of your imports
const app = require('./src/app');
const connectDB = require('./src/config/db');

// Connect to MongoDB (local)
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
