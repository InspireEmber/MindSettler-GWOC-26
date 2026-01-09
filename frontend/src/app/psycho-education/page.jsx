"use client";

import { useRef } from "react";
import ReadyToBook from "@/components/ReadyToBook";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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
    icon: Brain
  },
  {
    title: "5-4-3-2-1 Grounding",
    desc: "A sensory anchoring technique to pull you out of panic spirals and back into the present moment.",
    icon: ShieldCheck
  },
  {
    title: "Sleep Hygiene",
    desc: "Optimizing your biological clock (circadian rhythm) to stabilize mood and improve cognitive function.",
    icon: Moon
  },
  {
    title: "Assertive Communication",
    desc: "Expressing your needs clearly and respectfully without aggression or passivity.",
    icon: MessageCircle
  },
  {
    title: "The Emotion Wheel",
    desc: "Expanding your emotional vocabulary to pinpoint exactly what you're feeling.",
    icon: Smile
  },
  {
    title: "Nervous System Regulation",
    desc: "Using breathwork and somatic exercises to shift from 'fight or flight' to 'rest and digest'.",
    icon: Zap
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
  return (
    <FloatingCard delay={pillar.delay}>
      <div
        className={`h-full p-8 rounded-[2rem] bg-white/5 backdrop-blur-xl border ${pillar.borderColor} hover:bg-white/10 transition-all duration-300 group hover:${pillar.shadow} hover:shadow-2xl relative overflow-hidden flex flex-col`}
      >
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-[100%] transition-opacity opacity-50 group-hover:opacity-100`} />

        <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform duration-300`}>
          <pillar.icon className={`w-7 h-7 ${pillar.color}`} />
        </div>

        <h3 className="text-2xl font-medium text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
          {pillar.title}
        </h3>

        <p className="text-gray-300 leading-relaxed font-redhat text-lg flex-grow">
          {pillar.desc}
        </p>
      </div>
    </FloatingCard>
  );
};

