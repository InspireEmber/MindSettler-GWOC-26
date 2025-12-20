import Link from "next/link";
import { ClipboardCheck, ShieldCheck, UserCircle, BookOpen, Heart, Users2 } from "lucide-react";

const FEATURES = [
  { title: "Structured Sessions", desc: "Clear, organized format designed to maximize learning and understanding. No guesswork, just guidance.", icon: <ClipboardCheck />, color: "text-[#3F2965]", bg: "bg-[#3F2965]/10" },
  { title: "Confidentiality First", desc: "Privacy is paramount. Safe environment where you can speak freely without fear of judgment.", icon: <ShieldCheck />, color: "text-[#DD1764]", bg: "bg-[#DD1764]/10" },
  { title: "Personalized Guidance", desc: "Your journey is unique. We adapt our approach to meet you where you are, ensuring relevance.", icon: <UserCircle />, color: "text-[#3F2965]", bg: "bg-[#3F2965]/10" },
  { title: "Education-Focused", desc: "We prioritize understanding over quick fixes. Our approach empowers you with long-term tools.", icon: <BookOpen />, color: "text-[#DD1764]", bg: "bg-[#DD1764]/10" },
  { title: "Calm & Approachable", desc: "Mental health conversations can be intimidating. We create a welcoming atmosphere.", icon: <Heart />, color: "text-[#3F2965]", bg: "bg-[#3F2965]/10" },
  { title: "Human-Led Support", desc: "No chatbots or automation. Led by professionals who understand human connection.", icon: <Users2 />, color: "text-[#DD1764]", bg: "bg-[#DD1764]/10" }
];

const REASONS = [
  { title: "Building Trust Through Structure", desc: "When you know what to expect, you can focus on the work. Our approach removes uncertainty and creates safety." },
  { title: "Education as Empowerment", desc: "Knowledge is power. By understanding your mental health, you gain agency over your emotional well-being." },
  { title: "Human Connection", desc: "While technology supports, nothing replaces human connection. Our approach ensures you are truly heard." }
];

export default function WhatMakesUsDifferentPage() {
  return (
    <div className="min-h-screen bg-white text-[#5E5A6B]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA] py-20 md:py-32 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-light text-[#2E2A36] mb-6">
            What Makes Us <span className="font-medium text-[#3F2965]">Different</span>
          </h1>
          <p className="text-xl">Our unique approach to mental health education and support.</p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURES.map((f, i) => (
          <div key={i} className="p-8 rounded-3xl bg-[#F6F4FA] border border-[#3F2965]/10 hover:shadow-xl transition-all duration-300">
            <div className={`w-14 h-14 rounded-full ${f.bg} ${f.color} flex items-center justify-center mb-6`}>
              {cloneElement(f.icon, { className: "w-7 h-7" })}
            </div>
            <h3 className="text-2xl font-medium text-[#2E2A36] mb-4">{f.title}</h3>
            <p className="leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Why It Matters */}
      <section className="py-20 bg-[#F6F4FA]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-light text-[#2E2A36] text-center mb-12">Why This Approach Matters</h2>
          <div className="space-y-6">
            {REASONS.map((r, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white border border-[#3F2965]/5 shadow-sm">
                <h3 className="text-xl font-medium text-[#3F2965] mb-3">{r.title}</h3>
                <p className="leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-light text-[#2E2A36] mb-6">Experience the Difference</h2>
          <p className="text-lg mb-10">Discover how our personalized approach can support your journey.</p>
          <Link href="/book-session" className="px-10 py-4 rounded-full bg-[#3F2965] text-white font-medium text-lg hover:shadow-xl transition-all active:scale-95 inline-block">
            Book Your First Session
          </Link>
        </div>
      </section>
    </div>
  );
}

// Helper to inject classes into Lucide icons
import { cloneElement } from "react";