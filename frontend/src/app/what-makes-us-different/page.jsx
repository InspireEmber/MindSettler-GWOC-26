import Link from "next/link";
import {
  ClipboardCheck,
  ShieldCheck,
  UserCircle,
  BookOpen,
  Heart,
  Users2,
} from "lucide-react";


const FEATURES = [
  {
    title: "Structured Sessions",
    desc: "Every session follows a clear, thoughtful structure. You always know what to expect, what you’re working on, and why it matters.",
    icon: <ClipboardCheck />,
    color: "text-[#3F2965]",
    bg: "bg-[#3F2965]/10",
  },
  {
    title: "Confidentiality First",
    desc: "Your privacy is respected at every step. What you share stays safe, secure, and completely judgment-free.",
    icon: <ShieldCheck />,
    color: "text-[#DD1764]",
    bg: "bg-[#DD1764]/10",
  },
  {
    title: "Personalized Guidance",
    desc: "No two journeys are the same. Sessions are shaped around your experiences, needs, and pace, never one-size-fits-all.",
    icon: <UserCircle />,
    color: "text-[#3F2965]",
    bg: "bg-[#3F2965]/10",
  },
  {
    title: "Education-Focused",
    desc: "We focus on understanding, not quick fixes. Learn tools and insights that support long-term mental well-being.",
    icon: <BookOpen />,
    color: "text-[#DD1764]",
    bg: "bg-[#DD1764]/10",
  },
  {
    title: "Calm & Approachable",
    desc: "A warm, welcoming space where you can speak openly. No pressure, no fear—just support at your comfort level.",
    icon: <Heart />,
    color: "text-[#3F2965]",
    bg: "bg-[#3F2965]/10",
  },
  {
    title: "Human-Led Support",
    desc: "Real conversations i.e. No bots, no automation—just genuine human connection.",
    icon: <Users2 />,
    color: "text-[#DD1764]",
    bg: "bg-[#DD1764]/10",
  },
];

const REASONS = [
  {
    title: "Building Trust Through Structure",
    desc: "When you know what to expect, you can focus on the work. Our approach removes uncertainty and creates safety.",
  },
  {
    title: "Education as Empowerment",
    desc: "Knowledge is power. By understanding your mental health, you gain agency over your emotional well-being.",
  },
  {
    title: "Human Connection",
    desc: "While technology supports, nothing replaces human connection. Our approach ensures you are truly heard.",
  },
];

export default function WhatMakesUsDifferentPage() {
  return (
    <div className="min-h-screen bg-white text-[#5E5A6B]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA] py-12 md:py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto mb-6" />

          <h1 className="text-4xl md:text-6xl font-light text-[#2E2A36] mb-6 tracking-tight">
            What Makes Us{" "}
            <span className="block italic font-serif text-5xl md:text-7xl text-[#3F2965] mt-2">
              Different
            </span>
          </h1>

          <p className="text-sm md:text-base uppercase tracking-[0.2em] text-[#5E5A6B] font-medium">
            Our unique approach to mental health education and support.
          </p>
        </div>
      </section>
      {/* Features Grid */}
      <section className="py-16 md:py-24 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURES.map((f, i) => (
          <div
            key={i}
            className="p-8 rounded-3xl bg-[#F6F4FA] border border-[#3F2965]/10 hover:shadow-xl transition-all duration-300"
          >
            <div
              className={`w-14 h-14 rounded-full ${f.bg} ${f.color} flex items-center justify-center mb-6`}
            >
              {cloneElement(f.icon, { className: "w-7 h-7" })}
            </div>
            <h3 className="text-2xl font-medium text-[#2E2A36] mb-4">
              {f.title}
            </h3>
            <p className="leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>
      {/* Why It Matters Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          {/* Background Glow Accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-[#3F2965]/5 rounded-[100px] blur-3xl -z-10" />

          {/* Heading matching the Image style */}
          <div className="text-center mb-16 md:mb-24">
            <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto mb-8" />

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-[#2E2A36] leading-[1.1] tracking-tight mb-4">
              Why This Approach <br className="hidden sm:block" />
              <span className="font-light italic font-serif text-[#3F2965]">
                Matters
              </span>
            </h2>

            <p className="text-[#5E5A6B] font-light tracking-[0.2em] uppercase text-[10px] sm:text-xs mt-6 opacity-80">
              Sustainable Growth & Emotional Well-being
            </p>
          </div>

          {/* Staggered Grid Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Horizontal connecting line for Desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-[#3F2965]/10 -translate-y-1/2 z-0" />

            {REASONS.map((r, i) => (
              <div
                key={i}
                className={`group relative z-10 bg-[#F6F4FA] p-8 rounded-2xl border border-[#3F2965]/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#3F2965]/5 ${
                  i === 1 ? "md:mt-8" : "" // This creates the staggered middle-card effect from the image
                }`}
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-4xl font-serif italic text-[#3F2965]/20">
                    0{i + 1}
                  </span>
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    {/* Alternate dot colors based on the card index */}
                    <div
                      className={`h-2 w-2 rounded-full ${
                        i === 1 ? "bg-[#DD1764]" : "bg-[#3F2965]"
                      }`}
                    />
                  </div>
                </div>

                <h3 className="text-xl font-medium text-[#3F2965] mb-4">
                  {r.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#5E5A6B]">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Sophisticated Rounded Card */}
      <section className="py-24 md:py-32 bg-[#F6F4FA]/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#3F2965] to-[#2E2A36] p-12 md:p-24 text-center shadow-2xl shadow-[#3F2965]/30">
            {/* Decorative Brand Accents */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#DD1764]/15 rounded-full blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#3F2965]/40 rounded-full blur-[80px]" />

            <div className="relative z-10">
              {/* Small Tagline */}
              <p className="text-[#DD1764] font-semibold tracking-[0.3em] uppercase text-[10px] mb-6 opacity-90">
                The Journey Starts Here
              </p>

              {/* Heading matching the Image Style */}
              <h2 className="text-4xl md:text-6xl font-extralight text-white mb-8 leading-[1.1] tracking-tight">
                Ready to Experience <br className="hidden sm:block" />
                the{" "}
                <span className="font-serif italic text-white/90">
                  Difference?
                </span>
              </h2>

              <p className="text-lg md:text-xl text-white/70 mb-12 max-w-xl mx-auto font-light leading-relaxed">
                Step into a space designed for clarity, safety, and genuine
                human connection.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  href="/book-session"
                  className="w-full sm:w-auto px-12 py-5 rounded-full bg-white text-[#3F2965] font-semibold text-lg hover:bg-white/95 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:scale-[1.03] active:scale-95"
                >
                  Book Your First Session
                </Link>

                <Link
                  href="/contact"
                  className="text-white/80 hover:text-white border-b border-white/20 hover:border-white transition-all pb-1 font-light text-lg"
                >
                  Ask a question
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { cloneElement } from "react";
