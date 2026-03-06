import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    Globe, Database, Layers, Zap, Shield, Code2,
    Terminal, ArrowUpRight, CheckCircle, Server,
    Layout, RefreshCw, BarChart3, Lock, Cpu, Cloud
} from 'lucide-react';

// ---- Typing effect ----
const useTypingEffect = (lines, speed = 35) => {
    const [displayed, setDisplayed] = useState('');
    const [lineIdx, setLineIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    useEffect(() => {
        if (lineIdx >= lines.length) return;
        if (charIdx < lines[lineIdx].length) {
            const t = setTimeout(() => setCharIdx(c => c + 1), speed);
            return () => clearTimeout(t);
        } else {
            const t = setTimeout(() => { setLineIdx(l => l + 1); setCharIdx(0); }, 500);
            return () => clearTimeout(t);
        }
    }, [charIdx, lineIdx]);
    useEffect(() => {
        setDisplayed(lines.slice(0, lineIdx).join('\n') + (lineIdx < lines.length ? '\n' + lines[lineIdx].slice(0, charIdx) : ''));
    }, [charIdx, lineIdx]);
    return displayed;
};

const terminalLines = [
    '$ yuvan init "enterprise-webapp"',
    '✔ Scaffolding Next.js 14 + TypeScript...',
    '✔ Setting up PostgreSQL + Prisma ORM...',
    '✔ Configuring authentication (NextAuth)...',
    '✔ Building REST & GraphQL API layer...',
    '✔ Deploying to cloud infrastructure...',
    '✔ SSL • CDN • Auto-scaling configured',
    '🚀 Web app live at your-business.com',
];

// ---- Animated App Dashboard Mockup ----
const DashboardMockup = () => {
    const barData = [65, 89, 45, 92, 70, 83, 55, 97, 62, 88];
    return (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <div className="flex-1 mx-4 bg-gray-700 rounded-lg px-3 py-1 flex items-center gap-2">
                    <Lock size={10} className="text-green-400" />
                    <span className="text-gray-400 text-xs font-mono">app.yourclient.com/dashboard</span>
                </div>
            </div>

            {/* App layout */}
            <div className="flex h-64">
                {/* Sidebar */}
                <div className="w-32 bg-gray-950 border-r border-gray-800 p-3 flex flex-col gap-2">
                    <div className="h-2 bg-accent/60 rounded w-3/4 mb-2" />
                    {['Dashboard', 'Analytics', 'Users', 'Reports', 'Settings'].map((item, i) => (
                        <div key={i} className={`h-5 rounded flex items-center px-2 gap-1.5 ${i === 0 ? 'bg-accent/20 border border-accent/30' : ''}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-accent' : 'bg-gray-700'}`} />
                            <div className={`h-1.5 rounded flex-1 ${i === 0 ? 'bg-accent/50' : 'bg-gray-800'}`} />
                        </div>
                    ))}
                </div>

                {/* Main content */}
                <div className="flex-1 bg-gray-950 p-4">
                    {/* Stat cards */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        {[
                            { label: 'Revenue', val: '₹4.2L', color: 'text-green-400' },
                            { label: 'Users', val: '12.4K', color: 'text-blue-400' },
                            { label: 'Uptime', val: '99.9%', color: 'text-cyan-400' },
                        ].map((s, i) => (
                            <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-2">
                                <p className="text-gray-600 text-[8px] font-mono">{s.label}</p>
                                <p className={`text-sm font-black ${s.color} mt-0.5`}>{s.val}</p>
                            </div>
                        ))}
                    </div>

                    {/* Chart */}
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-3">
                        <p className="text-gray-600 text-[8px] font-mono mb-2">Activity · Last 10 Days</p>
                        <div className="flex items-end gap-1 h-14">
                            {barData.map((h, i) => (
                                <motion.div key={i}
                                    animate={{ height: [`${h}%`, `${Math.min(h + 12, 100)}%`, `${h}%`] }}
                                    transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.2 }}
                                    className="flex-1 bg-gradient-to-t from-accent to-cyan-400 rounded-t-sm opacity-80"
                                    style={{ height: `${h}%` }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const services = [
    {
        icon: <Layout size={28} />,
        title: 'SaaS & Dashboard Apps',
        desc: 'Full-stack SaaS platforms — multi-tenant architecture, subscription billing, role-based access, and analytics dashboards.',
        color: 'from-accent to-blue-600',
        glow: 'rgba(59,130,246,0.2)',
        badge: 'Multi-Tenant Ready',
    },
    {
        icon: <Database size={28} />,
        title: 'Custom CRM & ERP Systems',
        desc: 'Tailored CRM, inventory management, and ERP systems built around your exact business workflow — not a generic off-the-shelf tool.',
        color: 'from-violet-500 to-purple-700',
        glow: 'rgba(139,92,246,0.2)',
        badge: 'Fully Custom',
    },
    {
        icon: <Globe size={28} />,
        title: 'Progressive Web Apps (PWA)',
        desc: 'App-like experiences in the browser. Offline support, push notifications, installable on any device — no App Store needed.',
        color: 'from-cyan-400 to-teal-500',
        glow: 'rgba(20,184,166,0.2)',
        badge: 'Offline First',
    },
    {
        icon: <Server size={28} />,
        title: 'API Development & Integration',
        desc: 'RESTful and GraphQL APIs, third-party integrations (payment gateways, ERPs, CRMs), and microservices architecture.',
        color: 'from-amber-400 to-orange-500',
        glow: 'rgba(251,146,60,0.2)',
        badge: 'Microservices',
    },
    {
        icon: <Shield size={28} />,
        title: 'Auth & Security Layer',
        desc: 'JWT, OAuth2, SSO, 2FA, RBAC — enterprise-grade authentication and security hardening built in from the foundation.',
        color: 'from-emerald-400 to-green-600',
        glow: 'rgba(16,185,129,0.2)',
        badge: 'Enterprise Auth',
    },
    {
        icon: <Cloud size={28} />,
        title: 'Cloud Deploy & DevOps',
        desc: 'AWS / GCP / Vercel deployment with CI/CD pipelines, auto-scaling, SSL, CDN, monitoring, and 99.9% uptime guarantees.',
        color: 'from-rose-400 to-pink-600',
        glow: 'rgba(244,63,94,0.2)',
        badge: '99.9% Uptime',
    },
];

const techStack = [
    { name: 'Next.js', icon: '▲', role: 'Full-Stack Framework' },
    { name: 'React', icon: '⚛', role: 'UI Library' },
    { name: 'Node.js', icon: '🟢', role: 'Backend Runtime' },
    { name: 'PostgreSQL', icon: '🐘', role: 'Database' },
    { name: 'Prisma ORM', icon: '◆', role: 'Data Layer' },
    { name: 'Redis', icon: '🔴', role: 'Caching' },
    { name: 'Docker', icon: '🐳', role: 'Containerization' },
    { name: 'AWS / GCP', icon: '☁️', role: 'Cloud Infrastructure' },
];

const process = [
    { step: '01', title: 'Discovery & Architecture', desc: 'We map your system requirements, data models, and user flows into a solid technical architecture blueprint.' },
    { step: '02', title: 'UI/UX Design', desc: 'High-fidelity Figma prototypes designed for your end-users — reviewed and approved before a single line of code is written.' },
    { step: '03', title: 'Agile Development', desc: 'Two-week sprints with live demos. Full-stack feature delivery — frontend, backend, database, and API — every cycle.' },
    { step: '04', title: 'Deploy & Support', desc: 'CI/CD pipeline, cloud deployment, monitoring setup, and ongoing maintenance so your app stays fast and secure.' },
];

const stats = [
    { value: '99.9%', label: 'Uptime SLA', color: 'text-accent' },
    { value: '<100ms', label: 'API Response Time', color: 'text-cyan-400' },
    { value: '50+', label: 'Apps Shipped', color: 'text-violet-400' },
    { value: '∞', label: 'Scalability', color: 'text-amber-400' },
];

const WebApps = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const terminal = useTypingEffect(terminalLines, 35);

    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col pt-20">
            <Navbar />

            {/* ===== HERO ===== */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-accent/8 blur-[130px] rounded-full pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left */}
                        <div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 text-accent font-mono text-sm bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-6">
                                <Terminal size={14} /> {'> yuvan --build enterprise-app'}
                            </motion.div>

                            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tight">
                                Web Apps That <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan-400 to-violet-400">
                                    Scale Infinitely.
                                </span>
                            </motion.h1>

                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                className="text-gray-400 text-lg leading-relaxed max-w-lg mb-10">
                                Full-stack web applications built with enterprise-grade architecture. From SaaS platforms to custom CRMs — engineered to perform, built to last, designed to impress.
                            </motion.p>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                className="flex flex-wrap gap-4">
                                <Link to="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-blue-600 text-white font-black rounded-xl transition-colors shadow-lg shadow-accent/30 text-sm tracking-wide">
                                    Start Your Project <ArrowUpRight size={16} />
                                </Link>
                                <a href="#stack"
                                    className="inline-flex items-center gap-2 px-8 py-4 border border-gray-700 hover:border-accent text-gray-300 hover:text-white font-bold rounded-xl transition-all text-sm">
                                    View Tech Stack <Code2 size={16} />
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

                        {/* Right: Dashboard + Terminal */}
                        <div className="flex flex-col gap-5">
                            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                                <DashboardMockup />
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                                <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-xl">
                                    <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
                                        <span className="w-3 h-3 rounded-full bg-red-500" />
                                        <span className="w-3 h-3 rounded-full bg-yellow-400" />
                                        <span className="w-3 h-3 rounded-full bg-green-500" />
                                        <span className="ml-4 text-gray-500 text-xs font-mono">yuvan-webapp-studio</span>
                                    </div>
                                    <div className="p-5 font-mono text-xs min-h-[120px]">
                                        <pre className="text-green-400 whitespace-pre-wrap leading-6">
                                            {terminal}
                                            <span className="animate-pulse text-accent">█</span>
                                        </pre>
                                    </div>
                                </div>
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
                            className="text-accent font-mono text-sm tracking-widest mb-3 flex justify-center items-center gap-2">
                            <Layers size={14} /> {'// what_we_engineer'}
                        </motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                            What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">Build</span>
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
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>{s.icon}</div>
                                <span className="inline-block text-[10px] font-mono text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-md mb-3 uppercase tracking-widest">{s.badge}</span>
                                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TECH STACK ===== */}
            <section id="stack" className="py-20 bg-gray-900/40 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            className="text-accent font-mono text-sm tracking-widest mb-3">{'// tech_stack'}</motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-black text-white">
                            Built With <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">Industry-Standard Tools</span>
                        </motion.h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                        {techStack.map((t, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                                whileHover={{ y: -4, scale: 1.05 }}
                                className="bg-gray-900 border border-gray-800 hover:border-accent/40 rounded-xl p-4 text-center transition-all duration-300 group">
                                <div className="text-2xl mb-2">{t.icon}</div>
                                <p className="text-white text-xs font-bold leading-tight">{t.name}</p>
                                <p className="text-gray-600 text-[9px] font-mono mt-1">{t.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PROCESS ===== */}
            <section className="py-24 bg-gray-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            className="text-accent font-mono text-sm tracking-widest mb-3 flex justify-center items-center gap-2">
                            <Terminal size={14} /> {'// build_pipeline'}
                        </motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                            Idea to <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">Production</span>
                        </motion.h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {process.map((p, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                                className="relative bg-gray-900 border border-gray-800 rounded-2xl p-7 hover:border-accent/50 transition-colors group">
                                <div className="text-6xl font-black text-gray-800 group-hover:text-accent/20 transition-colors absolute top-5 right-5 select-none">{p.step}</div>
                                <div className="w-10 h-10 bg-accent/10 border border-accent/30 rounded-xl flex items-center justify-center mb-5">
                                    <CheckCircle size={20} className="text-accent" />
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
            <section className="py-16 bg-gray-900 border-y border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { icon: <Shield size={32} className="text-accent mx-auto mb-3" />, title: 'Source Code Ownership', desc: 'You own 100% of the source code. No vendor lock-in. Ever.' },
                            { icon: <RefreshCw size={32} className="text-cyan-400 mx-auto mb-3" />, title: '6-Month Free Support', desc: 'Post-launch bug fixes, updates, and technical support included for 6 months.' },
                            { icon: <Zap size={32} className="text-amber-400 mx-auto mb-3" />, title: 'Performance Guaranteed', desc: '<2s page load, 90+ Lighthouse score, and 99.9% uptime guaranteed on every app we ship.' },
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
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]" />
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center px-4 relative z-10">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: 'linear' }} className="inline-block mb-6">
                        <Globe size={64} className="text-accent" strokeWidth={1} />
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Have an App Idea? <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan-400">Let's Build It Right.</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                        From concept to cloud — we architect, design, build, and ship full-stack web applications that your users love and your business scales on.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/contact"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-accent hover:bg-blue-600 text-white font-black rounded-2xl transition-all shadow-2xl shadow-accent/30 text-base">
                            Discuss My Project <ArrowUpRight size={20} />
                        </Link>
                        <a href="tel:+919557300217"
                            className="inline-flex items-center gap-3 px-10 py-5 border border-gray-700 hover:border-accent text-white font-bold rounded-2xl transition-all text-base">
                            Call +91-9557300217
                        </a>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default WebApps;
