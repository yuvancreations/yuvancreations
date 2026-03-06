import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    Camera, Film, Image, Video, Scissors, Music, Aperture,
    ArrowUpRight, CheckCircle, Play, Eye, Layers, Zap, Star
} from 'lucide-react';

// ---- Film strip REEL animation ----
const filmFrames = ['🌄', '🏙️', '🎬', '👰', '🎪', '🌿', '🎭', '🏔️'];

const FilmStrip = () => (
    <div className="relative overflow-hidden h-24 flex items-center">
        <motion.div
            className="flex gap-3 absolute"
            animate={{ x: [0, -600] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
        >
            {[...filmFrames, ...filmFrames, ...filmFrames].map((f, i) => (
                <div key={i} className="w-20 h-20 bg-gray-800 border-2 border-gray-700 rounded-lg flex items-center justify-center text-3xl flex-shrink-0 shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gray-900 flex items-center justify-around px-1">
                        {[1, 2, 3, 4].map(n => <div key={n} className="w-1 h-1 bg-gray-700 rounded-full" />)}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-900 flex items-center justify-around px-1">
                        {[1, 2, 3, 4].map(n => <div key={n} className="w-1 h-1 bg-gray-700 rounded-full" />)}
                    </div>
                    {f}
                </div>
            ))}
        </motion.div>
    </div>
);

// ---- Video timeline component ----
const Timeline = () => {
    const clips = [
        { label: 'Raw Footage', color: 'bg-blue-800', w: 'w-32' },
        { label: 'Color Grade', color: 'bg-orange-700', w: 'w-24' },
        { label: 'Music', color: 'bg-green-800', w: 'w-40' },
        { label: 'SFX', color: 'bg-purple-800', w: 'w-20' },
        { label: 'Title Card', color: 'bg-red-800', w: 'w-16' },
        { label: 'Export', color: 'bg-cyan-800', w: 'w-12' },
    ];
    return (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-gray-400 text-xs font-mono">YuvanCreations_Final_v3.prproj</span>
                <div className="ml-auto flex items-center gap-3 text-gray-500 text-xs font-mono">
                    <span>00:00:45:12</span>
                    <span className="text-cyan-400">▶ 4K/60fps</span>
                </div>
            </div>
            {/* Preview area */}
            <div className="h-32 bg-gray-950 flex items-center justify-center relative">
                <div className="w-40 h-24 bg-gray-800 rounded border border-gray-700 flex items-center justify-center">
                    <motion.div
                        animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-4xl"
                    >🎬</motion.div>
                </div>
                <div className="absolute top-2 right-3 font-mono text-xs text-red-400 flex items-center gap-1">
                    <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 rounded-full bg-red-500" />
                    REC
                </div>
            </div>
            {/* Timeline tracks */}
            <div className="p-4 space-y-2">
                {clips.map((c, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className="text-gray-600 text-xs font-mono w-20 text-right flex-shrink-0">{c.label}</div>
                        <div className="flex-1 h-6 bg-gray-800 rounded relative overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: c.w }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className={`absolute left-0 top-0 h-full ${c.color} rounded flex items-center px-2 overflow-hidden`}
                            >
                                <span className="text-white text-[10px] font-mono whitespace-nowrap opacity-70">{c.label}</span>
                            </motion.div>
                        </div>
                    </div>
                ))}
                {/* Playhead */}
                <div className="relative h-1">
                    <motion.div
                        animate={{ left: ['5%', '60%', '5%'] }}
                        transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                        className="absolute top-0 w-px h-full bg-red-400 shadow-[0_0_6px_rgba(248,113,113,1)]"
                        style={{ height: '180px', marginTop: '-170px' }}
                    />
                </div>
            </div>
        </div>
    );
};

// ---- Aperture spinner ----
const ApertureSpinner = () => (
    <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
        className="text-amber-400"
    >
        <Aperture size={64} strokeWidth={1} />
    </motion.div>
);

const services = [
    {
        icon: <Camera size={30} />,
        title: 'Product Photography',
        desc: 'Studio-quality product imagery that converts. Clean backgrounds, perfect lighting, and post-editing for e-commerce and branding.',
        color: 'from-amber-400 to-orange-500',
        glow: 'rgba(251,146,60,0.2)',
        tools: ['Adobe Lightroom', 'Studio Lighting', '4K Resolution'],
    },
    {
        icon: <Image size={30} />,
        title: 'Portrait & Event Photography',
        desc: 'From corporate headshots to wedding ceremonies, we capture raw human moments in stunning detail.',
        color: 'from-rose-400 to-pink-600',
        glow: 'rgba(244,63,94,0.2)',
        tools: ['Full-Frame DSLRs', 'Golden Hour Shoots', 'Same-day Preview'],
    },
    {
        icon: <Film size={30} />,
        title: 'Cinematic Video Production',
        desc: 'Brand films, product reels, and cinematic storytelling crafted with professional-grade cinema lenses and stabilizers.',
        color: 'from-cyan-400 to-blue-600',
        glow: 'rgba(34,211,238,0.2)',
        tools: ['4K/60fps', 'Gimbal Stabilizer', 'Cinema Lenses'],
    },
    {
        icon: <Scissors size={30} />,
        title: 'Post-Production Editing',
        desc: 'Hollywood-grade color grading, motion graphics, sound design, and precision multi-layer editing for a polished final cut.',
        color: 'from-violet-500 to-purple-700',
        glow: 'rgba(139,92,246,0.2)',
        tools: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'],
    },
    {
        icon: <Video size={30} />,
        title: 'Reels & Short-Form Content',
        desc: 'Scroll-stopping Instagram Reels, YouTube Shorts, and TikTok videos optimized for maximum engagement and virality.',
        color: 'from-emerald-400 to-green-600',
        glow: 'rgba(16,185,129,0.2)',
        tools: ['Vertical Format', 'Trending Transitions', 'Hook Optimization'],
    },
    {
        icon: <Music size={30} />,
        title: 'Audio Production',
        desc: 'Professional voice-over recording, sound design, ASMR audio, and licensed background music mixing for your content.',
        color: 'from-yellow-400 to-amber-500',
        glow: 'rgba(234,179,8,0.2)',
        tools: ['Audition', 'Royalty-Free Music', 'Noise Removal'],
    },
];

const tools = [
    { name: 'Adobe Premiere Pro', icon: '🎬', role: 'Video Editing' },
    { name: 'DaVinci Resolve', icon: '🎨', role: 'Color Grading' },
    { name: 'After Effects', icon: '✨', role: 'Motion Graphics' },
    { name: 'Adobe Lightroom', icon: '📷', role: 'Photo Editing' },
    { name: 'Photoshop', icon: '🖼️', role: 'Retouching' },
    { name: 'Adobe Audition', icon: '🎧', role: 'Audio Mastering' },
];

const process = [
    { step: '01', title: 'Brief & Concept', desc: 'We understand your vision, brand voice, and target audience to craft a tailored production concept.' },
    { step: '02', title: 'Pre-Production', desc: 'Shot lists, locations scouted, equipment prepped & talent arranged. Zero shoot-day surprises.' },
    { step: '03', title: 'Production Day', desc: 'Our crew executes with cinema-grade gear, controlled lighting, and professional direction.' },
    { step: '04', title: 'Post & Delivery', desc: 'Color grade, edit, sound mix, and final delivery in your required format within the agreed timeline.' },
];

const stats = [
    { value: '500+', label: 'Projects Delivered' },
    { value: '4K', label: 'Max Resolution' },
    { value: '48hr', label: 'Avg. Turnaround' },
    { value: '17+', label: 'Years Experience' },
];

const MediaProduction = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col pt-20">
            <Navbar />

            {/* ===== HERO ===== */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
                {/* Dark cinematic grain overlay */}
                <div className="absolute inset-0 opacity-30"
                    style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.4\'/%3E%3C/svg%3E")' }} />
                {/* Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,black_100%)]" />
                {/* Warm amber light leak */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-500/5 blur-[120px] rounded-full" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 text-amber-400 font-mono text-sm bg-amber-400/10 border border-amber-400/20 px-4 py-2 rounded-full mb-6">
                                <Camera size={14} /> Photography & Videography
                            </motion.div>

                            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tight">
                                We Don't Just <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400">
                                    Shoot. We Create.
                                </span>
                            </motion.h1>

                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                className="text-gray-300 text-xl leading-relaxed max-w-lg mb-10 font-light italic">
                                "Every frame is a story. Every cut is an emotion."
                            </motion.p>
                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                                className="text-gray-400 text-base leading-relaxed max-w-lg mb-10">
                                Professional photography & cinematic video production for brands, events, and creators who demand nothing less than extraordinary.
                            </motion.p>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                className="flex flex-wrap gap-4">
                                <Link to="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-black font-black rounded-xl transition-all shadow-lg shadow-amber-500/30 text-sm tracking-wide">
                                    Book a Shoot <Camera size={16} />
                                </Link>
                                <a href="#services"
                                    className="inline-flex items-center gap-2 px-8 py-4 border border-gray-700 hover:border-amber-400 text-gray-300 hover:text-white font-bold rounded-xl transition-all text-sm">
                                    What We Offer <Play size={16} />
                                </a>
                            </motion.div>
                        </div>

                        {/* Right: Aperture + Film strip */}
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
                            className="flex flex-col items-center gap-8">
                            {/* Spinning aperture */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-amber-500/10 blur-3xl rounded-full" />
                                <ApertureSpinner />
                            </div>

                            {/* Film Strip */}
                            <div className="w-full">
                                <p className="text-gray-600 font-mono text-xs uppercase tracking-widest mb-3 text-center">// our_reel</p>
                                <FilmStrip />
                            </div>

                            {/* Stats row */}
                            <div className="grid grid-cols-4 gap-4 w-full">
                                {stats.map((s, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
                                        className="bg-gray-900/80 border border-gray-800 rounded-xl p-3 text-center">
                                        <p className="text-amber-400 font-black text-xl">{s.value}</p>
                                        <p className="text-gray-500 text-[10px] font-mono mt-1">{s.label}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== SERVICES GRID ===== */}
            <section id="services" className="py-24 bg-gray-950 relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            className="text-amber-400 font-mono text-sm tracking-widest mb-3 flex justify-center items-center gap-2">
                            <Film size={14} /> {'// what_we_create'}
                        </motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                            Full-Spectrum <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Creative Services</span>
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

                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {s.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-5">{s.desc}</p>

                                {/* Tool tags */}
                                <div className="flex flex-wrap gap-2">
                                    {s.tools.map(t => (
                                        <span key={t} className="text-[10px] font-mono text-gray-500 bg-gray-800 border border-gray-700 px-2 py-1 rounded-md">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== VIDEO EDITOR TIMELINE ===== */}
            <section className="py-24 bg-black/60 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 blur-[120px] pointer-events-none rounded-full" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Timeline mockup */}
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <Timeline />
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <p className="text-amber-400 font-mono text-sm tracking-widest mb-4">{'// post_production_mastery'}</p>
                            <h2 className="text-4xl font-black text-white mb-6 leading-tight">
                                Pro-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Post-Production</span>
                            </h2>
                            <p className="text-gray-400 leading-relaxed mb-8">
                                Our editing pipeline mirrors industry-standard film production workflows. We don't just cut clips — we sculpt narratives, grade color to match emotion, and mix audio that immerses your audience.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Hollywood-grade LUT color grading',
                                    'Multi-layer motion graphics & titles',
                                    'Cinematic sound design & foley',
                                    'Frame-by-frame detail retouching',
                                    'Delivery in 4K, 1080p, vertical & web formats',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                                        <CheckCircle size={16} className="text-amber-400 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== TOOLS WE USE ===== */}
            <section className="py-20 bg-gray-950 relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            className="text-amber-400 font-mono text-sm tracking-widest mb-3">{'// tools_of_the_trade'}</motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-black text-white">
                            Industry-Standard <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Software & Gear</span>
                        </motion.h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {tools.map((t, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                                whileHover={{ y: -4, scale: 1.05 }}
                                className="bg-gray-900 border border-gray-800 hover:border-amber-500/40 rounded-2xl p-5 text-center transition-all duration-300 group">
                                <div className="text-3xl mb-3">{t.icon}</div>
                                <p className="text-white text-xs font-bold leading-tight mb-1">{t.name}</p>
                                <p className="text-gray-600 text-[10px] font-mono">{t.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PROCESS TIMELINE ===== */}
            <section className="py-24 bg-black/40 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            className="text-amber-400 font-mono text-sm tracking-widest mb-3 flex justify-center items-center gap-2">
                            <Layers size={14} /> {'// production_pipeline'}
                        </motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-white uppercase">
                            From Brief to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Final Cut</span>
                        </motion.h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {process.map((p, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                                className="relative bg-gray-900 border border-gray-800 rounded-2xl p-7 hover:border-amber-500/50 transition-colors group">
                                <div className="text-6xl font-black text-gray-800 group-hover:text-amber-500/20 transition-colors absolute top-5 right-5 select-none">{p.step}</div>
                                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center mb-5">
                                    <CheckCircle size={20} className="text-amber-400" />
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

            {/* ===== CTA ===== */}
            <section className="py-24 relative overflow-hidden bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08)_0%,transparent_70%)]" />
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center px-4 relative z-10">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                        className="inline-block mb-6">
                        <Aperture size={64} className="text-amber-400" strokeWidth={1} />
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Ready to Create <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">Something Iconic?</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto font-light">
                        Whether it's a product shoot, brand film, or full event coverage — let's make it unforgettable.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/contact"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-amber-500 hover:bg-amber-600 text-black font-black rounded-2xl transition-all shadow-2xl shadow-amber-500/30 text-base">
                            Book a Session <Camera size={20} />
                        </Link>
                        <Link to="/contact"
                            className="inline-flex items-center gap-3 px-10 py-5 border border-gray-700 hover:border-amber-500 text-white font-bold rounded-2xl transition-all text-base">
                            Get a Quote <ArrowUpRight size={20} />
                        </Link>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default MediaProduction;
