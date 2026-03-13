const functions = require('firebase-functions');
const app = require('./app');

exports.backend = functions.region('asia-south1').https.onRequest(app);
