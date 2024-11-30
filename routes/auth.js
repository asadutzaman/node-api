const express = require('express');
const { register, login, profile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const { validate } = require('../middlewares/validationMiddleware');
const router = express.Router();

router.post(
    '/register',
    validate([
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ]),
    register
);
router.post('/login', login);
router.get('/profile', protect, profile);

module.exports = router;
