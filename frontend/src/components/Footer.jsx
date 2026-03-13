import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, ArrowUpRight, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

// Floating particle that drifts upward
const Particle = ({ style }) => (
    <motion.div
        className="absolute rounded-full bg-accent/30 pointer-events-none"
        style={style}
        animate={{ y: [0, -120, 0], opacity: [0, 0.7, 0], scale: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: style.duration, delay: style.delay, ease: 'easeInOut' }}
    />
);

const particles = Array.from({ length: 18 }, (_, i) => ({
    width: `${Math.random() * 6 + 3}px`,
    height: `${Math.random() * 6 + 3}px`,
    left: `${Math.random() * 100}%`,
    bottom: `${Math.random() * 40}%`,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 4,
}));

const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services/web-apps' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Membership', to: '/membership' },
    { label: 'Pricing', to: '/pricing/website-design' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
];

const services = [
    { label: 'Website Design', to: '/services/website-design' },
    { label: 'App Development', to: '/services/mobile-app-development' },
    { label: 'Photography & Videography', to: '/services/media-production' },
    { label: 'Computer Solutions', to: '/services/computer-solutions' },
    { label: 'Digital Marketing', to: '/services/digital-marketing' },
];

const Footer = () => {
    return (
        <footer className="relative bg-gray-950 overflow-hidden pt-20 pb-0">

            {/* Ambient glow blobs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/8 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/8 blur-[140px] rounded-full pointer-events-none" />

            {/* Animated floating particles */}
            {particles.map((p, i) => <Particle key={i} style={p} />)}

            {/* Tech grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            {/* Animated top border gradient */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #3b82f6, #22d3ee, #3b82f6, transparent)' }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-gray-800">

                    {/* Brand Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-5"
                    >
                        <Link to="/" className="inline-block mb-6 bg-white/5 border border-white/10 p-3 rounded-2xl hover:border-cyan-500/40 transition-colors">
                            <img src={`${import.meta.env.BASE_URL}images/logo/footer logo.png`} alt="Yuvan Creations" className="h-14 w-auto object-contain" />
                        </Link>

                        <p className="text-gray-400 leading-relaxed max-w-xs text-sm mb-8">
                            Empowering You With Tech & Creativity Since 2007. Your trusted partner for premium digital services and IT solutions in Haridwar.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-4">
                            <a href="mailto:yuvancreationhrd@gmail.com"
                                className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
                                <span className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all">
                                    <Mail size={14} className="text-accent group-hover:text-white" />
                                </span>
                                yuvancreationhrd@gmail.com
                            </a>
                            <a href="tel:+919557300217"
                                className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors text-sm">
                                <span className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-all">
                                    <Phone size={14} className="text-cyan-400 group-hover:text-white" />
                                </span>
                                +91-9557300217
                            </a>
                            <div className="group flex items-center gap-3 text-gray-400 text-sm">
                                <span className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                    <MapPin size={14} className="text-emerald-400" />
                                </span>
                                Haridwar, Uttarakhand, India
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-3"
                    >
                        <h4 className="text-white font-mono font-bold mb-6 text-sm tracking-widest uppercase flex items-center gap-2">
                            <Terminal size={14} className="text-cyan-400" /> Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.to}
                                        className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                                        <span className="w-0 group-hover:w-3 h-px bg-cyan-400 transition-all duration-300 overflow-hidden" />
                                        {link.label}
                                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-4"
                    >
                        <h4 className="text-white font-mono font-bold mb-6 text-sm tracking-widest uppercase flex items-center gap-2">
                            <Terminal size={14} className="text-cyan-400" /> Our Services
                        </h4>
                        <ul className="space-y-3">
                            {services.map((s) => (
                                <li key={s.label}>
                                    <Link to={s.to}
                                        className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                                        <span className="w-0 group-hover:w-3 h-px bg-accent transition-all duration-300 overflow-hidden" />
                                        {s.label}
                                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 text-accent transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-gray-500 text-sm font-mono"
                    >
                        © {new Date().getFullYear()} <span className="text-cyan-400 font-bold">Yuvan Creations</span>. All rights reserved.
                    </motion.p>

                    {/* Social Icons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                    >
                        {[
                            { icon: <Facebook size={16} />, href: 'https://www.facebook.com/yuvancreations', color: 'hover:bg-blue-600' },
                            { icon: <Instagram size={16} />, href: 'https://www.instagram.com/yuvancreationshrd/', color: 'hover:bg-pink-600' },
                            { icon: <Linkedin size={16} />, href: 'https://www.linkedin.com/in/yuvan-creations-7b6531371/', color: 'hover:bg-blue-700' },
                        ].map((s, i) => (
                            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                                className={`w-9 h-9 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white ${s.color} hover:border-transparent transition-all duration-300`}>
                                {s.icon}
                            </a>
                        ))}
                    </motion.div>

                    <p className="text-gray-600 text-xs font-mono">
                        {'</'} Built with ❤️ By YUVAN CREATIONS {'>'}
                    </p>
                </div>
            </div>

            {/* Glowing bottom strip */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
        </footer>
    );
};

export default Footer;
