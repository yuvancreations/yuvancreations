const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
require('dotenv').config();

// Google Sheets Auth
const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

/**
 * Log a document summary to Google Sheets
 * Expected body: { type, number, customerName, amount, date }
 */
router.post('/log-sheet', async (req, res) => {
    const { type, number, customerName, amount, date } = req.body;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
        return res.status(500).json({ success: false, message: 'Google Sheet ID not configured' });
    }

    try {
        const range = type === 'invoice' ? 'Invoices!A:E' : 'Quotations!A:E';
        const values = [[
            date,
            number,
            customerName,
            amount,
            new Date().toISOString()
        ]];

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            requestBody: { values },
        });

        res.json({ success: true, message: 'Logged to Google Sheets' });
    } catch (error) {
        console.error('Google Sheets Log Error:', error);
        res.status(500).json({ success: false, message: 'Failed to log to Google Sheets' });
    }
});

module.exports = router;
