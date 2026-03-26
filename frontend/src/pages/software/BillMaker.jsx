import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Plus,
    Trash2,
    Printer,
    Building,
    Phone,
    Mail,
    ShieldCheck,
    Upload,
    X,
    Lock,
    Coins,
    Crown
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import { initiatePayment, verifyPayment, saveDocumentToCloud } from '../../services/paymentService';
import { consumeOnePrintCredit, getUserPrintCredits } from '../../services/membershipService';
import PaymentModal from '../../components/PaymentModal';

const BILL_TYPES = {
    invoice: {
        heading: 'GST TAX INVOICE',
        prefix: 'INV',
        storagePrefix: 'inv',
        customerLabel: 'Bill To',
        secondaryDateLabel: 'Due Date',
        defaultTerms: [
            'Payment due within 15 days from invoice date.',
            'Please mention invoice number in payment reference.'
        ],
        defaultNotes: 'Thank you for your business.',
        cloudMapper: (doc) => ({
            ...doc,
            invoiceNumber: doc.number,
            billToName: doc.partyName,
            billToAddress: doc.partyAddress,
            billToPhone: doc.partyPhone,
            billToEmail: doc.partyEmail,
            billToGSTIN: doc.partyGSTIN
        })
    },
    quotation: {
        heading: 'BUSINESS QUOTATION',
        prefix: 'QTN',
        storagePrefix: 'qtn',
        customerLabel: 'Quotation For',
        secondaryDateLabel: 'Valid Until',
        defaultTerms: [
            'Quotation validity: 15 days.',
            'Final amount may vary after site scope confirmation.'
        ],
        defaultNotes: 'Thank you for considering us.',
        cloudMapper: (doc) => ({
            ...doc,
            quotationNumber: doc.number,
            quoteToName: doc.partyName,
            quoteToAddress: doc.partyAddress,
            quoteToPhone: doc.partyPhone,
            quoteToEmail: doc.partyEmail,
            quoteToGSTIN: doc.partyGSTIN
        })
    }
};

const getTypeFromSearch = (search, initialType) => {
    const queryType = new URLSearchParams(search).get('type');
    if (queryType === 'invoice' || queryType === 'quotation') return queryType;
    if (initialType === 'invoice' || initialType === 'quotation') return initialType;
    return 'invoice';
};

