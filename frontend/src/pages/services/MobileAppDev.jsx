import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    Smartphone, Apple, Cpu, Zap, Shield, Globe, Code2,
    Terminal, ArrowUpRight, CheckCircle, Layers, Wifi, BarChart3
} from 'lucide-react';

// ---------- Typing Effect ----------
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
    '$ yuvan --build "your-dream-app"',
    '✔ Designing UI/UX wireframes...',
    '✔ Scaffolding React Native project...',
    '✔ Implementing core features...',
    '✔ Integrating APIs & backend...',
    '✔ Running automated tests... passed',
    '✔ Submitting to App Store & Play Store...',
    '🚀 Your app is live! Downloads starting...',
];

const features = [
    {
        icon: <Apple size={28} />,
        title: 'iOS & Android',
        desc: 'One codebase, two platforms. Beautiful native-feel apps on both iOS and Android using React Native or Flutter.',
        color: 'from-gray-400 to-gray-600',
        glow: 'rgba(156,163,175,0.2)',
    },
    {
        icon: <Cpu size={28} />,
        title: 'High Performance',
        desc: '60fps smooth animations, optimized memory usage, and lightning-fast startup times engineered from day one.',
        color: 'from-blue-400 to-cyan-500',
        glow: 'rgba(34,211,238,0.2)',
    },
    {
        icon: <Shield size={28} />,
        title: 'Secure & Reliable',
        desc: "End-to-end encryption, secure auth flows, and penetration-tested code protecting your users' data.",
        color: 'from-emerald-400 to-green-500',
        glow: 'rgba(16,185,129,0.2)',
    },
    {
        icon: <Wifi size={28} />,
        title: 'Offline-First',
        desc: 'Smart caching and local storage ensure your app works flawlessly even without an internet connection.',
        color: 'from-violet-500 to-purple-600',
        glow: 'rgba(139,92,246,0.2)',
    },
    {
        icon: <BarChart3 size={28} />,
        title: 'Analytics Built-In',
        desc: 'Firebase Analytics, crash reporting, and A/B testing integrated so you always know what your users want.',
        color: 'from-orange-400 to-amber-500',
        glow: 'rgba(251,146,60,0.2)',
    },
    {
        icon: <Layers size={28} />,
        title: 'Scalable Architecture',
        desc: 'Clean, component-driven architecture that scales effortlessly from MVP to millions of users.',
        color: 'from-accent to-blue-600',
        glow: 'rgba(59,130,246,0.2)',
    },
];

const process = [
    { step: '01', title: 'Discovery & UX', desc: 'We map your user journey, define core features, and build detailed wireframes in Figma.' },
    { step: '02', title: 'Development', desc: 'Pixel-perfect UI + robust backend APIs built in agile sprints with weekly demos.' },
    { step: '03', title: 'QA & Testing', desc: 'Automated tests, real-device testing across iOS & Android, and performance audits.' },
    { step: '04', title: 'Launch & Growth', desc: 'App Store & Play Store submission, ASO setup, and post-launch support to scale.' },
];

const tech = ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Node.js', 'REST APIs', 'GraphQL'];

// ---------- Phone Mockup ----------
const PhoneMockup = () => (
    <div className="relative w-52 mx-auto">
        {/* Phone frame */}
        <div className="relative bg-gray-900 border-4 border-gray-700 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-accent/20 h-96">
            {/* Screen content */}
            <div className="bg-gray-950 h-full flex flex-col">
                {/* Status bar */}
                <div className="flex justify-between items-center px-5 py-2 text-[10px] text-gray-500">
                    <span>9:41</span><span>●●●</span>
                </div>
                {/* App content */}
                <div className="flex-1 px-4 pt-2">
                    <div className="h-2 bg-accent/60 rounded-full mb-3 w-2/3" />
                    <div className="h-2 bg-gray-800 rounded-full mb-6 w-1/2" />
                    {/* Cards */}
                    <div className="bg-gray-800 rounded-2xl p-3 mb-3">
                        <div className="h-1.5 bg-cyan-400/60 rounded mb-2 w-3/4" />
                        <div className="h-1.5 bg-gray-700 rounded w-1/2" />
                    </div>
                    <div className="bg-gray-800 rounded-2xl p-3 mb-3">
                        <div className="h-1.5 bg-accent/60 rounded mb-2 w-2/3" />
                        <div className="h-1.5 bg-gray-700 rounded w-1/3" />
                    </div>
                    {/* Bar chart */}
                    <div className="bg-gray-800 rounded-2xl p-3 flex items-end gap-1.5 h-20 mt-4">
                        {[40, 65, 30, 90, 55, 75, 45].map((h, i) => (
                            <motion.div key={i}
                                animate={{ height: [`${h}%`, `${h + 15}%`, `${h}%`] }}
                                transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                                className="flex-1 bg-gradient-to-t from-accent to-cyan-400 rounded-t-sm"
                                style={{ height: `${h}%` }}
                            />
                        ))}
                    </div>
                </div>
                {/* Bottom nav */}
                <div className="flex justify-around py-3 border-t border-gray-800">
                    {[Smartphone, Globe, BarChart3, Shield].map((Icon, i) => (
                        <Icon key={i} size={16} className={i === 0 ? 'text-accent' : 'text-gray-600'} />
                    ))}
                </div>
            </div>
        </div>
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 border-2 border-gray-700 rounded-full z-10" />
    </div>
);

