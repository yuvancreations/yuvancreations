import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Monitor, Smartphone, Video, Megaphone, Facebook, Search, Apple, Code, LayoutTemplate, Camera, X, ArrowUpRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
    {
        title: 'Web Apps',
        description: 'Robust, full-stack scalable web applications tailored perfectly for your business logic.',
        icon: <Code size={32} />,
        path: '/services/web-apps',
        details: 'We build powerful, scalable web applications using the latest technologies like React, Node.js, and cloud infrastructure. From e-commerce platforms to enterprise dashboards, we architect solutions that grow with your business.',
        highlights: ['React / Next.js Frontend', 'Node.js & REST API Backend', 'Cloud Deployment (AWS/GCP)', 'Custom Admin Dashboards', 'Real-time Features & Chat'],
        badge: 'Full Stack'
    },
    {
        title: 'Mobile App Development',
        description: 'Custom iOS and Android applications built with cutting-edge frameworks for maximum performance.',
        icon: <Apple size={32} />,
        path: '/services/mobile-app-development',
        details: 'From idea to App Store listing, we build high-performance native and cross-platform mobile apps. Our apps are fast, beautiful, and built to convert users into loyal customers.',
        highlights: ['iOS & Android Apps', 'React Native / Flutter', 'UI/UX Prototyping', 'App Store Deployment', 'Push Notifications & Analytics'],
        badge: 'iOS & Android'
    },
    {
        title: 'Website Design',
        description: 'Premium, conversion-focused UI/UX design turning visitors into loyal customers.',
        icon: <LayoutTemplate size={32} />,
        path: '/services/website-design',
        details: 'We design stunning, responsive websites that don\'t just look good — they convert. Every pixel is crafted with intent, focusing on user experience, brand identity, and measurable business results.',
        highlights: ['Custom UI/UX Design', 'Responsive & Mobile-first', 'SEO-Optimized Structure', 'Figma Prototyping', 'Landing Page Optimization'],
        badge: 'UI/UX'
    },
    {
        title: 'Photography & Videography',
        description: 'Professional shoots, event coverage, editing, and high-quality cinematic video production.',
        icon: <Camera size={32} />,
        path: '/services/media-production',
        details: 'Our team of creative professionals brings your brand story to life through stunning visuals. From product photography to cinematic event reels, we deliver quality content that captivates your audience.',
        highlights: ['Product Photography', 'Event & Wedding Coverage', 'Reels & Short-form Video', 'Cinematic Editing', 'Drone Aerial Shots'],
        badge: 'Creative'
    },
    {
        title: 'Computer Solutions',
        description: 'High-performance hardware and software solutions tailored to your needs. Complete services with genuine parts.',
        icon: <Monitor size={32} />,
        path: '/services/computer-solutions',
        details: 'Comprehensive computer repair and upgrade services with a 1-year warranty on all parts. We handle everything from virus removal to full hardware rebuilds. Free diagnosis included.',
        highlights: ['Hardware Repair & Upgrade', 'Virus & Malware Removal', 'Data Recovery', 'OS Installation & Setup', 'Free Diagnostic (30 min)'],
        badge: '1 Year Warranty'
    },
    {
        title: 'Mobile Repair',
        description: 'Expert repairs for all mobile devices. Professional repairs with 6-month warranty on all parts.',
        icon: <Smartphone size={32} />,
        path: '/services/mobile-repair',
        details: 'Same-day repairs for all major smartphone brands. Our certified technicians use genuine parts and offer a 6-month warranty on all repairs. Live repair status updates keep you informed throughout.',
        highlights: ['Screen Replacement', 'Battery Replacement', 'Water Damage Repair', 'All Major Brands Supported', 'Same-day Service'],
        badge: '6-Month Warranty'
    },
    {
        title: 'CCTV Solutions',
        description: 'Advanced surveillance systems for complete security monitoring. Professional installation with remote setup.',
        icon: <Video size={32} />,
        path: '/services/cctv-solutions',
        details: 'From home security to enterprise surveillance, we design and install CCTV systems with remote monitoring capabilities. Get peace of mind with 24/7 protection and real-time alerts on your phone.',
        highlights: ['HD & 4K Camera Systems', 'Remote Mobile Monitoring', 'Night Vision Cameras', 'Professional Installation', '2-Year Warranty'],
        badge: 'Security'
    },
    {
        title: 'Digital Marketing',
        description: 'Strategic SEO, Content & Social Media growth strategies to grow your reach organically.',
        icon: <Megaphone size={32} />,
        path: '/services/digital-marketing',
        details: 'Data-driven digital marketing strategies that grow your online presence and drive real business results. We combine SEO, content creation, and social media management to build your brand authority.',
        highlights: ['Search Engine Optimization (SEO)', 'Social Media Management', 'Content Strategy', 'Monthly Analytics Reports', 'Competitor Analysis'],
        badge: 'Growth'
    },
    {
        title: 'Meta Ads',
        description: 'High-ROI Facebook & Instagram campaigns for lead generation and brand awareness.',
        icon: <Facebook size={32} />,
        path: '/services/meta-ads',
        details: 'We create and manage precision-targeted Facebook and Instagram ad campaigns that generate real leads and sales. From creative design to A/B testing and conversion optimization, we handle everything.',
        highlights: ['Facebook & Instagram Ads', 'Audience Targeting & Retargeting', 'Creative Ad Design', 'A/B Testing', 'Conversion Tracking'],
        badge: 'High ROI'
    },
];

