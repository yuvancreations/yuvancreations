const OpenAI = require('openai');

// Knowledge base for Yuvan Creations
const KNOWLEDGE_BASE = {
    company: {
        name: "Yuvan Creations",
        founded: 2007,
        location: "Haridwar, Uttarakhand",
        phone: "+91-9557300217",
        ceo: "Nishant Sharma",
        technicalHead: "Aman Verma",
        description: "A premium IT and Media agency serving clients since 2007"
    },
    services: {
        webDesign: "Custom website design tailored to your business needs",
        appDevelopment: "Native and cross-platform mobile app development",
        digitalMarketing: "Google Ads and Meta (Facebook/Instagram) advertising campaigns",
        cctvSolutions: "CCTV installation and surveillance system setup",
        mediaProduction: "Professional video production and media content creation",
        computerSolutions: "Complete IT solutions for businesses",
        mobileRepair: "Mobile phone repair and maintenance services"
    },
    products: {
        billMaker: "Professional invoice and quotation generation software - ₹10 per print, with membership options available"
    }
};

// Generate intelligent response based on context and history
const generateSmartResponse = (message, history = []) => {
    const msg = message.toLowerCase().trim();
    let response = "";

    // Greeting responses
    if (/^(hello|hi|hey|namaste|hii|hiii)$/i.test(msg)) {
        return "Hey there! 👋 I'm Yuvan's AI assistant. How can I help you today? Feel free to ask about our services, software, or anything else!";
    }

    // How are you
    if (/how are you|kaise ho|kaiso|tum kaun ho|who are you|aap kaun/.test(msg)) {
        return "I'm doing great, thanks for asking! 😊 I'm Yuvan Creations' AI assistant, here to help you with information about our services, products, and team. What can I help you with?";
    }

    // Services-related queries
    if (/service|what do you do|kya karte ho|what can you do|offer|business/.test(msg)) {
        return `At Yuvan Creations, we offer a comprehensive range of services:\n\n📱 **App Development** - Custom mobile and web applications\n🌐 **Web Design** - Beautiful, responsive websites\n📢 **Digital Marketing** - Google Ads & Meta Ads campaigns\n📹 **Media Production** - Professional video content creation\n🔒 **CCTV Solutions** - Surveillance system installation\n💻 **IT Solutions** - Complete tech solutions for businesses\n📱 **Mobile Repair** - Expert phone repair services\n\nWe've been serving clients excellently since 2007! Which service interests you?`;
    }

    // Bill Maker/Software queries
    if (/bill maker|invoice|quotation|software|billing|₹10|10 rupees/.test(msg)) {
        return `💰 **Bill Maker** is our flagship software!\n\nIt's a professional tool for creating invoices and quotations with these features:\n✅ Easy-to-use interface\n✅ Professional templates\n✅ Fast invoice generation\n✅ Just ₹10 per print\n✅ Membership plans available for frequent users\n\nPerfect for small businesses and freelancers! Want to know more about pricing or features?`;
    }

    // CEO/Founder queries
    if (/nishant sharma|ceo|founder|owner|head|leader|nishant/.test(msg)) {
        return `🎯 **Nishant Sharma** is our visionary Founder & CEO!\n\nHe's been leading Yuvan Creations since 2007, building it into one of Haridwar's most trusted IT and Media agencies. His leadership has helped us serve hundreds of satisfied clients across various industries.\n\nWant to know more about our team or services?`;
    }

    // Contact/Location queries
    if (/contact|location|where|address|phone|number|call|reach|haridwar/.test(msg)) {
        return `📍 **Get in Touch with Us**\n\n📞 **Phone:** +91-9557300217\n🏠 **Location:** Haridwar, Uttarakhand\n\nFeel free to call us for any inquiries! Our team is always ready to help. 😊`;
    }

    // Price/Cost queries
    if (/price|cost|fee|how much|kitna|charges|expensive|afford|rupees|₹/.test(msg)) {
        return `💵 **Pricing Information**\n\nOur pricing varies based on the service:\n\n📊 **Bill Maker:** ₹10 per print (with membership options)\n🌐 **Web Design:** Custom quotes based on requirements\n📱 **App Development:** Tailored pricing for your project\n📢 **Digital Marketing:** Flexible ad spend packages\n🎥 **Media Production:** Project-based pricing\n\nWould you like a custom quote? You can call us at +91-9557300217 for detailed pricing!`;
    }

    // Thanks/Appreciation
    if (/thank you|thanks|appreciate|great|awesome|cool|nice/.test(msg)) {
        return "You're very welcome! 😄 If you have any more questions about Yuvan Creations, feel free to ask. We're here to help!";
    }

    // Goodbye
    if (/bye|goodbye|see you|take care|gotta go|tkc|tc|see ya/.test(msg)) {
        return "Goodbye! 👋 Thanks for chatting with me. Feel free to reach out anytime. Have a great day! 😊";
    }

    // Default friendly response
    return `I'm here to help! 😊 Ask me anything about Yuvan Creations - our services, Bill Maker software, team, or how to reach us. What would you like to know?\n\n📞 Or call us directly: +91-9557300217`;
};

