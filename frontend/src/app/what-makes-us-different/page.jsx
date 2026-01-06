"use client";
import ReadyToBook from "@/components/ReadyToBook";
import React from "react";
import { useState, useEffect } from "react";
import { 
    Sparkles, 
    ShieldCheck, 
    LayoutGrid, 
    Lock, 
    Sprout, 
    Lightbulb, 
    Heart 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// --- DATA ---
const BRAIN_ZONES = [
  {
    title: "Emotional Safety",
    desc: "A judgment-free environment where you can express yourself without fear. We create a container where vulnerability is met with unconditional validation.",
    icon: <ShieldCheck className="w-6 h-6 text-[#DD1764]" />,
  },
  {
    title: "Structured Thinking",
    desc: "Organized sessions that help you navigate chaos and find clarity. We turn overwhelming thoughts into actionable pathways for change.",
    icon: <LayoutGrid className="w-6 h-6 text-[#3F2965]" />,
  },
  {
    title: "Confidential Space",
    desc: "Your privacy is paramount; what happens here stays here. We adhere to the strictest ethical standards to protect your story.",
    icon: <Lock className="w-6 h-6 text-[#DD1764]" />,
  },
  {
    title: "Growth",
    desc: "Every step is designed to move you forward on your personal journey. We track progress not just by symptom reduction, but by life satisfaction.",
    icon: <Sprout className="w-6 h-6 text-[#3F2965]" />,
  },
  {
    title: "Self-Understanding",
    desc: "Gain deep insights into your patterns and behaviors. Unlock the 'why' behind your actions to empower lasting transformation.",
    icon: <Lightbulb className="w-6 h-6 text-[#DD1764]" />,
  },
  {
    title: "Human Connection",
    desc: "Real empathy and understanding from a dedicated professional. Technology bridges the gap, but the healing comes from authentic human presence.",
    icon: <Heart className="w-6 h-6 text-[#3F2965]" />,
  },
];

const NEW_ROTATING_CONTENT = [
  {
    id: 1,
    title: "Understanding Deeper", 
    text: "Sometimes words aren't enough. We look beyond the surface to understand what your mind is truly asking for.",
    imageSrc: "/images/4b.svg" 
  },
  {
    id: 2,
    title: "Finding Balance",
    text: "Life is a balancing act. We help you find the equilibrium between your responsibilities and your well-being.",
    imageSrc: "/images/5b.svg"
  },
  {
    id: 3,
    title: "Moving Forward",
    text: "The past informs us, but it doesn't define us. We focus on building a future that aligns with your values.",
    imageSrc: "/images/6b.svg"
  }
];

// Split data for layout
const ZONES_LEFT = BRAIN_ZONES.slice(0, 3);
const ZONES_BOTTOM = BRAIN_ZONES.slice(3, 6);

// --- ANIMATION VARIANTS ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { 
            staggerChildren: 0.15
        } 
    }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, x: 20 },
    visible: { 
        opacity: 1, 
        scale: 1, 
        x: 0, 
        transition: { duration: 0.8, ease: "easeOut" } 
    }
};

// --- SUB-COMPONENTS ---
const ZoneCard = ({ zone, className }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className={`flex gap-5 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 hover:shadow-xl hover:shadow-[#DD1764]/10 transition-all duration-300 h-full ${className}`}
  >
    <div className="shrink-0 mt-1">
        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/10 shadow-inner">
            {zone.icon}
        </div>
    </div>
    <div className="flex flex-col">
        <h3 className="text-2xl font-medium text-white mb-2 tracking-tight">
            {zone.title}
        </h3>
        <p className="text-gray-200 text-base leading-relaxed">
            {zone.desc}
        </p>
    </div>
  </motion.div>
);

// --- MAIN PAGE COMPONENT ---
export default function WhatMakesUsDifferentPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % NEW_ROTATING_CONTENT.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      
      {/* HERO HEADER */}
      <section className="relative z-10 pt-20 pb-8 md:pt-28 md:pb-12 px-6 text-center">
          {/* Gradient Bar */}
          <div className="w-24 h-1.5 mx-auto bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mb-8" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#eeb9ff]" />
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#eeb9ff] uppercase">
              Beyond Standard Care
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-7xl font-light text-white tracking-tight mb-6">
            What Makes Us <br />
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#eeb9ff] to-[#fff] relative inline-block">
              Different
            </span>
          </h1>

           <p className="text-base md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            We don't just offer sessions; we offer a carefully architected
            journey designed for sustainable emotional growth.
          </p>
      </section>

      {/* L-SHAPE LAYOUT SECTION */}
      <section className="relative z-10 px-6 pb-20 md:pb-32 max-w-7xl mx-auto">
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
        >
            {/* TOP ROW: Left Cards + Right Image */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8">
                
                {/* LEFT: 3 Stacked Cards (Takes up 5/12 width) */}
                <div className="lg:col-span-5 flex flex-col gap-6 justify-center">
                    {ZONES_LEFT.map((zone, i) => (
                        <ZoneCard key={i} zone={zone} />
                    ))}
                </div>

                {/* RIGHT: Illustration (Takes up 7/12 width) */}
                <div className="lg:col-span-7 flex justify-center items-center">
                    <motion.div 
                         variants={imageVariants}
                         className="relative w-full max-w-[600px] lg:max-w-none"
                    >
                        <Image
                            src="/images/brain_illustration.png"
                            alt="Conceptual illustration of the brain"
                            width={1024}
                            height={1024}
                            className="w-full h-auto object-contain mix-blend-screen invert contrast-125 opacity-90"
                            style={{ maskImage: "radial-gradient(circle at center, black 40%, transparent 70%)", WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 70%)" }}
                            priority
                        />
                    </motion.div>
                </div>
            </div>

            {/* BOTTOM ROW: 3 Horizontal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                 {ZONES_BOTTOM.map((zone, i) => (
                    <ZoneCard key={i + 3} zone={zone} /> // i+3 to keep unique keys if we needed them different
                ))}
            </div>

        </motion.div>
      </section>

      {/* --- NEW ROTATING SECTION (Replicated) --- */}
       <section className="py-20 sm:py-24 backdrop-blur-md bg-black/30 border-t border-b border-white/10 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white leading-tight">
              The Journey of <span className="font-medium italic text-[#eeb9ff]">Discovery</span>
            </h2>
          </div>

          <div className="relative min-h-[350px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50, filter: "blur(5px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -50, filter: "blur(5px)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10"
              >
                
                {/* --- IMAGE DISPLAY --- */}
                <div className="shrink-0">
                    <img 
                        src={NEW_ROTATING_CONTENT[currentIndex].imageSrc} 
                        alt={NEW_ROTATING_CONTENT[currentIndex].title}
                        className="w-64 h-64 object-contain drop-shadow-2xl" 
                    />
                </div>

                {/* --- TEXT DISPLAY --- */}
                <div className="text-center md:text-left max-w-lg">
                  <h3 className="text-3xl sm:text-4xl font-light text-white mb-6">
                    {NEW_ROTATING_CONTENT[currentIndex].title}
                  </h3>
                  <p className="text-lg text-gray-200 leading-relaxed mb-8 whitespace-pre-line">
                    {NEW_ROTATING_CONTENT[currentIndex].text}
                  </p>
                  
                  {/* Progress Indicators */}
                  <div className="flex justify-center md:justify-start gap-3">
                    {NEW_ROTATING_CONTENT.map((_, i) => (
                      <div 
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          i === currentIndex ? "w-12 bg-white" : "w-3 bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <ReadyToBook />
    </div>
  );
}
