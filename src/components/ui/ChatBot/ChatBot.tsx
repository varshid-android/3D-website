import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Bot,
  Send,
  X,
  RotateCcw,
  FileText,
  ExternalLink,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { sendChatMessage, ChatMessage } from '../../../services/chatService';
import { ChatMarkdown } from './ChatMarkdown';
import { PERSONAL_INFO } from '../../../data/portfolioData';

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: `Hi there! 👋 I'm **Varshid's AI Assistant**, powered by **RAG** (Retrieval-Augmented Generation) and grounded directly in his verified resume, engineering history, and flagship projects.\n\nAsk me anything about his **6+ years in React Native**, AI systems (FastAPI, RAG, MCP), published NPM libraries, or contract availability!`,
  timestamp: Date.now(),
  suggestedQuestions: [
    'What are Varshid’s core technical skills?',
    'Tell me about the Invitem project',
    'What awards and honors has he won?',
    'How can I contact or hire him?',
  ],
};

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLauncherTooltip, setShowLauncherTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const chatWindowRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  // Prevent background scroll when interacting with chat & isolate wheel scroll
  useEffect(() => {
    if (!isOpen) return;

    // Auto-focus input and scroll to bottom
    scrollToBottom('auto');
    const focusTimer = setTimeout(() => {
      inputRef.current?.focus();
    }, 250);

    // On mobile / tablet screens, lock background scroll completely
    const isMobile = window.innerWidth < 768;
    const originalOverflow = document.body.style.overflow;
    if (isMobile) {
      document.body.style.overflow = 'hidden';
    }

    // Isolate desktop wheel events so mouse wheel inside chat NEVER scrolls background page
    const chatEl = chatWindowRef.current;
    const scrollEl = messagesContainerRef.current;

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();

      if (scrollEl) {
        // Apply scroll delta directly to message container
        scrollEl.scrollTop += e.deltaY;
      }

      // Prevent wheel from propagating to window/Lenis and scrolling the page behind
      e.preventDefault();
    };

    if (chatEl) {
      chatEl.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      clearTimeout(focusTimer);
      if (isMobile) {
        document.body.style.overflow = originalOverflow;
      }
      if (chatEl) {
        chatEl.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (messages.length > 1) {
      scrollToBottom('smooth');
    }
  }, [messages, isLoading]);

  // Gentle launcher tooltip appearance after 3.5s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted && !isOpen) {
        setShowLauncherTooltip(true);
      }
    }, 3500);

    const dismissTimer = setTimeout(() => {
      setShowLauncherTooltip(false);
    }, 9500);

    return () => {
      clearTimeout(timer);
      clearTimeout(dismissTimer);
    };
  }, [hasInteracted, isOpen]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setHasInteracted(true);
    setShowLauncherTooltip(false);
  };

  const handleResetChat = () => {
    setMessages([
      {
        ...INITIAL_MESSAGE,
        timestamp: Date.now(),
      },
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    setInputValue('');
    setHasInteracted(true);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(query, messages);
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        timestamp: Date.now(),
        sources: response.sources,
        suggestedQuestions: response.suggestedQuestions,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `I ran into an issue connecting to the AI brain. However, you can reach Varshid directly on WhatsApp at **+91 80008 49533** or view his resume at [/Varshid_Shekhat_Resume.pdf](/Varshid_Shekhat_Resume.pdf).`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCitationClick = (link?: string) => {
    if (!link) return;
    if (link.startsWith('#')) {
      // Close on mobile to view section smoothly
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
      const el = document.getElementById(link.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(link, '_blank');
    }
  };

  return (
    <>
      {/* --- MOBILE BACKDROP OVERLAY (Closes chat on outside tap & prevents background touches) --- */}
      {isOpen && (
        <div
          data-lenis-prevent="true"
          onClick={() => setIsOpen(false)}
          onTouchMove={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-45 sm:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* --- FLOATING LAUNCHER TRIGGER (Stacked cleanly above WhatsApp on all devices) --- */}
      <div
        className={`fixed bottom-[88px] right-5 sm:bottom-[104px] sm:right-7 z-40 flex items-center gap-3 transition-all duration-500 ${
          isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        {/* Hover / Auto Greeting Tooltip */}
        <div
          onClick={handleOpenChat}
          className={`cursor-pointer hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full apple-glass-sheet border border-[#ee4405]/30 text-xs text-white shadow-2xl transition-all duration-300 select-none ${
            showLauncherTooltip
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#ee4405] animate-pulse" />
          <span className="font-medium">
            Ask <span className="text-[#ee4405] font-semibold">AI Assistant</span> (RAG)
          </span>
        </div>

        {/* Floating Action AI Button */}
        <button
          onClick={handleOpenChat}
          onMouseEnter={() => setShowLauncherTooltip(true)}
          onMouseLeave={() => setShowLauncherTooltip(false)}
          aria-label="Open Varshid AI Chatbot"
          className="group relative flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-gradient-to-tr from-[#9c2f06] via-[#ee4405] to-[#ff6b38] text-white shadow-xl shadow-[#ee4405]/30 hover:shadow-2xl hover:shadow-[#ee4405]/50 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ee4405] focus:ring-offset-2 focus:ring-offset-black cursor-pointer"
        >
          {/* Subtle breathing ping pulse */}
          <span className="absolute inset-0 rounded-full bg-[#ee4405] opacity-25 animate-ping pointer-events-none" />

          {/* AI Sparkles & Bot Icons */}
          <Bot className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-md transition-transform duration-300 group-hover:scale-105" />

          {/* Mini Sparkle Accent Badge */}
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0B0F17] border border-[#ee4405]">
            <Sparkles className="w-3 h-3 text-[#ff7847]" />
          </span>

          {/* Online Status Badge Dot */}
          <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border-2 border-black" />
          </span>
        </button>
      </div>

      {/* --- CHAT DIALOG WINDOW --- */}
      <div
        ref={chatWindowRef}
        data-lenis-prevent="true"
        onTouchMove={(e) => e.stopPropagation()}
        style={{ overscrollBehavior: 'contain' }}
        className={`fixed z-50 flex flex-col overflow-hidden backdrop-blur-2xl transition-all duration-300 origin-bottom-right apple-glass-sheet border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]
          /* Mobile full-width bottom sheet (responsive to mobile viewport) */
          inset-x-3 bottom-3 sm:inset-x-auto sm:bottom-6 sm:right-6
          /* Dimensions across all screens */
          w-[calc(100vw-1.5rem)] sm:w-[420px] sm:max-w-[420px]
          h-[560px] max-h-[88dvh] sm:h-[600px] sm:max-h-[85vh]
          rounded-3xl
          ${
            isOpen
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 scale-95 translate-y-8 pointer-events-none'
          }`}
      >
        {/* Mobile Drag Indicator Bar (visible on small mobile screens) */}
        <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mt-2 -mb-1 sm:hidden select-none" />

        {/* --- HEADER --- */}
        <div className="relative px-3.5 sm:px-4 py-3 sm:py-3.5 border-b border-white/10 bg-slate-900/60 backdrop-blur-md flex items-center justify-between select-none">
          {/* Ambient header glow */}
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#ee4405] to-transparent opacity-70" />

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#9c2f06] to-[#ee4405] text-white font-bold text-sm shadow-md shadow-[#ee4405]/30 shrink-0">
              <Bot className="w-5 h-5 text-white" />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-slate-900" />
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="text-xs sm:text-sm font-semibold text-white tracking-wide truncate">
                  Varshid AI Assistant
                </h3>
                <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#ee4405]/20 text-[#ff7847] border border-[#ee4405]/30 font-medium">
                  RAG
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1 truncate">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                Online • Grounded in Resume & Work
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleResetChat}
              title="Reset conversation"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              title="Close chat"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- MESSAGE HISTORY CONTAINER (With Lenis prevention & independent touch/wheel scrolling) --- */}
        <div
          ref={messagesContainerRef}
          data-lenis-prevent="true"
          style={{
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
          }}
          className="flex-1 overflow-y-auto overscroll-contain p-3.5 sm:p-4 space-y-3.5 sm:space-y-4 scroll-smooth"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              {/* Message Bubble */}
              <div
                className={`max-w-[90%] sm:max-w-[88%] rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-md ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-[#9c2f06] to-[#ee4405] text-white rounded-br-sm'
                    : 'apple-glass-pill bg-slate-900/80 border border-white/10 rounded-bl-sm text-slate-200'
                }`}
              >
                {msg.role === 'user' ? (
                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <ChatMarkdown content={msg.content} />
                )}
              </div>

              {/* RAG Sources Citations (if provided by assistant) */}
              {msg.role === 'assistant' && msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 flex flex-wrap items-center gap-1.5 max-w-[95%] pl-1">
                  <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-wider font-mono mr-1">
                    Sources:
                  </span>
                  {msg.sources.map((s, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleCitationClick(s.link)}
                      className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <span className="truncate max-w-[150px] sm:max-w-none">{s.linkLabel || s.source}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-[#ff7847] shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {/* Suggested Questions Pills */}
              {msg.role === 'assistant' &&
                msg.suggestedQuestions &&
                msg.suggestedQuestions.length > 0 && (
                  <div className="mt-2.5 sm:mt-3 flex flex-wrap gap-1.5 max-w-[98%] pl-1">
                    {msg.suggestedQuestions.map((q, qIdx) => (
                      <button
                        key={qIdx}
                        disabled={isLoading}
                        onClick={() => handleSendMessage(q)}
                        className="text-left text-[11px] sm:text-xs px-2.5 py-1.5 rounded-full bg-slate-800/80 hover:bg-[#ee4405]/20 border border-slate-700 hover:border-[#ee4405]/40 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50 cursor-pointer"
                      >
                        <Sparkles className="w-2.5 h-2.5 text-[#ff7847] shrink-0" />
                        <span>{q}</span>
                      </button>
                    ))}
                  </div>
                )}
            </div>
          ))}

          {/* Thinking / Loading indicator */}
          {isLoading && (
            <div className="flex items-start gap-2 max-w-[85%]">
              <div className="apple-glass-pill bg-slate-900/80 border border-white/10 rounded-2xl rounded-bl-sm px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ee4405] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-[#ee4405] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-[#ee4405] animate-bounce" />
                </div>
                <span className="text-[11px] sm:text-xs text-slate-400 font-mono">
                  Retrieving context & thinking...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* --- QUICK ACTION STRIP --- */}
        <div className="px-3.5 sm:px-4 py-2 border-t border-white/5 bg-slate-950/40 flex items-center justify-between text-[11px] sm:text-xs text-slate-400">
          <a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#ff7847]" />
            <span>Resume PDF</span>
          </a>
          <a
            href={PERSONAL_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          >
            <span>Email</span>
            <ArrowRight className="w-3 h-3 text-[#ff7847]" />
          </a>
        </div>

        {/* --- INPUT BAR --- */}
        <div className="p-2.5 sm:p-3 border-t border-white/10 bg-slate-900/80 backdrop-blur-md">
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Ask anything about Varshid's work..."
              /* text-base on mobile prevents iOS auto-zoom, text-sm on desktop */
              className="w-full pl-3.5 pr-11 py-2 sm:py-2.5 rounded-full bg-slate-950/70 border border-white/15 text-base sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#ee4405] focus:ring-1 focus:ring-[#ee4405] transition-all disabled:opacity-50"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send message"
              className="absolute right-1.5 p-2 rounded-full bg-gradient-to-tr from-[#9c2f06] to-[#ee4405] text-white hover:brightness-110 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-md shadow-[#ee4405]/30 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="mt-1 sm:mt-1.5 text-center">
            <span className="text-[9px] sm:text-[10px] text-slate-400 tracking-tight">
              Grounded with Varshid’s verified resume, projects & awards
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
