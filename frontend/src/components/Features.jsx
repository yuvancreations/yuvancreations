import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Monitor, Smartphone, Video, Megaphone, Search,
    Shield, Zap, Code, ArrowUpRight, CheckCircle2
} from 'lucide-react';

const features = [
    {
        icon: <Monitor size={22} />,
        title: 'Computer Solutions',
        desc: 'Complete hardware & software services with genuine parts and 1-year warranty.',
        color: 'from-blue-500 to-indigo-600',
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        path: '/services/computer-solutions',
    },
    {
        icon: <Smartphone size={22} />,
        title: 'Mobile Repair',
        desc: 'Same-day professional repairs with 6-month warranty on all parts.',
        color: 'from-emerald-500 to-teal-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-100',
        path: '/services/mobile-repair',
    },
    {
        icon: <Video size={22} />,
        title: 'CCTV Solutions',
        desc: 'Professional installation & remote monitoring with 2-year warranty.',
        color: 'from-red-500 to-rose-600',
        bg: 'bg-red-50',
        border: 'border-red-100',
        path: '/services/cctv-solutions',
    },
    {
        icon: <Megaphone size={22} />,
        title: 'Digital Marketing',
        desc: 'SEO, content & social media strategies that grow your brand organically.',
        color: 'from-violet-500 to-purple-600',
        bg: 'bg-violet-50',
        border: 'border-violet-100',
        path: '/services/digital-marketing',
    },
    {
        icon: <Search size={22} />,
        title: 'Google Ads',
        desc: 'Precision PPC campaigns for instant search visibility and leads.',
        color: 'from-amber-500 to-orange-500',
        bg: 'bg-amber-50',
        border: 'border-amber-100',
        path: '/services/google-ads',
    },
    {
        icon: <Code size={22} />,
        title: 'Web Applications',
        desc: 'Full-stack scalable apps with React, Node.js and cloud infrastructure.',
        color: 'from-indigo-500 to-blue-600',
        bg: 'bg-indigo-50',
        border: 'border-indigo-100',
        path: '/services/web-apps',
    },
];

const guarantees = [
    { icon: <Shield size={15} />, text: 'Genuine Parts Only' },
    { icon: <Zap size={15} />, text: 'Fast Turnaround' },
    { icon: <CheckCircle2 size={15} />, text: 'Transparent Pricing' },
];

const Features = () => (
    <section className="py-24 bg-gray-50 relative overflow-hidden border-t border-gray-100">
        <div className="absolute inset-0 opacity-20 -z-10"
            style={{ backgroundImage: 'radial-gradient(circle, #6366f115 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-indigo-50 blur-[100px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <span className="inline-block font-mono text-xs text-blue-600 tracking-[0.2em] uppercase mb-3">// what_we_offer</span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                        Comprehensive Solutions{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">
                            Tailored to You
                        </span>
                    </h2>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                    className="flex flex-col gap-3">
                    <p className="text-gray-500 leading-relaxed">
                        From hardware repair to digital marketing — we're a one-stop studio for all your digital and technical needs.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {guarantees.map((g, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
                                {g.icon} {g.text}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((f, i) => (
                    <motion.div key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.07 }}
                        whileHover={{ y: -4 }}
                        className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col"
                    >
                        {/* Top gradient accent */}
                        <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${f.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                        {/* Icon */}
                        <div className={`w-12 h-12 ${f.bg} border ${f.border} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                            <span className={`bg-gradient-to-br ${f.color} bg-clip-text text-transparent`}
                                style={{ filter: 'none' }}>
                                <span className={`text-${f.color.split('-')[1] || 'indigo'}-500`}>{f.icon}</span>
                            </span>
                        </div>

                        <h4 className="text-base font-black text-gray-900 mb-2">{f.title}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed flex-1">{f.desc}</p>

                        <Link to={f.path}
                            className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-blue-600 group-hover:gap-2 transition-all">
                            Learn more <ArrowUpRight size={13} />
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* CTA row */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="mt-12 text-center">
                <Link to="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-gray-900/20 text-sm">
                    Get a Free Consultation <ArrowUpRight size={16} />
                </Link>
            </motion.div>
        </div>
    </section>
);

export default Features;
