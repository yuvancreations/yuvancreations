import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            // Create custom document ID: "Name_Timestamp"
            const safeName = formData.name.replace(/[^a-zA-Z0-9 ]/g, "").trim().replace(/\s+/g, "_");
            const docId = safeName ? `${safeName}_${Date.now()}` : `User_${Date.now()}`;

            await setDoc(doc(db, 'contact_messages', docId), {
                ...formData,
                createdAt: serverTimestamp()
            });

            // Send to Google Sheets Auto-Magic Script
            try {
                await fetch('https://script.google.com/macros/s/AKfycbwDSaHEY7BRrd4otYPqaLWDTrnbTqWcCVFZZr8f1qEQdT4zva9UoFn8xSx5kqO5FEFE/exec', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        sheetName: 'Quick Messages',
                        payload: {
                            Name: formData.name,
                            Email: formData.email,
                            Phone: formData.phone,
                            Message: formData.message
                        }
                    })
                });
            } catch (sheetError) {
                console.error("Google Sheets Error:", sheetError);
            }

            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Let's build something extraordinary together</h2>
                        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                            Ready to elevate your brand or need expert tech solutions? Reach out to us today and let's discuss how we can help.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-accent">
                                    <MapPin size={24} />
                                </div>
                                <div className="ml-6">
                                    <h4 className="text-lg font-bold text-gray-900">Our Location</h4>
                                    <p className="mt-1 text-gray-600">Haridwar, Uttarakhand<br />India</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-accent">
                                    <Phone size={24} />
                                </div>
                                <div className="ml-6">
                                    <h4 className="text-lg font-bold text-gray-900">Phone</h4>
                                    <p className="mt-1 text-gray-600">+91-9557300217</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-accent">
                                    <Mail size={24} />
                                </div>
                                <div className="ml-6">
                                    <h4 className="text-lg font-bold text-gray-900">Email</h4>
                                    <p className="mt-1 text-gray-600">yuvancreationhrd@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-black/5"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>

                        {status === 'success' ? (
                            <div className="flex flex-col items-center justify-center h-full py-12 text-center space-y-4">
                                <CheckCircle2 size={64} className="text-green-500" />
                                <h4 className="text-xl font-bold text-gray-900">Message Sent!</h4>
                                <p className="text-gray-600">Thank you for reaching out. We will get back to you shortly.</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-4 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
                                            placeholder="+91 00000 00000"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all resize-none"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full px-8 py-4 bg-primary text-white text-lg font-medium rounded-xl hover:bg-black transition-all shadow-lg disabled:opacity-70"
                                >
                                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                                </button>
                                {status === 'error' && (
                                    <p className="text-red-500 text-sm mt-2 text-center">Failed to send message. Please try again.</p>
                                )}
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
