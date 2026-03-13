import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
    getDefaultSiteContent,
    loadSiteContentFromCloud,
    updateSiteContentSection,
    upsertSiteContent
} from '../services/siteContentService';

const SiteContentContext = createContext(null);

export const SiteContentProvider = ({ children }) => {
    const [siteContent, setSiteContent] = useState(() => getDefaultSiteContent());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const refreshSiteContent = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const cloudContent = await loadSiteContentFromCloud();
            setSiteContent(cloudContent);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshSiteContent();
    }, [refreshSiteContent]);

    const setSection = useCallback(async (sectionKey, value, meta = {}) => {
        await updateSiteContentSection(sectionKey, value, meta);
        setSiteContent((prev) => ({ ...prev, [sectionKey]: value }));
    }, []);

    const mergeContent = useCallback(async (partialData, meta = {}) => {
        await upsertSiteContent(partialData, meta);
        setSiteContent((prev) => ({ ...prev, ...partialData }));
    }, []);

    const value = useMemo(
        () => ({
            siteContent,
            isLoading,
            error,
            refreshSiteContent,
            setSection,
            mergeContent
        }),
        [siteContent, isLoading, error, refreshSiteContent, setSection, mergeContent]
    );

    return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
};

export const useSiteContent = () => {
    const context = useContext(SiteContentContext);
    if (!context) {
        throw new Error('useSiteContent must be used within SiteContentProvider');
    }
    return context;
};
