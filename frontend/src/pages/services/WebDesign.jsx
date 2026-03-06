import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import {
    LayoutTemplate, Palette, Figma, SearchCheck, Zap, Smartphone,
    Code2, ArrowUpRight, CheckCircle, Terminal, Globe, Layers, Eye
} from 'lucide-react';

// ---------- Animated Typing Line ----------
const useTypingEffect = (lines, speed = 40) => {
    const [displayed, setDisplayed] = useState('');
    const [lineIdx, setLineIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);

    useEffect(() => {
        if (lineIdx >= lines.length) return;
        if (charIdx < lines[lineIdx].length) {
            const t = setTimeout(() => setCharIdx(c => c + 1), speed);
            return () => clearTimeout(t);
        } else {
            const t = setTimeout(() => { setLineIdx(l => l + 1); setCharIdx(0); }, 600);
            return () => clearTimeout(t);
        }
    }, [charIdx, lineIdx]);

    useEffect(() => {
        setDisplayed(lines.slice(0, lineIdx).join('\n') + (lineIdx < lines.length ? '\n' + lines[lineIdx].slice(0, charIdx) : ''));
    }, [charIdx, lineIdx]);

    return displayed;
};

const terminalLines = [
    '$ yuvan --create "your-dream-website"',
    '✔ Analyzing brand requirements...',
    '✔ Generating UI/UX wireframes...',
    '✔ Building responsive layout...',
    '✔ Optimizing for SEO & performance...',
    '✔ Deploying to production... Done!',
    '🚀 Your website is live at yuvan.dev',
];

// ---------- Feature Cards ----------
const features = [
    {
        icon: <Palette size={28} />,
        title: 'Stunning Visuals',
        desc: 'Curated color palettes, modern typography, and precision whitespace that build instant brand authority.',
        color: 'from-pink-500 to-rose-500',
        glow: 'rgba(244,63,94,0.25)',
    },
    {
        icon: <Figma size={28} />,
        title: 'UI/UX Wireframing',
        desc: 'Interactive Figma prototypes and user flow maps before a single line of code is written.',
        color: 'from-violet-500 to-purple-600',
        glow: 'rgba(139,92,246,0.25)',
    },
    {
        icon: <SearchCheck size={28} />,
        title: 'SEO-Ready Structure',
        desc: 'Semantic HTML5, structured metadata, and Core Web Vitals optimization from the ground up.',
        color: 'from-green-400 to-emerald-500',
        glow: 'rgba(16,185,129,0.25)',
    },
    {
        icon: <Smartphone size={28} />,
        title: 'Mobile First',
        desc: 'Every pixel crafted for mobile users first, then scaled beautifully to desktop.',
        color: 'from-blue-400 to-cyan-500',
        glow: 'rgba(34,211,238,0.25)',
    },
    {
        icon: <Zap size={28} />,
        title: 'Blazing Performance',
        desc: 'Lazy loading, optimized assets, and CDN delivery for sub-second page loads.',
        color: 'from-yellow-400 to-orange-400',
        glow: 'rgba(251,146,60,0.25)',
    },
    {
        icon: <Layers size={28} />,
        title: 'Scalable Architecture',
        desc: 'Clean component-based code that scales effortlessly as your business grows.',
        color: 'from-accent to-blue-600',
        glow: 'rgba(59,130,246,0.25)',
    },
];

const process = [
    { step: '01', title: 'Discovery', desc: 'We deep-dive into your brand, target audience, and goals to craft a precise strategy.' },
    { step: '02', title: 'Wireframing', desc: 'Interactive Figma prototypes are built and reviewed before any development begins.' },
    { step: '03', title: 'Development', desc: 'We code your design with pixel-perfect precision using modern frameworks.' },
    { step: '04', title: 'Launch', desc: 'Full testing, SEO setup, and deployment. Your site goes live ready to convert.' },
];

const tech = ['React', 'Next.js', 'Tailwind CSS', 'Figma', 'Node.js', 'Vercel', 'SEO', 'CMS'];

