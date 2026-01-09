"use client";
import Link from "next/link";
import FAQAccordion from "../../components/FAQAccordion";
import ReadyToBook from "../../components/ReadyToBook";
import { motion } from "framer-motion";
import { MessageCircle, HelpCircle, Sparkles } from "lucide-react";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

export default function FAQsPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">

      {/* 1. Hero Section: Reveal on Load */}
      <section className="relative pt-24 pb-8 md:pt-20 md:pb-10 overflow-hidden text-center z-10">

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto px-6 relative z-10"
        >
          <motion.div
            variants={fadeInUp}
            className="h-1 w-24 bg-gradient-to-r from-white/20 via-white to-white/20 rounded-full mx-auto mb-6 sm:mb-8"
          />
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
            Frequently Asked <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#eeb9ff] to-[#fff]">Questions</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-xl md:text-2xl font-serif italic text-[#eeb9ff] mb-6">
            "Welcome to a space of clarity. We are here to answer what's on your mind."
          </motion.p>

          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto font-light font-redhat">
            Everything you need to know about our psycho-education sessions,
            privacy standards, and the journey toward emotional clarity.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. FAQs Content: Scroll Reveal */}
      <section className="py-10 md:py-16 relative z-10">
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

      {/* 3. CTA Section: Standard ReadyToBook */}
      <ReadyToBook />
    </div>
  );
}
