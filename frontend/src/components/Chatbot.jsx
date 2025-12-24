"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import api from "../services/api";

const DEFAULT_GREETING = "Hi, I'm here to help you understand MindSettler and guide you through booking a session.\nHow can I help today?";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: DEFAULT_GREETING,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    
    // Add user message to chat
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);

    setIsLoading(true);

    try {
      // Build conversation history (excluding the greeting)
      const conversationHistory = messages
        .slice(1) // Skip greeting
        .map((msg) => ({
          role: msg.role === "assistant" ? "assistant" : "user",
          content: msg.content,
        }));

      const response = await api.sendChatMessage({
        message: userMessage,
        conversationHistory,
      });

      // Handle response - API service returns the full response object
      // The API returns { success: true, response: "..." } or { success: false, message: "..." }
      let responseText;
      if (response && response.success === false) {
        responseText = response.message || "I'm sorry, I couldn't process that request. Please try again later.";
      } else if (response && response.response) {
        responseText = response.response;
      } else if (typeof response === 'string') {
        responseText = response;
      } else {
        responseText = "I'm sorry, I couldn't process that request. Please try again later.";
      }
      
      // Add assistant response
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: responseText },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I'm having trouble connecting right now. Please try again later or contact us directly.",
        },
      ]);
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

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  // Render message content with link detection
  const renderMessageContent = (content) => {
    // Check if content contains link patterns like "→ Book a Session: /book-session"
    const linkPattern = /(→\s*)?([^:→\n]+?):\s*(\/[^\s\n]+)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkPattern.exec(content)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }
      
      const linkText = match[2]?.trim() || "here"; // "Book a Session"
      const linkPath = match[3]; // "/book-session"
      const arrow = match[1] ? "→ " : ""; // "→ " if present
      
      // Add the arrow and clickable link text
      parts.push(
        <span key={match.index}>
          {arrow}
          <Link
            href={linkPath}
            className="underline text-[#3F2965] hover:text-[#DD1764] font-medium"
            onClick={handleClose}
          >
            {linkText}
          </Link>
          {`: ${linkPath}`}
        </span>
      );
      
      lastIndex = linkPattern.lastIndex;
    }
    
    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }
    
    // If no links found, return original content
    return parts.length > 0 ? parts : content;
  };

  return (
    <>
      {/* Chatbot Icon Button - Fixed Bottom Right */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#3F2965] to-[#DD1764] text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          aria-label="Open chatbot"
        >
          <MessageCircle size={24} />
        </motion.button>
      )}

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border border-[#3F2965]/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#3F2965] to-[#DD1764] text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">MindSettler Chat</h3>
                <p className="text-xs opacity-90 mt-1">
                  Information & Booking Support
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close chatbot"
              >
                <Minimize2 size={18} />
              </button>
            </div>

            {/* Disclaimer */}
            <div className="px-4 pt-3 pb-2 bg-[#F6F4FA] border-b border-[#3F2965]/10">
              <p className="text-xs text-[#5E5A6B] leading-relaxed">
                <span className="font-semibold text-[#3F2965]">Note:</span>{" "}
                This chatbot provides information only and does not offer mental
                health advice.
              </p>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAFAFA]">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-[#3F2965] to-[#DD1764] text-white"
                        : "bg-white text-[#2E2A36] border border-[#3F2965]/10"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.role === "assistant"
                        ? renderMessageContent(message.content)
                        : message.content}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#3F2965]/10 rounded-2xl px-4 py-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-[#3F2965] rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-[#3F2965] rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-[#3F2965] rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-[#3F2965]/10 bg-white">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 rounded-full border border-[#3F2965]/20 focus:outline-none focus:ring-2 focus:ring-[#3F2965]/30 focus:border-[#3F2965] text-sm text-[#2E2A36] placeholder:text-[#5E5A6B] disabled:opacity-50"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3F2965] to-[#DD1764] text-white flex items-center justify-center hover:shadow-md transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
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