const SYSTEM_PROMPT = `You are "Yuvan ChatBot", the official AI assistant of Yuvan Creations. 

ABOUT YUVAN CREATIONS:
- Premium IT and Media agency based in Haridwar, Uttarakhand
- Founded in 2007
- CEO: Nishant Sharma
- Technical Head: Aman Verma
- Phone: +91-9557300217

SERVICES:
📱 Web Design - Custom, responsive websites
📱 App Development - Mobile and web applications
📢 Digital Marketing - Google Ads & Meta Ads campaigns
📹 Media Production - Professional video content creation
🔒 CCTV Solutions - Surveillance system installation
💻 IT Solutions - Complete tech solutions for businesses
📱 Mobile Repair - Expert phone repair services

PRODUCTS:
💰 Bill Maker - Professional invoice and quotation software (₹10 per print)

YOUR PERSONALITY:
- Be friendly, conversational, and helpful (like ChatGPT)
- Use emojis occasionally
- Ask clarifying questions when needed
- Provide detailed, useful answers
- Support English, Hindi, and Hinglish
- Always be professional and approachable
- If asked about unrelated topics, politely redirect to Yuvan services

RULES:
1. Keep responses concise but informative
2. Always provide the contact number if relevant
3. Never say you're "offline" or "limited" - always be helpful
4. Suggest ways the user can engage further`;

const handleChat = async (req, res) => {
    const { message, history } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    // Get API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY;

    console.log(`Chat Request: "${message}" | API Key: ${apiKey ? 'Found' : 'Missing'}`);

    if (!apiKey || apiKey === 'undefined') {
        console.log("API Key not found. Using intelligent local response engine.");
        const response = generateSmartResponse(message, history);
        return res.json({ response });
    }

    try {
        const client = new OpenAI({ apiKey });

        // Format history for OpenAI
        const messages = [];
        
        // Add conversation history
        if (history && history.length > 0) {
            history.forEach(msg => {
                messages.push({
                    role: msg.role === 'assistant' ? 'assistant' : 'user',
                    content: msg.parts ? msg.parts[0].text : msg.content
                });
            });
        }

        // Add current message
        messages.push({
            role: 'user',
            content: message
        });

        // Call OpenAI API
        const response = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: SYSTEM_PROMPT
                },
                ...messages
            ],
            temperature: 0.7,
            max_tokens: 500,
        });

        const aiResponse = response.choices[0].message.content;
        res.json({ response: aiResponse });

    } catch (error) {
        console.error("OpenAI Chat Error:", error.message);
        // Fallback to smart response on any API error
        const fallbackResponse = generateSmartResponse(message, history);
        res.json({ response: fallbackResponse });
    }
};

module.exports = { handleChat };
