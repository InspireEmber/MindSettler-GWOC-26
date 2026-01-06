"use client";
import ReadyToBook from "@/components/ReadyToBook";
 // Required for framer-motion in Next.js App Router

import Link from "next/link";
import { BookOpen, Brain, Sparkles, ShieldCheck, Users2 } from "lucide-react";
import { motion } from "framer-motion";

// 1. Pass the component reference directly
const CONCEPTS = [
  { title: "Emotional Awareness", desc: "Recognize and name emotions to understand your mental well-being. We explore why they matter.", icon: Brain, color: "text-[#eeb9ff]", bg: "bg-[#eeb9ff]/10" },
  { title: "Thought Patterns", desc: "Understand how thoughts influence feelings to develop healthier cognitive responses to life's challenges.", icon: Sparkles, color: "text-[#DD1764]", bg: "bg-[#DD1764]/10" },
  { title: "Stress Management", desc: "Practical strategies for managing anxiety and overwhelm to build resilience and maintain balance.", icon: ShieldCheck, color: "text-[#eeb9ff]", bg: "bg-[#eeb9ff]/10" },
  { title: "Relationships", desc: "Healthy relationship dynamics and boundaries are crucial for emotional growth and well-being.", icon: Users2, color: "text-[#DD1764]", bg: "bg-[#DD1764]/10" }
];

const BENEFITS = [
  { title: "Builds Self-Awareness", desc: "Gain deeper insight into your emotional triggers through structured learning." },
  { title: "Reduces Stigma", desc: "Education normalizes mental health conversations and reduces fear or shame." },
  { title: "Empowers Decision-Making", desc: "Learn to make informed, healthier choices about your mental well-being." },
  { title: "Provides Practical Tools", desc: "Concrete techniques you can apply immediately to improve your daily experience." }
];

export default function PsychoEducationPage() {
  return (
    <div className="min-h-screen relative text-gray-200 overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-20 md:py-32 text-center z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-1 w-16 bg-gradient-to-r from-[#eeb9ff] to-[#DD1764] rounded-full mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-light text-white mb-6">
            Psycho-<span className="font-medium text-[#eeb9ff]">Education</span>
          </h1>
          <p className="text-xl leading-relaxed text-gray-300">Understanding mental health through education, awareness, and structured guidance.</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-24 max-w-4xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-light text-white mb-8">What is Psycho-Education?</h2>
        <div className="space-y-6 text-lg leading-relaxed mb-12 text-gray-300">
          <p>Psycho-education combines psychological principles with educational methods to help individuals understand their emotions and behaviors. It empowers you with tools to navigate your mental well-being journey.</p>
          <p>Unlike traditional therapy, we focus on the "why" behind your thoughts, helping you build a foundation for meaningful change.</p>
        </div>
        <div className="h-64 rounded-3xl bg-white/5 backdrop-blur-md flex flex-col items-center justify-center border border-white/10 shadow-lg">
          <div className="w-16 h-16 rounded-full bg-[#eeb9ff]/10 flex items-center justify-center text-[#eeb9ff] mb-4 border border-[#eeb9ff]/20">
            <BookOpen className="w-8 h-8" />
          </div>
          <span className="font-medium text-white">Educational Content</span>
        </div>
      </section>

      {/* Concepts Grid */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Key Concepts We Explore</h2>
            <p className="text-lg text-gray-300">Foundational knowledge for building emotional clarity</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CONCEPTS.map((c, i) => {
              const IconComponent = c.icon;
              return (
                <div key={i} className="p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:shadow-xl hover:shadow-[#eeb9ff]/10 transition-all group">
                  <div className={`w-12 h-12 rounded-full ${c.bg} ${c.color} flex items-center justify-center mb-6 border border-white/10`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className={`text-2xl font-medium mb-4 ${c.color}`}>{c.title}</h3>
                  <p className="leading-relaxed text-gray-300">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits List */}
      <section className="py-20 max-w-4xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-light text-white text-center mb-16">How Psycho-Education Helps</h2>
        <div className="space-y-8">
          {BENEFITS.map((b, i) => (
            <div key={i} className="flex gap-6 group p-6 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#eeb9ff]/10 flex items-center justify-center mt-1 group-hover:scale-110 transition-transform border border-[#eeb9ff]/20">
                <div className="w-2 h-2 rounded-full bg-[#eeb9ff]" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-2">{b.title}</h3>
                <p className="leading-relaxed text-gray-300">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <ReadyToBook />
    </div>
  );
}
