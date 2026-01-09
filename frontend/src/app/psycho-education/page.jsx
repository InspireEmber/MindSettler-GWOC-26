"use client";

import { useRef } from "react";
import ReadyToBook from "@/components/ReadyToBook";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import {
  BookOpen,
  Brain,
  Sparkles,
  ShieldCheck,
  Users2,
  Lightbulb,
  Puzzle,
  HeartHandshake,
  ArrowRight,
  Target,
  Smile,
  Activity,
  Moon,
  MessageCircle,
  Zap
} from "lucide-react";

// --- DATA ---

const PILLARS = [
  {
    title: "Mental Literacy",
    desc: "Understanding the 'mechanics' of your mind. We break down complex concepts like the CBT Triangle (thoughts ↔ feelings ↔ behaviors) and the stress-vulnerability model into digestible insights.",
    icon: Lightbulb,
    color: "text-[#eeb9ff]",
    borderColor: "border-[#eeb9ff]/30",
    shadow: "shadow-[#eeb9ff]/20",
    delay: 0
  },
  {
    title: "Emotional Regulation",
    desc: "Moving beyond 'I feel bad'. We teach you to identify, label, and ride the wave of emotions. Learn distress tolerance skills to manage intense feelings without being overwhelmed.",
    icon: Activity,
    color: "text-[#DD1764]",
    borderColor: "border-[#DD1764]/30",
    shadow: "shadow-[#DD1764]/20",
    delay: 0.2
  },
  {
    title: "Interpersonal Dynamics",
    desc: "Relationships impact mental health. We explore attachment styles, healthy boundary setting, and assertive communication techniques to foster deeper, safer connections.",
    icon: HeartHandshake,
    color: "text-[#a855f7]",
    borderColor: "border-[#a855f7]/30",
    shadow: "shadow-[#a855f7]/20",
    delay: 0.4
  },
  {
    title: "Holistic Resilience",
    desc: "Your mind lives in a body. We integrate lifestyle factors—sleep hygiene, nutrition, and movement—as foundational pillars of psychological strength and trauma recovery.",
    icon: Target,
    color: "text-[#3b82f6]",
    borderColor: "border-[#3b82f6]/30",
    shadow: "shadow-[#3b82f6]/20",
    delay: 0.6
  }
];

const TOOLBOX_ITEMS = [
  {
    title: "Cognitive Reframing",
    desc: "Learning to catch and challenge negative thought loops (distortions) to alter your emotional response.",
    icon: Brain,
    anim: "pulse"
  },
  {
    title: "5-4-3-2-1 Grounding",
    desc: "A sensory anchoring technique to pull you out of panic spirals and back into the present moment.",
    icon: ShieldCheck,
    anim: "bounce"
  },
  {
    title: "Sleep Hygiene",
    desc: "Optimizing your biological clock (circadian rhythm) to stabilize mood and improve cognitive function.",
    icon: Moon,
    anim: "rock"
  },
  {
    title: "Assertive Communication",
    desc: "Expressing your needs clearly and respectfully without aggression or passivity.",
    icon: MessageCircle,
    anim: "shake"
  },
  {
    title: "The Emotion Wheel",
    desc: "Expanding your emotional vocabulary to pinpoint exactly what you're feeling.",
    icon: Smile,
    anim: "bounce"
  },
  {
    title: "Nervous System Regulation",
    desc: "Using breathwork and somatic exercises to shift from 'fight or flight' to 'rest and digest'.",
    icon: Zap,
    anim: "pulse"
  }
];

// --- COMPONENTS ---

