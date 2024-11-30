const express = require('express');
const authRoutes = require('./auth');
const userRoutes = require('./user');

const router = express.Router();

// Mount specific routes
router.get('/', (req, res) => {
    res.send('API is working');
});
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
