import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Code2, Terminal, Database, Cpu, Globe,
    Zap, ArrowUpRight, Layers, Star, Shield
} from 'lucide-react';

// ────────────────────────────────────────────
// CODE SNIPPETS for the scrolling carousel
// ────────────────────────────────────────────
const CODE_SNIPPETS = [
    {
        lang: 'tsx',
        file: 'App.tsx',
        color: 'text-blue-400',
        badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        lines: [
            { t: 'kw', v: 'import ' }, { t: 'nm', v: 'React' }, { t: 'pt', v: ', { ' }, { t: 'nm', v: 'useState' }, { t: 'pt', v: ' } ' }, { t: 'kw', v: 'from ' }, { t: 'st', v: "'react'" }, { t: 'pt', v: ';' },
            { t: 'br' },
            { t: 'kw', v: 'const ' }, { t: 'fn', v: 'App' }, { t: 'pt', v: ' = () => {' },
            { t: 'br' },
            { t: 'sp', v: '  ' }, { t: 'kw', v: 'const ' }, { t: 'pt', v: '[' }, { t: 'nm', v: 'data' }, { t: 'pt', v: ', ' }, { t: 'fn', v: 'setData' }, { t: 'pt', v: '] = ' }, { t: 'fn', v: 'useState' }, { t: 'pt', v: '([]);' },
            { t: 'br' },
            { t: 'sp', v: '  ' }, { t: 'kw', v: 'return ' }, { t: 'pt', v: '(' },
            { t: 'br' },
            { t: 'sp', v: '    ' }, { t: 'tg', v: '<YuvanApp' }, { t: 'at', v: ' data' }, { t: 'pt', v: '={' }, { t: 'nm', v: 'data' }, { t: 'pt', v: '} ' }, { t: 'tg', v: '/>' },
            { t: 'br' },
            { t: 'pt', v: '  );' },
            { t: 'br' },
            { t: 'pt', v: '};' },
        ]
    },
    {
        lang: 'js',
        file: 'server.js',
        color: 'text-green-400',
        badge: 'bg-green-500/10 text-green-400 border-green-500/20',
        lines: [
            { t: 'kw', v: 'const ' }, { t: 'nm', v: 'express ' }, { t: 'pt', v: '= ' }, { t: 'fn', v: 'require' }, { t: 'pt', v: '(' }, { t: 'st', v: "'express'" }, { t: 'pt', v: ');' },
            { t: 'br' },
            { t: 'kw', v: 'const ' }, { t: 'nm', v: 'app' }, { t: 'pt', v: ' = ' }, { t: 'fn', v: 'express' }, { t: 'pt', v: '();' },
            { t: 'br' },
            { t: 'nm', v: 'app' }, { t: 'pt', v: '.' }, { t: 'fn', v: 'get' }, { t: 'pt', v: '(' }, { t: 'st', v: "'/api/services'" }, { t: 'pt', v: ', ' }, { t: 'kw', v: 'async ' }, { t: 'pt', v: '(req, res) => {' },
            { t: 'br' },
            { t: 'sp', v: '  ' }, { t: 'kw', v: 'const ' }, { t: 'nm', v: 'data' }, { t: 'pt', v: ' = ' }, { t: 'kw', v: 'await ' }, { t: 'nm', v: 'db' }, { t: 'pt', v: '.' }, { t: 'fn', v: 'findAll' }, { t: 'pt', v: '();' },
            { t: 'br' },
            { t: 'sp', v: '  ' }, { t: 'nm', v: 'res' }, { t: 'pt', v: '.' }, { t: 'fn', v: 'json' }, { t: 'pt', v: '({ ' }, { t: 'nm', v: 'success' }, { t: 'pt', v: ': ' }, { t: 'kw', v: 'true' }, { t: 'pt', v: ', data });' },
            { t: 'br' },
            { t: 'pt', v: '});' },
            { t: 'br' },
            { t: 'nm', v: 'app' }, { t: 'pt', v: '.' }, { t: 'fn', v: 'listen' }, { t: 'pt', v: '(' }, { t: 'nm', v: '8000' }, { t: 'pt', v: ');' },
        ]
    },
    {
        lang: 'css',
        file: 'styles.css',
        color: 'text-pink-400',
        badge: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
        lines: [
            { t: 'tg', v: '.hero' }, { t: 'pt', v: ' {' },
            { t: 'br' },
            { t: 'sp', v: '  ' }, { t: 'at', v: 'display' }, { t: 'pt', v: ': ' }, { t: 'st', v: 'grid' }, { t: 'pt', v: ';' },
            { t: 'br' },
            { t: 'sp', v: '  ' }, { t: 'at', v: 'background' }, { t: 'pt', v: ': ' }, { t: 'fn', v: 'linear-gradient' }, { t: 'pt', v: '(' },
            { t: 'br' },
            { t: 'sp', v: '    ' }, { t: 'st', v: '135deg' }, { t: 'pt', v: ',' },
            { t: 'br' },
            { t: 'sp', v: '    ' }, { t: 'nm', v: '#ffffff ' }, { t: 'pt', v: '0%,' },
            { t: 'br' },
            { t: 'sp', v: '    ' }, { t: 'nm', v: '#eef2ff ' }, { t: 'pt', v: '100%' },
            { t: 'br' },
            { t: 'sp', v: '  ' }, { t: 'pt', v: ');' },
            { t: 'br' },
            { t: 'pt', v: '}' },
        ]
    },
    {
        lang: 'py',
        file: 'api.py',
        color: 'text-yellow-400',
        badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        lines: [
            { t: 'kw', v: 'from ' }, { t: 'nm', v: 'fastapi ' }, { t: 'kw', v: 'import ' }, { t: 'nm', v: 'FastAPI' },
            { t: 'br' },
            { t: 'nm', v: 'app ' }, { t: 'pt', v: '= ' }, { t: 'fn', v: 'FastAPI' }, { t: 'pt', v: '()' },
            { t: 'br' },
            { t: 'tg', v: '@app' }, { t: 'pt', v: '.' }, { t: 'fn', v: 'get' }, { t: 'pt', v: '(' }, { t: 'st', v: '"/services"' }, { t: 'pt', v: ')' },
            { t: 'br' },
            { t: 'kw', v: 'async def ' }, { t: 'fn', v: 'get_services' }, { t: 'pt', v: '():' },
            { t: 'br' },
            { t: 'sp', v: '    ' }, { t: 'kw', v: 'return ' }, { t: 'pt', v: '{' },
            { t: 'br' },
            { t: 'sp', v: '        ' }, { t: 'st', v: '"agency"' }, { t: 'pt', v: ': ' }, { t: 'st', v: '"yuvan"' }, { t: 'pt', v: ',' },
            { t: 'br' },
            { t: 'sp', v: '        ' }, { t: 'st', v: '"services"' }, { t: 'pt', v: ': ' }, { t: 'nm', v: '10' },
            { t: 'br' },
            { t: 'sp', v: '    ' }, { t: 'pt', v: '}' },
        ]
    },
    {
        lang: 'sql',
        file: 'queries.sql',
        color: 'text-cyan-400',
        badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        lines: [
            { t: 'kw', v: 'SELECT ' }, { t: 'nm', v: 's.name' }, { t: 'pt', v: ', ' }, { t: 'nm', v: 'c.count' },
            { t: 'br' },
            { t: 'kw', v: 'FROM ' }, { t: 'nm', v: 'services s' },
            { t: 'br' },
            { t: 'kw', v: 'JOIN ' }, { t: 'nm', v: 'clients c' }, { t: 'kw', v: ' ON ' }, { t: 'nm', v: 'c.service_id' }, { t: 'pt', v: ' = ' }, { t: 'nm', v: 's.id' },
            { t: 'br' },
            { t: 'kw', v: 'WHERE ' }, { t: 'nm', v: 's.active' }, { t: 'pt', v: ' = ' }, { t: 'st', v: 'true' },
            { t: 'br' },
            { t: 'kw', v: 'ORDER BY ' }, { t: 'nm', v: 'c.count' }, { t: 'kw', v: ' DESC' },
            { t: 'br' },
            { t: 'kw', v: 'LIMIT ' }, { t: 'nm', v: '10' }, { t: 'pt', v: ';' },
        ]
    },
];

