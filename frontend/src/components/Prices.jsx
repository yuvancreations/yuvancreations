import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Monitor, Smartphone, Video, Megaphone, Facebook, Search, Clock, Tag, ShieldCheck, Wrench, Bolt, LayoutTemplate, Apple, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

const priceCards = [
    {
        title: 'Website Design',
        desc: 'Premium, conversion-focused UI/UX design turning visitors into loyal customers.',
        icon: <LayoutTemplate size={32} />,
        time: 'Custom Timeline',
        price: 'Custom Packages',
        badge: 'High Conversion',
        badgeIcon: <Bolt size={16} className="mr-1" />,
        path: '/pricing/website-design'
    },
    {
        title: 'App Development',
        desc: 'Custom iOS and Android applications built with cutting-edge frameworks.',
        icon: <Apple size={32} />,
        time: 'Custom Timeline',
        price: 'Custom Packages',
        badge: 'Maximum Performance',
        badgeIcon: <Bolt size={16} className="mr-1" />,
        path: '/pricing/app-development'
    },
    {
        title: 'Photography & Videography',
        desc: 'Professional shoots, cinematic video production, and post-editing.',
        icon: <Camera size={32} />,
        time: 'Per Event / Day',
        price: 'Custom Packages',
        badge: 'Cinematic Quality',
        badgeIcon: <Video size={16} className="mr-1" />,
        path: '/pricing/media-production'
    },
    {
        title: 'Computer Solutions',
        desc: 'Complete hardware and software services with genuine parts.',
        icon: <Monitor size={32} />,
        time: 'Diagnostic: 30 min (Free)',
        price: 'Starting from ₹999',
        badge: '1 Year Warranty',
        badgeIcon: <ShieldCheck size={16} className="mr-1" />,
        path: '/services/computer-solutions'
    },
    {
        title: 'Mobile Repair',
        desc: 'Professional repairs with 6-month warranty on all parts.',
        icon: <Smartphone size={32} />,
        time: 'Same-day service',
        price: 'Starting from ₹599',
        badge: 'Live Repair Updates',
        badgeIcon: <Wrench size={16} className="mr-1" />,
        path: '/services/mobile-repair'
    },
    {
        title: 'CCTV Solutions',
        desc: 'Professional installation with remote monitoring setup.',
        icon: <Video size={32} />,
        time: 'Install: 2-4 hours',
        price: 'Starting from ₹4,999',
        badge: '2 Year Warranty',
        badgeIcon: <ShieldCheck size={16} className="mr-1" />,
        path: '/services/cctv-solutions'
    },
    {
        title: 'Digital Marketing',
        desc: 'SEO, Content & Social Media growth strategies.',
        icon: <Megaphone size={32} />,
        time: 'Monthly Plans',
        price: 'Custom Packages',
        badge: 'ROI Focused',
        badgeIcon: <Bolt size={16} className="mr-1" />,
        path: '/services/digital-marketing'
    },
    {
        title: 'Meta Ads',
        desc: 'Facebook & Instagram campaigns for lead generation.',
        icon: <Facebook size={32} />,
        time: 'Precision Targeting',
        price: 'Ad Spend + Fee',
        badge: 'High Conversion',
        badgeIcon: <Bolt size={16} className="mr-1" />,
        path: '/services/meta-ads'
    },
    {
        title: 'Google Ads',
        desc: 'PPC Management for instant search visibility.',
        icon: <Search size={32} />,
        time: 'Pay Per Click',
        price: 'Budget Friendly',
        badge: 'Instant Leads',
        badgeIcon: <Bolt size={16} className="mr-1" />,
        path: '/services/google-ads'
    }
];

const Prices = () => {
    return (
        <section id="pricing" className="py-24 bg-gray-50 border-t border-gray-100 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4"
                    >
                        OUR PRICES
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight"
                    >
                        At Yuvan Creations, we specialize in <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">comprehensive solutions</span> tailored to your needs
                    </motion.h3>
                    <div className="w-20 h-1 bg-gradient-to-r from-accent to-blue-400 mx-auto mt-8 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {priceCards.map((card, index) => (
                        <Tilt key={index} tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} scale={1.03} transitionSpeed={1000} className="h-full">
                            <Link to={card.path} className="group block h-full">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (index % 3) * 0.1 }}
                                    className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:border-accent/40 transition-all duration-300 h-full flex flex-col"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    <div className="w-16 h-16 bg-blue-50 text-accent rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-all transform group-hover:rotate-6">
                                        {card.icon}
                                    </div>

                                    <h4 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h4>
                                    <p className="text-gray-500 mb-6 flex-1 text-sm leading-relaxed">{card.desc}</p>

                                    {/* Pricing Details Box - Replicating HTML layout precisely */}
                                    <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100 group-hover:border-accent/10">
                                        <div className="flex items-center text-sm text-gray-600 mb-2">
                                            <Clock size={16} className="text-accent mr-2" />
                                            {card.time}
                                        </div>
                                        <div className="flex items-center font-bold text-gray-900">
                                            <Tag size={16} className="text-accent mr-2" />
                                            {card.price}
                                        </div>
                                    </div>

                                    {/* Footer Badge */}
                                    <div className="mt-auto flex justify-center w-full">
                                        <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-accent bg-blue-50 group-hover:bg-accent group-hover:text-white transition-colors">
                                            {card.badgeIcon} {card.badge}
                                        </span>
                                    </div>
                                </motion.div>
                            </Link>
                        </Tilt>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Prices;
