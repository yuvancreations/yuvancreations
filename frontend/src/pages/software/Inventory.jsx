import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Box, Package, Search, Plus,
    Filter, MoreVertical, Edit2, Trash2,
    ArrowUpRight, ArrowDownRight, TrendingUp,
    LayoutGrid, List, AlertTriangle
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Inventory = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const [products, setProducts] = useState([
        { id: 1, name: 'Logitech G502 Mouse', category: 'Peripherals', price: 4500, stock: 12, status: 'In Stock' },
        { id: 2, name: 'Ryzen 7 5800X', category: 'Processor', price: 24500, stock: 4, status: 'Low Stock' },
        { id: 3, name: '16GB DDR4 RAM', category: 'Memory', price: 3200, stock: 0, status: 'Out of Stock' },
        { id: 4, name: 'Samsung 980 Pro 1TB', category: 'Storage', price: 10500, stock: 8, status: 'In Stock' },
        { id: 5, name: 'RTX 3060 Ti', category: 'GPU', price: 35000, stock: 3, status: 'Low Stock' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [view, setView] = useState('list'); // 'grid' or 'list'

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Stock': return 'text-green-500 bg-green-500/10 border-green-500/20';
            case 'Low Stock': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
            case 'Out of Stock': return 'text-red-500 bg-red-500/10 border-red-500/20';
            default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-12">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Total Products', val: products.length, icon: <Package className="text-accent" />, trend: '+3% than last month' },
                        { label: 'Low Stock Items', val: products.filter(p => p.status === 'Low Stock').length, icon: <AlertTriangle className="text-amber-500" />, trend: 'Needs Reorder' },
                        { label: 'Total Value', val: '₹' + products.reduce((a, b) => a + (b.price * b.stock), 0).toLocaleString(), icon: <TrendingUp className="text-green-500" />, trend: 'Current Inventory Val' },
                        { label: 'Out of Stock', val: products.filter(p => p.status === 'Out of Stock').length, icon: <Box className="text-red-500" />, trend: 'Action Required' },
                    ].map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-gray-900 border border-gray-800 rounded-3xl p-6"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-gray-800 rounded-2xl">{s.icon}</div>
                                <span className={`text-[10px] font-black uppercase tracking-widest ${i === 1 || i === 3 ? 'text-red-400' : 'text-green-400'}`}>{s.trend}</span>
                            </div>
                            <h3 className="text-gray-500 text-xs font-black uppercase tracking-widest mb-1">{s.label}</h3>
                            <p className="text-2xl font-black">{s.val}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Main Table Area */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="p-8 border-b border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex-1 w-full max-w-md relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search products, categories..."
                                className="w-full bg-gray-950 border border-gray-800 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-accent transition-all text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-gray-950 p-1 rounded-xl flex gap-1 border border-gray-800">
                                <button
                                    onClick={() => setView('list')}
                                    className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-gray-600 hover:text-gray-300'}`}
                                >
                                    <List size={18} />
                                </button>
                                <button
                                    onClick={() => setView('grid')}
                                    className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-gray-600 hover:text-gray-300'}`}
                                >
                                    <LayoutGrid size={18} />
                                </button>
                            </div>
                            <button className="flex items-center gap-2 px-6 py-3 bg-accent text-white font-black rounded-2xl hover:bg-blue-600 transition-all text-sm">
                                <Plus size={18} /> Add Product
                            </button>
                        </div>
                    </div>

                    <div className="p-0">
                        {view === 'list' ? (
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-950/50">
                                        <th className="text-left px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Product Info</th>
                                        <th className="text-left px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Category</th>
                                        <th className="text-right px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Price</th>
                                        <th className="text-center px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Stock</th>
                                        <th className="text-left px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Status</th>
                                        <th className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    <AnimatePresence>
                                        {filteredProducts.map((p) => (
                                            <motion.tr
                                                key={p.id}
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="group hover:bg-white/[0.02] transition-colors"
                                            >
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center font-black text-xs text-accent">
                                                            P{p.id}
                                                        </div>
                                                        <span className="font-bold text-sm text-gray-100">{p.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className="text-xs font-mono text-gray-500">{p.category}</span>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <span className="font-black text-sm">₹{p.price.toLocaleString()}</span>
                                                </td>
                                                <td className="px-8 py-5 text-center">
                                                    <span className="font-black text-sm">{p.stock}</span>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(p.status)}`}>
                                                        {p.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-all">
                                                            <Edit2 size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteProduct(p.id)}
                                                            className="p-2 bg-gray-800 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-500 transition-all"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        ) : (
                            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredProducts.map((p) => (
                                    <motion.div
                                        key={p.id}
                                        layout
                                        className="bg-gray-950 border border-gray-800 rounded-3xl p-6 group hover:border-accent/40 transition-all"
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center font-black text-accent border border-gray-800">
                                                P{p.id}
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(p.status)}`}>
                                                {p.status}
                                            </span>
                                        </div>
                                        <h4 className="font-black text-lg mb-1 truncate">{p.name}</h4>
                                        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-6">{p.category}</p>

                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest leading-none mb-1">Stock / Price</p>
                                                <p className="font-bold text-sm">{p.stock} Units · ₹{p.price.toLocaleString()}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="w-8 h-8 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center text-gray-500 hover:text-white transition-all">
                                                    <Edit2 size={12} />
                                                </button>
                                                <button
                                                    onClick={() => deleteProduct(p.id)}
                                                    className="w-8 h-8 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-500 transition-all"
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {filteredProducts.length === 0 && (
                            <div className="py-20 text-center">
                                <Box className="mx-auto text-gray-700 mb-4" size={48} />
                                <h3 className="text-gray-500 font-bold uppercase tracking-widest">No products found</h3>
                                <p className="text-xs text-gray-700 mt-2">Try adjusting your search or filters.</p>
                            </div>
                        )}
                    </div>

                    <div className="p-8 bg-gray-950/50 border-t border-gray-800 flex justify-between items-center">
                        <p className="text-xs text-gray-500 font-medium tracking-wide italic uppercase">
                            Authenticated Admin Session · Yuvan CMS v2.4
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Live Database</span>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Inventory;
