// routes/userRoutes.js

const express = require('express');
const { createUser, getUserDetails } = require('../controllers/userController'); // Ensure these functions exist
const { protect } = require('../middlewares/authMiddleware'); // Ensure this middleware exists

const router = express.Router();

// Define routes
router.post('/', createUser);               // Create user (POST request)
router.get('/:id', getUserDetails); // Get user details (GET request, protected)

module.exports = router;
