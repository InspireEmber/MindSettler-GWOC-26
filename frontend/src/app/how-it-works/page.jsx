"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
// Removed unused icon imports
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

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
    desc: "Choose between online or offline sessions and select a convenient  time slot that works for you.",
    // PASTE YOUR IMAGE LINK HERE
    imageSrc: "/images/ilu2.png" 
  },
  {
    num: "02",
    title: "Confirmation & Preparation",
    desc: "Once your booking is confirmed, you'll receive session details and a brief guide to help you prepare.",
    // Placeholder - replace with your image
    imageSrc: "/images/ilu3.png" 
  },
  {
    num: "03",
    title: "Attend Your Session",
    desc: "Join your structured psycho-education session in a calm, confidential environment focused on awareness.",
    // Placeholder - replace with your image
    imageSrc: "/images/ilu4.png" 
  },
  {
    num: "04",
    title: "Reflect & Apply",
    desc: "Take time to reflect on what you've learned and apply the insights in your daily life to build emotional clarity.",
    // Placeholder - replace with your image
    imageSrc: "/images/ilu5.png" 
  }
];

// --- ⏫ END OF EDIT SECTIONS ⏫ ---

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

  // Scroll Ribbon Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-white text-[#5E5A6B] overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA] py-12 sm:py-16 md:py-20 lg:py-32 text-center">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto px-4 sm:px-6"
        >
          <motion.div 
            variants={fadeInUp}
            className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto mb-4 sm:mb-6" 
          />
          <motion.h1 
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#2E2A36] mb-4 sm:mb-6 leading-tight"
          >
            How It <span className="font-medium text-[#3F2965]">Works</span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-base sm:text-lg md:text-xl px-2"
          >
            A simple, structured journey toward emotional clarity and mental well-being.
          </motion.p>
        </motion.div>
      </section>

      {/* --- TIMELINE SECTION --- */}
      <section ref={containerRef} className="relative py-12 sm:py-16 md:py-20 lg:py-24 max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Ribbon Line */}
        <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 md:-ml-0.5 h-full bg-[#E9E6F2] z-0 rounded-full overflow-hidden">
          <motion.div 
            style={{ scaleY, transformOrigin: "top" }}
            className="w-full h-full bg-gradient-to-b from-[#3F2965] via-[#DD1764] to-[#3F2965]"
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
              <div className={i % 2 !== 0 ? 'md:order-2' : ''}>
                 <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 bg-white w-fit pr-4 py-1">
                  <span className="text-4xl sm:text-5xl font-light text-[#3F2965]/20">{step.num}</span>
                  <div className="h-1 w-12 sm:w-16 bg-[#3F2965] rounded-full" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2E2A36] mb-4 sm:mb-6 leading-tight pl-2">
                  {step.title}
                </h2>
                <p className="text-base sm:text-lg leading-relaxed pl-2 bg-white/80 backdrop-blur-sm rounded-lg">{step.desc}</p>
              </div>
              
              {/* Image Side (Replaced Icons with Illustration) */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className={`${i % 2 !== 0 ? 'md:order-1' : ''} h-56 sm:h-72 md:h-96 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#E9E6F2] to-[#F6F4FA] flex items-center justify-center mt-6 md:mt-0 shadow-sm relative border-4 border-white overflow-hidden`}
              >
                {/* Connection Dot */}
                <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#DD1764] rounded-full border-2 border-white z-20 transition-transform duration-500
                  ${i % 2 === 0 ? '-left-[3.25rem]' : '-right-[3.25rem]'} 
                `} />

                {/* THE ILLUSTRATION IMAGE */}
                <motion.img 
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  src={step.imageSrc}
                  alt={step.title}
                  // 'object-contain' ensures the whole image is seen. 'p-6' gives it breathing room.
                  className="w-full h-full object-contain p-6 sm:p-10"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- DYNAMIC "ALSO INCLUDES" SECTION (Local Images) --- */}
      <section className="py-20 sm:py-24 bg-[#F6F4FA] border-t border-b border-[#3F2965]/5 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2E2A36] leading-tight">
              A Good Therapy Session <span className="font-medium italic text-[#DD1764]">Also Includes</span>
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
                className="w-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20"
              >
                
                {/* --- IMAGE DISPLAY --- */}
                <div className="shrink-0">
                    <img 
                        src={ROTATING_CONTENT[currentIndex].imageSrc} 
                        alt={ROTATING_CONTENT[currentIndex].title}
                        // Added object-contain so your local images fit nicely without cropping
                        className="w-64 h-64 object-contain drop-shadow-2xl" 
                    />
                </div>

                {/* --- TEXT DISPLAY --- */}
                <div className="text-center md:text-left max-w-lg">
                  <h3 className="text-3xl sm:text-4xl font-light text-[#2E2A36] mb-6">
                    {ROTATING_CONTENT[currentIndex].title}
                  </h3>
                  <p className="text-lg text-[#5E5A6B] leading-relaxed mb-8 whitespace-pre-line">
                    {ROTATING_CONTENT[currentIndex].text}
                  </p>
                  
                  {/* Progress Indicators */}
                  <div className="flex justify-center md:justify-start gap-3">
                    {ROTATING_CONTENT.map((_, i) => (
                      <div 
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          i === currentIndex ? "w-12 bg-[#3F2965]" : "w-3 bg-[#3F2965]/20"
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

      {/* Final CTA */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[#F6F4FA]/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#3F2965] to-[#2E2A36] p-10 sm:p-12 md:p-20 text-center text-white shadow-2xl shadow-[#3F2965]/30"
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -top-24 -right-24 w-80 h-80 bg-[#DD1764]/15 rounded-full blur-[80px]" 
            />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#3F2965]/40 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 sm:mb-6 leading-tight">
                Ready to Start?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 leading-relaxed px-2">
                Book your first session and take the first step toward understanding your mind.
              </p>
              <Link href="/book-session">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-white text-[#3F2965] font-medium text-base sm:text-lg hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)] min-h-[44px]"
                >
                  Book Your First Session
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}