const mongoose = require('mongoose');

// Define the schema for the User collection
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,   // Username is required
    unique: true,     // Username must be unique
  },
  password: {
    type: String,
    required: true,   // Password is required
  },
});

// Create a Mongoose model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;  // Export the User model for use in other parts of the application
