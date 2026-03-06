import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    Search, TrendingUp, BarChart3, Target, Globe, Zap,
    ArrowUpRight, CheckCircle, MousePointer, DollarSign,
    Users, Eye, Star, Activity
} from 'lucide-react';

// ---- Animated Google Search Result ----
const SearchResult = () => {
    const [typed, setTyped] = useState('');
    const query = 'best digital marketing agency near me';
    useEffect(() => {
        if (typed.length >= query.length) return;
        const t = setTimeout(() => setTyped(query.slice(0, typed.length + 1)), 60);
        return () => clearTimeout(t);
    }, [typed]);

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
            {/* Google search bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-gray-50">
                <div className="flex gap-1">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2">
                    <Search size={13} className="text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-700 font-mono truncate">{typed}<span className="animate-pulse text-blue-500">|</span></span>
                </div>
            </div>

            {/* Results */}
            <div className="p-4 space-y-4">
                {/* Sponsored result #1 — Yuvan */}
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }}
                    className="border border-blue-100 rounded-xl p-3 bg-blue-50/50">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-bold text-gray-500 border border-gray-300 rounded px-1 py-0.5 uppercase">Sponsored</span>
                        <span className="text-[11px] text-gray-500">yuvancreations.com</span>
                    </div>
                    <p className="text-blue-700 font-bold text-sm hover:underline cursor-pointer">Yuvan Creations — #1 Digital Marketing Agency</p>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">Get 3x more leads with Google Ads. Free consultation. Results guaranteed. Call now!</p>
                </motion.div>

                {/* Organic results */}
                {['competitor-agency.com', 'anothermarketer.in'].map((url, i) => (
                    <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 + i * 0.2 }}
                        className="p-2">
                        <p className="text-[11px] text-gray-400">{url}</p>
                        <p className="text-blue-600 text-sm font-medium hover:underline cursor-pointer">Another Marketing Agency - Services</p>
                        <p className="text-gray-400 text-xs mt-0.5">Generic marketing solutions for businesses...</p>
                    </motion.div>
                ))}
            </div>

            {/* Position badge */}
            <div className="mx-4 mb-4 bg-green-50 border border-green-100 rounded-xl p-3 flex items-center gap-3">
                <Star size={16} className="text-green-600 flex-shrink-0" />
                <p className="text-green-700 text-xs font-bold">Your ad appears at position #1 on Google Search</p>
            </div>
        </div>
    );
};

