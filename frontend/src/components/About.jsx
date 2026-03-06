import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Terminal, Code2, Cpu } from 'lucide-react';

const Visionaries = [
    {
        name: 'Nishant Sharma',
        role: 'Founder & CEO',
        description: 'Nishant Sharma is responsible for leading the company and driving its vision with strategic excellence.',
        image: '/images/team/team 1.jpg'
    },
    {
        name: 'Aman Verma',
        role: 'Technical Head',
        description: 'Aman Verma oversees technical operations and leads the development team with innovation.',
        image: '/images/team/team 2.jpg'
    }
];

const About = () => {
    return (
        <section id="about" className="py-24 bg-gray-950 relative overflow-hidden">
            {/* Abstract Tech Background Elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-cyan-400 font-mono tracking-widest text-sm mb-4 flex justify-center items-center"
                    >
                        <Terminal size={16} className="mr-2" /> {'<OurTeam />'}
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight"
                    >
                        Meet The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Architects</span>
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-400 font-medium"
                    >
                        The masterminds behind Yuvan Creations driving innovation and writing the future of technology since 2007.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {Visionaries.map((person, index) => (
                        <Tilt key={index} tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.05} transitionSpeed={1000} className="h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative bg-gray-900/60 backdrop-blur-xl rounded-3xl p-1 shadow-[0_0_20px_rgba(0,0,0,0.8)] h-full group border border-gray-800 hover:border-cyan-500/50 transition-colors duration-500"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* Glowing Border Illusion */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent via-cyan-400 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-md pointer-events-none"></div>

                                <div className="bg-gray-900 rounded-[23px] p-8 h-full flex flex-col items-center text-center relative z-10 overflow-hidden">
                                    {/* Tech Grid Pattern Inside Card */}
                                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-50"></div>

                                    {/* Floating Decor */}
                                    <Cpu className="absolute top-6 left-6 text-gray-700 opacity-30 group-hover:text-cyan-400 group-hover:opacity-60 transition-all duration-500" size={32} />
                                    <Code2 className="absolute top-6 right-6 text-gray-700 opacity-30 group-hover:text-blue-500 group-hover:opacity-60 transition-all duration-500" size={32} />

                                    {/* Profile Avatar */}
                                    <div className="relative w-40 h-40 mx-auto rounded-full mb-8 z-20" style={{ transform: "translateZ(40px)" }}>
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent to-cyan-400 blur-md opacity-20 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        <div className="relative w-full h-full rounded-full border-4 border-gray-800 group-hover:border-cyan-400 transition-colors duration-500 overflow-hidden shadow-2xl bg-gray-950 p-1">
                                            {person.image ? (
                                                <img
                                                    src={person.image}
                                                    alt={person.name}
                                                    className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-800 rounded-full">
                                                    <span className="text-4xl text-gray-500 font-bold">{person.name[0]}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h4 className="text-3xl font-black text-white mb-3 tracking-wide z-20" style={{ transform: "translateZ(30px)" }}>{person.name}</h4>

                                    <div className="inline-block bg-blue-900/30 border border-blue-500/30 rounded-md px-4 py-1.5 mb-6 z-20 relative font-mono text-cyan-400 text-sm tracking-wider shadow-inner" style={{ transform: "translateZ(20px)" }}>
                                        {`const role = '${person.role}';`}
                                    </div>

                                    <p className="text-gray-400 leading-relaxed z-20 relative text-sm font-medium" style={{ transform: "translateZ(10px)" }}>
                                        {person.description}
                                    </p>
                                </div>
                            </motion.div>
                        </Tilt>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
