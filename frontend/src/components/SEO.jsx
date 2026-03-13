import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, keywords, ogImage, ogType = 'website' }) => {
    const location = useLocation();
    const siteTitle = 'Yuvan Creations';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const siteUrl = 'https://yuvancreations.github.io/yuvancreations';
    const currentUrl = `${siteUrl}${location.pathname}`;

    useEffect(() => {
        // Update Title
        document.title = fullTitle;

        // Update Description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description || 'Yuvan Creations - Leading IT solutions provider in Haridwar.');
        }

        // Update Keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', keywords || 'IT Solutions, Web Design, Haridwar');
        }

        // Update OG Tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', fullTitle);

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', currentUrl);

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', description || '');

        if (ogImage) {
            const ogImg = document.querySelector('meta[property="og:image"]');
            if (ogImg) ogImg.setAttribute('content', ogImage);
        }

        // Update Twitter Tags
        const twTitle = document.querySelector('meta[property="twitter:title"]');
        if (twTitle) twTitle.setAttribute('content', fullTitle);

        const twUrl = document.querySelector('meta[property="twitter:url"]');
        if (twUrl) twUrl.setAttribute('content', currentUrl);

        const twDesc = document.querySelector('meta[property="twitter:description"]');
        if (twDesc) twDesc.setAttribute('content', description || '');

        // Canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            canonical.setAttribute('href', currentUrl);
        }

    }, [fullTitle, description, keywords, ogImage, currentUrl]);

    return null; // This component doesn't render anything
};

export default SEO;
