

import { useState, useRef, useEffect } from "react";
import { Send, Minimize2, Sparkles, Brain, CalendarCheck, Info, BookOpen, HelpCircle, MessageCircle, GraduationCap, ArrowRight, Calendar, Clock, CreditCard, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import api from "@/services/api";

const DEFAULT_GREETING = "Hi! I'm your MindSettler guide. 🌿\n\nI can help you understand our methodology or assist you in booking your first session. How can I support you today?";

// Quick access page mapping - keywords to routes
const QUICK_ACCESS_PAGES = [
  { keywords: ["book", "session", "appointment", "schedule", "booking"], label: "Book Session", href: "/book-session", icon: CalendarCheck },
  { keywords: ["how it works", "process", "methodology", "steps"], label: "How It Works", href: "/how-it-works", icon: Sparkles },
  { keywords: ["about", "who we are", "mindsettler", "parnika"], label: "About Us", href: "/about", icon: Info },
  { keywords: ["resource", "article", "reading", "material"], label: "Resources", href: "/resources", icon: BookOpen },
  { keywords: ["faq", "question", "help", "common"], label: "FAQs", href: "/faqs", icon: HelpCircle },
  { keywords: ["contact", "reach out", "get in touch", "email", "message"], label: "Contact Us", href: "/contact", icon: MessageCircle },
  { keywords: ["awareness", "psycho-education", "learn", "education", "understand"], label: "Awareness", href: "/awareness", icon: GraduationCap },
];

// Helper to get the single best quick access button based on user's question
const getQuickAccessButton = (userQuestion) => {
  if (!userQuestion) return null;
  const lowerQuestion = userQuestion.toLowerCase();

  // Score each page by keyword matches in the user's question
  let bestMatch = null;
  let bestScore = 0;

  for (const page of QUICK_ACCESS_PAGES) {
    const matchCount = page.keywords.filter(keyword => lowerQuestion.includes(keyword)).length;
    if (matchCount > bestScore) {
      bestScore = matchCount;
      bestMatch = page;
    }
  }

  return bestMatch;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", type: "text", content: DEFAULT_GREETING },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingState, setBookingState] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    const userMessage = inputValue.trim();
    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const conversationHistory = messages.slice(1).map((msg) => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content || msg.text,
      }));

      const res = await api.sendChatMessage({
        message: userMessage,
        conversationHistory,
        bookingState
      });

      if (res.bookingState !== undefined) {
        setBookingState(res.bookingState);
      }

      let responseObj = res?.response;
      if (typeof responseObj === "string") {
        responseObj = { type: "text", text: responseObj };
      } else if (!responseObj) {
        responseObj = { type: "text", text: "I'm having trouble connecting. Please try again soon." };
      }

      setMessages((prev) => [...prev, { role: "assistant", ...responseObj }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", type: "text", content: "I'm currently offline. Please reach out via our contact page!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmBooking = async () => {
    setIsLoading(true);
    try {
      const res = await api.sendChatMessage({
        action: "CONFIRM_BOOKING",
        bookingState
      });
      if (res.bookingState === null) setBookingState(null);
      setMessages((prev) => [...prev, { role: "assistant", ...res.response }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", type: "text", text: "Failed to confirm booking." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessageContent = (content) => {
    const linkPattern = /(→\s*)?([^:→\n]+?):\s*(\/[^\s\n]+)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkPattern.exec(content)) !== null) {
      if (match.index > lastIndex) parts.push(content.slice(lastIndex, match.index));
      const linkText = match[2]?.trim() || "here";
      const linkPath = match[3];
      parts.push(
        <Link key={match.index} to={linkPath} className="inline-flex items-center gap-1 text-[#3F2965] font-bold underline decoration-[#DD1764]/30 hover:text-[#DD1764] transition-colors" onClick={() => setIsOpen(false)}>
          {linkText}
        </Link>
      );
      lastIndex = linkPattern.lastIndex;
    }
    if (lastIndex < content.length) parts.push(content.slice(lastIndex));
    return parts.length > 0 ? parts : content;
  };

  return (
    <>
      {/* Floating Action Button - Simplified Circle */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#3F2965] shadow-[0_15px_35px_rgba(63,41,101,0.4)] flex items-center justify-center group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#a167a5] via-[#a167a5] to-[#DD1764] opacity-90" />
            <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
              <Brain size={30} className="text-white drop-shadow-md" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Modern Chat Panel - Reduced Radius & No Border */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[620px] max-h-[calc(100vh-6rem)] bg-[#FDFCFD] rounded-2xl shadow-[0_25px_70px_rgba(46,42,54,0.15)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#a167a5] to-[#DD1764] p-6 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-[60px] opacity-20 -mr-10 -mt-10" />
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md shadow-inner">
                    <Brain size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg leading-none mb-1">MindSettler Support</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-white/60">AI Assistant</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                  <Minimize2 size={20} />
                </button>
              </div>
            </div>

            {/* Conversation Flow */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FDFCFD] scroll-smooth">
              {messages.map((message, index) => {
                // Get the previous user message for context
                const prevUserMessage = message.role === "assistant" && index > 0
                  ? messages.slice(0, index).reverse().find(m => m.role === "user")?.content
                  : null;
                const quickAccessButton = message.role === "assistant" ? getQuickAccessButton(prevUserMessage) : null;

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[85%] px-5 py-4 text-sm leading-relaxed ${message.role === "user"
                      ? "bg-[#a167a5] text-white rounded-[1.25rem] rounded-tr-none shadow-md"
                      : "bg-white text-[#2E2A36] border border-slate-100 rounded-[1.25rem] rounded-tl-none"
                      }`}>
                      <div className="whitespace-pre-wrap">
                        {message.type === "booking_confirmation" ? (
                          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm my-2">
                            <h4 className="font-bold text-[#3F2965] mb-3 pb-2 border-b border-slate-100 flex items-center gap-2"><CalendarCheck size={18} /> Booking Summary</h4>
                            <div className="space-y-3 mb-5 text-sm text-[#2E2A36]">
                              <div className="flex items-center justify-between"><div className="flex items-center gap-2 opacity-70"><Video size={16} /> Mode</div> <span className="font-medium capitalize">{message.booking.mode}</span></div>
                              <div className="flex items-center justify-between"><div className="flex items-center gap-2 opacity-70"><Calendar size={16} /> Date</div> <span className="font-medium">{message.booking.date}</span></div>
                              <div className="flex items-center justify-between"><div className="flex items-center gap-2 opacity-70"><Clock size={16} /> Slot</div> <span className="font-medium">{message.booking.slot}</span></div>
                              <div className="flex items-center justify-between"><div className="flex items-center gap-2 opacity-70"><CreditCard size={16} /> Price</div> <span className="font-medium text-emerald-600">₹{message.booking.price}</span></div>
                            </div>
                            <button onClick={handleConfirmBooking} className="w-full py-2.5 bg-gradient-to-r from-[#a167a5] to-[#DD1764] text-white rounded-lg font-medium shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 transition-all active:scale-95">
                              Confirm Booking
                            </button>
                          </div>
                        ) : message.type === "auth_required" ? (
                          <div className="text-center py-2">
                            <p className="mb-4 text-sm">{message.text}</p>
                            <Link to="/login" className="px-5 py-2 bg-[#3F2965] text-white rounded-full text-xs font-semibold hover:bg-[#2E1D4A] shadow-md transition-all" onClick={() => setIsOpen(false)}>Log In Now</Link>
                          </div>
                        ) : message.type === "booking_questions" ? (
                          <div className="flex flex-col gap-1">
                            <span className="text-xs uppercase tracking-wider font-bold text-[#a167a5]">Booking Setup</span>
                            <span>{message.text}</span>
                          </div>
                        ) : (
                          message.role === "assistant" ? renderMessageContent(message.content || message.text) : (message.content || message.text)
                        )}
                      </div>
                      {/* Quick Access Button - based on user's question */}
                      {quickAccessButton && (
                        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100">
                          <Link
                            to={quickAccessButton.href}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#a167a5] bg-[#a167a5]/10 hover:bg-[#a167a5]/20 rounded-full transition-colors"
                          >
                            <quickAccessButton.icon size={12} />
                            {quickAccessButton.label}
                            <ArrowRight size={10} className="opacity-60" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 rounded-[1.25rem] rounded-tl-none px-6 py-4 flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-[#3F2965]/40 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-[#3F2965]/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-[#3F2965]/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-6 pt-2 bg-white">
              <div className="relative group">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="w-full pl-6 pr-14 py-4 rounded-2xl bg-[#F6F4FA] border-none focus:ring-2 focus:ring-[#a167a5]/20 outline-none text-sm text-[#2E2A36] placeholder:text-[#2E2A36]/50 transition-all"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-[#3F2965] text-white flex items-center justify-center hover:bg-[#2E1D4A] transition-all disabled:opacity-20"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}