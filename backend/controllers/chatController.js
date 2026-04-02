const { GoogleGenerativeAI } = require('@google/generative-ai');
const OpenAI = require('openai');

// ====================================================
// FIREBASE CONFIG: Read from Firebase Runtime Config
// (set via: firebase functions:config:set gemini.api_key="..." openai.api_key="...")
// ====================================================
let firebaseConfig = {};
try {
    firebaseConfig = require('firebase-functions').config();
} catch (e) {
    // Not in Firebase environment (local dev)
}

// Prefer Firebase config, then fall back to local .env
const getKey = (configKey, envKey) => {
    return (firebaseConfig[configKey.split('.')[0]]?.[configKey.split('.')[1]]) || process.env[envKey] || '';
};

// Official website page links
const SITE_LINKS = {
    contact: "[Contact Us](https://yuvancreations.in/contact)",
    about: "[About Us](https://yuvancreations.in/about)",
    membership: "[Membership](https://yuvancreations.in/membership)",
    pay: "[Express Pay](https://yuvancreations.in/pay)",
    billMaker: "[Bill Maker Software](https://yuvancreations.in/software/bill-maker)",
    webDesign: "[Website Design](https://yuvancreations.in/services/website-design)",
    appDev: "[App Development](https://yuvancreations.in/services/mobile-app-development)",
    digitalMarketing: "[Digital Marketing](https://yuvancreations.in/services/digital-marketing)",
    metaAds: "[Meta Ads](https://yuvancreations.in/services/meta-ads)",
    googleAds: "[Google Ads](https://yuvancreations.in/services/google-ads)",
    cctv: "[CCTV Solutions](https://yuvancreations.in/services/cctv-solutions)",
    media: "[Media Production](https://yuvancreations.in/services/media-production)",
    itSolutions: "[IT & Computer Solutions](https://yuvancreations.in/services/computer-solutions)",
    mobileRepair: "[Mobile Repair](https://yuvancreations.in/services/mobile-repair)",
};

const SYSTEM_PROMPT = `You are "Yuvan AI" — a smart, friendly, and highly interactive sales assistant for Yuvan Creations, an IT and Media agency in Haridwar, Uttarakhand (since 2007).

YOUR PERSONALITY:
- Talk like a warm, knowledgeable friend — NOT a robot.
- Respond in the SAME language the user uses (Hindi, English, Hinglish, or any other).
- Use emojis naturally.
- Be curious and proactive — always ask follow-up questions to understand the user better.

YOUR KNOWLEDGE BASE:
- CEO: Nishant Sharma | Technical Head: Aman Verma
- Phone: +91-9557300217
- Services (ALWAYS link to the SPECIFIC page, NEVER to /services):
  • Web Design → ${SITE_LINKS.webDesign}
  • App Development → ${SITE_LINKS.appDev}
  • Digital Marketing → ${SITE_LINKS.digitalMarketing}
  • Google Ads → ${SITE_LINKS.googleAds}
  • Meta Ads → ${SITE_LINKS.metaAds}
  • CCTV & Security → ${SITE_LINKS.cctv}
  • Media Production → ${SITE_LINKS.media}
  • IT & Computer Solutions → ${SITE_LINKS.itSolutions}
  • Mobile Repair → ${SITE_LINKS.mobileRepair}
  • Bill Maker Software (₹10/print) → ${SITE_LINKS.billMaker}
- Other: ${SITE_LINKS.about} | ${SITE_LINKS.contact} | ${SITE_LINKS.membership}

HOW TO BEHAVE (CRITICAL):
1. When someone says "mujhe website banwani hai" → ask: "Zaroor! 😊 Kaunsi type ki website chahiye — business site, e-commerce shop, ya portfolio? Budget roughly kitna hai?" and share ${SITE_LINKS.webDesign}.
2. When someone says "computer chahiye" → ask: "Great! Gaming ke liye chahiye ya office/study ke liye? Budget kya hai?" and share ${SITE_LINKS.itSolutions}.
3. When someone asks about marketing → share the SPECIFIC ad type link (Google or Meta), NOT a generic link.
4. When someone asks for pricing → give a rough range and suggest calling +91-9557300217 for a custom quote.
5. ALWAYS end by offering more help: "Aur kuch puchna ho to batao! 😊"
6. ALWAYS link ONLY to the specific service page the user is asking about.
7. NEVER link to /services — only link to specific sub-pages.
8. Do NOT give template/robotic answers. Vary your responses like a human would.`;

