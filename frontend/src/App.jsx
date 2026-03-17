import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import About from './pages/About';
import ContactPage from './pages/ContactPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminCMS from './pages/AdminCMS';
import MembershipPage from './pages/MembershipPage';
import GalleryPage from './pages/GalleryPage';
import UserRoute from './components/UserRoute';
import AdminRoute from './components/AdminRoute';
import GlobalInteractionSound from './components/GlobalInteractionSound';
import ScrollToTop from './components/ScrollToTop';
import { SiteContentProvider } from './context/SiteContentContext';

import { VisitorProvider } from './components/VisitorProvider';

// New Service Pages
import ComputerSolutions from './pages/services/ComputerSolutions';
import MobileRepair from './pages/services/MobileRepair';
import CCTVSolutions from './pages/services/CCTVSolutions';
import DigitalMarketing from './pages/services/DigitalMarketing';
import MetaAds from './pages/services/MetaAds';
import GoogleAds from './pages/services/GoogleAds';
import MobileAppDev from './pages/services/MobileAppDev';
import WebDesign from './pages/services/WebDesign';
import WebApps from './pages/services/WebApps';
import MediaProduction from './pages/services/MediaProduction';
import PaymentPage from './pages/payment/PaymentPage';

// New Software Pages
import MakeInvoice from './pages/software/MakeInvoice';
import MakeQuotation from './pages/software/MakeQuotation';
import BillMaker from './pages/software/BillMaker';
import PCBuild from './pages/software/PCBuild';
import Inventory from './pages/software/Inventory';
import RequirementForm from './pages/software/RequirementForm';
import PrivacyPolicy from './pages/PrivacyPolicy';


function App() {
    const routerProps = import.meta.env.DEV ? {} : { basename: '/yuvancreations' };

    return (
        <AuthProvider>
            <SiteContentProvider>
                <VisitorProvider>
                    <Router {...routerProps}>
                        <GlobalInteractionSound />
                        <ScrollToTop />
                        <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/membership" element={<MembershipPage />} />
                        <Route path="/gallery" element={<GalleryPage />} />
                        <Route path="/pay" element={<PaymentPage />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />


                        {/* Service Routes */}
                        <Route path="/services/computer-solutions" element={<ComputerSolutions />} />
                        <Route path="/services/mobile-repair" element={<MobileRepair />} />
                        <Route path="/services/cctv-solutions" element={<CCTVSolutions />} />
                        <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
                        <Route path="/services/meta-ads" element={<MetaAds />} />
                        <Route path="/services/google-ads" element={<GoogleAds />} />
                        <Route path="/services/mobile-app-development" element={<MobileAppDev />} />
                        <Route path="/services/website-design" element={<WebDesign />} />
                        <Route path="/services/web-apps" element={<WebApps />} />
                        <Route path="/services/media-production" element={<MediaProduction />} />

                        {/* Software Routes */}
                        <Route path="/software/bill-maker" element={<BillMaker />} />
                        <Route path="/software/make-invoice" element={<MakeInvoice />} />
                        <Route path="/software/make-quotation" element={<MakeQuotation />} />
                        <Route path="/software/pc-build" element={<PCBuild />} />
                        <Route path="/software/inventory" element={<Inventory />} />
                        <Route path="/software/requirement-maker" element={<RequirementForm />} />

                        {/* Pricing page aliases — reuse service pages */}
                        <Route path="/pricing/website-design" element={<WebDesign />} />
                        <Route path="/pricing/app-development" element={<MobileAppDev />} />
                        <Route path="/pricing/media-production" element={<MediaProduction />} />

                        <Route
                            path="/dashboard"
                            element={
                                <UserRoute>
                                    <UserDashboard />
                                </UserRoute>
                            }
                        />
                        <Route
                            path="/admin"
                            element={
                                <AdminRoute>
                                    <AdminDashboard />
                                </AdminRoute>
                            }
                        />
                        <Route
                            path="/admin/cms"
                            element={
                                <AdminRoute>
                                    <AdminCMS />
                                </AdminRoute>
                            }
                        />
                        </Routes>
                    </Router>
                </VisitorProvider>
            </SiteContentProvider>
        </AuthProvider>
    );
}

export default App;
