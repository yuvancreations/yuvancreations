import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, MessageSquare, Settings, LogOut, ArrowLeft, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const { user, logout, api } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [usersList, setUsersList] = useState([]);
    const [messagesList, setMessagesList] = useState([]);
    const [stats, setStats] = useState({ users: 0, messages: 0 });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const usersRes = await api.get('/users');
            const messagesRes = await api.get('/messages');
            setUsersList(usersRes.data);
            setMessagesList(messagesRes.data);
            setStats({
                users: usersRes.data.length,
                messages: messagesRes.data.length
            });
        } catch (err) {
            console.error('Failed to fetch admin data', err);
        }
    };

    const deleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await api.delete(`/users/${id}`);
                fetchData();
            } catch (err) {
                alert(err.response?.data?.message || 'Failed to delete user');
            }
        }
    };

    const renderContent = () => {
        if (activeTab === 'dashboard') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-blue-50 text-accent rounded-xl flex items-center justify-center">
                                <Users size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Total Users</h3>
                                <span className="text-3xl font-bold text-gray-900">{stats.users}</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide">Messages Received</h3>
                                <span className="text-3xl font-bold text-gray-900">{stats.messages}</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (activeTab === 'users') {
            return (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="p-4 font-semibold text-gray-700 text-sm">Name</th>
                                <th className="p-4 font-semibold text-gray-700 text-sm">Email</th>
                                <th className="p-4 font-semibold text-gray-700 text-sm">Role</th>
                                <th className="p-4 font-semibold text-gray-700 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList.map((u) => (
                                <tr key={u._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                    <td className="p-4 text-gray-900 font-medium">{u.name}</td>
                                    <td className="p-4 text-gray-600">{u.email}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-bold uppercase rounded-md ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-accent'}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        {u._id !== user.id && (
                                            <button onClick={() => deleteUser(u._id)} className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }

        if (activeTab === 'messages') {
            return (
                <div className="space-y-4">
                    {messagesList.length === 0 ? (
                        <p className="text-gray-500 italic">No messages found.</p>
                    ) : messagesList.map((msg) => (
                        <div key={msg._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900">{msg.name}</h4>
                                    <p className="text-sm text-gray-500">{msg.email} {msg.phone && `• ${msg.phone}`}</p>
                                </div>
                                <span className="text-xs font-medium text-gray-400">
                                    {new Date(msg.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-gray-700 leading-relaxed max-w-3xl pr-4 pl-4 border-l-4 border-gray-200">
                                {msg.message}
                            </p>
                        </div>
                    ))}
                </div>
            )
        }

        return null;
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r border-gray-200 md:h-screen sticky top-0 flex flex-col">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">Admin Control</span>
                    <Link to="/" className="text-gray-400 hover:text-primary md:hidden"><ArrowLeft size={20} /></Link>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {[
                        { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
                        { id: 'users', icon: <Users size={20} />, label: 'Users' },
                        { id: 'messages', icon: <MessageSquare size={20} />, label: 'Website Messages' },
                        { id: 'settings', icon: <Settings size={20} />, label: 'Settings' }
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === item.id ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
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
                    <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab.replace('-', ' ')}</h1>
                    <Link to="/" className="hidden md:flex items-center space-x-2 text-sm font-medium text-gray-500 hover:text-primary bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm transition-colors">
                        <ArrowLeft size={16} />
                        <span>Back to Website</span>
                    </Link>
                </header>

                {renderContent()}
            </main>
        </div>
    );
};

export default AdminDashboard;
