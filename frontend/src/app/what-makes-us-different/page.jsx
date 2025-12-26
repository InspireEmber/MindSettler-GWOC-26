"use client";
import ReadyToBook from "@/components/ReadyToBook";


import React, { useRef } from "react";
import Link from "next/link";
import {
  ClipboardCheck,
  ShieldCheck,
  UserCircle,
  BookOpen,
  Heart,
  Users2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILITY ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- DATA ---
const FEATURES = [
  {
    title: "Structured Sessions",
    desc: "Every session follows a clear, thoughtful structure. You always know what to expect.",
    longDesc: "We remove the anxiety of the unknown. Our sessions are architected to give you a roadmap, so you can focus purely on your growth.",
    icon: <ClipboardCheck />,
    color: "text-[#3F2965]",
    bg: "bg-[#3F2965]/10",
  },
  {
    title: "Confidentiality First",
    desc: "Your privacy is respected at every step. What you share stays safe.",
    longDesc: "A judgment-free zone where your data and your stories are protected with enterprise-grade care and human empathy.",
    icon: <ShieldCheck />,
    color: "text-[#DD1764]",
    bg: "bg-[#DD1764]/10",
  },
  {
    title: "Personalized Guidance",
    desc: "Sessions are shaped around your experiences, needs, and pace.",
    longDesc: "No cookie-cutter scripts. We adapt to your emotional velocity, ensuring the journey feels uniquely yours.",
    icon: <UserCircle />,
    color: "text-[#3F2965]",
    bg: "bg-[#3F2965]/10",
  },
  {
    title: "Education-Focused",
    desc: "We focus on understanding, not quick fixes. Learn tools for the long term.",
    longDesc: "We don\'t just listen; we equip you. You leave with a toolkit of cognitive strategies to navigate life independently.",
    icon: <BookOpen />,
    color: "text-[#DD1764]",
    bg: "bg-[#DD1764]/10",
  },
  {
    title: "Calm & Approachable",
    desc: "A warm, welcoming space where you can speak openly without pressure.",
    longDesc: "The environment is designed to lower cortisol and raise comfort. Come as you are, feel safe immediately.",
    icon: <Heart />,
    color: "text-[#3F2965]",
    bg: "bg-[#3F2965]/10",
  },
  {
    title: "Human-Led Support",
    desc: "Real conversations. No bots, no automation—just genuine connection.",
    longDesc: "Technology aids us, but it doesn\'t replace us. You will always be heard by a beating heart and a thinking mind.",
    icon: <Users2 />,
    color: "text-[#DD1764]",
    bg: "bg-[#DD1764]/10",
  },
];

const REASONS = [
  {
    title: "Trust Through Structure",
    desc: "Uncertainty breeds anxiety. Our roadmap creates a safety net for your mind.",
  },
  {
    title: "Empowerment",
    desc: "Knowledge is agency. Understanding your mental health puts you back in the driver\'s seat.",
  },
  {
    title: "Human Connection",
    desc: "In a digital world, being truly heard by another human is the ultimate healing tool.",
  },
];

// --- SUB-COMPONENTS ---

// 1. The Scroll Dock Item (The Core Animation)
const FeatureDockItem = ({ feature, index }) => {
  const ref = useRef(null);

  // Track scroll relative to this specific card
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Animation Logic:
  // When item is centered (0.5), it is large (1.1 scale) and opaque (1).
  // When at edges (0 or 1), it is smaller (0.85) and faded (0.3).
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
  
  // Add spring physics for smooth "floating" feel
  const springScale = useSpring(scale, { stiffness: 200, damping: 20 });
  const springOpacity = useSpring(opacity, { stiffness: 200, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ scale: springScale, opacity: springOpacity, y }}
      className="group relative flex flex-col items-center text-center py-16 md:py-24 max-w-2xl mx-auto"
    >
      {/* Central Connector Line */}
      <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#3F2965]/20 to-transparent left-1/2 -z-10" />

      {/* Icon Bubble */}
      <div className="relative mb-8">
        <div
          className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-2xl transition-all duration-500 bg-white",
            feature.color
          )}
        >
          {React.cloneElement(feature.icon, { size: 32, strokeWidth: 1.5 })}
        </div>
        {/* Glow Ring behind icon */}
        <div className={cn("absolute inset-0 rounded-full blur-xl opacity-40", feature.bg)} />
      </div>

      <h3 className="text-3xl md:text-5xl font-light text-[#2E2A36] mb-6 tracking-tight">
        {feature.title}
      </h3>
      
      <p className="text-lg text-[#5E5A6B] leading-relaxed max-w-md font-medium">
        {feature.desc}
      </p>

      {/* Extended Description (Visible when centered/hovered) */}
      <motion.p 
        className="mt-6 text-sm md:text-base text-[#3F2965] font-serif italic max-w-md opacity-0 group-hover:opacity-100 md:opacity-80 transition-opacity duration-500"
      >
        \"{feature.longDesc}\"
      </motion.p>
    </motion.div>
  );
};

