import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, ShieldCheck, IndianRupee, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { initiatePayment, verifyPayment } from '../../services/paymentService';
import PaymentModal from '../../components/PaymentModal';
import { useAuth } from '../../context/AuthContext';

const PaymentPage = () => {
    const [amount, setAmount] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [status, setStatus] = useState(null); // 'success', 'failed'
    const [verificationTxId, setVerificationTxId] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const txId = urlParams.get('txId');
        if (txId) {
            handleVerification(txId);
        }
    }, []);

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleVerification = async (txId) => {
        setVerificationTxId(txId);
        setIsProcessing(true);
        setStatus('pending');

        // PhonePe can return PENDING briefly after redirect, so poll a few times.
        const maxAttempts = 12;
        for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
            const result = await verifyPayment(txId);

            if (result.success) {
                const pendingRaw = sessionStorage.getItem('pending_billmaker');
                if (pendingRaw) {
                    try {
                        const parsed = JSON.parse(pendingRaw);
                        if (parsed?.type === 'invoice' || parsed?.type === 'quotation') {
                            navigate(`/software/bill-maker?type=${parsed.type}&txId=${encodeURIComponent(txId)}`, { replace: true });
                            return;
                        }
                    } catch {
                        // Ignore malformed local storage.
                    }
                }

                setStatus('success');
                setIsProcessing(false);
                window.history.replaceState({}, document.title, window.location.pathname);
                return;
            }

            if (!result.pending) {
                setStatus('failed');
                setIsProcessing(false);
                window.history.replaceState({}, document.title, window.location.pathname);
                return;
            }

            if (attempt < maxAttempts) {
                await wait(3000);
            }
        }

        setStatus('pending');
        setIsProcessing(false);
    };

    const handlePay = async (paymentData) => {
        setIsProcessing(true);
        const result = await initiatePayment({
            ...paymentData,
            mobileNumber: user?.phone || user?.mobile || ''
        });

        if (result.success) {
            window.location.href = result.url;
        } else {
            alert(result.message);
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <div className="pt-32 pb-20 px-4">
                <div className="max-w-xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100"
                    >
                        {/* Header */}
                        <div className="bg-slate-900 p-10 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 animate-pulse" />
                            </div>
                            <div className="relative z-10 flex flex-col items-center gap-4">
                                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-xl ring-1 ring-white/20">
                                    <IndianRupee className="text-white" size={32} />
                                </div>
                                <h1 className="text-3xl font-black text-white tracking-tight">Quick Payment</h1>
                                <p className="text-slate-400 font-medium">Safe & Secure Payment through PhonePe</p>
                            </div>
                        </div>

                        <div className="p-10">
                            {status === 'success' ? (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center space-y-6 py-10"
                                >
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto ring-8 ring-green-50">
                                        <CheckCircle2 className="text-green-600" size={40} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900">Payment Successful!</h2>
                                        <p className="text-slate-500 mt-2 font-medium">Thank you for your payment. A confirmation has been sent.</p>
                                    </div>
                                    <button
                                        onClick={() => setStatus(null)}
                                        className="px-8 py-3 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                                    >
                                        MAKE ANOTHER PAYMENT
                                    </button>
                                </motion.div>
                            ) : status === 'pending' ? (
                                <motion.div
                                    initial={{ scale: 0.96, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center space-y-6 py-10"
                                >
                                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto ring-8 ring-blue-50">
                                        <Loader2 className="text-blue-600 animate-spin" size={40} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900">{isProcessing ? 'Verifying Payment...' : 'Payment Is Still Pending'}</h2>
                                        <p className="text-slate-500 mt-2 font-medium">
                                            {isProcessing ? 'Please wait, confirmation is in progress.' : 'If payment is done, click below to check status again.'}
                                        </p>
                                    </div>
                                    {!isProcessing && verificationTxId && (
                                        <button
                                            onClick={() => handleVerification(verificationTxId)}
                                            className="px-8 py-3 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                                        >
                                            CHECK STATUS AGAIN
                                        </button>
                                    )}
                                </motion.div>
                            ) : status === 'failed' ? (
                                <motion.div
                                    initial={{ scale: 0.96, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center space-y-6 py-10"
                                >
                                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto ring-8 ring-red-50">
                                        <CreditCard className="text-red-600" size={36} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900">Payment Not Completed</h2>
                                        <p className="text-slate-500 mt-2 font-medium">If amount got deducted, wait 1 minute then try again.</p>
                                    </div>
                                    <button
                                        onClick={() => setStatus(null)}
                                        className="px-8 py-3 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                                    >
                                        TRY AGAIN
                                    </button>
                                </motion.div>
                            ) : (
                                <div className="space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Payment Amount (INR)</label>
                                        <div className="relative group">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                                <IndianRupee size={24} />
                                            </div>
                                            <input
                                                type="number"
                                                placeholder="Enter Amount"
                                                className="w-full bg-slate-50 border-2 border-slate-50 rounded-3xl py-6 pl-16 pr-8 text-2xl font-black outline-none focus:border-indigo-600 focus:bg-white transition-all"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4 p-4 bg-indigo-50/50 rounded-2xl ring-1 ring-indigo-50">
                                            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
                                                <ShieldCheck size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black text-indigo-900">Encrypted Transaction</h4>
                                                <p className="text-xs text-indigo-600/70 font-medium">Your data is protected by industry-standard 256-bit encryption.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            if (!amount || isNaN(amount) || amount < 1) {
                                                alert('Please enter a valid amount');
                                                return;
                                            }
                                            setIsModalOpen(true);
                                        }}
                                        disabled={isProcessing}
                                        className="w-full relative group overflow-hidden bg-indigo-600 text-white rounded-3xl py-6 font-black text-lg shadow-xl shadow-indigo-200 hover:shadow-indigo-300 transition-all active:scale-[0.98]"
                                    >
                                        <div className="relative z-10 flex items-center justify-center gap-3">
                                            {isProcessing ? (
                                                <>
                                                    <Loader2 className="animate-spin" size={24} />
                                                    <span>SECURELY PROCESSING...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>PAY NOW</span>
                                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>

                                    <div className="flex items-center justify-center gap-8 pt-4 filter grayscale opacity-40">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo.png/640px-UPI-Logo.png" alt="UPI" className="h-6" />
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Visa.svg/1200px-Visa.svg.png" alt="Visa" className="h-4" />
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />

            <PaymentModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onPay={handlePay}
                amount={amount}
                customerName={user?.name || 'Customer'}
            />
        </div>
    );
};

export default PaymentPage;
