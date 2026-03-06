import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    Monitor, Cpu, HardDrive, Shield, Zap, Wrench,
    Database, Wifi, ArrowUpRight, CheckCircle, Terminal,
    BarChart3, RefreshCw, Server, AlertTriangle, Activity
} from 'lucide-react';

// ---- Animated System Diagnostic ----
const diagnosticChecks = [
    { label: 'CPU Temperature', value: '42°C', status: 'OK', color: 'text-green-400' },
    { label: 'RAM Usage', value: '4.2GB / 16GB', status: 'OK', color: 'text-green-400' },
    { label: 'Disk Health (SSD)', value: '100%', status: 'GOOD', color: 'text-green-400' },
    { label: 'Virus Scan', value: '0 Threats', status: 'CLEAN', color: 'text-cyan-400' },
    { label: 'Windows Updates', value: 'Up to date', status: 'OK', color: 'text-green-400' },
    { label: 'Driver Status', value: 'All Updated', status: 'OK', color: 'text-green-400' },
    { label: 'Network Ping', value: '12ms', status: 'EXCELLENT', color: 'text-cyan-400' },
    { label: 'Boot Time', value: '4.2s', status: 'FAST', color: 'text-green-400' },
];

const DiagnosticPanel = () => {
    const [visible, setVisible] = useState(0);
    useEffect(() => {
        if (visible >= diagnosticChecks.length) return;
        const t = setTimeout(() => setVisible(v => v + 1), 300);
        return () => clearTimeout(t);
    }, [visible]);

    return (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-gray-400 text-xs font-mono">yuvan_diagnostic_tool.exe</span>
                <div className="ml-auto flex items-center gap-2">
                    <Activity size={12} className="text-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs font-mono">SCANNING...</span>
                </div>
            </div>
            <div className="p-5 font-mono text-sm space-y-2 min-h-[280px]">
                <div className="text-gray-500 text-xs mb-4">{'>'} Running full system diagnostic...</div>
                {diagnosticChecks.slice(0, visible).map((d, i) => (
                    <motion.div key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between">
                        <span className="text-gray-400 text-xs">{d.label}</span>
                        <div className="flex items-center gap-3">
                            <span className="text-gray-300 text-xs">{d.value}</span>
                            <span className={`text-xs font-bold ${d.color} w-20 text-right`}>[{d.status}]</span>
                        </div>
                    </motion.div>
                ))}
                {visible >= diagnosticChecks.length && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="pt-3 border-t border-gray-700 text-green-400 text-xs font-bold flex items-center gap-2">
                        <CheckCircle size={14} />
                        All systems healthy. Ready for servicing.
                    </motion.div>
                )}
                {visible < diagnosticChecks.length && (
                    <span className="animate-pulse text-green-400">█</span>
                )}
            </div>
        </div>
    );
};

// ---- CPU usage bars ----
const CpuBars = () => (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
            <Cpu size={14} className="text-cyan-400" />
            <span className="text-gray-400 font-mono text-xs">CPU Core Activity</span>
            <span className="ml-auto text-cyan-400 font-mono text-xs animate-pulse">LIVE</span>
        </div>
        <div className="space-y-2">
            {['Core 0', 'Core 1', 'Core 2', 'Core 3'].map((core, i) => {
                const pct = [42, 78, 31, 65][i];
                return (
                    <div key={core} className="flex items-center gap-3">
                        <span className="text-gray-600 text-xs font-mono w-12">{core}</span>
                        <div className="flex-1 h-4 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                animate={{ width: [`${pct}%`, `${pct + 15}%`, `${pct}%`] }}
                                transition={{ repeat: Infinity, duration: 2 + i * 0.3 }}
                                className="h-full rounded-full bg-gradient-to-r from-accent to-cyan-400"
                                style={{ width: `${pct}%` }}
                            />
                        </div>
                        <span className="text-gray-400 text-xs font-mono w-8">{pct}%</span>
                    </div>
                );
            })}
        </div>
    </div>
);

