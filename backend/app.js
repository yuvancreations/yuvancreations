const express = require('express');
const cors = require('cors');
require('dotenv').config();

const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes (Using Firebase for DB/Auth, Backend is only for PhonePe Proxy)
app.use('/api/payment', paymentRoutes);

// Base route test
app.get('/', (req, res) => {
    res.send('Yuvan Creations PhonePe Proxy API is running...');
});

module.exports = app;
