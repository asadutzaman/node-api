const express = require('express');
const { protect, admin } = require('../middlewares/authMiddleware');

const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/userController');

const router = express.Router();

// CRUD operations
router.post('/', createUser); // Create a user
router.get('/', getAllUsers); // Get all users with pagination
router.get('/:id', getUserById); // Get a single user by ID
router.put('/:id', updateUser); // Update a user
router.delete('/:id', deleteUser); // Delete a user

module.exports = router;
