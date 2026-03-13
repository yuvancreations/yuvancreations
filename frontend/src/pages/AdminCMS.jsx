import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Plus, RotateCcw, Save, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSiteContent } from '../context/SiteContentContext';

const emptyService = () => ({ name: '', path: '' });
const emptySoftwareLink = () => ({ name: '', path: '' });
const emptySoftwareGroup = () => ({ name: 'Group', children: [{ name: '', path: '' }] });
const emptySoftwareChild = () => ({ name: '', path: '' });

const cleanText = (value) => (typeof value === 'string' ? value.trim() : '');

const normalizeServicesInput = (value) => {
    if (!Array.isArray(value)) return [];
    return value
        .filter((item) => item && typeof item === 'object')
        .map((item) => ({ name: cleanText(item.name), path: cleanText(item.path) }))
        .filter((item) => item.name && item.path);
};

const normalizeSoftwareInput = (value) => {
    if (!Array.isArray(value)) return [];
    return value
        .filter((item) => item && typeof item === 'object')
        .map((item) => {
            if (Array.isArray(item.children)) {
                const children = item.children
                    .filter((child) => child && typeof child === 'object')
                    .map((child) => ({ name: cleanText(child.name), path: cleanText(child.path) }))
                    .filter((child) => child.name && child.path);

                if (children.length === 0) return null;
                return { name: cleanText(item.name) || 'Group', children };
            }

            return { name: cleanText(item.name), path: cleanText(item.path) };
        })
        .filter((item) => {
            if (item?.children) return true;
            return item?.name && item?.path;
        })
        .filter(Boolean);
};

