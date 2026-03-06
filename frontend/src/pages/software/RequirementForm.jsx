import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ClipboardList, Laptop, Smartphone, Monitor,
    Send, ChevronRight, CheckCircle2, MessageSquare,
    Zap, Rocket, Target, Users, Globe, Terminal
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

const RequirementForm = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        projectType: '',
        budget: '',
        timeline: '',
        description: '',
        features: [],
        contactName: '',
        contactEmail: '',
        contactPhone: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const projectTypes = [
        { id: 'website', name: 'Website Development', icon: <Globe size={24} />, description: 'Business site, Portfolio, Blog' },
        { id: 'app', name: 'Mobile App', icon: <Smartphone size={24} />, description: 'iOS & Android applications' },
        { id: 'pc', name: 'Custom PC Build', icon: <Monitor size={24} />, description: 'Gaming, Workstation, Server' },
        { id: 'software', name: 'Custom Software', icon: <Terminal size={24} />, description: 'CRM, ERP, Specialized tools' },
    ];

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Customize Document ID: "Name_Project_Timestamp"
            let title = formData.contactName || "User";
            title = title.replace(/[^a-zA-Z0-9 ]/g, "").trim().replace(/\s+/g, "_");
            const docId = `${title}_${Date.now()}`;

            await setDoc(doc(db, 'project_requirements', docId), {
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
                        sheetName: 'Software Requirements',
                        payload: {
                            Name: formData.contactName,
                            Email: formData.contactEmail,
                            Phone: formData.contactPhone,
                            ProjectType: formData.projectType,
                            Budget: formData.budget,
                            Timeline: formData.timeline,
                            Features: formData.features.join(', '),
                            Description: formData.description
                        }
                    })
                });
            } catch (sheetError) {
                console.error("Google Sheets Error:", sheetError);
            }

            setIsSubmitted(true);
        } catch (error) {
            console.error("Error submitting requirement: ", error);
            alert("Failed to submit. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFeatureToggle = (feature) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...prev.features, feature]
        }));
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-12">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 text-accent font-mono text-sm bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-6"
                        >
                            <Target size={14} /> {'// project_discovery_v1.0'}
                        </motion.div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
                            Define Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Project PRD</span>
                        </h1>
                        <p className="text-gray-500 font-medium">Draft your requirements and get a professional estimation from our experts.</p>
                    </div>

                    {!isSubmitted ? (
                        <div className="bg-gray-900/50 border border-gray-800 rounded-[40px] p-8 md:p-12 shadow-2xl backdrop-blur-xl">
                            {/* Progress Bar */}
                            <div className="flex gap-2 mb-12">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-accent' : 'bg-gray-800'}`} />
                                ))}
                            </div>

                            <form onSubmit={handleSubmit}>
                                <AnimatePresence mode="wait">
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-8"
                                        >
                                            <h2 className="text-2xl font-black flex items-center gap-3">
                                                <Zap className="text-accent" /> What are we building?
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {projectTypes.map(type => (
                                                    <button
                                                        key={type.id}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, projectType: type.name })}
                                                        className={`p-6 rounded-3xl border-2 text-left transition-all ${formData.projectType === type.name ? 'bg-accent/10 border-accent' : 'bg-gray-800/50 border-gray-700 hover:border-gray-500'}`}
                                                    >
                                                        <div className={`p-4 rounded-2xl w-fit mb-4 ${formData.projectType === type.name ? 'bg-accent text-white' : 'bg-gray-700 text-gray-400'}`}>
                                                            {type.icon}
                                                        </div>
                                                        <h3 className="font-bold text-lg mb-1">{type.name}</h3>
                                                        <p className="text-xs text-gray-500">{type.description}</p>
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="flex justify-end pt-4">
                                                <button
                                                    type="button"
                                                    disabled={!formData.projectType}
                                                    onClick={nextStep}
                                                    className="px-10 py-5 bg-accent text-white font-black rounded-2xl shadow-xl shadow-accent/20 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                                                >
                                                    Next Phase <ChevronRight size={18} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-8"
                                        >
                                            <h2 className="text-2xl font-black flex items-center gap-3">
                                                <ClipboardList className="text-accent" /> Project Details
                                            </h2>

                                            <div className="space-y-6">
                                                <div>
                                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-3">Brief Description</label>
                                                    <textarea
                                                        className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl p-6 outline-none focus:border-accent min-h-[150px] transition-all"
                                                        placeholder="Describe your vision, goals, and core features..."
                                                        value={formData.description}
                                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-3">Estimated Budget</label>
                                                        <select
                                                            className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl p-4 outline-none focus:border-accent"
                                                            value={formData.budget}
                                                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                                        >
                                                            <option value="">Select Range</option>
                                                            <option value="low">Under ₹50,000</option>
                                                            <option value="mid">₹50,000 - ₹2,00,000</option>
                                                            <option value="high">₹2,00,000+</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-3">Timeline</label>
                                                        <select
                                                            className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl p-4 outline-none focus:border-accent"
                                                            value={formData.timeline}
                                                            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                                        >
                                                            <option value="">Select Timeline</option>
                                                            <option value="urgent">Urgent (&lt; 2 weeks)</option>
                                                            <option value="standard">Standard (1-2 months)</option>
                                                            <option value="long">Long Term (3 months+)</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between pt-4">
                                                <button type="button" onClick={prevStep} className="px-10 py-5 text-gray-500 font-black">Back</button>
                                                <button
                                                    type="button"
                                                    disabled={!formData.description || !formData.budget}
                                                    onClick={nextStep}
                                                    className="px-10 py-5 bg-accent text-white font-black rounded-2xl shadow-xl shadow-accent/20 hover:bg-blue-600 transition-all flex items-center gap-2"
                                                >
                                                    Final Step <ChevronRight size={18} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-8"
                                        >
                                            <h2 className="text-2xl font-black flex items-center gap-3">
                                                <MessageSquare className="text-accent" /> Contact Info
                                            </h2>

                                            <div className="grid grid-cols-1 gap-6">
                                                <input
                                                    type="text"
                                                    placeholder="Full Name"
                                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl p-5 outline-none focus:border-accent"
                                                    value={formData.contactName}
                                                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                                                />
                                                <input
                                                    type="email"
                                                    placeholder="Email Address"
                                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl p-5 outline-none focus:border-accent"
                                                    value={formData.contactEmail}
                                                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                                />
                                                <input
                                                    type="tel"
                                                    placeholder="Phone Number"
                                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl p-5 outline-none focus:border-accent"
                                                    value={formData.contactPhone}
                                                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                                                />
                                            </div>

                                            <div className="flex justify-between pt-4">
                                                <button type="button" onClick={prevStep} className="px-10 py-5 text-gray-500 font-black">Back</button>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="px-10 py-5 bg-gradient-to-r from-accent to-blue-600 text-white font-black rounded-2xl shadow-xl shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 disabled:opacity-60"
                                                >
                                                    {isSubmitting ? 'Submitting...' : 'Submit PRD'} <Send size={18} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-gray-900 border border-gray-800 rounded-[40px] p-12 text-center"
                        >
                            <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center text-accent mx-auto mb-8">
                                <CheckCircle2 size={48} />
                            </div>
                            <h2 className="text-3xl font-black mb-4 uppercase">PRD Submitted Successfully!</h2>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                Our engineers will review your requirements for the **{formData.projectType}** and contact you at **{formData.contactEmail}** within 24 hours.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="px-8 py-4 bg-accent text-white font-black rounded-2xl hover:bg-blue-600 transition-all">
                                    Download Summary PDF
                                </button>
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="px-8 py-4 bg-gray-800 text-white font-black rounded-2xl hover:bg-gray-700 transition-all"
                                >
                                    Back to Home
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default RequirementForm;
