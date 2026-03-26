const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const FRONTEND_URL = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');
const PHONEPE_ENV = (process.env.PHONEPE_ENV || 'production').toLowerCase();
const IS_PRODUCTION = ['production', 'prod', 'live'].includes(PHONEPE_ENV);

const PHONEPE_CLIENT_ID = process.env.PHONEPE_CLIENT_ID || process.env.PHONEPE_MERCHANT_ID || '';
const PHONEPE_CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET || process.env.PHONEPE_SALT_KEY || '';
const PHONEPE_CLIENT_VERSION = String(process.env.PHONEPE_CLIENT_VERSION || process.env.PHONEPE_SALT_INDEX || '1');
const PHONEPE_MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID || '';

const PHONEPE_AUTH_URL = (
    process.env.PHONEPE_AUTH_URL ||
    (IS_PRODUCTION
        ? 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token'
        : 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token')
).replace(/\/$/, '');

const PHONEPE_PG_BASE_URL = (
    process.env.PHONEPE_PG_BASE_URL ||
    (IS_PRODUCTION
        ? 'https://api.phonepe.com/apis/pg'
        : 'https://api-preprod.phonepe.com/apis/pg-sandbox')
).replace(/\/$/, '');

const PHONEPE_ORDER_EXPIRE_AFTER = Number(process.env.PHONEPE_ORDER_EXPIRE_AFTER || 600);
const PHONEPE_PAYMENT_MESSAGE = process.env.PHONEPE_PAYMENT_MESSAGE || 'Secure payment request';
const PHONEPE_WEBHOOK_USERNAME = process.env.PHONEPE_WEBHOOK_USERNAME || '';
const PHONEPE_WEBHOOK_PASSWORD = process.env.PHONEPE_WEBHOOK_PASSWORD || '';

let cachedAccessToken = '';
let tokenExpiresAt = 0;

const normalizeMobileNumber = (value) => {
    if (!value) return '';
    const digits = String(value).replace(/\D/g, '');
    if (digits.length === 10) return digits;
    if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
    return '';
};

const clearTokenCache = () => {
    cachedAccessToken = '';
    tokenExpiresAt = 0;
};

const requirePhonePeConfig = () => {
    const missing = [];
    if (!PHONEPE_CLIENT_ID) missing.push('PHONEPE_CLIENT_ID');
    if (!PHONEPE_CLIENT_SECRET) missing.push('PHONEPE_CLIENT_SECRET');
    if (!PHONEPE_CLIENT_VERSION) missing.push('PHONEPE_CLIENT_VERSION');

    if (missing.length) {
        const error = new Error(`Missing PhonePe configuration: ${missing.join(', ')}`);
        error.statusCode = 500;
        throw error;
    }
};

const extractAccessToken = (payload) => {
    return (
        payload?.access_token ||
        payload?.accessToken ||
        payload?.data?.access_token ||
        payload?.data?.accessToken ||
        ''
    );
};

const extractTokenExpirySeconds = (payload) => {
    const raw = Number(
        payload?.expires_in ||
        payload?.expiresIn ||
        payload?.data?.expires_in ||
        payload?.data?.expiresIn
    );
    return Number.isFinite(raw) && raw > 0 ? raw : 1800;
};

const getPhonePeAccessToken = async () => {
    requirePhonePeConfig();

    if (cachedAccessToken && Date.now() < tokenExpiresAt - 60 * 1000) {
        return cachedAccessToken;
    }

    const body = new URLSearchParams();
    body.append('client_id', PHONEPE_CLIENT_ID);
    body.append('client_secret', PHONEPE_CLIENT_SECRET);
    body.append('client_version', PHONEPE_CLIENT_VERSION);
    body.append('grant_type', 'client_credentials');

    const response = await axios.post(PHONEPE_AUTH_URL, body.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        timeout: 15000
    });

    const token = extractAccessToken(response.data);
    if (!token) {
        throw new Error('PhonePe auth token not found in response');
    }

    const ttlSeconds = extractTokenExpirySeconds(response.data);
    cachedAccessToken = token;
    tokenExpiresAt = Date.now() + ttlSeconds * 1000;
    return token;
};

const getRedirectUrlFromPayResponse = (payload) => {
    return (
        payload?.redirectUrl ||
        payload?.paymentUrl ||
        payload?.data?.redirectUrl ||
        payload?.data?.paymentUrl ||
        payload?.data?.instrumentResponse?.redirectInfo?.url ||
        payload?.instrumentResponse?.redirectInfo?.url ||
        ''
    );
};

const resolvePaymentState = (payload) => {
    const possibleState = (
        payload?.state ||
        payload?.data?.state ||
        payload?.paymentDetails?.[0]?.state ||
        payload?.data?.paymentDetails?.[0]?.state ||
        ''
    );

    if (!possibleState) return '';
    return String(possibleState).toUpperCase();
};

const extractAmount = (payload) => {
    const amount =
        payload?.amount ??
        payload?.data?.amount ??
        payload?.paymentDetails?.[0]?.amount ??
        payload?.data?.paymentDetails?.[0]?.amount;

    const numeric = Number(amount);
    return Number.isFinite(numeric) ? numeric : 0;
};

