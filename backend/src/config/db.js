const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Using local MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mindsettler';
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
