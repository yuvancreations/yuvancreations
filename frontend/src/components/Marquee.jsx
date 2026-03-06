import React from 'react';

const Marquee = () => {
    return (
        <section className="py-12 bg-gray-900 overflow-hidden relative border-t border-gray-800">
            {/* Very slow continuous linear scroll */}
            <div className="flex flex-col gap-4 relative z-10 w-full hover:[&>*]:[animation-play-state:paused]">

                {/* Track 1 - Left */}
                <div className="flex w-[200%] md:w-[150%] animate-[scrollLeft_60s_linear_infinite]">
                    <div className="flex items-center whitespace-nowrap">
                        {[1, 2, 3].map((set) => (
                            <React.Fragment key={set}>
                                <span className="text-4xl md:text-6xl font-black uppercase text-transparent px-6 md:px-12 font-sans tracking-widest" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>Video Editing</span> <span className="text-[#c7a97f] opacity-50 text-3xl">★</span>
                                <span className="text-4xl md:text-6xl font-black uppercase text-transparent px-6 md:px-12 font-sans tracking-widest" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>Cinematography</span> <span className="text-[#c7a97f] opacity-50 text-3xl">★</span>
                                <span className="text-4xl md:text-6xl font-black uppercase text-transparent px-6 md:px-12 font-sans tracking-widest" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>Graphic Design</span> <span className="text-[#c7a97f] opacity-50 text-3xl">★</span>
                                <span className="text-4xl md:text-6xl font-black uppercase text-transparent px-6 md:px-12 font-sans tracking-widest" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>Web Development</span> <span className="text-[#c7a97f] opacity-50 text-3xl">★</span>
                                <span className="text-4xl md:text-6xl font-black uppercase text-transparent px-6 md:px-12 font-sans tracking-widest" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>CCTV Security</span> <span className="text-[#c7a97f] opacity-50 text-3xl">★</span>
                                <span className="text-4xl md:text-6xl font-black uppercase text-transparent px-6 md:px-12 font-sans tracking-widest" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>Hardware Repair</span> <span className="text-[#c7a97f] opacity-50 text-3xl">★</span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Track 2 - Right */}
                <div className="flex w-[200%] md:w-[150%] animate-[scrollRight_60s_linear_infinite] mt-2">
                    <div className="flex items-center whitespace-nowrap">
                        {[1, 2, 3].map((set) => (
                            <React.Fragment key={set}>
                                <span className="text-2xl md:text-4xl font-bold uppercase text-white/10 px-6 md:px-12 tracking-[4px]">Creative</span> <span className="w-12 h-px bg-white/10 mx-2"></span>
                                <span className="text-2xl md:text-4xl font-bold uppercase text-white/10 px-6 md:px-12 tracking-[4px]">Professional</span> <span className="w-12 h-px bg-white/10 mx-2"></span>
                                <span className="text-2xl md:text-4xl font-bold uppercase text-white/10 px-6 md:px-12 tracking-[4px]">Trusted</span> <span className="w-12 h-px bg-white/10 mx-2"></span>
                                <span className="text-2xl md:text-4xl font-bold uppercase text-white/10 px-6 md:px-12 tracking-[4px]">Experienced</span> <span className="w-12 h-px bg-white/10 mx-2"></span>
                                <span className="text-2xl md:text-4xl font-bold uppercase text-white/10 px-6 md:px-12 tracking-[4px]">Fast Service</span> <span className="w-12 h-px bg-white/10 mx-2"></span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

            </div>

            <style jsx>{`
                @keyframes scrollLeft {
                    from { transform: translateX(0); }
                    to { transform: translateX(-33.33%); }
                }
                @keyframes scrollRight {
                    from { transform: translateX(-33.33%); }
                    to { transform: translateX(0); }
                }
            `}</style>
        </section>
    );
};

export default Marquee;
