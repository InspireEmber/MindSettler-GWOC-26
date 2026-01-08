"use client";
import Link from "next/link";
import FAQAccordion from "../../components/FAQAccordion";
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
      <section className="relative pt-24 pb-8 md:pt-32 md:pb-10 overflow-hidden text-center z-10">

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl mx-auto px-6 relative z-10"
        >
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

          <motion.div
            variants={fadeInUp}
            className="h-1 w-20 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto mt-10"
          />
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

      {/* 3. CTA Section: Vibrant Story Ending */}
      <section className="px-6 pb-16 md:pb-24 relative z-10">
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
            <h2 className="text-3xl md:text-5xl font-serif italic mb-6 text-white">
              Still seeking clarity?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed font-light font-redhat">
              "Your journey is unique, and your questions deserve thoughtful answers.
              We are here to listen and guide you."
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="group px-10 py-4 rounded-full bg-white text-[#3F2965] font-serif font-bold text-lg hover:shadow-xl hover:shadow-white/10 transition-all flex items-center justify-center gap-2 active:scale-95"
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
