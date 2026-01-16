"use client";
import { useState } from "react";
import { ChevronDown, Sparkles, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ_DATA = [
  {
    category: "Sessions",
    questions: [
      { q: "What is an awareness session?", a: "An awareness session is a structured 60-minute session focused on education and awareness-building about mental health. Unlike traditional therapy, it emphasizes understanding your thoughts, emotions, and patterns." },
      { q: "How long are the sessions?", a: "Each session is 60 minutes long. This duration allows for meaningful exploration while maintaining focus throughout." },
      { q: "Can I choose between online and offline sessions?", a: "Yes, you can choose based on your preference. Both formats follow the same structured approach and maintain strict confidentiality." },
      { q: "What happens in my first session?", a: "It's an introduction to the awareness approach. We'll discuss your goals, explain the process, and begin exploring your journey in a calm environment." }
    ]
  },
  {
    category: "Privacy & Confidentiality",
    questions: [
      { q: "Is my information confidential?", a: "Absolutely. Confidentiality is paramount. Your information is protected according to our strict confidentiality policy which you acknowledge before starting." },
      { q: "Who has access to my session information?", a: "Only authorized professionals involved in your session have access. We follow strict privacy protocols to ensure data remains secure." }
    ]
  },
  {
    category: "Booking Process",
    questions: [
      { q: "How do I book a session?", a: "Visit our 'Book Session' page, select your format (online/offline), choose an available slot, and complete the form." },
      { q: "Can I reschedule or cancel my session?", a: "Please contact us as soon as possible. While we'll try to find a solution, note that our non-refund policy applies to confirmed sessions." }
    ]
  }
];

export default function FAQAccordion() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <div className="max-w-3xl mx-auto space-y-12 py-12 px-4">
      {FAQ_DATA.map((cat, cIdx) => (
        <motion.div
          key={cIdx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: cIdx * 0.1 }}
          className="space-y-6"
        >
          {/* Category Header */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#eeb9ff]">
              <HelpCircle size={18} />
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-[#eeb9ff]">
              {cat.category}
            </h2>
          </div>

          <div className="space-y-4">
            {cat.questions.map((faq, qIdx) => {
              const id = `${cIdx}-${qIdx}`;
              const isOpen = openId === id;

              return (
                <div
                  key={qIdx}
                  className={`group relative rounded-[1.5rem] md:rounded-[2rem] transition-all duration-500 overflow-hidden border ${isOpen
                    ? 'bg-white/10 backdrop-blur-md border-white/20 shadow-lg'
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                    }`}
                >
                  <button
                    onClick={() => toggle(id)}
                    className="w-full p-5 sm:p-7 text-left flex items-center justify-between outline-none relative z-10"
                  >
                    <span className={`text-base sm:text-lg transition-colors duration-300 pr-6 leading-relaxed font-serif ${isOpen ? 'text-[#eeb9ff] italic' : 'text-white/90'
                      }`}>
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      className={`shrink-0 p-2 rounded-full ${isOpen ? 'bg-[#eeb9ff] text-[#3F2965]' : 'bg-white/10 text-white'
                        }`}
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 sm:px-7 pb-8 text-sm sm:text-base text-white/80 leading-relaxed font-light">
                          <div className="pt-4 border-t border-white/10 flex gap-3">
                            <Sparkles size={16} className="text-[#eeb9ff] mt-1 shrink-0" />
                            <p className="font-redhat">{faq.a}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
}