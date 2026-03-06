import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    Smartphone, Battery, Wifi, Shield, Zap, Wrench,
    Camera, Mic, Volume2, ArrowUpRight, CheckCircle,
    Terminal, Activity, AlertTriangle, Cpu, RefreshCw
} from 'lucide-react';

// ---- Phone Diagnostic Terminal ----
const phoneChecks = [
    { label: 'Screen & Touch Panel', value: 'Detected', status: 'OK', color: 'text-green-400' },
    { label: 'Battery Health', value: '23% health', status: 'REPLACE', color: 'text-red-400' },
    { label: 'Front Camera', value: '12MP active', status: 'OK', color: 'text-green-400' },
    { label: 'Rear Camera', value: '48MP active', status: 'OK', color: 'text-green-400' },
    { label: 'Charging Port', value: 'Loose contact', status: 'FIX', color: 'text-amber-400' },
    { label: 'Face ID / Fingerprint', value: 'Enrolled', status: 'OK', color: 'text-green-400' },
    { label: 'Speaker & Mic', value: 'Functional', status: 'OK', color: 'text-green-400' },
    { label: 'Water Damage Score', value: 'Level 0', status: 'CLEAN', color: 'text-cyan-400' },
];

const PhoneDiagnostic = () => {
    const [visible, setVisible] = useState(0);
    useEffect(() => {
        if (visible >= phoneChecks.length) return;
        const t = setTimeout(() => setVisible(v => v + 1), 320);
        return () => clearTimeout(t);
    }, [visible]);

    return (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-gray-400 text-xs font-mono">yuvan_phone_diagnostic.sh</span>
                <div className="ml-auto flex items-center gap-2">
                    <Activity size={12} className="text-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs font-mono">SCANNING DEVICE...</span>
                </div>
            </div>
            <div className="p-5 font-mono text-xs space-y-2.5 min-h-[300px]">
                <div className="text-gray-500 mb-4">{'>'} Connecting to device via USB debug bridge...</div>
                <div className="text-gray-500 mb-4">{'>'} Device: Samsung Galaxy S22 | IMEI: ●●●●●●●● | Android 13</div>
                {phoneChecks.slice(0, visible).map((d, i) => (
                    <motion.div key={i}
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between border-b border-gray-800/50 pb-1.5">
                        <span className="text-gray-400">{d.label}</span>
                        <div className="flex items-center gap-3">
                            <span className="text-gray-300">{d.value}</span>
                            <span className={`font-bold ${d.color} w-16 text-right`}>[{d.status}]</span>
                        </div>
                    </motion.div>
                ))}
                {visible >= phoneChecks.length && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="pt-3 border-t border-gray-700 font-bold flex items-center gap-2">
                        <span className="text-amber-400">⚠</span>
                        <span className="text-amber-400">2 issues found. Ready for repair estimate.</span>
                    </motion.div>
                )}
                {visible < phoneChecks.length && <span className="animate-pulse text-emerald-400">█</span>}
            </div>
        </div>
    );
};

