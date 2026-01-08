"use client";

import { useSpring } from "framer-motion";
import ReadyToBook from "@/components/ReadyToBook";
import SeamlessVideo from "@/components/SeamlessVideo";
import LatestEvent from "@/components/LatestEvent";

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
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const opacity = useTransform(smoothY, [0, 1000], [1, 0]);
  const scale = useTransform(smoothY, [0, 1000], [1, 1.1]);
  const blur = useTransform(smoothY, [0, 1000], [0, 10]);

  return (
    <div className="relative overflow-x-hidden">



      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10">

        {/* HERO SECTION – VIDEO BACKGROUND */}
        <section className="relative min-h-[70vh] lg:min-h-[100vh] flex items-center overflow-hidden">
          {/* Background Video Layer */}
          {/* Replaced standard motion.video with SeamlessVideo for gapless looping */}
          <motion.div
            style={{ opacity, scale, filter: `blur(${blur}px)` }}
            className="fixed inset-0 w-full h-full z-0 bg-[#0b0220] pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <SeamlessVideo
                src="/videos/herosec.mp4"
                className="w-full h-full"
              />
            </motion.div>
            {/* Dark/Gradient Overlay for blending */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b0220]/80 via-transparent to-[#0b0220] pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#0b0220] to-transparent pointer-events-none" />
          </motion.div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 sm:gap-16 items-center text-center pt-32 pb-16 md:pb-24 lg:pb-32">
            {/* LEFT CONTENT - QUOTE */}
            <div className="max-w-xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fff] via-[#fff] to-[#fff] italic font-serif">
                  "It's okay to not be okay.
                  <br />
                  It's okay to ask for help."
                </span>
              </h1>
            </div>

            {/* RIGHT CONTENT - DESC & BUTTONS */}
            <div className="flex flex-col gap-8">
              <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
                MindSettler by Parnika is a safe space to understand your mind,
                settle emotional distress, and begin your mental well-being
                journey.
                <br />
                <br />
                <span className="font-semibold text-white text-base sm:text-lg">
                  Confidential · Non-judgmental · Guided support
                </span>
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <Link
                  href="/book-session"
                  className="px-8 py-4 rounded-full bg-[#a167a5]/60 backdrop-blur-md text-white font-medium hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 group shadow-xl ring-1 ring-inset ring-white/10"
                >
                  Begin When You're Ready
                  <ArrowRight size={18} />
                </Link>

                <Link
                  href="/how-it-works"
                  className="px-8 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 transition-all text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PURPOSE OF MINDSETTLER - Storytelling Redesign */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          {/* Ambient Background Glows */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#3F2965]/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#DD1764]/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 relative z-10">

            {/* 1. SECTION HEADER */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20 md:mb-28"
            >
              <h2 className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight">
                The Heart of <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#eeb9ff] to-[#fff]">MindSettler</span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#eeb9ff] to-transparent mx-auto rounded-full opacity-50" />
            </motion.div>


            {/* 2. VISION CARD (Beyond Consultation) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative mb-24 md:mb-32"
            >
              <div className="text-center max-w-5xl mx-auto group relative">

                {/* The Animated Bulb (Trigger) */}
                <div className="relative w-20 h-20 mx-auto mb-10 group/bulb transition-all duration-500 peer cursor-pointer z-20">
                  <div className="absolute inset-0 bg-[#eeb9ff] rounded-full blur-3xl opacity-0 group-hover:opacity-40 group-hover:scale-150 transition-all duration-700 pointer-events-none" />

                  <div className="relative w-full h-full rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border border-[#eeb9ff]/20 shadow-[0_0_20px_rgba(238,185,255,0.1)] group-hover/bulb:border-[#eeb9ff]/60 group-hover/bulb:bg-[#eeb9ff]/20 group-hover/bulb:shadow-[0_0_50px_rgba(238,185,255,0.6)] transition-all duration-500">
                    <Lightbulb
                      className="w-10 h-10 text-[#eeb9ff] group-hover/bulb:text-white group-hover/bulb:drop-shadow-[0_0_25px_rgba(255,255,255,1)] transition-all duration-500"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Lit Content Wrapper - Reacts to Bulb Hover */}
                <div className="relative transition-all duration-1000 ease-out peer-hover:text-white peer-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">

                  {/* Ambient Light Beam Background */}
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[120%] h-[150%] bg-gradient-to-b from-white/5 to-transparent blur-3xl opacity-0 peer-hover:opacity-100 transition-opacity duration-1000 pointer-events-none -z-10" />

                  <h3 className="text-4xl md:text-6xl font-serif italic text-white/90 peer-hover:text-white mb-10 tracking-tight transition-colors duration-700">"Beyond Consultation"</h3>

                  <div className="space-y-8 text-xl md:text-3xl text-gray-300 peer-hover:text-white leading-relaxed font-light max-w-4xl mx-auto drop-shadow-sm transition-colors duration-700">
                    <p>
                      MindSettler is more than a platform for consultation—it is a <span className="text-[#eeb9ff] font-medium border-b border-[#eeb9ff]/30 pb-1 peer-hover:text-white peer-hover:border-white transition-colors">sanctuary for self-discovery</span>.
                    </p>
                    <p className="md:px-20">
                      We exist to illuminate the path back to yourself, spreading knowledge to make mental well-being accessible and free from stigma. Here, clarity is the first step toward <span className="italic font-serif text-white peer-hover:text-[#eeb9ff] transition-colors">tranquility</span>.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>


            {/* 3. THE DUALITY (Mind & Settler) */}
            <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">

              {/* Context Text */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center md:text-left space-y-8"
              >
                <h3 className="text-3xl md:text-5xl font-light text-white leading-tight">
                  <span className="block text-lg font-bold text-[#eeb9ff] uppercase tracking-widest mb-4">The Name</span>
                  Deciphering <br />
                  <span className="font-serif italic">Our Essence</span>
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed max-w-md mx-auto md:mx-0">
                  MindSettler by Parnika is an amalgamation of two interconnected aspects of human experience, bridged by a common ground of understanding.
                </p>

                {/* Decorative Line */}
                <div className="hidden md:block h-px w-32 bg-gradient-to-r from-[#eeb9ff] to-transparent mt-8" />
              </motion.div>

              {/* Cards Container */}
              <div className="grid gap-6 sm:grid-cols-2">

                {/* MIND CARD */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-gradient-to-b from-[#3F2965]/40 to-[#0b0220]/40 backdrop-blur-xl border border-[#3F2965]/30 rounded-[2.5rem] p-8 text-center shadow-xl group"
                >
                  <div className="w-20 h-20 mx-auto bg-[#3F2965]/50 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(63,41,101,0.5)] group-hover:shadow-[0_0_60px_rgba(63,41,101,0.7)] transition-all">
                    <Brain className="w-10 h-10 text-[#eeb9ff]" />
                  </div>
                  <h4 className="text-2xl font-serif italic text-white mb-4">Mind</h4>
                  <p className="text-sm text-gray-300 leading-relaxed font-light">
                    Your consciousness—the mental and emotional landscape where thoughts drift and emotions take shape.
                  </p>
                </motion.div>

                {/* SETTLER CARD */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ y: -10 }}
                  className="bg-gradient-to-b from-[#DD1764]/20 to-[#0b0220]/40 backdrop-blur-xl border border-[#DD1764]/30 rounded-[2.5rem] p-8 text-center shadow-xl mt-0 sm:mt-12 group"
                >
                  <div className="w-20 h-20 mx-auto bg-[#DD1764]/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(221,23,100,0.5)] group-hover:shadow-[0_0_60px_rgba(221,23,100,0.7)] transition-all">
                    <Heart className="w-10 h-10 text-[#ff8ac0]" />
                  </div>
                  <h4 className="text-2xl font-serif italic text-white mb-4">Settler</h4>
                  <p className="text-sm text-gray-300 leading-relaxed font-light">
                    The act of grounding. Assisting you to find balance, calm the storm, and settle in times of distress.
                  </p>
                </motion.div>

              </div>
            </div>

          </div>
        </section>

        {/* WE HELP YOU WITH SECTION */}
        {/* WE HELP YOU WITH SECTION - Floating River Design */}
        <section className="pt-10 pb-20 md:pt-12 md:pb-32 relative overflow-hidden">

          {/* Background Ambient Flow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl opacity-30 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3F2965] rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
          </div>

          <div className="max-w-5xl mx-auto px-6 relative z-10">

            {/* Heading */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.05 } }
              }}
              className="text-center mb-16 md:mb-24"
            >
              <h2 className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight tracking-tight">
                <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                  We help you
                </motion.span>{" "}
                <motion.span
                  variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
                  className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#eeb9ff] via-white to-[#eeb9ff] inline-block"
                >
                  navigate
                </motion.span>
              </h2>

              <motion.p
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1, delay: 0.5 } } }}
                className="text-lg md:text-2xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed"
              >
                Finding your anchor in the storm, and guiding you towards <span className="text-[#eeb9ff] font-medium">calmer waters</span> with gentle, tailored support.
              </motion.p>
            </motion.div>

            {/* River Flow Container */}
            <div className="relative">
              {/* Central River Line (Desktop) / Left Line (Mobile) */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2 bg-gradient-to-b from-transparent via-[#eeb9ff]/50 to-transparent" />

              <div className="space-y-8 md:space-y-12">
                {[
                  { title: "Overcoming unhelpful patterns", detail: "Breaking free from coping habits that no longer serve you." },
                  { title: "Building confidence", detail: "Strengthening your self-esteem and inner voice." },
                  { title: "Healing from trauma", detail: "Processing past wounds in a safe, paced environment." },
                  { title: "Strengthening relationships", detail: "Navigating attachment and clear communication." },
                  { title: "Parenting & family challenges", detail: "Finding balance and understanding in family dynamics." },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16`}
                  >

                    {/* The Card (Content) */}
                    <div className="flex-1 w-full pl-20 md:pl-0">
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
                        className="p-6 md:p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-[#eeb9ff]/30 hover:shadow-[0_0_30px_rgba(238,185,255,0.1)] transition-all group"
                      >
                        <h3 className="text-xl md:text-2xl font-serif text-white mb-2 group-hover:text-[#eeb9ff] transition-colors">{item.title}</h3>
                        <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed">{item.detail}</p>
                      </motion.div>
                    </div>

                    {/* The Connector Node */}
                    <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 w-4 h-4 md:w-6 md:h-6 flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-[#eeb9ff] shadow-[0_0_20px_rgba(238,185,255,0.8)] animate-pulse" />
                      <div className="absolute w-8 h-8 md:w-12 md:h-12 rounded-full border border-[#eeb9ff]/30 animate-ping opacity-20" />
                    </div>

                    {/* Empty spacer for the other side (Desktop only) */}
                    <div className="hidden md:block flex-1" />

                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </section>
        <LatestEvent />
        <ReadyToBook />
      </div>
    </div>
  );
}

