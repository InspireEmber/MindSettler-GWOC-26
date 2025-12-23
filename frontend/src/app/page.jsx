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
    <div className="min-h-screen bg-white text-[#2E2A36] selection:bg-[#3F2965] selection:text-white overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3F2965] to-[#DD1764] origin-left z-50" style={{ scaleX }} />

      {/* 1. HERO CHAPTER: The Invitation */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-[#F6F4FA] to-white pt-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="z-10">
            <motion.div variants={revealUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3F2965]/5 border border-[#3F2965]/10 text-[#3F2965] text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles size={14} /> Your Journey Starts Here
            </motion.div>
            
            <motion.h1 variants={revealUp} className="text-5xl md:text-7xl font-light leading-[1.1] mb-8">
              Understand <span className="italic font-serif text-[#3F2965]">Your</span> Mind. <br />
              <span className="font-medium bg-gradient-to-r from-[#3F2965] to-[#DD1764] bg-clip-text text-transparent">Build Emotional Clarity.</span>
            </motion.h1>

            <motion.p variants={revealUp} className="text-lg md:text-xl text-[#5E5A6B] max-w-lg mb-10 leading-relaxed">
              Decoding the complexity of your thoughts through structured, calm, and professional psycho-education.
            </motion.p>

            <motion.div variants={revealUp} className="flex flex-wrap gap-4">
              <Link href="/book-session" className="px-10 py-4 rounded-full bg-[#3F2965] text-white font-medium hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 group">
                Book a Session <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/how-it-works" className="px-10 py-4 rounded-full border border-[#3F2965]/20 text-[#3F2965] hover:bg-[#3F2965]/5 transition-all">
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative flex justify-center">
            <div className="relative w-full max-w-[500px] aspect-square bg-white rounded-full shadow-[0_0_100px_rgba(63,41,101,0.05)] flex items-center justify-center border border-[#3F2965]/5">
              <Image src="/logo.png" alt="MindSettler" width={300} height={300} className="relative z-10 p-8" priority />
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-4 border border-dashed border-[#3F2965]/20 rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STORY CHAPTER: The Reality Check */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealUp}>
            <h2 className="text-3xl md:text-5xl font-light mb-8">
              Mental health support shouldn't feel <span className="italic font-serif text-[#DD1764]">confusing</span>.
            </h2>
            <p className="text-lg md:text-xl text-[#5E5A6B] leading-relaxed">
              We replaced complex medical jargon with <span className="text-[#3F2965] font-semibold">Structured Psycho-education</span>. 
              By understanding the "Why" behind your feelings, you gain the power to change the "How" of your life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. CORE PILLARS: Progressive Reveal Grid */}
      <section className="py-24 bg-[#F6F4FA]">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} className="text-3xl md:text-4xl font-light">
            Our <span className="font-medium text-[#3F2965]">Approach</span>
          </motion.h2>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
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
              className="bg-white p-10 rounded-[2.5rem] border border-[#3F2965]/5 hover:shadow-2xl transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#3F2965]/5 flex items-center justify-center mb-8 text-[#3F2965] group-hover:bg-[#3F2965] group-hover:text-white transition-all duration-300">
                {pillar.icon}
              </div>
              <h3 className="text-2xl font-medium mb-4">{pillar.title}</h3>
              <p className="text-[#5E5A6B] leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. IMPACT CHAPTER: Split Screen Storytelling */}
      <section className="py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-light leading-tight">Empowerment through <br /><span className="text-[#3F2965] font-medium">Knowledge</span>.</h2>
            <p className="text-lg text-[#5E5A6B]">You aren't just a client; you are a student of your own mind. We provide the map; you lead the journey.</p>
            <ul className="space-y-4">
              {["Daily Emotional Toolkits", "Confidential Peer Support", "Structured Progress Tracking"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-semibold text-[#3F2965]">
                  <CheckCircle2 size={18} className="text-[#DD1764]" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
            <div className="relative aspect-video rounded-[3rem] bg-gradient-to-br from-[#3F2965] to-[#2E2A36] flex items-center justify-center p-12 overflow-hidden shadow-2xl">
                <div className="text-center">
                  <p className="text-white/60 text-sm tracking-widest uppercase mb-4">Your Outcome</p>
                  <p className="text-white text-4xl md:text-5xl font-serif italic">Emotional Sovereignty</p>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. VIBRANT CTA: The Finale */}
      <section className="py-24 md:py-32 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }} 
          className="max-w-5xl mx-auto rounded-[3.5rem] bg-gradient-to-br from-[#3F2965] to-[#DD1764] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-light mb-8">Ready to write your next chapter?</h2>
            <p className="text-lg md:text-xl opacity-90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Step into a space where your mental well-being is prioritized through understanding and professional care.
            </p>
            <Link href="/book-session" className="inline-block px-12 py-5 rounded-full bg-white text-[#3F2965] font-bold text-lg hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all">
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