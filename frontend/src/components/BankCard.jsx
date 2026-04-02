import React from 'react';
import { CreditCard, MoreVertical } from 'lucide-react';

const BankCard = ({ title, value, icon: Icon, color = 'blue', trend, subValue }) => {
    const isBlue = color === 'blue';
    const isDark = color === 'dark';

    const bgClass = isBlue 
        ? 'bg-gradient-to-br from-bank-blue to-blue-700 text-white shadow-xl shadow-bank-blue/20 transform hover:-translate-y-1 transition-all'
        : isDark
        ? 'bg-bank-dark text-white shadow-xl shadow-bank-dark/20 transform hover:-translate-y-1 transition-all'
        : 'bg-white text-bank-dark border border-gray-100 shadow-lg shadow-gray-200/50 transform hover:-translate-y-1 transition-all';

    return (
        <div className={`p-8 rounded-[25px] flex flex-col justify-between overflow-hidden relative ${bgClass}`}>
            {/* Top Row */}
            <div className="flex items-center justify-between mb-8 z-10">
                <div>
                    <h3 className={`text-sm font-medium uppercase tracking-widest ${isBlue || isDark ? 'opacity-70 text-bank-bg' : 'text-bank-grey'}`}>
                        {title}
                    </h3>
                    <p className="text-3xl font-black mt-2 tracking-tight">
                        {value}
                    </p>
                </div>
                <div className={`p-3 rounded-2xl ${isBlue || isDark ? 'bg-white/20 backdrop-blur-md text-white' : 'bg-bank-bg text-bank-blue'}`}>
                    {Icon ? <Icon size={24} /> : <CreditCard size={24} />}
                </div>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between gap-4 z-10">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${isBlue || isDark ? 'opacity-60 text-bank-bg' : 'text-bank-grey'}`}>
                            Subtext
                        </span>
                        <span className="text-sm font-bold truncate max-w-[120px]">
                            {subValue || 'Active Tracking'}
                        </span>
                    </div>
                </div>
                
                {trend && (
                    <div className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 ${
                        trend > 0 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-rose-500/20 text-rose-400'
                    }`}>
                        {trend > 0 ? '+' : ''}{trend}%
                    </div>
                )}
            </div>

            {/* Subtle Design Elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        </div>
    );
};

export default BankCard;
