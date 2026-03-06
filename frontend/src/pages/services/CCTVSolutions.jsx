import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    Video, Shield, Eye, Wifi, Zap, Camera,
    Monitor, Server, Lock, ArrowUpRight,
    CheckCircle, Terminal, Activity, Radio, MapPin
} from 'lucide-react';

// ---- Multi-Camera CCTV Grid UI ----
const CameraFeed = ({ label, index, hasMotion = false }) => {
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setTick(v => v + 1), 2000 + index * 500);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="relative bg-black border border-gray-700 rounded-lg overflow-hidden aspect-video group">
            {/* Scanlines overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)' }} />

            {/* Simulated camera scene */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 flex items-center justify-center relative overflow-hidden">
                    {/* Perspective grid floor */}
                    <div className="absolute bottom-0 inset-x-0 h-1/2 opacity-20"
                        style={{ backgroundImage: 'linear-gradient(to bottom, transparent, rgba(34,211,238,0.05)), repeating-linear-gradient(90deg, rgba(34,211,238,0.1) 0px, rgba(34,211,238,0.1) 1px, transparent 1px, transparent 40px)' }} />

                    {/* Motion blob */}
                    {hasMotion && (
                        <motion.div
                            animate={{ x: [0, 20, -10, 0], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ repeat: Infinity, duration: 3 + index }}
                            className="absolute w-6 h-10 bg-red-500/30 border border-red-400/50 rounded-sm"
                        />
                    )}

                    <Video size={18} className="text-gray-700" />
                </div>
            </div>

            {/* Top bar: label + REC */}
            <div className="absolute top-0 inset-x-0 flex items-center justify-between px-2 py-1 bg-black/60 z-10">
                <span className="text-[9px] font-mono text-gray-400 uppercase">{label}</span>
                <div className="flex items-center gap-1">
                    {hasMotion && (
                        <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}
                            className="text-[8px] font-mono text-red-400 font-bold">MOTION</motion.span>
                    )}
                    <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.2 }}
                        className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span className="text-[9px] font-mono text-red-400">REC</span>
                </div>
            </div>

            {/* Bottom bar: timestamp */}
            <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-2 py-1 bg-black/60 z-10">
                <span className="text-[8px] font-mono text-gray-500">
                    {`2026-03-06  03:${String(14 + index).padStart(2, '0')}:${String(tick % 60).padStart(2, '0')}`}
                </span>
                <span className="text-[8px] font-mono text-cyan-500">4K • H.265</span>
            </div>

            {/* Motion detection box */}
            {hasMotion && (
                <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 border-2 border-red-500/60 rounded-lg pointer-events-none z-10"
                />
            )}
        </div>
    );
};

