import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Trash2, Download, Printer, Save,
    FileSpreadsheet, User, Building, MapPin, Phone,
    Mail, Globe, Calendar, CreditCard, CheckCircle,
    ChevronDown, Edit3, Clock, ShieldCheck, X, Upload, Check, Lock
} from 'lucide-react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import { initiatePayment, verifyPayment, checkCloudPaymentStatus, saveDocumentToCloud } from '../../services/paymentService';

const MakeQuotation = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    // --- State ---
    const [quotationData, setQuotationData] = useState({
        quotationNumber: 'QTN-' + Math.floor(1000 + Math.random() * 9000),
        date: new Date().toISOString().split('T')[0],
        validUntil: '',
        companyName: '',
        companyAddress: '',
        companyPhone: '',
        companyEmail: '',
        companyGSTIN: '',
        quoteToName: '',
        quoteToAddress: '',
        quoteToPhone: '',
        quoteToEmail: '',
        quoteToGSTIN: '',
        items: [{ id: Date.now(), description: '', hsn: '', quantity: 1, price: 0, discount: 0, gst: 18 }],
        bankDetails: {
            bankName: '',
            accountNumber: '',
            ifsc: '',
            branch: ''
        },
        terms: [
            'Validity: 15 Days',
            'Full Payment on Delivery'
        ],
        notes: 'Thank you for your business!',
        currency: '₹',
        logo: null
    });

    const [isPaid, setIsPaid] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const { user } = useAuth();

    // Admin Bypass & Persistence Check
    useEffect(() => {
        const verifyPaymentStatus = async () => {
            if (user && user.role === 'admin') {
                setIsPaid(true);
                return;
            }

            // 1. Check Cloud (Firebase)
            const isCloudPaid = await checkCloudPaymentStatus('quotation', quotationData.quotationNumber);
            if (isCloudPaid) {
                setIsPaid(true);
                return;
            }

            // 2. Check LocalStorage (Fallback)
            const persistentPaid = localStorage.getItem(`paid_qtn_${quotationData.quotationNumber}`);
            if (persistentPaid === 'true') {
                setIsPaid(true);
            } else {
                setIsPaid(false);
            }
        };

        verifyPaymentStatus();
    }, [user, quotationData.quotationNumber]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const txId = urlParams.get('txId');
        const qtnFromUrl = urlParams.get('qtn'); // Pass qtn in redirect
        if (txId) {
            checkPaymentStatus(txId, qtnFromUrl);
        }
    }, []);

    const checkPaymentStatus = async (txId, qtn) => {
        const result = await verifyPayment(txId, {
            type: 'quotation',
            number: qtn || quotationData.quotationNumber,
            customerName: quotationData.quoteToName,
            fullData: quotationData
        });
        if (result.success) {
            setIsPaid(true);

            // Determine which quotation was paid
            const finalQtn = qtn || localStorage.getItem('pending_qtn') || quotationData.quotationNumber;
            localStorage.setItem(`paid_qtn_${finalQtn}`, 'true');
            localStorage.removeItem('pending_qtn');

            // Clear URL params
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    };

    const handlePrint = async () => {
        if (isPaid) {
            // Auto-sync current version to cloud before printing
            await saveDocumentToCloud('quotation', quotationData);
        }
        const originalTitle = document.title;
        document.title = `Quotation_${quotationData.quotationNumber}_Bill`;
        window.print();
        document.title = originalTitle;
    };

    const handleInitiatePayment = async () => {
        setIsProcessing(true);
        const result = await initiatePayment({
            amount: 10,
            customerName: quotationData.quoteToName || 'Customer'
        });

        if (result.success) {
            // Append quotationNumber to return URL to persist accurately
            const redirectUrl = new URL(result.url);
            // Note: PhonePe doesn't allow adding params to THEIR URL, but we need to track which QTN we paid for
            // So we'll rely on the current state OR pass it to our callback if possible.
            // For simplicity, we assume the user pays for the current 'quotationNumber'.
            window.location.href = result.url + `&callback_qtn=${quotationData.quotationNumber}`;
            // ^ Note: This might not work if PhonePe strips params. 
            // Better: Store in localStorage BEFORE redirecting.
            localStorage.setItem('pending_qtn', quotationData.quotationNumber);
            window.location.href = result.url;
        } else {
            alert(result.message);
        }
        setIsProcessing(false);
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setQuotationData(prev => ({ ...prev, logo: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const [totals, setTotals] = useState({
        subtotal: 0,
        totalDiscount: 0,
        taxableAmount: 0,
        totalGst: 0,
        grandTotal: 0
    });

    // --- Calculations ---
    useEffect(() => {
        let sub = 0;
        let disc = 0;
        let gst = 0;

        quotationData.items.forEach(item => {
            const lineTotal = item.quantity * item.price;
            const lineDisc = (lineTotal * item.discount) / 100;
            const taxable = lineTotal - lineDisc;
            const lineGst = (taxable * item.gst) / 100;

            sub += lineTotal;
            disc += lineDisc;
            gst += lineGst;
        });

        setTotals({
            subtotal: sub,
            totalDiscount: disc,
            taxableAmount: sub - disc,
            totalGst: gst,
            grandTotal: (sub - disc) + gst
        });
    }, [quotationData.items]);

    // --- Handlers ---
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setQuotationData(prev => ({
                ...prev,
                [parent]: { ...prev[parent], [child]: value }
            }));
        } else {
            setQuotationData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleItemChange = (id, field, value) => {
        setQuotationData(prev => ({
            ...prev,
            items: prev.items.map(item => item.id === id ? { ...item, [field]: value } : item)
        }));
    };

    const addItem = () => {
        setQuotationData(prev => ({
            ...prev,
            items: [...prev.items, { id: Date.now(), description: '', hsn: '', quantity: 1, price: 0, discount: 0, gst: 18 }]
        }));
    };

    const removeItem = (id) => {
        if (quotationData.items.length > 1) {
            setQuotationData(prev => ({
                ...prev,
                items: prev.items.filter(item => item.id !== id)
            }));
        }
    };

    const handleTermChange = (index, value) => {
        const newTerms = [...quotationData.terms];
        newTerms[index] = value;
        setQuotationData(prev => ({ ...prev, terms: newTerms }));
    };

    const addTerm = () => {
        setQuotationData(prev => ({ ...prev, terms: [...prev.terms, ''] }));
    };

    const removeTerm = (index) => {
        setQuotationData(prev => ({ ...prev, terms: prev.terms.filter((_, i) => i !== index) }));
    };


    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-12 print:pt-0 print:bg-white text-[12px]">
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    @page {
                        margin: 5mm;
                        size: A4;
                    }
                    body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                        background: white !important;
                    }
                    .print-compact {
                        width: 100% !important;
                        max-width: 210mm !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        border: none !important;
                        box-shadow: none !important;
                    }
                    .no-print {
                        display: none !important;
                    }
                    input, textarea, select {
                        border: none !important;
                        padding: 0 !important;
                        background: transparent !important;
                    }
                }
                .document-shadow {
                    box-shadow: 0 10px 50px -10px rgba(0,0,0,0.1);
                }
            ` }} />

            <div className="no-print">
                <Navbar />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Simplified Header Actions */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 no-print">
                    <div className="max-w-md">
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
                            <div className="p-2 bg-indigo-600 rounded-xl">
                                <FileSpreadsheet className="text-white" size={24} />
                            </div>
                            QUOTATION MAKER
                        </h1>
                        <p className="text-slate-500 mt-2 font-medium">Create and share GST compliant professional quotations for your business.</p>
                    </div>
                    <div className="flex gap-4">
                        {!isPaid ? (
                            <button
                                onClick={handleInitiatePayment}
                                disabled={isProcessing}
                                className="group flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200"
                            >
                                <Lock size={20} className={isProcessing ? "animate-pulse" : "group-hover:scale-110 transition-transform"} />
                                {isProcessing ? 'PROCESSING...' : 'PAY ₹10 TO DOWNLOAD'}
                            </button>
                        ) : (
                            <button
                                onClick={handlePrint}
                                className="group flex items-center gap-3 px-8 py-4 bg-green-600 text-white font-black rounded-2xl hover:bg-green-700 transition-all shadow-xl shadow-green-200"
                            >
                                <Printer size={20} className="group-hover:scale-110 transition-transform" />
                                PRINT / SAVE PDF
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white document-shadow rounded-[2rem] overflow-hidden print-compact print:rounded-none"
                    >
                        {/* Status Bar */}
                        <div className="bg-indigo-600 py-3 px-12 no-print flex justify-between items-center">
                            <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">Professional Business Document</span>
                            <div className="flex gap-4">
                                <span className="text-indigo-200 text-[10px] font-bold">Paper Size: A4</span>
                                <span className="text-indigo-200 text-[10px] font-bold">GST: Compliant</span>
                            </div>
                        </div>

                        {/* Top Section: Branding & Info */}
                        <div className="p-12 md:p-16 border-b border-slate-100">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                                <div className="space-y-6 flex-1">
                                    <div className="relative group/logo w-fit">
                                        {quotationData.logo ? (
                                            <div className="relative">
                                                <img src={quotationData.logo} alt="Business Logo" className="h-20 w-auto rounded-lg mb-4" />
                                                <button
                                                    onClick={() => setQuotationData(prev => ({ ...prev, logo: null }))}
                                                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity no-print"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ) : (
                                            <label className="flex flex-col items-center justify-center w-40 h-24 border-2 border-dashed border-slate-200 rounded-2xl hover:border-indigo-400 hover:bg-indigo-50/30 cursor-pointer transition-all no-print">
                                                <Upload size={24} className="text-slate-400 mb-2" />
                                                <span className="text-[10px] font-black text-slate-500 uppercase">ADD BUSINESS LOGO</span>
                                                <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                                            </label>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <input
                                            type="text"
                                            name="companyName"
                                            placeholder="Your Business Name"
                                            className="text-3xl font-black text-slate-900 w-full outline-none focus:text-indigo-600"
                                            value={quotationData.companyName}
                                            onChange={handleInputChange}
                                        />
                                        <textarea
                                            name="companyAddress"
                                            className="w-full text-slate-500 font-medium outline-none resize-none leading-relaxed"
                                            rows="2"
                                            value={quotationData.companyAddress}
                                            onChange={handleInputChange}
                                        />
                                        <div className="grid grid-cols-2 gap-4 pt-4">
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Phone size={12} />
                                                <input name="companyPhone" className="bg-transparent outline-none text-slate-600 font-bold" value={quotationData.companyPhone} onChange={handleInputChange} />
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Mail size={12} />
                                                <input name="companyEmail" className="bg-transparent outline-none text-slate-600 font-bold" value={quotationData.companyEmail} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 pt-2">
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">GSTIN:</span>
                                            <input name="companyGSTIN" placeholder="Enter Company GSTIN" className="bg-transparent outline-none text-indigo-600 font-black" value={quotationData.companyGSTIN} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right flex flex-col items-end gap-6">
                                    <h2 className="text-7xl font-black text-slate-900/10 uppercase tracking-tighter leading-none italic">Quotation</h2>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-end gap-3 text-slate-400">
                                            <span className="text-[10px] font-black uppercase tracking-widest">Quote No</span>
                                            <input name="quotationNumber" className="text-right font-black text-slate-900 bg-slate-50 px-3 py-1 rounded" value={quotationData.quotationNumber} onChange={handleInputChange} />
                                        </div>
                                        <div className="flex items-center justify-end gap-3 text-slate-400">
                                            <span className="text-[10px] font-black uppercase tracking-widest">Date</span>
                                            <input type="date" name="date" className="text-right font-black text-slate-900 bg-slate-50 px-3 py-1 rounded" value={quotationData.date} onChange={handleInputChange} />
                                        </div>
                                        <div className="flex items-center justify-end gap-3 text-slate-400">
                                            <span className="text-[10px] font-black uppercase tracking-widest">Valid Till</span>
                                            <input type="date" name="validUntil" className="text-right font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded" value={quotationData.validUntil} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Customer Info Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 p-12 md:p-16 gap-16 bg-slate-50/30">
                            <div className="space-y-4">
                                <h3 className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <User size={14} /> Quotation For
                                </h3>
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        name="quoteToName"
                                        placeholder="Customer or Organization Name"
                                        className="text-xl font-black w-full bg-transparent border-b border-slate-200 focus:border-indigo-600 outline-none pb-1"
                                        value={quotationData.quoteToName}
                                        onChange={handleInputChange}
                                    />
                                    <textarea
                                        name="quoteToAddress"
                                        placeholder="Full address of the recipient"
                                        className="w-full bg-transparent text-slate-500 font-medium outline-none resize-none"
                                        rows="2"
                                        value={quotationData.quoteToAddress}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="quoteToGSTIN"
                                        placeholder="Recipient GSTIN (Optional)"
                                        className="text-[10px] font-black w-full bg-indigo-50/50 text-indigo-700 px-3 py-1 rounded outline-none"
                                        value={quotationData.quoteToGSTIN}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col justify-end space-y-4">
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl">
                                        <Phone size={14} className="text-slate-300" />
                                        <input name="quoteToPhone" placeholder="Mobile Number" className="w-full bg-transparent outline-none font-bold text-slate-700" value={quotationData.quoteToPhone} onChange={handleInputChange} />
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl">
                                        <Mail size={14} className="text-slate-300" />
                                        <input name="quoteToEmail" placeholder="Email Address" className="w-full bg-transparent outline-none font-bold text-slate-700" value={quotationData.quoteToEmail} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Items Table - Gimbooks Layout */}
                        <div className="p-8 md:p-16">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-slate-900 text-white uppercase text-[10px] font-black tracking-widest ring-1 ring-slate-900">
                                            <th className="text-left py-5 px-6 rounded-l-2xl">#</th>
                                            <th className="text-left py-5 px-6">Description</th>
                                            <th className="text-left py-5 px-6 w-24">HSN/SAC</th>
                                            <th className="text-right py-5 px-6 w-20">Qty</th>
                                            <th className="text-right py-5 px-6 w-32">Price</th>
                                            <th className="text-right py-5 px-6 w-24">Disc %</th>
                                            <th className="text-right py-5 px-6 w-24">GST %</th>
                                            <th className="text-right py-5 px-6 w-32 rounded-r-2xl">Total</th>
                                            <th className="w-10 no-print"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 border-b border-slate-100">
                                        <AnimatePresence>
                                            {quotationData.items.map((item, idx) => (
                                                <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="group hover:bg-slate-50/50 transition-colors">
                                                    <td className="py-6 px-6 font-black text-slate-300">{idx + 1}</td>
                                                    <td className="py-6 px-6">
                                                        <textarea
                                                            className="w-full bg-transparent outline-none font-bold text-slate-800 resize-none min-w-[200px]"
                                                            rows="1"
                                                            placeholder="Product name/service description"
                                                            value={item.description}
                                                            onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                                        />
                                                    </td>
                                                    <td className="py-6 px-6">
                                                        <input className="w-full bg-transparent outline-none font-bold text-slate-500" placeholder="9983" value={item.hsn} onChange={(e) => handleItemChange(item.id, 'hsn', e.target.value)} />
                                                    </td>
                                                    <td className="py-6 px-6">
                                                        <input type="number" className="w-full bg-transparent outline-none font-black text-right text-slate-700" value={item.quantity} onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)} />
                                                    </td>
                                                    <td className="py-6 px-6">
                                                        <input type="number" className="w-full bg-transparent outline-none font-black text-right text-slate-700" value={item.price} onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)} />
                                                    </td>
                                                    <td className="py-6 px-6">
                                                        <input type="number" className="w-full bg-transparent outline-none font-black text-right text-indigo-400" value={item.discount} onChange={(e) => handleItemChange(item.id, 'discount', parseFloat(e.target.value) || 0)} />
                                                    </td>
                                                    <td className="py-6 px-6">
                                                        <select className="bg-transparent font-black text-right text-slate-700 outline-none" value={item.gst} onChange={(e) => handleItemChange(item.id, 'gst', parseInt(e.target.value))}>
                                                            <option value="0">0%</option>
                                                            <option value="5">5%</option>
                                                            <option value="12">12%</option>
                                                            <option value="18">18%</option>
                                                            <option value="28">28%</option>
                                                        </select>
                                                    </td>
                                                    <td className="py-6 px-6 text-right font-black text-indigo-600">
                                                        {quotationData.currency}{((item.quantity * item.price) * (1 - item.discount / 100) * (1 + item.gst / 100)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </td>
                                                    <td className="no-print px-4">
                                                        <button onClick={() => removeItem(item.id)} className="text-red-300 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>

                            <button
                                onClick={addItem}
                                className="mt-8 flex items-center gap-2 px-8 py-3 bg-slate-100 text-slate-700 rounded-2xl text-[10px] font-black tracking-widest hover:bg-slate-200 transition-all no-print"
                            >
                                <Plus size={16} /> ADD LINE ITEM
                            </button>
                        </div>

                        {/* Totals & Bank Details Section */}
                        <div className="p-12 md:p-16 bg-slate-50/50 grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                                        <Building size={14} /> Bank Account Details
                                    </h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        <input name="bankDetails.bankName" placeholder="Bank Name" className="bg-white border border-slate-200 px-4 py-3 rounded-xl outline-none focus:border-indigo-600 font-bold" value={quotationData.bankDetails.bankName} onChange={handleInputChange} />
                                        <div className="grid grid-cols-2 gap-3">
                                            <input name="bankDetails.accountNumber" placeholder="Account Number" className="bg-white border border-slate-200 px-4 py-3 rounded-xl outline-none focus:border-indigo-600 font-bold" value={quotationData.bankDetails.accountNumber} onChange={handleInputChange} />
                                            <input name="bankDetails.ifsc" placeholder="IFSC Code" className="bg-white border border-slate-200 px-4 py-3 rounded-xl outline-none focus:border-indigo-600 font-bold" value={quotationData.bankDetails.ifsc} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                                        <ShieldCheck size={14} /> Terms & Notes
                                    </h3>
                                    <div className="space-y-2">
                                        {quotationData.terms.map((term, idx) => (
                                            <div key={idx} className="flex gap-2 group">
                                                <span className="text-indigo-600 mt-1">•</span>
                                                <input className="w-full bg-transparent outline-none font-medium text-slate-600" value={term} onChange={(e) => handleTermChange(idx, e.target.value)} />
                                                <button onClick={() => removeTerm(idx)} className="no-print opacity-0 group-hover:opacity-100 text-red-300"><X size={12} /></button>
                                            </div>
                                        ))}
                                        <button onClick={addTerm} className="no-print text-[10px] font-black text-indigo-400 mt-2">+ ADD TERM</button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-4">
                                    <div className="flex justify-between items-center text-slate-500 font-bold">
                                        <span>Total Amount</span>
                                        <span>{quotationData.currency}{totals.subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-indigo-500 font-black">
                                        <span>Discount</span>
                                        <span>-{quotationData.currency}{totals.totalDiscount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-slate-400 font-bold text-[10px] uppercase tracking-widest pt-4 border-t border-slate-100">
                                        <span>Taxable Value</span>
                                        <span>{quotationData.currency}{totals.taxableAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                                        <span>Total GST</span>
                                        <span>+{quotationData.currency}{totals.totalGst.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-6">
                                        <span className="text-xl font-black text-slate-900 tracking-tighter uppercase">Grand Total</span>
                                        <span className="text-4xl font-black text-indigo-600 tracking-tighter">{quotationData.currency}{totals.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                </div>
                                <div className="text-center pt-12">
                                    <div className="h-20 w-full mb-4" />
                                    <div className="border-t-2 border-slate-900 pt-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Authorized Signature</div>
                                </div>
                            </div>
                        </div>

                        {/* Pro Footer */}
                        <div className="bg-slate-900 py-6 px-16 text-center text-white/40 text-[90%] font-medium italic">
                            Computer generated quotation. No physical signature required.
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="no-print mt-20">
                <Footer />
            </div>
        </div>
    );
};

export default MakeQuotation;