// ---------- Main Page ----------
const WebDesign = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const terminal = useTypingEffect(terminalLines, 35);

    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col pt-20">
            <Navbar />

            {/* ===== HERO ===== */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                {/* Grid bg */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px]" />
                {/* Glow orbs */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/15 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Copy */}
                        <div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 text-cyan-400 font-mono text-sm bg-cyan-400/10 border border-cyan-400/20 px-4 py-2 rounded-full mb-6">
                                <Terminal size={14} /> {'<WebsiteDesign />'}
                            </motion.div>

                            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tight">
                                Websites That <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
                                    Actually Convert
                                </span>
                            </motion.h1>

                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                className="text-gray-400 text-lg leading-relaxed max-w-lg mb-10">
                                We blend cutting-edge design with precision engineering to build digital experiences that turn every visitor into a loyal customer.
                            </motion.p>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                className="flex flex-wrap gap-4">
                                <Link to="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-blue-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-accent/30 text-sm tracking-wide">
                                    Start Your Project <ArrowUpRight size={16} />
                                </Link>
                                <a href="#features"
                                    className="inline-flex items-center gap-2 px-8 py-4 border border-gray-700 hover:border-cyan-400 text-gray-300 hover:text-white font-bold rounded-xl transition-all text-sm">
                                    See Features <Eye size={16} />
                                </a>
                            </motion.div>

                            {/* Tech stack pills */}
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                                className="flex flex-wrap gap-2 mt-10">
                                {tech.map(t => (
                                    <span key={t} className="px-3 py-1.5 bg-gray-800/80 border border-gray-700 text-gray-300 text-xs font-mono rounded-lg hover:border-cyan-400/50 hover:text-cyan-300 transition-colors">
                                        {t}
                                    </span>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right: Animated Terminal */}
                        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                            className="relative">
                            <div className="relative bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
                                {/* Terminal top bar */}
                                <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
                                    <span className="w-3 h-3 rounded-full bg-red-500" />
                                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <span className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="ml-4 text-gray-500 text-xs font-mono">yuvan-studio ~ terminal</span>
                                </div>
                                {/* Terminal body */}
                                <div className="p-6 font-mono text-sm min-h-[280px]">
                                    <pre className="text-green-400 whitespace-pre-wrap leading-7">
                                        {terminal}
                                        <span className="animate-pulse text-cyan-400">█</span>
                                    </pre>
                                </div>
                            </div>
                            {/* Floating glow under terminal */}
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-accent/30 blur-2xl rounded-full" />

                            {/* Floating stat badges */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3 }}
                                className="absolute -top-5 -left-5 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 shadow-xl">
                                <p className="text-xs text-gray-400 font-mono">Performance Score</p>
                                <p className="text-2xl font-black text-green-400">99 / 100</p>
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
                                className="absolute -bottom-5 -right-5 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 shadow-xl">
                                <p className="text-xs text-gray-400 font-mono">Avg. Conversion Lift</p>
                                <p className="text-2xl font-black text-cyan-400">+340%</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== FEATURE CARDS ===== */}
            <section id="features" className="py-24 relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-cyan-400 font-mono tracking-widest text-sm mb-3 flex justify-center items-center gap-2">
                            <Code2 size={14} /> {'// what_we_deliver'}
                        </motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                            Everything You <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Need</span>
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                className="group relative bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-2xl p-7 overflow-hidden cursor-default transition-all duration-300"
                                style={{ '--glow': f.glow }}
                            >
                                {/* Hover glow */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                                    style={{ boxShadow: `inset 0 0 40px ${f.glow}` }} />
                                {/* Top gradient strip */}
                                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${f.color} opacity-50 group-hover:opacity-100 transition-opacity`} />

                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${f.color} bg-opacity-20 flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    {f.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PROCESS TIMELINE ===== */}
            <section className="py-24 bg-gray-900/50 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            className="text-cyan-400 font-mono text-sm tracking-widest mb-3 flex justify-center items-center gap-2">
                            <Terminal size={14} /> {'// our_process'}
                        </motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                            How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Build</span>
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {process.map((p, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                                className="relative bg-gray-900 border border-gray-800 rounded-2xl p-7 hover:border-accent/50 transition-colors group">
                                {/* Step number */}
                                <div className="text-6xl font-black text-gray-800 group-hover:text-accent/20 transition-colors absolute top-5 right-5 leading-none select-none">
                                    {p.step}
                                </div>
                                <div className="w-10 h-10 bg-accent/10 border border-accent/30 rounded-xl flex items-center justify-center mb-5">
                                    <CheckCircle size={20} className="text-accent" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                                {/* Connector arrow (not on last) */}
                                {i < process.length - 1 && (
                                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-gray-700 z-10 text-xl font-bold">›</div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== LIVE CODE PREVIEW STRIP ===== */}
            <section className="py-20 relative overflow-hidden bg-gray-950">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Code block */}
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
                                <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
                                    <span className="w-3 h-3 rounded-full bg-red-500" />
                                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <span className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="ml-4 text-gray-500 text-xs font-mono">YourWebsite.jsx</span>
                                </div>
                                <pre className="p-6 text-sm leading-7 font-mono overflow-x-auto">
                                    <span className="text-purple-400">const</span>
                                    <span className="text-blue-300"> YourWebsite</span>
                                    <span className="text-white"> = () </span>
                                    <span className="text-purple-400">=&gt;</span>
                                    <span className="text-white"> {'{'}</span>{'\n'}
                                    <span className="text-white">  </span>
                                    <span className="text-purple-400">return</span>
                                    <span className="text-white"> (</span>{'\n'}
                                    <span className="text-white">    </span>
                                    <span className="text-blue-300">&lt;div</span>
                                    <span className="text-yellow-300"> className</span>
                                    <span className="text-white">=</span>
                                    <span className="text-green-300">"premium-website"</span>
                                    <span className="text-blue-300">&gt;</span>{'\n'}
                                    <span className="text-white">      </span>
                                    <span className="text-blue-300">&lt;Hero</span>
                                    <span className="text-yellow-300"> converts</span>
                                    <span className="text-white">=</span>
                                    <span className="text-orange-300">{'{true}'}</span>
                                    <span className="text-blue-300"> /&gt;</span>{'\n'}
                                    <span className="text-white">      </span>
                                    <span className="text-blue-300">&lt;Features</span>
                                    <span className="text-yellow-300"> count</span>
                                    <span className="text-white">=</span>
                                    <span className="text-orange-300">{'{6}'}</span>
                                    <span className="text-blue-300"> /&gt;</span>{'\n'}
                                    <span className="text-white">      </span>
                                    <span className="text-blue-300">&lt;CTA</span>
                                    <span className="text-yellow-300"> action</span>
                                    <span className="text-white">=</span>
                                    <span className="text-green-300">"generateLeads"</span>
                                    <span className="text-blue-300"> /&gt;</span>{'\n'}
                                    <span className="text-white">    </span>
                                    <span className="text-blue-300">&lt;/div&gt;</span>{'\n'}
                                    <span className="text-white">  );</span>{'\n'}
                                    <span className="text-white">{'}'}</span>{'\n'}
                                    <span className="text-gray-500">{'\n'}// Result: 340% more conversions</span>
                                </pre>
                            </div>
                        </motion.div>
                        {/* Text */}
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <p className="text-cyan-400 font-mono text-sm tracking-widest mb-4">{'// built_different'}</p>
                            <h2 className="text-4xl font-black text-white mb-6 leading-tight">
                                Code That <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Performs</span>
                            </h2>
                            <p className="text-gray-400 leading-relaxed mb-8">
                                Every website we build is engineered for speed, accessibility, and SEO from line one. No bloated templates. No cookie-cutter themes. Pure, custom, precision-crafted code.
                            </p>
                            <ul className="space-y-4">
                                {['100 / 100 Google PageSpeed Score', 'WCAG 2.1 Accessibility Compliant', 'Schema Markup & Open Graph Ready', 'Deployed on Global CDN Edge Network'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                                        <CheckCircle size={16} className="text-cyan-400 flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== CTA BANNER ===== */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950/30 to-gray-900" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/15 blur-[120px] pointer-events-none rounded-full" />
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center px-4 relative z-10">
                    <Globe className="w-16 h-16 text-cyan-400 mx-auto mb-6 animate-pulse" />
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Ready to Go <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Live?</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                        Let's build your dream website together. Contact us today for a free consultation and project quote.
                    </p>
                    <Link to="/contact"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-accent hover:bg-blue-600 text-white font-black rounded-2xl transition-colors shadow-2xl shadow-accent/30 text-lg tracking-wide">
                        Start Your Project <ArrowUpRight size={22} />
                    </Link>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default WebDesign;
