import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Clapperboard, Monitor, Smartphone, Shield, Megaphone } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const GALLERY_ITEMS = [
    {
        id: 'web-01',
        title: 'Business Website Systems',
        category: 'Web',
        icon: Monitor,
        image: `${import.meta.env.BASE_URL}images/misc/image.jpg`,
        summary: 'Fast and conversion-focused websites built for service brands.'
    },
    {
        id: 'app-01',
        title: 'Mobile App UI Build',
        category: 'App',
        icon: Smartphone,
        image: `${import.meta.env.BASE_URL}images/misc/mobile.jpg`,
        summary: 'End-to-end app interface design and launch support.'
    },
    {
        id: 'media-01',
        title: 'Wedding & Event Shoot',
        category: 'Media',
        icon: Camera,
        image: `${import.meta.env.BASE_URL}images/misc/wedding.jpg`,
        summary: 'Story-driven photography and cinematic highlight edits.'
    },
    {
        id: 'cctv-01',
        title: 'CCTV Installation Projects',
        category: 'Security',
        icon: Shield,
        image: `${import.meta.env.BASE_URL}images/misc/cctvins.jpg`,
        summary: 'Residential and commercial surveillance setup coverage.'
    },
    {
        id: 'ads-01',
        title: 'SEO & Performance Marketing',
        category: 'Marketing',
        icon: Megaphone,
        image: `${import.meta.env.BASE_URL}images/misc/seo.png`,
        summary: 'Lead generation campaigns across search and social.'
    },
    {
        id: 'video-01',
        title: 'Creative Video Production',
        category: 'Media',
        icon: Clapperboard,
        image: `${import.meta.env.BASE_URL}images/misc/ve.jpg`,
        summary: 'Brand videos, product reels, and promotional edits.'
    },
    {
        id: 'web-02',
        title: 'Service Landing Experiences',
        category: 'Web',
        icon: Monitor,
        image: `${import.meta.env.BASE_URL}images/misc/image (1).jpg`,
        summary: 'Modern landing pages optimized for call-to-action.'
    },
    {
        id: 'media-02',
        title: 'Premium Outdoor Shoots',
        category: 'Media',
        icon: Camera,
        image: `${import.meta.env.BASE_URL}images/misc/pexels-asadphoto-169196.jpg`,
        summary: 'Creative framing with cinematic color treatment.'
    }
];

const FILTERS = ['All', 'Web', 'App', 'Media', 'Security', 'Marketing'];

const GalleryPage = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const visibleItems = useMemo(() => {
        if (activeFilter === 'All') return GALLERY_ITEMS;
        return GALLERY_ITEMS.filter((item) => item.category === activeFilter);
    }, [activeFilter]);

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <main className="pt-28 md:pt-32 pb-20">
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.22),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(16,185,129,0.2),transparent_30%),linear-gradient(150deg,#020617,#0b1120_60%,#020617)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:36px_36px] opacity-30" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-24">
                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-black text-cyan-300 bg-cyan-500/15 border border-cyan-400/30 px-4 py-2 rounded-full"
                        >
                            <Camera size={14} />
                            Our Work Gallery
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08 }}
                            className="mt-6 text-4xl md:text-6xl font-black tracking-tight leading-tight max-w-4xl"
                        >
                            Yuvan Creations Projects, Campaigns,
                            <span className="text-cyan-300"> and Client Results</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.14 }}
                            className="mt-5 text-slate-300 text-lg max-w-3xl"
                        >
                            A curated showcase of websites, app work, media production, security installations, and marketing outcomes delivered by our team.
                        </motion.p>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                    <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
                        {FILTERS.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-2 rounded-full text-sm font-black transition-colors border ${
                                    activeFilter === filter
                                        ? 'bg-cyan-400 text-slate-950 border-cyan-300'
                                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {visibleItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.article
                                    key={item.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-40px' }}
                                    transition={{ delay: index * 0.03 }}
                                    className="group rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/[0.07] transition-colors"
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover scale-[1.02] group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                                        <span className="absolute top-4 left-4 inline-flex items-center gap-2 bg-slate-900/80 border border-white/15 px-3 py-1.5 rounded-full text-xs font-black tracking-wide text-cyan-200">
                                            <Icon size={13} />
                                            {item.category}
                                        </span>
                                    </div>

                                    <div className="p-5">
                                        <h3 className="text-xl font-black text-white">{item.title}</h3>
                                        <p className="text-slate-300 mt-2 text-sm leading-relaxed">{item.summary}</p>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default GalleryPage;
