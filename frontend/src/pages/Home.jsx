import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CompanyIntro from '../components/CompanyIntro';
import Marquee from '../components/Marquee';
import Services from '../components/Services';
import Prices from '../components/Prices';
import Features from '../components/Features';
import FounderQuote from '../components/FounderQuote';
import About from '../components/About';
import Partners from '../components/Partners';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="min-h-screen bg-white text-primary">
            <Navbar />
            <main>
                <Hero />
                <CompanyIntro />
                <Marquee />
                <Services />
                <Prices />
                <Features />
                <FounderQuote />
                <About />
                <Partners />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
