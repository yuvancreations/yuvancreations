import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Cpu, HardDrive, Monitor, MousePointer,
    Zap, Shield, CheckCircle, AlertCircle,
    ChevronRight, ShoppingCart, RefreshCcw,
    Layers, Fan, Database, Terminal
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const components = {
    processor: {
        title: 'Processor (CPU)',
        icon: <Cpu size={20} />,
        options: [
            { id: 'p1', name: 'Intel Core i5-13400F', price: 18500, socket: 'LGA1700' },
            { id: 'p2', name: 'Intel Core i7-13700K', price: 38000, socket: 'LGA1700' },
            { id: 'p3', name: 'AMD Ryzen 5 7600', price: 19000, socket: 'AM5' },
            { id: 'p4', name: 'AMD Ryzen 9 7900X', price: 42000, socket: 'AM5' },
        ]
    },
    motherboard: {
        title: 'Motherboard',
        icon: <Layers size={20} />,
        options: [
            { id: 'm1', name: 'MSI PRO B760M-P', price: 10500, socket: 'LGA1700' },
            { id: 'm2', name: 'ASUS ROG STRIX Z790-E', price: 45000, socket: 'LGA1700' },
            { id: 'm3', name: 'Gigabyte B650 AORUS ELITE', price: 21000, socket: 'AM5' },
            { id: 'm4', name: 'ASRock X670E Taichi', price: 48000, socket: 'AM5' },
        ]
    },
    gpu: {
        title: 'Graphics Card (GPU)',
        icon: <Zap size={20} />,
        options: [
            { id: 'g1', name: 'NVIDIA RTX 3060 12GB', price: 28000 },
            { id: 'g2', name: 'NVIDIA RTX 4070 Ti 12GB', price: 78000 },
            { id: 'g3', name: 'AMD Radeon RX 6700 XT', price: 32000 },
            { id: 'g4', name: 'NVIDIA RTX 4090 24GB', price: 185000 },
        ]
    },
    ram: {
        title: 'Memory (RAM)',
        icon: <Database size={20} />,
        options: [
            { id: 'r1', name: '16GB (8x2) DDR4 3200MHz', price: 4500 },
            { id: 'r2', name: '32GB (16x2) DDR5 6000MHz', price: 12500 },
            { id: 'r3', name: '64GB (32x2) DDR5 5200MHz', price: 22000 },
        ]
    },
    storage: {
        title: 'Storage (SSD/HDD)',
        icon: <HardDrive size={20} />,
        options: [
            { id: 's1', name: '500GB NVMe M.2 Gen4', price: 4000 },
            { id: 's2', name: '1TB NVMe M.2 Gen4', price: 7500 },
            { id: 's3', name: '2TB NVMe M.2 Gen4', price: 14000 },
        ]
    },
    case: {
        title: 'Cabinet / Case',
        icon: <Monitor size={20} />,
        options: [
            { id: 'c1', name: 'Ant Esports ICE-130AG', price: 3500 },
            { id: 'c2', name: 'Lian Li O11 Dynamic EVO', price: 16500 },
            { id: 'c3', name: 'NZXT H5 Flow', price: 8500 },
        ]
    }
};

