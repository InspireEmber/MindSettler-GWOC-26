"use client";

import { useSpring } from "framer-motion";
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
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const opacity = useTransform(smoothY, [0, 500], [0.8, 0]);
  const scale = useTransform(smoothY, [0, 500], [1, 1.1]);
  const blur = useTransform(smoothY, [0, 500], [0, 10]);

  return (
    <div className="relative overflow-x-hidden">

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10">

        {/* HERO SECTION – VIDEO BACKGROUND */}
        <section className="relative min-h-[70vh] lg:min-h-[100vh] flex items-center overflow-hidden">
          {/* Background Video Layer */}
          <motion.div
            style={{ opacity, scale, filter: `blur(${blur}px)` }}
            className="absolute inset-0 z-0 bg-[#0b0220]"
          >
            <motion.video
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/herosect.mp4" type="video/mp4" />
            </motion.video>
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
                  className="px-8 py-4 rounded-full bg-[#4a313e]/60 backdrop-blur-md text-white font-medium hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2 group shadow-xl ring-1 ring-inset ring-white/10"
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

        {/* PURPOSE OF MINDSETTLER */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden">
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
                <motion.div 
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 shadow-xl cursor-default"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                  transition={{ duration: 0.3 }}
                >
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
                </motion.div>

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
                <div>
                    <h3 className="font-serif italic text-xl sm:text-2xl text-[#eeb9ff] mb-6 text-center">
                      "MindSettler by Parnika"
                    </h3>

                    <p className="text-gray-200 leading-relaxed mb-6 text-center">
                      MindSettler by Parnika is an amalgamation of two interconnected aspects of mental
                      health followed by a common ground.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Mind */}
                      <motion.div
                        className="bg-white/10 rounded-2xl p-5 text-center group hover:bg-white/20 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-14 h-14 mx-auto rounded-full bg-[#3F2965]/30 flex items-center justify-center mb-3 group-hover:bg-[#3F2965]/50 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(63,41,101,0.6)] transition-all duration-300">
                          <Brain className="w-7 h-7 text-[#eeb9ff] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h4 className="font-semibold text-[#eeb9ff] mb-2 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                          'Mind'
                        </h4>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          'Mind' refers to a person’s consciousness which is not a physical but
                          a mental and emotional part.
                        </p>
                      </motion.div>

                      {/* Settler */}
                      <motion.div
                        className="bg-white/10 rounded-2xl p-5 text-center group hover:bg-white/20 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-14 h-14 mx-auto rounded-full bg-[#DD1764]/30 flex items-center justify-center mb-3 group-hover:bg-[#DD1764]/50 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(221,23,100,0.6)] transition-all duration-300">
                          <Heart className="w-7 h-7 text-[#ff8ac0] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h4 className="font-semibold text-[#ff8ac0] mb-2 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                          'Settler'
                        </h4>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          'Settler' refers to us assisting you to settle your mind in times
                          of distress or with any other mental health issues you may face.
                        </p>
                      </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

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
        <ReadyToBook />
      </div>
    </div>
  );
}