const services = [
    {
        icon: <Wrench size={28} />,
        title: 'Hardware Repair & Upgrade',
        desc: 'Motherboard repair, GPU/RAM upgrades, power supply replacement, and thermal repasting — all with genuine certified parts.',
        color: 'from-blue-400 to-cyan-500',
        glow: 'rgba(34,211,238,0.2)',
        badge: 'In-Store & On-Site',
    },
    {
        icon: <Shield size={28} />,
        title: 'Virus & Malware Removal',
        desc: 'Deep-scan threat removal, rootkit elimination, and post-cleanup hardening so your system stays protected going forward.',
        color: 'from-red-400 to-rose-600',
        glow: 'rgba(248,113,113,0.2)',
        badge: '100% Clean Guarantee',
    },
    {
        icon: <HardDrive size={28} />,
        title: 'Data Recovery',
        desc: 'Advanced recovery from failed HDDs, corrupted SSDs, formatted drives, and accidental deletions using professional-grade tools.',
        color: 'from-amber-400 to-orange-500',
        glow: 'rgba(251,146,60,0.2)',
        badge: 'No Data, No Charge',
    },
    {
        icon: <Monitor size={28} />,
        title: 'OS Installation & Setup',
        desc: 'Fresh Windows / Linux installs, driver setup, software configuration, and performance optimization for a like-new experience.',
        color: 'from-emerald-400 to-green-600',
        glow: 'rgba(16,185,129,0.2)',
        badge: 'All OS Supported',
    },
    {
        icon: <Zap size={28} />,
        title: 'PC Performance Tuning',
        desc: 'BIOS optimization, startup management, bloatware removal, and SSD caching configuration for maximum speed.',
        color: 'from-yellow-400 to-amber-500',
        glow: 'rgba(234,179,8,0.2)',
        badge: 'Up to 3x Faster',
    },
    {
        icon: <Server size={28} />,
        title: 'Networking & Server Setup',
        desc: 'LAN/WAN configuration, router setup, NAS server deployment, and corporate IT infrastructure for offices of all sizes.',
        color: 'from-violet-500 to-purple-700',
        glow: 'rgba(139,92,246,0.2)',
        badge: 'Enterprise Ready',
    },
];

const process = [
    { step: '01', title: 'Free Diagnosis', desc: 'Bring your device in. Our technicians run a complete diagnostic and give you a clear report — free of charge.' },
    { step: '02', title: 'Quote & Approval', desc: 'You receive a transparent parts + labor quote. No hidden fees. You decide before we touch a single component.' },
    { step: '03', title: 'Expert Repair', desc: 'Our certified technicians execute the fix with genuine parts, precision tools, and documented quality checks.' },
    { step: '04', title: 'Test & Handover', desc: 'Full system test, burn-in validation, and a 1-year warranty on parts and labor before it goes back to you.' },
];

const specs = [
    { label: 'Repair Success Rate', value: '98.7%', icon: <Activity size={20} />, color: 'text-green-400' },
    { label: 'Avg. Repair Time', value: '< 24 hrs', icon: <RefreshCw size={20} />, color: 'text-cyan-400' },
    { label: 'Parts Warranty', value: '1 Year', icon: <Shield size={20} />, color: 'text-blue-400' },
    { label: 'Devices Serviced', value: '5,000+', icon: <Monitor size={20} />, color: 'text-amber-400' },
];

