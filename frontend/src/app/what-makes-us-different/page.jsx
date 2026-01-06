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
    desc: "A judgment-free zone for fearless expression and unconditional validation.",
    icon: <ShieldCheck className="w-6 h-6 text-[#DD1764]" />,
  },
  {
    title: "Structured Thinking",
    desc: "Turning chaos into clarity with organized sessions and actionable pathways.",
    icon: <LayoutGrid className="w-6 h-6 text-[#3F2965]" />,
  },
  {
    title: "Confidential Space",
    desc: "Strict ethical standards ensuring your story remains private and protected.",
    icon: <Lock className="w-6 h-6 text-[#DD1764]" />,
  },
  {
    title: "Growth",
    desc: "Moving forward on your journey, tracking progress by life satisfaction.",
    icon: <Sprout className="w-6 h-6 text-[#3F2965]" />,
  },
  {
    title: "Self-Understanding",
    desc: "Unlocking the 'why' behind behaviors to empower deep, lasting transformation.",
    icon: <Lightbulb className="w-6 h-6 text-[#DD1764]" />,
  },
  {
    title: "Human Connection",
    desc: "Real empathy from dedicated professionals, bridging technology with healing presence.",
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

// --- ANIMATION VARIANTS ---
// Note: Some variants replaced by inline definitions in new layout.
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

// --- SUB-COMPONENTS ---
const ZoneCard = ({ zone, className }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    className={`relative overflow-hidden p-6 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:bg-white/10 transition-all duration-300 h-full group ${className}`}
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        {zone.icon}
    </div>
    <div className="flex flex-col gap-3 relative z-10">
        <h3 className="text-xl font-semibold text-white tracking-wide">
            {zone.title}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed font-light">
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

      {/* CIRCULAR / ORBIT LAYOUT SECTION */}
      <section className="relative z-10 px-4 pb-20 md:pb-32 overflow-hidden">
        
        {/* MOBILE/TABLET/LAPTOP LAYOUT (< xl) */}
        <div className="xl:hidden flex flex-col gap-8 max-w-2xl mx-auto">
             <div className="flex justify-center mb-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative w-64 h-64 sm:w-80 sm:h-80"
                >
                    <Image
                        src="/images/brain_illustration.png"
                        alt="Brain Illustration"
                        width={600}
                        height={600}
                        className="object-contain mix-blend-screen invert contrast-125 opacity-90 w-full h-full"
                        style={{ maskImage: "radial-gradient(circle at center, black 40%, transparent 70%)", WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 70%)" }}
                    />
                </motion.div>
             </div>
             <div className="grid grid-cols-1 gap-6">
                {BRAIN_ZONES.map((zone, i) => (
                    <ZoneCard key={i} zone={zone} />
                ))}
            </div>
        </div>

        {/* DESKTOP ORBIT LAYOUT (>= xl) */}
        <div className="hidden xl:block relative w-full max-w-[1400px] mx-auto h-[1000px]">
             
             {/* Center Brain */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] z-10 flex items-center justify-center">
                 <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="relative w-full h-full"
                 >
                     <Image
                        src="/images/brain_illustration.png"
                        alt="Central Brain"
                        fill
                        className="object-contain mix-blend-screen invert contrast-125 opacity-90"
                        style={{ maskImage: "radial-gradient(circle at center, black 40%, transparent 70%)", WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 70%)" }}
                        priority
                     />
                     {/* Pulsing Aura */}
                     <div className="absolute inset-0 bg-[#eeb9ff]/5 blur-3xl rounded-full z-[-1] animate-pulse" />
                 </motion.div>
             </div>

             {/* Connecting Lines & Orbiting Cards */}
             {BRAIN_ZONES.map((zone, index) => {
                 const angleDeg = index * 60 - 90;
                 const angleRad = angleDeg * (Math.PI / 180);
                 const radius = 365; // px
                 const cardWidth = 300;
                 const cardHeight = 160; 
                 
                 // Calculate final position offsets for animation
                 const x = Math.cos(angleRad) * radius;
                 const y = Math.sin(angleRad) * radius;

                 return (
                    <React.Fragment key={index}>
                        {/* Connecting Line */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 h-[1px] origin-left bg-gradient-to-r from-transparent via-[#eeb9ff]/40 to-transparent z-0"
                            style={{ 
                                width: `${radius - (cardWidth / 2) + 20}px`, // Stop just inside the card visually
                                rotate: `${angleDeg}deg`,
                                x: '-0%', 
                                y: '-50%',
                            }}
                            initial={{ scaleX: 0, opacity: 0 }}
                            whileInView={{ scaleX: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        />

                        {/* Card */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 z-20 flex items-center justify-center p-0"
                            initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, x: x - (cardWidth / 2), y: y - (cardHeight / 2), scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                                duration: 0.8, 
                                delay: index * 0.1, 
                                type: "spring", 
                                stiffness: 50 
                            }}
                            style={{ width: `${cardWidth}px` }}
                        >
                            <ZoneCard 
                                zone={zone} 
                                className="" 
                            />
                        </motion.div>
                    </React.Fragment>
                 );
             })}
        </div>
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