// ---- Animated Battery Bar ----
const BatteryWidget = () => {
    return (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
                <Battery size={14} className="text-emerald-400" />
                <span className="text-gray-400 font-mono text-xs">Battery Replacement — Before vs After</span>
            </div>
            <div className="grid grid-cols-2 gap-6">
                {[
                    { label: 'Before Repair', pct: 23, color: 'from-red-600 to-red-400', text: 'text-red-400' },
                    { label: 'After Repair', pct: 100, color: 'from-emerald-600 to-green-400', text: 'text-emerald-400' },
                ].map((b, i) => (
                    <div key={i} className="text-center">
                        <p className="text-gray-500 text-[10px] font-mono mb-3">{b.label}</p>
                        <div className="relative mx-auto w-16 h-28 border-2 border-gray-600 rounded-xl overflow-hidden bg-gray-800">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-6 h-2 bg-gray-600 rounded-b-sm" />
                            <motion.div
                                initial={{ height: 0 }}
                                whileInView={{ height: `${b.pct}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: i * 0.3 }}
                                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${b.color}`}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className={`text-xs font-black ${b.text}`}>{b.pct}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const services = [
    {
        icon: <Smartphone size={28} />,
        title: 'Screen Replacement',
        desc: 'OEM-quality display replacements for all major brands. Restore full touch sensitivity, brightness, and colour accuracy.',
        color: 'from-emerald-400 to-green-500',
        glow: 'rgba(16,185,129,0.2)',
        badge: 'Same Day',
    },
    {
        icon: <Battery size={28} />,
        title: 'Battery Replacement',
        desc: 'Genuine-grade battery swaps for iPhones, Samsung, OnePlus and more. Restore all-day battery life in under an hour.',
        color: 'from-yellow-400 to-amber-500',
        glow: 'rgba(234,179,8,0.2)',
        badge: '6-Month Warranty',
    },
    {
        icon: <Zap size={28} />,
        title: 'Charging Port Repair',
        desc: 'Loose or non-charging ports cleaned, tightened, or fully replaced. USB-C, Lightning, and Micro-USB all supported.',
        color: 'from-cyan-400 to-blue-500',
        glow: 'rgba(34,211,238,0.2)',
        badge: 'Walk-In Welcome',
    },
    {
        icon: <Camera size={28} />,
        title: 'Camera Repair & Replacement',
        desc: 'Blurry, cracked lens, or dead camera module? We source and fit original-spec camera units with software calibration.',
        color: 'from-violet-500 to-purple-600',
        glow: 'rgba(139,92,246,0.2)',
        badge: 'All Models',
    },
    {
        icon: <Wrench size={28} />,
        title: 'Water Damage Restoration',
        desc: 'Ultra-sonic cleaning, corrosion removal, and component-level repair for water and liquid-damaged smartphones.',
        color: 'from-blue-400 to-indigo-600',
        glow: 'rgba(99,102,241,0.2)',
        badge: 'No Data Loss',
    },
    {
        icon: <Shield size={28} />,
        title: 'Software & IMEI Fix',
        desc: 'Bootloop repair, factory resets, data backup before service, and IMEI restoration for network unlock issues.',
        color: 'from-rose-400 to-pink-600',
        glow: 'rgba(244,63,94,0.2)',
        badge: 'Data Safe',
    },
];

const brands = ['iPhone', 'Samsung', 'OnePlus', 'Xiaomi', 'Realme', 'Vivo', 'OPPO', 'Motorola'];

const process = [
    { step: '01', title: 'Drop Off & Diagnose', desc: 'Walk in with your device. Our tech runs a 10-minute free diagnostic and photos every existing issue.' },
    { step: '02', title: 'Transparent Quote', desc: 'You get a WhatsApp quote with part cost + labor. No surprise bills. Approval required before any work.' },
    { step: '03', title: 'Precision Repair', desc: 'Certified technicians open, fix, and reassemble in our ESD-safe clean workspace with quality tooling.' },
    { step: '04', title: 'QA & Warranty', desc: '30-point quality check, 6-month warranty card issued, device returned sealed and tested end-to-end.' },
];

const stats = [
    { value: '10K+', label: 'Phones Repaired', color: 'text-emerald-400' },
    { value: '6 Mon', label: 'Parts Warranty', color: 'text-cyan-400' },
    { value: '< 1 Hr', label: 'Common Repairs', color: 'text-amber-400' },
    { value: '99%', label: 'Success Rate', color: 'text-green-400' },
];

const MobileRepair = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col pt-20">
            <Navbar />

            {/* ===== HERO ===== */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left */}
                        <div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 text-emerald-400 font-mono text-sm bg-emerald-400/10 border border-emerald-400/20 px-4 py-2 rounded-full mb-6">
                                <Terminal size={14} /> {'> yuvan_mobile_repair.sh'}
                            </motion.div>

                            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tight">
                                Your Phone, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-cyan-400">
                                    Good as New.
                                </span>
                            </motion.h1>

                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                className="text-gray-400 text-lg leading-relaxed max-w-lg mb-10">
                                Expert mobile repair for all major brands. Genuine parts, certified technicians, and a 6-month warranty on every fix. Walk in — walk out repaired.
                            </motion.p>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                className="flex flex-wrap gap-4">
                                <Link to="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-black rounded-xl transition-colors shadow-lg shadow-emerald-500/30 text-sm tracking-wide">
                                    Book a Free Check-Up <Smartphone size={16} />
                                </Link>
                                <a href="#services"
                                    className="inline-flex items-center gap-2 px-8 py-4 border border-gray-700 hover:border-emerald-400 text-gray-300 hover:text-white font-bold rounded-xl transition-all text-sm">
                                    View All Repairs <Wrench size={16} />
                                </a>
                            </motion.div>

                            {/* Stats */}
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                                className="grid grid-cols-2 gap-3 mt-10">
                                {stats.map((s, i) => (
                                    <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-3 flex items-center gap-3">
                                        <div>
                                            <p className={`font-black text-xl leading-none ${s.color}`}>{s.value}</p>
                                            <p className="text-gray-500 text-[10px] font-mono mt-0.5">{s.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right: Diagnostic + Battery */}
                        <div className="flex flex-col gap-5">
                            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                                <PhoneDiagnostic />
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                                <BatteryWidget />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== BRANDS WE SERVICE ===== */}
            <section className="py-10 border-y border-gray-800 bg-gray-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-600 font-mono text-xs uppercase tracking-widest mb-6">// brands_we_service</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {brands.map((b, i) => (
                            <motion.span key={i}
                                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                                className="px-5 py-2.5 bg-gray-800 border border-gray-700 text-gray-300 text-sm font-mono rounded-xl hover:border-emerald-400/50 hover:text-emerald-300 transition-colors">
                                {b}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== SERVICES ===== */}
            <section id="services" className="py-24 relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            className="text-emerald-400 font-mono text-sm tracking-widest mb-3 flex justify-center items-center gap-2">
                            <Wrench size={14} /> {'// repair_catalog'}
                        </motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                            What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Repair</span>
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((s, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                className="group relative bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-2xl p-7 overflow-hidden transition-all duration-300">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                                    style={{ boxShadow: `inset 0 0 40px ${s.glow}` }} />
                                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${s.color} opacity-50 group-hover:opacity-100 transition-opacity`} />

                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {s.icon}
                                </div>

                                <span className="inline-block text-[10px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-md mb-3 uppercase tracking-widest">
                                    {s.badge}
                                </span>

                                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PROCESS ===== */}
            <section className="py-24 bg-gray-900/40 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/5 blur-[100px] pointer-events-none rounded-full" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            className="text-emerald-400 font-mono text-sm tracking-widest mb-3 flex justify-center items-center gap-2">
                            <Terminal size={14} /> {'// repair_pipeline'}
                        </motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                            Drop Off to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Fully Fixed</span>
                        </motion.h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {process.map((p, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                                className="relative bg-gray-900 border border-gray-800 rounded-2xl p-7 hover:border-emerald-500/50 transition-colors group">
                                <div className="text-6xl font-black text-gray-800 group-hover:text-emerald-500/20 transition-colors absolute top-5 right-5 select-none">{p.step}</div>
                                <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center mb-5">
                                    <CheckCircle size={20} className="text-emerald-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                                {i < process.length - 1 && (
                                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-gray-700 z-10 text-2xl">›</div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== GUARANTEE STRIP ===== */}
            <section className="py-16 bg-gray-950 border-y border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { icon: <Shield size={32} className="text-emerald-400 mx-auto mb-3" />, title: '6-Month Parts Warranty', desc: 'All replacement parts covered for 6 months — genuine quality guaranteed.' },
                            { icon: <AlertTriangle size={32} className="text-amber-400 mx-auto mb-3" />, title: 'No Fix, No Charge', desc: "If we can't fix it, the diagnosis is completely free. No risk for you." },
                            { icon: <Zap size={32} className="text-cyan-400 mx-auto mb-3" />, title: 'WhatsApp Live Updates', desc: 'Get real-time repair status photos on WhatsApp while we work on your phone.' },
                        ].map((w, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                                {w.icon}
                                <h3 className="text-lg font-bold text-white mb-2">{w.title}</h3>
                                <p className="text-gray-500 text-sm">{w.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="py-24 relative overflow-hidden bg-gray-950">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.07)_0%,transparent_70%)]" />
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center px-4 relative z-10">
                    <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="inline-block mb-6">
                        <Smartphone size={64} className="text-emerald-400" strokeWidth={1.5} />
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Cracked Screen? <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">We Fix It Today.</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                        Walk in with your phone, walk out with a perfectly repaired device. Free diagnosis. Instant quote. 6-month warranty.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/contact"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-500 hover:bg-emerald-600 text-black font-black rounded-2xl transition-all shadow-2xl shadow-emerald-500/30 text-base">
                            Book Free Diagnosis <Smartphone size={20} />
                        </Link>
                        <a href="tel:+919557300217"
                            className="inline-flex items-center gap-3 px-10 py-5 border border-gray-700 hover:border-emerald-400 text-white font-bold rounded-2xl transition-all text-base">
                            Call +91-9557300217
                        </a>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default MobileRepair;
