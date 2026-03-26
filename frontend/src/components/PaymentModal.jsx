import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, IndianRupee, ShieldCheck, ArrowRight, Loader2, Smartphone, Monitor } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, onPay, amount, customerName }) => {
    const [upiId, setUpiId] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async (type = 'PG_CHECKOUT') => {
        setIsProcessing(true);
        try {
            await onPay({
                amount,
                customerName,
                paymentType: type,
                upiId: type === 'UPI_COLLECT' ? upiId : null
            });
        } catch (error) {
            console.error('Payment Error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 relative"
                >
                    {/* Close Button */}
                    <button 
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors z-20"
                    >
                        <X size={20} />
                    </button>

                    {/* Header */}
                    <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 animate-pulse" />
                        </div>
                        <div className="relative z-10 flex flex-col items-center gap-3">
                            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xl ring-1 ring-white/20">
                                <IndianRupee className="text-white" size={24} />
                            </div>
                            <h2 className="text-2xl font-black text-white tracking-tight">Secure Payment</h2>
                            <div className="text-slate-400 text-sm font-bold flex items-center gap-2">
                                <span>Amount:</span>
                                <span className="text-white bg-white/10 px-3 py-1 rounded-lg">₹{amount}</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 space-y-6">
                        {/* Option 1: Standard Checkout */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Fast Checkout</label>
                            <button
                                onClick={() => handlePayment('PG_CHECKOUT')}
                                disabled={isProcessing}
                                className="w-full group flex items-center justify-between p-5 bg-slate-50 hover:bg-indigo-50 border-2 border-slate-50 hover:border-indigo-200 rounded-2xl transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        <Smartphone size={20} />
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-black text-slate-900 text-sm">PhonePe / UPI Apps</h4>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Automatic Redirect & QR</p>
                                    </div>
                                </div>
                                <ArrowRight size={18} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                            </button>
                        </div>

                        {/* Option 2: Manual UPI ID */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Manual UPI ID Entry</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="example@okaxis"
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-5 text-sm font-bold outline-none focus:border-indigo-600 focus:bg-white transition-all"
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                />
                                <button
                                    onClick={() => handlePayment('UPI_COLLECT')}
                                    disabled={!upiId || isProcessing}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-slate-900 text-white text-[10px] font-black rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-all uppercase"
                                >
                                    {isProcessing ? <Loader2 size={12} className="animate-spin" /> : 'Request'}
                                </button>
                            </div>
                            <p className="text-[10px] text-slate-400 font-medium text-center italic">
                                We will send a payment request to your UPI App.
                            </p>
                        </div>

                        {/* Trust Footer */}
                        <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
                            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
                                <ShieldCheck size={18} />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-wider">Encrypted Gateway</h4>
                                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Secured via PhonePe Business Gateway. 256-bit SSL encrypted.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PaymentModal;
