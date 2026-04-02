import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, ChevronDown, Mail, Phone, Users } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { useVisitors } from './VisitorProvider';

const constServices = [
    { name: 'Web Applications', path: '/services/web-apps' },
    { name: 'App Development', path: '/services/mobile-app-development' },
    { name: 'Website Design', path: '/services/website-design' },
    { name: 'Computer Solutions', path: '/services/computer-solutions' },
    { name: 'Mobile Repair', path: '/services/mobile-repair' },
    { name: 'CCTV Solutions', path: '/services/cctv-solutions' },
    { name: 'Photography & Videography', path: '/services/media-production' },
    { name: 'Digital Marketing', path: '/services/digital-marketing' },
    { name: 'Meta Ads', path: '/services/meta-ads' },
    { name: 'Google Ads', path: '/services/google-ads' },
];

const constSoftware = [
    {
        name: 'Bill Maker',
        children: [
            { name: 'Invoice Generate', path: '/software/bill-maker?type=invoice' },
            { name: 'Quotation Generate', path: '/software/bill-maker?type=quotation' },
        ],
    },
    { name: 'PC Build', path: '/software/pc-build' },
    { name: 'Inventory Management', path: '/software/inventory' },
    { name: 'Requirement Maker', path: '/software/requirement-maker' },
];