const ToolboxItem = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-start gap-4 p-5 rounded-2xl hover:bg-white/5 transition-colors cursor-default border border-transparent hover:border-white/5"
    >
      <div className="shrink-0 w-12 h-12 rounded-full bg-[#DD1764]/10 flex items-center justify-center border border-[#DD1764]/20 mt-1">
        <item.icon className="w-6 h-6 text-[#DD1764]" />
      </div>
      <div>
        <h4 className="text-lg font-medium text-white mb-2">{item.title}</h4>
        <p className="text-sm text-gray-400 font-redhat leading-relaxed">{item.desc}</p>
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

  return (
    <div ref={containerRef} className="min-h-screen relative text-gray-200 overflow-x-hidden selection:bg-[#DD1764] selection:text-white">

      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#3F2965]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#DD1764]/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[30vw] h-[30vw] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      {/* 1. IMMERSIVE HERO */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden z-10">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <FloatingCard duration={6}>
            <div className="mb-8 relative inline-block">
              <div className="absolute inset-0 bg-[#eeb9ff] blur-3xl opacity-20 rounded-full" />
              <Brain className="w-24 h-24 text-white/90 relative z-10 mx-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" strokeWidth={1} />
            </div>
          </FloatingCard>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-8xl font-light text-white mb-6 tracking-tight leading-tight"
          >
            Knowledge is <br />
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#eeb9ff] via-white to-[#eeb9ff] animate-gradient-x">
              Empowerment
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-redhat font-light leading-relaxed"
          >
            Psycho-education transforms uncertainty into understanding. It is the bridge between scientific principles and your personal experience.
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-xs uppercase tracking-widest">Discover</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* 2. DEFINITION & EMPATHY */}
      <section className="relative py-20 md:py-32 z-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-[#eeb9ff]" />
              <span className="text-[#eeb9ff] uppercase tracking-widest text-sm font-medium">The Foundation</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-8 leading-tight">
              Decoding the <br />
              <span className="font-serif italic text-gray-400">Human Experience</span>
            </h2>
            <div className="space-y-6 text-lg text-gray-300 font-redhat font-light leading-relaxed">
              <p>
                Psycho-education empowers you by explaining the <strong>"why"</strong> behind your thoughts and feelings. It validates your experience by showing that symptoms are often adaptive responses, not character flaws.
              </p>
              <p>
                Whether it's understanding the <em>flight-or-fight</em> response in trauma or the cycle of avoidance in anxiety, knowledge gives you the leverage to create change. You move from "What's wrong with me?" to "What happened to me, and how do I heal?"
              </p>
            </div>
          </motion.div>

          {/* Compact Abstract Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] w-full max-w-md mx-auto bg-white/5 backdrop-blur-md rounded-[3rem] border border-white/10 p-2 overflow-hidden flex items-center justify-center group shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#eeb9ff]/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            {/* Animated Rings - Slower, smoother */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[350px] h-[350px] rounded-full border border-white/5 border-dashed"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-[250px] h-[250px] rounded-full border border-white/10"
            />

            <FloatingCard duration={5}>
              <div className="relative z-10 text-center p-8 bg-black/20 backdrop-blur-sm rounded-3xl border border-white/5">
                <BookOpen className="w-12 h-12 text-white mb-4 mx-auto opacity-90" />
                <h3 className="text-xl font-serif italic text-white mb-1">Clarity</h3>
                <p className="text-xs uppercase tracking-widest text-gray-400">leads to Change</p>
              </div>
            </FloatingCard>
          </motion.div>
        </div>
      </section>

      {/* 3. FOUR PILLARS GRID - FLOATING */}
      <section className="relative py-24 bg-black/20 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <h2 className="text-3xl md:text-5xl font-light text-white mb-6">Our Core Pillars</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[#DD1764] to-transparent mx-auto rounded-full" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PILLARS.map((pillar, index) => (
              <PillarCard key={index} pillar={pillar} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE TOOLBOX & BENEFITS SPLIT */}
      <section className="relative py-24 z-10">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20">

          {/* Left: The Toolbox */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-light text-white mb-6">Your Mental <span className="text-[#DD1764] font-serif italic">Toolbox</span></h2>
              <p className="text-gray-300 font-redhat text-lg leading-relaxed mb-8">
                Theory is powerful, but practice changes lives. We equip you with evidence-based strategies from CBT, DBT, and mindfulness practices.
              </p>
            </motion.div>

            <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 p-4">
              <div className="grid gap-2">
                {TOOLBOX_ITEMS.map((item, index) => (
                  <ToolboxItem key={index} item={item} index={index} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: The Transformative Benefits */}
          <div className="relative flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#eeb9ff]/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="text-right mb-12">
              <h2 className="text-3xl md:text-4xl font-light text-white mb-4">The <span className="text-[#eeb9ff] font-serif italic">Impact</span></h2>
              <p className="text-gray-400 font-redhat text-lg max-w-md ml-auto">
                Why psycho-education is a critical component of modern effective therapy.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { text: "Reduces relapse rates by equipping you with early warning signs.", highlight: "Prevention" },
                { text: "Diminishes the fear and stigma surrounding intense emotions.", highlight: "Validation" },
                { text: "Increases adherence to treatment plans through clear reasoning.", highlight: "Commitment" },
                { text: "Builds a shared vocabulary for better communication with loved ones.", highlight: "Connection" }
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex items-center justify-end gap-6 group"
                >
                  <div className="text-right">
                    <span className="block text-xs uppercase tracking-widest text-[#DD1764] mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">{benefit.highlight}</span>
                    <p className="text-lg text-gray-300 font-redhat group-hover:text-white transition-colors">{benefit.text}</p>
                  </div>
                  <div className="shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#eeb9ff]/20 group-hover:border-[#eeb9ff]/40 transition-all duration-300 shadow-lg">
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </div>
                </motion.div>
              ))}
            </div>

            <FloatingCard delay={1} duration={6}>
              <div className="mt-16 p-8 rounded-[2rem] bg-gradient-to-r from-[#eeb9ff]/10 to-[#DD1764]/10 border border-white/10 text-center backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#eeb9ff] to-[#DD1764]" />
                <QuoteIcon className="w-8 h-8 text-white/50 mx-auto mb-4" />
                <p className="text-xl font-serif italic text-white mb-4 leading-relaxed">"Healing begins when we replace judgement with curiosity."</p>
                <cite className="text-sm uppercase tracking-widest text-[#eeb9ff] not-italic opacity-80">MindSettler Wisdom</cite>
              </div>
            </FloatingCard>
          </div>
        </div>
      </section>

      <ReadyToBook />
    </div>
  );
}

const QuoteIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
  </svg>
);
