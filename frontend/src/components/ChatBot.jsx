import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, Bot, User, PhoneCall, Globe, Sparkles, RefreshCcw } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000').replace(/\/$/, '');

// Dynamic suggestions based on conversation context
const getSuggestions = (messages) => {
    if (!messages || messages.length === 0) {
        return ['Our Services', 'Bill Maker', 'About CEO', 'Contact'];
    }

    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
    
    // Detect context from last message
    if (lastMessage.includes('service') || lastMessage.includes('what do you') || lastMessage.includes('offer')) {
        return ['Web Design', 'App Development', 'Digital Marketing', 'CCTV Solutions', 'Media Production'];
    }
    if (lastMessage.includes('bill') || lastMessage.includes('invoice') || lastMessage.includes('quotation')) {
        return ['How much?', 'Features', 'Bill Maker Plans', 'Try Now'];
    }
    if (lastMessage.includes('price') || lastMessage.includes('cost') || lastMessage.includes('how much')) {
        return ['Web Design Cost', 'App Dev Cost', 'More Services', 'Contact for Quote'];
    }
    if (lastMessage.includes('ceo') || lastMessage.includes('founder') || lastMessage.includes('nishant') || lastMessage.includes('team')) {
        return ['Company History', 'Our Services', 'Technical Head', 'Contact Team'];
    }
    if (lastMessage.includes('contact') || lastMessage.includes('phone') || lastMessage.includes('location') || lastMessage.includes('address')) {
        return ['Call Us', 'Visit Website', 'Email Support', 'Our Services'];
    }
    if (lastMessage.includes('web') || lastMessage.includes('website')) {
        return ['Web Design Process', 'Web Design Cost', 'Examples', 'Start Project'];
    }
    if (lastMessage.includes('app') || lastMessage.includes('application')) {
        return ['App Types', 'App Cost', 'Timeline', 'Start App Project'];
    }
    if (lastMessage.includes('digital marketing') || lastMessage.includes('ads') || lastMessage.includes('google') || lastMessage.includes('meta')) {
        return ['Ad Strategy', 'Budget Options', 'Success Stories', 'Start Campaign'];
    }

    // Default suggestions
    return ['Tell me more', 'Next Service', 'Pricing', 'Contact Us'];
};

const ChatBot = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [suggestions, setSuggestions] = useState(['Our Services', 'Bill Maker', 'About CEO', 'Contact']);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const greeting = user?.displayName || user?.name || user?.firstName 
                ? `Hi ${user.displayName || user.name || user.firstName}! How can I assist you today?` 
                : 'Hi! How can I help you today?';
            setMessages([{ role: 'assistant', content: greeting }]);
            setSuggestions(['Our Services', 'Bill Maker', 'About CEO', 'Contact']);
        }
    }, [isOpen, user]);

    // Update suggestions based on conversation
    useEffect(() => {
        const newSuggestions = getSuggestions(messages);
        setSuggestions(newSuggestions);
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (customMsg = null) => {
        const userMsg = (customMsg || input).trim();
        if (!userMsg || isLoading) return;

        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        try {
            // Format history for backend
            const chatHistory = messages
                .filter(m => m.role === 'user' || m.role === 'assistant')
                .map(m => ({ 
                    role: m.role === 'user' ? 'user' : 'assistant', 
                    parts: [{ text: m.content }] 
                }))
                .slice(-6); // Last 6 messages

            const response = await axios.post(`${BACKEND_URL}/api/chat`, {
                message: userMsg,
                history: chatHistory
            });

            setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting. Please try again or call us at +91-9557300217 🤖" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[10000] no-print">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-white border border-slate-200 shadow-2xl w-[350px] sm:w-[380px] h-[520px] rounded-[2rem] overflow-hidden flex flex-col mb-4"
                    >
                        {/* Header - Simple & Clean */}
                        <div className="bg-slate-900 px-6 py-5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center">
                                    <Bot className="text-white" size={20} />
                                </div>
                                <div>
                                    <h3 className="text-white font-black text-sm">Yuvan AI</h3>
                                    <div className="flex items-center gap-1.5 pt-0.5">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                        <span className="text-emerald-500 text-[9px] font-black uppercase tracking-widest">Active Now</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button 
                                    onClick={() => {
                                        setMessages([{ role: 'assistant', content: 'How can I assist you?' }]);
                                        setSuggestions(['Our Services', 'Bill Maker', 'About CEO', 'Contact']);
                                    }} 
                                    className="p-2 text-slate-400 hover:text-white transition-colors"
                                >
                                    <RefreshCcw size={16}/>
                                </button>
                                <button 
                                    onClick={() => setIsOpen(false)} 
                                    className="p-2 text-slate-400 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/30 scroll-smooth custom-scrollbar">
                            {messages.map((msg, idx) => (

                                <motion.div 
                                    key={idx} 
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] p-4 rounded-3xl text-[13px] font-semibold leading-relaxed ${
                                        msg.role === 'user' 
                                        ? 'bg-slate-900 text-white rounded-tr-none shadow-lg shadow-slate-200' 
                                        : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none shadow-sm'
                                    }`}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-slate-100 p-4 rounded-3xl rounded-tl-none shadow-sm flex items-center gap-2">
                                        <Loader2 size={14} className="text-indigo-600 animate-spin" />
                                        <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">AI is thinking...</span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Action Chips - Dynamic Suggestions */}
                        <div className="px-5 py-2 flex gap-2 overflow-x-auto scrollbar-hide no-print">
                            {suggestions.map((action, i) => (
                                <motion.button
                                    key={i}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => handleSend(action)}
                                    className="whitespace-nowrap bg-white border border-slate-200 hover:border-indigo-600 hover:text-indigo-600 px-4 py-2 rounded-full text-[10px] font-black uppercase transition-all duration-200"
                                >
                                    {action}
                                </motion.button>
                            ))}
                        </div>

                        {/* Input Area - Simple & Fast */}
                        <div className="p-5 bg-white border-t border-slate-100">
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    placeholder="Ask anything..."
                                    className="flex-1 bg-slate-100 border-none rounded-2xl py-4 px-5 text-sm font-bold outline-none focus:ring-2 ring-indigo-600/20 transition-all"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                />
                                <button
                                    onClick={() => handleSend()}
                                    disabled={!input.trim() || isLoading}
                                    className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-indigo-600 disabled:opacity-50 transition-all shadow-lg active:scale-95"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Float Button - Clean & Solid */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`p-5 rounded-[1.8rem] shadow-2xl flex items-center gap-3 transition-all duration-300 ${
                    isOpen ? 'bg-white text-slate-900 ring-2 ring-slate-900' : 'bg-slate-900 text-white'
                }`}
            >
                {isOpen ? <X size={24} /> : (
                    <>
                        <MessageSquare size={24} />
                        <span className="font-black text-xs uppercase tracking-widest">Ask AI</span>
                    </>
                )}
            </motion.button>
        </div>
    );
};

export default ChatBot;


