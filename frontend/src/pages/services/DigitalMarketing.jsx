import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    TrendingUp, Search, BarChart3, Target, Globe, Megaphone,
    ArrowUpRight, CheckCircle, Zap, Star, Users, Eye,
    Instagram, Facebook, Youtube, Mail
} from 'lucide-react';

// ---- Animated Growth Chart ----
const GrowthChart = () => {
    const points = [20, 35, 28, 55, 45, 72, 65, 90, 82, 100];
    const maxH = 100;
    const w = 100 / (points.length - 1);

    const polyline = points.map((y, x) => `${x * w},${maxH - y}`).join(' ');

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Organic Traffic Growth</p>
                    <p className="text-2xl font-black text-gray-900 mt-0.5">+340% <span className="text-green-500 text-sm font-semibold">↑ YoY</span></p>
                </div>
                <div className="flex items-center gap-1.5 bg-green-50 border border-green-100 text-green-600 text-xs font-bold px-3 py-1.5 rounded-full">
                    <TrendingUp size={12} /> GROWING
                </div>
            </div>
            <div className="relative h-28">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                    {/* Gradient fill */}
                    <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <polygon
                        points={`0,${maxH} ${polyline} 100,${maxH}`}
                        fill="url(#chartGrad)"
                    />
                    <motion.polyline
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        points={polyline}
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    {/* Highlight dot */}
                    <circle cx="100" cy="0" r="3" fill="#6366f1" />
                </svg>
            </div>
            <div className="flex justify-between mt-2">
                {['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map(m => (
                    <span key={m} className="text-[9px] text-gray-400 font-mono">{m}</span>
                ))}
            </div>
        </div>
    );
};

