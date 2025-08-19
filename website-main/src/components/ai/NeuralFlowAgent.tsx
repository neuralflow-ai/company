import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, X, Minimize2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface NeuralFlowAgentProps {
  isOpen: boolean;
  onClose: () => void;
}

const NeuralFlowAgent = ({ isOpen, onClose }: NeuralFlowAgentProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m Neural Flow AI Assistant. I can help you with our AI automation services, pricing, and implementation. How can I assist you?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getGeminiResponse = async (userMessage: string): Promise<string> => {
    try {
      const genAI = new GoogleGenerativeAI('AIzaSyCt9NhqRxvbZEHAKDg5wosdCY7i38qxWk8');
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const context = `You are Neural Flow AI Assistant. Keep responses to 2-4 lines maximum. Neural Flow specializes in AI automation: chatbots, process automation, data analytics, custom AI solutions. We serve Real Estate, Manufacturing, E-commerce, Healthcare, Education, Finance, Automotive, Logistics. Pricing: $5,000-$50,000+. Implementation: 2-8 weeks. Contact: hello@neuralflow.cloud, WhatsApp: +92 310 5163094.`;

      const prompt = `${context}\n\nUser: ${userMessage}\n\nRespond in 2-4 lines maximum:`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      return 'I apologize, but I\'m having trouble connecting right now. Please contact us directly at hello@neuralflow.cloud or WhatsApp +92 310 5163094 for immediate assistance.';
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const aiResponseText = await getGeminiResponse(inputMessage);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I encountered an error. Please contact our support team directly at hello@neuralflow.cloud or WhatsApp +92 310 5163094.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
      <Card className="w-96 h-[600px] flex flex-col bg-dark-purple/95 border-accent-blue/20 backdrop-blur-lg pointer-events-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-accent-blue/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-blue/20 rounded-full">
              <Bot className="h-5 w-5 text-accent-blue" />
            </div>
            <div>
              <h3 className="font-bold text-white">Neural Flow AI</h3>
              <p className="text-sm text-foreground/60">Powered by Gemini</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-foreground/60 hover:text-white">
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-foreground/60 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!message.isUser && (
                  <div className="p-2 bg-accent-blue/20 rounded-full h-fit">
                    <Bot className="h-4 w-4 text-accent-blue" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-accent-blue text-black'
                      : 'bg-dark-purple/50 border border-accent-blue/20 text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.isUser ? 'text-black/60' : 'text-foreground/40'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.isUser && (
                  <div className="p-2 bg-accent-pink/20 rounded-full h-fit">
                    <User className="h-4 w-4 text-accent-pink" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="p-2 bg-accent-blue/20 rounded-full h-fit">
                  <Bot className="h-4 w-4 text-accent-blue" />
                </div>
                <div className="bg-dark-purple/50 border border-accent-blue/20 p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-accent-blue rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-accent-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-accent-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-accent-blue/20">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about Neural Flow..."
              className="bg-dark-purple/50 border-accent-blue/20 focus:border-accent-blue text-white"
            />
            <Button 
              onClick={handleSendMessage}
              size="icon"
              className="bg-accent-blue hover:bg-accent-blue/90 text-black"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NeuralFlowAgent;
