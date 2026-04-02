import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import DashboardLayout from '../components/DashboardLayout';
import BankCard from '../components/BankCard';
import { Activity, Coins, Crown, UserCircle, ArrowLeft, LayoutDashboard, User as UserIcon, Save } from 'lucide-react';

const UserDashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [credits, setCredits] = useState(Number(user?.printCredits || 0));
    const [activePlan, setActivePlan] = useState(user?.activeMembershipPlan || 'No active plan');
    
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [profileData, setProfileData] = useState({ name: '', phone: '' });

    useEffect(() => {
        if (!user?.uid) return undefined;

        const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (snap) => {
            if (!snap.exists()) return;
            const data = snap.data();
            setCredits(Number(data?.printCredits || 0));
            setActivePlan(data?.activeMembershipPlan || 'No active plan');
            
            setProfileData(prev => ({
                name: prev.name ? prev.name : (data.name || ''),
                phone: prev.phone ? prev.phone : (data.phone || '')
            }));
        });

        return () => unsubscribe();
    }, [user?.uid]);

    const firstName = (user?.name || user?.displayName || 'User').split(' ')[0];

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        if (!user?.uid) return;
        
        setIsSavingProfile(true);
        try {
            await updateDoc(doc(db, 'users', user.uid), {
                name: profileData.name,
                phone: profileData.phone
            });
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile.');
        } finally {
            setIsSavingProfile(false);
        }
    };

    const renderOverview = () => (
        <div className="space-y-10">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <BankCard 
                    title="Available Credits" 
                    value={Number.isFinite(credits) ? credits : 0} 
                    icon={Coins} 
                    color="blue"
                    subValue="1 Print = 1 Credit"
                    trend={0}
                />
                <BankCard 
                    title="Active Plan" 
                    value={activePlan || 'Standard'} 
                    icon={Crown} 
                    color="dark"
                    subValue="Membership Status"
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* User Info Card */}
                <div className="bg-white rounded-[35px] shadow-sm border border-gray-100 p-8 sm:p-10 relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-bank-blue/5 rounded-full blur-3xl" />
                    
                    <h3 className="text-2xl font-black text-bank-dark mb-8 flex items-center gap-4">
                        <div className="w-2 h-8 bg-bank-blue rounded-full" />
                        Account Scope
                    </h3>
                    
                    <div className="space-y-6 flex-1 relative z-10">
                        <div className="bg-bank-bg p-5 rounded-2xl flex items-center justify-between">
                            <div>
                                <span className="text-[10px] font-black uppercase text-bank-grey tracking-widest block mb-1">Full Name</span>
                                <span className="text-bank-dark font-bold">{user?.name || 'Unknown User'}</span>
                            </div>
                            <UserCircle size={24} className="text-bank-grey opacity-50" />
                        </div>
                        
                        <div className="bg-bank-bg p-5 rounded-2xl flex items-center justify-between">
                            <div>
                                <span className="text-[10px] font-black uppercase text-bank-grey tracking-widest block mb-1">Email Connection</span>
                                <span className="text-bank-dark font-bold">{user?.email || 'N/A'}</span>
                            </div>
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                                Verified
                            </span>
                        </div>

                        <div className="bg-bank-bg p-5 rounded-2xl flex items-center justify-between">
                            <div>
                                <span className="text-[10px] font-black uppercase text-bank-grey tracking-widest block mb-1">Access Level</span>
                                <span className="text-bank-dark font-bold capitalize">{user?.role || 'Standard User'}</span>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => setActiveTab('profile')}
                        className="mt-8 relative z-10 w-full py-4 rounded-xl bg-bank-bg text-bank-dark font-black tracking-widest uppercase hover:bg-bank-blue hover:text-white transition-all hover:shadow-lg hover:shadow-bank-blue/30"
                    >
                        Detailed Settings
                    </button>
                </div>

                {/* Activity Summary Card */}
                <div className="bg-white rounded-[35px] shadow-sm border border-gray-100 p-8 sm:p-10 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-black text-bank-dark flex items-center gap-4">
                            <Activity size={24} className="text-rose-500" />
                            Recent Traces
                        </h3>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-10 bg-bank-bg rounded-3xl border border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-bank-grey shadow-sm mb-6 relative">
                            <Activity size={32} />
                            <div className="absolute w-full h-full border-2 border-transparent border-t-bank-blue rounded-full animate-spin" />
                        </div>
                        <h4 className="text-lg font-black text-bank-dark mb-2">Clean Slate</h4>
                        <p className="text-sm font-medium text-bank-grey max-w-[250px]">
                            Looks like you haven't made any requests or prints recently.
                        </p>
                    </div>

                    <Link
                        to="/membership"
                        className="w-full mt-6 py-4 rounded-2xl bg-bank-blue text-white font-black uppercase tracking-widest shadow-lg shadow-bank-blue/30 hover:bg-bank-dark transition-all flex items-center justify-center gap-3 group"
                    >
                        <Crown size={20} className="group-hover:rotate-12 transition-transform" />
                        Upgrade Plan
                    </Link>
                </div>
            </div>
        </div>
    );

    const renderProfile = () => (
        <div className="bg-white rounded-[35px] shadow-sm border border-gray-100 p-8 sm:p-10 max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-bank-blue/5 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-2xl font-black text-bank-dark mb-8 flex items-center gap-4 border-b border-gray-50 pb-6">
                <UserIcon size={28} className="text-bank-blue" />
                Profile Settings
            </h3>
            
            <form onSubmit={handleProfileUpdate} className="space-y-6 relative z-10">
                <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-full sm:w-1/3 flex flex-col items-center justify-center border-r border-gray-100 pr-0 sm:pr-6">
                        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-bank-bg relative group">
                            <img 
                                src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=1814F3&color=fff&size=128`} 
                                alt="Profile Avatar" 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <span className="text-white text-xs font-bold uppercase tracking-widest">Auto Gen</span>
                            </div>
                        </div>
                        <p className="text-bank-dark font-black text-lg">{user?.name || 'User'}</p>
                        <p className="text-bank-grey text-xs font-bold uppercase tracking-widest">{user?.role}</p>
                    </div>

                    <div className="w-full sm:w-2/3 space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-bank-grey ml-2">Display Name</label>
                            <input 
                                type="text" 
                                value={profileData.name}
                                onChange={(e) => setProfileData(prev => ({...prev, name: e.target.value}))}
                                className="w-full px-5 py-4 rounded-2xl bg-bank-bg border-none text-bank-dark font-bold focus:ring-2 focus:ring-bank-blue/20 transition-all outline-none"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-bank-grey ml-2">Phone Number</label>
                            <input 
                                type="text" 
                                value={profileData.phone}
                                onChange={(e) => setProfileData(prev => ({...prev, phone: e.target.value}))}
                                className="w-full px-5 py-4 rounded-2xl bg-bank-bg border-none text-bank-dark font-bold focus:ring-2 focus:ring-bank-blue/20 transition-all outline-none"
                                placeholder="+91 XXXXX XXXXX"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-bank-grey ml-2">Email Identity (Read-Only)</label>
                            <input 
                                type="email" 
                                value={user?.email || ''}
                                readOnly
                                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none text-bank-grey font-bold cursor-not-allowed outline-none"
                            />
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={isSavingProfile}
                                className="px-8 py-4 rounded-2xl bg-bank-blue text-white font-black uppercase tracking-widest shadow-lg shadow-bank-blue/30 hover:bg-bank-dark hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60 flex items-center gap-3"
                            >
                                <Save size={18} />
                                {isSavingProfile ? 'Saving...' : 'Save Profile'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );

    const renderActivity = () => (
        <div className="bg-white rounded-[35px] shadow-sm border border-gray-100 p-8 sm:p-20 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-rose-50 rounded-[30px] flex items-center justify-center text-rose-500 mb-8 transform -rotate-6">
                <Activity size={48} />
            </div>
            <h3 className="text-3xl font-black text-bank-dark mb-4">No Activity Records</h3>
            <p className="text-bank-grey font-medium max-w-md mx-auto mb-10 leading-relaxed">
                You haven't made any system actions or logs recently. When you generate requests or use your credits, they will securely appear here.
            </p>
            <button 
                onClick={() => setActiveTab('overview')}
                className="px-8 py-4 rounded-2xl bg-bank-bg text-bank-dark font-black tracking-widest uppercase hover:bg-bank-blue hover:text-white transition-all shadow-sm flex items-center gap-3"
            >
                <ArrowLeft size={18} />
                Back to Dashboard
            </button>
        </div>
    );

    const renderContent = () => {
        if (activeTab === 'overview') return renderOverview();
        if (activeTab === 'profile') return renderProfile();
        if (activeTab === 'activity') return renderActivity();
        return renderOverview();
    };

    const userMenuItems = [
        { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
        { id: 'profile', icon: UserIcon, label: 'Profile Settings' },
        { id: 'activity', icon: Activity, label: 'My Activity' },
    ];

    return (
        <DashboardLayout 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            user={user} 
            logout={logout}
            title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/-/g, ' ')}
            menuItems={userMenuItems}
        >
            {renderContent()}
        </DashboardLayout>
    );
};

export default UserDashboard;
