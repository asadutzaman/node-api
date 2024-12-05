const User = require('../models/User'); // Import the User model

// Utility function for sending uniform responses
const sendResponse = (res, statusCode, success, data, message = '') => {
    res.status(statusCode).json({
        success,
        message,
        data,
    });
};

// Controller for User CRUD Operations

// Create a new user
exports.createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body); // Automatically validates schema
        sendResponse(res, 201, true, user, 'User created successfully');
    } catch (error) {
        next(error); // Forward error to centralized error handler
    }
};

// Get all users with pagination
exports.getAllUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const pageNumber = parseInt(page, 10);
        const pageSize = parseInt(limit, 10);

        // Parallelized query execution for performance
        const [users, totalUsers] = await Promise.all([
            User.find()
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .select('-password') // Exclude sensitive data like password
                .lean(), // Fetch plain JavaScript objects
            User.countDocuments(),
        ]);

        const totalPages = Math.ceil(totalUsers / pageSize);
        const pagination = { totalUsers, totalPages, currentPage: pageNumber };

        sendResponse(res, 200, true, { users, pagination });
    } catch (error) {
        next(error);
    }
};

// Get a single user by ID
exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password').lean(); // Fetch plain object and exclude sensitive data

        if (!user) {
            return sendResponse(res, 404, false, null, 'User not found');
        }

        sendResponse(res, 200, true, user);
    } catch (error) {
        next(error);
    }
};

// Update a user by ID
exports.updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).select('-password').lean();

        if (!updatedUser) {
            return sendResponse(res, 404, false, null, 'User not found');
        }

        sendResponse(res, 200, true, updatedUser, 'User updated successfully');
    } catch (error) {
        next(error);
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id).select('-password').lean();

        if (!deletedUser) {
            return sendResponse(res, 404, false, null, 'User not found');
        }

        sendResponse(res, 200, true, deletedUser, 'User deleted successfully');
    } catch (error) {
        next(error);
    }
};
