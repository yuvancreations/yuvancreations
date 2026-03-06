import axios from 'axios';
import { db } from '../firebase';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';

const API_BASE_URL = 'http://localhost:5000/api/payment';

export const initiatePayment = async ({ amount, customerName }) => {
    const transactionId = 'T' + Date.now();
    try {
        const response = await axios.post(`${API_BASE_URL}/initiate`, {
            amount,
            transactionId,
            customerName: customerName || 'Customer'
        });

        if (response.data.success && response.data.data.instrumentResponse?.redirectInfo?.url) {
            return {
                success: true,
                url: response.data.data.instrumentResponse.redirectInfo.url,
                transactionId
            };
        }
        return { success: false, message: 'Invalid response from payment gateway' };
    } catch (error) {
        console.error('Payment initiation error', error);
        return {
            success: false,
            message: error.response?.data?.error || 'Failed to initiate payment. Please try again.'
        };
    }
};

export const verifyPayment = async (txId, docDetails = null) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/status/${txId}`);
        const isSuccess = response.data.code === 'PAYMENT_SUCCESS';

        if (isSuccess && docDetails) {
            // 1. Log Transaction to Firestore
            try {
                const txDoc = doc(db, "transactions", txId);
                await setDoc(txDoc, {
                    transactionId: txId,
                    amount: response.data.data?.amount / 100 || 0,
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
        await axios.post('http://localhost:5000/api/documents/log-sheet', {
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