const FloatingCard = ({ children, delay = 0, duration = 4, className = "" }) => {
  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const PillarCard = ({ pillar }) => {
  const floatDuration = 4 + Math.random() * 2;
  return (
    <motion.div
      animate={{ y: [0, -15, 0] }}
      transition={{
        y: { duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: pillar.delay },
      }}
      whileHover={{ scale: 1.03 }}
      className="h-full"
    >
      <div
        className={`h-full p-8 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-2xl border ${pillar.borderColor} hover:bg-white/[0.08] transition-all duration-500 group hover:${pillar.shadow} hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col`}
      >
        {/* Glow Effect */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl transition-opacity opacity-0 group-hover:opacity-100 duration-700`} />

        <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-500`}>
          <pillar.icon className={`w-8 h-8 ${pillar.color} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`} />
        </div>

        <h3 className="text-3xl font-baskervville italic text-white mb-5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-500">
          {pillar.title}
        </h3>

        <p className="text-gray-300 leading-relaxed font-redhat text-lg flex-grow opacity-90">
          {pillar.desc}
        </p>

        <div className="mt-8 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white/40 group-hover:text-white/80 transition-colors duration-500">
          <span>Explore</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

const ToolboxItem = ({ item, index }) => {
  // Randomizing float duration to avoid robotic uniformity
  const floatDuration = 3 + Math.random() * 2;
  const floatDelay = Math.random() * 2;

  const iconVariants = {
    bounce: { y: [0, -8, 0], scale: [1, 1.1, 1], transition: { duration: 0.6, repeat: Infinity } },
    pulse: { scale: [1, 1.15, 1], opacity: [1, 0.8, 1], transition: { duration: 1.5, repeat: Infinity } },
    shake: { rotate: [0, 10, -10, 0], x: [0, 2, -2, 0], transition: { duration: 0.5, repeat: Infinity } },
    rock: { rotate: [0, 15, -15, 0], transition: { duration: 2, ease: "easeInOut", repeat: Infinity } },
    spin: { rotate: 360, transition: { duration: 2, ease: "linear", repeat: Infinity } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      animate={{ y: [0, -10, 0] }}
      transition={{
        y: { duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: floatDelay },
        opacity: { duration: 0.5, delay: index * 0.1 }
      }}
      className="flex items-start gap-5 p-6 rounded-[1.5rem] bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 group shadow-lg cursor-default"
    >
      <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#DD1764]/20 to-[#DD1764]/5 flex items-center justify-center border border-[#DD1764]/20 group-hover:border-[#DD1764]/50 group-hover:shadow-[0_0_20px_rgba(221,23,100,0.4)] transition-all duration-500">
        <motion.div
          variants={iconVariants}
          animate={false}
          whileHover={item.anim}
        >
          <item.icon className="w-7 h-7 text-[#DD1764] group-hover:text-[#eeb9ff] transition-colors" />
        </motion.div>
      </div>
      <div>
        <h4 className="text-xl font-medium text-white mb-2 group-hover:text-[#eeb9ff] transition-colors font-baskervville italic">{item.title}</h4>
        <p className="text-base text-gray-200 font-redhat leading-relaxed group-hover:text-white transition-colors opacity-90">{item.desc}</p>
      </div>
    </motion.div>
  );
};

export default function PsychoEducationPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <div ref={containerRef} className="min-h-screen relative text-gray-200 overflow-x-hidden selection:bg-[#DD1764] selection:text-white">

      {/* 1. IMMERSIVE HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-12 relative inline-block group"
          >
            <div className="absolute inset-0 bg-white/20 blur-[60px] opacity-0 group-hover:opacity-40 rounded-full transition-opacity duration-1000" />
            <div className="relative z-10 p-6 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
              <Brain className="w-20 h-20 text-white/90 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]" strokeWidth={1} />
            </div>

            {/* Orbiting particles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#eeb9ff] rounded-full blur-[2px]"
                animate={{
                  rotate: 360,
                  x: [Math.cos(i * 120) * 80, Math.cos(i * 120 + 2 * Math.PI) * 80],
                  y: [Math.sin(i * 120) * 80, Math.sin(i * 120 + 2 * Math.PI) * 80],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-6xl md:text-9xl font-light text-white mb-8 tracking-tighter leading-none"
          >
            Knowledge is <br />
            <span className="font-baskervville italic text-transparent bg-clip-text bg-gradient-to-r from-[#eeb9ff] via-white to-[#eeb9ff] inline-block animate-pulse">
              Empowerment
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto font-redhat font-light leading-relaxed mb-10"
          >
            Psycho-education is the bridge between clinical insight and <span className="text-white font-medium">lived experience</span>.
            Understanding your mind is the first step toward masterfully navigating it.
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}

      </section>

      {/* 2. DEFINITION & EMPATHY */}
      <section className="relative py-32 md:py-48 z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-6 mb-10">
              <span className="h-[2px] w-16 bg-[#eeb9ff] rounded-full" />
              <span className="text-[#eeb9ff] uppercase tracking-[0.4em] text-sm font-bold">The Foundation</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-light text-white mb-10 leading-[1.1] tracking-tight">
              Decoding the <br />
              <span className="font-baskervville italic text-gray-500">Intricacies of Being</span>
            </h2>

            <div className="space-y-8 text-xl text-gray-300 font-redhat font-light leading-[1.7]">
              <p>
                Psycho-education transforms the mysterious into the manageable. By explaining the <strong className="text-white font-semibold">"why"</strong> behind your internal world, we strip away the shame often attached to mental health struggles.
              </p>
              <p className="bg-white/5 p-8 rounded-[2rem] border-l-4 border-[#eeb9ff]/40 italic">
                "Whether it's the biological roots of panic or the cognitive architecture of anxiety, knowledge provides the map. At MindSettler, we don't just treat symptoms—we share the manual for your most powerful tool: <span className="text-white">your mind</span>."
              </p>
            </div>
          </motion.div>

          {/* Creative Visual Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] w-full max-w-lg mx-auto rounded-[3.5rem] overflow-hidden border border-white/10 shadow-2xl group cursor-default"
          >
            <Image
              src="https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978720/mindsettler_assets/spark_of_awarness.jpg"
              alt="Spark of Awareness"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0220] via-transparent to-transparent opacity-80" />

            {/* Caption */}
            <div className="absolute bottom-10 left-8 right-8 text-center">
              <p className="text-white font-baskervville italic text-2xl leading-relaxed drop-shadow-lg">
                "The mind is a universe waiting to be explored."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. FOUR PILLARS GRID */}
      <section className="relative py-32 bg-black/[0.15] z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <h2 className="text-5xl md:text-7xl font-light text-white mb-8 tracking-tight">Our Core Pillars</h2>
              <div className="h-1.5 w-32 bg-gradient-to-r from-transparent via-[#DD1764] to-transparent mx-auto rounded-full" />
              <p className="mt-8 text-xl text-gray-400 font-redhat max-w-2xl mx-auto">
                A structured approach to mental well-being, combining science with compassionate guidance.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {PILLARS.map((pillar, index) => (
              <PillarCard key={index} pillar={pillar} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE TOOLBOX & BENEFITS */}
      {/* 4. THE TOOLBOX */}
      <section className="relative py-24 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-light text-white mb-6 leading-tight">
              Your Mental <br />
              <span className="text-[#DD1764] font-baskervville italic">Mastery Toolbox</span>
            </h2>
            <p className="text-gray-300 font-redhat text-xl leading-relaxed max-w-2xl mx-auto opacity-80">
              Theory is the map, but practice is the journey. We equip you with evidence-based strategies from <span className="text-white border-b border-[#DD1764]/50">CBT, DBT, and mindfulness</span> to navigate daily challenges.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLBOX_ITEMS.map((item, index) => (
              <ToolboxItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE IMPACT (Re-structured) */}
      <section className="relative py-32 bg-gradient-to-b from-transparent to-black/30 z-10">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-light text-white mb-6">The <span className="text-[#eeb9ff] font-baskervville italic">Meta-Impact</span></h2>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#eeb9ff] to-transparent mx-auto opacity-50" />
            <p className="mt-8 text-xl text-gray-400 font-redhat max-w-2xl mx-auto">
              Why psycho-education is the gold standard for sustainable emotional health.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {[
              {
                text: "Equips you with a biological early-warning system to prevent mental health spirals before they start.",
                highlight: "Prevention",
                icon: ShieldCheck
              },
              {
                text: "Strips away the clinical mystery, replacing fear and stigma with objective understanding.",
                highlight: "Validation",
                icon: Lightbulb
              },
              {
                text: "Empowers you to take agency in your own treatment, fostering lasting behavioral change.",
                highlight: "Sovereignty",
                icon: Target
              },
              {
                text: "Creates a common language for you and your support system to communicate needs clearly.",
                highlight: "Connection",
                icon: Users2
              }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  y: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: Math.random() },
                  opacity: { duration: 0.6, delay: i * 0.1 }
                }}
                whileHover={{ scale: 1.02 }}
                className="relative p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-[#eeb9ff]/30 transition-all duration-300 group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <benefit.icon className="w-24 h-24 text-[#eeb9ff] transform rotate-12" />
                </div>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-[#eeb9ff]/10 flex items-center justify-center mb-6 text-[#eeb9ff] group-hover:scale-110 transition-transform">
                    <benefit.icon size={24} />
                  </div>
                  <h4 className="text-lg font-bold uppercase tracking-widest text-white mb-4 group-hover:text-[#eeb9ff] transition-colors">{benefit.highlight}</h4>
                  <p className="text-lg text-gray-300 font-redhat leading-relaxed group-hover:text-white transition-colors">{benefit.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mt-32 max-w-4xl mx-auto p-12 rounded-[3.5rem] bg-gradient-to-tr from-[#eeb9ff]/10 via-white/[0.02] to-[#DD1764]/10 border border-white/10 text-center backdrop-blur-3xl relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />

            <p className="text-3xl md:text-5xl font-baskervville italic text-white mb-8 leading-tight px-4 shadow-black drop-shadow-lg">
              "Growth begins at the boundary of <span className="text-[#eeb9ff]">curiosity</span> and understanding."
            </p>
            <div className="flex items-center justify-center gap-4 opacity-70">
              <span className="h-px w-12 bg-white/30" />
              <cite className="text-xs uppercase tracking-[0.3em] text-[#eeb9ff] font-bold not-italic">MindSettler Wisdom</cite>
              <span className="h-px w-12 bg-white/30" />
            </div>
          </motion.div>

        </div>
      </section>

      <div className="relative z-10 bg-black/40 pt-10">
        <ReadyToBook />
      </div>

      {/* Global CSS for utilities used */}
      <style jsx global>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .shadow-3xl { box-shadow: 0 50px 100px -20px rgba(0, 0, 0, 0.7); }
        .rotateY-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}

const QuoteIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
  </svg>
);

