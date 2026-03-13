import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, UserCircle, Activity, LogOut, ArrowLeft, Coins, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const UserDashboard = () => {
    const { user, logout } = useAuth();
    const [credits, setCredits] = useState(Number(user?.printCredits || 0));
    const [activePlan, setActivePlan] = useState(user?.activeMembershipPlan || 'No active plan');

    useEffect(() => {
        if (!user?.uid) return undefined;

        const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (snap) => {
            if (!snap.exists()) return;
            const data = snap.data();
            setCredits(Number(data?.printCredits || 0));
            setActivePlan(data?.activeMembershipPlan || 'No active plan');
        });

        return () => unsubscribe();
    }, [user?.uid]);

    const firstName = (user?.name || user?.displayName || 'User').split(' ')[0];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-gray-200 md:h-screen sticky top-0 flex flex-col">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">User Panel</span>
                    <Link to="/" className="text-gray-400 hover:text-primary md:hidden"><ArrowLeft size={20} /></Link>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <button type="button" className="w-full text-left flex items-center space-x-3 px-4 py-3 bg-blue-50 text-accent rounded-xl font-medium transition-colors">
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </button>
                    <button type="button" className="w-full text-left flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-xl font-medium transition-colors">
                        <UserCircle size={20} />
                        <span>Profile</span>
                    </button>
                    <button type="button" className="w-full text-left flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-xl font-medium transition-colors">
                        <Activity size={20} />
                        <span>My Activity</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-100 mt-auto">
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl font-medium transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Welcome, {firstName}</h1>
                    <Link to="/" className="hidden md:flex items-center space-x-2 text-sm font-medium text-gray-500 hover:text-primary bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm transition-colors">
                        <ArrowLeft size={16} />
                        <span>Back to Website</span>
                    </Link>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">User Information</h3>
                        <div className="space-y-3">
                            <div>
                                <span className="text-gray-500 text-sm block">Full Name</span>
                                <span className="text-gray-900 font-medium">{user?.name}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 text-sm block">Email Address</span>
                                <span className="text-gray-900 font-medium">{user?.email}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 text-sm block">Account Type</span>
                                <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-accent text-xs font-bold uppercase rounded-full">
                                    {user?.role}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                        <p className="text-gray-500 italic">No recent activity found.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Coins size={20} className="text-emerald-600" />
                            Print Credits
                        </h3>
                        <p className="text-4xl font-black text-emerald-600">{Number.isFinite(credits) ? credits : 0}</p>
                        <p className="text-gray-500 text-sm mt-2">1 print = 1 credit</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Crown size={20} className="text-indigo-600" />
                            Membership Plan
                        </h3>
                        <p className="text-gray-900 font-semibold">{activePlan || 'No active plan'}</p>
                        <Link
                            to="/membership"
                            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors"
                        >
                            Buy / Upgrade Plan
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;