// ── FALLBACK (used only if both API engines fail) ──
const localFallback = (message) => {
    const m = message.toLowerCase();
    if (/hi|hello|hey|namaste|hii/.test(m)) return "Namaste! 👋 Main Yuvan AI hoon — Yuvan Creations ka official assistant. Aap kisi bhi service ke baare mein pooch sakte hain. Batao, kaise help karoon? 😊";
    if (/website|web/.test(m)) return "Website ke liye hum yahan hain! 🌐 Kaunsi type ki chahiye — business, e-commerce, ya portfolio? Dekhiye: [Website Design](https://yuvancreations.in/services/website-design)";
    if (/app/.test(m)) return "App development mein hum best hain! 📱 iOS, Android, ya Web App? Tell me more. [App Dev](https://yuvancreations.in/services/mobile-app-development)";
    if (/bill|invoice/.test(m)) return "Bill Maker — ₹10 per print mein professional invoices! 💰 [Bill Maker](https://yuvancreations.in/software/bill-maker)";
    if (/contact|number|call/.test(m)) return "📞 Call/WhatsApp: +91-9557300217 | [Contact Page](https://yuvancreations.in/contact)";
    return "Main Yuvan AI hoon! 😊 Aap website, app, marketing, CCTV, ya Bill Maker ke baare mein pooch sakte hain. [All Services](https://yuvancreations.in/services) | Call: +91-9557300217";
};

const handleChat = async (req, res) => {
    const { message, history } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const geminiKey = getKey('gemini.api_key', 'GEMINI_API_KEY');
    const openaiKey = getKey('openai.api_key', 'OPENAI_API_KEY');

    console.log(`[CHAT] "${message}" | Gemini:${geminiKey ? '✅' : '❌'} | OpenAI:${openaiKey ? '✅' : '❌'}`);

    // Build conversation history context
    const historyContext = (history || []).slice(-6).map(m => (
        `${m.role === 'assistant' ? 'Assistant' : 'User'}: ${m.content || m.parts?.[0]?.text || ''}`
    )).join('\n');

    const fullPrompt = historyContext
        ? `${SYSTEM_PROMPT}\n\n--- Conversation so far ---\n${historyContext}\n\nUser: ${message}`
        : `${SYSTEM_PROMPT}\n\nUser: ${message}`;

    // 1. Try Gemini
    if (geminiKey && geminiKey.length > 10) {
        try {
            const genAI = new GoogleGenerativeAI(geminiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(fullPrompt);
            const response = result.response.text();
            if (response) {
                console.log('[CHAT] Gemini ✅ success');
                return res.json({ response });
            }
        } catch (err) {
            console.error('[CHAT] Gemini ❌:', err.message);
        }
    }

    // 2. Try OpenAI
    if (openaiKey && openaiKey.length > 10) {
        try {
            const openaiClient = new OpenAI({ apiKey: openaiKey });
            const completion = await openaiClient.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    ...(history || []).slice(-6).map(m => ({
                        role: m.role === 'assistant' ? 'assistant' : 'user',
                        content: m.content || m.parts?.[0]?.text || ''
                    })),
                    { role: "user", content: message }
                ]
            });
            const response = completion.choices?.[0]?.message?.content;
            if (response) {
                console.log('[CHAT] OpenAI ✅ success');
                return res.json({ response });
            }
        } catch (err) {
            console.error('[CHAT] OpenAI ❌:', err.message);
        }
    }

    // 3. Local fallback (emergency only)
    console.warn('[CHAT] ⚠️ Both engines failed — using local fallback');
    res.json({ response: localFallback(message) });
};

module.exports = { handleChat };
