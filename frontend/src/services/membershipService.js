import { db } from '../firebase';
import { doc, getDoc, runTransaction, serverTimestamp } from 'firebase/firestore';

const toValidCredits = (value) => {
    const numeric = Number(value);
    return Number.isFinite(numeric) && numeric > 0 ? Math.floor(numeric) : 0;
};

export const getUserPrintCredits = async (uid) => {
    if (!uid) return 0;
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) return 0;
    return toValidCredits(userSnap.data()?.printCredits);
};

export const applyMembershipCredits = async ({ uid, plan, txId, amountPaid }) => {
    if (!uid || !plan?.id || !txId) {
        throw new Error('Missing membership credit parameters');
    }

    const userRef = doc(db, 'users', uid);
    const paymentRef = doc(db, 'membershipPayments', txId);

    const result = await runTransaction(db, async (transaction) => {
        const paymentSnap = await transaction.get(paymentRef);
        if (paymentSnap.exists()) {
            const existingCredits = toValidCredits(paymentSnap.data()?.creditsGranted || plan.credits);
            return { alreadyApplied: true, creditsGranted: existingCredits };
        }

        const userSnap = await transaction.get(userRef);
        const currentCredits = toValidCredits(userSnap.exists() ? userSnap.data()?.printCredits : 0);
        const nextCredits = currentCredits + toValidCredits(plan.credits);

        transaction.set(userRef, {
            printCredits: nextCredits,
            activeMembershipPlan: plan.id,
            membershipUpdatedAt: serverTimestamp()
        }, { merge: true });

        transaction.set(paymentRef, {
            uid,
            txId,
            planId: plan.id,
            planName: plan.name,
            creditsGranted: toValidCredits(plan.credits),
            amountPaid: Number(amountPaid || plan.price || 0),
            createdAt: serverTimestamp()
        }, { merge: true });

        return { alreadyApplied: false, creditsGranted: toValidCredits(plan.credits), nextCredits };
    });

    return result;
};

export const consumeOnePrintCredit = async (uid, meta = {}) => {
    if (!uid) {
        throw new Error('Login required to consume print credits');
    }

    const userRef = doc(db, 'users', uid);
    const result = await runTransaction(db, async (transaction) => {
        const userSnap = await transaction.get(userRef);
        const currentCredits = toValidCredits(userSnap.exists() ? userSnap.data()?.printCredits : 0);

        if (currentCredits <= 0) {
            const noCreditError = new Error('NO_PRINT_CREDITS');
            noCreditError.code = 'NO_PRINT_CREDITS';
            throw noCreditError;
        }

        const nextCredits = currentCredits - 1;
        transaction.set(userRef, {
            printCredits: nextCredits,
            lastCreditConsumedAt: serverTimestamp()
        }, { merge: true });

        if (meta?.documentNumber) {
            const usageId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
            const usageRef = doc(db, 'printUsage', usageId);
            transaction.set(usageRef, {
                uid,
                documentType: meta.documentType || 'invoice',
                documentNumber: meta.documentNumber,
                creditsUsed: 1,
                createdAt: serverTimestamp()
            });
        }

        return { nextCredits };
    });

    return result;
};
