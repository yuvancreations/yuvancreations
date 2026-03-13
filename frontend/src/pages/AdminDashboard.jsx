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
    Users
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
    return date.toLocaleDateString();
};

const formatCurrency = (value) => `Rs. ${(Number(value) || 0).toLocaleString()}`;

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

    const [purchaseForm, setPurchaseForm] = useState({
        title: '',
        vendor: '',
        amount: '',
        date: new Date().toISOString().split('T')[0]
    });

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
                purchasesData
            ] = await Promise.all([
                safeLoadCollection('users'),
                safeLoadCollection('contact_messages'),
                safeLoadCollection('contact_page_inquiries'),
                safeLoadCollection('project_requirements'),
                safeLoadCollection('transactions'),
                safeLoadCollection('invoices'),
                safeLoadCollection('quotations'),
                safeLoadCollection('purchase_entries')
            ]);

            setUsersList(usersData);
            setQuickMessages(quickMessagesData);
            setContactInquiries(inquiriesData);
            setRequirements(requirementsData);
            setTransactions(transactionsData);
            setInvoices(invoicesData);
            setQuotations(quotationsData);
            setPurchases(purchasesData);
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
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                    { label: 'Total Users', value: usersList.length, icon: <Users size={18} />, tone: 'bg-blue-50 text-blue-700' },
                    { label: 'Total Leads', value: totalLeads, icon: <MessageSquare size={18} />, tone: 'bg-green-50 text-green-700' },
                    { label: 'Revenue', value: formatCurrency(totalRevenue), icon: <IndianRupee size={18} />, tone: 'bg-emerald-50 text-emerald-700' },
                    { label: 'Net (Revenue - Purchase)', value: formatCurrency(net), icon: <BarChart3 size={18} />, tone: 'bg-violet-50 text-violet-700' }
                ].map((card) => (
                    <div key={card.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                        <div className={`inline-flex p-2 rounded-lg ${card.tone}`}>{card.icon}</div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mt-3">{card.label}</p>
                        <p className="text-2xl font-black text-gray-900 mt-1">{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue vs Purchase (Last 6 Months)</h3>
                <div className="space-y-4">
                    {monthlyRevenue.map((month) => (
                        <div key={month.key}>
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                <span className="font-semibold">{month.label}</span>
                                <span className="font-semibold">
                                    {formatCurrency(month.revenue)} / {formatCurrency(month.purchase)}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="h-2 rounded-full bg-emerald-100 overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500 rounded-full"
                                        style={{ width: `${Math.max((month.revenue / peakRevenue) * 100, 3)}%` }}
                                    />
                                </div>
                                <div className="h-2 rounded-full bg-rose-100 overflow-hidden">
                                    <div
                                        className="h-full bg-rose-500 rounded-full"
                                        style={{ width: `${Math.max((month.purchase / peakPurchase) * 100, 3)}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderUsers = () => (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="p-4 text-sm font-semibold text-gray-700">Name</th>
                        <th className="p-4 text-sm font-semibold text-gray-700">Email</th>
                        <th className="p-4 text-sm font-semibold text-gray-700">Role</th>
                        <th className="p-4 text-sm font-semibold text-gray-700 text-right">Control</th>
                    </tr>
                </thead>
                <tbody>
                    {usersList.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="p-6 text-center text-gray-500 italic">No users found.</td>
                        </tr>
                    ) : usersList.map((entry) => (
                        <tr key={entry.id} className="border-b border-gray-50">
                            <td className="p-4 font-medium text-gray-900">{entry.name || '-'}</td>
                            <td className="p-4 text-gray-600">{entry.email || '-'}</td>
                            <td className="p-4">
                                <select
                                    value={entry.role || 'user'}
                                    onChange={(event) => changeUserRole(entry.id, event.target.value)}
                                    className="px-2 py-1 rounded-md border border-gray-200 text-sm"
                                >
                                    <option value="user">user</option>
                                    <option value="admin">admin</option>
                                </select>
                            </td>
                            <td className="p-4 text-right">
                                <button
                                    onClick={() => deleteUserRecord(entry.id)}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50"
                                >
                                    <Trash2 size={14} />
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderLeads = () => (
        <div className="space-y-4">
            {mergedLeads.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 text-gray-500 italic">No lead entries found.</div>
            ) : mergedLeads.map((lead, index) => (
                <div key={`${lead.id}-${index}`} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                        <div>
                            <h4 className="text-base font-bold text-gray-900">{lead.name || 'Unknown'}</h4>
                            <p className="text-xs text-gray-500">{lead.email || '-'} {lead.phone ? `| ${lead.phone}` : ''}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-semibold text-blue-600">{lead.source}</p>
                            <p className="text-xs text-gray-400">{formatDate(lead.created)}</p>
                        </div>
                    </div>
                    {lead.service && <p className="text-xs text-violet-600 font-semibold mb-2">Service: {lead.service}</p>}
                    <p className="text-sm text-gray-700 leading-relaxed">{lead.message || '-'}</p>
                </div>
            ))}
        </div>
    );

    const renderBilling = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
                {[
                    { label: 'Successful Payments', value: successfulTransactions.length, icon: <ShieldCheck size={17} /> },
                    { label: 'Invoices', value: invoices.length, icon: <FileText size={17} /> },
                    { label: 'Quotations', value: quotations.length, icon: <FileSpreadsheet size={17} /> },
                    { label: 'Revenue', value: formatCurrency(totalRevenue), icon: <IndianRupee size={17} /> },
                    { label: 'Purchases', value: formatCurrency(totalPurchase), icon: <IndianRupee size={17} /> }
                ].map((card) => (
                    <div key={card.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                        <div className="inline-flex p-2 rounded-lg bg-gray-100 text-gray-700">{card.icon}</div>
                        <p className="text-xs text-gray-500 font-semibold mt-2">{card.label}</p>
                        <p className="text-xl font-black text-gray-900 mt-1">{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Add Purchase Entry</h3>
                    <form onSubmit={addPurchaseEntry} className="space-y-3">
                        <input
                            value={purchaseForm.title}
                            onChange={(event) => setPurchaseForm((prev) => ({ ...prev, title: event.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200"
                            placeholder="Purchase title"
                        />
                        <input
                            value={purchaseForm.vendor}
                            onChange={(event) => setPurchaseForm((prev) => ({ ...prev, vendor: event.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200"
                            placeholder="Vendor (optional)"
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="number"
                                value={purchaseForm.amount}
                                onChange={(event) => setPurchaseForm((prev) => ({ ...prev, amount: event.target.value }))}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200"
                                placeholder="Amount"
                            />
                            <input
                                type="date"
                                value={purchaseForm.date}
                                onChange={(event) => setPurchaseForm((prev) => ({ ...prev, date: event.target.value }))}
                                className="w-full px-3 py-2 rounded-lg border border-gray-200"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmittingPurchase}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
                        >
                            <Plus size={15} />
                            {isSubmittingPurchase ? 'Saving...' : 'Add Purchase'}
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Purchases</h3>
                    <div className="space-y-3 max-h-72 overflow-auto pr-1">
                        {purchases.length === 0 ? (
                            <p className="text-sm text-gray-500 italic">No purchases logged yet.</p>
                        ) : purchases
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
                                <div key={entry.id} className="flex items-center justify-between border border-gray-100 rounded-xl p-3">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{entry.title || '-'}</p>
                                        <p className="text-xs text-gray-500">{entry.vendor || 'No vendor'} | {formatDate(entry.date || entry.createdAt)}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold text-rose-600">{formatCurrency(entry.amount)}</span>
                                        <button onClick={() => deletePurchaseEntry(entry.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={15} />
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
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Content Management</h3>
            <p className="text-sm text-gray-500 mb-4">
                Open dedicated CMS panel for controlled live content updates.
            </p>
            <Link
                to="/admin/cms"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-black"
            >
                Open CMS Panel
                <ExternalLink size={14} />
            </Link>
        </div>
    );

    const renderContent = () => {
        if (loading) {
            return <div className="bg-white rounded-2xl border border-gray-100 p-6 text-gray-500">Loading control center data...</div>;
        }
        if (activeTab === 'overview') return renderOverview();
        if (activeTab === 'users') return renderUsers();
        if (activeTab === 'leads') return renderLeads();
        if (activeTab === 'billing') return renderBilling();
        if (activeTab === 'cms') return renderCmsTab();
        return renderOverview();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            <aside className="w-full md:w-72 bg-white border-r border-gray-200 md:h-screen sticky top-0 flex flex-col">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">Yuvan Control Center</span>
                    <Link to="/" className="text-gray-400 hover:text-primary md:hidden"><ArrowLeft size={20} /></Link>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {[
                        { id: 'overview', icon: <LayoutDashboard size={18} />, label: 'Overview' },
                        { id: 'users', icon: <Users size={18} />, label: 'Users Control' },
                        { id: 'leads', icon: <MessageSquare size={18} />, label: 'Leads & Messages' },
                        { id: 'billing', icon: <BarChart3 size={18} />, label: 'Sales/Purchase/Billing' },
                        { id: 'cms', icon: <Settings size={18} />, label: 'CMS Control' }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === item.id ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}

                    <Link
                        to="/admin/cms"
                        className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100"
                    >
                        CMS Page
                        <ExternalLink size={14} />
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl font-medium transition-colors"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            <main className="flex-1 p-8">
                <header className="flex flex-wrap justify-between items-center gap-3 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">{activeTab.replace(/-/g, ' ')}</h1>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={fetchData}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 bg-white px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                        >
                            <RefreshCw size={14} />
                            Refresh
                        </button>
                        <Link
                            to="/admin/cms"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-primary px-4 py-2 rounded-lg hover:bg-black"
                        >
                            CMS Panel
                            <ExternalLink size={14} />
                        </Link>
                        <Link
                            to="/"
                            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-gray-600 bg-white px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
                        >
                            <ArrowLeft size={14} />
                            Back to Website
                        </Link>
                    </div>
                </header>

                {error && (
                    <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                        {error}
                    </div>
                )}

                {renderContent()}
            </main>
        </div>
    );
};

export default AdminDashboard;
