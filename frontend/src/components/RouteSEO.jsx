import React from 'react';
import { useLocation } from 'react-router-dom';
import SEO from './SEO';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://yuvancreations.in').replace(/\/+$/, '');

const BASE_KEYWORDS = 'IT services Haridwar, Website development Haridwar, Digital marketing Haridwar, Yuvan Creations, Mobile repair Haridwar, Computer repair Haridwar, CCTV installation Haridwar';

const ROUTE_META = {
    '/': {
        title: 'IT Services, Website Design, Digital Marketing in Haridwar',
        description: 'Yuvan Creations delivers IT support, computer repair, CCTV installation, website development, app development, and digital marketing services in Haridwar.',
        keywords: `best mobile repair in haridwar, website development company in haridwar, laptop repair near me haridwar, app developer in haridwar, computer repair kankhal haridwar, ${BASE_KEYWORDS}`,
        pageType: 'WebPage'
    },
    '/about': {
        title: 'About Yuvan Creations',
        description: 'Learn about Yuvan Creations, our mission, experience, and commitment to helping businesses grow through technology and creative solutions.',
        keywords: `${BASE_KEYWORDS}, about yuvan creations, IT company Haridwar`,
        pageType: 'AboutPage'
    },
    '/contact': {
        title: 'Contact Yuvan Creations',
        description: 'Contact Yuvan Creations for IT support, website development, CCTV setup, digital marketing, and media services in Haridwar.',
        keywords: `${BASE_KEYWORDS}, contact IT company Haridwar, support`,
        pageType: 'ContactPage'
    },
    '/gallery': {
        title: 'Portfolio & Project Gallery',
        description: 'Explore Yuvan Creations project gallery including website design, app development, branding, and marketing results.',
        keywords: `${BASE_KEYWORDS}, portfolio, project gallery, case studies`,
        pageType: 'CollectionPage'
    },
    '/membership': {
        title: 'Membership Plans',
        description: 'Explore Yuvan Creations membership plans for ongoing technical support, creative services, and growth-focused digital solutions.',
        keywords: `${BASE_KEYWORDS}, membership plans, technical support plans`,
        pageType: 'WebPage'
    },
    '/privacy-policy': {
        title: 'Privacy Policy',
        description: 'Read the privacy policy for Yuvan Creations and understand how we collect, use, and protect your information.',
        keywords: `${BASE_KEYWORDS}, privacy policy`,
        pageType: 'WebPage'
    },
    '/services/computer-solutions': {
        title: 'Computer Repair & IT Solutions',
        description: 'Professional computer repair and IT support services for businesses and individuals in Haridwar, including hardware, software, and networking.',
        keywords: `computer repair in haridwar, laptop repair haridwar, pc repair shop haridwar, computer service center haridwar, laptop repair near me haridwar, desktop repair haridwar, computer repair kankhal haridwar, computer repair jwalapur haridwar, new computer shop haridwar, laptop shop in haridwar, buy laptop haridwar, computer store haridwar, cheap laptop haridwar, gaming pc haridwar, computer dealer haridwar, ${BASE_KEYWORDS}`,
        pageType: 'Service',
        serviceName: 'Computer Repair and IT Solutions'
    },
    '/services/mobile-repair': {
        title: 'Mobile Repair Services',
        description: 'Fast and reliable mobile repair services in Haridwar for Android and iPhone devices with quality parts and expert diagnostics.',
        keywords: `mobile repair in haridwar, mobile repairing shop haridwar, phone repair near me haridwar, best mobile repair shop haridwar, screen replacement haridwar, iphone repair haridwar, android repair haridwar, cheap mobile repair haridwar, mobile repair kankhal haridwar, ${BASE_KEYWORDS}`,
        pageType: 'Service',
        serviceName: 'Mobile Repair Services'
    },
    '/services/cctv-solutions': {
        title: 'CCTV Installation & Security Solutions',
        description: 'CCTV camera installation, setup, and maintenance services for homes, shops, offices, and institutions in Haridwar.',
        keywords: `${BASE_KEYWORDS}, CCTV installation Haridwar, security camera setup`,
        pageType: 'Service',
        serviceName: 'CCTV Installation Services'
    },
    '/services/digital-marketing': {
        title: 'Digital Marketing Services',
        description: 'Data-driven digital marketing services including SEO, content strategy, social media growth, and analytics reporting.',
        keywords: `${BASE_KEYWORDS}, digital marketing agency Haridwar, SEO services, social media marketing`,
        pageType: 'Service',
        serviceName: 'Digital Marketing Services'
    },
    '/services/meta-ads': {
        title: 'Meta Ads Management',
        description: 'Get high-ROI Facebook and Instagram ad campaigns with full-funnel strategy, tracking setup, and performance optimization.',
        keywords: `${BASE_KEYWORDS}, Meta ads agency, Facebook ads, Instagram ads`,
        pageType: 'Service',
        serviceName: 'Meta Ads Management'
    },
    '/services/google-ads': {
        title: 'Google Ads Management',
        description: 'Scale your leads and sales with optimized Google Ads campaigns for search, display, and remarketing.',
        keywords: `${BASE_KEYWORDS}, Google ads agency Haridwar, PPC management`,
        pageType: 'Service',
        serviceName: 'Google Ads Management'
    },
    '/services/mobile-app-development': {
        title: 'Mobile App Development',
        description: 'Custom Android and iOS app development services focused on performance, usability, and business outcomes.',
        keywords: `mobile app development in haridwar, android app developer haridwar, app development company haridwar, custom mobile app haridwar, app banwane wala haridwar, software developer haridwar, app developer near me haridwar, app developer ranipur haridwar, ${BASE_KEYWORDS}`,
        pageType: 'Service',
        serviceName: 'Mobile App Development'
    },
    '/services/website-design': {
        title: 'Website Design & Development',
        description: 'Modern, responsive, and SEO-ready website design services for businesses that want higher conversions and stronger brand presence.',
        keywords: `website development in haridwar, web developer in haridwar, website designer in haridwar, best web development company haridwar, cheap website development haridwar, business website design haridwar, ecommerce website development haridwar, freelance web developer haridwar, website banwane wala haridwar, website design near me haridwar, website developer sidcul haridwar, ${BASE_KEYWORDS}`,
        pageType: 'Service',
        serviceName: 'Website Design and Development'
    },
    '/services/web-apps': {
        title: 'Custom Web App Development',
        description: 'Build scalable custom web applications with modern architecture, secure backend, and polished user experience.',
        keywords: `${BASE_KEYWORDS}, web app development Haridwar, SaaS development`,
        pageType: 'Service',
        serviceName: 'Web Application Development'
    },
    '/services/media-production': {
        title: 'Media Production Services',
        description: 'Professional media production services including branding visuals, photography, video editing, and promotional content.',
        keywords: `wedding photographer haridwar, photography services haridwar, pre wedding shoot haridwar, best photographer haridwar, media production haridwar, photo editing, video editing, ${BASE_KEYWORDS}`,
        pageType: 'Service',
        serviceName: 'Media Production Services'
    },
    '/software/bill-maker': {
        title: 'Online Bill Maker Software',
        description: 'Create and print professional bills quickly with Yuvan Creations bill maker software tool.',
        keywords: `${BASE_KEYWORDS}, bill maker software, invoice tool`,
        pageType: 'SoftwareApplication'
    },
    '/software/make-invoice': {
        title: 'Invoice Generator Software',
        description: 'Generate GST-ready invoices with branded templates, customer details, and downloadable formats.',
        keywords: `${BASE_KEYWORDS}, invoice generator, GST invoice maker`,
        pageType: 'SoftwareApplication'
    },
    '/software/make-quotation': {
        title: 'Quotation Maker Software',
        description: 'Create clean and professional quotations with product details, taxes, and pricing breakdown in minutes.',
        keywords: `${BASE_KEYWORDS}, quotation maker, quotation software`,
        pageType: 'SoftwareApplication'
    },
    '/software/pc-build': {
        title: 'Custom PC Build Planner',
        description: 'Plan your custom desktop build with recommended compatible components for work, gaming, and creative use.',
        keywords: `${BASE_KEYWORDS}, pc build planner, custom desktop build`,
        pageType: 'SoftwareApplication'
    },
    '/software/inventory': {
        title: 'Inventory Management Software',
        description: 'Track stock, sales, and product movement with an easy inventory management tool.',
        keywords: `${BASE_KEYWORDS}, inventory software, stock management`,
        pageType: 'SoftwareApplication'
    },
    '/software/requirement-maker': {
        title: 'Requirement Form Generator',
        description: 'Create structured requirement forms for technical and business projects with ready-to-use templates.',
        keywords: `${BASE_KEYWORDS}, requirement form generator`,
        pageType: 'SoftwareApplication'
    },
    '/pricing/website-design': {
        title: 'Website Design Pricing',
        description: 'See website design pricing details from Yuvan Creations and choose the right package for your business.',
        keywords: `${BASE_KEYWORDS}, website pricing`,
        canonicalPath: '/services/website-design',
        robots: 'noindex, follow',
        pageType: 'WebPage'
    },
    '/pricing/app-development': {
        title: 'App Development Pricing',
        description: 'Explore app development pricing plans for Android and iOS solutions.',
        keywords: `${BASE_KEYWORDS}, app development pricing`,
        canonicalPath: '/services/mobile-app-development',
        robots: 'noindex, follow',
        pageType: 'WebPage'
    },
    '/pricing/media-production': {
        title: 'Media Production Pricing',
        description: 'Check media production pricing for photography, video, and creative brand content.',
        keywords: `${BASE_KEYWORDS}, media production pricing`,
        canonicalPath: '/services/media-production',
        robots: 'noindex, follow',
        pageType: 'WebPage'
    },
    '/pay': {
        title: 'Secure Client Payment',
        description: 'Secure payment page for Yuvan Creations clients.',
        keywords: `${BASE_KEYWORDS}, secure payment`,
        robots: 'noindex, nofollow',
        pageType: 'WebPage'
    },
    '/dashboard': {
        title: 'User Dashboard',
        description: 'User account dashboard.',
        keywords: 'dashboard',
        robots: 'noindex, nofollow',
        pageType: 'WebPage'
    },
    '/admin': {
        title: 'Admin Dashboard',
        description: 'Admin dashboard.',
        keywords: 'admin dashboard',
        robots: 'noindex, nofollow',
        pageType: 'WebPage'
    },
    '/admin/cms': {
        title: 'Admin CMS',
        description: 'Content management dashboard.',
        keywords: 'admin cms',
        robots: 'noindex, nofollow',
        pageType: 'WebPage'
    }
};

