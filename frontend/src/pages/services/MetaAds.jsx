import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    Facebook, Instagram, Target, BarChart3, TrendingUp,
    Users, Eye, ArrowUpRight, CheckCircle, Zap,
    MousePointer, DollarSign, RefreshCw, Star
} from 'lucide-react';

// ---- Animated Ad Preview Card ----
const AdPreview = () => (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden max-w-xs mx-auto">
        {/* Facebook-style header */}
        <div className="flex items-center gap-2 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-xs font-black">YC</div>
            <div>
                <p className="text-sm font-bold text-gray-900 leading-none">Yuvan Creations</p>
                <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">Sponsored · <Facebook size={9} className="text-blue-600" /></p>
            </div>
            <span className="ml-auto text-gray-400 text-lg">···</span>
        </div>

        {/* Ad creative */}
        <div className="relative w-full h-44 bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="text-center z-10 px-6">
                <p className="text-white font-black text-xl mb-1">Scale Your Business</p>
                <p className="text-white/80 text-xs">with High-ROI Meta Ads</p>
            </div>
            {/* Animated metric */}
            <motion.div animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-2 py-1 text-white text-[10px] font-bold">
                ROAS: 4.8x
            </motion.div>
        </div>

        {/* Ad copy */}
        <div className="px-4 py-3">
            <p className="text-sm text-gray-800 font-medium leading-snug">Get 3x more leads with precision-targeted Facebook & Instagram Ads.</p>
            <p className="text-xs text-gray-400 mt-1">yuvancreations.com</p>
        </div>

        {/* CTA button */}
        <div className="px-4 pb-4">
            <div className="w-full py-2 rounded-lg bg-blue-600 text-white text-sm font-bold text-center cursor-default">Learn More</div>
        </div>

        {/* Engagement bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 bg-gray-50">
            {[
                { icon: '👍', label: '2.4K Likes' },
                { icon: '💬', label: '184 Comments' },
                { icon: '↗', label: '312 Shares' },
            ].map((e, i) => (
                <span key={i} className="text-[10px] text-gray-500 flex items-center gap-1">{e.icon} {e.label}</span>
            ))}
        </div>
    </div>
);

// ---- Campaign Stats widget ----
const CampaignStats = () => {
    const metrics = [
        { label: 'Impressions', value: '1.2M', change: '+28%', color: 'text-blue-600' },
        { label: 'Clicks', value: '48.3K', change: '+41%', color: 'text-red-600' },
        { label: 'Conversions', value: '3,812', change: '+67%', color: 'text-green-600' },
        { label: 'ROAS', value: '4.8x', change: '+1.2x', color: 'text-pink-600' },
    ];
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
                <BarChart3 size={15} className="text-blue-600" />
                <p className="text-sm font-bold text-gray-700">Campaign Performance · Last 30 Days</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {metrics.map((m, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                        className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                        <p className="text-gray-400 text-[10px] font-medium uppercase tracking-wide">{m.label}</p>
                        <p className={`text-xl font-black ${m.color} mt-1 leading-none`}>{m.value}</p>
                        <p className="text-green-500 text-[10px] font-bold mt-1">↑ {m.change}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// ---- Audience funnel ----
const AudienceFunnel = () => {
    const stages = [
        { label: 'Awareness', pct: 100, color: 'bg-blue-500', w: 'w-full' },
        { label: 'Interest', pct: 68, color: 'bg-red-500', w: 'w-2/3' },
        { label: 'Consideration', pct: 42, color: 'bg-pink-500', w: 'w-5/12' },
        { label: 'Conversion', pct: 18, color: 'bg-green-500', w: 'w-1/5' },
    ];
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-lg">
            <p className="text-sm font-bold text-gray-700 mb-4">Audience Funnel</p>
            <div className="space-y-3">
                {stages.map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <span className="text-gray-400 text-[10px] w-24 text-right font-medium">{s.label}</span>
                        <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.pct}%` }}
                                viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.8 }}
                                className={`h-full ${s.color} rounded-full flex items-center justify-end pr-2`}>
                                <span className="text-white text-[9px] font-bold">{s.pct}%</span>
                            </motion.div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const services = [
    {
        icon: <Target size={26} />,
        title: 'Laser-Targeted Audiences',
        desc: 'Custom & Lookalike audiences built from your customer data. We target by interest, behaviour, demographics, and intent.',
        gradient: 'from-blue-500 to-blue-700',
        light: 'bg-blue-50 text-blue-600',
        badge: 'Precision Targeting',
    },
    {
        icon: <Instagram size={26} />,
        title: 'Instagram & Facebook Creatives',
        desc: 'Scroll-stopping ad creatives — static, carousel, and video — designed and A/B tested for maximum CTR and engagement.',
        gradient: 'from-pink-500 to-rose-600',
        light: 'bg-pink-50 text-pink-600',
        badge: 'High CTR Creatives',
    },
    {
        icon: <RefreshCw size={26} />,
        title: 'Retargeting Campaigns',
        desc: 'Re-engage website visitors, cart abandoners, and video viewers with personalised remarketing ads that convert.',
        gradient: 'from-red-500 to-blue-700',
        light: 'bg-red-50 text-red-600',
        badge: '3x Higher Conversion',
    },
    {
        icon: <DollarSign size={26} />,
        title: 'Budget Optimisation',
        desc: "Daily bid management, budget reallocation to top performers, and CPA reduction through continuous data-driven testing.",
        gradient: 'from-emerald-500 to-teal-600',
        light: 'bg-emerald-50 text-emerald-600',
        badge: 'Max ROAS',
    },
    {
        icon: <MousePointer size={26} />,
        title: 'Lead Generation Funnels',
        desc: 'Full-funnel ad + landing page setup. Facebook Lead Ads, Instant Forms, and WhatsApp CTA integrations for instant leads.',
        gradient: 'from-amber-500 to-orange-600',
        light: 'bg-amber-50 text-amber-600',
        badge: 'Instant Leads',
    },
    {
        icon: <BarChart3 size={26} />,
        title: 'Analytics & Pixel Setup',
        desc: 'Meta Pixel installation, Conversions API setup, custom events tracking, and monthly performance reports in plain language.',
        gradient: 'from-blue-500 to-blue-700',
        light: 'bg-blue-50 text-blue-600',
        badge: 'Full Tracking',
    },
];

const process = [
    { step: '01', title: 'Account Audit', desc: 'We audit your existing Meta Ads account (or set one up), review pixel health, and identify quick-win opportunities.' },
    { step: '02', title: 'Strategy & Creatives', desc: 'Audience research, creative briefing, and ad copy written. A/B variants prepared before launch.' },
    { step: '03', title: 'Launch & Optimise', desc: 'Campaigns go live. Daily monitoring for budget pacing, early signals, and real-time bid adjustments.' },
    { step: '04', title: 'Scale & Report', desc: 'Winning ad sets are scaled. Monthly reports share exact ROAS, CPA, and a clear roadmap for next month.' },
];

const results = [
    { value: '4.8x', label: 'Average ROAS', icon: <DollarSign size={18} />, color: 'text-blue-600' },
    { value: '67%', label: 'Avg. Conversion Lift', icon: <TrendingUp size={18} />, color: 'text-pink-600' },
    { value: '1M+', label: 'Monthly Impressions', icon: <Eye size={18} />, color: 'text-red-600' },
    { value: '3x', label: 'Lead Volume Growth', icon: <Users size={18} />, color: 'text-emerald-600' },
];

const MetaAds = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen bg-white text-gray-900 flex flex-col pt-20">
            <Navbar />

            {/* ===== HERO ===== */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-white via-blue-50/50 to-blue-50/40">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #3b82f620 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-100/30 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left */}
                        <div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm bg-blue-50 border border-blue-100 px-4 py-2 rounded-full mb-6">
                                <Facebook size={14} /> Meta Ads Management
                            </motion.div>

                            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tight">
                                Turn Scrollers <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-red-600 to-pink-500">
                                    Into Buyers.
                                </span>
                            </motion.h1>

                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                className="text-gray-500 text-lg leading-relaxed max-w-lg mb-10">
                                High-ROI Facebook & Instagram ad campaigns that generate real leads, sales, and brand awareness — managed by certified Meta Ads experts.
                            </motion.p>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                className="flex flex-wrap gap-4">
                                <Link to="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-colors shadow-lg shadow-blue-500/30 text-sm tracking-wide">
                                    Launch My Campaign <ArrowUpRight size={16} />
                                </Link>
                                <a href="#services"
                                    className="inline-flex items-center gap-2 px-8 py-4 border border-gray-200 hover:border-blue-400 text-gray-600 hover:text-blue-600 font-bold rounded-xl transition-all text-sm bg-white shadow-sm">
                                    What's Included <Target size={16} />
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

                        {/* Right: Ad preview + widgets */}
                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                            className="flex flex-col gap-4">
                            <AdPreview />
                            <div className="grid grid-cols-2 gap-4">
                                <CampaignStats />
                                <AudienceFunnel />
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
                            <Facebook size={14} /> What We Do
                        </motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                            Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600">Meta Ads Service</span>
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

            {/* ===== WHY META STRIP ===== */}
            <section className="py-16 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { icon: <Users size={32} className="text-blue-500 mx-auto mb-3" />, title: '3 Billion+ Users', desc: 'Facebook & Instagram reach over 3 billion monthly active users — your audience is already there.' },
                            { icon: <Target size={32} className="text-pink-500 mx-auto mb-3" />, title: 'Unmatched Targeting', desc: 'Target by job title, income, interests, life events, behaviour, and custom data — no other platform comes close.' },
                            { icon: <Zap size={32} className="text-amber-500 mx-auto mb-3" />, title: 'Instant Results', desc: 'Unlike SEO, Meta Ads start delivering leads from day one. Scale what works, pause what doesn\'t — in real time.' },
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
                            className="text-blue-600 font-semibold text-sm tracking-widest mb-3 uppercase">Campaign Workflow</motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                            From Brief to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600">First Lead</span>
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
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-red-600 to-pink-600" />
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center px-4 relative z-10">
                    <div className="flex justify-center gap-4 mb-8">
                        <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                            <Facebook size={48} className="text-white/90" />
                        </motion.div>
                        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}>
                            <Instagram size={48} className="text-white/90" />
                        </motion.div>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Ready for Leads <br /> That Actually Convert?
                    </h2>
                    <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                        Let's build a Meta Ads strategy that turns your ad spend into real customers. Free consultation — no commitment.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/contact"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-700 font-black rounded-2xl shadow-xl text-base hover:bg-blue-50 transition-colors">
                            Start My Campaign <ArrowUpRight size={20} />
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

export default MetaAds;
