import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    BarChart3,
    ExternalLink,
    FileSpreadsheet,
    FileText,
    IndianRupee,
    LayoutDashboard,
    LogOut,
    MessageSquare,
    Plus,
    RefreshCw,
    Settings,
    ShieldCheck,
    Trash2,
    Users,
    TrendingUp,
    Briefcase,
    Calendar,
    Search,
    Filter,
    Building2,
    Globe
} from 'lucide-react';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    serverTimestamp,
    updateDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import BankCard from '../components/BankCard';

const toDate = (value) => {
    if (!value) return null;
    if (value instanceof Date) return value;
    if (typeof value.toDate === 'function') return value.toDate();
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatDate = (value) => {
    const date = toDate(value);
    if (!date) return '-';
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatCurrency = (value) => `₹${(Number(value) || 0).toLocaleString('en-IN')}`;

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [isSubmittingPurchase, setIsSubmittingPurchase] = useState(false);
    const [error, setError] = useState('');

    const [usersList, setUsersList] = useState([]);
    const [quickMessages, setQuickMessages] = useState([]);
    const [contactInquiries, setContactInquiries] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [quotations, setQuotations] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [clients, setClients] = useState([]);

    const [purchaseForm, setPurchaseForm] = useState({
        title: '',
        vendor: '',
        amount: '',
        date: new Date().toISOString().split('T')[0]
    });

    const [userSearchTerm, setUserSearchTerm] = useState('');
    const [expenseSearchTerm, setExpenseSearchTerm] = useState('');
    const [leadSearchTerm, setLeadSearchTerm] = useState('');
    const [clientSearchTerm, setClientSearchTerm] = useState('');

    const safeLoadCollection = useCallback(async (collectionName) => {
        try {
            const snap = await getDocs(collection(db, collectionName));
            return snap.docs.map((entry) => ({ id: entry.id, ...entry.data() }));
        } catch (collectionError) {
            console.warn(`Unable to load ${collectionName}`, collectionError);
            return [];
        }
    }, []);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const [
                usersData,
                quickMessagesData,
                inquiriesData,
                requirementsData,
                transactionsData,
                invoicesData,
                quotationsData,
                purchasesData,
                clientsData
            ] = await Promise.all([
                safeLoadCollection('users'),
                safeLoadCollection('contact_messages'),
                safeLoadCollection('contact_page_inquiries'),
                safeLoadCollection('project_requirements'),
                safeLoadCollection('transactions'),
                safeLoadCollection('invoices'),
                safeLoadCollection('quotations'),
                safeLoadCollection('purchase_entries'),
                safeLoadCollection('clients')
            ]);

            setUsersList(usersData);
            setQuickMessages(quickMessagesData);
            setContactInquiries(inquiriesData);
            setRequirements(requirementsData);
            setTransactions(transactionsData);
            setInvoices(invoicesData);
            setQuotations(quotationsData);
            setPurchases(purchasesData);
            setClients(clientsData);
        } catch (fetchError) {
            setError(fetchError.message || 'Failed to load admin data.');
        } finally {
            setLoading(false);
        }
    }, [safeLoadCollection]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const totalLeads = quickMessages.length + contactInquiries.length + requirements.length;
    const successfulTransactions = transactions.filter((item) => item.status === 'SUCCESS');
    const totalRevenue = successfulTransactions.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const totalPurchase = purchases.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const net = totalRevenue - totalPurchase;

    const monthlyRevenue = useMemo(() => {
        const months = [];
        const now = new Date();
        for (let i = 5; i >= 0; i -= 1) {
            const current = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}`;
            months.push({
                key,
                label: current.toLocaleDateString(undefined, { month: 'short' }),
                revenue: 0,
                purchase: 0
            });
        }

        successfulTransactions.forEach((transaction) => {
            const createdAt = toDate(transaction.timestamp || transaction.createdAt);
            if (!createdAt) return;
            const key = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}`;
            const bucket = months.find((month) => month.key === key);
            if (bucket) bucket.revenue += Number(transaction.amount) || 0;
        });

        purchases.forEach((purchase) => {
            const createdAt = toDate(purchase.date || purchase.createdAt);
            if (!createdAt) return;
            const key = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, '0')}`;
            const bucket = months.find((month) => month.key === key);
            if (bucket) bucket.purchase += Number(purchase.amount) || 0;
        });

        return months;
    }, [purchases, successfulTransactions]);

    const peakRevenue = Math.max(...monthlyRevenue.map((month) => month.revenue), 1);
    const peakPurchase = Math.max(...monthlyRevenue.map((month) => month.purchase), 1);

    const mergedLeads = useMemo(() => {
        const all = [
            ...quickMessages.map((item) => ({ ...item, source: 'Quick Message', created: item.createdAt })),
            ...contactInquiries.map((item) => ({ ...item, source: 'Contact Inquiry', created: item.createdAt })),
            ...requirements.map((item) => ({
                ...item,
                source: 'Requirement Form',
                name: item.contactName,
                email: item.contactEmail,
                phone: item.contactPhone,
                message: item.projectSummary || item.objectives || '-',
                created: item.createdAt
            }))
        ];

        return all.sort((a, b) => {
            const dateA = toDate(a.created);
            const dateB = toDate(b.created);
            if (!dateA && !dateB) return 0;
            if (!dateA) return 1;
            if (!dateB) return -1;
            return dateB - dateA;
        });
    }, [contactInquiries, quickMessages, requirements]);

    const deleteUserRecord = async (recordId) => {
        if (!window.confirm('Delete this user record?')) return;
        try {
            const ownId = user?.uid || user?.id;
            if (recordId === ownId) {
                alert('You cannot remove your own admin record.');
                return;
            }
            await deleteDoc(doc(db, 'users', recordId));
            await fetchData();
        } catch (deleteError) {
            alert(deleteError.message || 'Failed to delete user.');
        }
    };

    const changeUserRole = async (recordId, nextRole) => {
        try {
            await updateDoc(doc(db, 'users', recordId), { role: nextRole, updatedAt: serverTimestamp() });
            await fetchData();
        } catch (roleError) {
            alert(roleError.message || 'Role update failed.');
        }
    };

    const addPurchaseEntry = async (event) => {
        event.preventDefault();
        setError('');

        if (!purchaseForm.title.trim() || !purchaseForm.amount) {
            setError('Purchase title and amount required.');
            return;
        }

        setIsSubmittingPurchase(true);
        try {
            await addDoc(collection(db, 'purchase_entries'), {
                title: purchaseForm.title.trim(),
                vendor: purchaseForm.vendor.trim(),
                amount: Number(purchaseForm.amount),
                date: purchaseForm.date,
                createdAt: serverTimestamp(),
                createdBy: user?.email || user?.uid || 'admin'
            });
            setPurchaseForm({
                title: '',
                vendor: '',
                amount: '',
                date: new Date().toISOString().split('T')[0]
            });
            await fetchData();
        } catch (purchaseError) {
            setError(purchaseError.message || 'Failed to add purchase.');
        } finally {
            setIsSubmittingPurchase(false);
        }
    };

    const deletePurchaseEntry = async (recordId) => {
        if (!window.confirm('Delete this purchase entry?')) return;
        try {
            await deleteDoc(doc(db, 'purchase_entries', recordId));
            await fetchData();
        } catch (deleteError) {
            setError(deleteError.message || 'Failed to delete purchase.');
        }
    };

    const renderOverview = () => (
        <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <BankCard 
                    title="Net Balance (Rev - Pur)" 
                    value={formatCurrency(net)} 
                    icon={TrendingUp} 
                    color="blue"
                    subValue="Available Budget"
                />
                <BankCard 
                    title="Total Revenue" 
                    value={formatCurrency(totalRevenue)} 
                    icon={IndianRupee} 
                    color="white"
                    subValue={`${successfulTransactions.length} Paid Invoices`}
                />
                <BankCard 
                    title="Total Purchases" 
                    value={formatCurrency(totalPurchase)} 
                    icon={Briefcase} 
                    color="dark"
                    subValue={`${purchases.length} Expense Items`}
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 bg-white rounded-[25px] p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-black text-bank-dark">Revenue vs Purchase</h3>
                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-bank-grey">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-bank-blue rounded-full"></div>
                                <span>Revenue</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                                <span>Purchase</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        {monthlyRevenue.map((month) => (
                            <div key={month.key} className="relative group">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold text-bank-dark">{month.label}</span>
                                    <div className="flex gap-4 text-[10px] font-black tracking-tighter uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-bank-blue">R: {formatCurrency(month.revenue)}</span>
                                        <span className="text-rose-500">P: {formatCurrency(month.purchase)}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <div className="h-2 w-full bg-bank-bg rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-bank-blue rounded-full transition-all duration-1000"
                                            style={{ width: `${Math.max((month.revenue / peakRevenue) * 100, 2)}%` }}
                                        />
                                    </div>
                                    <div className="h-2 w-full bg-bank-bg rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-rose-500 rounded-full transition-all duration-1000 delay-100"
                                            style={{ width: `${Math.max((month.purchase / peakPurchase) * 100, 2)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-[25px] p-8 shadow-sm border border-gray-100 flex flex-col">
                    <h3 className="text-xl font-black text-bank-dark mb-6">Audience Summary</h3>
                    <div className="flex-1 flex flex-col justify-center gap-8">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-bank-bg rounded-2xl flex items-center justify-center text-bank-blue">
                                <Users size={32} />
                            </div>
                            <div>
                                <p className="text-bank-grey text-sm font-bold uppercase tracking-widest">Total Users</p>
                                <p className="text-4xl font-black text-bank-dark tracking-tighter">{usersList.length}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-bank-bg rounded-2xl flex items-center justify-center text-emerald-500">
                                <MessageSquare size={32} />
                            </div>
                            <div>
                                <p className="text-bank-grey text-sm font-bold uppercase tracking-widest">Total Leads</p>
                                <p className="text-4xl font-black text-bank-dark tracking-tighter">{totalLeads}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-bank-bg rounded-2xl flex items-center justify-center text-amber-500">
                                <ShieldCheck size={32} />
                            </div>
                            <div>
                                <p className="text-bank-grey text-sm font-bold uppercase tracking-widest">Growth Rate</p>
                                <p className="text-4xl font-black text-bank-dark tracking-tighter">12%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderUsers = () => {
        const filteredUsers = usersList.filter(u => 
            (u.name || '').toLowerCase().includes(userSearchTerm.toLowerCase()) || 
            (u.email || '').toLowerCase().includes(userSearchTerm.toLowerCase())
        );

        return (
        <div className="bg-white rounded-[25px] shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-8 border-b border-gray-50 flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-xl font-black text-bank-dark">Active System Users</h3>
                <div className="flex items-center gap-2 bg-bank-bg px-4 py-2 rounded-xl focus-within:ring-2 focus-within:ring-bank-blue/20">
                    <Search size={16} className="text-bank-grey" />
                    <input 
                        type="text" 
                        placeholder="Filter users..." 
                        value={userSearchTerm}
                        onChange={(e) => setUserSearchTerm(e.target.value)}
                        className="bg-transparent border-none text-sm focus:ring-0 placeholder:text-bank-grey outline-none" 
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-bank-bg/50">
                            <th className="p-6 text-xs font-black uppercase tracking-widest text-bank-grey">User Account</th>
                            <th className="p-6 text-xs font-black uppercase tracking-widest text-bank-grey">Access Level</th>
                            <th className="p-6 text-xs font-black uppercase tracking-widest text-bank-grey">Status</th>
                            <th className="p-6 text-xs font-black uppercase tracking-widest text-bank-grey text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-12 text-center text-bank-grey italic">
                                    {usersList.length === 0 ? 'No security records found.' : 'No users match your search.'}
                                </td>
                            </tr>
                        ) : filteredUsers.map((entry) => (
                            <tr key={entry.id} className="border-b border-gray-50 hover:bg-bank-bg transition-colors group">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-bank-blue/10 flex items-center justify-center text-bank-blue font-bold">
                                            {(entry.name || entry.email || '?')[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-bold text-bank-dark">{entry.name || 'Anonymous'}</p>
                                            <p className="text-xs text-bank-grey">{entry.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <select
                                        value={entry.role || 'user'}
                                        onChange={(event) => changeUserRole(entry.id, event.target.value)}
                                        className="bg-bank-bg border-none text-xs font-bold rounded-lg px-3 py-1.5 text-bank-dark focus:ring-2 focus:ring-bank-blue/20 outline-none"
                                    >
                                        <option value="user">User Access</option>
                                        <option value="admin">Administrator</option>
                                    </select>
                                </td>
                                <td className="p-6">
                                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                                        Verified
                                    </span>
                                </td>
                                <td className="p-6 text-right">
                                    <button
                                        onClick={() => deleteUserRecord(entry.id)}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-rose-500 hover:bg-rose-50 font-bold transition-colors"
                                    >
                                        <Trash2 size={16} />
                                        <span className="text-sm hidden sm:inline">Kick</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        );
    };

    const renderLeads = () => {
        const filteredLeads = mergedLeads.filter(l => 
            (l.name || '').toLowerCase().includes(leadSearchTerm.toLowerCase()) || 
            (l.email || '').toLowerCase().includes(leadSearchTerm.toLowerCase()) ||
            (l.message || '').toLowerCase().includes(leadSearchTerm.toLowerCase())
        );

        return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 bg-white border border-gray-100 px-4 py-3 rounded-2xl max-w-md shadow-sm focus-within:ring-2 focus-within:ring-bank-blue/20">
                <Search size={18} className="text-bank-grey" />
                <input 
                    type="text" 
                    placeholder="Search leads by name, email or message..." 
                    value={leadSearchTerm}
                    onChange={(e) => setLeadSearchTerm(e.target.value)}
                    className="bg-transparent border-none w-full text-sm focus:ring-0 placeholder:text-bank-grey outline-none" 
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredLeads.length === 0 ? (
                    <div className="col-span-full bg-white rounded-[25px] p-12 text-center text-bank-grey italic border border-gray-100 shadow-sm">
                        {mergedLeads.length === 0 ? 'No lead communications found.' : 'No leads match your search.'}
                    </div>
                ) : filteredLeads.map((lead, index) => (
                    <div key={`${lead.id}-${index}`} className="bg-white rounded-[25px] border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all group flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-bank-bg rounded-2xl flex items-center justify-center text-bank-blue font-black text-xl">
                                {(lead.name || 'U')[0]}
                            </div>
                            <div>
                                <h4 className="text-lg font-black text-bank-dark">{lead.name || 'Unknown User'}</h4>
                                <p className="text-sm text-bank-grey font-medium">{lead.phone || lead.email}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="px-3 py-1 rounded-full bg-bank-blue/10 text-bank-blue text-[10px] font-black uppercase tracking-widest">
                                {lead.source}
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex-1 bg-bank-bg/50 rounded-2xl p-5 mb-6">
                        <p className="text-sm text-bank-dark leading-relaxed font-medium">"{lead.message || 'No message content provided.'}"</p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
                        <div className="flex items-center gap-2 text-bank-grey">
                            <Calendar size={14} />
                            <span className="text-xs font-bold">{formatDate(lead.created)}</span>
                        </div>
                        {lead.email ? (
                            <a 
                                href={`mailto:${lead.email}?subject=Reply to your inquiry&body=Hi ${lead.name || ''}, `}
                                className="text-bank-blue font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform"
                            >
                                Reply via Email <ExternalLink size={14} />
                            </a>
                        ) : lead.phone ? (
                            <a 
                                href={`https://wa.me/${lead.phone.replace(/\D/g, '')}?text=Hi ${lead.name || ''}, replying to your message...`}
                                target="_blank" rel="noreferrer"
                                className="text-emerald-500 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform"
                            >
                                Reply on WhatsApp <ExternalLink size={14} />
                            </a>
                        ) : (
                            <span className="text-bank-grey font-black text-xs uppercase tracking-widest cursor-not-allowed">No Contact Info</span>
                        )}
                    </div>
                </div>
            ))}
            </div>
        </div>
        );
    };

    const renderBilling = () => (
        <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {[
                    { label: 'Revenue', value: formatCurrency(totalRevenue), icon: IndianRupee, color: 'text-emerald-500' },
                    { label: 'Expense', value: formatCurrency(totalPurchase), icon: Briefcase, color: 'text-rose-500' },
                    { label: 'Invoices', value: invoices.length, icon: FileText, color: 'text-bank-blue' },
                    { label: 'Quotes', value: quotations.length, icon: FileSpreadsheet, color: 'text-amber-500' }
                ].map((item) => (
                    <div key={item.label} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
                        <div className={`p-4 rounded-full bg-bank-bg ${item.color}`}>
                            <item.icon size={24} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-bank-grey uppercase tracking-widest">{item.label}</p>
                            <p className="text-xl font-black text-bank-dark">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Purchase Form Card */}
                <div className="bg-white rounded-[35px] p-6 sm:p-10 shadow-xl border border-gray-50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-bank-blue/5 rounded-full blur-3xl" />
                    <h3 className="text-2xl font-black text-bank-dark mb-8 flex items-center gap-4">
                        <div className="w-2 h-8 bg-bank-blue rounded-full" />
                        Log Expense
                    </h3>
                    <form onSubmit={addPurchaseEntry} className="space-y-5">
                        <div className="space-y-2">
                             <label className="text-xs font-black uppercase text-bank-grey ml-1">Title</label>
                             <input
                                value={purchaseForm.title}
                                onChange={(event) => setPurchaseForm((prev) => ({ ...prev, title: event.target.value }))}
                                className="w-full px-5 py-4 rounded-2xl bg-bank-bg border-none text-bank-dark font-bold focus:ring-2 focus:ring-bank-blue/20 transition-all placeholder:text-bank-grey/50 outline-none"
                                placeholder="Software subscription, domain etc."
                            />
                        </div>
                        <div className="space-y-2">
                             <label className="text-xs font-black uppercase text-bank-grey ml-1">Vendor</label>
                             <input
                                value={purchaseForm.vendor}
                                onChange={(event) => setPurchaseForm((prev) => ({ ...prev, vendor: event.target.value }))}
                                className="w-full px-5 py-4 rounded-2xl bg-bank-bg border-none text-bank-dark font-bold focus:ring-2 focus:ring-bank-blue/20 transition-all placeholder:text-bank-grey/50 outline-none"
                                placeholder="Amazon, Hostinger..."
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-bank-grey ml-1">Amount</label>
                                <input
                                    type="number"
                                    value={purchaseForm.amount}
                                    onChange={(event) => setPurchaseForm((prev) => ({ ...prev, amount: event.target.value }))}
                                    className="w-full px-5 py-4 rounded-2xl bg-bank-bg border-none text-bank-dark font-bold focus:ring-2 focus:ring-bank-blue/20 transition-all outline-none"
                                    placeholder="0.00"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-bank-grey ml-1">Date</label>
                                <input
                                    type="date"
                                    value={purchaseForm.date}
                                    onChange={(event) => setPurchaseForm((prev) => ({ ...prev, date: event.target.value }))}
                                    className="w-full px-5 py-4 rounded-2xl bg-bank-bg border-none text-bank-dark font-bold focus:ring-2 focus:ring-bank-blue/20 transition-all outline-none"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmittingPurchase}
                            className="w-full mt-4 py-4 rounded-2xl bg-bank-blue text-white font-black uppercase tracking-widest shadow-lg shadow-bank-blue/30 hover:bg-bank-dark hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60 flex items-center justify-center gap-3"
                        >
                            <Plus size={20} />
                            {isSubmittingPurchase ? 'Processing...' : 'Secure Entry'}
                        </button>
                    </form>
                </div>

                {/* Purchase List Card */}
                <div className="bg-white rounded-[35px] p-6 sm:p-10 shadow-sm border border-gray-100 flex flex-col h-[600px]">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                        <h3 className="text-2xl font-black text-bank-dark">Expense Log</h3>
                        <div className="flex items-center gap-2 bg-bank-bg px-4 py-2 rounded-xl focus-within:ring-2 focus-within:ring-bank-blue/20">
                            <Search size={16} className="text-bank-grey" />
                            <input 
                                type="text" 
                                placeholder="Search expenses..." 
                                value={expenseSearchTerm}
                                onChange={(e) => setExpenseSearchTerm(e.target.value)}
                                className="bg-transparent border-none text-sm focus:ring-0 placeholder:text-bank-grey outline-none w-32 sm:w-auto" 
                            />
                        </div>
                    </div>
                    <div className="space-y-4 overflow-y-auto custom-scrollbar pr-2 h-full pb-4">
                        {purchases.filter(p => (p.title || '').toLowerCase().includes(expenseSearchTerm.toLowerCase()) || (p.vendor || '').toLowerCase().includes(expenseSearchTerm.toLowerCase())).length === 0 ? (
                            <p className="text-sm text-bank-grey italic p-12 text-center bg-bank-bg rounded-3xl">
                                {purchases.length === 0 ? 'No expense history detected.' : 'No expenses match your search.'}
                            </p>
                        ) : purchases
                            .filter(p => (p.title || '').toLowerCase().includes(expenseSearchTerm.toLowerCase()) || (p.vendor || '').toLowerCase().includes(expenseSearchTerm.toLowerCase()))
                            .slice()
                            .sort((a, b) => {
                                const aDate = toDate(a.createdAt || a.date);
                                const bDate = toDate(b.createdAt || b.date);
                                if (!aDate && !bDate) return 0;
                                if (!aDate) return 1;
                                if (!bDate) return -1;
                                return bDate - aDate;
                            })
                            .map((entry) => (
                                <div key={entry.id} className="flex items-center justify-between p-5 rounded-2xl border border-gray-50 hover:border-bank-blue/20 hover:bg-bank-bg transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-bank-blue/5 flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
                                            <Briefcase size={22} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-bank-dark">{entry.title || 'Untitled Expense'}</p>
                                            <p className="text-[10px] font-bold text-bank-grey uppercase tracking-wider">{entry.vendor || 'Unknown Source'} • {formatDate(entry.date || entry.createdAt)}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 sm:gap-6 flex-col sm:flex-row items-end sm:items-center">
                                        <span className="text-sm font-black text-rose-600 tracking-tight">{formatCurrency(entry.amount)}</span>
                                        <button 
                                            onClick={() => deletePurchaseEntry(entry.id)} 
                                            className="text-bank-grey hover:text-rose-500 transition-colors bg-white p-2 rounded-lg shadow-sm w-fit"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderCmsTab = () => (
        <div className="bg-white rounded-[35px] p-6 sm:p-12 shadow-sm border border-gray-100 flex flex-col items-center text-center max-w-2xl mx-auto mt-10">
            <div className="w-24 h-24 bg-bank-blue/10 rounded-[35px] flex items-center justify-center text-bank-blue mb-8">
                <Settings size={48} />
            </div>
            <h3 className="text-3xl font-black text-bank-dark mb-4">Enterprise CMS Control</h3>
            <p className="text-bank-grey font-medium mb-10 leading-relaxed">
                You are about to enter the Content Management Zone. Here you can modify live website assets, text, and media configurations with full administrative privilege.
            </p>
            <Link
                to="/admin/cms"
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-5 rounded-2xl bg-bank-blue text-white font-black uppercase tracking-widest shadow-xl shadow-bank-blue/20 hover:bg-bank-dark hover:-translate-y-1 transition-all"
            >
                Authorize Access
                <ExternalLink size={20} />
            </Link>
            
            <Link 
                to="/" 
                className="mt-6 flex items-center gap-2 text-bank-grey hover:text-bank-dark font-bold transition-colors"
            >
                <ArrowLeft size={16} />
                Return to Live Website
            </Link>
        </div>
    );

    const renderClients = () => {
        const filteredClients = clients.filter(c => 
            (c.clientName || '').toLowerCase().includes(clientSearchTerm.toLowerCase()) || 
            (c.websiteUrl || '').toLowerCase().includes(clientSearchTerm.toLowerCase())
        );

        return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-[35px] p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-bank-blue/10 rounded-[20px] flex items-center justify-center text-bank-blue">
                        <Building2 size={32} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-bank-dark">Our Clients</h3>
                        <p className="text-[10px] font-bold text-bank-grey uppercase tracking-widest mt-1">Managed By Yuvan Creations</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-2 bg-bank-bg px-5 py-4 rounded-2xl w-full sm:w-80 focus-within:ring-2 focus-within:ring-bank-blue/20 transition-all shadow-inner">
                    <Search size={18} className="text-bank-grey" />
                    <input 
                        type="text" 
                        placeholder="Search clients..." 
                        value={clientSearchTerm}
                        onChange={(e) => setClientSearchTerm(e.target.value)}
                        className="bg-transparent border-none w-full text-sm font-bold focus:ring-0 placeholder:text-bank-grey/50 outline-none text-bank-dark relative top-[1px]" 
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredClients.length === 0 ? (
                    <div className="col-span-full bg-white rounded-[35px] p-24 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                        <div className="w-24 h-24 bg-bank-bg rounded-[30px] flex items-center justify-center text-bank-grey mb-6 transform -rotate-12">
                            <Building2 size={40} />
                        </div>
                        <h4 className="text-2xl font-black text-bank-dark mb-4">No Clients Detected</h4>
                        <p className="text-sm font-medium text-bank-grey max-w-sm">
                            Add client details manually in your Firebase 'clients' collection to see them beautifully rendered here.
                        </p>
                    </div>
                ) : filteredClients.map((client) => (
                    <div key={client.id} className="bg-white rounded-[35px] p-8 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all group overflow-hidden relative flex flex-col">
                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-bank-blue/5 rounded-full blur-2xl pointer-events-none" />
                        
                        <div className="flex items-start justify-between mb-8 relative z-10">
                            <div className="w-20 h-20 rounded-[25px] bg-bank-bg flex items-center justify-center shadow-sm border border-gray-100 overflow-hidden transform group-hover:scale-105 transition-transform group-hover:rotate-3">
                                {client.logoUrl ? (
                                    <img src={client.logoUrl} alt={client.clientName} className="w-full h-full object-contain p-2" />
                                ) : (
                                    <span className="text-3xl font-black text-bank-blue uppercase shadow-sm">{client.clientName?.charAt(0) || 'C'}</span>
                                )}
                            </div>
                            <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm border border-emerald-500/20">Active</span>
                        </div>
                        <div className="relative z-10 flex-1 flex flex-col">
                            <h4 className="text-2xl font-black text-bank-dark mb-1 group-hover:text-bank-blue transition-colors">{client.clientName || 'Unnamed Client'}</h4>
                            <p className="text-xs font-bold text-bank-grey uppercase tracking-widest mb-8">{client.industry || 'Business Partner'}</p>
                            
                            <div className="mt-auto">
                                {client.websiteUrl ? (
                                    <a 
                                        href={client.websiteUrl.startsWith('http') ? client.websiteUrl : `https://${client.websiteUrl}`} 
                                        target="_blank" rel="noreferrer"
                                        className="w-full py-4 rounded-2xl bg-bank-bg text-bank-blue font-black uppercase tracking-widest hover:bg-bank-blue hover:text-white transition-all shadow-md hover:shadow-bank-blue/30 flex items-center justify-center gap-3 text-xs group-hover:scale-[1.02]"
                                    >
                                        <Globe size={18} className="animate-pulse" />
                                        Visit Platform
                                    </a>
                                ) : (
                                    <div className="w-full py-4 rounded-2xl bg-gray-50 text-gray-400 font-black uppercase tracking-widest flex items-center justify-center gap-3 text-xs cursor-not-allowed">
                                        <Globe size={18} />
                                        Unavailable
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        );
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex flex-col items-center justify-center h-96">
                    <div className="w-16 h-16 border-4 border-bank-blue border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-bank-grey font-black uppercase tracking-widest text-xs">Authenticating System Data...</p>
                </div>
            );
        }
        if (activeTab === 'overview') return renderOverview();
        if (activeTab === 'users') return renderUsers();
        if (activeTab === 'leads') return renderLeads();
        if (activeTab === 'billing') return renderBilling();
        if (activeTab === 'clients') return renderClients();
        if (activeTab === 'cms') return renderCmsTab();
        return renderOverview();
    };

    const adminMenuItems = [
        { id: 'overview', icon: LayoutDashboard, label: 'Dashboard' },
        { id: 'users', icon: Users, label: 'Users' },
        { id: 'leads', icon: MessageSquare, label: 'Leads' },
        { id: 'billing', icon: BarChart3, label: 'Sales & Billing' },
        { id: 'clients', icon: Building2, label: 'Our Clients' },
        { id: 'cms', icon: Settings, label: 'CMS Control' },
    ];

    return (
        <DashboardLayout 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            user={user} 
            logout={logout}
            title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/-/g, ' ')}
            menuItems={adminMenuItems}
        >
            {error && (
                <div className="mb-8 px-6 py-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold flex items-center gap-3">
                    <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                    System Error: {error}
                </div>
            )}

            {renderContent()}
        </DashboardLayout>
    );
};

export default AdminDashboard;
