"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react"; // npm install lucide-react

const FAQ_DATA = [
  {
    category: "Sessions",
    questions: [
      { q: "What is a psycho-education session?", a: "A psycho-education session is a structured 60-minute session focused on education and awareness-building about mental health. Unlike traditional therapy, it emphasizes understanding your thoughts, emotions, and patterns." },
      { q: "How long are the sessions?", a: "Each session is 60 minutes long. This duration allows for meaningful exploration while maintaining focus throughout." },
      { q: "Can I choose between online and offline sessions?", a: "Yes, you can choose based on your preference. Both formats follow the same structured approach and maintain strict confidentiality." },
      { q: "What happens in my first session?", a: "It's an introduction to the psycho-education approach. We'll discuss your goals, explain the process, and begin exploring your journey in a calm environment." }
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
    <div className="max-w-3xl mx-auto space-y-12 py-12">
      {FAQ_DATA.map((cat, cIdx) => (
        <div key={cIdx} className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#3F2965] px-2">{cat.category}</h2>
          
          <div className="space-y-3">
            {cat.questions.map((faq, qIdx) => {
              const id = `${cIdx}-${qIdx}`;
              const isOpen = openId === id;

              return (
                <div key={qIdx} className={`group border border-[#3F2965]/10 rounded-2xl transition-all duration-300 ${isOpen ? 'bg-[#F6F4FA] border-[#3F2965]/30' : 'bg-white hover:border-[#3F2965]/30'}`}>
                  <button
                    onClick={() => toggle(id)}
                    className="w-full p-5 md:p-6 text-left flex items-center justify-between outline-none"
                  >
                    <span className={`text-lg transition-colors duration-300 ${isOpen ? 'text-[#3F2965] font-medium' : 'text-[#2E2A36]'}`}>
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-[#3F2965] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-[#5E5A6B] leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}