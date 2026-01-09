"use client";
import ReadyToBook from "@/components/ReadyToBook";
import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  ShieldCheck,
  LayoutGrid,
  Lock,
  Sprout,
  Lightbulb,
  Heart
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";

// --- DATA ---
const BRAIN_ZONES = [
  {
    title: "Confidential Space",
    desc: "Strict ethical standards ensuring your story remains private and protected.",
    icon: Lock,
    color: "#FF69B4",
  },
  {
    title: "Growth",
    desc: "Moving forward on your journey, tracking progress by life satisfaction.",
    icon: Sprout,
    color: "#E069FF",
  },
  {
    title: "Human Connection",
    desc: "Real empathy from dedicated professionals, bridging technology with healing presence.",
    icon: Heart,
    color: "#FF69B4",
  },
  {
    title: "Self-Understanding",
    desc: "Unlocking the 'why' behind behaviors to empower deep, lasting transformation.",
    icon: Lightbulb,
    color: "#E069FF",
  },
  {
    title: "Emotional Safety",
    desc: "A judgment-free zone for fearless expression and unconditional validation.",
    icon: ShieldCheck,
    color: "#FF69B4",
  },
  {
    title: "Structured Thinking",
    desc: "Turning chaos into clarity with organized sessions and actionable pathways.",
    icon: LayoutGrid,
    color: "#E069FF",
  },
];

const NEW_ROTATING_CONTENT = [
  {
    id: 1,
    title: "Understanding Deeper",
    text: "Sometimes words aren't enough. We look beyond the surface to understand what your mind is truly asking for.",
    imageSrc: "https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978641/mindsettler_assets/4b.svg"
  },
  {
    id: 2,
    title: "Finding Balance",
    text: "Life is a balancing act. We help you find the equilibrium between your responsibilities and your well-being.",
    imageSrc: "https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978645/mindsettler_assets/5b.svg"
  },
  {
    id: 3,
    title: "Moving Forward",
    text: "The past informs us, but it doesn't define us. We focus on building a future that aligns with your values.",
    imageSrc: "https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978648/mindsettler_assets/6b.svg"
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
    className={`relative overflow-hidden p-6 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:bg-white/10 hover:border-white transition-all duration-300 h-full group flex flex-col ${className}`}
    style={{ '--hover-color': zone.color }}
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-white/10 transition-colors" />

    <div className="relative z-10 flex flex-col gap-4">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
        <zone.icon
          className="w-6 h-6 text-white/50 transition-colors duration-300 group-hover:text-[var(--hover-color)] group-hover:drop-shadow-[0_0_8px_var(--hover-color)]"
          strokeWidth={1.5}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold text-white tracking-wide group-hover:text-white group-hover:drop-shadow-[0_0_15px_var(--hover-color)] transition-all">
          {zone.title}
        </h3>
        <p className="text-gray-300 text-base leading-relaxed font-light font-redhat">
          {zone.desc}
        </p>
      </div>
    </div>
  </motion.div>
);

// --- MAIN PAGE COMPONENT ---
export default function WhatMakesUsDifferentPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const brainRef = useRef(null);
  const isBrainInView = useInView(brainRef, { amount: 1, once: true });

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
      <section className="relative z-10 pt-20 pb-8 md:pt-20 md:pb-12 px-6 text-center">
        {/* Gradient Bar (Updated to match 'How It Works' style) */}
        <div className="h-1 w-24 bg-gradient-to-r from-white/20 via-white to-white/20 rounded-full mx-auto mb-8" />

        <h1 className="text-3xl md:text-5xl lg:text-7xl font-light text-white tracking-tight mb-6">
          What Makes Us <br />
          <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#eeb9ff] to-[#fff] relative inline-block pr-3 pb-1">
            Different
          </span>
        </h1>

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
                src="https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978668/mindsettler_assets/brain_illustration.jpg"
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
              ref={brainRef}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative w-full h-full"
            >
              <Image
                src="https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978668/mindsettler_assets/brain_illustration.jpg"
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
                  animate={isBrainInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />

                {/* Card */}
                <motion.div
                  className="absolute top-1/2 left-1/2 z-20 flex items-center justify-center p-0"
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                  animate={isBrainInView ? { opacity: 1, x: x - (cardWidth / 2), y: y - (cardHeight / 2), scale: 1 } : { opacity: 0, x: 0, y: 0, scale: 0.5 }}
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
      <section className="py-20 sm:py-24 overflow-hidden">
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
                  <p className="text-lg text-gray-200 leading-relaxed mb-8 whitespace-pre-line font-redhat">
                    {NEW_ROTATING_CONTENT[currentIndex].text}
                  </p>

                  {/* Progress Indicators */}
                  <div className="flex justify-center md:justify-start gap-3">
                    {NEW_ROTATING_CONTENT.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? "w-12 bg-white" : "w-3 bg-white/20"
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
