"use client";

import ReadyToBook from "@/components/ReadyToBook";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lightbulb, Brain, Heart } from "lucide-react";
import {
  Shield,
  BookOpen,
  UserCircle,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const revealUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HomePage() {
  // 1. GLOBAL SCROLL FOR PARALLAX BACKGROUND
  const { scrollYProgress: globalScroll } = useScroll();
  const backgroundY = useTransform(globalScroll, [0, 1], ["0%", "-30%"]);

  return (
    <div className="min-h-screen relative text-white overflow-x-hidden selection:bg-[#DD1764] selection:text-white">

      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 -z-10 bg-black overflow-hidden">

        {/* PARALLAX CONTAINER */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 w-full h-[130vh] -top-[10vh]"
        >
          <Image
            src="/images/bg2.jpg"
            alt="Fluid Art Background"
            fill
            className="object-cover blur-[2px] opacity-50"
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

        {/* HERO SECTION – NO ANIMATIONS */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-32 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-14 items-center">
            {/* LEFT CONTENT */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6">
                <Sparkles size={12} className="sm:w-[14px] sm:h-[14px]" />
                <span>Your Journey Starts Here</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6 sm:mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#eeb9ff] to-[#fff] italic font-serif">
                  "It's okay to not be okay.
                  <br />
                  It's okay to ask for help."
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-200 max-w-lg leading-relaxed mb-8 sm:mb-10">
                MindSettler by Parnika is a safe space to understand your mind,
                settle emotional distress, and begin your mental well-being
                journey.
                <br />
                <br />
                <span className="font-semibold text-white text-sm sm:text-base">
                  Confidential · Non-judgmental · Guided support
                </span>
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Link
                  href="/book-session"
                  className="px-6 sm:px-10 py-3 sm:py-4 rounded-full bg-gradient-to-r from-[#3F2965] to-[#DD1764] text-white font-medium hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 group min-h-[44px]"
                >
                  Begin When You're Ready
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/how-it-works"
                  className="px-6 sm:px-10 py-3 sm:py-4 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all text-center min-h-[44px]"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center mt-8 lg:mt-0">
              <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] rounded-full bg-white/10 backdrop-blur-md shadow-[0_0_80px_rgba(63,41,101,0.3)] flex items-center justify-center border border-white/20 overflow-hidden">
                <Image
                  src="/images/hands.jpg"
                  alt="Support and care"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-3 border border-dashed border-white/30 rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* 2. STORY CHAPTER: The Reality Check */}
        <section className="py-12 sm:py-16 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-6 sm:mb-8 leading-tight px-2">
                Mental health support shouldn't feel{" "}
                <span className="italic font-serif text-[#DD1764]">
                  confusing
                </span>
                .
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed px-2">
                We replaced complex medical jargon with{" "}
                <span className="text-white font-semibold">
                  Structured Psycho-education
                </span>
                . By understanding the "Why" behind your feelings, you gain the
                power to change the "How" of your life.
              </p>
            </div>
          </div>
        </section>

        {/* PURPOSE OF MINDSETTLER */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-28 backdrop-blur-md bg-black/30 border-t border-b border-white/10 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#3F2965]/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#DD1764]/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Section Header */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealUp}
              className="text-center mb-12 sm:mb-16"
            >
              <p className="text-[10px] sm:text-xs tracking-[0.3em] font-semibold text-[#eeb9ff] uppercase mb-4">
                Our Purpose
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-white mb-6">
                The Heart of{" "}
                <span className="font-serif italic text-[#eeb9ff]">
                  MindSettler
                </span>
              </h2>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left: Purpose Description */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 shadow-xl">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                      <Lightbulb className="w-6 h-6 text-[#eeb9ff]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-white mb-2">
                        Beyond Consultation
                      </h3>
                      <p className="text-gray-200 leading-relaxed">
                        This page is not just meant for online consultation; we
                        intend to create more awareness about mental well-being
                        and psycho-education.
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-200 leading-relaxed">
                    It is a medium to spread knowledge and an easier mode to
                    connect as well as reach out for help whenever in need.
                  </p>
                </div>

                {/* Animated decorative element */}
                <motion.div
                  className="hidden sm:flex items-center justify-center gap-2 py-4"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#3F2965]" />
                  <span className="w-8 h-[2px] bg-gradient-to-r from-[#3F2965] to-[#DD1764]" />
                  <span className="w-2 h-2 rounded-full bg-[#DD1764]" />
                </motion.div>
              </motion.div>

              {/* Right: Name Meaning */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-br from-[#3F2965] to-[#DD1764] p-[1px] rounded-3xl">
                  <div className="bg-black/50 backdrop-blur-md rounded-3xl p-6 sm:p-8">
                    <h3 className="font-serif italic text-xl sm:text-2xl text-[#eeb9ff] mb-6 text-center">
                      \"MindSettler by Parnika\"
                    </h3>

                    <p className="text-gray-200 leading-relaxed mb-6 text-center">
                      An amalgamation of two interconnected aspects of mental
                      health followed by a common ground.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Mind */}
                      <motion.div
                        className="bg-white/10 rounded-2xl p-5 text-center group hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-14 h-14 mx-auto rounded-full bg-[#3F2965]/30 flex items-center justify-center mb-3 group-hover:bg-[#3F2965]/50 transition-colors">
                          <Brain className="w-7 h-7 text-[#eeb9ff]" />
                        </div>
                        <h4 className="font-semibold text-[#eeb9ff] mb-2">
                          'Mind'
                        </h4>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          Refers to a person's consciousness — not a physical but
                          a mental and emotional part.
                        </p>
                      </motion.div>

                      {/* Settler */}
                      <motion.div
                        className="bg-white/10 rounded-2xl p-5 text-center group hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-14 h-14 mx-auto rounded-full bg-[#DD1764]/30 flex items-center justify-center mb-3 group-hover:bg-[#DD1764]/50 transition-colors">
                          <Heart className="w-7 h-7 text-[#ff8ac0]" />
                        </div>
                        <h4 className="font-semibold text-[#ff8ac0] mb-2">
                          'Settler'
                        </h4>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          Refers to us assisting you to settle your mind in times
                          of distress or with any mental health issues.
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom decorative */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center mt-12 sm:mt-16"
            >
              <p className="text-gray-300 text-sm sm:text-base mb-4">
                A space where understanding meets care, and knowledge meets
                healing.
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/50" />
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
                <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-white/50" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* WE HELP YOU WITH SECTION */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Heading */}
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-3 sm:mb-4 leading-tight">
                We help you with
              </h2>
              <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto px-2">
                Gentle, guided support tailored to where you are right now.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                "Overcoming unhelpful patterns & coping habits",
                "Building confidence and self-esteem",
                "Healing from trauma",
                "Strengthening relationships & attachment",
                "Parenting and family challenges",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all min-h-[44px]"
                >
                  {/* Dot */}
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#DD1764] shrink-0" />

                  {/* Text */}
                  <p className="text-sm sm:text-base md:text-lg text-white">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THE JOURNEY SECTION – River Flow (Stable Layout) */}
        <section className="py-16 sm:py-20 md:py-28 lg:py-36 backdrop-blur-md bg-black/30 border-t border-white/10 overflow-visible">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14 sm:mb-20"
            >
              <p className="text-[10px] sm:text-xs tracking-[0.3em] font-semibold text-[#eeb9ff] uppercase mb-4">
                The Journey
              </p>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-white max-w-3xl mx-auto">
                <span className="italic font-serif">
                  "Mental health is not a destination,
                  <br />
                  but a process."
                </span>
              </h2>

              <p className="text-base sm:text-lg text-gray-200 max-w-xl mx-auto mt-6 leading-relaxed">
                We move at your pace — gently flowing forward, one moment at a
                time.
              </p>
            </motion.div>

            {/* River + Steps */}
            <div className="relative max-w-6xl mx-auto min-h-[460px] sm:min-h-[520px]">
              {/* River Path */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 1000 500"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <linearGradient
                      id="riverGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#eeb9ff" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#ff8ac0" stopOpacity="0.6" />
                      <stop
                        offset="100%"
                        stopColor="#eeb9ff"
                        stopOpacity="0.4"
                      />
                    </linearGradient>
                  </defs>

                  <motion.path
                    d="M 60 280
               C 200 220, 300 340, 420 290
               S 620 240, 740 280
               S 880 340, 960 260"
                    fill="none"
                    stroke="url(#riverGradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="14 12"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.6, ease: "easeInOut" }}
                  />
                </svg>
              </div>

              {/* Steps */}
              <div className="relative z-10 grid grid-cols-1 gap-8 sm:block">
                {[
                  {
                    step: "1",
                    title: "Arrive",
                    desc: "Come as you are. Stillness is welcome.",
                    icon: "💧",
                    // Moved slightly left and centered vertically
                    position: "sm:absolute sm:left-[2%] sm:top-[45%]",
                  },
                  {
                    step: "2",
                    title: "Settle",
                    desc: "We gently make sense of what feels heavy.",
                    icon: "🌊",
                    // Standard upward curve
                    position: "sm:absolute sm:left-[26%] sm:top-[25%]",
                  },
                  {
                    step: "3",
                    title: "Flow",
                    desc: "Steady movement with support beside you.",
                    icon: "💙",
                    // Moved left to 50% to clear space for step 4
                    position: "sm:absolute sm:left-[50%] sm:top-[48%]",
                  },
                  {
                    step: "4",
                    title: "Renew",
                    desc: "A calmer, clearer relationship with yourself.",
                    icon: "✨",
                    // Shifted right to 75% to prevent the merge
                    position: "sm:absolute sm:left-[75%] sm:top-[22%]",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.25 + 0.4 }}
                    className={`${item.position} relative`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, y: -4 }}
                      className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/20 shadow-lg hover:bg-white/20 transition-all max-w-[260px]"
                    >
                      {/* Marker */}
                      <div className="absolute -top-3 -left-3 w-11 h-11 rounded-full bg-gradient-to-br from-[#3F2965] to-[#DD1764] flex items-center justify-center text-white shadow-md">
                        <motion.span
                          animate={{ scale: [1, 1.15, 1] }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                        >
                          {item.icon}
                        </motion.span>
                      </div>

                      <div className="ml-7">
                        <span className="text-[10px] text-[#ff8ac0] font-bold uppercase tracking-wider">
                          Step {item.step}
                        </span>
                        <h4 className="font-semibold text-lg text-white mt-1 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <ReadyToBook />
      </div>
    </div>
  );
}
