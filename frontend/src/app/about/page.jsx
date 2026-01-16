"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Sparkles, Leaf, ArrowRight, LayoutGrid, Sun } from "lucide-react";
import Link from "next/link";
import ReadyToBook from "@/components/ReadyToBook";

const APPROACHES = [
  {
    title: "Structured Learning",
    desc: "Our sessions follow a structured format designed to help you understand mental health concepts in a clear, digestible way.",
  },
  {
    title: "Guided Exploration",
    desc: "Sessions are guided by professionals helping you explore thoughts in a safe, non-judgmental environment.",
  },
  {
    title: "Practical Application",
    desc: "Focus on practical tools and strategies you can apply daily to build emotional resilience.",
  },
];

const APPROACH_ITEMS = [
  {
    id: 1,
    title: "Thoughtful & Structured",
    subtitle: "A Foundation for Clarity",
    description: "Our sessions rely on a structured, evidence-based framework. We break down complex mental health concepts into clear, digestible insights, making the 'why' and 'how' of your emotions easy to understand.",
    icon: LayoutGrid,
    gradient: "from-[#3F2965] to-[#7c3aed]",
    image: "/images/bk.jpg"
  },
  {
    id: 2,
    title: "Guided Reflection",
    subtitle: "Personal Guidance with Parnika",
    description: "This isn't just about theory. It's a personally guided journey offering a safe, non-judgmental space to explore your inner world at your own pace.",
    icon: Sparkles,
    //gradient: "from-[#DD1764] to-[#ff8ac0]",
    image: "/images/refl.jpg"
  },
  {
    id: 3,
    title: "Practical Awareness",
    subtitle: "Bridging Therapy & Daily Life",
    description: "The ultimate goal is application. We equip you with practical tools to apply insights in real-time, supporting emotional balance and mindful decision-making every single day.",
    icon: Leaf,
    //gradient: "from-[#10b981] to-[#34d399]",
    image: "/images/phy.jpg"
  }
];