// --- Service Detail Modal ---
const ServiceModal = ({ service, onClose }) => {
    if (!service) return null;
    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="relative bg-gray-900 border border-gray-700 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
                    initial={{ scale: 0.9, y: 30, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 30, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Top gradient accent strip */}
                    <div className="h-1 w-full bg-gradient-to-r from-accent via-cyan-400 to-blue-600" />

                    {/* Tech grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />

                    {/* Ambient glow */}
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-40 bg-accent/20 blur-[80px] rounded-full pointer-events-none" />

                    <div className="relative z-10 p-8">
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                        >
                            <X size={18} />
                        </button>

                        {/* Icon + Badge */}
                        <div className="flex items-center gap-4 mb-5">
                            <div className="w-16 h-16 bg-accent/10 text-accent border border-accent/30 rounded-2xl flex items-center justify-center shadow-lg shadow-accent/10">
                                {service.icon}
                            </div>
                            <div>
                                <span className="inline-block text-xs font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 rounded-full mb-1 uppercase tracking-widest">
                                    {service.badge}
                                </span>
                                <h3 className="text-2xl font-black text-white">{service.title}</h3>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 leading-relaxed mb-6 text-sm">
                            {service.details}
                        </p>

                        {/* Highlights */}
                        <div className="mb-8">
                            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">What's Included</p>
                            <ul className="grid grid-cols-1 gap-2">
                                {service.highlights.map((h, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex items-center gap-2 text-sm text-gray-300"
                                    >
                                        <CheckCircle size={15} className="text-cyan-400 flex-shrink-0" />
                                        {h}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {/* CTA */}
                        <Link
                            to={service.path}
                            onClick={onClose}
                            className="flex items-center justify-center gap-2 w-full py-3.5 bg-accent hover:bg-blue-600 text-white font-bold rounded-xl transition-colors tracking-wide text-sm shadow-lg shadow-accent/20"
                        >
                            View Full Service Page <ArrowUpRight size={16} />
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// --- Main Services Component ---
const Services = () => {
    const [selectedService, setSelectedService] = useState(null);

    return (
        <>
            <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />

            <section id="services" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-primary font-bold tracking-wide uppercase text-sm mb-2"
                        >
                            Our Services
                        </motion.h2>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-bold text-gray-900"
                        >
                            Elevating Your Digital Experience
                        </motion.h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <Tilt key={index} tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={1000} scale={1.02} transitionSpeed={1000} className="h-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (index % 3) * 0.1 }}
                                    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 group h-full flex flex-col items-start"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    <div className="w-14 h-14 bg-blue-50 text-accent rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all shadow-sm" style={{ transform: "translateZ(30px)" }}>
                                        {service.icon}
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-accent transition-colors" style={{ transform: "translateZ(20px)" }}>{service.title}</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1" style={{ transform: "translateZ(10px)" }}>{service.description}</p>
                                    <button
                                        onClick={() => setSelectedService(service)}
                                        className="text-accent font-semibold flex items-center mt-auto text-sm hover:gap-2 gap-1 transition-all duration-200 group/btn"
                                        style={{ transform: "translateZ(20px)" }}
                                    >
                                        Learn more <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                    </button>
                                </motion.div>
                            </Tilt>
                        ))}
                    </div>

                    {/* --- Cinematic Spotlight Row: Google Ads Showcase --- */}
                    <div className="mt-16 w-full rounded-[2rem] bg-gray-900 overflow-hidden relative shadow-2xl flex flex-col lg:flex-row items-center justify-between p-8 lg:p-12 border border-gray-800">

                        {/* Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/20 blur-[100px] rounded-full pointer-events-none"></div>

                        {/* Left Animated Graphic (Vector Hands & Keyboard Coding) */}
                        <div className="hidden lg:flex w-1/3 justify-center relative h-64 items-center">
                            <motion.div
                                initial={{ rotateX: 60, y: 50, opacity: 0 }}
                                whileInView={{ opacity: 1, rotateX: 60, y: 30 }}
                                className="absolute bottom-4 w-56 h-28 bg-gray-800 rounded-xl border-t border-gray-700 grid grid-cols-7 gap-1.5 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10"
                                style={{ perspective: 1000 }}
                            >
                                {Array.from({ length: 21 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0.2, 1, 0.2], backgroundColor: ['#374151', '#3b82f6', '#374151'] }}
                                        transition={{ repeat: Infinity, duration: Math.random() * 2 + 0.5, delay: Math.random() }}
                                        className="bg-gray-700 rounded-sm shadow-inner"
                                    />
                                ))}
                            </motion.div>
                            <motion.div animate={{ y: [0, -15, 0], x: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} className="absolute bottom-20 left-16 w-14 h-20 bg-gradient-to-t from-accent to-blue-300 rounded-full opacity-80 blur-[4px] z-20" />
                            <motion.div animate={{ y: [0, -10, 0], x: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut", delay: 0.3 }} className="absolute bottom-20 right-16 w-14 h-20 bg-gradient-to-t from-cyan-400 to-blue-300 rounded-full opacity-80 blur-[4px] z-20" />
                            <motion.div animate={{ y: [-20, -100], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }} className="absolute bottom-32 text-accent font-mono text-sm font-bold z-0">{'<ScaleROI />'}</motion.div>
                            <motion.div animate={{ y: [-10, -90], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "linear", delay: 1 }} className="absolute bottom-28 right-8 text-cyan-400 font-mono text-sm font-bold z-0">{'await generateLeads();'}</motion.div>
                        </div>

                        {/* Center Spotlight: Google Ads Card */}
                        <div className="w-full lg:w-1/3 z-30 flex justify-center py-8 lg:py-0">
                            <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} perspective={1000} scale={1.1} transitionSpeed={500} className="w-full max-w-sm">
                                <div className="bg-white/10 backdrop-blur-xl p-8 lg:p-10 rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.2)] border border-white/20 flex flex-col items-center text-center hover:shadow-[0_0_80px_rgba(34,211,238,0.4)] hover:border-accent/50 transition-all duration-500">
                                    <div className="w-24 h-24 bg-gradient-to-br from-accent to-cyan-400 text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-blue-500/30">
                                        <Search size={48} className="animate-bounce" />
                                    </div>
                                    <h4 className="text-3xl font-black text-white mb-3 tracking-wide">Google Ads</h4>
                                    <p className="text-gray-300 leading-relaxed mb-8 text-sm">
                                        Dominate the search engine algorithm. Elite PPC Management strategies designed for instant visibility and hyper-targeted lead generation.
                                    </p>
                                    <button
                                        onClick={() => setSelectedService({
                                            title: 'Google Ads',
                                            icon: <Search size={32} />,
                                            path: '/services/google-ads',
                                            badge: 'Instant Leads',
                                            details: 'Our Google Ads specialists craft precision PPC campaigns that put you at the top of search results instantly. We handle everything from keyword research to bid management, remarketing, and conversion tracking.',
                                            highlights: ['Keyword Research & Strategy', 'Ad Copy Writing & A/B Testing', 'Bid Management & Optimization', 'Remarketing Campaigns', 'Monthly Performance Reports']
                                        })}
                                        className="text-white font-bold px-8 py-4 bg-accent/80 backdrop-blur-md rounded-xl w-full border border-blue-400/50 hover:bg-accent hover:border-white transition-colors tracking-wide uppercase text-sm flex justify-center items-center gap-2"
                                    >
                                        Learn More <Search size={16} />
                                    </button>
                                </div>
                            </Tilt>
                        </div>

                        {/* Right Animated Graphic */}
                        <div className="hidden lg:flex w-1/3 justify-center relative h-64 items-center">
                            <div className="absolute top-8 w-56 h-36 bg-gray-800 rounded-xl border-2 border-gray-700 flex items-end justify-center p-3 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] z-10">
                                <div className="flex space-x-3 items-end h-full w-full justify-between opacity-90">
                                    <motion.div animate={{ height: ['20%', '70%', '20%'] }} transition={{ repeat: Infinity, duration: 2 }} className="w-full bg-blue-500 rounded-t-md shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                    <motion.div animate={{ height: ['40%', '90%', '40%'] }} transition={{ repeat: Infinity, duration: 2, delay: 0.2 }} className="w-full bg-accent rounded-t-md shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                    <motion.div animate={{ height: ['30%', '100%', '30%'] }} transition={{ repeat: Infinity, duration: 2, delay: 0.4 }} className="w-full bg-cyan-400 rounded-t-md shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                                    <motion.div animate={{ height: ['50%', '80%', '50%'] }} transition={{ repeat: Infinity, duration: 2, delay: 0.6 }} className="w-full bg-blue-600 rounded-t-md shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                                </div>
                            </div>
                            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute top-16 left-12 w-5 h-5 bg-accent rounded-full shadow-[0_0_20px_rgba(59,130,246,0.9)] z-20" />
                            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }} className="absolute top-24 right-12 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.9)] z-20" />
                            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0">
                                <motion.path d="M 0 120 Q 50 20 100 120 T 200 120 T 300 120" stroke="#3b82f6" strokeWidth="3" fill="transparent" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} />
                            </svg>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default Services;