// Token colors
const tok = (t, v) => {
    const map = {
        kw: 'text-violet-400',
        nm: 'text-blue-300',
        fn: 'text-yellow-300',
        st: 'text-green-300',
        tg: 'text-red-300',
        at: 'text-orange-300',
        pt: 'text-gray-400',
        sp: 'text-transparent select-none',
        br: null,
    };
    if (t === 'br') return null;
    return <span className={map[t] || 'text-gray-300'}>{v}</span>;
};

// Renders tokens into lines
const renderCode = (lines) => {
    const result = [];
    let lineNodes = [];
    let lineNum = 1;
    lines.forEach((token, i) => {
        if (token.t === 'br') {
            result.push(
                <div key={i} className="flex">
                    <span className="select-none text-gray-700 mr-4 text-right w-5 inline-block flex-shrink-0">{lineNum}</span>
                    <span>{lineNodes}</span>
                </div>
            );
            lineNodes = [];
            lineNum++;
        } else {
            lineNodes.push(<React.Fragment key={i}>{tok(token.t, token.v)}</React.Fragment>);
        }
    });
    if (lineNodes.length > 0) {
        result.push(
            <div key="last" className="flex">
                <span className="select-none text-gray-700 mr-4 text-right w-5 inline-block flex-shrink-0">{lineNum}</span>
                <span>{lineNodes}</span>
            </div>
        );
    }
    return result;
};

