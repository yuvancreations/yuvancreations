const express = require('express');
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

// PhonePe Config (Placeholders - User needs to update .env)
const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID || 'MOCK_MERCHANT_ID';
const SALT_KEY = process.env.PHONEPE_SALT_KEY || 'MOCK_SALT_KEY';
const SALT_INDEX = process.env.PHONEPE_SALT_INDEX || '1';
const PHONEPE_HOST = process.env.PHONEPE_HOST || 'https://api-preprod.phonepe.com/apis/pg-sandbox';

/**
 * Initiate Payment
 * POST /api/payment/initiate
 */
router.post('/initiate', async (req, res) => {
    try {
        const { amount, transactionId, userId, customerName } = req.body;

        // Use ₹10 as default if not provided, for this specific use case
        const paymentAmount = amount || 10;

        const payload = {
            merchantId: MERCHANT_ID,
            merchantTransactionId: transactionId,
            merchantUserId: userId || 'anonymous',
            amount: paymentAmount * 100, // Amount in paise
            redirectUrl: `http://localhost:5173/software/make-quotation?txId=${transactionId}`,
            redirectMode: 'REDIRECT',
            callbackUrl: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/payment/callback`,
            mobileNumber: '9999999999',
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };

        const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
        const stringToHash = base64Payload + '/pg/v1/pay' + SALT_KEY;
        const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
        const checksum = sha256 + '###' + SALT_INDEX;

        const options = {
            method: 'POST',
            url: `${PHONEPE_HOST}/pg/v1/pay`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: base64Payload
            }
        };

        const response = await axios.request(options);
        res.status(200).json(response.data);

    } catch (error) {
        console.error('PhonePe Initiation Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to initiate payment', details: error.message });
    }
});

/**
 * Payment Callback (Status Check)
 * GET /api/payment/status/:txId
 */
router.get('/status/:txId', async (req, res) => {
    try {
        const { txId } = req.params;
        const stringToHash = `/pg/v1/status/${MERCHANT_ID}/${txId}` + SALT_KEY;
        const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
        const checksum = sha256 + '###' + SALT_INDEX;

        const options = {
            method: 'GET',
            url: `${PHONEPE_HOST}/pg/v1/status/${MERCHANT_ID}/${txId}`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
                'X-MERCHANT-ID': MERCHANT_ID
            }
        };

        const response = await axios.request(options);
        res.status(200).json(response.data);

    } catch (error) {
        console.error('PhonePe Status Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch payment status' });
    }
});

module.exports = router;
