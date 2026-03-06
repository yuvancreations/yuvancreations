import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
    Phone, Mail, MapPin, Send, Terminal, CheckCircle,
    Clock, Zap, Globe, MessageSquare, User, AtSign, ChevronRight
} from 'lucide-react';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

// ---- Typing terminal lines ----
const TerminalLine = ({ text, delay = 0, color = 'text-green-400' }) => (
    <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay }}
        className={`font-mono text-xs ${color} flex items-center gap-2 leading-relaxed`}
    >
        <span className="text-gray-600 select-none flex-shrink-0">$</span>
        <span>{text}</span>
    </motion.div>
);

// ---- Elegant info card ----
const InfoCard = ({ icon, label, value, href, accent, delay = 0 }) => (
    <motion.a
        href={href}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel="noreferrer"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        whileHover={{ y: -3 }}
        className={`group bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-4 cursor-pointer relative overflow-hidden`}
    >
        {/* Left accent bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 ${accent} rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />

        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl ${accent.replace('bg-', 'bg-').replace('-600', '-50').replace('-500', '-50')} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
            style={{ background: 'var(--icon-bg)' }}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}
                style={{ background: accent.includes('indigo') ? 'rgba(99,102,241,0.08)' : accent.includes('violet') ? 'rgba(139,92,246,0.08)' : 'rgba(16,185,129,0.08)' }}>
                <span className={accent.includes('indigo') ? 'text-blue-600' : accent.includes('violet') ? 'text-red-600' : 'text-emerald-500'}>
                    {icon}
                </span>
            </div>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
            <p className="text-gray-400 text-[10px] font-mono uppercase tracking-widest mb-0.5">{label}</p>
            <p className="text-gray-800 font-semibold text-sm leading-snug truncate">{value}</p>
        </div>

        <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0" />
    </motion.a>
);

const SERVICE_OPTIONS = [
    'Website Design',
    'Web Application',
    'Mobile App Development',
    'Digital Marketing',
    'SEO Services',
    'Meta Ads',
    'Google Ads',
    'Photography & Videography',
    'Computer Solutions',
    'Mobile Repair',
    'CCTV Solutions',
    'Other / General Inquiry',
];

const ContactPage = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState('');

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            // Create a readable ID: "Yuvan Sharma_1693526400000"
            const sanitizedName = form.name.replace(/[^a-zA-Z0-9 ]/g, "").trim().replace(/\s+/g, "_");
            const docId = `${sanitizedName}_${Date.now()}`;

            await setDoc(doc(db, 'contact_page_inquiries', docId), {
                ...form,
                createdAt: serverTimestamp()
            });

            // Send to Google Sheets Auto-Magic Script
            try {
                await fetch('https://script.google.com/macros/s/AKfycbwDSaHEY7BRrd4otYPqaLWDTrnbTqWcCVFZZr8f1qEQdT4zva9UoFn8xSx5kqO5FEFE/exec', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        sheetName: 'Contact Inquiries',
                        payload: {
                            Name: form.name,
                            Email: form.email,
                            Phone: form.phone,
                            Service: form.service,
                            Message: form.message
                        }
                    })
                });
            } catch (sheetError) {
                console.error("Google Sheets Error:", sheetError); // It might silently fail with no-cors but data will be sent
            }

            setSubmitted(true);
        } catch (error) {
            console.error("Error submitting form: ", error);
            alert("Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const inputCls = (field) =>
        `w-full border rounded-xl px-4 py-3.5 text-gray-800 text-sm font-medium placeholder-gray-400 outline-none transition-all duration-200 ${focused === field
            ? 'bg-white border-blue-400 shadow-[0_0_0_3px_rgba(99,102,241,0.1)]'
            : 'bg-gray-50 border-gray-200 hover:border-gray-300'
        }`;

    return (
        <div className="min-h-screen bg-white text-gray-900 flex flex-col pt-20">
            <Navbar />

            {/* ===== HERO ===== */}
            <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/60 to-blue-50/40 py-24 md:py-32">
                {/* Background dots */}
                <div className="absolute inset-0 opacity-30"
                    style={{ backgroundImage: 'radial-gradient(circle, #6366f118 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-blue-100/30 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-100/20 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    {/* Terminal widget */}
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block bg-gray-900 border border-gray-800 rounded-2xl px-6 py-4 mb-10 text-left shadow-2xl"
                        style={{ minWidth: 300 }}
                    >
                        <div className="flex items-center gap-1.5 mb-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                            <span className="ml-3 text-gray-500 text-[10px] font-mono tracking-wider">contact@yuvan-creations</span>
                        </div>
                        <div className="space-y-1.5">
                            <TerminalLine text="connect --with yuvan-creations" delay={0.1} color="text-green-400" />
                            <TerminalLine text="status: AVAILABLE FOR PROJECTS" delay={0.4} color="text-cyan-400" />
                            <TerminalLine text="response_time: ~2 hours" delay={0.7} color="text-amber-400" />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-5xl md:text-7xl font-black mb-5 leading-tight tracking-tight text-gray-900"
                    >
                        Let's{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-blue-700 to-pink-500">
                            Connect
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-500 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10"
                    >
                        Questions about our services? Want to discuss a project?<br className="hidden md:block" />
                        We would love to hear from you.
                    </motion.p>

                    {/* Badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-3"
                    >
                        {[
                            { icon: <Zap size={12} />, text: '~2 hr Response Time' },
                            { icon: <MapPin size={12} />, text: 'Haridwar, Uttarakhand' },
                            { icon: <Clock size={12} />, text: 'Mon–Sat · 9AM–7PM' },
                        ].map((b, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 bg-white border border-blue-100 shadow-sm px-4 py-2 rounded-full">
                                {b.icon} {b.text}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ===== MAIN SECTION: Details (left) + Form (right) ===== */}
            <section className="py-20 bg-gray-50/80 relative">
                <div className="absolute inset-0 opacity-[0.15]"
                    style={{ backgroundImage: 'radial-gradient(circle, #6366f110 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                        {/* ===== LEFT: Contact Details ===== */}
                        <div className="flex flex-col gap-7">
                            <div>
                                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                                    className="text-blue-600 font-mono text-xs tracking-[0.2em] mb-2 uppercase">
                                    // our_details
                                </motion.p>
                                <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                    className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-3">
                                    Reach Out.<br />We&apos;re Right Here.
                                </motion.h2>
                                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                                    className="text-gray-500 text-sm leading-relaxed">
                                    Our team is always ready to discuss your project, answer questions, or explore how we can help your business grow.
                                </motion.p>
                            </div>

                            {/* Info cards */}
                            <div className="flex flex-col gap-3">
                                <InfoCard href="tel:+919557300217" icon={<Phone size={20} />}
                                    label="Contact Channels" value="+91 9557300217" accent="bg-blue-600" delay={0} />
                                <InfoCard href="mailto:yuvancreationshrd@gmail.com" icon={<Mail size={20} />}
                                    label="Digital Reach" value="yuvancreationshrd@gmail.com" accent="bg-red-600" delay={0.08} />
                                <InfoCard href="https://maps.google.com/?q=Dutt+Kuti+Colony,Purshottam+Vihar,Kankhal,Haridwar"
                                    icon={<MapPin size={20} />} label="Physical Space"
                                    value="Kankhal, Haridwar — 249408, Uttarakhand" accent="bg-emerald-600" delay={0.16} />
                            </div>

                            {/* Business hours */}
                            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                                <p className="text-gray-400 text-[10px] font-mono uppercase tracking-widest mb-3">// business_hours</p>
                                <div className="space-y-2.5">
                                    {[
                                        { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM' },
                                        { day: 'Saturday', time: '10:00 AM – 5:00 PM' },
                                        { day: 'Sunday', time: 'Closed' },
                                    ].map((h, i) => (
                                        <div key={i} className="flex items-center justify-between border-b border-gray-50 last:border-0 pb-2 last:pb-0">
                                            <span className="text-gray-600 text-sm">{h.day}</span>
                                            <span className={`text-sm font-bold ${h.time === 'Closed' ? 'text-red-400' : 'text-blue-600'}`}>{h.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ===== RIGHT: Form ===== */}
                        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <div className="bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden">
                                {/* Terminal top bar */}
                                <div className="bg-gray-900 px-6 py-4 flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-red-500" />
                                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <span className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="ml-4 text-gray-400 font-mono text-xs flex items-center gap-2">
                                        <Terminal size={11} className="text-blue-500" /> service_inquiry.init
                                    </span>
                                    <span className="ml-auto text-[10px] font-mono text-green-400 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> READY
                                    </span>
                                </div>

                                <div className="p-8">
                                    <AnimatePresence mode="wait">
                                        {submitted ? (
                                            <motion.div key="success"
                                                initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                                                className="flex flex-col items-center justify-center py-14 text-center">
                                                <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.5 }}
                                                    className="w-20 h-20 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center mb-6">
                                                    <CheckCircle size={38} className="text-green-500" />
                                                </motion.div>
                                                <h3 className="text-2xl font-black text-gray-900 mb-2">Message Sent!</h3>
                                                <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                                                    We have received your inquiry. Our team will get back to you within 2 hours.
                                                </p>
                                                <div className="mt-6 font-mono text-xs text-green-600 bg-green-50 border border-green-100 rounded-xl px-5 py-3">
                                                    ✔ SUCCESS — Response time: ~2 hours
                                                </div>
                                                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }); }}
                                                    className="mt-5 text-blue-600 text-sm font-semibold hover:underline">
                                                    Send another message →
                                                </button>
                                            </motion.div>
                                        ) : (
                                            <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                    <div>
                                                        <label className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400 mb-2 uppercase tracking-[0.15em]">
                                                            <User size={10} className="text-blue-500" /> Full Name
                                                        </label>
                                                        <input name="name" value={form.name} onChange={handleChange}
                                                            onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                                                            required placeholder="John Doe" className={inputCls('name')} />
                                                    </div>
                                                    <div>
                                                        <label className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400 mb-2 uppercase tracking-[0.15em]">
                                                            <AtSign size={10} className="text-blue-500" /> Email Address
                                                        </label>
                                                        <input name="email" type="email" value={form.email} onChange={handleChange}
                                                            onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                                                            required placeholder="john@example.com" className={inputCls('email')} />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                    <div>
                                                        <label className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400 mb-2 uppercase tracking-[0.15em]">
                                                            <Phone size={10} className="text-blue-500" /> Phone Number
                                                        </label>
                                                        <input name="phone" value={form.phone} onChange={handleChange}
                                                            onFocus={() => setFocused('phone')} onBlur={() => setFocused('')}
                                                            placeholder="+91 00000 00000" className={inputCls('phone')} />
                                                    </div>
                                                    <div>
                                                        <label className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400 mb-2 uppercase tracking-[0.15em]">
                                                            <Globe size={10} className="text-blue-500" /> Service Required
                                                        </label>
                                                        <select name="service" value={form.service} onChange={handleChange}
                                                            onFocus={() => setFocused('service')} onBlur={() => setFocused('')}
                                                            className={inputCls('service')}>
                                                            <option value="">— Select a service —</option>
                                                            {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400 mb-2 uppercase tracking-[0.15em]">
                                                        <MessageSquare size={10} className="text-blue-500" /> Your Message
                                                    </label>
                                                    <textarea name="message" value={form.message} onChange={handleChange}
                                                        onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                                                        required rows={5}
                                                        placeholder="Tell us about your project, goals, or any questions..."
                                                        className={`${inputCls('message')} resize-none`} />
                                                </div>
                                                <motion.button type="submit" disabled={loading}
                                                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                                                    className="w-full py-4 bg-gradient-to-r from-red-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-black rounded-xl text-sm tracking-wide shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                                                    {loading ? (
                                                        <>
                                                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                                                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                                                            Sending your message...
                                                        </>
                                                    ) : <><Send size={15} /> Send Message</>}
                                                </motion.button>
                                                <p className="text-center text-gray-400 text-[11px] font-mono">
                                                    {'// We reply within ~2 hours on business days'}
                                                </p>
                                            </motion.form>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== FULL-WIDTH MAP ===== */}
            <section className="bg-white border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="rounded-3xl overflow-hidden border border-gray-200 shadow-xl">
                        <iframe
                            title="Yuvan Creations Location"
                            src="https://maps.google.com/maps?q=Dutt+Kuti+Colony,Purshottam+Vihar,near+Bangali+Hospital,Kankhal,Haridwar,Uttarakhand+249408&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="420"
                            style={{ border: 0, display: 'block' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                        <div className="bg-white px-6 py-4 flex items-center justify-between gap-4 flex-wrap border-t border-gray-100">
                            <div className="flex items-start gap-3">
                                <MapPin size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-gray-800 font-bold text-sm">Yuvan Creations HQ</p>
                                    <p className="text-gray-500 text-xs mt-0.5">
                                        Dutt Kuti Colony, Purshottam Vihar, near Bangali Hospital, Kankhal, Haridwar, Uttarakhand — 249408
                                    </p>
                                </div>
                            </div>
                            <a href="https://maps.google.com/?q=Dutt+Kuti+Colony,Purshottam+Vihar,near+Bangali+Hospital,Kankhal,Haridwar,Uttarakhand+249408"
                                target="_blank" rel="noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-full transition-colors flex-shrink-0">
                                <Globe size={13} /> Get Directions
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== BOTTOM TRUST STRIP ===== */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            {
                                icon: <Zap size={26} className="text-amber-500 mx-auto mb-3" />,
                                title: 'Fast Response',
                                desc: 'We reply to every inquiry within 2 business hours — no waiting, no ghosting.',
                            },
                            {
                                icon: <MessageSquare size={26} className="text-blue-600 mx-auto mb-3" />,
                                title: 'Free Consultation',
                                desc: 'Every conversation starts with a free project consultation. No commitment required.',
                            },
                            {
                                icon: <CheckCircle size={26} className="text-emerald-500 mx-auto mb-3" />,
                                title: 'No Jargon',
                                desc: "We speak your language — clear, transparent communication from day one.",
                            },
                        ].map((w, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                {w.icon}
                                <h3 className="text-base font-bold text-gray-900 mb-1.5">{w.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA BANNER ===== */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-blue-700 to-blue-800" />
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center px-4 relative z-10"
                >
                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="inline-block mb-5">
                        <Phone size={44} className="text-white/80" strokeWidth={1.5} />
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                        Prefer to Talk Directly?
                    </h2>
                    <p className="text-indigo-100 text-base md:text-lg mb-8 max-w-xl mx-auto">
                        Call us right now — we're available Mon–Sat, 9AM to 7PM.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="tel:+919557300217"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-black rounded-xl shadow-xl hover:bg-blue-50 transition-colors text-sm">
                            <Phone size={16} /> +91-9557300217
                        </a>
                        <a href="mailto:yuvancreationshrd@gmail.com"
                            className="inline-flex items-center gap-2 px-8 py-4 border border-white/40 hover:border-white text-white font-semibold rounded-xl transition-all text-sm">
                            <Mail size={16} /> Email Us
                        </a>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default ContactPage;
