const express = require('express');
const connectDB = require('./config/database'); // Import function to connect to MongoDB
const userRoutes = require('./routes/userRoutes'); // Import user routes

const app = express(); // Create an Express application

// Connect to MongoDB
connectDB(); // Call the function to establish connection with MongoDB

// Middleware
app.use(express.json()); // Middleware to parse JSON request bodies

// Routes
app.use('/users', userRoutes); // Mount user routes under '/users' path

// Start the server
const port = 3000; // Port number for the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`); // Callback function to log server start
});
