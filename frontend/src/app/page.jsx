"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
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
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-white text-[#2E2A36] overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3F2965] to-[#DD1764] origin-left z-50"
        style={{ scaleX }}
      />

      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-b from-[#F6F4FA] to-white pt-16 sm:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-14 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div
              variants={revealUp}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-[#3F2965]/5 border border-[#3F2965]/10 text-[#3F2965] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6"
            >
              <Sparkles size={12} className="sm:w-[14px] sm:h-[14px]" /> <span className="whitespace-nowrap">Your Journey Starts Here</span>
            </motion.div>

            {/* QUOTE */}
            <motion.h1
              variants={revealUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6 sm:mb-8"
            >
              <span className="text-[#3F2965] italic font-serif">
                "It's okay to not be okay.
                <br />
                It's okay to ask for help."
              </span>
            </motion.h1>

            {/* SUPPORTING TEXT */}
            <motion.p
              variants={revealUp}
              className="text-base sm:text-lg text-[#5E5A6B] max-w-lg leading-relaxed mb-8 sm:mb-10"
            >
              MindSettler by Parnika is a safe space to understand your mind,
              settle emotional distress, and begin your mental well-being
              journey.
              <br />
              <br />
              <span className="font-semibold text-[#3F2965] text-sm sm:text-base">
                Confidential · Non-judgmental · Guided support
              </span>
            </motion.p>

            {/* CTA */}
            <motion.div variants={revealUp} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/book-session"
                className="px-6 sm:px-10 py-3 sm:py-4 rounded-full bg-[#3F2965] text-white font-medium hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 group min-h-[44px] text-sm sm:text-base"
              >
                Begin When You're Ready
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <Link
                href="/how-it-works"
                className="px-6 sm:px-10 py-3 sm:py-4 rounded-full border border-[#3F2965]/20 text-[#3F2965] hover:bg-[#3F2965]/5 transition-all text-center min-h-[44px] text-sm sm:text-base"
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center mt-8 lg:mt-0"
          >
            <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] rounded-full bg-white shadow-[0_0_80px_rgba(63,41,101,0.08)] flex items-center justify-center border border-[#3F2965]/10 overflow-hidden">
              <Image
                src="/images/hands.jpg"
                alt="Support and care"
                fill
                className="object-cover"
                priority
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-3 border border-dashed border-[#3F2965]/20 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STORY CHAPTER: The Reality Check */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealUp}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-6 sm:mb-8 leading-tight px-2">
              Mental health support shouldn't feel{" "}
              <span className="italic font-serif text-[#DD1764]">
                confusing
              </span>
              .
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#5E5A6B] leading-relaxed px-2">
              We replaced complex medical jargon with{" "}
              <span className="text-[#3F2965] font-semibold">
                Structured Psycho-education
              </span>
              . By understanding the "Why" behind your feelings, you gain the
              power to change the "How" of your life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WE HELP YOU WITH SECTION */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Heading */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2E2A36] mb-3 sm:mb-4 leading-tight">
              We help you with
            </h2>
            <p className="text-base sm:text-lg text-[#5E5A6B] max-w-2xl mx-auto px-2">
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
                className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl bg-[#F9F7FC] border border-[#3F2965]/10 hover:shadow-md transition-all min-h-[44px]"
              >
                {/* Dot */}
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#DD1764] shrink-0" />

                {/* Text */}
                <p className="text-sm sm:text-base md:text-lg text-[#2E2A36]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE PILLARS: Progressive Reveal Grid */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#F6F4FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-12 md:mb-16">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealUp}
            className="text-2xl sm:text-3xl md:text-4xl font-light"
          >
            Our <span className="font-medium text-[#3F2965]">Approach</span>
          </motion.h2>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: "Privacy First",
              desc: "A safe, encrypted space where your words stay between us.",
              icon: <Shield />,
            },
            {
              title: "Curriculum of the Mind",
              desc: "Structured 60-minute sessions that build your emotional vocabulary.",
              icon: <BookOpen />,
            },
            {
              title: "Human Guidance",
              desc: "Real empathy from professionals, not automated algorithms.",
              icon: <UserCircle />,
            },
          ].map((pillar, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { delay: i * 0.1 } },
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

      {/* THE JOURNEY SECTION */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6 sm:space-y-8"
          >
            <p className="text-[10px] sm:text-xs tracking-[0.3em] font-semibold text-[#3F2965] uppercase">
              The Journey
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-[#2E2A36]">
              <span className="italic font-serif">
                "Mental health is not a destination,
                <br />
                but a process."
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#5E5A6B] max-w-xl leading-relaxed">
              We move at your pace: noticing, naming, and gently settling what
              feels heavy. Each session is a calm step forward.
            </p>

            {/* FIRST SESSION CARD */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#3F2965]/10 shadow-sm max-w-xl">
              <h3 className="font-semibold text-[#3F2965] mb-3 text-base sm:text-lg">
                Your first session
              </h3>
              <p className="text-sm sm:text-base text-[#2E2A36] mb-4 leading-relaxed">
                A safe starting point to meet your guide, ease any nerves, and
                set the rhythm that feels right for you.
              </p>
              <p className="text-xs sm:text-sm font-medium text-[#3F2965]">
                <span className="text-[#DD1764]">●</span> Calm introductions
                &nbsp;·&nbsp; No pressure &nbsp;·&nbsp; Shared next steps
              </p>
            </div>
          </motion.div>

          {/* RIGHT STEPS */}
          <div className="space-y-4 sm:space-y-6 mt-8 lg:mt-0">
            {[
              {
                step: "1",
                title: "Arrive",
                desc: "Bring whatever you're holding. Silence is okay too.",
              },
              {
                step: "2",
                title: "Settle",
                desc: "We co-create a calm plan for what matters most to you now.",
              },
              {
                step: "3",
                title: "Continue",
                desc: "Gentle check-ins, paced growth, and support between milestones.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#3F2965]/10 shadow-sm flex items-start justify-between hover:shadow-md transition-all"
              >
                <div className="flex gap-4 sm:gap-5 flex-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#ECEAF2] flex items-center justify-center font-semibold text-[#3F2965] shrink-0 text-sm sm:text-base">
                    {item.step}
                  </div>

                  <div className="flex-1">
                    <h4 className="font-semibold text-base sm:text-lg text-[#2E2A36] mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm sm:text-base text-[#5E5A6B] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#DD1764] mt-2 shrink-0 ml-2" />
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light mb-6 sm:mb-8 leading-tight px-2">
              Ready to write your next chapter?
            </h2>
            <p className="text-base sm:text-lg md:text-xl opacity-90 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
              Step into a space where your mental well-being is prioritized
              through understanding and professional care.
            </p>
            <Link
              href="/book-session"
              className="inline-flex px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-white text-[#3F2965] font-bold text-base sm:text-lg hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all min-h-[44px] items-center justify-center"
            >
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
