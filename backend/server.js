// Imports necessary modules
const express = require('express'); // Imports Express for server creation
const mongoose = require('mongoose'); // Imports Mongoose for MongoDB connection
const taskRoutes = require("./taskRoutes");
require('dotenv').config(); // Loads environment variables from .env file
const cors = require('cors');

// Initializes the Express application
const app = express();
const PORT = process.env.PORT; // Defines the port from environment variables or use 5000 as default

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());
app.use("/tasks",taskRoutes);

// Connect to MongoDB using Mongoose without deprecated options
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected')) // Log success message if connected
  .catch(err => console.error('MongoDB Connection Failed:', err)); // Log error message if the connection fails

// Starts the server and listens for incoming requests
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