const ApproachAccordion = () => {
  const [activeId, setActiveId] = useState(null); // Default: None expanded, all equal

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[500px] w-full" onMouseLeave={() => setActiveId(null)}>
      {APPROACH_ITEMS.map((item) => {
        const isActive = activeId === item.id;
        const isIdle = activeId === null; // No card is being hovered

        return (
          <motion.div
            key={item.id}
            layout
            onMouseEnter={() => setActiveId(item.id)}
            className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] 
              ${isIdle ? 'lg:flex-1' : isActive ? 'lg:flex-[2]' : 'lg:flex-[0.5]'} 
            `}
            style={{ minHeight: '350px' }} // Unified height
          >
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
              <img src={item.image} alt={item.title} className={`w-full h-full object-cover transition-transform duration-700 ${isActive || isIdle ? 'scale-100 grayscale-0' : 'scale-125 grayscale opacity-50'}`} />
              <div className={`absolute inset-0 bg-gradient-to-b ${item.gradient} opacity-80 mix-blend-multiply`} />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 h-full p-6 lg:p-8 flex flex-col justify-end">

              {/* Collapsed State Visual (Only when another card is active) */}
              {!isActive && !isIdle && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hidden lg:flex flex-col items-center justify-center h-full gap-4 text-center absolute inset-0 p-4"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                    <item.icon className="text-white w-6 h-6" />
                  </div>
                  <span className="text-xl font-light text-white rotate-270 whitespace-nowrap writing-mode-vertical">{item.title}</span>
                </motion.div>
              )}

              {/* Expanded Content (Visible when Active OR Idle) */}
              <div className={`${(!isActive && !isIdle) ? 'lg:hidden' : ''} h-full flex flex-col justify-end`}>
                <div className="mb-auto hidden lg:block">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="text-xs font-bold tracking-widest uppercase text-white/70 mb-2 block">{item.subtitle}</span>
                  <h3 className="text-2xl md:text-3xl font-light text-white mb-4 leading-tight">{item.title}</h3>

                  {/* Description only shows when hovering (Active) or on Mobile, to keep idle state clean */}
                  <AnimatePresence>
                    {(isActive) && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-gray-200 text-base lg:text-lg leading-relaxed max-w-lg mb-6 font-antic block"
                      >
                        {item.description}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className={`inline-flex items-center gap-2 text-white/50 text-sm group group-hover:text-white transition-colors ${!isActive && isIdle ? 'opacity-0' : 'opacity-100'}`}>
                    <span className="group-hover:translate-x-1 transition-transform">Explore Concept</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>

                </motion.div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default function AboutPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Founder Intro Section */}

      <section className="relative z-10 py-10 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid md:grid-cols-[240px_1fr] gap-10 items-center">
          {/* Left – Profile Image */}
          <div className="flex justify-center md:justify-start">
            <div className="w-60 h-60 rounded-full overflow-hidden shadow-2xl border-4 border-white/15 flex-shrink-0">
              <img
                src="https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978718/mindsettler_assets/parnika.jpg"
                alt="Parnika Bajaj – Psychotherapist"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right – Text */}
          <div className="flex flex-col justify-center">
            <p className="text-lg sm:text-xl leading-[1.8] text-gray-200 m-0 font-antic">
              Hello, I’m{" "}
              <span className="font-semibold text-[#eeb9ff]">
                Parnika Bajaj
              </span>
              , a Psychotherapist born and raised in Surat, Gujarat. I hold a
              B.Sc. in Psychology (Honours) from the University of Edinburgh and
              a Master’s degree in Counselling Psychology from Golden Gate
              University, San Francisco. MindSettler by Parnika is my initiative
              to create a safe, supportive space where individuals can better
              understand and navigate their mental and emotional well-being. I
              strongly believe that mental health is as important as physical
              and spiritual health, and through structured psycho-education and
              awareness, meaningful and lasting change becomes possible.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Identity Section */}
      <section className="relative z-10 py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="h-1 w-12 rounded-full bg-gradient-to-r from-white/20 via-white to-white/20" />
            <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-[#eeb9ff]">
              Our Identity
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#eeb9ff] mb-6">
            The Meaning Behind Our Logo & Colours
          </h2>

          <p className="text-lg sm:text-xl leading-relaxed text-gray-200 mb-5 font-antic">
            The MindSettler logo is a mindful representation of the balance
            between emotion and logic that every individual inevitably needs.
            The purple in the logo represents wisdom and spirituality, while
            pink reflects innocence and a nurturing nature—symbolising the
            softness and vulnerability of the heart.
          </p>

          <p className="text-lg sm:text-xl leading-relaxed text-gray-200 font-antic">
            While the heart is commonly associated with emotions, the geometric
            heart in the logo reflects the presence of logic within emotional
            experiences. The brain represents the physical and cognitive aspects
            of the body, united with the heart to highlight the deep connection
            between emotions and physiology, and the interconnected nature of
            mental well-being.
          </p>
        </div>
      </section>

      {/* Mission & Vision Sections */}
      {[
        {
          label: "Our Mission",
          title: "Empowering Mental Clarity",
          color: "#eeb9ff",
          iconColor: "#3F2965",
          bg: "transparent",
          icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
        },
        {
          label: "Our Vision",
          title: "A World of Emotional Understanding",
          color: "#ff8ac0",
          iconColor: "#DD1764",
          bg: "transparent",
          icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
          reverse: true,
        },
      ].map((s, i) => (
        <section key={i} className={`relative z-10 py-12 sm:py-16 md:py-20 lg:py-24 ${s.bg}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div className={`text-white ${s.reverse ? "md:order-2" : ""}`}>
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div
                  className="h-1 w-8 sm:w-12 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                <span
                  className="text-xs sm:text-sm font-medium uppercase tracking-wider"
                  style={{ color: s.color }}
                >
                  {s.label}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#eeb9ff] mb-4 sm:mb-6 leading-tight">
                {s.title}
              </h2>

              {s.label === "Our Mission" ? (
                <>
                  <p className="text-lg sm:text-xl leading-relaxed mb-3 sm:mb-4 text-gray-200 font-antic">
                    MindSettler’s mission is to support individuals in
                    understanding their mental and emotional experiences in a
                    structured, informed, and compassionate manner.
                  </p>
                  <p className="text-lg sm:text-xl leading-relaxed text-gray-200 font-antic">
                    Through psycho-education and guided exploration, we help
                    people develop clarity around their thoughts, emotions, and
                    behavioural patterns—empowering them to build emotional
                    balance and self-awareness in everyday life.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-lg sm:text-xl leading-relaxed mb-3 sm:mb-4 text-gray-200 font-antic">
                    Our vision is a world where mental health awareness feels
                    natural, accessible, and free from stigma.
                  </p>
                  <p className="text-lg sm:text-xl leading-relaxed text-gray-200 font-antic">
                    We aspire to foster a culture where emotional understanding
                    is valued, self-awareness is encouraged, and individuals
                    feel confident in caring for their mental well-being with
                    the same importance as physical health.
                  </p>
                </>
              )}
            </div>

            <div
              className={`${s.reverse ? "md:order-1" : ""
                } h-48 sm:h-64 md:h-80 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-md border border-white/15 flex flex-col items-center justify-center mt-6 md:mt-0 overflow-hidden`}
            >
              {s.label === "Our Mission" ? (
                <img
                  src="https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978675/mindsettler_assets/empowering.jpg"
                  alt="Our Mission"
                  className="w-full h-full object-cover"
                />
              ) : s.label === "Our Vision" ? (
                <img
                  src="https://res.cloudinary.com/dlplhnb7o/image/upload/v1767982900/mindsettler_assets/emo7.jpg"
                  alt="Our Vision"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4 rounded-full flex items-center justify-center bg-white/10"
                  >
                    <svg
                      className="w-8 h-8 sm:w-10 sm:h-10"
                      fill="none"
                      stroke={s.color}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={s.icon}
                      />
                    </svg>
                  </div>
                  <p className="font-medium text-base sm:text-lg text-white font-antic">{s.label}</p>
                </>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Creative Approach Section - Horizontal Accordion */}
      <section className="relative z-10 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-[#eeb9ff] leading-[1.1] tracking-tight mb-4">
              Our Awareness <br className="hidden sm:block" />
              Approach
            </h2>
            <p className="text-[#eeb9ff]/80 font-light tracking-[0.2em] uppercase text-xs mt-6 opacity-80">
              Interactive & Personalised Growth
            </p>
          </div>

          <ApproachAccordion />
        </div>
      </section>
      <ReadyToBook />
    </div>
  );
}
