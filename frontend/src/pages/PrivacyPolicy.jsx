import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
    Shield, Lock, FileText, Scale,
    UserCheck, AlertTriangle, Info,
    Mail, Phone, MapPin, ArrowRight,
    ChevronDown, CheckCircle2, Globe, RefreshCcw
} from 'lucide-react';

const PrivacyPolicy = () => {
    const [activeTab, setActiveTab] = useState('legal');

    useEffect(() => {
        // Check if there's a hash or state to set the initial tab
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '');
            if (['legal', 'terms', 'privacy', 'refund', 'contact'].includes(hash)) {
                setActiveTab(hash);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };

        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const tabs = [
        { id: 'legal', label: 'Legal Notice', icon: <Scale size={18} /> },
        { id: 'terms', label: 'Terms of Use', icon: <FileText size={18} /> },
        { id: 'privacy', label: 'Privacy Policy', icon: <Shield size={18} /> },
        { id: 'refund', label: 'Refund Policy', icon: <RefreshCcw size={18} /> },
        { id: 'contact', label: 'Contact & Grievance', icon: <Mail size={18} /> },
    ];

    return (
        <div className="min-h-screen bg-white text-gray-900 flex flex-col pt-20">
            <Navbar />

            {/* ===== HERO SECTION ===== */}
            <section className="relative overflow-hidden bg-gray-950 py-24 text-white">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6 tracking-widest uppercase"
                    >
                        <Lock size={12} /> Compliance & Legal
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight shadow-sm"
                    >
                        Legal & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Privacy</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-medium"
                    >
                        This documentation details our legal structure, terms of engagement, and commitment to your data privacy at Yuvan Creations.
                    </motion.p>
                </div>
            </section>

            {/* ===== TABS NAVIGATION ===== */}
            <div className="sticky top-20 z-40 bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar">
                    <div className="flex items-center justify-center gap-2 py-4 min-w-max">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === tab.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'
                                    }`}
                            >
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ===== CONTENT SECTION ===== */}
            <section className="py-20 bg-gray-50/50 flex-grow">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                    <AnimatePresence mode="wait">
                        {/* 1. LEGAL NOTICE */}
                        {activeTab === 'legal' && (
                            <motion.div
                                key="legal"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-8"
                            >
                                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                                            <Scale size={24} />
                                        </div>
                                        <h2 className="text-3xl font-black text-gray-900">LEGAL NOTICE</h2>
                                    </div>

                                    <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
                                        <p className="p-6 bg-blue-50/50 border-l-4 border-blue-500 rounded-r-xl italic font-medium">
                                            This document is an electronic record in terms of the Information Technology Act, 2000 and rules thereunder as applicable and the amended provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000. This electronic record is generated by a computer system and does not require any physical or digital signatures.
                                        </p>

                                        <p>
                                            This document is published in accordance with the provisions of Rule 3 (1) of the Information Technology (Intermediaries Guidelines) Rules, 2011 that require publishing the rules and regulations, privacy policy and Terms of Use for access or usage of domain name:
                                            <br />
                                            <a href="https://yuvancreations.in" className="text-blue-600 font-bold hover:underline">https://yuvancreations.in</a>
                                        </p>

                                        <p>(hereinafter referred to as “Website”), including the related mobile site and mobile application (hereinafter referred to as “Platform”).</p>

                                        <div className="bg-gray-900 rounded-3xl p-8 text-white relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                                <Info size={120} />
                                            </div>
                                            <h3 className="text-cyan-400 font-bold mb-4 uppercase tracking-widest text-sm">Platform Ownership</h3>
                                            <p className="text-xl font-bold mb-4">The Platform is owned by NISHANT SHARMA</p>
                                            <div className="flex items-start gap-3 text-gray-400">
                                                <MapPin size={20} className="text-cyan-400 mt-1 flex-shrink-0" />
                                                <p>
                                                    H.No 7, Dutt Kuti Colony, <br />
                                                    Purshottam Vihar, near Bangali Hospital, <br />
                                                    Kankhal, Haridwar, India
                                                </p>
                                            </div>
                                            <p className="mt-6 text-sm italic text-gray-500">(hereinafter referred to as “Platform Owner”, “we”, “us”, “our”).</p>
                                        </div>

                                        <p>Your use of the Platform and services and tools are governed by the following Terms and Conditions (“Terms of Use”). By using the Platform, you agree to be bound by these terms. These terms may be modified at any time without prior notice.</p>

                                        <p>For the purpose of these Terms of Use, “you”, “your” or “user” shall mean any person who uses the Platform.</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* 2. TERMS OF USE */}
                        {activeTab === 'terms' && (
                            <motion.div
                                key="terms"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-6"
                            >
                                <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                                            <AlertTriangle size={24} />
                                        </div>
                                        <h2 className="text-3xl font-black text-gray-900 uppercase">Important Notice</h2>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed font-bold border-l-4 border-amber-500 pl-6 py-2">
                                        Accessing, browsing or otherwise using the Platform indicates your agreement to all the Terms and Conditions under these Terms of Use. Please read them carefully before proceeding.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        "You agree to provide accurate and complete information during registration and are responsible for all activities under your account.",
                                        "We do not guarantee accuracy or completeness of information on this website. Errors may exist, and we are not liable for them.",
                                        "Your use of the Platform is at your own risk. Ensure services meet your requirements.",
                                        "All content (design, layout, graphics, etc.) belongs to us. You cannot claim ownership.",
                                        "Unauthorized use may lead to legal action.",
                                        "You agree to pay applicable service charges.",
                                        "You will not use the Platform for any illegal or unlawful activity.",
                                        "Third-party links are for convenience. Their policies will apply when you access them.",
                                        "Any transaction on the Platform creates a legally binding agreement.",
                                        "You agree to indemnify us against any claims due to your violation of terms or laws.",
                                        "We are not liable for failure due to force majeure events.",
                                        "These Terms are governed by Indian laws.",
                                        "All disputes will be under jurisdiction of courts in Haridwar, Uttarakhand.",
                                        "All concerns must be communicated via contact details on the website."
                                    ].map((term, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start gap-4 hover:border-blue-200 transition-colors group"
                                        >
                                            <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                {i + 1}
                                            </span>
                                            <p className="text-gray-600 font-medium leading-relaxed">{term}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* 3. PRIVACY POLICY */}
                        {activeTab === 'privacy' && (
                            <motion.div
                                key="privacy"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-8 text-gray-700"
                            >
                                <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                                            <Shield size={24} />
                                        </div>
                                        <h2 className="text-3xl font-black text-gray-900 uppercase">Privacy Policy</h2>
                                    </div>

                                    <div className="prose prose-blue max-w-none">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Introduction</h3>
                                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-xl">
                                            <p className="text-blue-800 text-sm font-bold">Domain Update Notification:</p>
                                            <p className="text-blue-700 text-sm">Our official website domain has been updated from <span className="font-mono">https://yuvancreations.github.io/yuvancreations</span> to <span className="font-mono font-bold text-blue-900">https://yuvancreations.in</span>. All services and policies are now associated with the updated domain.</p>
                                        </div>
                                        <p>This Privacy Policy explains how NISHANT SHARMA collects, uses, and protects your data through the website:</p>
                                        <p><a href="https://yuvancreations.in" className="text-blue-600 font-bold">https://yuvancreations.in</a></p>
                                        <p>Your data is processed in India. By using the Platform, you agree to this Privacy Policy and Indian laws.</p>

                                        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mt-8 flex items-start gap-4">
                                            <AlertTriangle className="text-red-500 flex-shrink-0 mt-1" size={20} />
                                            <div>
                                                <h4 className="text-red-900 font-black mb-1">Security Alert</h4>
                                                <p className="text-red-700 text-sm">Never share sensitive information like OTP, PIN, or passwords. If shared accidentally, report to authorities immediately.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-12 mt-12">
                                        {/* Policy Sections */}
                                        {[
                                            {
                                                num: 1,
                                                title: "Information We Collect",
                                                items: [
                                                    "Personal Information: Name, DOB, address, phone number, email, etc.",
                                                    "Sensitive Data: Bank details, payment info, biometric data (if applicable).",
                                                    "Usage Data: Behavior, preferences, interactions.",
                                                    "Transaction Data: Purchase and service details.",
                                                    "Cookies: To enhance user experience.",
                                                    "You can choose not to provide data but some features may not work."
                                                ]
                                            },
                                            {
                                                num: 2,
                                                title: "How We Use Your Information",
                                                items: ["Provide services", "Improve user experience", "Resolve issues", "Send offers and updates", "Prevent fraud", "Enforce policies"]
                                            },
                                            {
                                                num: 3,
                                                title: "Information Sharing",
                                                items: [
                                                    "With internal teams and affiliates",
                                                    "With third-party partners (payments, logistics, etc.)",
                                                    "When required by law",
                                                    "To protect rights and safety",
                                                    "Third-party policies apply when you share data with them."
                                                ]
                                            },
                                            {
                                                num: 4,
                                                title: "Data Protection & Security",
                                                items: [
                                                    "We use security measures to protect data",
                                                    "Secure servers are used",
                                                    "Internet transmission is not 100% secure",
                                                    "Users must protect login credentials"
                                                ]
                                            },
                                            {
                                                num: 5,
                                                title: "Data Deletion & Retention",
                                                items: [
                                                    "You can request account deletion",
                                                    "Some data may be retained for legal reasons",
                                                    "Deleted account loses all access",
                                                    "Data may be kept for fraud prevention or analytics"
                                                ]
                                            },
                                            {
                                                num: 6,
                                                title: "Your Rights",
                                                items: ["Access and update your data", "Withdraw consent anytime"]
                                            },
                                            {
                                                num: 7,
                                                title: "Consent",
                                                items: [
                                                    "You consent to data collection and usage",
                                                    "You allow us to contact you via SMS, call, email",
                                                    "You can withdraw consent via email"
                                                ]
                                            }
                                        ].map((sec) => (
                                            <div key={sec.num} className="border-t border-gray-100 pt-8 first:border-0 first:pt-0">
                                                <h4 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                                    <span className="text-blue-600 text-2xl">0{sec.num}.</span> {sec.title}
                                                </h4>
                                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {sec.items.map((item, idx) => (
                                                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
                                                            <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}

                                        <div className="border-t border-gray-100 pt-8">
                                            <h4 className="text-xl font-black text-gray-900 mb-4">08. Changes to Policy</h4>
                                            <p className="text-gray-600">Policy may be updated anytime. Check regularly for updates.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* 3.5 REFUND POLICY */}
                        {activeTab === 'refund' && (
                            <motion.div
                                key="refund"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-8 text-gray-700"
                            >
                                <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                                            <RefreshCcw size={24} />
                                        </div>
                                        <h2 className="text-3xl font-black text-gray-900 uppercase">Refund Policy</h2>
                                    </div>

                                    <div className="prose prose-blue max-w-none">
                                        <p className="text-lg font-medium leading-relaxed mb-6">
                                            At Yuvan Creations, we strive to provide high-quality services to our customers.
                                        </p>

                                        <div className="space-y-4">
                                            {[
                                                "Once a service has been initiated or completed, no refunds will be provided.",
                                                "Customers may request cancellation before the service has started. In such cases, a refund may be considered after deducting applicable charges.",
                                                "Any eligible refund will be processed within 5-7 business days from the date of approval.",
                                                "For any issues or concerns, customers are encouraged to contact us so we can resolve them promptly."
                                            ].map((item, idx) => (
                                                <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 italic">
                                                    <CheckCircle2 size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                                                    <p className="text-gray-700">{item}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <p className="mt-10 p-6 bg-blue-900 text-white rounded-3xl font-bold text-center">
                                            By purchasing our services, you agree to this refund policy.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* 4. CONTACT & GRIEVANCE */}
                        {activeTab === 'contact' && (
                            <motion.div
                                key="contact"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                            >
                                <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
                                    <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-8">
                                        <UserCheck size={28} />
                                    </div>
                                    <h2 className="text-2xl font-black text-gray-900 uppercase mb-2">Grievance Officer</h2>
                                    <p className="text-blue-600 font-bold mb-8">Nishant Sharma</p>

                                    <div className="space-y-6">
                                        <a href="mailto:yuvancreationshrd@gmail.com" className="flex items-center gap-4 text-gray-600 hover:text-blue-600 transition-colors">
                                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center"><Mail size={18} /></div>
                                            yuvancreationshrd@gmail.com
                                        </a>
                                        <a href="tel:+919557300217" className="flex items-center gap-4 text-gray-600 hover:text-blue-600 transition-colors">
                                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center"><Phone size={18} /></div>
                                            +91 9557300217
                                        </a>
                                    </div>
                                </div>

                                <div className="bg-gray-900 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                        <MapPin size={120} />
                                    </div>
                                    <div className="w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-8">
                                        <Globe size={28} />
                                    </div>
                                    <h2 className="text-2xl font-black mb-8 uppercase">Contact Us</h2>

                                    <div className="space-y-6 relative z-10">
                                        <div className="flex items-start gap-4">
                                            <MapPin size={24} className="text-cyan-400 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="font-bold text-lg mb-1">Yuvan Creations HQ</p>
                                                <p className="text-gray-400 text-sm leading-relaxed">
                                                    H.No 7, Dutt Kuti Colony, Purshottam Vihar,<br />
                                                    Near Bangali Hospital, Kankhal,<br />
                                                    Haridwar – 249401, Uttarakhand, India
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Mail size={20} className="text-cyan-400 flex-shrink-0" />
                                            <p className="text-gray-300">yuvancreationshrd@gmail.com</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Phone size={20} className="text-cyan-400 flex-shrink-0" />
                                            <p className="text-gray-300">+91 9557300217</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ===== FINAL NOTE ===== */}
                    <div className="mt-20 text-center pb-10">
                        <Link to="/" className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-200 font-bold rounded-2xl transition-all shadow-sm">
                            <ArrowRight size={18} className="rotate-180" /> Return to Home
                        </Link>
                        <p className="text-gray-400 text-xs mt-8 font-mono tracking-widest uppercase">
                            © {new Date().getFullYear()} Yuvan Creations Compliance Document
                        </p>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
