/** 
 * YUVAN CREATIONS - SEO AUTOMATION SYSTEM v1.0
 * Non-intrusive, Performance-focused, Local-SEO Optimized
 * Targeted for Haridwar Local Services Ranking
 */
(function() {
    'use strict';

    const CONFIG = {
        businessName: "Yuvan Creations",
        location: "Haridwar, Uttarakhand",
        phone: "+91-9557300217",
        services: [
            "Mobile repair", 
            "Computer repair", 
            "CCTV installation", 
            "Photography", 
            "Wedding shoots", 
            "IT solutions", 
            "Website development", 
            "Digital marketing"
        ],
        siteUrl: "https://yuvancreations.in"
    };

    // 1. Schema Injection (LocalBusiness JSON-LD)
    function injectSchema() {
        if (document.getElementById('auto-schema-local')) return;

        const schema = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": CONFIG.businessName,
            "image": CONFIG.siteUrl + "/images/logo/footer%20logo.png",
            "@id": CONFIG.siteUrl + "/#organization",
            "url": CONFIG.siteUrl,
            "telephone": CONFIG.phone,
            "priceRange": "INR",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Haridwar",
                "addressLocality": "Haridwar",
                "addressRegion": "Uttarakhand",
                "postalCode": "249401",
                "addressCountry": "IN"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 29.9457,
                "longitude": 78.1642
            },
            "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "09:00",
                "closes": "20:00"
            },
            "sameAs": [
                "https://www.facebook.com/yuvancreations/",
                "https://www.instagram.com/yuvancreationshrd/"
            ]
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'auto-schema-local';
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
    }

    // 2. Auto Image Alt & Lazy Loading
    function optimizeImages() {
        try {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                // Skip if hidden or already having a relevant alt
                if (img.style.display === 'none') return;
                
                // Auto Alt
                if (!img.alt || img.alt.trim() === "" || img.alt.includes('logo')) {
                    const filename = img.src.split('/').pop().split('.')[0].replace(/%20/g, ' ').replace(/[-_]/g, ' ');
                    if (filename && filename.length > 2) {
                        img.alt = `${filename} - ${CONFIG.businessName} Haridwar`;
                    } else {
                        img.alt = `${CONFIG.businessName} - Professional IT Services Haridwar`;
                    }
                }
                
                // Auto Lazy Loading
                if (!img.getAttribute('loading')) {
                    img.setAttribute('loading', 'lazy');
                }
            });
        } catch (e) { /* Error safe */ }
    }

    // 3. Link Enhancement (Title attributes for SEO)
    function enhanceLinks() {
        try {
            const links = document.querySelectorAll('a');
            links.forEach(link => {
                if (!link.title && link.innerText.trim().length > 2) {
                    const text = link.innerText.trim();
                    link.title = `${text} | ${CONFIG.businessName} Haridwar`;
                }
            });
        } catch (e) {}
    }

    // 4. Performance Hints (Preconnect)
    function addPerformanceHints() {
        const domains = [
            'https://fonts.googleapis.com', 
            'https://www.googletagmanager.com', 
            'https://www.google-analytics.com'
        ];
        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            document.head.appendChild(link);
        });
    }

    // Initialization
    function init() {
        injectSchema();
        addPerformanceHints();
        
        const runOptimizations = () => {
            optimizeImages();
            enhanceLinks();
        };

        // Run after DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', runOptimizations);
        } else {
            runOptimizations();
        }

        // Periodic check for dynamic content (SPA transitions)
        setInterval(runOptimizations, 5000);
    }

    // Start system
    init();
})();