const ComputerSolutions = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col pt-20">
            <Navbar />

            {/* ===== HERO ===== */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left */}
                        <div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 text-cyan-400 font-mono text-sm bg-cyan-400/10 border border-cyan-400/20 px-4 py-2 rounded-full mb-6">
                                <Terminal size={14} /> {'> yuvan_tech_support.exe'}
                            </motion.div>

                            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tight">
                                Your PC <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-accent">
                                    Deserves the Best.
                                </span>
                            </motion.h1>

                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                className="text-gray-400 text-lg leading-relaxed max-w-lg mb-10">
                                Industry-certified computer repair, upgrades, and IT solutions. From consumer laptops to enterprise servers — we fix it right the first time.
                            </motion.p>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                className="flex flex-wrap gap-4">
                                <Link to="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-black font-black rounded-xl transition-colors shadow-lg shadow-cyan-500/30 text-sm tracking-wide">
                                    Book a Free Diagnosis <Cpu size={16} />
                                </Link>
                                <a href="#services"
                                    className="inline-flex items-center gap-2 px-8 py-4 border border-gray-700 hover:border-cyan-400 text-gray-300 hover:text-white font-bold rounded-xl transition-all text-sm">
                                    View Services <Monitor size={16} />
                                </a>
                            </motion.div>

                            {/* Quick specs */}
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                                className="grid grid-cols-2 gap-3 mt-10">
                                {specs.map((s, i) => (
                                    <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-3 flex items-center gap-3">
                                        <span className={s.color}>{s.icon}</span>
                                        <div>
                                            <p className={`font-black text-lg leading-none ${s.color}`}>{s.value}</p>
                                            <p className="text-gray-500 text-[10px] font-mono mt-0.5">{s.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right: Diagnostic Panel + CPU */}
                        <div className="flex flex-col gap-5">
                            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                                <DiagnosticPanel />
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                                <CpuBars />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== SERVICES ===== */}
            <section id="services" className="py-24 relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            className="text-cyan-400 font-mono text-sm tracking-widest mb-3 flex justify-center items-center gap-2">
                            <Database size={14} /> {'// service_catalog'}
                        </motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                            What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Fix & Build</span>
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

                                <span className="inline-block text-[10px] font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded-md mb-3 uppercase tracking-widest">
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
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/5 blur-[100px] pointer-events-none rounded-full" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            className="text-cyan-400 font-mono text-sm tracking-widest mb-3 flex justify-center items-center gap-2">
                            <Terminal size={14} /> {'// repair_workflow'}
                        </motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Repair Process</span>
                        </motion.h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {process.map((p, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                                className="relative bg-gray-900 border border-gray-800 rounded-2xl p-7 hover:border-cyan-500/50 transition-colors group">
                                <div className="text-6xl font-black text-gray-800 group-hover:text-cyan-500/20 transition-colors absolute top-5 right-5 select-none">{p.step}</div>
                                <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center mb-5">
                                    <CheckCircle size={20} className="text-cyan-400" />
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

            {/* ===== WARRANTY STRIP ===== */}
            <section className="py-16 bg-gray-950 border-y border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { icon: <Shield size={32} className="text-cyan-400 mx-auto mb-3" />, title: '1-Year Parts Warranty', desc: 'Every component we install is covered for a full year. Period.' },
                            { icon: <AlertTriangle size={32} className="text-amber-400 mx-auto mb-3" />, title: 'No Fix, No Fee', desc: "If we can't fix it, you pay nothing. No hidden diagnostic charges." },
                            { icon: <Zap size={32} className="text-green-400 mx-auto mb-3" />, title: 'Same-Day Turnaround', desc: 'Most repairs completed within 4-8 hours. Complex jobs within 24 hrs.' },
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
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.06)_0%,transparent_70%)]" />
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center px-4 relative z-10">
                    <motion.div animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 10, ease: 'linear' }} className="inline-block mb-6">
                        <Cpu size={64} className="text-cyan-400" strokeWidth={1} />
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        PC Acting Up? <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">We'll Fix It Fast.</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                        Bring your device in or call us for on-site service. Free diagnosis. Transparent pricing. 1-year warranty.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/contact"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-cyan-500 hover:bg-cyan-600 text-black font-black rounded-2xl transition-all shadow-2xl shadow-cyan-500/30 text-base">
                            Book Free Diagnosis <Monitor size={20} />
                        </Link>
                        <a href="tel:+919557300217"
                            className="inline-flex items-center gap-3 px-10 py-5 border border-gray-700 hover:border-cyan-400 text-white font-bold rounded-2xl transition-all text-base">
                            Call Now +91-9557300217
                        </a>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default ComputerSolutions;
