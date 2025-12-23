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
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-b from-[#F6F4FA] to-white pt-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div
              variants={revealUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3F2965]/5 border border-[#3F2965]/10 text-[#3F2965] text-xs font-bold uppercase tracking-widest mb-6"
            >
              <Sparkles size={14} /> Your Journey Starts Here
            </motion.div>

            {/* QUOTE */}
            <motion.h1
              variants={revealUp}
              className="text-4xl md:text-5xl font-light leading-tight mb-8"
            >
              <span className="text-[#3F2965] italic font-serif">
                “It’s okay to not be okay.
                <br />
                It’s okay to ask for help.”
              </span>
            </motion.h1>

            {/* SUPPORTING TEXT */}
            <motion.p
              variants={revealUp}
              className="text-lg text-[#5E5A6B] max-w-lg leading-relaxed mb-10"
            >
              MindSettler by Parnika is a safe space to understand your mind,
              settle emotional distress, and begin your mental well-being
              journey.
              <br />
              <br />
              <span className="font-semibold text-[#3F2965]">
                Confidential · Non-judgmental · Guided support
              </span>
            </motion.p>

            {/* CTA */}
            <motion.div variants={revealUp} className="flex flex-wrap gap-4">
              <Link
                href="/book-session"
                className="px-10 py-4 rounded-full bg-[#3F2965] text-white font-medium hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 group"
              >
                Begin When You’re Ready
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <Link
                href="/how-it-works"
                className="px-10 py-4 rounded-full border border-[#3F2965]/20 text-[#3F2965] hover:bg-[#3F2965]/5 transition-all"
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
            className="flex justify-center"
          >
            <div className="relative w-[320px] h-[320px] md:w-[380px] md:h-[380px] rounded-full bg-white shadow-[0_0_80px_rgba(63,41,101,0.08)] flex items-center justify-center border border-[#3F2965]/10 overflow-hidden">
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
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealUp}
          >
            <h2 className="text-3xl md:text-5xl font-light mb-8">
              Mental health support shouldn't feel{" "}
              <span className="italic font-serif text-[#DD1764]">
                confusing
              </span>
              .
            </h2>
            <p className="text-lg md:text-xl text-[#5E5A6B] leading-relaxed">
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
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-[#2E2A36] mb-4">
              We help you with
            </h2>
            <p className="text-lg text-[#5E5A6B] max-w-2xl mx-auto">
              Gentle, guided support tailored to where you are right now.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Overcoming unhelpful patterns & coping habits",
              "Building confidence and self-esteem",
              "Healing from trauma",
              "Strengthening relationships & attachment",
              "Parenting and family challenges",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 px-8 py-6 rounded-2xl bg-[#F9F7FC] border border-[#3F2965]/10 hover:shadow-md transition-all"
              >
                {/* Dot */}
                <span className="w-3 h-3 rounded-full bg-[#DD1764]" />

                {/* Text */}
                <p className="text-[#2E2A36] text-base md:text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE PILLARS: Progressive Reveal Grid */}
      <section className="py-24 bg-[#F6F4FA]">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealUp}
            className="text-3xl md:text-4xl font-light"
          >
            Our <span className="font-medium text-[#3F2965]">Approach</span>
          </motion.h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
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

      {/* THE JOURNEY SECTION */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <p className="text-xs tracking-[0.3em] font-semibold text-[#3F2965] uppercase">
              The Journey
            </p>

            <h2 className="text-4xl md:text-5xl font-light leading-tight text-[#2E2A36]">
              <span className="italic font-serif">
                “Mental health is not a destination,
                <br />
                but a process.”
              </span>
            </h2>

            <p className="text-lg text-[#5E5A6B] max-w-xl leading-relaxed">
              We move at your pace: noticing, naming, and gently settling what
              feels heavy. Each session is a calm step forward.
            </p>

            {/* FIRST SESSION CARD */}
            <div className="bg-white rounded-3xl p-8 border border-[#3F2965]/10 shadow-sm max-w-xl">
              <h3 className="font-semibold text-[#3F2965] mb-3">
                Your first session
              </h3>
              <p className="text-[#2E2A36] mb-4 leading-relaxed">
                A safe starting point to meet your guide, ease any nerves, and
                set the rhythm that feels right for you.
              </p>
              <p className="text-sm font-medium text-[#3F2965]">
                <span className="text-[#DD1764]">●</span> Calm introductions
                &nbsp;·&nbsp; No pressure &nbsp;·&nbsp; Shared next steps
              </p>
            </div>
          </motion.div>

          {/* RIGHT STEPS */}
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Arrive",
                desc: "Bring whatever you’re holding. Silence is okay too.",
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
                className="bg-white rounded-3xl p-8 border border-[#3F2965]/10 shadow-sm flex items-start justify-between hover:shadow-md transition-all"
              >
                <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-full bg-[#ECEAF2] flex items-center justify-center font-semibold text-[#3F2965]">
                    {item.step}
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg text-[#2E2A36] mb-2">
                      {item.title}
                    </h4>
                    <p className="text-[#5E5A6B] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <span className="w-3 h-3 rounded-full bg-[#DD1764] mt-2" />
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-4xl md:text-6xl font-light mb-8">
              Ready to write your next chapter?
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Step into a space where your mental well-being is prioritized
              through understanding and professional care.
            </p>
            <Link
              href="/book-session"
              className="inline-block px-12 py-5 rounded-full bg-white text-[#3F2965] font-bold text-lg hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all"
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
