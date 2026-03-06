const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Message = require('../models/Message');

// Admin verification middleware (same as userRoutes, ideally should be shared in an auth middleware file)
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


// @route   POST /api/messages
// @desc    Submit a contact form message
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        const newMessage = new Message({
            name,
            email,
            phone,
            message
        });

        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/messages
// @desc    Get all contact messages
// @access  Private/Admin
router.get('/', verifyAdmin, async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
