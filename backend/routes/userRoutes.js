const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Internal Middleware to verify token and admin role
const verifyAdmin = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// @route   GET /api/users
// @desc    Get all users
// @access  Private/Admin
router.get('/', verifyAdmin, async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/users/:id
// @desc    Delete a user
// @access  Private/Admin
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.id || req.params.id); // For robust check
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent deleting oneself
        if (user._id.toString() === req.user.id) {
            return res.status(400).json({ message: 'Cannot delete your own admin account' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
