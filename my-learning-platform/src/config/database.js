/ Importing required modules
const mongoose = require('mongoose');  // MongoDB ORM library
const User = require('../models/userModel');  // User model (assuming it's defined in userModels.js)

/**
 * Async function to establish connection to MongoDB database.
 */
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using Mongoose
    await mongoose.connect('mongodb://root:MjU3Nzctb3phaGFy@localhost:27017', {
      useNewUrlParser: true,  // MongoDB connection options
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');  // Log success message if connection is successful
  } catch (error) {
    // Log error message and exit process if connection fails
    console.error('MongoDB connection error:', error);
    process.exit(1);  // Exit with non-zero status code indicating error
  }
};

module.exports = connectDB;  // Export connectDB function for use in other modules