const AdminCMS = () => {
    const { user } = useAuth();
    const { siteContent, setSection, isLoading, refreshSiteContent } = useSiteContent();
    const [servicesDraft, setServicesDraft] = useState([]);
    const [softwareDraft, setSoftwareDraft] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    const sourceSnapshot = useMemo(() => ({
        navServices: siteContent?.navServices || [],
        navSoftware: siteContent?.navSoftware || []
    }), [siteContent]);

    useEffect(() => {
        setServicesDraft(sourceSnapshot.navServices.length ? sourceSnapshot.navServices : [emptyService()]);
        setSoftwareDraft(sourceSnapshot.navSoftware.length ? sourceSnapshot.navSoftware : [emptySoftwareGroup()]);
    }, [sourceSnapshot]);

    const resetEditors = (message = 'Editor reset to latest live content.') => {
        setServicesDraft(sourceSnapshot.navServices.length ? sourceSnapshot.navServices : [emptyService()]);
        setSoftwareDraft(sourceSnapshot.navSoftware.length ? sourceSnapshot.navSoftware : [emptySoftwareGroup()]);
        setError('');
        setStatus(message);
    };

    const handleSave = async () => {
        setError('');
        setStatus('');

        const normalizedServices = normalizeServicesInput(servicesDraft);
        const normalizedSoftware = normalizeSoftwareInput(softwareDraft);

        if (normalizedServices.length === 0) {
            setError('Services list me kam se kam ek valid item hona chahiye.');
            return;
        }

        if (normalizedSoftware.length === 0) {
            setError('Software list me kam se kam ek valid item hona chahiye.');
            return;
        }

        setIsSaving(true);
        try {
            const meta = { updatedBy: user?.email || user?.uid || 'admin' };
            await setSection('navServices', normalizedServices, meta);
            await setSection('navSoftware', normalizedSoftware, meta);
            setStatus('Saved successfully. CMS data live update ho gaya.');
        } catch (saveError) {
            setError(saveError.message || 'Failed to save CMS data.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleReload = async () => {
        setError('');
        setStatus('');
        try {
            await refreshSiteContent();
            resetEditors('Latest cloud content loaded.');
        } catch (reloadError) {
            setError(reloadError.message || 'Reload failed.');
        }
    };

    const updateServiceField = (index, field, value) => {
        setServicesDraft((prev) => prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item)));
    };

    const addService = () => {
        setServicesDraft((prev) => [...prev, emptyService()]);
    };

    const removeService = (index) => {
        setServicesDraft((prev) => (prev.length <= 1 ? prev : prev.filter((_, idx) => idx !== index)));
    };

    const updateSoftwareLinkField = (index, field, value) => {
        setSoftwareDraft((prev) => prev.map((item, idx) => {
            if (idx !== index || item.children) return item;
            return { ...item, [field]: value };
        }));
    };

    const updateSoftwareGroupName = (index, value) => {
        setSoftwareDraft((prev) => prev.map((item, idx) => {
            if (idx !== index || !item.children) return item;
            return { ...item, name: value };
        }));
    };

    const addSoftwareChild = (index) => {
        setSoftwareDraft((prev) => prev.map((item, idx) => {
            if (idx !== index || !item.children) return item;
            return { ...item, children: [...item.children, emptySoftwareChild()] };
        }));
    };

    const updateSoftwareChildField = (index, childIndex, field, value) => {
        setSoftwareDraft((prev) => prev.map((item, idx) => {
            if (idx !== index || !item.children) return item;
            return {
                ...item,
                children: item.children.map((child, cIdx) => (cIdx === childIndex ? { ...child, [field]: value } : child))
            };
        }));
    };

    const removeSoftwareChild = (index, childIndex) => {
        setSoftwareDraft((prev) => prev.map((item, idx) => {
            if (idx !== index || !item.children) return item;
            if (item.children.length <= 1) return item;
            return { ...item, children: item.children.filter((_, cIdx) => cIdx !== childIndex) };
        }));
    };

    const addSoftwareLink = () => {
        setSoftwareDraft((prev) => [...prev, emptySoftwareLink()]);
    };

    const addSoftwareGroup = () => {
        setSoftwareDraft((prev) => [...prev, emptySoftwareGroup()]);
    };

    const removeSoftwareItem = (index) => {
        setSoftwareDraft((prev) => (prev.length <= 1 ? prev : prev.filter((_, idx) => idx !== index)));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6 flex items-center justify-between gap-3">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900">CMS Panel</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Easy click editor. UI/theme same rahega, sirf content data update hoga.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            to="/admin"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
                        >
                            <ArrowLeft size={16} />
                            Back
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-bold text-gray-900">Services Menu</h2>
                            <button
                                onClick={addService}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100"
                            >
                                <Plus size={14} />
                                Add
                            </button>
                        </div>
                        <div className="space-y-3 max-h-[520px] overflow-auto pr-1">
                            {servicesDraft.map((item, index) => (
                                <div key={`service-${index}`} className="grid grid-cols-1 gap-2 border border-gray-200 rounded-xl p-3">
                                    <input
                                        value={item.name || ''}
                                        onChange={(e) => updateServiceField(index, 'name', e.target.value)}
                                        placeholder="Service Name"
                                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                                    />
                                    <div className="flex items-center gap-2">
                                        <input
                                            value={item.path || ''}
                                            onChange={(e) => updateServiceField(index, 'path', e.target.value)}
                                            placeholder="/services/your-path"
                                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                                        />
                                        <button
                                            onClick={() => removeService(index)}
                                            className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                                            title="Remove service"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-bold text-gray-900">Software Menu</h2>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={addSoftwareLink}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100"
                                >
                                    <Plus size={14} />
                                    Link
                                </button>
                                <button
                                    onClick={addSoftwareGroup}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 font-semibold hover:bg-indigo-100"
                                >
                                    <Plus size={14} />
                                    Group
                                </button>
                            </div>
                        </div>
                        <div className="space-y-3 max-h-[520px] overflow-auto pr-1">
                            {softwareDraft.map((item, index) => (
                                <div key={`software-${index}`} className="border border-gray-200 rounded-xl p-3">
                                    {item.children ? (
                                        <>
                                            <div className="flex items-center gap-2 mb-2">
                                                <input
                                                    value={item.name || ''}
                                                    onChange={(e) => updateSoftwareGroupName(index, e.target.value)}
                                                    placeholder="Group Name (e.g. Bill Maker)"
                                                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                                                />
                                                <button
                                                    onClick={() => removeSoftwareItem(index)}
                                                    className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                                                    title="Remove group"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div className="space-y-2 pl-3 border-l border-gray-200">
                                                {item.children.map((child, childIndex) => (
                                                    <div key={`software-${index}-child-${childIndex}`} className="space-y-2">
                                                        <input
                                                            value={child.name || ''}
                                                            onChange={(e) => updateSoftwareChildField(index, childIndex, 'name', e.target.value)}
                                                            placeholder="Child Name"
                                                            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                                                        />
                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                value={child.path || ''}
                                                                onChange={(e) => updateSoftwareChildField(index, childIndex, 'path', e.target.value)}
                                                                placeholder="/software/some-path"
                                                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                                                            />
                                                            <button
                                                                onClick={() => removeSoftwareChild(index, childIndex)}
                                                                className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                                                                title="Remove child"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                                <button
                                                    onClick={() => addSoftwareChild(index)}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200"
                                                >
                                                    <Plus size={14} />
                                                    Add Child Link
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="space-y-2">
                                            <input
                                                value={item.name || ''}
                                                onChange={(e) => updateSoftwareLinkField(index, 'name', e.target.value)}
                                                placeholder="Software Name"
                                                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                                            />
                                            <div className="flex items-center gap-2">
                                                <input
                                                    value={item.path || ''}
                                                    onChange={(e) => updateSoftwareLinkField(index, 'path', e.target.value)}
                                                    placeholder="/software/some-path"
                                                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                                                />
                                                <button
                                                    onClick={() => removeSoftwareItem(index)}
                                                    className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                                                    title="Remove link"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={handleSave}
                            disabled={isSaving || isLoading}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-60"
                        >
                            <Save size={16} />
                            {isSaving ? 'Saving...' : 'Save To Live'}
                        </button>

                        <button
                            onClick={resetEditors}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-bold hover:bg-gray-200"
                        >
                            <RotateCcw size={16} />
                            Reset Editor
                        </button>

                        <button
                            onClick={handleReload}
                            disabled={isLoading}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 disabled:opacity-60"
                        >
                            Reload From Cloud
                        </button>
                    </div>

                    {status && <p className="mt-4 text-sm font-medium text-emerald-700">{status}</p>}
                    {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default AdminCMS;