const PATH_LABELS = {
    '/': 'Home',
    '/about': 'About',
    '/contact': 'Contact',
    '/gallery': 'Gallery',
    '/membership': 'Membership',
    '/privacy-policy': 'Privacy Policy',
    '/services': 'Services',
    '/software': 'Software',
    '/pricing': 'Pricing'
};

const normalizePath = (pathname) => {
    if (!pathname) return '/';
    const trimmed = pathname.replace(/\/+$/, '');
    return trimmed || '/';
};

const segmentToLabel = (segment) => segment
    .split('-')
    .map((token) => {
        const upper = token.toUpperCase();
        if (upper === 'SEO' || upper === 'PPC' || upper === 'CCTV') return upper;
        return token.charAt(0).toUpperCase() + token.slice(1);
    })
    .join(' ');

const buildBreadcrumbSchema = (pathname) => {
    const normalized = normalizePath(pathname);
    const segments = normalized === '/' ? [] : normalized.split('/').filter(Boolean);
    const crumbs = [{ name: 'Home', item: `${SITE_URL}/` }];

    let currentPath = '';
    segments.forEach((segment) => {
        currentPath += `/${segment}`;
        crumbs.push({
            name: PATH_LABELS[currentPath] || segmentToLabel(segment),
            item: `${SITE_URL}${currentPath}`
        });
    });

    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: crumb.item
        }))
    };
};