const isWebhookAuthorized = (req) => {
    if (!PHONEPE_WEBHOOK_USERNAME || !PHONEPE_WEBHOOK_PASSWORD) {
        return true;
    }

    const header = req.headers.authorization || '';
    if (!header.startsWith('Basic ')) {
        return false;
    }

    try {
        const encoded = header.split(' ')[1] || '';
        const decoded = Buffer.from(encoded, 'base64').toString('utf8');
        const separatorIndex = decoded.indexOf(':');
        if (separatorIndex === -1) return false;

        const username = decoded.slice(0, separatorIndex);
        const password = decoded.slice(separatorIndex + 1);
        return username === PHONEPE_WEBHOOK_USERNAME && password === PHONEPE_WEBHOOK_PASSWORD;
    } catch {
        return false;
    }
};

router.post('/initiate', async (req, res) => {
    try {
        const { amount, transactionId, customerName, mobileNumber, redirectUrl, paymentType, upiId } = req.body || {};

        const numericAmount = Number(amount);
        const amountInRupees = Number.isFinite(numericAmount) && numericAmount > 0 ? numericAmount : 10;
        const amountInPaise = Math.round(amountInRupees * 100);

        const merchantOrderId = transactionId || `T${Date.now()}`;
        const normalizedMobile = normalizeMobileNumber(mobileNumber || process.env.DEFAULT_PAYMENT_MOBILE);
        const finalRedirectUrl = redirectUrl || `https://yuvancreations.in/pay?txId=${merchantOrderId}`;

        const token = await getPhonePeAccessToken();

        const flowType = paymentType === 'UPI_COLLECT' ? 'UPI_COLLECT' : 'PG_CHECKOUT';

        const payload = {
            merchantOrderId,
            amount: amountInPaise,
            expireAfter: PHONEPE_ORDER_EXPIRE_AFTER,
            metaInfo: {
                udf1: customerName || 'Customer',
                ...(normalizedMobile ? { udf2: normalizedMobile } : {})
            },
            paymentFlow: {
                type: flowType,
                message: PHONEPE_PAYMENT_MESSAGE,
                merchantUrls: {
                    redirectUrl: finalRedirectUrl
                },
                ...(flowType === 'UPI_COLLECT' ? { vpa: upiId } : {})
            },
            callbackUrl: process.env.PHONEPE_CALLBACK_URL || `${process.env.BACKEND_URL || process.env.BACKEND_PUBLIC_URL || 'https://asia-south1-yuvan-creations-website.cloudfunctions.net/backend'}/api/payment/callback`
        };

        const headers = {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `O-Bearer ${token}`
        };

        if (PHONEPE_MERCHANT_ID) {
            headers['X-MERCHANT-ID'] = PHONEPE_MERCHANT_ID;
        }

        const response = await axios.post(`${PHONEPE_PG_BASE_URL}/checkout/v2/pay`, payload, {
            headers,
            timeout: 15000
        });

        const providerResponse = response.data || {};
        const paymentUrl = getRedirectUrlFromPayResponse(providerResponse);

        res.status(200).json({
            success: Boolean(paymentUrl),
            code: 'PAYMENT_INITIATED',
            merchantOrderId,
            redirectUrl: paymentUrl,
            data: {
                instrumentResponse: {
                    redirectInfo: {
                        url: paymentUrl
                    }
                }
            },
            providerResponse
        });
    } catch (error) {
        const status = error.response?.status || error.statusCode || 500;
        if (status === 401 || status === 403) {
            clearTokenCache();
        }

        console.error('PhonePe Initiation Error:', error.response?.data || error.message);
        res.status(status >= 400 && status < 600 ? status : 500).json({
            error: 'Failed to initiate payment',
            details: error.response?.data?.message || error.message
        });
    }
});

router.post('/callback', (req, res) => {
    if (!isWebhookAuthorized(req)) {
        return res.status(401).json({ error: 'Unauthorized callback request' });
    }

    const callbackData = req.body || {};
    const txRef = callbackData?.merchantOrderId || callbackData?.transactionId || 'unknown';
    const state = resolvePaymentState(callbackData) || 'UNKNOWN';
    console.log(`PhonePe callback received for transaction: ${txRef}, state: ${state}`);

    return res.status(200).json({ success: true });
});

router.get('/status/:txId', async (req, res) => {
    try {
        const { txId } = req.params;
        const token = await getPhonePeAccessToken();

        const headers = {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `O-Bearer ${token}`
        };

        if (PHONEPE_MERCHANT_ID) {
            headers['X-MERCHANT-ID'] = PHONEPE_MERCHANT_ID;
        }

        const response = await axios.get(
            `${PHONEPE_PG_BASE_URL}/checkout/v2/order/${encodeURIComponent(txId)}/status`,
            { headers, timeout: 15000 }
        );

        const providerResponse = response.data || {};
        const state = resolvePaymentState(providerResponse);
        const isSuccess = state === 'COMPLETED';

        res.status(200).json({
            success: isSuccess,
            code: isSuccess ? 'PAYMENT_SUCCESS' : `PAYMENT_${state || 'PENDING'}`,
            state: state || 'PENDING',
            data: {
                amount: extractAmount(providerResponse),
                transactionId: txId
            },
            providerResponse
        });
    } catch (error) {
        const status = error.response?.status || 500;
        if (status === 401 || status === 403) {
            clearTokenCache();
        }

        console.error('PhonePe Status Error:', error.response?.data || error.message);
        res.status(status >= 400 && status < 600 ? status : 500).json({
            error: 'Failed to fetch payment status',
            details: error.response?.data?.message || error.message
        });
    }
});

module.exports = router;