// 2. Parallax Reason Card
const ReasonCard = ({ reason, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      whileHover={{ y: -10 }}
      className="p-8 rounded-[2rem] bg-white border border-[#3F2965]/5 shadow-lg shadow-[#3F2965]/5 hover:shadow-2xl hover:shadow-[#DD1764]/10 transition-all duration-300 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F6F4FA] to-transparent rounded-bl-[100px] -z-0 group-hover:scale-150 transition-transform duration-700 ease-in-out" />
      
      <div className="relative z-10">
        <span className="block text-6xl font-serif italic text-[#3F2965]/10 mb-4 group-hover:text-[#DD1764]/20 transition-colors">
          0{index + 1}
        </span>
        <h4 className="text-xl font-semibold text-[#3F2965] mb-3">{reason.title}</h4>
        <p className="text-[#5E5A6B] leading-relaxed">{reason.desc}</p>
      </div>
    </motion.div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function WhatMakesUsDifferentPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Background parallax movement logic
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="min-h-screen bg-[#FDFBFD] text-[#5E5A6B] overflow-hidden selection:bg-[#DD1764]/20">
      
      {/* 1. Global Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div style={{ y: bgY }} className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#3F2965]/5 rounded-full blur-[120px]" />
        <motion.div style={{ y: bgY }} className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#DD1764]/5 rounded-full blur-[120px]" />
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative z-10 pt-32 pb-10 md:pt-48 md:pb-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#3F2965]/10 shadow-sm mb-8">
            <Sparkles className="w-4 h-4 text-[#DD1764]" />
            <span className="text-xs font-bold tracking-widest text-[#3F2965] uppercase">
              Beyond Standard Care
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-light text-[#2E2A36] mb-8 tracking-tight">
            What Makes Us <br />
            <span className="font-serif italic text-[#3F2965] relative inline-block">
              Different
              {/* Animated Underline */}
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute -bottom-2 left-0 w-full"
                height="10"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path d="M0 5 Q 50 10 100 5" stroke="#DD1764" strokeWidth="2" fill="transparent" />
              </motion.svg>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#5E5A6B] max-w-2xl mx-auto font-light leading-relaxed">
            We don\'t just offer sessions; we offer a carefully architected journey 
            designed for sustainable emotional growth.
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-16 flex justify-center opacity-40"
        >
          <div className="w-[1px] h-24 bg-gradient-to-b from-[#3F2965] to-transparent" />
        </motion.div>
      </section>

      {/* 3. FLUID DOCK SECTION (Features) */}
      <section ref={containerRef} className="relative z-10 py-12 md:py-24">
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="flex flex-col gap-0">
            {FEATURES.map((feature, i) => (
              <FeatureDockItem 
                key={i} 
                feature={feature} 
                index={i} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. REASONS GRID */}
      <section className="relative z-10 py-24 md:py-32 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-light text-[#2E2A36]">
               Why This Approach <span className="font-serif italic text-[#DD1764]">Matters</span>
             </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {REASONS.map((r, i) => (
                <ReasonCard key={i} reason={r} index={i} />
            ))}
          </div>
        </div>
      </section>
      <ReadyToBook />
    </div>
  );
}