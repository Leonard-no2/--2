import React, { useState, useRef, useEffect } from 'react';
import { ProcessType, ChatMessage } from '../types';
import { askGeminiAboutProcess } from '../services/geminiService';
import { Bot, Send, User, Loader2, Sparkles } from 'lucide-react';

interface AIAssistantProps {
  currentProcess: ProcessType;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ currentProcess }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '你好！我是您的智能工艺助手。关于当前的污泥处理工艺，您有什么想了解的吗？比如“热解的成本优势”或“传统焚烧的环境风险”。' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const responseText = await askGeminiAboutProcess(userMsg, currentProcess);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-yellow-300" />
          <h3 className="font-bold">AI 工艺顾问</h3>
        </div>
        <span className="text-xs bg-white/20 px-2 py-0.5 rounded text-white/90">Gemini 2.5 Flash</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
              ${msg.role === 'model' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-600'}
            `}>
              {msg.role === 'model' ? <Bot size={18} /> : <User size={18} />}
            </div>
            <div className={`
              max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed
              ${msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
              }
            `}>
              {msg.text.split('\n').map((line, i) => (
                <p key={i} className="mb-1 last:mb-0">{line}</p>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <Bot size={18} />
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2 text-slate-500 text-sm">
              <Loader2 size={16} className="animate-spin" />
              <span>思考中... (Generating analysis)</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 bg-white border-t border-slate-200">
        <div className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入问题..."
            className="flex-1 bg-slate-100 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white p-2 rounded-lg transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-2">
          AI generated content may be inaccurate. Check important info.
        </p>
      </div>
    </div>
  );
};