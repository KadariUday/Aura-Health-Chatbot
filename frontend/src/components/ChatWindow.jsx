import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, User, Bot, AlertTriangle, Loader2, Sparkles, HeartPulse, Activity } from 'lucide-react';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: 'Greetings. I am Aura, an advanced AI health assistant.\nHow can I support your well-being today?\n\n⚠️ **Disclaimer:** I am an AI, not a doctor. Please consult a healthcare professional for serious conditions.',
      entities: null,
      intent: null
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Connect to FastAPI Backend
      const response = await axios.post('http://127.0.0.1:8000/api/chat', {
        message: userMessage,
        session_id: 'user_session_1'
      });

      const { intent, entities, reply } = response.data;

      setMessages(prev => [...prev, {
        role: 'bot',
        content: reply,
        entities: entities,
        intent: intent
      }]);
    } catch (error) {
      console.error('Error communicating with backend:', error);
      setMessages(prev => [...prev, {
        role: 'bot',
        content: 'I am currently unable to connect to the central servers. Please ensure the backend is online.',
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageContent = (content) => {
    return content.split('\n').map((line, i) => {
      if (line.includes('⚠️')) {
        return (
          <div key={i} className="mt-3 text-xs flex items-start text-amber-200/90 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 shadow-inner backdrop-blur-sm">
            <AlertTriangle size={16} className="mr-2 mt-0.5 flex-shrink-0 text-amber-400" />
            <span className="leading-relaxed font-medium">{line.replace('⚠️ **Disclaimer:**', '').replace('⚠️ Disclaimer:', '').trim()}</span>
          </div>
        );
      }
      return <p key={i} className="mb-1.5 leading-relaxed text-[15px] sm:text-base">{line}</p>;
    });
  };

  // Preset suggestions
  const suggestions = [
    { icon: <HeartPulse size={14} />, text: "I've had a headache for 2 days" },
    { icon: <Activity size={14} />, text: "What are the symptoms of flu?" },
    { icon: <Sparkles size={14} />, text: "I need to book an appointment" }
  ];

  return (
    <div className="flex flex-col h-full w-full relative bg-slate-900/40">
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scroll-smooth">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex message-enter ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[90%] sm:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${msg.role === 'user' ? 'bg-gradient-to-br from-indigo-500 to-purple-600 ml-3 border border-indigo-400/30' : 'bg-gradient-to-br from-slate-800 to-slate-900 mr-3 border border-slate-700/50'}`}>
                {msg.role === 'user' ? <User size={20} className="text-white" /> : <Bot size={22} className="text-blue-400" />}
              </div>

              {/* Message Bubble */}
              <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-5 py-4 shadow-xl backdrop-blur-md ${msg.role === 'user' 
                  ? 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded-2xl rounded-tr-sm border border-indigo-500/30' 
                  : 'bg-slate-800/80 text-slate-200 border border-slate-700/50 rounded-2xl rounded-tl-sm'}`}>
                  
                  {renderMessageContent(msg.content)}
                  
                  {/* NLP Metadata (Debug Info) */}
                  {msg.role === 'bot' && msg.intent && (
                    <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] text-slate-400 font-mono flex flex-col gap-2">
                      <div className="flex items-center gap-1.5">
                        <Sparkles size={12} className="text-indigo-400" />
                        <span className="font-semibold text-slate-300">Intent Detected:</span> 
                        <span className="bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-700/50 text-indigo-300">{msg.intent}</span>
                      </div>
                      
                      {msg.entities && msg.entities.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {msg.entities.map((e, i) => (
                            <span key={i} className="bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-1 rounded-md flex items-center gap-1">
                              <span className="font-semibold text-white">{e.text}</span>
                              <span className="text-[9px] uppercase tracking-wider opacity-70">({e.label})</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start message-enter">
            <div className="flex flex-row max-w-[80%]">
              <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 mr-3 flex items-center justify-center shadow-lg">
                <Bot size={22} className="text-blue-400" />
              </div>
              <div className="px-5 py-4 bg-slate-800/80 border border-slate-700/50 rounded-2xl rounded-tl-sm shadow-xl backdrop-blur-md flex items-center space-x-3">
                <Loader2 size={18} className="animate-spin text-blue-400" />
                <span className="text-sm font-medium text-slate-300">Aura is analyzing...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      {messages.length === 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2 justify-center sm:justify-start message-enter" style={{ animationDelay: '0.2s' }}>
          {suggestions.map((s, i) => (
            <button 
              key={i}
              onClick={() => setInput(s.text)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 text-slate-300 text-xs hover:bg-indigo-500/20 hover:text-indigo-300 hover:border-indigo-500/30 transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              {s.icon}
              {s.text}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 sm:p-6 bg-slate-900/50 border-t border-slate-700/50 backdrop-blur-xl relative z-20">
        <form onSubmit={handleSend} className="relative flex items-center max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your symptoms or ask a medical question..."
            className="w-full pl-6 pr-14 py-4 bg-slate-800/80 border border-slate-600/50 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 text-slate-100 placeholder-slate-400 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.2)] text-[15px] backdrop-blur-md"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:shadow-[0_0_15px_rgba(79,70,229,0.5)] disabled:opacity-40 disabled:hover:shadow-none disabled:cursor-not-allowed transition-all duration-300 transform active:scale-95"
          >
            <Send size={20} className="ml-0.5" />
          </button>
        </form>
        <div className="text-center mt-3">
          <span className="text-[10px] text-slate-500 font-medium tracking-wide">AURA HEALTH AI SECURE ENCLAVE</span>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
