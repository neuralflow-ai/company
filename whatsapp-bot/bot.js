const { default: makeWASocket, DisconnectReason, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Memory system to store conversation history
const conversationMemory = new Map();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI('AIzaSyCt9NhqRxvbZEHAKDg5wosdCY7i38qxWk8');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Company knowledge base for AI context
const companyContext = `
You are a helpful WhatsApp assistant for NeuralFlow, a technology company. You should respond in a friendly, professional, and human-like manner.

COMPANY INFORMATION:
- Company: NeuralFlow - AI Automation Agency
- Email: hello@neuralflow.cloud
- WhatsApp: +92 310 5163094

🎉 SPECIAL OFFER:
✅ FIRST ORDER COMPLETELY FREE! (Value: $2,000 - $5,000)
• No hidden costs
• Full implementation included
• 30-day support included
• One free order per customer
• Limited time offer

MAIN SERVICES (Our Specialty):
🤖 AI Chatbots - Intelligent customer service automation (Starting from $2,500/month)
⚡ AI Automation - Process optimization & workflow automation (Starting from $3,500/month)
🎤 Voice AI Agents - Conversational voice assistants (Starting from $6,000/month)
📈 Trading Bots - Automated trading systems (Custom pricing)
🧠 Agentic AI Systems - Autonomous decision-making AI (Starting from $12,000/month)
🔄 Hyperautomation - End-to-end business automation (Starting from $7,500/month)

ADDITIONAL SERVICES (Available on request):
💻 Web Development - AI-powered websites and applications (Starting from $1,000)
📱 Mobile Apps - AI-integrated mobile applications (Starting from $4,000)
💡 AI Consulting - Strategy and implementation ($150/hour)

PROJECT TIMELINES:
- AI Bots/Chatbots: 1-3 weeks
- AI Agents: 2-6 weeks
- AI Automation: 3-8 weeks
- AI/ML Solutions: 4-12 weeks
- Web Development: 2-8 weeks (when requested)
- Mobile Apps: 6-16 weeks (when requested)

IMPORTANT GUIDELINES:
- Keep responses SHORT and concise (maximum 2-3 sentences)
- Only say "Hi there!" or greetings ONCE at the start of conversation, never repeat greetings
- ALWAYS mention the FREE FIRST ORDER offer when discussing services or pricing
- Use emojis and bullet points for better formatting and readability
- When listing services, use bullet points (•) and relevant emojis
- NEVER mention website, phone numbers, or other contact methods since user is already on WhatsApp
- Focus on answering the specific question asked
- Never mention that you're an AI - respond as a human representative
- When user clearly states what service they want, DON'T ask multiple follow-up questions
- After providing service information and pricing, ask for confirmation: "Would you like to proceed with this service? Please confirm and our team will contact you soon to discuss the details and get started on your project."
- Only after user confirms, say "Perfect! Our team will contact you soon to discuss the details and get started on your project."
- Avoid being overly inquisitive - be helpful but direct
- This WhatsApp chat IS the final destination for information
- Format responses in an attractive, easy-to-read way with proper spacing
`;

// AI-powered response generator using Gemini
async function generateResponse(message, userId) {
    // Initialize conversation history if it doesn't exist
    if (!conversationMemory.has(userId)) {
        conversationMemory.set(userId, []);
    }
    
    // Get conversation history
    const conversationHistory = conversationMemory.get(userId);
    
    // Add user message to history
    conversationHistory.push({ role: 'user', content: message });
    
    // Keep only the last 10 messages to avoid context getting too large
    while (conversationHistory.length > 10) {
        conversationHistory.shift();
    }
    try {
        // Build conversation context from history
        let conversationContext = "Previous conversation:\n";
        conversationHistory.forEach(msg => {
            conversationContext += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
        });
        
        const prompt = `${companyContext}\n\n${conversationContext}\n\nCurrent User Message: "${message}"\n\nPlease respond as a helpful NeuralFlow representative. Keep the response conversational, helpful, and under 200 words. Remember to reference previous messages when appropriate to maintain conversation continuity:`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Add assistant response to conversation history
        conversationHistory.push({ role: 'assistant', content: text.trim() });
        
        // Clean up the response and ensure it's appropriate
        return text.trim();
        
    } catch (error) {
        console.error('Gemini AI error:', error);
        
        // Fallback response if AI fails
        return `Hello! 👋 Thanks for reaching out to NeuralFlow. I'm here to help you with information about our services:\n\n🔹 Web Development\n🔹 Mobile App Development\n🔹 UI/UX Design\n🔹 Digital Marketing\n🔹 AI/ML Solutions\n\nHow can I assist you today? You can also reach us directly at hello@neuralflow.cloud or +92 310 5163094.`;
    }
}

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    
    const sock = makeWASocket({
        auth: state,
        logger: {
            level: 'silent',
            child: () => ({
                level: 'silent',
                trace: () => {},
                debug: () => {},
                info: () => {},
                warn: () => {},
                error: () => {},
                fatal: () => {}
            }),
            trace: () => {},
            debug: () => {},
            info: () => {},
            warn: () => {},
            error: () => {},
            fatal: () => {}
        }
    });
    
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            console.log('\n🔗 Scan this QR code with your WhatsApp to connect:');
            qrcode.generate(qr, { small: true });
        }
        
        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Connection closed due to', lastDisconnect?.error, ', reconnecting', shouldReconnect);
            
            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === 'open') {
            console.log('✅ WhatsApp Bot Connected Successfully!');
            console.log('🤖 Bot is now ready to respond to messages!');
        }
    });
    
    sock.ev.on('creds.update', saveCreds);
    
    sock.ev.on('messages.upsert', async (m) => {
        const message = m.messages[0];
        
        if (!message.message || message.key.fromMe) return;
        
        const messageText = message.message.conversation || 
                           message.message.extendedTextMessage?.text || '';
        
        if (messageText) {
            console.log(`📨 Received from ${message.key.remoteJid}: ${messageText}`);
            
            // Pass the user ID (remoteJid) to maintain separate conversation histories
            const response = await generateResponse(messageText, message.key.remoteJid);
            
            await sock.sendMessage(message.key.remoteJid, { text: response });
            console.log(`🤖 Sent to ${message.key.remoteJid}: ${response.substring(0, 50)}...`);
        }
    });
}

console.log('🚀 Starting WhatsApp Bot...');
console.log('📱 Make sure WhatsApp Web is not open in any browser');
console.log('⚡ This bot will automatically respond to messages about your services');

startBot().catch(console.error);