const createInitialDocument = (type) => ({
    number: `${BILL_TYPES[type].prefix}-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    secondaryDate: '',
    companyName: '',
    companyAddress: '',
    companyPhone: '',
    companyEmail: '',
    companyGSTIN: '',
    partyName: '',
    partyAddress: '',
    partyPhone: '',
    partyEmail: '',
    partyGSTIN: '',
    items: [{ id: Date.now(), description: '', hsn: '', quantity: 1, price: 0, discount: 0, gst: 18 }],
    bankDetails: {
        bankName: '',
        accountNumber: '',
        ifsc: '',
        branch: ''
    },
    terms: [...BILL_TYPES[type].defaultTerms],
    notes: BILL_TYPES[type].defaultNotes,
    currency: 'Rs. ',
    logo: null
});

const PRINT_TOKEN_KEY = '__billmaker_single_print_token__';

const getPrintToken = () => window[PRINT_TOKEN_KEY] || null;
const setPrintToken = (token) => {
    window[PRINT_TOKEN_KEY] = token;
};
const clearPrintToken = () => {
    delete window[PRINT_TOKEN_KEY];
};

const BillMaker = ({ initialType = 'invoice' }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [activeType, setActiveType] = useState(() => getTypeFromSearch(location.search, initialType));
    const [documents, setDocuments] = useState(() => ({
        invoice: createInitialDocument('invoice'),
        quotation: createInitialDocument('quotation')
    }));
    const [paidStatus, setPaidStatus] = useState({ invoice: false, quotation: false });
    const [isProcessing, setIsProcessing] = useState(false);
    const [printCredits, setPrintCredits] = useState(0);
    const [isLoadingCredits, setIsLoadingCredits] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setActiveType(getTypeFromSearch(location.search, initialType));
    }, [location.search, initialType]);

    useEffect(() => {
        let isMounted = true;

        const loadCredits = async () => {
            if (!user?.uid || user.role === 'admin') {
                if (isMounted) setPrintCredits(0);
                return;
            }

            setIsLoadingCredits(true);
            try {
                const credits = await getUserPrintCredits(user.uid);
                if (isMounted) setPrintCredits(credits);
            } catch {
                if (isMounted) setPrintCredits(0);
            } finally {
                if (isMounted) setIsLoadingCredits(false);
            }
        };

        loadCredits();
        return () => {
            isMounted = false;
        };
    }, [user?.uid, user?.role]);

    const currentDoc = documents[activeType];
    const currentConfig = BILL_TYPES[activeType];
    const isPaid = paidStatus[activeType];
    const isAdminUser = Boolean(user && user.role === 'admin');
    const hasMembershipCredits = !isAdminUser && Boolean(user?.uid) && printCredits > 0;
    const canPrintNow = isAdminUser || hasMembershipCredits || isPaid;

    const updateCurrentDoc = (updater) => {
        setDocuments((prev) => ({
            ...prev,
            [activeType]: typeof updater === 'function' ? updater(prev[activeType]) : updater
        }));
    };

    const totals = useMemo(() => {
        let subtotal = 0;
        let totalDiscount = 0;
        let totalGst = 0;

        currentDoc.items.forEach((item) => {
            const lineTotal = item.quantity * item.price;
            const lineDiscount = (lineTotal * item.discount) / 100;
            const taxable = lineTotal - lineDiscount;
            const lineGst = (taxable * item.gst) / 100;

            subtotal += lineTotal;
            totalDiscount += lineDiscount;
            totalGst += lineGst;
        });

        const taxableAmount = subtotal - totalDiscount;
        return {
            subtotal,
            totalDiscount,
            taxableAmount,
            totalGst,
            grandTotal: taxableAmount + totalGst
        };
    }, [currentDoc.items]);

    const switchDocumentType = (type) => {
        setActiveType(type);
        navigate(`/software/bill-maker?type=${type}`);
    };

    useEffect(() => {
        let isMounted = true;

        const run = async () => {
            if (!isMounted) return;
            if (user && user.role === 'admin') {
                setPaidStatus((prev) => ({ ...prev, [activeType]: true }));
                return;
            }

            const token = getPrintToken();
            const isUnlocked = Boolean(
                token &&
                token.type === activeType &&
                token.number === currentDoc.number
            );
            setPaidStatus((prev) => ({ ...prev, [activeType]: isUnlocked }));
        };

        run();
        return () => {
            isMounted = false;
        };
    }, [activeType, currentDoc.number, user]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const txId = params.get('txId');
        if (!txId) return;

        const pendingRaw = sessionStorage.getItem('pending_billmaker');
        let pendingType = activeType;
        let pendingNumber = currentDoc.number;

        if (pendingRaw) {
            try {
                const parsed = JSON.parse(pendingRaw);
                if (parsed?.type === 'invoice' || parsed?.type === 'quotation') {
                    pendingType = parsed.type;
                    pendingNumber = parsed.number || documents[parsed.type].number;
                }
            } catch (error) {
                // Ignore malformed local storage.
            }
        }

        verifyPayment(txId, {
            type: pendingType,
            number: pendingNumber,
            customerName: documents[pendingType].partyName || 'Customer',
            fullData: BILL_TYPES[pendingType].cloudMapper(documents[pendingType])
        }).then((result) => {
            if (!result.success) return;
            sessionStorage.removeItem('pending_billmaker');
            setPrintToken({ type: pendingType, number: pendingNumber });
            setPaidStatus((prev) => ({ ...prev, [pendingType]: true }));
            navigate(`/software/bill-maker?type=${pendingType}`, { replace: true });
        });
    }, [activeType, currentDoc.number, documents, location.search, navigate]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        updateCurrentDoc((doc) => {
            if (name.includes('.')) {
                const [parent, child] = name.split('.');
                return {
                    ...doc,
                    [parent]: { ...doc[parent], [child]: value }
                };
            }
            return { ...doc, [name]: value };
        });
    };

    const handleItemChange = (id, field, value) => {
        updateCurrentDoc((doc) => ({
            ...doc,
            items: doc.items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        }));
    };

    const addItem = () => {
        updateCurrentDoc((doc) => ({
            ...doc,
            items: [...doc.items, { id: Date.now(), description: '', hsn: '', quantity: 1, price: 0, discount: 0, gst: 18 }]
        }));
    };

    const removeItem = (id) => {
        if (currentDoc.items.length <= 1) return;
        updateCurrentDoc((doc) => ({
            ...doc,
            items: doc.items.filter((item) => item.id !== id)
        }));
    };

    const handleTermChange = (index, value) => {
        updateCurrentDoc((doc) => {
            const nextTerms = [...doc.terms];
            nextTerms[index] = value;
            return { ...doc, terms: nextTerms };
        });
    };

    const addTerm = () => {
        updateCurrentDoc((doc) => ({ ...doc, terms: [...doc.terms, ''] }));
    };

    const removeTerm = (index) => {
        updateCurrentDoc((doc) => ({ ...doc, terms: doc.terms.filter((_, idx) => idx !== index) }));
    };

    const handleLogoUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            updateCurrentDoc((doc) => ({ ...doc, logo: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const handleInitiatePayment = async (paymentData) => {
        setIsProcessing(true);
        const result = await initiatePayment({
            ...paymentData,
            redirectPath: `/software/bill-maker?type=${activeType}`
        });

        if (result.success) {
            sessionStorage.setItem('pending_billmaker', JSON.stringify({ type: activeType, number: currentDoc.number }));
            window.location.href = result.url;
        } else {
            alert(result.message);
        }
        setIsProcessing(false);
    };

    const handlePrint = async () => {
        if (!(isAdminUser || hasMembershipCredits || isPaid)) {
            return;
        }

        if (isPaid || hasMembershipCredits || isAdminUser) {
            await saveDocumentToCloud(activeType, currentConfig.cloudMapper(currentDoc));
        }

        if (hasMembershipCredits && user?.uid) {
            try {
                const creditResult = await consumeOnePrintCredit(user.uid, {
                    documentType: activeType,
                    documentNumber: currentDoc.number
                });
                if (Number.isFinite(creditResult?.nextCredits)) {
                    setPrintCredits(creditResult.nextCredits);
                } else {
                    setPrintCredits((prev) => Math.max(0, prev - 1));
                }
            } catch (error) {
                const noCredits = error?.code === 'NO_PRINT_CREDITS' || error?.message === 'NO_PRINT_CREDITS';
                if (noCredits) {
                    setPrintCredits(0);
                    alert('No print credits left. Please buy a membership plan.');
                } else {
                    alert('Unable to deduct membership credit right now. Please try again.');
                }
                return;
            }
        }

        const originalTitle = document.title;
        document.title = `${activeType === 'invoice' ? 'Invoice' : 'Quotation'}_${currentDoc.number}_Bill`;
        window.print();
        document.title = originalTitle;

        // One successful payment unlocks exactly one print for non-admin users.
        if (!isAdminUser && isPaid) {
            clearPrintToken();
            setPaidStatus((prev) => ({ ...prev, [activeType]: false }));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-12 print:pt-0 print:pb-0">
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                    @media print {
                        @page { size: A4; margin: 8mm; }
                        body {
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                            background: #fff !important;
                        }
                        .no-print { display: none !important; }
                        .print-sheet {
                            max-width: 100% !important;
                            width: 100% !important;
                            margin: 0 !important;
                            border-radius: 0 !important;
                            box-shadow: none !important;
                            border: none !important;
                        }
                        .print-pad { padding: 12px !important; }
                        .print-tight th, .print-tight td {
                            padding: 6px 4px !important;
                            font-size: 10px !important;
                        }
                        .print-avoid-break {
                            break-inside: avoid;
                            page-break-inside: avoid;
                        }
                        input, textarea, select {
                            border: none !important;
                            background: transparent !important;
                            padding: 0 !important;
                            line-height: 1.2 !important;
                        }
                    }`
                }}
            />

            <div className="no-print">
                <Navbar />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="no-print flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">BILL MAKER</h1>
                        <p className="text-slate-500 mt-1 font-medium">Invoice and quotation in one place with compact premium print format.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="inline-flex p-1 rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <button
                                onClick={() => switchDocumentType('invoice')}
                                className={`px-4 py-2 rounded-xl text-sm font-black transition-colors ${activeType === 'invoice' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                            >
                                Invoice Generate
                            </button>
                            <button
                                onClick={() => switchDocumentType('quotation')}
                                className={`px-4 py-2 rounded-xl text-sm font-black transition-colors ${activeType === 'quotation' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
                            >
                                Quotation Generate
                            </button>
                        </div>

                        {user && !isAdminUser && (
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-black tracking-wide">
                                <Coins size={14} className="text-emerald-600" />
                                {isLoadingCredits ? 'LOADING CREDITS...' : `CREDITS: ${printCredits}`}
                            </div>
                        )}

                        {canPrintNow ? (
                            <button
                                onClick={handlePrint}
                                className="flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition-colors"
                            >
                                <Printer size={16} />
                                {hasMembershipCredits ? 'PRINT (USE 1 CREDIT)' : 'PRINT / SAVE PDF'}
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => setIsPaymentModalOpen(true)}
                                    disabled={isProcessing}
                                    className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-colors"
                                >
                                    <Lock size={16} className={isProcessing ? 'animate-pulse' : ''} />
                                    {isProcessing ? 'PROCESSING...' : 'PAY RS. 10 TO PRINT'}
                                </button>
                                {user && (
                                    <Link
                                        to="/membership"
                                        className="flex items-center gap-2 px-5 py-3 bg-white text-indigo-700 border border-indigo-200 font-black rounded-xl hover:bg-indigo-50 transition-colors"
                                    >
                                        <Crown size={16} />
                                        BUY MEMBERSHIP PLAN
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <motion.div
                    key={activeType}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="print-sheet bg-white rounded-3xl shadow-[0_18px_45px_-20px_rgba(15,23,42,0.35)] border border-slate-200 overflow-hidden"
                >
                    <div className="print-pad bg-emerald-700 text-white px-6 py-3 flex items-center justify-between">
                        <span className="text-xs tracking-[0.2em] font-black uppercase">{currentConfig.heading}</span>
                        <span className="text-xs font-semibold">A4 | GST Ready</span>
                    </div>

                    <div className="print-pad p-6 md:p-8 border-b border-slate-200">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <div className="relative group/logo w-fit mb-3 no-print">
                                    {currentDoc.logo ? (
                                        <div className="relative">
                                            <img src={currentDoc.logo} alt="Business Logo" className="h-16 w-auto rounded-md border border-slate-200" />
                                            <button
                                                onClick={() => updateCurrentDoc((doc) => ({ ...doc, logo: null }))}
                                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-slate-300 rounded-lg cursor-pointer text-xs font-bold text-slate-500 hover:bg-slate-50">
                                            <Upload size={14} />
                                            Upload Logo
                                            <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                                        </label>
                                    )}
                                </div>

                                <input
                                    type="text"
                                    name="companyName"
                                    placeholder="Your Company Name"
                                    className="w-full text-2xl font-black outline-none text-slate-900"
                                    value={currentDoc.companyName}
                                    onChange={handleInputChange}
                                />
                                <textarea
                                    name="companyAddress"
                                    rows="2"
                                    placeholder="Company address"
                                    className="w-full mt-2 text-sm text-slate-600 outline-none resize-none"
                                    value={currentDoc.companyAddress}
                                    onChange={handleInputChange}
                                />
                                <div className="grid sm:grid-cols-2 gap-2 mt-3">
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <Phone size={14} />
                                        <input name="companyPhone" placeholder="Phone" className="w-full outline-none text-sm" value={currentDoc.companyPhone} onChange={handleInputChange} />
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <Mail size={14} />
                                        <input name="companyEmail" placeholder="Email" className="w-full outline-none text-sm" value={currentDoc.companyEmail} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center gap-2 text-xs">
                                    <span className="font-black text-slate-400 uppercase">GSTIN</span>
                                    <input name="companyGSTIN" placeholder="Company GSTIN" className="outline-none text-indigo-700 font-black" value={currentDoc.companyGSTIN} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="md:text-right space-y-2">
                                <h2 className="text-4xl font-black tracking-tight text-slate-200 uppercase">{activeType === 'invoice' ? 'Invoice' : 'Quotation'}</h2>
                                <div className="flex md:justify-end items-center gap-3 text-sm">
                                    <span className="font-bold text-slate-500">Number</span>
                                    <input name="number" className="bg-slate-100 px-2 py-1 rounded-md font-black text-slate-900 md:text-right" value={currentDoc.number} onChange={handleInputChange} />
                                </div>
                                <div className="flex md:justify-end items-center gap-3 text-sm">
                                    <span className="font-bold text-slate-500">Date</span>
                                    <input type="date" name="date" className="bg-slate-100 px-2 py-1 rounded-md font-bold text-slate-900 md:text-right" value={currentDoc.date} onChange={handleInputChange} />
                                </div>
                                <div className="flex md:justify-end items-center gap-3 text-sm">
                                    <span className="font-bold text-slate-500">{currentConfig.secondaryDateLabel}</span>
                                    <input type="date" name="secondaryDate" className="bg-slate-100 px-2 py-1 rounded-md font-bold text-slate-900 md:text-right" value={currentDoc.secondaryDate} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="print-pad p-6 md:p-8 border-b border-slate-200 bg-slate-50/60 print-avoid-break">
                        <h3 className="text-xs uppercase tracking-[0.18em] text-emerald-700 font-black mb-3">{currentConfig.customerLabel}</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    name="partyName"
                                    placeholder="Customer / Organization Name"
                                    className="w-full text-lg font-black outline-none bg-white border border-slate-200 rounded-lg px-3 py-2"
                                    value={currentDoc.partyName}
                                    onChange={handleInputChange}
                                />
                                <textarea
                                    name="partyAddress"
                                    rows="2"
                                    placeholder="Address"
                                    className="w-full text-sm outline-none bg-white border border-slate-200 rounded-lg px-3 py-2 resize-none"
                                    value={currentDoc.partyAddress}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="partyGSTIN"
                                    placeholder="GSTIN (optional)"
                                    className="w-full text-sm outline-none bg-white border border-slate-200 rounded-lg px-3 py-2"
                                    value={currentDoc.partyGSTIN}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <input name="partyPhone" placeholder="Phone" className="w-full text-sm outline-none bg-white border border-slate-200 rounded-lg px-3 py-2" value={currentDoc.partyPhone} onChange={handleInputChange} />
                                <input name="partyEmail" placeholder="Email" className="w-full text-sm outline-none bg-white border border-slate-200 rounded-lg px-3 py-2" value={currentDoc.partyEmail} onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>

                    <div className="print-pad p-6 md:p-8">
                        <div className="overflow-x-auto">
                            <table className="print-tight w-full border-collapse text-sm">
                                <thead>
                                    <tr className="bg-slate-900 text-white">
                                        <th className="text-left py-3 px-3 rounded-l-lg w-12">#</th>
                                        <th className="text-left py-3 px-3">Description</th>
                                        <th className="text-left py-3 px-3 w-24">HSN</th>
                                        <th className="text-right py-3 px-3 w-20">Qty</th>
                                        <th className="text-right py-3 px-3 w-28">Rate</th>
                                        <th className="text-right py-3 px-3 w-20">Disc%</th>
                                        <th className="text-right py-3 px-3 w-20">GST%</th>
                                        <th className="text-right py-3 px-3 w-32 rounded-r-lg">Amount</th>
                                        <th className="w-8 no-print"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 border-b border-slate-200">
                                    <AnimatePresence>
                                        {currentDoc.items.map((item, idx) => (
                                            <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                                <td className="py-3 px-3 text-slate-400 font-bold">{idx + 1}</td>
                                                <td className="py-3 px-3">
                                                    <textarea
                                                        rows="1"
                                                        className="w-full outline-none resize-none min-w-[190px] font-medium"
                                                        placeholder="Description"
                                                        value={item.description}
                                                        onChange={(event) => handleItemChange(item.id, 'description', event.target.value)}
                                                    />
                                                </td>
                                                <td className="py-3 px-3">
                                                    <input className="w-full outline-none" value={item.hsn} onChange={(event) => handleItemChange(item.id, 'hsn', event.target.value)} />
                                                </td>
                                                <td className="py-3 px-3">
                                                    <input type="number" className="w-full outline-none text-right" value={item.quantity} onChange={(event) => handleItemChange(item.id, 'quantity', parseFloat(event.target.value) || 0)} />
                                                </td>
                                                <td className="py-3 px-3">
                                                    <input type="number" className="w-full outline-none text-right" value={item.price} onChange={(event) => handleItemChange(item.id, 'price', parseFloat(event.target.value) || 0)} />
                                                </td>
                                                <td className="py-3 px-3">
                                                    <input type="number" className="w-full outline-none text-right text-indigo-600" value={item.discount} onChange={(event) => handleItemChange(item.id, 'discount', parseFloat(event.target.value) || 0)} />
                                                </td>
                                                <td className="py-3 px-3">
                                                    <select className="w-full outline-none text-right" value={item.gst} onChange={(event) => handleItemChange(item.id, 'gst', parseInt(event.target.value, 10))}>
                                                        <option value="0">0</option>
                                                        <option value="5">5</option>
                                                        <option value="12">12</option>
                                                        <option value="18">18</option>
                                                        <option value="28">28</option>
                                                    </select>
                                                </td>
                                                <td className="py-3 px-3 text-right font-black text-slate-800">
                                                    {currentDoc.currency}
                                                    {((item.quantity * item.price) * (1 - item.discount / 100) * (1 + item.gst / 100)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </td>
                                                <td className="no-print text-right">
                                                    <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>

                        <button onClick={addItem} className="no-print mt-4 inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-black tracking-wider text-slate-700">
                            <Plus size={14} />
                            ADD ITEM
                        </button>
                    </div>

                    <div className="print-pad p-6 md:p-8 bg-slate-50/70 border-t border-slate-200 grid lg:grid-cols-2 gap-6">
                        <div className="space-y-5 print-avoid-break">
                            <div>
                                <h3 className="text-xs uppercase tracking-[0.18em] text-emerald-700 font-black mb-2 flex items-center gap-2">
                                    <Building size={13} />
                                    Bank Details
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-2">
                                    <input name="bankDetails.bankName" placeholder="Bank Name" className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={currentDoc.bankDetails.bankName} onChange={handleInputChange} />
                                    <input name="bankDetails.branch" placeholder="Branch" className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={currentDoc.bankDetails.branch} onChange={handleInputChange} />
                                    <input name="bankDetails.accountNumber" placeholder="Account Number" className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={currentDoc.bankDetails.accountNumber} onChange={handleInputChange} />
                                    <input name="bankDetails.ifsc" placeholder="IFSC Code" className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" value={currentDoc.bankDetails.ifsc} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs uppercase tracking-[0.18em] text-emerald-700 font-black mb-2 flex items-center gap-2">
                                    <ShieldCheck size={13} />
                                    Terms
                                </h3>
                                <div className="space-y-2">
                                    {currentDoc.terms.map((term, index) => (
                                        <div key={`${activeType}-term-${index}`} className="flex items-start gap-2">
                                            <span className="text-emerald-700 mt-1">-</span>
                                            <input value={term} onChange={(event) => handleTermChange(index, event.target.value)} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none" />
                                            <button onClick={() => removeTerm(index)} className="no-print text-red-400 hover:text-red-600 mt-2">
                                                <X size={13} />
                                            </button>
                                        </div>
                                    ))}
                                    <button onClick={addTerm} className="no-print text-xs font-black text-indigo-600">
                                        + ADD TERM
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 print-avoid-break">
                            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 text-sm">
                                <div className="flex justify-between text-slate-600">
                                    <span>Total Amount</span>
                                    <span className="font-bold">{currentDoc.currency}{totals.subtotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-indigo-600 font-bold">
                                    <span>Discount</span>
                                    <span>- {currentDoc.currency}{totals.totalDiscount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Taxable Amount</span>
                                    <span className="font-bold">{currentDoc.currency}{totals.taxableAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Total GST</span>
                                    <span className="font-bold">+ {currentDoc.currency}{totals.totalGst.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                                    <span className="text-base font-black">Grand Total</span>
                                    <span className="text-2xl font-black text-emerald-700">
                                        {currentDoc.currency}
                                        {totals.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>

                            <textarea name="notes" rows="2" placeholder="Notes" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none resize-none" value={currentDoc.notes} onChange={handleInputChange} />

                            <div className="pt-8 text-right">
                                <div className="h-10" />
                                <div className="inline-block border-t-2 border-slate-900 pt-1 text-xs font-black uppercase tracking-[0.14em]">
                                    Authorized Signature
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="no-print mt-16">
                <Footer />
            </div>

            <PaymentModal 
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                onPay={handleInitiatePayment}
                amount={10}
                customerName={currentDoc.partyName || 'Customer'}
            />
        </div>
    );
};

export default BillMaker;
