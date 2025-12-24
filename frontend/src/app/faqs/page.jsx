"use client";
import Link from "next/link";
import FAQAccordion from "../../components/FAQAccordion";
import { motion } from "framer-motion";
import { MessageCircle, HelpCircle, Sparkles } from "lucide-react";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function FAQsPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-[#3F2965] selection:text-white">
      
      {/* 1. Hero Section: Reveal on Load */}
      <section className="relative bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA] py-20 md:py-32 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3F2965]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto px-6 text-center relative z-10"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3F2965]/5 border border-[#3F2965]/10 text-[#3F2965] text-xs font-bold uppercase tracking-widest mb-8">
            <HelpCircle size={14} /> Knowledge Base
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-light text-[#2E2A36] mb-8 leading-tight">
            Frequently Asked <span className="font-medium text-[#3F2965]">Questions</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-[#5E5A6B] leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about our psycho-education sessions, 
            privacy standards, and the journey toward emotional clarity.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="h-1 w-20 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto mt-10" 
          />
        </motion.div>
      </section>

      {/* 2. FAQs Content: Scroll Reveal */}
      <section className="py-20 md:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto px-6"
        >
          <div className="rounded-[2.5rem] bg-white border border-[#3F2965]/5 shadow-[0_20px_50px_rgba(63,41,101,0.03)] p-2 md:p-8">
            <FAQAccordion />
          </div>
        </motion.div>
      </section>

      {/* 3. CTA Section: Vibrant Story Ending */}
      <section className="px-6 pb-20 md:pb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#3F2965] to-[#DD1764] p-10 md:p-24 text-center text-white relative overflow-hidden shadow-2xl"
        >
          {/* Decorative Sparkle */}
          <div className="absolute top-10 left-10 opacity-20 animate-pulse">
            <Sparkles size={48} />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-light mb-6">
              Still Have Questions?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              We understand that every journey is unique. If you couldn't find your answer here, 
              reach out and let's discuss how we can support you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/contact"
                className="group px-10 py-4 rounded-full bg-white text-[#3F2965] font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageCircle size={20} className="group-hover:rotate-12 transition-transform" />
                Contact Us
              </Link>
            </div>
          </div>

          {/* Background circles for depth */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </motion.div>
      </section>
    </div>
  );
}