const Navbar = () => {
    const { visitorCount } = useVisitors();
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isServicesMobileOpen, setIsServicesMobileOpen] = useState(false);
    const [isSoftwareOpen, setIsSoftwareOpen] = useState(false);
    const [isSoftwareMobileOpen, setIsSoftwareMobileOpen] = useState(false);

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);

    const navServices = constServices;
    const navSoftware = constSoftware;

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const handleNavClick = (sectionId) => {
        setIsMobileMenuOpen(false);
        if (location.pathname !== '/') {
            navigate(`/${sectionId}`);
        } else {
            // Smooth scroll if already on home
            const element = document.querySelector(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            <nav className="fixed w-full z-40 top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all flex flex-col nav-coder">
                {/* Top Contact Bar */}
                <div className="w-full bg-primary text-gray-300 py-2 text-[13px] hidden md:block">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <div className="flex space-x-6">
                            <a href="mailto:yuvancreationhrd@gmail.com" className="flex items-center hover:text-white transition-colors">
                                <Mail size={14} className="mr-2 text-accent" />
                                yuvancreationhrd@gmail.com
                            </a>
                            <a href="tel:+919557300217" className="flex items-center hover:text-white transition-colors">
                                <Phone size={14} className="mr-2 text-accent" />
                                +91-9557300217
                            </a>
                        </div>
                        <div className="flex space-x-4">
                            <span className="flex items-center text-accent font-bold">
                                <Users size={14} className="mr-2" />
                                Visitors: {visitorCount || '...'}
                            </span>
                            <span className="flex items-center text-gray-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                                Premium IT Solutions
                            </span>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="flex justify-between h-20 items-center">
                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer">
                            <img src={`${import.meta.env.BASE_URL}images/logo/navbaar logo.webp`} alt="Yuvan Creations" className="h-10 md:h-12 w-auto object-contain" />
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden xl:flex items-center space-x-4 xl:space-x-6 text-[15px]">
                            <button onClick={() => handleNavClick('#home')} className="text-gray-600 hover:text-accent font-medium transition-colors">
                                Home
                            </button>

                            {/* Dropdown for Services */}
                            <div
                                className="relative"
                                onMouseEnter={() => setIsServicesOpen(true)}
                                onMouseLeave={() => setIsServicesOpen(false)}
                            >
                                <button
                                    onClick={() => handleNavClick('#services')}
                                    className="flex items-center space-x-1 text-gray-600 hover:text-accent font-medium transition-colors py-2"
                                >
                                    <span>Services</span>
                                    <ChevronDown size={16} className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isServicesOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-0 w-64 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden py-2 z-50"
                                        >
                                            {navServices.map((service) => (
                                                <Link
                                                    key={service.name}
                                                    to={service.path}
                                                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-accent transition-colors"
                                                >
                                                    {service.name}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Dropdown for Software */}
                            <div
                                className="relative"
                                onMouseEnter={() => setIsSoftwareOpen(true)}
                                onMouseLeave={() => setIsSoftwareOpen(false)}
                            >
                                <button
                                    className="flex items-center space-x-1 text-gray-600 hover:text-accent font-medium transition-colors py-2"
                                >
                                    <span>Our Software</span>
                                    <ChevronDown size={16} className={`transition-transform duration-200 ${isSoftwareOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isSoftwareOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-0 w-64 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden py-2 z-50"
                                        >
                                            {navSoftware.map((item) => (
                                                item.children ? (
                                                    <div key={item.name} className="px-4 py-2">
                                                        <p className="text-[11px] font-black uppercase tracking-wider text-gray-400 mb-1">{item.name}</p>
                                                        <div className="border-l border-gray-200 pl-3 space-y-1">
                                                            {item.children.map((child) => (
                                                                <Link
                                                                    key={child.name}
                                                                    to={child.path}
                                                                    className="block px-2 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-accent rounded-md transition-colors"
                                                                >
                                                                    {child.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <Link
                                                        key={item.name}
                                                        to={item.path}
                                                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-accent transition-colors"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                )
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Link to="/about" className="text-gray-600 hover:text-accent font-medium transition-colors">
                                About
                            </Link>
                            <Link to="/gallery" className="text-gray-600 hover:text-accent font-medium transition-colors">
                                Gallery
                            </Link>
                            <Link to="/clients" className="text-gray-600 hover:text-accent font-medium transition-colors">
                                Our Clients
                            </Link>
                            <Link to="/membership" className="text-gray-600 hover:text-accent font-medium transition-colors">
                                Membership
                            </Link>
                            <button onClick={() => { setIsMobileMenuOpen(false); navigate('/contact'); }} className="text-gray-600 hover:text-accent font-medium transition-colors">
                                Contact
                            </button>

                            <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
                                {user ? (
                                    <div className="flex items-center space-x-4">
                                        <Link
                                            to={user.role === 'admin' ? '/admin' : '/dashboard'}
                                            className="flex items-center space-x-2 text-primary font-medium hover:text-accent"
                                        >
                                            <User size={20} />
                                            <span>Dashboard</span>
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => setIsLoginOpen(true)}
                                            className="text-primary font-medium hover:text-accent transition-colors"
                                        >
                                            Login
                                        </button>
                                        <button
                                            onClick={() => setIsSignupOpen(true)}
                                            className="px-5 py-2.5 rounded-lg bg-accent text-white font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
                                        >
                                            Sign Up
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="xl:hidden flex items-center">
                            <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-primary focus:outline-none">
                                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="xl:hidden overflow-hidden bg-white border-b border-gray-100"
                        >
                            <div className="px-4 pt-2 pb-6 space-y-1">
                                <button
                                    onClick={() => handleNavClick('#home')}
                                    className="w-full text-left block px-3 py-3 text-base font-medium text-gray-700 hover:text-accent hover:bg-blue-50 rounded-lg"
                                >
                                    Home
                                </button>

                                {/* Mobile Services Accordion */}
                                <div>
                                    <button
                                        onClick={() => setIsServicesMobileOpen(!isServicesMobileOpen)}
                                        className="w-full flex justify-between items-center px-3 py-3 text-base font-medium text-gray-700 hover:text-accent hover:bg-blue-50 rounded-lg"
                                    >
                                        <span>Services</span>
                                        <ChevronDown size={16} className={`transition-transform duration-200 ${isServicesMobileOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {isServicesMobileOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden pl-6 bg-gray-50 rounded-b-lg"
                                            >
                                                {navServices.map((service) => (
                                                    <Link
                                                        key={service.name}
                                                        to={service.path}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className="block px-3 py-2.5 text-sm text-gray-600 hover:text-accent"
                                                    >
                                                        {service.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Mobile Software Accordion */}
                                <div>
                                    <button
                                        onClick={() => setIsSoftwareMobileOpen(!isSoftwareMobileOpen)}
                                        className="w-full flex justify-between items-center px-3 py-3 text-base font-medium text-gray-700 hover:text-accent hover:bg-blue-50 rounded-lg"
                                    >
                                        <span>Our Software</span>
                                        <ChevronDown size={16} className={`transition-transform duration-200 ${isSoftwareMobileOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {isSoftwareMobileOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden pl-6 bg-gray-50 rounded-b-lg"
                                            >
                                                {navSoftware.map((item) => (
                                                    item.children ? (
                                                        <div key={item.name} className="py-1">
                                                            <p className="px-3 text-[11px] font-black uppercase tracking-wider text-gray-400">{item.name}</p>
                                                            <div className="pl-3 mt-1">
                                                                {item.children.map((child) => (
                                                                    <Link
                                                                        key={child.name}
                                                                        to={child.path}
                                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                                        className="block px-3 py-2 text-sm text-gray-600 hover:text-accent"
                                                                    >
                                                                        {child.name}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <Link
                                                            key={item.name}
                                                            to={item.path}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="block px-3 py-2.5 text-sm text-gray-600 hover:text-accent"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    )
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <Link
                                    to="/about"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full text-left block px-3 py-3 text-base font-medium text-gray-700 hover:text-accent hover:bg-blue-50 rounded-lg"
                                >
                                    About
                                </Link>
                                <Link
                                    to="/gallery"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full text-left block px-3 py-3 text-base font-medium text-gray-700 hover:text-accent hover:bg-blue-50 rounded-lg"
                                >
                                    Gallery
                                </Link>
                                <Link
                                    to="/clients"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full text-left block px-3 py-3 text-base font-medium text-gray-700 hover:text-accent hover:bg-blue-50 rounded-lg"
                                >
                                    Our Clients
                                </Link>
                                <Link
                                    to="/membership"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full text-left block px-3 py-3 text-base font-medium text-gray-700 hover:text-accent hover:bg-blue-50 rounded-lg"
                                >
                                    Membership
                                </Link>
                                <button
                                    onClick={() => { setIsMobileMenuOpen(false); navigate('/contact'); }}
                                    className="w-full text-left block px-3 py-3 text-base font-medium text-gray-700 hover:text-accent hover:bg-blue-50 rounded-lg"
                                >
                                    Contact
                                </button>

                                <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                                    {user ? (
                                        <>
                                            <Link
                                                to={user.role === 'admin' ? '/admin' : '/dashboard'}
                                                className="flex items-center space-x-2 w-full px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <User size={20} />
                                                <span>Dashboard</span>
                                            </Link>
                                            <button
                                                onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                                                className="w-full text-left px-3 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => { setIsLoginOpen(true); setIsMobileMenuOpen(false); }}
                                                className="w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                                            >
                                                Login
                                            </button>
                                            <button
                                                onClick={() => { setIsSignupOpen(true); setIsMobileMenuOpen(false); }}
                                                className="w-full text-center px-3 py-3 rounded-lg bg-accent text-white font-medium hover:bg-blue-700"
                                            >
                                                Sign Up
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Modals */}
            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onSwitchSignup={() => setIsSignupOpen(true)}
            />
            <SignupModal
                isOpen={isSignupOpen}
                onClose={() => setIsSignupOpen(false)}
                onSwitchLogin={() => setIsLoginOpen(true)}
            />
        </>
    );
};

export default Navbar;