// ────────────────────────────────────────────
// CODE CAROUSEL
// ────────────────────────────────────────────
const CodeCarousel = () => {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setIdx(i => (i + 1) % CODE_SNIPPETS.length), 3500);
        return () => clearInterval(t);
    }, []);

    const snip = CODE_SNIPPETS[idx];

    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="relative w-full"
        >
            {/* Editor chrome */}
            <div className="bg-gray-950 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
                {/* Title bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-gray-800">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    <div className="flex items-center gap-2 ml-3 flex-1">
                        {CODE_SNIPPETS.map((s, i) => (
                            <button key={i} onClick={() => setIdx(i)}
                                className={`flex items-center gap-1.5 px-3 py-1 rounded-t text-[10px] font-mono transition-all ${i === idx ? 'bg-gray-950 text-gray-200 border-t border-x border-gray-700' : 'text-gray-500 hover:text-gray-400'}`}>
                                <span className={`w-2 h-2 rounded-full ${i === idx ? snip.color.replace('text-', 'bg-').replace('-400', '-400') : 'bg-gray-700'}`} />
                                {s.file}
                            </button>
                        ))}
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${snip.badge}`}>{snip.lang}</span>
                </div>

                {/* Code body */}
                <div className="p-5 font-mono text-xs leading-6 min-h-[220px] relative overflow-hidden">
                    {/* Scrolling ticker LEFT edge */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-indigo-500 to-transparent opacity-60" />

                    <AnimatePresence mode="wait">
                        <motion.div key={idx}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-0.5"
                        >
                            {renderCode(snip.lines)}
                        </motion.div>
                    </AnimatePresence>

                    {/* Blinking cursor */}
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="inline-block w-2 h-4 bg-indigo-400 ml-1 align-middle mt-0.5"
                    />

                    {/* Gradient fade at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none" />
                </div>

                {/* Status bar */}
                <div className="flex items-center justify-between px-5 py-2 bg-indigo-600/90 text-white text-[10px] font-mono">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            yuvan-studio
                        </span>
                        <span className="text-indigo-200">Ln {snip.lines.filter(t => t.t === 'br').length + 1}</span>
                    </div>
                    <div className="flex items-center gap-3 text-indigo-200">
                        <span>UTF-8</span>
                        <span>{snip.lang.toUpperCase()}</span>
                        <span>Prettier ✓</span>
                    </div>
                </div>
            </div>

            {/* Glow blob */}
            <div className="absolute -inset-4 bg-indigo-500/10 blur-2xl rounded-3xl -z-10 pointer-events-none" />
        </motion.div>
    );
};

// ────────────────────────────────────────────
// SCROLLING CODE TICKER (bottom marquee)
// ────────────────────────────────────────────
const tickerItems = [
    'npm install yuvan-creations',
    'git push origin main',
    'const future = await build();',
    'SELECT * FROM success;',
    'docker compose up --build',
    'yarn add premium-solutions',
    '@yuvan/deploy --env=production',
    'curl -X GET /api/services',
    'python manage.py runserver',
    'kubectl apply -f yuvan.yaml',
    'npx create-webapp yuvan',
    'import { excellence } from "@yuvan"',
];

