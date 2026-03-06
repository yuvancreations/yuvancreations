import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
    Heart, Target, Eye, Star, Users, Zap,
    Shield, Lightbulb, Handshake, CheckCircle,
    ArrowUpRight, Award, Clock, Smile, Layers
} from 'lucide-react';

// ---- Animated counter ----
const Counter = ({ value, suffix = '' }) => (
    <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
    >
        {value}{suffix}
    </motion.span>
);

const stats = [
    { value: '15+', label: 'Years of Excellence', icon: <Award size={22} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { value: '500+', label: 'Projects Completed', icon: <CheckCircle size={22} />, color: 'text-red-600', bg: 'bg-red-50' },
    { value: '98%', label: 'Client Satisfaction', icon: <Smile size={22} />, color: 'text-pink-600', bg: 'bg-pink-50' },
    { value: '50+', label: 'Services Offered', icon: <Layers size={22} />, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const values = [
    {
        icon: <Lightbulb size={28} />,
        title: 'Innovation',
        desc: 'We constantly explore new technologies and creative approaches to deliver cutting-edge solutions that set our clients apart.',
        color: 'bg-amber-50 text-amber-600',
        border: 'border-amber-100',
        top: 'bg-amber-500',
    },
    {
        icon: <Star size={28} />,
        title: 'Quality',
        desc: 'Every project receives our unwavering commitment to excellence, ensuring results that exceed expectations and stand the test of time.',
        color: 'bg-blue-50 text-blue-600',
        border: 'border-blue-100',
        top: 'bg-blue-600',
    },
    {
        icon: <Handshake size={28} />,
        title: 'Partnership',
        desc: 'We view our clients as partners, working collaboratively to understand their vision and bring it to life with precision and care.',
        color: 'bg-emerald-50 text-emerald-600',
        border: 'border-emerald-100',
        top: 'bg-emerald-500',
    },
];

const whyUs = [
    {
        icon: <Layers size={24} />,
        title: 'Comprehensive Services',
        desc: 'From creative photography to technical support, we offer a complete suite of services under one roof, saving you time and ensuring consistency.',
        color: 'text-blue-600 bg-blue-50',
    },
    {
        icon: <Users size={24} />,
        title: 'Expert Team',
        desc: 'Our multidisciplinary team brings together creative visionaries and technical experts to deliver integrated solutions that drive results.',
        color: 'text-red-600 bg-red-50',
    },
    {
        icon: <Clock size={24} />,
        title: 'Fast Turnaround',
        desc: 'We understand the importance of timelines. Our efficient workflows and project management ensure your projects are delivered on schedule.',
        color: 'text-pink-600 bg-pink-50',
    },
    {
        icon: <Star size={24} />,
        title: 'Creative Excellence',
        desc: 'Our creative team combines artistic vision with technical expertise to produce stunning content that captures attention and communicates effectively.',
        color: 'text-amber-600 bg-amber-50',
    },
    {
        icon: <Shield size={24} />,
        title: 'Technical Precision',
        desc: 'Beyond creativity, our technical team ensures every solution is built with precision, reliability, and scalability in mind for your needs.',
        color: 'text-emerald-600 bg-emerald-50',
    },
    {
        icon: <Zap size={24} />,
        title: 'Ongoing Support',
        desc: "Our relationship doesn't end with delivery. We provide continuous support and maintenance to keep your solutions effective and up-to-date.",
        color: 'text-blue-600 bg-blue-50',
    },
];

const About = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen bg-white text-gray-900 flex flex-col pt-20">
            <Navbar />

            {/* ===== HERO ===== */}
            <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/60 to-blue-50/40 py-28">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #6366f120 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-100/30 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm bg-blue-50 border border-blue-100 px-4 py-2 rounded-full mb-6">
                        <Heart size={14} /> About Yuvan Creations
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight text-gray-900">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-blue-700 to-blue-600">Us</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="text-gray-500 text-xl leading-relaxed max-w-2xl mx-auto mb-10">
                        Discover the story behind Yuvan Creations, our journey, and the passion that drives us to deliver exceptional creative and technical solutions.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-4">
                        <Link to="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-colors shadow-lg shadow-blue-500/30 text-sm">
                            Work With Us <ArrowUpRight size={16} />
                        </Link>
                        <a href="#story"
                            className="inline-flex items-center gap-2 px-8 py-4 border border-gray-200 hover:border-blue-300 text-gray-600 hover:text-blue-600 font-bold rounded-xl transition-all text-sm bg-white shadow-sm">
                            Our Story <Heart size={16} />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ===== STATS ===== */}
            <section className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((s, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="text-center group">
                                <div className={`w-14 h-14 ${s.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 ${s.color} group-hover:scale-110 transition-transform duration-300`}>
                                    {s.icon}
                                </div>
                                <p className={`text-4xl md:text-5xl font-black ${s.color} mb-1`}>
                                    <Counter value={s.value} />
                                </p>
                                <p className="text-gray-500 text-sm font-medium">{s.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== OUR STORY ===== */}
            <section id="story" className="py-24 bg-gray-50 relative">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #6366f115 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left: visual card stack */}
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            className="relative">
                            {/* Main card */}
                            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-black text-2xl shadow-lg">YC</div>
                                    <div>
                                        <p className="font-black text-gray-900 text-lg">Yuvan Creations</p>
                                        <p className="text-blue-600 text-sm font-medium">Creative & Tech Solutions</p>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                                    Founded with a vision to blend creativity with technology, Yuvan Creations has been at the forefront of delivering exceptional digital and creative solutions since our inception.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {['Photography', 'Web Dev', 'Digital Marketing', 'IT Support', 'Video'].map(tag => (
                                        <span key={tag} className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full font-medium">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            {/* Floating decorations */}
                            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3 }}
                                className="absolute -top-4 -right-4 bg-amber-50 border border-amber-100 rounded-2xl p-4 shadow-lg z-20">
                                <p className="text-amber-600 font-black text-2xl">15+</p>
                                <p className="text-amber-500 text-xs font-medium">Years Active</p>
                            </motion.div>
                            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
                                className="absolute -bottom-4 -left-4 bg-emerald-50 border border-emerald-100 rounded-2xl p-4 shadow-lg z-20">
                                <p className="text-emerald-600 font-black text-2xl">500+</p>
                                <p className="text-emerald-500 text-xs font-medium">Projects Delivered</p>
                            </motion.div>
                            {/* Background card */}
                            <div className="absolute inset-0 bg-blue-50 rounded-3xl rotate-3 -z-0 border border-blue-100" />
                        </motion.div>

                        {/* Right: Story text */}
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <p className="text-blue-600 font-semibold text-sm tracking-widest mb-4 uppercase">Our Story</p>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
                                From humble beginnings to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">industry leaders.</span>
                            </h2>
                            <div className="space-y-4 text-gray-500 leading-relaxed">
                                <p>What started as a small creative studio has evolved into a comprehensive service provider, offering everything from photography and videography to web development and technical support.</p>
                                <p>Our journey is defined by our commitment to quality, innovation, and client satisfaction. We believe in pushing boundaries and creating experiences that leave a lasting impact.</p>
                            </div>
                            <div className="mt-8 space-y-3">
                                {[
                                    'Deliver exceptional quality in every project',
                                    'Foster long-term client relationships',
                                    'Stay at the forefront of technology',
                                    'Provide comprehensive service solutions',
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle size={18} className="text-blue-600 flex-shrink-0" />
                                        <p className="text-gray-600 text-sm">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== MISSION & VISION ===== */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Mission */}
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="relative bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white overflow-hidden shadow-xl">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-8 -translate-x-8" />
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                                    <Target size={28} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-black mb-4">Our Mission</h3>
                                <p className="text-indigo-100 leading-relaxed mb-6">
                                    To empower businesses and individuals with innovative creative and technical solutions that elevate their brand presence and operational efficiency. We strive to bridge the gap between imagination and reality.
                                </p>
                                <ul className="space-y-2.5">
                                    {[
                                        'Deliver exceptional quality in every project',
                                        'Foster long-term client relationships',
                                        'Stay at the forefront of technology',
                                        'Provide comprehensive service solutions',
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2.5 text-indigo-100 text-sm">
                                            <CheckCircle size={15} className="text-indigo-200 flex-shrink-0" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* Vision */}
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                            className="relative bg-gradient-to-br from-red-600 to-blue-700 rounded-3xl p-8 text-white overflow-hidden shadow-xl">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-8 -translate-x-8" />
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                                    <Eye size={28} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-black mb-4">Our Vision</h3>
                                <p className="text-violet-100 leading-relaxed mb-6">
                                    To become the leading creative and technical solutions provider, recognized for our innovation, quality, and commitment to client success. We envision a future where businesses of all sizes access premium services.
                                </p>
                                <ul className="space-y-2.5">
                                    {[
                                        'Expand our service portfolio continuously',
                                        'Build a team of industry-leading experts',
                                        'Establish a global client base',
                                        'Pioneer new creative technologies',
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-2.5 text-violet-100 text-sm">
                                            <CheckCircle size={15} className="text-violet-200 flex-shrink-0" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== OUR VALUES ===== */}
            <section className="py-24 bg-gray-50 relative">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #6366f115 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            className="text-blue-600 font-semibold text-sm tracking-widest mb-3 uppercase">Core Principles</motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">Values</span>
                        </motion.h2>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                            className="text-gray-500 mt-4 max-w-xl mx-auto text-base">
                            These core principles guide everything we do at Yuvan Creations, from client interactions to project execution.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {values.map((v, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                className={`bg-white border ${v.border} rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group`}>
                                <div className={`h-1.5 w-full ${v.top}`} />
                                <div className="p-8">
                                    <div className={`w-16 h-16 ${v.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                        {v.icon}
                                    </div>
                                    <h3 className="text-xl font-black text-gray-900 mb-3">{v.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== WHY CHOOSE US ===== */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                            className="text-blue-600 font-semibold text-sm tracking-widest mb-3 uppercase">Why Us</motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">Yuvan Creations</span>
                        </motion.h2>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                            className="text-gray-500 mt-4 max-w-xl mx-auto text-base">
                            Discover what sets Yuvan Creations apart and makes us the preferred choice for creative and technical solutions.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {whyUs.map((w, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className={`w-14 h-14 ${w.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                    {w.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">{w.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-blue-700 to-blue-800" />
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center px-4 relative z-10">
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="inline-block mb-6">
                        <Heart size={56} className="text-white/80" strokeWidth={1.5} />
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Let's Build Something <br /> Extraordinary Together.
                    </h2>
                    <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">
                        Ready to elevate your brand or need expert tech solutions? Reach out to us today and let's discuss how we can help.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/contact"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-700 font-black rounded-2xl shadow-xl text-base hover:bg-blue-50 transition-colors">
                            Get In Touch <ArrowUpRight size={20} />
                        </Link>
                        <Link to="/#services"
                            className="inline-flex items-center gap-3 px-10 py-5 border border-white/40 hover:border-white text-white font-bold rounded-2xl transition-all text-base">
                            View Our Services <Layers size={20} />
                        </Link>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
