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
    <div className="min-h-screen relative overflow-x-hidden">
      
      {/* 1. Hero Section: Reveal on Load */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-24 overflow-hidden text-center z-10">
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto px-6 relative z-10"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[#eeb9ff] text-xs font-bold uppercase tracking-widest mb-8">
            <HelpCircle size={14} /> Knowledge Base
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-light text-white mb-8 leading-tight">
            Frequently Asked <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#eeb9ff] to-[#fff]">Questions</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
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
      <section className="py-20 md:py-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto px-6"
        >
          <div className="rounded-[2.5rem] bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-2 md:p-8">
            <FAQAccordion />
          </div>
        </motion.div>
      </section>

      {/* 3. CTA Section: Vibrant Story Ending */}
      <section className="px-6 pb-20 md:pb-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-white/5 backdrop-blur-md border border-white/10 p-10 md:p-24 text-center text-white shadow-2xl shadow-[#3F2965]/20"
        >
          {/* Decorative Brand Accents */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#DD1764]/20 rounded-full blur-[80px]" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#3F2965]/40 rounded-full blur-[80px]" />

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
                className="group px-10 py-4 rounded-full bg-white text-[#3F2965] font-bold text-lg hover:shadow-xl hover:shadow-white/10 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageCircle size={20} className="group-hover:rotate-12 transition-transform" />
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
