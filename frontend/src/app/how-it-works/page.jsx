"use client";
import ReadyToBook from "@/components/ReadyToBook";
// REMOVED: Manual Footer import (Layout footer will now be visible)

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";

// --- ⏬ EDIT THIS SECTION ⏬ ---

const ROTATING_CONTENT = [
  {
    id: 1,
    title: "Breaking the Silence",
    text: "An Awkward First Start. We're Both Humans After All.",
    imageSrc: "/images/1b.png"
  },
  {
    id: 2,
    title: "No Script Required",
    text: "Not being sure \n What to talk about.",
    imageSrc: "/images/2b.png"
  },
  {
    id: 3,
    title: "Where the Story Begins",
    text: "Having so much to talk about you dont know where to begin.",
    imageSrc: "/images/3b.png"
  }
];

// --- ⏬ UPDATE THIS SECTION FOR MAIN CARDS ⏬ ---

const STEPS = [
  {
    num: "01",
    title: "Book Your Session",
    desc: "Choose between online or offline sessions and select a convenient time slot that works for you.",
    imageSrc: "/images/ilu2.png"
  },
  {
    num: "02",
    title: "Confirmation & Preparation",
    desc: "Once your booking is confirmed, you'll receive session details and a brief guide to help you prepare.",
    imageSrc: "/images/ilu3.png"
  },
  {
    num: "03",
    title: "Attend Your Session",
    desc: "Join your structured psycho-education session in a calm, confidential environment focused on awareness.",
    imageSrc: "/images/ilu4.png"
  },
  {
    num: "04",
    title: "Reflect & Apply",
    desc: "Take time to reflect on what you've learned and apply the insights in your daily life to build emotional clarity.",
    imageSrc: "/images/ilu5.png"
  }
];

// --- ⏬ END OF EDIT SECTIONS ⏬ ---

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function HowItWorksPage() {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate logic
  useEffect(() => {
    const randomStart = Math.floor(Math.random() * ROTATING_CONTENT.length);
    setCurrentIndex(randomStart);

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ROTATING_CONTENT.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // 1. GLOBAL SCROLL FOR PARALLAX BACKGROUND
  const { scrollYProgress: globalScroll } = useScroll();
  const backgroundY = useTransform(globalScroll, [0, 1], ["0%", "-30%"]);

  // 2. TIMELINE RIBBON LOGIC
  const { scrollYProgress: timelineScroll } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(timelineScroll, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen relative text-white overflow-x-hidden selection:bg-[#DD1764] selection:text-white">
      
      {/* --- BACKGROUND LAYER --- */}
      {/* UPDATED: Changed z-0 to -z-10. This forces the background BEHIND the layout footer. */}
      <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
        
        {/* PARALLAX CONTAINER */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 w-full h-[160vh] -top-[10vh]"
        >
            <Image 
                src="/images/howback.jpg" 
                alt="Fluid Art Background"
                fill
                className="object-cover blur-[2px] opacity-60" 
                priority
            />
        </motion.div>
        
        {/* FIXED OVERLAYS */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-[1]" />
        <div className="absolute inset-0 bg-black/10 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3F2965]/20 via-transparent to-[#3F2965]/40 z-[1]" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10">

        {/* Hero Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-20 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto px-4 sm:px-6"
          >
            <motion.div
              variants={fadeInUp}
              className="h-1 w-24 bg-gradient-to-r from-white/20 via-white to-white/20 rounded-full mx-auto mb-6 sm:mb-8"
            />
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 sm:mb-8 leading-tight drop-shadow-lg"
            >
              How It <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#eeb9ff] to-[#fff]">Works</span>
            </motion.h1>
          </motion.div>
        </section>

        {/* --- TIMELINE SECTION --- */}
        <section ref={containerRef} className="relative py-12 sm:py-16 md:py-20 lg:py-24 max-w-6xl mx-auto px-4 sm:px-6">
          {/* Ribbon Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 md:-ml-0.5 h-full bg-white/10 z-0 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="w-full h-full bg-gradient-to-b from-[#bfa2ea] via-[#DD1764] to-[#bfa2ea] shadow-[0_0_15px_rgba(221,23,100,0.6)]"
            />
          </div>

          <div className="space-y-16 sm:space-y-20 md:space-y-24 relative z-10">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className={`grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Text Side */}
                <div className={`${i % 2 !== 0 ? 'md:order-2' : ''} group`}>
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <span className="text-5xl sm:text-6xl font-thin text-white/30 group-hover:text-white/60 transition-colors duration-500">{step.num}</span>
                    <div className="h-0.5 w-12 sm:w-16 bg-white/30 rounded-full" />
                  </div>
                  
                  {/* Glass Card */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 rounded-2xl shadow-xl hover:bg-white/15 transition-all duration-300">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-white mb-4 leading-tight">
                      {step.title}
                    </h2>
                    <p className="text-base sm:text-lg leading-relaxed text-gray-200">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Image Side */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`${i % 2 !== 0 ? 'md:order-1' : ''} h-64 sm:h-96 md:h-[35rem] flex items-center justify-center mt-6 md:mt-0 relative`}
                >
                  <motion.img
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    src={step.imageSrc}
                    alt={step.title}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- DYNAMIC "ALSO INCLUDES" SECTION --- */}
        <section className="py-20 sm:py-24 border-t border-white/10 overflow-hidden bg-black/10 backdrop-blur-[2px]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white leading-tight">
                A Good Therapy Session <span className="font-semibold italic text-[#ff8ac0]">Also Includes</span>
              </h2>
            </div>

            <div className="relative min-h-[400px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95, y: 10, filter: "blur(5px)" }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, y: -10, filter: "blur(5px)" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  // UPDATED: Added Glass Card Styles (bg-black/30, backdrop-blur-xl, border, shadow)
                  className="w-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                  {/* Image Display */}
                  <div className="shrink-0">
                    <img
                      src={ROTATING_CONTENT[currentIndex].imageSrc}
                      alt={ROTATING_CONTENT[currentIndex].title}
                      className="w-56 h-56 sm:w-64 sm:h-64 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                  {/* Text Display */}
                  <div className="text-center md:text-left max-w-lg">
                    <h3 className="text-3xl sm:text-4xl font-light text-white mb-6">
                      {ROTATING_CONTENT[currentIndex].title}
                    </h3>
                    <p className="text-lg text-gray-200 leading-relaxed mb-8 whitespace-pre-line">
                      {ROTATING_CONTENT[currentIndex].text}
                    </p>
                    {/* Progress Indicators */}
                    <div className="flex justify-center md:justify-start gap-3">
                      {ROTATING_CONTENT.map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 rounded-full transition-all duration-500 shadow-sm ${i === currentIndex ? "w-12 bg-white" : "w-3 bg-white/20"}`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
        
        {/* --- READY TO BOOK SECTION --- */}
        <div className="backdrop-blur-md bg-black/30 border-t border-white/10">
            <ReadyToBook />
        </div>

      </div>
    </div>
  );
}