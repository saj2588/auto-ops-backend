import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaSpinner } from 'react-icons/fa';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: '👋 Hi! I\'m Auto-Ops AI assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // API URL - Use the full URL to your backend
  const API_URL = 'http://localhost:5001';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('📤 Sending message to:', `${API_URL}/api/chat`);
      console.log('📤 Message:', input);

      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          history: messages.map(m => ({ role: m.type === 'user' ? 'user' : 'assistant', content: m.text }))
        }),
      });

      console.log('📥 Response status:', response.status);

      const data = await response.json();
      console.log('📥 Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: data.response || 'I\'m sorry, I didn\'t understand that. Could you rephrase?',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('❌ Chat error:', error);
      const fallbackMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: 'Sorry, I\'m having trouble connecting. Please try again later or email saj.javed@yahoo.co.uk',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickReplies = [
    'What services do you offer?',
    'How much does a website cost?',
    'Tell me about AI automation',
    'How do I get started?'
  ];

  return (
    <>
      {/* Chat Button with Label */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="hidden sm:flex items-center gap-2 bg-[#1a1a2e] border border-[#00f5ff]/20 rounded-full px-4 py-2 shadow-lg shadow-[#00f5ff]/10"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f5ff] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f5ff]"></span>
                </span>
                <span className="text-sm text-gray-300 font-medium">Chat with me</span>
                <span className="text-[10px] text-[#00f5ff] font-mono">● AI</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-14 h-14 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#7c3aed] text-black shadow-2xl shadow-[#00f5ff]/30 flex items-center justify-center text-2xl transition-all duration-300 ${
            isOpen ? 'scale-0' : 'scale-100'
          }`}
        >
          <FaRobot />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-[#0a0a0f] flex items-center justify-center">
            <span className="text-[8px] font-bold text-white">1</span>
          </span>
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-[#1a1a2e] rounded-2xl border border-white/10 shadow-2xl shadow-[#00f5ff]/10 flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[rgba(255,255,255,0.03)]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#7c3aed] flex items-center justify-center text-black">
                  <FaRobot className="text-sm" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Auto-Ops AI</div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                    Online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-[#00f5ff] to-[#7c3aed] text-black'
                        : 'bg-[rgba(255,255,255,0.05)] text-gray-200'
                    }`}
                  >
                    {message.type === 'bot' && (
                      <div className="flex items-center gap-1.5 mb-1">
                        <FaRobot className="text-[10px] text-[#00f5ff]" />
                        <span className="text-[10px] text-gray-400 font-medium">Auto-Ops</span>
                      </div>
                    )}
                    <div className="text-sm whitespace-pre-wrap break-words">
                      {message.text}
                    </div>
                    <div className={`text-[10px] mt-1 ${
                      message.type === 'user' ? 'text-black/60' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[rgba(255,255,255,0.05)] rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FaSpinner className="text-[#00f5ff] animate-spin text-sm" />
                      <span className="text-sm text-gray-400">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length < 3 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInput(reply);
                      setTimeout(handleSend, 100);
                    }}
                    className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-gray-300 hover:border-[#00f5ff] hover:text-[#00f5ff] transition-all"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            <div className="p-3 border-t border-white/5 bg-[rgba(255,255,255,0.02)]">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-xl bg-[#0a0a0f]/50 border border-white/5 text-white placeholder-gray-500 focus:border-[#00f5ff] focus:outline-none transition-colors text-sm"
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className={`px-4 py-2 rounded-xl bg-gradient-to-r from-[#00f5ff] to-[#7c3aed] text-black font-semibold transition-all ${
                    isLoading || !input.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-[#00f5ff]/20'
                  }`}
                >
                  {isLoading ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
                </motion.button>
              </div>
              <div className="text-[10px] text-gray-500 mt-1.5 text-center">
                Powered by Azure OpenAI
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