const PCBuild = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const [selected, setSelected] = useState({
        processor: null,
        motherboard: null,
        gpu: null,
        ram: null,
        storage: null,
        case: null
    });

    const [total, setTotal] = useState(0);
    const [compatibility, setCompatibility] = useState({ status: 'ok', message: 'All components match!' });

    useEffect(() => {
        const prices = Object.values(selected).map(item => item?.price || 0);
        setTotal(prices.reduce((a, b) => a + b, 0));

        // Basic socket check
        if (selected.processor && selected.motherboard) {
            if (selected.processor.socket !== selected.motherboard.socket) {
                setCompatibility({ status: 'error', message: `Socket mismatch! ${selected.processor.socket} CPU with ${selected.motherboard.socket} Board.` });
            } else {
                setCompatibility({ status: 'ok', message: 'Socket Match: Verified.' });
            }
        } else {
            setCompatibility({ status: 'pending', message: 'Selection in progress...' });
        }
    }, [selected]);

    const handleSelect = (category, item) => {
        setSelected(prev => ({ ...prev, [category]: item }));
    };

    const resetBuild = () => {
        setSelected({
            processor: null,
            motherboard: null,
            gpu: null,
            ram: null,
            storage: null,
            case: null
        });
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white pt-32 pb-12">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 text-accent font-mono text-sm bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-4"
                        >
                            <Terminal size={14} /> {'// custom_gaming_pc_build'}
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Dream Rig</span>
                        </h1>
                    </div>
                    <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-3xl flex flex-col items-end min-w-[240px]">
                        <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-1">Estimated Total</p>
                        <p className="text-4xl font-black text-accent">₹{total.toLocaleString()}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Component Selection List */}
                    <div className="lg:col-span-2 space-y-6">
                        {Object.entries(components).map(([key, data], idx) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`bg-gray-900/30 border rounded-3xl overflow-hidden transition-all ${selected[key] ? 'border-accent/40' : 'border-gray-800'}`}
                            >
                                <div className="p-6 flex items-center justify-between group cursor-pointer" onClick={() => { }}>
                                    <div className="flex items-center gap-4">
                                        <div className={`p-4 rounded-2xl ${selected[key] ? 'bg-accent text-white' : 'bg-gray-800 text-gray-400'}`}>
                                            {data.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{data.title}</h3>
                                            {selected[key] && <p className="text-accent text-sm font-medium">{selected[key].name}</p>}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        {selected[key] ? (
                                            <p className="font-black text-xl">₹{selected[key].price.toLocaleString()}</p>
                                        ) : (
                                            <p className="text-gray-600 text-xs font-black uppercase tracking-widest">Not Selected</p>
                                        )}
                                    </div>
                                </div>

                                <div className="px-6 pb-6 pt-2">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {data.options.map(item => (
                                            <button
                                                key={item.id}
                                                onClick={() => handleSelect(key, item)}
                                                className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden group ${selected[key]?.id === item.id ? 'bg-accent border-accent text-white' : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-600'}`}
                                            >
                                                <div className="relative z-10">
                                                    <p className={`text-sm font-bold mb-1 ${selected[key]?.id === item.id ? 'text-white' : 'text-gray-300'}`}>{item.name}</p>
                                                    <p className="text-xs font-black">₹{item.price.toLocaleString()}</p>
                                                </div>
                                                {selected[key]?.id === item.id && (
                                                    <motion.div layoutId={`check-${key}`} className="absolute top-2 right-2">
                                                        <CheckCircle size={14} className="text-white" />
                                                    </motion.div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Build Summary & Checkout */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-gray-900 border border-gray-800 rounded-3xl p-8 sticky top-28"
                        >
                            <h2 className="text-xl font-black uppercase tracking-tight mb-8 flex items-center gap-2">
                                <ShoppingCart size={20} className="text-accent" /> Build Review
                            </h2>

                            <div className="space-y-4 mb-8">
                                {Object.entries(selected).map(([key, item]) => (
                                    <div key={key} className="flex justify-between items-start text-sm">
                                        <div className="flex-1">
                                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-0.5">{key}</p>
                                            <p className={`font-medium ${item ? 'text-gray-100' : 'text-gray-700 italic'}`}>
                                                {item ? item.name : 'Not selected'}
                                            </p>
                                        </div>
                                        {item && <p className="text-accent font-black">₹{item.price.toLocaleString()}</p>}
                                    </div>
                                ))}
                            </div>

                            {/* Compatibility Status */}
                            <div className={`p-4 rounded-2xl border mb-8 flex items-start gap-3 ${compatibility.status === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-500' : compatibility.status === 'ok' ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-gray-800 border-gray-700 text-gray-400'}`}>
                                {compatibility.status === 'error' ? <AlertCircle size={20} className="shrink-0" /> : <CheckCircle size={20} className="shrink-0" />}
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest leading-none mb-1">Compatibility</p>
                                    <p className="text-[11px] font-medium opacity-80">{compatibility.message}</p>
                                </div>
                            </div>

                            <button className="w-full py-5 bg-accent text-white font-black rounded-2xl shadow-xl shadow-accent/20 hover:bg-blue-600 transition-all flex items-center justify-center gap-3 active:scale-95">
                                Order This Build <ChevronRight size={18} />
                            </button>

                            <button
                                onClick={resetBuild}
                                className="w-full mt-4 py-3 border border-gray-800 text-gray-500 font-bold rounded-2xl hover:text-white hover:border-gray-600 transition-all flex items-center justify-center gap-2"
                            >
                                <RefreshCcw size={16} /> Reset Everything
                            </button>
                        </motion.div>

                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-3xl p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4">
                                <Shield className="text-accent/20" size={64} />
                            </div>
                            <h4 className="text-xl font-bold mb-3">Expert Assembly</h4>
                            <p className="text-gray-400 text-sm mb-6 leading-relaxed">Let our certified gaming engineers assemble, stress-test, and optimize your rig for peak performance.</p>
                            <span className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 text-accent text-xs font-black rounded-lg uppercase">Official Warranty</span>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PCBuild;
