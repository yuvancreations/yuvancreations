import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const normalizeSiteUrl = (url) => (url || '').replace(/\/+$/, '');

const toAbsoluteUrl = (siteUrl, value) => {
    if (!value) return '';
    if (/^https?:\/\//i.test(value)) return value;
    return `${siteUrl}${value.startsWith('/') ? value : `/${value}`}`;
};

const SEO = ({
    title,
    description,
    keywords,
    ogImage,
    ogType = 'website',
    canonicalPath,
    robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    structuredData
}) => {
    const location = useLocation();
    const siteTitle = 'Yuvan Creations';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const siteUrl = normalizeSiteUrl(import.meta.env.VITE_SITE_URL || 'https://yuvancreations.in');
    const targetPath = canonicalPath || location.pathname;
    const currentUrl = `${siteUrl}${targetPath}`;
    const resolvedOgImage = toAbsoluteUrl(siteUrl, ogImage || '/images/logo/footer%20logo.png');

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

        const robotsMeta = document.querySelector('meta[name="robots"]');
        if (robotsMeta) robotsMeta.setAttribute('content', robots);

        const googleBotMeta = document.querySelector('meta[name="googlebot"]');
        if (googleBotMeta) googleBotMeta.setAttribute('content', robots);

        // Update OG Tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', fullTitle);

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', currentUrl);

        const ogTypeTag = document.querySelector('meta[property="og:type"]');
        if (ogTypeTag) ogTypeTag.setAttribute('content', ogType);

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', description || '');

        const ogImg = document.querySelector('meta[property="og:image"]');
        if (ogImg) ogImg.setAttribute('content', resolvedOgImage);

        // Update Twitter Tags
        const twTitle = document.querySelector('meta[property="twitter:title"]');
        if (twTitle) twTitle.setAttribute('content', fullTitle);

        const twUrl = document.querySelector('meta[property="twitter:url"]');
        if (twUrl) twUrl.setAttribute('content', currentUrl);

        const twDesc = document.querySelector('meta[property="twitter:description"]');
        if (twDesc) twDesc.setAttribute('content', description || '');

        const twImg = document.querySelector('meta[property="twitter:image"]');
        if (twImg) twImg.setAttribute('content', resolvedOgImage);

        // Canonical URL
        let canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            canonical.setAttribute('href', currentUrl);
        } else {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            canonical.setAttribute('href', currentUrl);
            document.head.appendChild(canonical);
        }

        const schemaTagId = 'route-structured-data';
        const existingSchemaTag = document.getElementById(schemaTagId);
        if (existingSchemaTag) {
            existingSchemaTag.remove();
        }

        if (structuredData) {
            const schemaTag = document.createElement('script');
            schemaTag.id = schemaTagId;
            schemaTag.type = 'application/ld+json';
            schemaTag.textContent = JSON.stringify(structuredData);
            document.head.appendChild(schemaTag);
        }

    }, [fullTitle, description, keywords, currentUrl, ogType, robots, resolvedOgImage, structuredData]);

    return null; // This component doesn't render anything
};

export default SEO;
