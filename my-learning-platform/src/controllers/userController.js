const User = require('../models/userModel');  // Importing User model from userModel.js
const bcrypt = require('bcrypt');             // Importing bcrypt for password hashing
const jwt = require('jsonwebtoken');          // Importing jsonwebtoken for JWT generation

/**
 * Controller function for registering a new user.
 * @param {Object} req - HTTP request object containing user data in req.body.
 * @param {Object} res - HTTP response object for sending registration status.
 */
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with hashed password
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save(); // Save the new user to the database

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Controller function for user login.
 * @param {Object} req - HTTP request object containing user credentials in req.body.
 * @param {Object} res - HTTP response object for sending login status and JWT.
 */
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username exists in the database
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare the provided password with the stored hashed password using bcrypt
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JSON Web Token (JWT) with user information for authentication
    const token = jwt.sign({ username: existingUser.username }, 'c347ea0f6afe2d3a9d4cba744b84964257d6ff0f4f7937e05c7fcc11e335ec36', { expiresIn: '1h' });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Controller function for updating user profile.
 * @param {Object} req - HTTP request object containing username in req.params and newUsername in req.body.
 * @param {Object} res - HTTP response object for sending update status.
 */
exports.updateUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const { newUsername } = req.body;

    // Update the user's username in the database
    await User.updateOne({ username }, { username: newUsername });

    return res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
