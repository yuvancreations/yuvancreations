import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    MessageSquare,
    BarChart3,
    Settings,
    LogOut,
    Search,
    Bell,
    Settings2,
    Menu,
    X,
    ChevronRight
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`relative w-full flex items-center gap-4 px-8 py-4 transition-all duration-300 group ${
            active 
            ? 'text-bank-blue font-bold' 
            : 'text-bank-grey hover:text-bank-blue font-medium'
        }`}
    >
        {active && (
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-bank-blue rounded-r-lg" />
        )}
        <Icon size={24} className={active ? 'text-bank-blue' : 'text-bank-grey group-hover:text-bank-blue'} />
        <span className="text-lg">{label}</span>
    </button>
);

const DashboardLayout = ({ children, activeTab, setActiveTab, user, logout, title, menuItems = [] }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-bank-bg flex">
            {/* Sidebar Desktop */}
            <aside className="hidden lg:flex w-72 bg-white border-r border-gray-100 flex-col py-8 sticky top-0 h-screen">
                <div className="px-8 mb-12 flex items-center gap-3">
                    <div className="w-10 h-10 bg-bank-blue rounded-xl flex items-center justify-center">
                        <span className="text-white font-black text-xl">YC</span>
                    </div>
                    <span className="text-xl font-black text-bank-dark">Yuvan CMS</span>
                </div>

                <nav className="flex-1 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => (
                        <SidebarItem
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            active={activeTab === item.id}
                            onClick={() => setActiveTab(item.id)}
                        />
                    ))}
                </nav>

                <div className="px-8 pt-8 border-t border-gray-50">
                    <button
                        onClick={logout}
                        className="flex items-center gap-4 text-rose-500 hover:text-rose-600 font-bold w-full px-4 py-3 rounded-xl hover:bg-rose-50 transition-colors"
                    >
                        <LogOut size={22} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-72 bg-white z-50 transform transition-transform duration-300 lg:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-bank-blue rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">YC</span>
                        </div>
                        <span className="font-bold text-bank-dark">Yuvan CMS</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500">
                        <X size={24} />
                    </button>
                </div>
                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                                activeTab === item.id 
                                ? 'bg-bank-blue text-white shadow-lg shadow-bank-blue/20' 
                                : 'text-bank-grey hover:bg-gray-50'
                            }`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <header className="bg-white border-b border-gray-100 px-6 lg:px-10 py-5 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button 
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-2xl lg:text-3xl font-black text-bank-dark hidden sm:block">
                            {title || "Overview"}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3 lg:gap-6">
                        <div className="hidden md:flex items-center bg-bank-bg rounded-full px-5 py-3 w-64 lg:w-80 group focus-within:ring-2 focus-within:ring-bank-blue/20 transition-all">
                            <Search className="text-bank-grey group-focus-within:text-bank-blue" size={20} />
                            <input 
                                type="text" 
                                placeholder="Search for something" 
                                className="bg-transparent border-none focus:ring-0 text-sm ml-3 w-full text-bank-dark placeholder:text-bank-grey"
                            />
                        </div>
                        
                        <div className="flex items-center gap-2 lg:gap-4">
                            <button className="p-3 bg-bank-bg hover:bg-gray-100 text-bank-grey hover:text-bank-blue rounded-full transition-all">
                                <Settings2 size={22} />
                            </button>
                            <button className="p-3 bg-bank-bg hover:bg-gray-100 text-amber-500 rounded-full transition-all relative">
                                <Bell size={22} />
                                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
                            </button>
                            <div className="w-10 lg:w-12 h-10 lg:h-12 bg-bank-blue/10 rounded-full border-2 border-bank-blue overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                                <img 
                                    src={`https://ui-avatars.com/api/?name=${user?.email || 'Admin'}&background=1814F3&color=fff`} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-6 lg:p-10 flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
