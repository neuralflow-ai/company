# WhatsApp AI Business Bot 🤖

An **AI-powered WhatsApp bot** using **Google Gemini AI** that provides intelligent, human-like responses to customer inquiries about your business services, pricing, and contact information.

## Features ✨

- **AI-Powered Responses**: Uses Google Gemini AI for intelligent, context-aware responses
- **Human-like Conversations**: No more robotic responses - fully conversational AI
- **Smart Understanding**: Understands customer intent and provides personalized answers
- **Service Information**: Detailed information about web development, mobile apps, UI/UX design, etc.
- **Dynamic Pricing**: AI-generated pricing information based on customer requirements
- **Contact Sharing**: Intelligent contact information sharing
- **24/7 AI Availability**: Runs continuously with smart AI responses
- **Easy Setup**: Simple installation with powerful AI capabilities
- **No API Costs**: Uses existing Gemini API key for intelligent responses

## Services Covered 🛠️

The bot can provide information about:
- Web Development
- Mobile App Development
- UI/UX Design
- Digital Marketing
- AI/ML Solutions
- Cloud Services
- Technology Consulting

## Setup Instructions 📋

### Prerequisites
- Node.js installed on your computer
- A WhatsApp account (personal or business)
- Make sure WhatsApp Web is NOT open in any browser

### Installation

1. **Navigate to the bot directory**:
   ```bash
   cd whatsapp-bot
   ```

2. **Install dependencies** (already done):
   ```bash
   npm install
   ```

3. **Start the bot**:
   ```bash
   node bot.js
   ```

4. **Scan QR Code**:
   - A QR code will appear in your terminal
   - Open WhatsApp on your phone
   - Go to Settings > Linked Devices
   - Tap "Link a Device"
   - Scan the QR code from your terminal

5. **Bot is Ready!** ✅
   - The bot will show "WhatsApp Bot Connected Successfully!"
   - It will now automatically respond to messages

## How It Works 🔄

1. **Customer sends message** → Bot receives it
2. **AI analyzes message** → Determines intent (pricing, services, contact, etc.)
3. **Bot responds instantly** → Sends relevant information
4. **Conversation continues** → Bot can handle follow-up questions

## Example Conversations 💬

**Customer**: "Hi, what services do you offer?"
**Bot**: "Hello! 👋 Welcome to NeuralFlow! Here are our main services:
1. Web Development - Custom websites and web applications
2. Mobile App Development - iOS and Android applications
..."

**Customer**: "How much for a website?"
**Bot**: "🌐 Web Development Services:
✅ Custom Website Development
✅ E-commerce Platforms
💰 Pricing: Starting from $500 for basic websites..."

## Customization 🎨

To customize the bot for your business:

1. **Edit Service Information**:
   - Open `bot.js`
   - Modify the `serviceKnowledge` object
   - Update services, pricing, and contact information

2. **Add New Response Patterns**:
   - Add new conditions in the `generateResponse()` function
   - Create responses for specific keywords or phrases

3. **Update Contact Details**:
   ```javascript
   contact: {
       email: "your-email@domain.com",
       whatsapp: "+your-phone-number",
       website: "https://your-website.com"
   }
   ```

## Important Notes ⚠️

- **AI Integration**: Bot now uses Google Gemini AI for intelligent, human-like responses
- **Smart Responses**: Each response is generated based on context, no more repetitive answers
- **WhatsApp Terms**: Make sure to comply with WhatsApp's Terms of Service
- **Account Safety**: Use a business WhatsApp account if possible
- **Rate Limits**: Don't spam messages to avoid account restrictions
- **AI Costs**: Uses existing Gemini API key - monitor usage if needed
- **Backup**: Keep your `auth_info_baileys` folder safe (contains login session)

## Troubleshooting 🔧

### QR Code Not Appearing
- Make sure WhatsApp Web is closed in all browsers
- Restart the bot with `node bot.js`

### Connection Issues
- Check your internet connection
- Make sure WhatsApp is working on your phone
- Try restarting the bot

### Bot Not Responding
- Check the terminal for error messages
- Ensure the bot is still running
- Verify WhatsApp connection status

## Running the Bot 24/7 🌙

To keep the bot running continuously:

### Option 1: Using PM2 (Recommended)
```bash
npm install -g pm2
pm2 start bot.js --name "whatsapp-bot"
pm2 startup
pm2 save
```

### Option 2: Using Screen (Linux/Mac)
```bash
screen -S whatsapp-bot
node bot.js
# Press Ctrl+A then D to detach
```

### Option 3: Using nohup (Linux/Mac)
```bash
nohup node bot.js > bot.log 2>&1 &
```

## Security Best Practices 🔒

1. **Keep auth files secure**: Don't share the `auth_info_baileys` folder
2. **Use environment variables**: Store sensitive data in `.env` files
3. **Regular updates**: Keep dependencies updated
4. **Monitor logs**: Check for unusual activity

## Support 💬

If you need help with the bot:
- Check the troubleshooting section
- Review the terminal logs for errors
- Contact: hello@neuralflow.cloud
- WhatsApp: +92 310 5163094

## License 📄

This project is for educational and business use. Make sure to comply with WhatsApp's Terms of Service.

---

**Happy Automating! 🚀**

Your WhatsApp bot is now ready to handle customer inquiries 24/7, providing instant responses about your services, pricing, and contact information!