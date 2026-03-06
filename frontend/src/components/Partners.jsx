import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Globe, ArrowUpRight } from 'lucide-react';

const clients = [
    {
        name: 'YatraGo',
        tagline: 'Travel & Tourism Platform',
        url: 'https://yatrago.com/',
        logo: '✈️',
        color: 'from-orange-500 to-red-500',
        glow: 'rgba(249,115,22,0.3)',
        tag: 'Travel & Tourism',
    },
    {
        name: 'Shree Ganesh Studio',
        tagline: 'Professional Photography Studio',
        url: 'https://yuvancreations.github.io/shriganeshstudio/',
        logo: '📸',
        color: 'from-yellow-400 to-orange-400',
        glow: 'rgba(234,179,8,0.3)',
        tag: 'Photography',
    },
    {
        name: 'Vihaan Tour & Travels',
        tagline: 'Memorable Journeys, Every Time',
        url: 'https://yuvancreations.github.io/vihaantourandtravels/',
        logo: '🚌',
        color: 'from-emerald-400 to-cyan-500',
        glow: 'rgba(16,185,129,0.3)',
        tag: 'Travel & Tours',
    },
];

const Partners = () => {
    return (
        <section className="py-24 bg-gray-950 relative overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

            {/* Ambient glow blobs */}
            <div className="absolute top-0 left-1/4 w-80 h-80 bg-accent/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-cyan-400 font-mono tracking-widest text-sm mb-4 flex justify-center items-center gap-2"
                    >
                        <Globe size={16} /> {'<OurClients />'}
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight"
                    >
                        Trusted by{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                            Industry Leaders
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        Brands that chose us to build their digital presence — and never looked back.
                    </motion.p>
                </div>

                {/* Client Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {clients.map((client, index) => (
                        <motion.a
                            key={index}
                            href={client.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative bg-gray-900 rounded-3xl p-8 border border-gray-800 overflow-hidden cursor-pointer block shadow-xl transition-all duration-300"
                            style={{ '--glow': client.glow }}
                        >
                            {/* Card glow on hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                                style={{ boxShadow: `0 0 60px ${client.glow}`, border: `1px solid ${client.glow}` }}
                            ></div>

                            {/* Gradient shine strip at top */}
                            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${client.color} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>

                            {/* Tech grid inside */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40"></div>

                            {/* Logo / Emoji */}
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${client.color} flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                {client.logo}
                            </div>

                            {/* Tag badge */}
                            <span className="inline-block text-xs font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
                                {client.tag}
                            </span>

                            {/* Name */}
                            <h3 className="text-2xl font-black text-white mb-2 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-300 transition-all duration-300">
                                {client.name}
                            </h3>

                            {/* Tagline */}
                            <p className="text-gray-400 text-sm mb-8 leading-relaxed font-medium">
                                {client.tagline}
                            </p>

                            {/* CTA */}
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-accent text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                                    <ExternalLink size={14} /> Visit Website
                                </span>
                                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${client.color} flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-lg`}>
                                    <ArrowUpRight size={16} />
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Bottom trust badges */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap justify-center items-center gap-8 mt-20 pt-12 border-t border-gray-800"
                >
                    {['17+ Years Experience', '100+ Projects Delivered', '98% Client Satisfaction', 'Haridwar Based'].map((badge, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                            {badge}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Partners;
