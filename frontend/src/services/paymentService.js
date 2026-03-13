import axios from 'axios';
import { db } from '../firebase';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';

const BACKEND_BASE_URL = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000').replace(/\/$/, '');
const PAYMENT_API_BASE_URL = `${BACKEND_BASE_URL}/api/payment`;
const DOCUMENTS_API_BASE_URL = `${BACKEND_BASE_URL}/api/documents`;
const IS_LOCAL_BACKEND = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(BACKEND_BASE_URL);
const APP_BASE_URL = import.meta.env.BASE_URL || '/';

const buildPaymentReturnUrl = (transactionId, redirectPath = '/pay') => {
    const normalizedBasePath = APP_BASE_URL === '/' ? '' : `/${APP_BASE_URL.replace(/^\/|\/$/g, '')}`;
    const normalizedPath = `/${String(redirectPath || '/pay').replace(/^\/+/, '')}`;
    const url = new URL(`${window.location.origin}${normalizedBasePath}${normalizedPath}`);
    url.searchParams.set('txId', transactionId);
    return url.toString();
};

const getPaymentBackendErrorMessage = (statusCode) => {
    if (IS_LOCAL_BACKEND) {
        return 'Backend server not running. Start backend in terminal: cd f:\\YC\\Website\\backend; node server.js';
    }

    if (statusCode === 404) {
        return 'Payment backend is not deployed on live yet. Please contact support.';
    }

    return 'Payment service is temporarily unavailable. Please try again later.';
};

const extractRedirectUrl = (payload) => {
    return (
        payload?.redirectUrl ||
        payload?.data?.instrumentResponse?.redirectInfo?.url ||
        payload?.providerResponse?.redirectUrl ||
        payload?.providerResponse?.paymentUrl ||
        payload?.providerResponse?.data?.redirectUrl ||
        payload?.providerResponse?.data?.instrumentResponse?.redirectInfo?.url ||
        ''
    );
};

const extractPaymentState = (payload) => {
    return String(
        payload?.state ||
        payload?.providerResponse?.state ||
        payload?.providerResponse?.data?.state ||
        ''
    ).toUpperCase();
};

const extractPaidAmountInPaise = (payload) => {
    const amount =
        payload?.data?.amount ??
        payload?.amount ??
        payload?.providerResponse?.amount ??
        payload?.providerResponse?.data?.amount;
    const numeric = Number(amount);
    return Number.isFinite(numeric) ? numeric : 0;
};

export const initiatePayment = async ({ amount, customerName, mobileNumber, redirectPath = '/pay' }) => {
    const transactionId = 'T' + Date.now();
    try {
        const response = await axios.post(`${PAYMENT_API_BASE_URL}/initiate`, {
            amount,
            transactionId,
            customerName: customerName || 'Customer',
            mobileNumber,
            redirectUrl: buildPaymentReturnUrl(transactionId, redirectPath)
        });

        const redirectUrl = extractRedirectUrl(response.data);
        if (response.data?.success !== false && redirectUrl) {
            return {
                success: true,
                url: redirectUrl,
                transactionId
            };
        }
        return { success: false, message: 'Invalid response from payment gateway' };
    } catch (error) {
        console.error('Payment initiation error', error);
        if (!error.response) {
            return {
                success: false,
                message: getPaymentBackendErrorMessage()
            };
        }
        return {
            success: false,
            message: error.response?.data?.error || getPaymentBackendErrorMessage(error.response?.status)
        };
    }
};

export const verifyPayment = async (txId, docDetails = null) => {
    try {
        const response = await axios.get(`${PAYMENT_API_BASE_URL}/status/${txId}`);
        const state = extractPaymentState(response.data);
        const isSuccess = response.data?.code === 'PAYMENT_SUCCESS' || state === 'COMPLETED';
        const isPending = state === 'PENDING' || response.data?.code === 'PAYMENT_PENDING';

        if (isSuccess && docDetails) {
            // 1. Log Transaction to Firestore
            try {
                const txDoc = doc(db, "transactions", txId);
                const amountInPaise = extractPaidAmountInPaise(response.data);
                await setDoc(txDoc, {
                    transactionId: txId,
                    amount: amountInPaise / 100,
                    status: 'SUCCESS',
                    documentType: docDetails.type,
                    documentNumber: docDetails.number,
                    timestamp: new Date().toISOString(),
                    customerName: docDetails.customerName || 'Customer'
                });
            } catch (fbError) {
                console.warn('Firestore transaction log failed', fbError);
            }

            // 2. Save Full Document to Firestore & Google Sheets
            if (docDetails.fullData) {
                await saveDocumentToCloud(docDetails.type, docDetails.fullData);
            }
        }

        return {
            success: isSuccess,
            pending: isPending,
            state,
            data: response.data
        };
    } catch (error) {
        console.error('Payment verification failed', error);
        return { success: false, message: 'Failed to verify payment' };
    }
};

/**
 * Saves full document JSON and logs to Google Sheets
 */
export const saveDocumentToCloud = async (type, data) => {
    const collectionName = type === 'invoice' ? 'invoices' : 'quotations';
    const docId = data.invoiceNumber || data.quotationNumber;

    try {
        // A. Save to Firestore
        await setDoc(doc(db, collectionName, docId), {
            ...data,
            updatedAt: new Date().toISOString()
        });

        // B. Log to Google Sheets via Backend
        await axios.post(`${DOCUMENTS_API_BASE_URL}/log-sheet`, {
            type,
            number: docId,
            customerName: data.billToName || data.quoteToName,
            amount: data.grandTotal || 0,
            date: data.date
        });

        console.log(`Document ${docId} synced to cloud.`);
    } catch (error) {
        console.error('Cloud Sync Error:', error);
    }
};

/**
 * Checks if a specific document has been paid for in the cloud (Firestore)
 */
export const checkCloudPaymentStatus = async (type, number) => {
    try {
        const q = query(
            collection(db, "transactions"),
            where("documentType", "==", type),
            where("documentNumber", "==", number),
            where("status", "==", "SUCCESS")
        );
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    } catch (error) {
        // Fallback or log error if Firebase is not configured
        console.warn('Cloud check failed. Ensure Firebase config is valid.', error);
        return false;
    }
};
