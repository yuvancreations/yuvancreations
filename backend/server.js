const express = require('express');
const cors = require('cors');
require('dotenv').config();

const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (Only Payment Proxy route is needed since we use Firebase for DB/Auth!)
app.use('/api/payment', paymentRoutes);

// Base route test
app.get('/', (req, res) => {
    res.send('Yuvan Creations PhonePe Proxy API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
