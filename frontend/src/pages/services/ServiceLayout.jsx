import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Contact from '../../components/Contact';

const ServiceLayout = ({ title, subtitle, icon, children }) => {
    // Scroll to top when loading a new service page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [title]);

    return (
        <div className="min-h-screen bg-white text-primary flex flex-col pt-20">
            <Navbar />

            {/* Service Hero */}
            <section className="relative py-20 bg-blue-50/50 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/2"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row items-center justify-between gap-12"
                    >
                        <div className="flex-1 max-w-2xl">
                            <span className="text-accent font-bold tracking-wide uppercase text-sm mb-4 block">Our Services</span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                                {title}
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed bg-white/60 p-6 rounded-2xl border border-white backdrop-blur-sm shadow-sm">
                                {subtitle}
                            </p>
                        </div>
                        <div className="hidden md:flex flex-shrink-0 w-48 h-48 bg-white rounded-3xl shadow-xl shadow-blue-900/5 items-center justify-center text-accent">
                            {icon}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Area */}
            <main className="flex-1 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>

            {/* Shared Contact Section */}
            <Contact />

            <Footer />
        </div>
    );
};

export default ServiceLayout;