// ---- SEO Rank Cards ----
const SeoRankCard = () => {
    const keywords = [
        { kw: 'digital marketing agency', rank: 1, change: '+12' },
        { kw: 'seo services haridwar', rank: 2, change: '+8' },
        { kw: 'social media management', rank: 3, change: '+5' },
        { kw: 'google ads management', rank: 4, change: '+19' },
    ];
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
                <Search size={16} className="text-blue-600" />
                <p className="text-sm font-bold text-gray-700">Top Keyword Rankings</p>
                <span className="ml-auto text-[10px] font-mono text-gray-400">Google · India</span>
            </div>
            <div className="space-y-3">
                {keywords.map((k, i) => (
                    <motion.div key={i}
                        initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0
                            ${i === 0 ? 'bg-amber-100 text-amber-600' : i === 1 ? 'bg-gray-100 text-gray-500' : 'bg-orange-50 text-orange-400'}`}>
                            #{k.rank}
                        </div>
                        <p className="flex-1 text-xs text-gray-600 truncate">{k.kw}</p>
                        <span className="text-xs font-bold text-green-500">↑{k.change}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// ---- Social Stats ----
const SocialStats = () => (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-lg">
        <p className="text-sm font-bold text-gray-700 mb-4">Weekly Engagement</p>
        <div className="grid grid-cols-2 gap-3">
            {[
                { icon: <Instagram size={16} />, label: 'Instagram', val: '12.4K', color: 'bg-pink-50 text-pink-500 border-pink-100' },
                { icon: <Facebook size={16} />, label: 'Facebook', val: '8.1K', color: 'bg-blue-50 text-blue-500 border-blue-100' },
                { icon: <Youtube size={16} />, label: 'YouTube', val: '5.7K', color: 'bg-red-50 text-red-500 border-red-100' },
                { icon: <Globe size={16} />, label: 'Website', val: '22K', color: 'bg-blue-50 text-blue-600 border-blue-100' },
            ].map((s, i) => (
                <div key={i} className={`flex flex-col items-center p-3 border rounded-xl ${s.color}`}>
                    {s.icon}
                    <p className="text-xl font-black mt-1">{s.val}</p>
                    <p className="text-[10px] opacity-70 font-mono">{s.label}</p>
                </div>
            ))}
        </div>
    </div>
);

const services = [
    {
        icon: <Search size={28} />,
        title: 'Search Engine Optimization',
        desc: 'On-page, off-page, technical SEO and link building strategies that rank your website on page 1 and keep it there.',
        gradient: 'from-blue-500 to-blue-600',
        light: 'bg-blue-50 text-blue-600',
        badge: 'Page 1 Results',
    },
    {
        icon: <BarChart3 size={28} />,
        title: 'Content Marketing',
        desc: 'Data-driven blog posts, infographics, and long-form content that attracts organic traffic and establishes your brand as an authority.',
        gradient: 'from-blue-500 to-cyan-500',
        light: 'bg-blue-50 text-blue-600',
        badge: 'Authority Building',
    },
    {
        icon: <Instagram size={28} />,
        title: 'Social Media Management',
        desc: 'End-to-end management of Instagram, Facebook, LinkedIn, and YouTube. Content calendars, posting, community management, and growth.',
        gradient: 'from-pink-500 to-rose-500',
        light: 'bg-pink-50 text-pink-600',
        badge: 'All Platforms',
    },
    {
        icon: <Mail size={28} />,
        title: 'Email Marketing',
        desc: 'Segmented campaigns, drip sequences, and broadcast emails with A/B tested subject lines and conversion-focused copywriting.',
        gradient: 'from-amber-500 to-orange-500',
        light: 'bg-amber-50 text-amber-600',
        badge: '45%+ Open Rate',
    },
    {
        icon: <Target size={28} />,
        title: 'Competitor Analysis',
        desc: 'Deep-dive analysis of your competitors — their SEO, backlinks, social, and ad strategies — so you can outrank and outperform them.',
        gradient: 'from-emerald-500 to-teal-500',
        light: 'bg-emerald-50 text-emerald-600',
        badge: 'Data-Driven',
    },
    {
        icon: <Eye size={28} />,
        title: 'Analytics & Reporting',
        desc: 'Monthly dashboard reports with actionable insights — traffic, conversions, rankings, and ROI data in plain English, not jargon.',
        gradient: 'from-red-500 to-blue-600',
        light: 'bg-red-50 text-red-600',
        badge: 'Monthly Reports',
    },
];

const process = [
    { step: '01', title: 'Audit & Research', desc: 'Complete SEO audit, competitor research, keyword gap analysis, and brand voice definition.' },
    { step: '02', title: 'Strategy Build', desc: 'We build a 90-day content and SEO roadmap tailored to your goals and target audience.' },
    { step: '03', title: 'Execution', desc: 'Content creation, link building, social posting, and ad management executed weekly.' },
    { step: '04', title: 'Report & Refine', desc: 'Monthly analytics review, strategy refinement, and scaling what works for compounding growth.' },
];

const results = [
    { value: '340%', label: 'Avg. Traffic Growth', icon: <TrendingUp size={20} /> },
    { value: '5x', label: 'Lead Generation Increase', icon: <Users size={20} /> },
    { value: '#1', label: 'Google Rankings Achieved', icon: <Star size={20} /> },
    { value: '12+', label: 'Industries Served', icon: <Globe size={20} /> },
];

const DigitalMarketing = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen bg-white text-gray-900 flex flex-col pt-20">
            <Navbar />

            {/* ===== HERO ===== */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-white via-blue-50/60 to-blue-50/40">
                {/* Dot grid */}
                <div className="absolute inset-0 opacity-40"
                    style={{ backgroundImage: 'radial-gradient(circle, #6366f120 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                {/* Blobs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-200/30 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-200/20 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left */}
                        <div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm bg-blue-50 border border-blue-100 px-4 py-2 rounded-full mb-6">
                                <TrendingUp size={14} /> Digital Marketing & Growth
                            </motion.div>

                            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tight text-gray-900">
                                Grow Online. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-red-600 to-blue-600">
                                    Dominate Search.
                                </span>
                            </motion.h1>

                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                className="text-gray-500 text-lg leading-relaxed max-w-lg mb-10">
                                Data-driven digital marketing strategies that drive real, measurable growth. SEO, content, social media, and analytics — all under one roof.
                            </motion.p>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                className="flex flex-wrap gap-4">
                                <Link to="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-colors shadow-lg shadow-blue-500/30 text-sm tracking-wide">
                                    Get a Free SEO Audit <ArrowUpRight size={16} />
                                </Link>
                                <a href="#services"
                                    className="inline-flex items-center gap-2 px-8 py-4 border border-gray-200 hover:border-blue-400 text-gray-600 hover:text-blue-600 font-bold rounded-xl transition-all text-sm bg-white shadow-sm">
                                    Our Services <BarChart3 size={16} />
                                </a>
                            </motion.div>

                            {/* Results pills */}
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                                className="grid grid-cols-2 gap-3 mt-10">
                                {results.map((r, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
                                        <span className="text-blue-600">{r.icon}</span>
                                        <div>
                                            <p className="font-black text-xl text-blue-600 leading-none">{r.value}</p>
                                            <p className="text-gray-400 text-[10px] mt-0.5">{r.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right: Dashboard widgets */}
                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                            className="flex flex-col gap-4">
                            <GrowthChart />
                            <div className="grid grid-cols-2 gap-4">
                                <SeoRankCard />
                                <SocialStats />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== SERVICES ===== */}
            <section id="services" className="py-24 bg-gray-50 relative">
                <div className="absolute inset-0 opacity-30"
                    style={{ backgroundImage: 'radial-gradient(circle, #6366f115 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            className="text-blue-600 font-semibold text-sm tracking-widest mb-3 flex justify-center items-center gap-2 uppercase">
                            <Megaphone size={14} /> What We Deliver
                        </motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                            Full-Funnel <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">Marketing</span>
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((s, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                className="group bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                                {/* Top gradient strip */}
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />

                                <div className={`w-14 h-14 rounded-xl ${s.light} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    {s.icon}
                                </div>

                                <span className={`inline-block text-[10px] font-semibold ${s.light} border border-current/20 px-2 py-0.5 rounded-full mb-3 uppercase tracking-widest`}>
                                    {s.badge}
                                </span>

                                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>

                                <div className={`mt-5 flex items-center gap-1 text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity`}>
                                    Learn more <ArrowUpRight size={14} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== WHY US strip ===== */}
            <section className="py-16 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { icon: <BarChart3 size={32} className="text-blue-600 mx-auto mb-3" />, title: 'Data Before Decisions', desc: 'Every strategy is backed by keyword research, competitor data, and audience analytics — not guesswork.' },
                            { icon: <Zap size={32} className="text-amber-500 mx-auto mb-3" />, title: 'Results in 90 Days', desc: 'Our structured 90-day sprint model delivers measurable SEO and traffic growth within the first quarter.' },
                            { icon: <TrendingUp size={32} className="text-green-500 mx-auto mb-3" />, title: 'Compounding Growth', desc: 'Unlike ads that stop when you pause, our organic strategies compound over time — growing your brand every month.' },
                        ].map((w, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                                {w.icon}
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{w.title}</h3>
                                <p className="text-gray-500 text-sm">{w.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PROCESS ===== */}
            <section className="py-24 bg-gray-50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            className="text-blue-600 font-semibold text-sm tracking-widest mb-3 uppercase">Our Process</motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                            How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">Grow You</span>
                        </motion.h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {process.map((p, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                                className="relative bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-lg hover:border-blue-200 transition-all group shadow-sm">
                                <div className="text-6xl font-black text-gray-100 group-hover:text-indigo-100 transition-colors absolute top-5 right-5 select-none">{p.step}</div>
                                <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center mb-5">
                                    <CheckCircle size={20} className="text-blue-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">{p.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                                {i < process.length - 1 && (
                                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-gray-300 z-10 text-2xl">›</div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-blue-700 to-blue-800" />
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center px-4 relative z-10">
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="inline-block mb-6">
                        <TrendingUp size={64} className="text-white/80" strokeWidth={1.5} />
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Ready to Rank #1 <br /> on Google?
                    </h2>
                    <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">
                        Get a free SEO audit and digital strategy session. Zero commitment — just real insights about your online growth potential.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/contact"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-700 font-black rounded-2xl transition-all shadow-2xl shadow-black/20 text-base hover:bg-blue-50">
                            Get Free SEO Audit <ArrowUpRight size={20} />
                        </Link>
                        <a href="tel:+919557300217"
                            className="inline-flex items-center gap-3 px-10 py-5 border border-white/40 hover:border-white text-white font-bold rounded-2xl transition-all text-base">
                            Call +91-9557300217
                        </a>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default DigitalMarketing;