const CodeTicker = () => {
    const items = [...tickerItems, ...tickerItems];
    return (
        <div className="overflow-hidden border-y border-gray-100 bg-gray-50 py-3 relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />
            <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
                className="flex gap-8 whitespace-nowrap"
            >
                {items.map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-2 font-mono text-xs text-gray-500">
                        <span className="text-blue-500">$</span>
                        <span>{item}</span>
                        <span className="text-gray-300">|</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

// ────────────────────────────────────────────
// FLOATING 3D TECH CARDS
// ────────────────────────────────────────────
const FloatCard = ({ sx, sy, children, className = '', delay = 0 }) => {
    const x = useTransform(sx, v => v * 30);
    const y = useTransform(sy, v => v * 30);
    return (
        <motion.div
            style={{ x, y }}
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4 + delay, delay }}
            className={`absolute pointer-events-none ${className}`}
        >
            {children}
        </motion.div>
    );
};

// ────────────────────────────────────────────
// STATS ROW
// ────────────────────────────────────────────
const stats = [
    { val: '17+', label: 'Years of Impact', icon: <Star size={16} /> },
    { val: '500+', label: 'Projects Shipped', icon: <Layers size={16} /> },
    { val: '98%', label: 'Client Retention', icon: <Shield size={16} /> },
    { val: '10+', label: 'Services Offered', icon: <Zap size={16} /> },
];

// ────────────────────────────────────────────
// MAIN HERO
// ────────────────────────────────────────────
const Hero = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { damping: 25, stiffness: 80 });
    const springY = useSpring(mouseY, { damping: 25, stiffness: 80 });
    const glowX = useTransform(springX, v => v * window.innerWidth * 0.4);
    const glowY = useTransform(springY, v => v * window.innerHeight * 0.4);

    useEffect(() => {
        const fn = (e) => {
            mouseX.set((e.clientX / window.innerWidth) - 0.5);
            mouseY.set((e.clientY / window.innerHeight) - 0.5);
        };
        window.addEventListener('mousemove', fn);
        return () => window.removeEventListener('mousemove', fn);
    }, []);

    return (
        <section id="home" className="relative overflow-hidden bg-white cursor-default">

            {/* ── Mouse-tracking glow ── */}
            <motion.div
                className="hidden md:block absolute w-[700px] h-[700px] rounded-full bg-indigo-100/50 blur-[130px] -z-10 pointer-events-none"
                style={{ x: glowX, y: glowY, top: '50%', left: '50%', translateX: '-50%', translateY: '-50%' }}
            />

            {/* ── Dot grid ── */}
            <div className="absolute inset-0 -z-10 opacity-40"
                style={{ backgroundImage: 'radial-gradient(circle, #6366f125 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

            {/* ── Ambient colour blobs ── */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-50 blur-[120px] opacity-60 -z-10 rounded-full" />
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-violet-50 blur-[120px] opacity-60 -z-10 rounded-full" />

            {/* ── Floating 3D tech pills ── */}
            <div className="hidden lg:block">
                <FloatCard sx={springX} sy={springY} className="top-[22%] left-[6%]" delay={0}>
                    <div className="bg-white border border-indigo-100 shadow-xl rounded-2xl px-4 py-3 flex items-center gap-2.5"
                        style={{ boxShadow: '0 12px 40px rgba(99,102,241,0.12), 0 4px 12px rgba(0,0,0,0.06)' }}>
                        <Code2 size={20} className="text-indigo-500" />
                        <span className="font-mono text-xs text-gray-700 font-bold">React 18</span>
                    </div>
                </FloatCard>

                <FloatCard sx={springX} sy={springY} className="top-[14%] right-[10%]" delay={1.2}>
                    <div className="bg-white border border-green-100 shadow-xl rounded-2xl px-4 py-3 flex items-center gap-2.5"
                        style={{ boxShadow: '0 12px 40px rgba(34,197,94,0.10), 0 4px 12px rgba(0,0,0,0.06)' }}>
                        <Terminal size={18} className="text-green-500" />
                        <span className="font-mono text-xs text-gray-700 font-bold">Node.js</span>
                    </div>
                </FloatCard>

                <FloatCard sx={springX} sy={springY} className="top-[52%] right-[5%]" delay={0.6}>
                    <div className="bg-white border border-blue-100 shadow-xl rounded-2xl px-4 py-3 flex items-center gap-2.5"
                        style={{ boxShadow: '0 12px 40px rgba(59,130,246,0.10), 0 4px 12px rgba(0,0,0,0.06)' }}>
                        <Database size={18} className="text-blue-500" />
                        <span className="font-mono text-xs text-gray-700 font-bold">PostgreSQL</span>
                    </div>
                </FloatCard>

                <FloatCard sx={springX} sy={springY} className="bottom-[28%] left-[8%]" delay={1.8}>
                    <div className="bg-white border border-violet-100 shadow-xl rounded-2xl px-4 py-3 flex items-center gap-2.5"
                        style={{ boxShadow: '0 12px 40px rgba(139,92,246,0.10), 0 4px 12px rgba(0,0,0,0.06)' }}>
                        <Cpu size={18} className="text-violet-500" />
                        <span className="font-mono text-xs text-gray-700 font-bold">AWS Cloud</span>
                    </div>
                </FloatCard>

                <FloatCard sx={springX} sy={springY} className="top-[40%] left-[3%]" delay={2.4}>
                    <div className="bg-gray-900 border border-gray-700 shadow-xl rounded-2xl px-3 py-2 font-mono text-[10px] text-green-400"
                        style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.20)' }}>
                        <div><span className="text-gray-600">$</span> npm run build</div>
                        <div className="text-gray-500">✓ compiled in 273ms</div>
                    </div>
                </FloatCard>

                {/* Large decorative {} */}
                <motion.div
                    style={{ x: useTransform(springX, v => v * -20), y: useTransform(springY, v => v * -12) }}
                    className="absolute top-[58%] left-[4%] opacity-[0.04] select-none pointer-events-none"
                >
                    <span className="font-mono text-[180px] font-black text-gray-900 leading-none">{'{}'}</span>
                </motion.div>

                <motion.div
                    style={{ x: useTransform(springX, v => v * 15), y: useTransform(springY, v => v * 18) }}
                    className="absolute top-[10%] right-[2%] opacity-[0.04] select-none pointer-events-none"
                >
                    <span className="font-mono text-[120px] font-black text-indigo-900 leading-none">{'</>'}</span>
                </motion.div>
            </div>

            {/* ══════════════════════════════════════════
                MAIN HERO CONTENT
            ══════════════════════════════════════════ */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-40 lg:pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

                    {/* ── LEFT ── */}
                    <div>

                        {/* ── TOP BADGE (glowing) ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 16, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full"
                            style={{
                                background: 'white',
                                border: '1px solid rgba(220,38,38,0.15)',
                                boxShadow: '0 0 0 4px rgba(220,38,38,0.05), 0 4px 20px rgba(0,0,0,0.06)'
                            }}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                            </span>
                            <span className="font-mono text-xs font-bold tracking-widest uppercase"
                                style={{ background: 'linear-gradient(90deg,#DC2626,#2563EB)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                System Online
                            </span>
                            <span className="text-gray-300">·</span>
                            <span className="text-gray-500 font-mono text-xs">Haridwar, India</span>
                        </motion.div>

                        {/* ── HEADLINE ── */}
                        <div className="mb-7 overflow-hidden">
                            {[
                                { text: 'We Build', delay: 0.05 },
                                { text: 'Digital', gradient: true, delay: 0.15 },
                                { text: 'Excellence.', delay: 0.25 },
                            ].map(({ text, gradient, delay }) => (
                                <motion.div key={text}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    {gradient ? (
                                        <span className="block text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight"
                                            style={{ background: 'linear-gradient(100deg,#DC2626 0%,#2563EB 60%,#1d4ed8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                            {text}
                                        </span>
                                    ) : (
                                        <span className="block text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight">{text}</span>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* ── SUBTEXT ── */}
                        <motion.p
                            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.55 }}
                            className="text-gray-500 text-base md:text-lg leading-relaxed mb-9 max-w-md"
                        >
                            For <span className="text-gray-800 font-bold">17+ years</span>, Yuvan Creations has delivered premium{' '}
                            <span className="text-gray-800 font-bold">web apps</span>,{' '}
                            <span className="text-gray-800 font-bold">mobile solutions</span>, digital marketing &amp; IT services —{' '}
                            all from one studio in Haridwar.
                        </motion.p>

                        {/* ── CTAs ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.5 }}
                            className="flex flex-wrap gap-3 mb-10"
                        >
                            {/* Primary — gradient with shimmer overlay */}
                            <Link to="/contact"
                                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-black text-sm tracking-wide overflow-hidden transition-all"
                                style={{
                                    background: 'linear-gradient(115deg, #111 0%, #1d4ed8 100%)',
                                    boxShadow: '0 8px 32px rgba(37,99,235,0.35), 0 2px 8px rgba(0,0,0,0.15)'
                                }}
                            >
                                {/* Shimmer */}
                                <span className="absolute inset-0 top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:left-[120%] transition-all duration-700 ease-in-out" />
                                <Zap size={15} className="text-yellow-300" />
                                Start a Project
                                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>

                            {/* Secondary — animated border */}
                            <a href="#services"
                                className="group relative inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-gray-700 font-bold text-sm transition-all bg-white"
                                style={{ border: '1.5px solid rgba(209,213,219,1)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                                onMouseEnter={e => { e.currentTarget.style.border = '1.5px solid rgba(37,99,235,0.5)'; e.currentTarget.style.color = '#2563EB'; }}
                                onMouseLeave={e => { e.currentTarget.style.border = '1.5px solid rgba(209,213,219,1)'; e.currentTarget.style.color = ''; }}
                            >
                                <Globe size={15} /> Explore Services
                            </a>
                        </motion.div>

                        {/* ── STATS ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52 }}
                            className="grid grid-cols-2 gap-3"
                        >
                            {stats.map((s, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                                    className="relative overflow-hidden rounded-2xl p-4 group cursor-default"
                                    style={{
                                        background: 'white',
                                        border: '1px solid rgba(229,231,235,1)',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                                    }}
                                >
                                    {/* Gradient fill on hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                                        style={{
                                            background: i % 2 === 0
                                                ? 'linear-gradient(135deg,rgba(220,38,38,0.04) 0%,rgba(255,255,255,0) 100%)'
                                                : 'linear-gradient(135deg,rgba(37,99,235,0.05) 0%,rgba(255,255,255,0) 100%)'
                                        }} />

                                    <div className="relative z-10">
                                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-xl mb-2"
                                            style={{
                                                background: i % 2 === 0
                                                    ? 'linear-gradient(135deg,rgba(220,38,38,0.1),rgba(220,38,38,0.05))'
                                                    : 'linear-gradient(135deg,rgba(37,99,235,0.1),rgba(37,99,235,0.05))',
                                                color: i % 2 === 0 ? '#DC2626' : '#2563EB'
                                            }}>
                                            {s.icon}
                                        </div>
                                        <p className="text-3xl font-black leading-none mb-1"
                                            style={{ color: i % 2 === 0 ? '#DC2626' : '#2563EB' }}>
                                            {s.val}
                                        </p>
                                        <p className="text-gray-500 text-[10px] font-semibold uppercase tracking-widest">{s.label}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Trust row */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                            className="flex items-center gap-4 mt-6"
                        >
                            <div className="flex -space-x-2">
                                {['#DC2626', '#2563EB', '#111'].map((c, i) => (
                                    <div key={i} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-[9px] font-black"
                                        style={{ background: c }}>Y</div>
                                ))}
                            </div>
                            <p className="text-gray-400 text-xs">
                                Trusted by <span className="text-gray-700 font-bold">500+ clients</span> across India
                            </p>
                        </motion.div>
                    </div>

                    {/* ── RIGHT: Code Carousel ── */}
                    <div className="w-full">
                        <CodeCarousel />

                        {/* Floating badges under editor */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                            className="flex flex-wrap gap-2 mt-4 justify-center"
                        >
                            {['React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'Figma'].map(t => (
                                <span key={t} className="text-[10px] font-mono bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1 rounded-full hover:border-indigo-200 hover:text-indigo-600 transition-colors cursor-default">
                                    {t}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ── Code ticker strip ── */}
            <CodeTicker />
        </section>
    );
};

export default Hero;
