"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { Shield, BookOpen, UserCircle, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

// Refined Animation Variants
const revealUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-white text-[#2E2A36] selection:bg-[#3F2965] selection:text-white overflow-x-hidden w-full">
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3F2965] to-[#DD1764] origin-left z-50" style={{ scaleX }} />

      {/* 1. HERO CHAPTER: The Invitation */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-[#F6F4FA] to-white pt-16 sm:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="z-10">
            <motion.div variants={revealUp} className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-[#3F2965]/5 border border-[#3F2965]/10 text-[#3F2965] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6">
              <Sparkles size={12} className="sm:w-[14px] sm:h-[14px]" /> <span className="whitespace-nowrap">Your Journey Starts Here</span>
            </motion.div>
            
            <motion.h1 variants={revealUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light leading-[1.1] mb-6 sm:mb-8">
              Understand <span className="italic font-serif text-[#3F2965]">Your</span> Mind. <br className="hidden sm:block" />
              <span className="font-medium bg-gradient-to-r from-[#3F2965] to-[#DD1764] bg-clip-text text-transparent">Build Emotional Clarity.</span>
            </motion.h1>

            <motion.p variants={revealUp} className="text-base sm:text-lg md:text-xl text-[#5E5A6B] max-w-lg mb-8 sm:mb-10 leading-relaxed">
              Decoding the complexity of your thoughts through structured, calm, and professional psycho-education.
            </motion.p>

            <motion.div variants={revealUp} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link href="/book-session" className="px-6 sm:px-10 py-3 sm:py-4 rounded-full bg-[#3F2965] text-white font-medium hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 group min-h-[44px] text-sm sm:text-base">
                Book a Session <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/how-it-works" className="px-6 sm:px-10 py-3 sm:py-4 rounded-full border border-[#3F2965]/20 text-[#3F2965] hover:bg-[#3F2965]/5 transition-all text-center min-h-[44px] text-sm sm:text-base">
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative flex justify-center mt-8 lg:mt-0">
            <div className="relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] aspect-square bg-white rounded-full shadow-[0_0_100px_rgba(63,41,101,0.05)] flex items-center justify-center border border-[#3F2965]/5">
              <Image src="/logo.png" alt="MindSettler" width={300} height={300} className="relative z-10 p-4 sm:p-6 md:p-8 w-full h-auto" priority />
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-4 border border-dashed border-[#3F2965]/20 rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STORY CHAPTER: The Reality Check */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealUp}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-6 sm:mb-8 leading-tight">
              Mental health support shouldn't feel <span className="italic font-serif text-[#DD1764]">confusing</span>.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#5E5A6B] leading-relaxed px-2">
              We replaced complex medical jargon with <span className="text-[#3F2965] font-semibold">Structured Psycho-education</span>. 
              By understanding the "Why" behind your feelings, you gain the power to change the "How" of your life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. CORE PILLARS: Progressive Reveal Grid */}
      <section className="py-12 sm:py-16 md:py-24 bg-[#F6F4FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-8 sm:mb-12 md:mb-16">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} className="text-2xl sm:text-3xl md:text-4xl font-light">
            Our <span className="font-medium text-[#3F2965]">Approach</span>
          </motion.h2>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            { title: "Privacy First", desc: "A safe, encrypted space where your words stay between us.", icon: <Shield /> },
            { title: "Curriculum of the Mind", desc: "Structured 60-minute sessions that build your emotional vocabulary.", icon: <BookOpen /> },
            { title: "Human Guidance", desc: "Real empathy from professionals, not automated algorithms.", icon: <UserCircle /> }
          ].map((pillar, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { delay: i * 0.1 } }
              }}
              className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2.5rem] border border-[#3F2965]/5 hover:shadow-2xl transition-all group"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#3F2965]/5 flex items-center justify-center mb-6 sm:mb-8 text-[#3F2965] group-hover:bg-[#3F2965] group-hover:text-white transition-all duration-300">
                {pillar.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-4">{pillar.title}</h3>
              <p className="text-sm sm:text-base text-[#5E5A6B] leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. IMPACT CHAPTER: Split Screen Storytelling */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-20 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} className="space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight">Empowerment through <br className="hidden sm:block" /><span className="text-[#3F2965] font-medium">Knowledge</span>.</h2>
            <p className="text-base sm:text-lg text-[#5E5A6B]">You aren't just a client; you are a student of your own mind. We provide the map; you lead the journey.</p>
            <ul className="space-y-3 sm:space-y-4">
              {["Daily Emotional Toolkits", "Confidential Peer Support", "Structured Progress Tracking"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm sm:text-base font-semibold text-[#3F2965]">
                  <CheckCircle2 size={18} className="text-[#DD1764] shrink-0" /> <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative group mt-8 md:mt-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-2xl sm:rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
            <div className="relative aspect-video rounded-2xl sm:rounded-[3rem] bg-gradient-to-br from-[#3F2965] to-[#2E2A36] flex items-center justify-center p-6 sm:p-8 md:p-12 overflow-hidden shadow-2xl">
                <div className="text-center">
                  <p className="text-white/60 text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4">Your Outcome</p>
                  <p className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic">Emotional Sovereignty</p>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. VIBRANT CTA: The Finale */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }} 
          className="max-w-5xl mx-auto rounded-2xl sm:rounded-3xl md:rounded-[3.5rem] bg-gradient-to-br from-[#3F2965] to-[#DD1764] p-8 sm:p-12 md:p-16 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light mb-6 sm:mb-8 leading-tight">Ready to write your next chapter?</h2>
            <p className="text-base sm:text-lg md:text-xl opacity-90 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
              Step into a space where your mental well-being is prioritized through understanding and professional care.
            </p>
            <Link href="/book-session" className="inline-block px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-white text-[#3F2965] font-bold text-base sm:text-lg hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all min-h-[44px] flex items-center justify-center">
              Book Your First Session
            </Link>
          </div>
          {/* Subtle Decorative Circle */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        </motion.div>
      </section>
    </div>
  );
}