// ---------- Main Page ----------
const MobileAppDev = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const terminal = useTypingEffect(terminalLines, 35);

    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col pt-20">
            <Navbar />

            {/* ===== HERO ===== */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-500/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left: Copy */}
                        <div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 text-violet-400 font-mono text-sm bg-violet-400/10 border border-violet-400/20 px-4 py-2 rounded-full mb-6">
                                <Terminal size={14} /> {'<MobileApp.build() />'}
                            </motion.div>

                            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tight">
                                Apps That <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-blue-300 to-cyan-400">
                                    Users Love
                                </span>
                            </motion.h1>

                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                className="text-gray-400 text-lg leading-relaxed max-w-lg mb-10">
                                From idea to App Store, we build high-performance iOS and Android apps that deliver real business results and exceptional user experiences.
                            </motion.p>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                className="flex flex-wrap gap-4">
                                <Link to="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-violet-600/30 text-sm tracking-wide">
                                    Build My App <ArrowUpRight size={16} />
                                </Link>
                                <a href="#features"
                                    className="inline-flex items-center gap-2 px-8 py-4 border border-gray-700 hover:border-violet-400 text-gray-300 hover:text-white font-bold rounded-xl transition-all text-sm">
                                    View Features <Smartphone size={16} />
                                </a>
                            </motion.div>

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                                className="flex flex-wrap gap-2 mt-10">
                                {tech.map(t => (
                                    <span key={t} className="px-3 py-1.5 bg-gray-800/80 border border-gray-700 text-gray-300 text-xs font-mono rounded-lg hover:border-violet-400/50 hover:text-violet-300 transition-colors">
                                        {t}
                                    </span>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right: Phone + Terminal */}
                        <div className="flex flex-col lg:flex-row gap-8 items-center">
                            {/* Animated Phone Mockup */}
                            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                                className="relative flex-shrink-0">
                                <PhoneMockup />
                                {/* Glow */}
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-12 bg-violet-500/30 blur-2xl rounded-full" />
                                {/* Floating badges */}
                                <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3 }}
                                    className="absolute -top-4 -left-8 bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 shadow-xl text-xs">
                                    <p className="text-gray-500 font-mono">Rating</p>
                                    <p className="text-yellow-400 font-black text-base">4.9 ⭐</p>
                                </motion.div>
                                <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
                                    className="absolute -bottom-4 -right-8 bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 shadow-xl text-xs">
                                    <p className="text-gray-500 font-mono">Downloads</p>
                                    <p className="text-cyan-400 font-black text-base">50K+</p>
                                </motion.div>
                            </motion.div>

                            {/* Terminal */}
                            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="flex-1 w-full">
                                <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
                                    <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
                                        <span className="w-3 h-3 rounded-full bg-red-500" />
                                        <span className="w-3 h-3 rounded-full bg-yellow-400" />
                                        <span className="w-3 h-3 rounded-full bg-green-500" />
                                        <span className="ml-4 text-gray-500 text-xs font-mono">yuvan-app-studio</span>
                                    </div>
                                    <div className="p-5 font-mono text-xs min-h-[200px]">
                                        <pre className="text-green-400 whitespace-pre-wrap leading-6">
                                            {terminal}
                                            <span className="animate-pulse text-violet-400">█</span>
                                        </pre>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FEATURE CARDS ===== */}
            <section id="features" className="py-24 relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            className="text-violet-400 font-mono text-sm tracking-widest mb-3 flex justify-center items-center gap-2">
                            <Code2 size={14} /> {'// app_capabilities'}
                        </motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                            Built to <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-300">Scale</span>
                        </motion.h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                className="group relative bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-2xl p-7 overflow-hidden transition-all duration-300">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                                    style={{ boxShadow: `inset 0 0 40px ${f.glow}` }} />
                                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${f.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
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
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-500/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            className="text-violet-400 font-mono text-sm tracking-widest mb-3 flex justify-center items-center gap-2">
                            <Terminal size={14} /> {'// launch_sequence'}
                        </motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                            From Idea to <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-300">App Store</span>
                        </motion.h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {process.map((p, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                                className="relative bg-gray-900 border border-gray-800 rounded-2xl p-7 hover:border-violet-500/50 transition-colors group">
                                <div className="text-6xl font-black text-gray-800 group-hover:text-violet-500/20 transition-colors absolute top-5 right-5 leading-none select-none">
                                    {p.step}
                                </div>
                                <div className="w-10 h-10 bg-violet-500/10 border border-violet-500/30 rounded-xl flex items-center justify-center mb-5">
                                    <CheckCircle size={20} className="text-violet-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                                {i < process.length - 1 && (
                                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-gray-700 z-10 text-xl font-bold">›</div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CODE PREVIEW ===== */}
            <section className="py-20 relative overflow-hidden bg-gray-950">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
                                <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
                                    <span className="w-3 h-3 rounded-full bg-red-500" />
                                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <span className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="ml-4 text-gray-500 text-xs font-mono">App.tsx</span>
                                </div>
                                <pre className="p-6 text-sm leading-7 font-mono overflow-x-auto">
                                    <span className="text-purple-400">import</span><span className="text-white"> {'{ '}</span>
                                    <span className="text-blue-300">React, useEffect</span>
                                    <span className="text-white">{' }'} </span>
                                    <span className="text-purple-400">from</span>
                                    <span className="text-green-300"> 'react-native'</span>
                                    <span className="text-white">;</span>{'\n\n'}
                                    <span className="text-purple-400">const</span>
                                    <span className="text-blue-300"> YourApp</span>
                                    <span className="text-white"> = () </span>
                                    <span className="text-purple-400">=&gt;</span>
                                    <span className="text-white"> {'{'}</span>{'\n'}
                                    <span className="text-white">  </span>
                                    <span className="text-purple-400">return</span>
                                    <span className="text-white"> {'<'}</span>
                                    <span className="text-blue-300">AppNavigator</span>{'\n'}
                                    <span className="text-white">    </span>
                                    <span className="text-yellow-300">screens</span>
                                    <span className="text-white">=</span>
                                    <span className="text-orange-300">{'{screens}'}</span>{'\n'}
                                    <span className="text-white">    </span>
                                    <span className="text-yellow-300">theme</span>
                                    <span className="text-white">=</span>
                                    <span className="text-green-300">"premium"</span>{'\n'}
                                    <span className="text-white">    </span>
                                    <span className="text-yellow-300">performance</span>
                                    <span className="text-white">=</span>
                                    <span className="text-orange-300">{'{99}'}</span>{'\n'}
                                    <span className="text-white">  {'/>'};</span>{'\n'}
                                    <span className="text-white">{'}'};</span>{'\n\n'}
                                    <span className="text-gray-500">// Result: 4.9★ App Store Rating</span>
                                </pre>
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <p className="text-violet-400 font-mono text-sm tracking-widest mb-4">{'// why_choose_us'}</p>
                            <h2 className="text-4xl font-black text-white mb-6 leading-tight">
                                Apps That <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-300">Perform</span>
                            </h2>
                            <p className="text-gray-400 leading-relaxed mb-8">
                                We don't just build apps. We build products that users rate 4.9★, that get featured in app stores, and that drive real business outcomes for our clients.
                            </p>
                            <ul className="space-y-4">
                                {['Cross-platform with native performance', 'App Store & Play Store submission handled', 'Push notifications & real-time features', 'Analytics, crash reporting & remote config'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                                        <CheckCircle size={16} className="text-violet-400 flex-shrink-0" />
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
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-violet-950/20 to-gray-900" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-500/10 blur-[120px] pointer-events-none rounded-full" />
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center px-4 relative z-10">
                    <Smartphone className="w-16 h-16 text-violet-400 mx-auto mb-6 animate-bounce" />
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-300">Ship Your App?</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                        Let's turn your idea into a stunning mobile app that your users will love and your business will scale on.
                    </p>
                    <Link to="/contact"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-violet-600 hover:bg-violet-700 text-white font-black rounded-2xl transition-colors shadow-2xl shadow-violet-600/30 text-lg tracking-wide">
                        Start Building <ArrowUpRight size={22} />
                    </Link>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default MobileAppDev;