// ---- Quality Score Widget ----
const QualityScore = () => {
    const scores = [
        { kw: 'digital marketing services', score: 9, color: 'text-green-600 bg-green-50' },
        { kw: 'google ads management', score: 10, color: 'text-green-600 bg-green-50' },
        { kw: 'seo company haridwar', score: 8, color: 'text-blue-600 bg-blue-50' },
        { kw: 'meta ads agency', score: 9, color: 'text-green-600 bg-green-50' },
    ];
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
                <Star size={14} className="text-amber-500" />
                <p className="text-sm font-bold text-gray-700">Quality Score · Keywords</p>
                <span className="ml-auto text-[10px] text-gray-400 font-mono">Google Ads</span>
            </div>
            <div className="space-y-3">
                {scores.map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3">
                        <p className="flex-1 text-xs text-gray-500 truncate">{s.kw}</p>
                        <span className={`text-xs font-black px-2 py-0.5 rounded-lg ${s.color}`}>{s.score}/10</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// ---- CPC Trend widget ----
const CpcStats = () => {
    const months = ['J', 'F', 'M', 'A', 'M', 'J'];
    const ctr = [2.1, 3.4, 3.0, 4.8, 4.2, 5.7];
    const max = Math.max(...ctr);
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-gray-700">CTR Trend</p>
                <span className="text-green-500 text-xs font-bold">↑ 5.7% avg</span>
            </div>
            <div className="flex items-end gap-2 h-20">
                {ctr.map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: `${(v / max) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="w-full rounded-t-md bg-gradient-to-t from-blue-600 to-cyan-400"
                            style={{ minHeight: 4 }}
                        />
                        <span className="text-[9px] text-gray-400">{months[i]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const services = [
    {
        icon: <Search size={26} />,
        title: 'Search Ad Campaigns',
        desc: 'Intent-based text ads targeting high-commercial keywords. Your ad appears exactly when someone is searching for your service.',
        gradient: 'from-blue-500 to-cyan-500',
        light: 'bg-blue-50 text-blue-600',
        badge: 'High Intent Traffic',
    },
    {
        icon: <Target size={26} />,
        title: 'Keyword Research & Planning',
        desc: 'Deep keyword research — search volume, CPC competitor data, negative keyword lists — to maximize your budget efficiency.',
        gradient: 'from-amber-500 to-orange-500',
        light: 'bg-amber-50 text-amber-600',
        badge: 'Zero Wasted Spend',
    },
    {
        icon: <Eye size={26} />,
        title: 'Display & Remarketing',
        desc: 'Visual banner ads and retargeting campaigns across 2M+ Google Display Network sites to stay top-of-mind post-visit.',
        gradient: 'from-red-500 to-blue-600',
        light: 'bg-red-50 text-red-600',
        badge: 'Brand Recall',
    },
    {
        icon: <Globe size={26} />,
        title: 'Shopping Campaigns',
        desc: 'Product listing ads for e-commerce stores. Showcase product images, prices, and reviews directly in Google Search results.',
        gradient: 'from-green-500 to-emerald-600',
        light: 'bg-green-50 text-green-600',
        badge: 'E-Commerce Ready',
    },
    {
        icon: <DollarSign size={26} />,
        title: 'Bid & Budget Management',
        desc: 'Smart bidding strategies (Target CPA, ROAS, Enhanced CPC) with daily monitoring to squeeze maximum ROI from every rupee.',
        gradient: 'from-rose-500 to-pink-600',
        light: 'bg-rose-50 text-rose-600',
        badge: 'Max ROI',
    },
    {
        icon: <BarChart3 size={26} />,
        title: 'Conversion Tracking & Reports',
        desc: 'Google Tag Manager setup, conversion actions, GA4 integration, and monthly reports with CPC, CTR, Quality Score breakdowns.',
        gradient: 'from-blue-500 to-blue-700',
        light: 'bg-blue-50 text-blue-600',
        badge: 'Full Attribution',
    },
];

const process = [
    { step: '01', title: 'Account & Keyword Audit', desc: 'Existing account reviewed (or new one set up). Competitor ads spied, keyword gaps found, Quality Scores analysed.' },
    { step: '02', title: 'Campaign Build', desc: 'Ad groups structured, ad copy written in 3+ A/B variants, extensions configured, negative keywords added.' },
    { step: '03', title: 'Launch & Optimise', desc: 'Campaigns go live. Daily search term analysis, bid adjustments, and Quality Score improvements to lower CPC.' },
    { step: '04', title: 'Scale & Report', desc: 'Winning campaigns scaled. Monthly report: impressions, clicks, conversions, ROAS, and next month\'s strategy.' },
];

const results = [
    { value: '3.2x', label: 'Average ROAS', icon: <DollarSign size={18} />, color: 'text-blue-600' },
    { value: '5.7%', label: 'Avg. CTR (3x Industry)', icon: <MousePointer size={18} />, color: 'text-cyan-600' },
    { value: '#1', label: 'Avg. Ad Position', icon: <Star size={18} />, color: 'text-amber-500' },
    { value: '42%', label: 'Avg. CPA Reduction', icon: <TrendingUp size={18} />, color: 'text-green-600' },
];

const GoogleAds = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen bg-white text-gray-900 flex flex-col pt-20">
            <Navbar />

            {/* ===== HERO ===== */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-white via-blue-50/40 to-cyan-50/30">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #3b82f618 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-100/30 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left */}
                        <div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm bg-blue-50 border border-blue-100 px-4 py-2 rounded-full mb-6">
                                <Search size={14} /> Google Ads Management
                            </motion.div>

                            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tight">
                                Be #1 on <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700">
                                    Google. Always.
                                </span>
                            </motion.h1>

                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                className="text-gray-500 text-lg leading-relaxed max-w-lg mb-10">
                                Precision-managed Google Ads campaigns that put you at the top of search results and drive ready-to-buy customers to your business — from day one.
                            </motion.p>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                className="flex flex-wrap gap-4">
                                <Link to="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-colors shadow-lg shadow-blue-500/30 text-sm tracking-wide">
                                    Launch My Ads <ArrowUpRight size={16} />
                                </Link>
                                <a href="#services"
                                    className="inline-flex items-center gap-2 px-8 py-4 border border-gray-200 hover:border-blue-400 text-gray-600 hover:text-blue-600 font-bold rounded-xl transition-all text-sm bg-white shadow-sm">
                                    View Services <Search size={16} />
                                </a>
                            </motion.div>

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                                className="grid grid-cols-2 gap-3 mt-10">
                                {results.map((r, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
                                        <span className={r.color}>{r.icon}</span>
                                        <div>
                                            <p className={`font-black text-xl ${r.color} leading-none`}>{r.value}</p>
                                            <p className="text-gray-400 text-[10px] mt-0.5">{r.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right: Search result + widgets */}
                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                            className="flex flex-col gap-4">
                            <SearchResult />
                            <div className="grid grid-cols-2 gap-4">
                                <QualityScore />
                                <CpcStats />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== SERVICES ===== */}
            <section id="services" className="py-24 bg-gray-50 relative">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #3b82f615 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            className="text-blue-600 font-semibold text-sm tracking-widest mb-3 uppercase flex justify-center items-center gap-2">
                            <Search size={14} /> What We Deliver
                        </motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                            Full-Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Google Ads</span>
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((s, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                className="group bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
                                <div className={`w-14 h-14 rounded-xl ${s.light} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>{s.icon}</div>
                                <span className={`inline-block text-[10px] font-semibold ${s.light} px-2 py-0.5 rounded-full mb-3 uppercase tracking-widest`}>{s.badge}</span>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== WHY GOOGLE STRIP ===== */}
            <section className="py-16 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { icon: <Search size={32} className="text-blue-500 mx-auto mb-3" />, title: 'Intent-Based Targeting', desc: 'Google Ads reaches people actively searching for your product or service — the highest-intent audience on the internet.' },
                            { icon: <Activity size={32} className="text-green-500 mx-auto mb-3" />, title: 'Measurable to the Rupee', desc: 'Every click, impression, and conversion tracked. Know your exact cost per lead and return on every rupee spent.' },
                            { icon: <Zap size={32} className="text-amber-500 mx-auto mb-3" />, title: 'Instant Top Position', desc: 'Skip the wait for organic rankings. Google Ads puts you at position #1 from the moment your campaign goes live.' },
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
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            className="text-blue-600 font-semibold text-sm tracking-widest mb-3 uppercase">Our Process</motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                            Setup to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">First Click</span>
                        </motion.h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {process.map((p, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                                className="relative bg-white border border-gray-100 rounded-2xl p-7 hover:shadow-lg hover:border-blue-200 transition-all group shadow-sm">
                                <div className="text-6xl font-black text-gray-100 group-hover:text-blue-100 transition-colors absolute top-5 right-5 select-none">{p.step}</div>
                                <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center mb-5">
                                    <CheckCircle size={20} className="text-blue-500" />
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
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600" />
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center px-4 relative z-10">
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="inline-block mb-6">
                        <Search size={64} className="text-white/90" strokeWidth={1.5} />
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Be Found First. <br /> Every Search. Every Time.
                    </h2>
                    <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                        Let us build and manage Google Ads campaigns that deliver real leads and measurable ROI. Free audit — no commitment.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/contact"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-700 font-black rounded-2xl shadow-xl text-base hover:bg-blue-50 transition-colors">
                            Get Free Ads Audit <ArrowUpRight size={20} />
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

export default GoogleAds;
