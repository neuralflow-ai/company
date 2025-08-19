const { default: makeWASocket, DisconnectReason, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Persistent memory system to store conversation history and conversation state
const conversationMemory = new Map();
const conversationState = new Map();
const authorizedUsers = new Map(); // Track users who came from website

// Load persistent memory from file
function loadMemory() {
    try {
        if (fs.existsSync('memory.json')) {
            const data = JSON.parse(fs.readFileSync('memory.json', 'utf8'));
            if (data.conversationMemory) {
                Object.entries(data.conversationMemory).forEach(([key, value]) => {
                    conversationMemory.set(key, value);
                });
            }
            if (data.conversationState) {
                Object.entries(data.conversationState).forEach(([key, value]) => {
                    conversationState.set(key, value);
                });
            }
            if (data.authorizedUsers) {
                Object.entries(data.authorizedUsers).forEach(([key, value]) => {
                    authorizedUsers.set(key, value);
                });
            }
            console.log('📚 Memory loaded successfully');
        }
    } catch (error) {
        console.error('❌ Error loading memory:', error);
    }
}

// Save persistent memory to file
function saveMemory() {
    try {
        const data = {
            conversationMemory: Object.fromEntries(conversationMemory),
            conversationState: Object.fromEntries(conversationState),
            authorizedUsers: Object.fromEntries(authorizedUsers)
        };
        fs.writeFileSync('memory.json', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('❌ Error saving memory:', error);
    }
}

// Save memory every 30 seconds
setInterval(saveMemory, 30000);

// Load memory on startup
loadMemory();

// Simple function to check if user is authorized (came from website)
function isAuthorizedUser(userId) {
    // Check if user is in authorized list or if it's their first message with website reference
    return authorizedUsers.has(userId);
}

// Function to authorize user (when they come from website)
function authorizeUser(userId, source = 'website') {
    authorizedUsers.set(userId, {
        source: source,
        authorizedAt: new Date().toISOString(),
        active: true
    });
    saveMemory();
    console.log(`✅ User ${userId} authorized from ${source}`);
}

// Function to check if message indicates user came from website
function checkWebsiteReference(message) {
    const lowerMessage = message.toLowerCase();
    const websiteIndicators = [
        'neuralflow', 'neural flow', 'website', 'your site', 'your website',
        'hello@neuralflow.cloud', 'saw your', 'found you', 'from your'
    ];
    
    return websiteIndicators.some(indicator => 
        lowerMessage.includes(indicator)
    );
}

// Simple function to determine if bot should respond
function shouldRespond(message, userId) {
    // Auto-authorize if message references website/company
    if (checkWebsiteReference(message)) {
        authorizeUser(userId, 'website_reference');
        return true;
    }
    
    // Respond to authorized users
    if (isAuthorizedUser(userId)) {
        return true;
    }
    
    // For new users, authorize them if they send any message (assuming they came from website)
    // This is the tracing logic - we assume anyone messaging is from the website
    if (!authorizedUsers.has(userId)) {
        authorizeUser(userId, 'first_contact');
        return true;
    }
    
    return false;
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI('AIzaSyCt9NhqRxvbZEHAKDg5wosdCY7i38qxWk8');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Company knowledge base for AI context
const companyContext = `
You are a friendly, conversational customer service representative for NeuralFlow, an AI automation company. Respond naturally like a human would, as if you're texting a friend.

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
- Be conversational and natural, like texting a friend
- Keep responses short (under 100 words) and to the point
- Don't sound robotic or use corporate language
- Only greet ONCE at the start, never repeat greetings
- ALWAYS mention the FREE FIRST ORDER offer when discussing services
- Use casual language and minimal emojis
- NEVER mention contact details (they're already on WhatsApp)
- Never mention that you're an AI - respond as a human representative
- Don't ask multiple follow-up questions - be direct
- After service info, ask: "Want to proceed? Just confirm and our team will contact you soon."
- After confirmation: "Perfect! Our team will contact you soon to get started." Then STOP responding
- Never repeat the same information - vary your responses
- Ask follow-up questions to keep conversation flowing naturally
- Once a service is confirmed, DO NOT respond to any further messages from that user
`;

// AI-powered response generator using Gemini
async function generateResponse(message, userId) {
    // Initialize conversation history and state if it doesn't exist
    if (!conversationMemory.has(userId)) {
        conversationMemory.set(userId, []);
        conversationState.set(userId, { greeting_sent: false, service_discussed: false, confirmed: false, ended: false });
    }
    
    // Check if conversation has ended (user already confirmed a service)
    const userState = conversationState.get(userId);
    if (userState.ended) {
        return null; // Don't respond to users who have already confirmed
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
        
        // Check if user is confirming a service
        const confirmationKeywords = ['yes', 'confirm', 'proceed', 'ok', 'okay', 'sure', 'go ahead', 'let\'s do it', 'i want', 'book', 'order'];
        const isConfirming = confirmationKeywords.some(keyword => message.toLowerCase().includes(keyword));
        
        if (isConfirming && userState.service_discussed) {
            userState.confirmed = true;
            userState.ended = true;
            conversationState.set(userId, userState);
            return "Perfect! Our team will contact you soon to discuss the details and get started. 🚀";
        }
        
        let prompt = `${companyContext}\n\n${conversationContext}\n\nCurrent User Message: "${message}"\n\nConversation State: greeting_sent=${userState.greeting_sent}, service_discussed=${userState.service_discussed}\n\n`;
        
        // Add specific context based on conversation state
        if (!userState.greeting_sent) {
            prompt += "This is the first message. Greet them naturally and ask how you can help.";
        } else if (userState.service_discussed && !userState.confirmed) {
            prompt += "You've discussed a service. Ask for confirmation to proceed.";
        } else {
            prompt += "Continue the conversation naturally. Be helpful and conversational.";
        }
        
        prompt += "\n\nRespond naturally like a human texting, not like a bot. Keep it short and friendly. NEVER repeat information already discussed. Remember to reference previous messages when appropriate:";
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Add assistant response to conversation history
        conversationHistory.push({ role: 'assistant', content: text.trim() });
        
        // Update conversation state
        if (!userState.greeting_sent && (text.includes('Hi') || text.includes('Hello') || text.includes('👋'))) {
            userState.greeting_sent = true;
        }
        if (text.includes('$') || text.includes('pricing') || text.includes('Starting from')) {
            userState.service_discussed = true;
        }
        conversationState.set(userId, userState);
        
        // Clean up the response and ensure it's appropriate
        return text.trim();
        
    } catch (error) {
        console.error('Gemini AI error:', error);
        
        // More human-like fallback responses based on conversation state
        if (!userState.greeting_sent) {
            userState.greeting_sent = true;
            conversationState.set(userId, userState);
            return `Hi there! 👋 I'm here to help you with NeuralFlow's services. What can I assist you with today?`;
        }
        
        // Check if user is asking about specific services
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('trading') || lowerMessage.includes('bot')) {
            userState.service_discussed = true;
            conversationState.set(userId, userState);
            return `Great choice! Our trading bots are quite popular. 📈\n\nWe create custom automated trading systems that can:\n• Execute trades 24/7\n• Follow your specific strategies\n• Risk management included\n\n🎉 Your FIRST ORDER is completely FREE!\n\nWould you like to proceed with this service? Please confirm and our team will contact you soon.`;
        }
        
        if (lowerMessage.includes('chatbot') || lowerMessage.includes('ai')) {
            userState.service_discussed = true;
            conversationState.set(userId, userState);
            return `Perfect! AI chatbots are one of our specialties. 🤖\n\nWe build intelligent chatbots that can:\n• Handle customer inquiries 24/7\n• Integrate with your website/apps\n• Learn from conversations\n\n🎉 Your FIRST ORDER is completely FREE!\n\nWould you like to proceed with this service? Please confirm and our team will contact you soon.`;
        }
        
        // Generic but conversational fallback
        return `I'd be happy to help you! We specialize in:\n\n🤖 AI Chatbots\n⚡ AI Automation\n🎤 Voice AI Agents\n📈 Trading Bots\n\n🎉 FIRST ORDER FREE!\n\nWhich service interests you most?`;
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
            
            // Check if bot should respond to this user
            if (shouldRespond(messageText, message.key.remoteJid)) {
                console.log(`✅ Responding to authorized user ${message.key.remoteJid}`);
                
                // Pass the user ID (remoteJid) to maintain separate conversation histories
                const response = await generateResponse(messageText, message.key.remoteJid);
                
                // Only send response if not null (conversation hasn't ended)
                if (response) {
                    await sock.sendMessage(message.key.remoteJid, { text: response });
                    console.log(`🤖 Sent to ${message.key.remoteJid}: ${response.substring(0, 50)}...`);
                } else {
                    console.log(`🔇 No response sent - conversation ended for ${message.key.remoteJid}`);
                }
            } else {
                console.log(`❌ Unauthorized user ignored: ${message.key.remoteJid}`);
            }
        }
    });
}

// Save memory on exit
process.on('SIGINT', () => {
    console.log('\n💾 Saving memory before exit...');
    saveMemory();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n💾 Saving memory before exit...');
    saveMemory();
    process.exit(0);
});

console.log('🚀 Starting WhatsApp Bot...');
console.log('📱 Make sure WhatsApp Web is not open in any browser');
console.log('⚡ Bot will respond to users who contact from your website');
console.log('🧠 Persistent memory enabled - conversations will be remembered');

startBot().catch(console.error);