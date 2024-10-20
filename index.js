// index.js (or server.js)
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./configs/db");
const { errorHandler } = require("./middlewares/errorHandler");

// Route imports
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(express.json()); // Body parser for JSON data
app.use(morgan("dev")); // HTTP request logger

// Routes
app.use("/api/users", userRoutes); // User management routes
app.use("/api/expenses", expenseRoutes); // Expense management routes

// Custom Error Handler Middleware
app.use(errorHandler);

// Server port (from environment or default to 5000)
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
