import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Building2, Globe, Heart, Search, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const OurClients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const fetchClients = async () => {
            try {
                const snap = await getDocs(collection(db, 'clients'));
                
                if (snap.docs.length === 0) {
                    const initialClients = [
                        { clientName: 'YatraGo', industry: 'Travel & Tourism', websiteUrl: 'https://yatrago.com/', description: 'Travel & Tourism Platform', logoUrl: '' },
                        { clientName: 'Shree Ganesh Studio', industry: 'Photography', websiteUrl: 'https://yuvancreations.github.io/shriganeshstudio/', description: 'Professional Photography Studio', logoUrl: '' },
                        { clientName: 'Vihaan Tour & Travels', industry: 'Travel & Tours', websiteUrl: 'https://yuvancreations.github.io/vihaantourandtravels/', description: 'Memorable Journeys, Every Time', logoUrl: '' },
                        { clientName: 'ShortWay', industry: 'Digital Marketing', websiteUrl: 'https://yuvancreations.github.io/shortway/', description: 'Premier Digital Marketing Agency', logoUrl: '' },
                        { clientName: '360LBS', industry: 'Financial Accounting', websiteUrl: 'https://www.360lbs.in/', description: 'Complete Financial Accounting Website', logoUrl: '/images/client/360.png' }
                    ];
                    
                    for (const c of initialClients) {
                        try {
                            await addDoc(collection(db, 'clients'), c);
                        } catch (e) {
                            console.error('Error adding seed client:', e);
                        }
                    }
                    
                    // Fetch again after seeding
                    const newSnap = await getDocs(collection(db, 'clients'));
                    const rawData = newSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setClients(rawData);
                } else {
                    const originalData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    
                    // Cleanup exact duplicates matching same names
                    const seenNames = new Set();
                    const duplicateIds = [];
                    const uniqueData = [];

                    for (const client of originalData) {
                        if (seenNames.has(client.clientName)) {
                            duplicateIds.push(client.id);
                        } else {
                            seenNames.add(client.clientName);
                            uniqueData.push(client);
                        }
                    }

                    if (duplicateIds.length > 0) {
                        console.log("Removing duplicate database entries...", duplicateIds);
                        for (const id of duplicateIds) {
                            try {
                                await deleteDoc(doc(db, 'clients', id));
                            } catch (e) { console.error('Error deleting duplicate:', e); }
                        }
                    }

                    setClients(uniqueData);
                }
            } catch (err) {
                console.error("Error fetching clients:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    const filteredClients = clients.filter(c => 
        (c.clientName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
        (c.industry || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white text-gray-900 flex flex-col pt-20">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white pt-24 pb-16 border-b border-gray-100">
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle, #6366f120 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/30 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm bg-blue-50 border border-blue-100 px-5 py-2 rounded-full mb-6 shadow-sm">
                        <Building2 size={16} /> Trusted By Industry Leaders
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight text-gray-900">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800">Clients</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
                        We take pride in empowering businesses globally. Explore the incredible companies and organizations that have partnered with Yuvan Creations for premium IT solutions.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="max-w-xl mx-auto flex items-center gap-3 bg-white border border-gray-200 px-6 py-4 rounded-2xl shadow-xl focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                        <Search size={22} className="text-blue-500" />
                        <input 
                            type="text" 
                            placeholder="Search by client name or industry..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border-none focus:ring-0 text-gray-800 font-medium placeholder:text-gray-400 outline-none text-lg bg-transparent"
                        />
                    </motion.div>
                </div>
            </section>

            {/* CLIENTS GRID */}
            <section className="py-24 bg-gray-50/50 flex-1 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/30" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6 shadow-md" />
                            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm animate-pulse">Summoning Records...</p>
                        </div>
                    ) : filteredClients.length === 0 ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-24 text-center max-w-lg mx-auto">
                            <div className="w-24 h-24 bg-white rounded-[30px] shadow-xl border border-gray-100 flex items-center justify-center text-gray-300 mb-8 transform -rotate-6">
                                <Search size={40} />
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">No Matches Found</h3>
                            <p className="text-gray-500 text-lg leading-relaxed">
                                We couldn't find any clients matching your search. Try different keywords or browse our full collection.
                            </p>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredClients.map((client, i) => (
                                <motion.div 
                                    key={client.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white rounded-[35px] p-8 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 group overflow-hidden relative flex flex-col"
                                >
                                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />
                                    
                                    <div className="flex items-start justify-between mb-8 relative z-10">
                                        <div className="w-20 h-20 rounded-[25px] bg-white flex items-center justify-center shadow-lg shadow-gray-200/40 border border-gray-100/50 overflow-hidden transform group-hover:scale-105 transition-transform duration-300 group-hover:rotate-3">
                                            {client.logoUrl ? (
                                                <img src={client.logoUrl} alt={client.clientName} className="w-full h-full object-contain p-3" />
                                            ) : (
                                                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600 uppercase">
                                                    {client.clientName?.charAt(0) || 'C'}
                                                </span>
                                            )}
                                        </div>
                                        <span className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-50 to-emerald-100/50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm border border-emerald-200/50">
                                            <ShieldCheck size={12} /> Our Trusted Client
                                        </span>
                                    </div>

                                    <div className="relative z-10 flex-1 flex flex-col">
                                        <h4 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{client.clientName || 'Unnamed Client'}</h4>
                                        <p className="flex items-center gap-2 text-xs font-black text-blue-500 uppercase tracking-widest mb-4 bg-blue-50 w-fit px-3 py-1.5 rounded-lg border border-blue-100/50">
                                            <Zap size={12} /> {client.industry || 'Client'}
                                        </p>
                                        
                                        {client.description && (
                                            <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                                                {client.description}
                                            </p>
                                        )}
                                        
                                        <div className="mt-auto">
                                            {client.websiteUrl ? (
                                                <a 
                                                    href={client.websiteUrl.startsWith('http') ? client.websiteUrl : `https://${client.websiteUrl}`} 
                                                    target="_blank" rel="noreferrer"
                                                    className="w-full py-4 rounded-2xl bg-gray-900 text-white font-black uppercase tracking-widest shadow-xl shadow-gray-900/20 hover:bg-blue-600 hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-3 text-xs group-hover:scale-[1.02]"
                                                >
                                                    <Globe size={18} className="group-hover:animate-pulse" />
                                                    Visit Website
                                                </a>
                                            ) : (
                                                <div className="w-full py-4 rounded-2xl bg-gray-50 text-gray-400 font-bold uppercase tracking-widest flex items-center justify-center gap-3 text-xs border border-gray-100 cursor-not-allowed">
                                                    <Globe size={18} />
                                                    Website Unavailable
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 relative overflow-hidden bg-white border-t border-gray-100">
                <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
                    <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="inline-block mb-6">
                        <Heart size={56} className="text-red-500" strokeWidth={1.5} fill="currentColor" fillOpacity={0.1} />
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                        Ready To Join Our <br /> <span className="text-blue-600">Growing Network?</span>
                    </h2>
                    <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
                        Elevate your business with robust IT solutions, modern software, and premium media production tailored to your specific needs.
                    </p>
                    <Link to="/contact"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-600/30 text-base hover:bg-gray-900 hover:shadow-gray-900/30 transition-all hover:-translate-y-1">
                        Become A Client <ArrowUpRight size={20} />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default OurClients;
