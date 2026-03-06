import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Rocket, Users, Award, Clock } from 'lucide-react';

const milestones = [
    { icon: <Rocket size={18} />, label: 'Founded', val: '2007', color: 'text-indigo-500', bg: 'bg-indigo-50 border-indigo-100' },
    { icon: <Users size={18} />, label: 'Clients Served', val: '500+', color: 'text-violet-500', bg: 'bg-violet-50 border-violet-100' },
    { icon: <Award size={18} />, label: 'Projects Done', val: '1200+', color: 'text-blue-500', bg: 'bg-blue-50 border-blue-100' },
    { icon: <Clock size={18} />, label: 'Avg. Delivery', val: '7 Days', color: 'text-emerald-500', bg: 'bg-emerald-50 border-emerald-100' },
];

const CompanyIntro = () => (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-30 -z-10"
            style={{ backgroundImage: 'radial-gradient(circle, #6366f120 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-50 blur-[100px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* ── LEFT: Text ── */}
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block font-mono text-xs text-blue-600 tracking-[0.2em] uppercase mb-4">// our_story</span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
                        Empowering You With{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">
                            Tech &amp; Creativity
                        </span>{' '}
                        Since 2007
                    </h2>
                    <p className="text-gray-500 text-lg leading-relaxed mb-8">
                        For over 17 years, Yuvan Creations has been the bridge between technology and art — from humble beginnings in Haridwar to a trusted hub for premium digital services across India.
                    </p>

                    {/* 2x2 milestone chips */}
                    <div className="grid grid-cols-2 gap-3 mb-10">
                        {milestones.map((m, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                className={`flex items-center gap-3 border rounded-xl p-3 ${m.bg}`}
                            >
                                <span className={m.color}>{m.icon}</span>
                                <div>
                                    <p className="text-gray-800 font-black text-base leading-none">{m.val}</p>
                                    <p className="text-gray-500 text-[10px] font-mono uppercase tracking-wider mt-0.5">{m.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <Link to="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-gray-900/20 text-sm group">
                        Start Working With Us
                        <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                </motion.div>

                {/* ── RIGHT: 3D Tilt card ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center"
                >
                    <Tilt tiltMaxAngleX={12} tiltMaxAngleY={12} perspective={900} scale={1.04} transitionSpeed={900} className="w-full max-w-sm">
                        <div
                            className="relative aspect-square rounded-3xl flex flex-col items-center justify-center p-8 text-center overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, #eff6ff 0%, #fef2f2 50%, #eff6ff 100%)',
                                boxShadow: '0 30px 80px rgba(99,102,241,0.15), 0 8px 20px rgba(0,0,0,0.06)',
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            {/* Inner glow */}
                            <div className="absolute inset-0 bg-white/40 rounded-3xl" />

                            {/* Dashed ring */}
                            <div className="absolute inset-4 border-2 border-dashed border-blue-200 rounded-full animate-spin-slow opacity-40 pointer-events-none" />
                            <div className="absolute inset-10 border border-red-200 border-dashed rounded-full opacity-30 pointer-events-none" />

                            {/* 17+ */}
                            <h3 className="relative text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-red-600 to-blue-600 leading-none mb-3 z-10"
                                style={{ transform: 'translateZ(40px)' }}>
                                17+
                            </h3>
                            <p className="relative text-lg font-bold text-gray-700 uppercase tracking-widest z-10"
                                style={{ transform: 'translateZ(28px)' }}>
                                Years of
                            </p>
                            <p className="relative text-base text-gray-500 font-medium tracking-wider z-10"
                                style={{ transform: 'translateZ(20px)' }}>
                                Excellence
                            </p>

                            {/* Bottom tag */}
                            <div className="absolute bottom-5 z-10"
                                style={{ transform: 'translateZ(32px)' }}>
                                <span className="font-mono text-[10px] bg-white/80 border border-blue-100 text-blue-600 px-3 py-1 rounded-full">
                                    // Haridwar, India · Est. 2007
                                </span>
                            </div>
                        </div>
                    </Tilt>
                </motion.div>
            </div>
        </div>
    </section>
);

export default CompanyIntro;
