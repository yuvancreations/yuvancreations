import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import defaultCMSData from '../../defaultCMSData.json';

const SITE_CONTENT_COLLECTION = 'site_content';
const MAIN_CONFIG_DOC = 'main_config';

const cloneData = (value) => {
    if (typeof structuredClone === 'function') {
        return structuredClone(value);
    }
    return JSON.parse(JSON.stringify(value));
};

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const normalizeServices = (services, fallbackServices) => {
    if (!Array.isArray(services) || services.length === 0) return fallbackServices;

    const normalized = services
        .filter((item) => item && isNonEmptyString(item.name) && isNonEmptyString(item.path))
        .map((item) => ({ name: item.name.trim(), path: item.path.trim() }));

    return normalized.length > 0 ? normalized : fallbackServices;
};

const normalizeSoftware = (software, fallbackSoftware) => {
    if (!Array.isArray(software) || software.length === 0) return fallbackSoftware;

    const fromItems = software
        .filter((item) => item && typeof item === 'object')
        .map((item) => {
            if (Array.isArray(item.children)) {
                const children = item.children
                    .filter((child) => child && isNonEmptyString(child.name) && isNonEmptyString(child.path))
                    .map((child) => ({ name: child.name.trim(), path: child.path.trim() }));

                if (!isNonEmptyString(item.name) || children.length === 0) return null;
                return { name: item.name.trim(), children };
            }

            if (!isNonEmptyString(item.name) || !isNonEmptyString(item.path)) return null;
            return { name: item.name.trim(), path: item.path.trim() };
        })
        .filter(Boolean);

    if (fromItems.length === 0) return fallbackSoftware;

    const hasBillMakerGroup = fromItems.some((item) => item.name === 'Bill Maker' && Array.isArray(item.children));
    if (hasBillMakerGroup) return fromItems;

    // Backward compatibility: older nav had separate invoice/quotation links.
    const isInvoicePath = (path) => path.includes('/software/make-invoice') || path.includes('type=invoice');
    const isQuotationPath = (path) => path.includes('/software/make-quotation') || path.includes('type=quotation');

    const invoiceLink = fromItems.find((item) => item.path && isInvoicePath(item.path));
    const quotationLink = fromItems.find((item) => item.path && isQuotationPath(item.path));
    const remaining = fromItems.filter((item) => !(item.path && (isInvoicePath(item.path) || isQuotationPath(item.path))));

    const billMakerGroup = {
        name: 'Bill Maker',
        children: [
            {
                name: 'Invoice Generate',
                path: invoiceLink?.path || '/software/bill-maker?type=invoice'
            },
            {
                name: 'Quotation Generate',
                path: quotationLink?.path || '/software/bill-maker?type=quotation'
            }
        ]
    };

    return [billMakerGroup, ...remaining];
};

const normalizeSiteContent = (rawContent) => {
    const defaults = cloneData(defaultCMSData);
    const source = rawContent && typeof rawContent === 'object' ? rawContent : {};

    return {
        ...defaults,
        ...source,
        navServices: normalizeServices(source.navServices, defaults.navServices),
        navSoftware: normalizeSoftware(source.navSoftware, defaults.navSoftware)
    };
};

export const getDefaultSiteContent = () => normalizeSiteContent(defaultCMSData);

export const loadSiteContentFromCloud = async () => {
    try {
        const docRef = doc(db, SITE_CONTENT_COLLECTION, MAIN_CONFIG_DOC);
        const snap = await getDoc(docRef);
        if (!snap.exists()) {
            return getDefaultSiteContent();
        }
        return normalizeSiteContent(snap.data());
    } catch (error) {
        console.warn('Failed to load site content from cloud, using defaults.', error);
        return getDefaultSiteContent();
    }
};

export const updateSiteContentSection = async (sectionKey, value, meta = {}) => {
    const docRef = doc(db, SITE_CONTENT_COLLECTION, MAIN_CONFIG_DOC);
    await setDoc(
        docRef,
        {
            [sectionKey]: value,
            updatedAt: serverTimestamp(),
            ...(meta.updatedBy ? { updatedBy: meta.updatedBy } : {})
        },
        { merge: true }
    );
};

export const upsertSiteContent = async (partialData, meta = {}) => {
    const docRef = doc(db, SITE_CONTENT_COLLECTION, MAIN_CONFIG_DOC);
    await setDoc(
        docRef,
        {
            ...partialData,
            updatedAt: serverTimestamp(),
            ...(meta.updatedBy ? { updatedBy: meta.updatedBy } : {})
        },
        { merge: true }
    );
};