const buildPageSchema = (meta, canonicalPath) => {
    const pageType = meta.pageType || 'WebPage';
    const schema = {
        '@context': 'https://schema.org',
        '@type': pageType,
        name: meta.title,
        description: meta.description,
        url: `${SITE_URL}${canonicalPath}`
    };

    if (pageType === 'Service') {
        schema.serviceType = meta.serviceName || meta.title;
        schema.provider = {
            '@type': 'LocalBusiness',
            name: 'Yuvan Creations',
            url: `${SITE_URL}/`,
            telephone: '+91-9557300217',
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Haridwar',
                addressRegion: 'Uttarakhand',
                postalCode: '249401',
                addressCountry: 'IN'
            }
        };
        schema.areaServed = {
            '@type': 'City',
            name: 'Haridwar'
        };
    }

    return schema;
};

const RouteSEO = () => {
    const location = useLocation();
    const pathname = normalizePath(location.pathname);
    const defaultMeta = {
        title: 'Yuvan Creations',
        description: 'Yuvan Creations provides technology and creative services in Haridwar.',
        keywords: BASE_KEYWORDS,
        robots: 'noindex, nofollow',
        pageType: 'WebPage'
    };

    const meta = ROUTE_META[pathname] || defaultMeta;
    const canonicalPath = normalizePath(meta.canonicalPath || pathname);
    const structuredData = [
        buildPageSchema(meta, canonicalPath),
        buildBreadcrumbSchema(canonicalPath)
    ];

    return (
        <SEO
            title={meta.title}
            description={meta.description}
            keywords={meta.keywords}
            ogType={meta.ogType || 'website'}
            ogImage={meta.ogImage}
            canonicalPath={canonicalPath}
            robots={meta.robots}
            structuredData={structuredData}
        />
    );
};

export default RouteSEO;
