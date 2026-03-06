import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const FounderQuote = () => {
    return (
        <section className="py-24 bg-primary relative overflow-hidden">
            {/* Background elements to emulate jarallax/gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60 z-0"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">

                    {/* Left: Founder Image */}
                    <div className="w-full md:w-5/12 lg:w-4/12 relative">
                        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.05} transitionSpeed={1000}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative rounded-2xl p-1 bg-gradient-to-br from-accent/50 to-transparent"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <div className="absolute -top-6 -right-6 w-16 h-16 bg-accent rounded-xl flex items-center justify-center shadow-2xl z-20" style={{ transform: "translateZ(40px)" }}>
                                    <Quote className="text-white" fill="currentColor" size={28} />
                                </div>
                                <img
                                    src="/images/team/team 1.jpg"
                                    alt="Founder Nishant Sharma"
                                    className="w-full h-auto aspect-[4/5] object-cover rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] grayscale hover:grayscale-0 transition-all duration-700"
                                    style={{ transform: "translateZ(20px)" }}
                                />
                            </motion.div>
                        </Tilt>
                    </div>

                    {/* Right: Glass Quote Box */}
                    <div className="w-full md:w-7/12 lg:w-8/12">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-2xl border-l-[6px] border-l-accent border-y border-r border-white/10"
                        >
                            <h3 className="text-2xl md:text-3xl lg:text-4xl text-white font-light italic leading-relaxed mb-8">
                                "Transparency isn't just our policy - it's our promise.<br className="hidden lg:block" />
                                Every repair conducted with <span className="font-bold text-accent">honesty you can see</span>,<br className="hidden lg:block" />
                                and <span className="font-bold text-accent">trust you can feel</span>."
                            </h3>

                            <div className="flex items-center">
                                <div className="w-12 h-1 bg-accent mr-4"></div>
                                <span className="text-sm font-bold tracking-[0.2em] text-white/70 uppercase">
                                    - Founder, Yuvan Creations
                                </span>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FounderQuote;