const CctvGrid = () => (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
        {/* NVR top bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-gray-400 text-xs font-mono">Yuvan NVR — 8CH Live View</span>
            <div className="ml-auto flex items-center gap-3">
                <div className="flex items-center gap-1">
                    <Activity size={11} className="text-green-400 animate-pulse" />
                    <span className="text-green-400 text-[10px] font-mono">ALL CAMERAS ONLINE</span>
                </div>
                <span className="text-gray-600 text-[10px] font-mono">HDD: 3.2TB / 4TB</span>
            </div>
        </div>

        {/* Camera grid */}
        <div className="p-3 grid grid-cols-2 gap-2 bg-gray-950">
            <CameraFeed label="CAM-01 — Main Gate" index={0} />
            <CameraFeed label="CAM-02 — Lobby" index={1} hasMotion />
            <CameraFeed label="CAM-03 — Parking" index={2} />
            <CameraFeed label="CAM-04 — Office Floor" index={3} />
        </div>

        {/* Status strip */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-t border-gray-700">
            <span className="text-[10px] font-mono text-gray-500">8/8 Cameras Active</span>
            <span className="text-[10px] font-mono text-amber-400">⚠ Motion: CAM-02</span>
            <span className="text-[10px] font-mono text-cyan-400">Remote View: ON</span>
        </div>
    </div>
);

const services = [
    {
        icon: <Camera size={28} />,
        title: 'HD & 4K Camera Systems',
        desc: 'Indoor/outdoor IP cameras with up to 4K resolution, wide dynamic range, and 30m+ IR night vision for 24/7 clarity.',
        color: 'from-red-500 to-rose-600',
        glow: 'rgba(239,68,68,0.2)',
        badge: 'Day & Night',
    },
    {
        icon: <Wifi size={28} />,
        title: 'Remote Mobile Monitoring',
        desc: 'Watch live feeds from anywhere on your phone. Multi-site management, instant alerts, and cloud or local NVR storage.',
        color: 'from-cyan-400 to-blue-500',
        glow: 'rgba(34,211,238,0.2)',
        badge: 'Live Anywhere',
    },
    {
        icon: <Eye size={28} />,
        title: 'AI Motion Detection',
        desc: 'Smart AI-powered motion zones, human/vehicle detection, and instant push notifications to your mobile when triggered.',
        color: 'from-amber-400 to-orange-500',
        glow: 'rgba(251,146,60,0.2)',
        badge: 'AI-Powered',
    },
    {
        icon: <Server size={28} />,
        title: 'NVR / DVR Installation',
        desc: 'Standalone 4K NVR/DVR units with up to 64TB HDD capacity, RAID support, and centralized multi-camera management.',
        color: 'from-violet-500 to-purple-700',
        glow: 'rgba(139,92,246,0.2)',
        badge: 'Up to 64TB',
    },
    {
        icon: <Shield size={28} />,
        title: 'Access Control Integration',
        desc: 'Combine CCTV with biometric or RFID access control for complete entry management — locks, intercoms, and cameras unified.',
        color: 'from-emerald-400 to-green-600',
        glow: 'rgba(16,185,129,0.2)',
        badge: 'Biometric Ready',
    },
    {
        icon: <Zap size={28} />,
        title: 'Professional Installation',
        desc: 'Our certified engineers handle cable routing, mounting, network config, and on-site training. Clean, concealed cabling guaranteed.',
        color: 'from-blue-400 to-indigo-600',
        glow: 'rgba(99,102,241,0.2)',
        badge: '2-Year Warranty',
    },
];

const useCases = [
    { icon: '🏠', label: 'Home Security' },
    { icon: '🏢', label: 'Offices & Corporates' },
    { icon: '🏪', label: 'Retail Stores' },
    { icon: '🏭', label: 'Warehouses' },
    { icon: '🏫', label: 'Schools & Institutes' },
    { icon: '🅿️', label: 'Parking Areas' },
    { icon: '🏥', label: 'Hospitals & Clinics' },
    { icon: '🏗️', label: 'Construction Sites' },
];

const process = [
    { step: '01', title: 'Site Survey', desc: 'Our security engineer visits your site, assesses blind spots, entry points, and recommends optimal camera placements.' },
    { step: '02', title: 'System Design', desc: 'We design a custom topology: camera count, cable routes, NVR placement, power, and storage — documented before install.' },
    { step: '03', title: 'Installation', desc: 'Certified engineers install with concealed cabling, weather-proof mounts, and full network configuration in one visit.' },
    { step: '04', title: 'Testing & Handover', desc: 'Every camera tested for coverage, night vision, and alerts. You get a live app demo and a full 2-year warranty.' },
];

const stats = [
    { value: '1,000+', label: 'Systems Installed', color: 'text-red-400' },
    { value: '4K', label: 'Max Resolution', color: 'text-cyan-400' },
    { value: '2 Yr', label: 'System Warranty', color: 'text-amber-400' },
    { value: '24/7', label: 'Support Available', color: 'text-green-400' },
];

const CCTVSolutions = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col pt-20">
            <Navbar />

            {/* ===== HERO ===== */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/8 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/8 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left */}
                        <div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 text-red-400 font-mono text-sm bg-red-400/10 border border-red-400/20 px-4 py-2 rounded-full mb-6">
                                <Radio size={14} className="animate-pulse" /> {'> surveillance_system.init'}
                            </motion.div>

                            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tight">
                                See Everything. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-orange-400">
                                    Miss Nothing.
                                </span>
                            </motion.h1>

                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                className="text-gray-400 text-lg leading-relaxed max-w-lg mb-10">
                                Professional CCTV and surveillance solutions for homes, offices, and enterprises. 4K cameras, AI detection, mobile monitoring, and 24/7 protection — all installed by certified engineers.
                            </motion.p>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                className="flex flex-wrap gap-4">
                                <Link to="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-black rounded-xl transition-colors shadow-lg shadow-red-500/30 text-sm tracking-wide">
                                    Get Free Site Survey <MapPin size={16} />
                                </Link>
                                <a href="#services"
                                    className="inline-flex items-center gap-2 px-8 py-4 border border-gray-700 hover:border-red-400 text-gray-300 hover:text-white font-bold rounded-xl transition-all text-sm">
                                    View Systems <Eye size={16} />
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

                        {/* Right: Live CCTV Grid */}
                        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                            <CctvGrid />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== USE CASES STRIP ===== */}
            <section className="py-10 border-y border-gray-800 bg-gray-900/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-600 font-mono text-xs uppercase tracking-widest mb-6">// where_we_install</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {useCases.map((u, i) => (
                            <motion.span key={i}
                                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 border border-gray-700 text-gray-300 text-sm font-mono rounded-xl hover:border-red-400/50 hover:text-red-300 transition-colors">
                                <span>{u.icon}</span> {u.label}
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
                            className="text-red-400 font-mono text-sm tracking-widest mb-3 flex justify-center items-center gap-2">
                            <Camera size={14} /> {'// security_systems'}
                        </motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                            Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Security Stack</span>
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

                                <span className="inline-block text-[10px] font-mono text-red-400 bg-red-400/10 border border-red-400/20 px-2 py-0.5 rounded-md mb-3 uppercase tracking-widest">
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
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-500/5 blur-[100px] pointer-events-none rounded-full" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            className="text-red-400 font-mono text-sm tracking-widest mb-3 flex justify-center items-center gap-2">
                            <Terminal size={14} /> {'// installation_pipeline'}
                        </motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                            Survey to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">System Online</span>
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {process.map((p, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                                className="relative bg-gray-900 border border-gray-800 rounded-2xl p-7 hover:border-red-500/50 transition-colors group">
                                <div className="text-6xl font-black text-gray-800 group-hover:text-red-500/20 transition-colors absolute top-5 right-5 select-none">{p.step}</div>
                                <div className="w-10 h-10 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-center mb-5">
                                    <CheckCircle size={20} className="text-red-400" />
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
                            { icon: <Shield size={32} className="text-red-400 mx-auto mb-3" />, title: '2-Year System Warranty', desc: 'Full warranty on cameras, NVR, and all installed hardware for 2 years.' },
                            { icon: <Eye size={32} className="text-cyan-400 mx-auto mb-3" />, title: 'Free Site Survey', desc: 'Our engineer visits, assesses, and designs your security layout — completely free.' },
                            { icon: <Wifi size={32} className="text-amber-400 mx-auto mb-3" />, title: '24/7 Remote Support', desc: 'App setup, remote troubleshooting, and technical support round the clock.' },
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
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.06)_0%,transparent_70%)]" />
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center px-4 relative z-10">
                    <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="inline-block mb-6">
                        <Camera size={64} className="text-red-400" strokeWidth={1.5} />
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Secure Your Space <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Starting Today.</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                        Book a free site survey. Our security engineer will design the perfect system for your home, office, or business.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/contact"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-red-500 hover:bg-red-600 text-white font-black rounded-2xl transition-all shadow-2xl shadow-red-500/30 text-base">
                            Book Free Survey <MapPin size={20} />
                        </Link>
                        <a href="tel:+919557300217"
                            className="inline-flex items-center gap-3 px-10 py-5 border border-gray-700 hover:border-red-400 text-white font-bold rounded-2xl transition-all text-base">
                            Call +91-9557300217
                        </a>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default CCTVSolutions;
