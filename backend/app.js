const express = require('express');
const cors = require('cors');
require('dotenv').config();

const paymentRoutes = require('./routes/paymentRoutes');
const chatRoutes = require('./routes/chatRoutes');


const app = express();

// Middleware
const allowedOrigins = [
    'https://yuvancreations.in',
    'https://www.yuvancreations.in',
    'http://localhost:5173'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes (Using Firebase for DB/Auth, Backend is only for PhonePe Proxy)
app.use('/api/payment', paymentRoutes);
app.use('/api/chat', chatRoutes);

// Base route test
app.get('/', (req, res) => {
    res.send('Yuvan Creations PhonePe Proxy API is running...');
});

module.exports = app;
