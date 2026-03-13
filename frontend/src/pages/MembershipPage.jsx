import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, CreditCard, Loader2, Sparkles, ShieldCheck, Coins } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { MEMBERSHIP_PLANS, MEMBERSHIP_PLAN_MAP } from '../config/membershipPlans';
import { initiatePayment, verifyPayment } from '../services/paymentService';
import { applyMembershipCredits, getUserPrintCredits } from '../services/membershipService';

const MembershipPage = () => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [credits, setCredits] = useState(0);
    const [isLoadingCredits, setIsLoadingCredits] = useState(false);
    const [isProcessingPlanId, setIsProcessingPlanId] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });

    const currentPlanLabel = useMemo(() => {
        if (!user?.activeMembershipPlan) return 'No active plan';
        return MEMBERSHIP_PLAN_MAP[user.activeMembershipPlan]?.name || 'Active plan';
    }, [user?.activeMembershipPlan]);

    useEffect(() => {
        let mounted = true;

        const loadCredits = async () => {
            if (!user?.uid) {
                setCredits(0);
                return;
            }
            setIsLoadingCredits(true);
            try {
                const balance = await getUserPrintCredits(user.uid);
                if (mounted) setCredits(balance);
            } catch {
                if (mounted) setCredits(0);
            } finally {
                if (mounted) setIsLoadingCredits(false);
            }
        };

        loadCredits();
        return () => {
            mounted = false;
        };
    }, [user?.uid]);

    useEffect(() => {
        const processMembershipPayment = async () => {
            const txId = new URLSearchParams(location.search).get('txId');
            if (!txId || !user?.uid) return;

            const pendingRaw = sessionStorage.getItem('pending_membership');
            if (!pendingRaw) return;

            let pending = null;
            try {
                pending = JSON.parse(pendingRaw);
            } catch {
                sessionStorage.removeItem('pending_membership');
                return;
            }

            if (!pending?.planId) {
                sessionStorage.removeItem('pending_membership');
                return;
            }

            if (pending.uid && pending.uid !== user.uid) {
                setStatus({ type: 'error', message: 'Membership payment belongs to another account.' });
                return;
            }

            const plan = MEMBERSHIP_PLAN_MAP[pending.planId];
            if (!plan) {
                sessionStorage.removeItem('pending_membership');
                setStatus({ type: 'error', message: 'Selected plan not found. Please buy again.' });
                return;
            }

            setStatus({ type: 'pending', message: 'Verifying payment and adding print credits...' });
            const result = await verifyPayment(txId);

            if (!result.success) {
                setStatus({ type: 'error', message: 'Payment verification failed. If amount was deducted, check status again shortly.' });
                return;
            }

            try {
                const applyResult = await applyMembershipCredits({
                    uid: user.uid,
                    plan,
                    txId,
                    amountPaid: plan.price
                });
                const nextCredits = Number.isFinite(applyResult?.nextCredits) ? applyResult.nextCredits : await getUserPrintCredits(user.uid);
                setCredits(nextCredits);
                setStatus({
                    type: 'success',
                    message: applyResult?.alreadyApplied
                        ? 'Payment already processed earlier. Credits are safe.'
                        : `${plan.credits} print credits added successfully.`
                });
                sessionStorage.removeItem('pending_membership');
                navigate('/membership', { replace: true });
            } catch {
                setStatus({ type: 'error', message: 'Could not add membership credits. Please contact support with payment reference.' });
            }
        };

        processMembershipPayment();
    }, [location.search, navigate, user?.uid]);

    const handleBuyPlan = async (plan) => {
        if (!user?.uid) {
            setStatus({ type: 'error', message: 'Please login first to buy a membership plan.' });
            return;
        }

        setIsProcessingPlanId(plan.id);
        setStatus({ type: 'pending', message: `Opening secure checkout for ${plan.name}...` });

        const paymentResult = await initiatePayment({
            amount: plan.price,
            customerName: user?.name || user?.displayName || 'Customer',
            mobileNumber: user?.phone || user?.mobile || '',
            redirectPath: '/membership'
        });

        if (!paymentResult.success) {
            setStatus({ type: 'error', message: paymentResult.message || 'Unable to initiate plan purchase right now.' });
            setIsProcessingPlanId('');
            return;
        }

        sessionStorage.setItem('pending_membership', JSON.stringify({
            uid: user.uid,
            planId: plan.id
        }));
        window.location.href = paymentResult.url;
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Navbar />

            <main className="pt-28 md:pt-32 pb-20">
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.28),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.22),transparent_30%),linear-gradient(120deg,#020617,#0f172a)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:38px_38px] opacity-30" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-24">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-3xl"
                        >
                            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-black text-cyan-300 bg-cyan-500/15 border border-cyan-400/30 px-4 py-2 rounded-full">
                                <Sparkles size={14} />
                                Membership Plans
                            </p>
                            <h1 className="mt-6 text-4xl md:text-6xl font-black leading-tight tracking-tight">
                                Print Smarter With
                                <span className="text-cyan-300"> Credit Packs</span>
                            </h1>
                            <p className="mt-5 text-slate-300 text-lg leading-relaxed max-w-2xl">
                                Buy credits once and use them across invoice and quotation prints. One print consumes one credit.
                            </p>

                            <div className="mt-8 grid sm:grid-cols-3 gap-3 max-w-2xl">
                                <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-4">
                                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400 font-bold">Current Plan</p>
                                    <p className="mt-1 font-black text-cyan-200">{currentPlanLabel}</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-4">
                                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400 font-bold">Print Credits</p>
                                    <p className="mt-1 font-black text-emerald-300">{isLoadingCredits ? 'Loading...' : credits}</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-4">
                                    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400 font-bold">Billing</p>
                                    <p className="mt-1 font-black text-sky-200">Secure PhonePe</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                    {status.message && (
                        <div className={`mb-8 rounded-2xl border px-5 py-4 text-sm font-medium ${
                            status.type === 'success'
                                ? 'bg-emerald-500/10 border-emerald-400/40 text-emerald-200'
                                : status.type === 'error'
                                    ? 'bg-red-500/10 border-red-400/40 text-red-200'
                                    : 'bg-sky-500/10 border-sky-400/40 text-sky-200'
                        }`}>
                            {status.message}
                        </div>
                    )}

                    <div className="grid lg:grid-cols-3 gap-6">
                        {MEMBERSHIP_PLANS.map((plan) => {
                            const perPrint = (plan.price / plan.credits).toFixed(2);
                            const isProcessing = isProcessingPlanId === plan.id;

                            return (
                                <motion.article
                                    key={plan.id}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className={`relative rounded-3xl border p-7 overflow-hidden ${
                                        plan.highlight
                                            ? 'bg-gradient-to-br from-sky-500/20 to-cyan-500/5 border-cyan-300/50 shadow-[0_0_0_1px_rgba(34,211,238,0.25),0_25px_50px_-18px_rgba(6,182,212,0.45)]'
                                            : 'bg-white/5 border-white/10'
                                    }`}
                                >
                                    {plan.highlight && (
                                        <span className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-[0.16em] text-cyan-100 bg-cyan-500/30 border border-cyan-200/40 px-2 py-1 rounded-full">
                                            Most Popular
                                        </span>
                                    )}

                                    <h2 className="text-2xl font-black">{plan.name}</h2>
                                    <p className="text-slate-300 mt-1">{plan.tagline}</p>

                                    <div className="mt-6 flex items-end gap-2">
                                        <span className="text-5xl font-black">Rs. {plan.price}</span>
                                        <span className="text-slate-300 pb-1">one time</span>
                                    </div>

                                    <div className="mt-6 space-y-3 text-sm">
                                        <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                                            <span className="text-slate-300">Credits</span>
                                            <span className="font-black text-emerald-300">{plan.credits} prints</span>
                                        </div>
                                        <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                                            <span className="text-slate-300">Effective cost</span>
                                            <span className="font-black text-cyan-200">Rs. {perPrint}/print</span>
                                        </div>
                                        <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                                            <span className="text-slate-300">Validity</span>
                                            <span className="font-black text-sky-200">{plan.validityDays} days</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleBuyPlan(plan)}
                                        disabled={isProcessing}
                                        className="mt-7 w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black transition-colors disabled:opacity-60"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard size={16} />
                                                Buy This Plan
                                            </>
                                        )}
                                    </button>
                                </motion.article>
                            );
                        })}
                    </div>

                    {!user && (
                        <div className="mt-8 rounded-2xl border border-amber-300/30 bg-amber-500/10 px-5 py-4 text-amber-100 text-sm">
                            Please login/signup first to activate membership credits. You can still use pay-per-print from Bill Maker.
                        </div>
                    )}

                    <div className="mt-10 grid md:grid-cols-3 gap-4">
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                            <h3 className="font-black flex items-center gap-2 text-sky-200"><ShieldCheck size={16} /> Secure Payment</h3>
                            <p className="mt-2 text-sm text-slate-300">All plan payments are processed through PhonePe with real-time verification.</p>
                        </div>
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                            <h3 className="font-black flex items-center gap-2 text-emerald-200"><Coins size={16} /> Credit Wallet</h3>
                            <p className="mt-2 text-sm text-slate-300">Credits are linked to your account, visible in dashboard, and consumed per print.</p>
                        </div>
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                            <h3 className="font-black flex items-center gap-2 text-cyan-200"><CheckCircle2 size={16} /> Business Friendly</h3>
                            <p className="mt-2 text-sm text-slate-300">Perfect for invoice and quotation workflows with predictable print costs.</p>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            to="/software/bill-maker?type=invoice"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-cyan-300/40 text-cyan-200 hover:bg-cyan-500/10 transition-colors font-bold"
                        >
                            Use Credits In Bill Maker
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default MembershipPage;
