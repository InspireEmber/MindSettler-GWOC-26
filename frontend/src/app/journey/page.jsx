"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  Lightbulb,
  BookOpen,
  Sprout,
  Mountain,
  HelpCircle,
  Footprints,
  ArrowDown,
  Flag
} from "lucide-react";
import Image from "next/image";
import ReadyToBook from "@/components/ReadyToBook";

const Spore = ({ color }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-60"
  >
    {/* Seed Body */}
    <path d="M12 21L12 18" stroke={color} strokeWidth="1" strokeLinecap="round" />
    <circle cx="12" cy="22" r="1.5" fill={color} />

    {/* Stem */}
    <path d="M12 18L12 8" stroke={color} strokeWidth="0.5" />

    {/* Pappus (Fluff) Center */}
    <circle cx="12" cy="8" r="1" fill={color} />

    {/* Radiating Filaments */}
    <path d="M12 8L6 2" stroke={color} strokeWidth="0.5" opacity="0.8" />
    <path d="M12 8L9 2" stroke={color} strokeWidth="0.5" opacity="0.8" />
    <path d="M12 8L12 1" stroke={color} strokeWidth="0.5" opacity="0.8" />
    <path d="M12 8L15 2" stroke={color} strokeWidth="0.5" opacity="0.8" />
    <path d="M12 8L18 2" stroke={color} strokeWidth="0.5" opacity="0.8" />

    <path d="M12 8L4 5" stroke={color} strokeWidth="0.5" opacity="0.8" />
    <path d="M12 8L20 5" stroke={color} strokeWidth="0.5" opacity="0.8" />
  </svg>
);

const SporesRain = () => {
  const [spores, setSpores] = useState([]);

  useEffect(() => {
    const newSpores = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 20, // Slower, more floaty
      size: 20 + Math.random() * 20,
      color: ["#eeb9ff", "#DD1764", "#ffffff"][Math.floor(Math.random() * 3)],
      sway: Math.random() * 100 - 50
    }));
    setSpores(newSpores);
  }, []);

  return (
    <div className="fixed inset-0 h-full w-full overflow-hidden pointer-events-none z-0">
      {spores.map((spore) => (
        <motion.div
          key={spore.id}
          className="absolute top-[-10%]"
          style={{
            left: spore.left,
            width: spore.size,
            height: spore.size * 1.5, // Slightly taller for the stem
            color: spore.color
          }}
          animate={{
            y: ["0vh", "120vh"],
            x: [0, spore.sway, 0], // Gentle swaying
            rotate: [-10, 10, -10] // Subtle rotation
          }}
          transition={{
            duration: spore.duration,
            repeat: Infinity,
            delay: spore.delay,
            ease: "linear",
            x: {
              duration: spore.duration * 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            rotate: {
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
        >
          <Spore color={spore.color} />
        </motion.div>
      ))}
    </div>
  );
};

const JOURNEY_STEPS = [
  {
    id: 1,
    title: "The Unsettled Mind",
    subtitle: "The Foggy Base",
    desc: "It starts with a feeling—something isn't right. Thoughts feel tangled, emotions overwhelming. You stand at the base of a mountain, looking up at the clouds.",
    // icon: HelpCircle,
    color: "#a855f7", // Purple
    imageSrc: "https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978687/mindsettler_assets/firstj.jpg",
    align: "left"
  },
  {
    id: 2,
    title: "The Spark of Awareness",
    subtitle: "Finding the Trailhead",
    desc: "A moment of insight. You acknowledge that seeking help isn't weakness—it's the first step toward strength. You spot the path forward.",
    // icon: Lightbulb,
    color: "#eeb9ff", // Light Pink/Purple
    imageSrc: "/images/bg10.jpg",
    align: "right"
  },
  {
    id: 3,
    title: "Structured Learning",
    subtitle: "The Climb",
    desc: "This is where the work begins. Through structured psycho-education, you navigate the steep terrain, building the muscles of resilience and understanding.",
    // icon: BookOpen,
    color: "#DD1764", // Pink
    imageSrc: "https://res.cloudinary.com/dlplhnb7o/image/upload/v1767982949/mindsettler_assets/thirdj.jpg",
    align: "left"
  },
  {
    id: 4,
    title: "Incubation & Settling",
    subtitle: "The Plateau",
    desc: "Knowledge turns into wisdom. You pause at a high camp to reflect, letting the insights settle deep within your mind. The air is clearer here.",
    // icon: Sprout,
    color: "#a855f7", // Purple
    imageSrc: "/images/bg13.jpg",
    align: "right"
  },
  {
    id: 5,
    title: "Moving Forward",
    subtitle: "The Summit View",
    desc: "You stand on solid ground. Armed with understanding and resilience, you face the horizon with a renewed sense of self and purpose.",
    // icon: Mountain,
    color: "#DD1764", // Pink
    imageSrc: "https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978679/mindsettler_assets/fifthj.jpg",
    align: "left"
  }
];

const ConnectionLineSegment = ({ start, end }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 55%"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001
  });

  const midY = (start.y + end.y) / 2;
  const d = `M ${start.x} ${start.y} C ${start.x} ${midY}, ${end.x} ${midY}, ${end.x} ${end.y}`;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div
        ref={ref}
        style={{
          position: 'absolute',
          top: start.y,
          height: Math.max(1, end.y - start.y),
          width: '100%',
          visibility: 'hidden'
        }}
      />

      <svg className="absolute inset-0 size-full overflow-visible">
        <defs>
          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#eeb9ff" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#eeb9ff" />
            <stop offset="100%" stopColor="#DD1764" />
          </linearGradient>
        </defs>

        <motion.path
          d={d}
          stroke="url(#pinkGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
};

export default function JourneyPage() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const [dotPositions, setDotPositions] = useState([]);

  // Calculate dot positions based on card refs
  useEffect(() => {
    const calculatePositions = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerScrollTop = containerRef.current.scrollTop || 0;

      const positions = cardRefs.current.map((cardRef, index) => {
        if (!cardRef) return null;

        const cardRect = cardRef.getBoundingClientRect();
        const relativeTop = cardRect.top - containerRect.top + containerScrollTop;
        const relativeLeft = cardRect.left - containerRect.left;
        const centerX = relativeLeft + cardRect.width / 2;

        return {
          topDot: { x: centerX, y: relativeTop },
          bottomDot: { x: centerX, y: relativeTop + cardRect.height }
        };
      }).filter(Boolean);

      setDotPositions(positions);
    };

    // Calculate on mount and resize
    calculatePositions();
    window.addEventListener('resize', calculatePositions);

    // Recalculate after a short delay to ensure layout is complete
    const timer = setTimeout(calculatePositions, 500);

    return () => {
      window.removeEventListener('resize', calculatePositions);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen relative text-white selection:bg-[#DD1764] selection:text-white overflow-hidden">
      <SporesRain />

      {/* 1. HERO HEADER */}
      <section className="relative z-20 pt-20 pb-12 px-6 text-center">

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-block mb-4"
        >
          <div className="h-1 w-24 bg-gradient-to-r from-white/20 via-white to-white/20 rounded-full mx-auto" />
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-light text-[#eeb9ff] mb-8 leading-tight">
          The <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#eeb9ff] to-[#fff]">Climb</span>
        </h1>

        <p className="text-2xl md:text-3xl font-serif italic text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
          "Mental health is a journey, not a destination."
        </p>
      </section>

      {/* 2. MOUNTAIN SECTION */}
      <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 md:px-12 pb-40">

        {/* --- THE DYNAMIC TRAIL (PATH) --- */}
        {/* SVG overlay that draws lines between card anchor dots */}
        {/* --- DYNAMIC CONNECTION SEGMENTS --- */}
        {/* Render independent segments for precise per-gap scroll animation */}
        {dotPositions.map((pos, index) => (
          <div key={`dots-${index}`} className="absolute top-0 left-0 w-full h-full pointer-events-none z-[5]">
            {/* Render dots always */}
            <svg className="absolute inset-0 size-full overflow-visible">
              {/* Top dot */}
              <circle cx={pos.topDot.x} cy={pos.topDot.y} r="6" fill="#eeb9ff" />
              <circle cx={pos.topDot.x} cy={pos.topDot.y} r="12" stroke="#eeb9ff" strokeWidth="1" fill="none" opacity="0.4" />

              {/* Bottom dot */}
              <circle cx={pos.bottomDot.x} cy={pos.bottomDot.y} r="6" fill="#DD1764" />
              <circle cx={pos.bottomDot.x} cy={pos.bottomDot.y} r="12" stroke="#DD1764" strokeWidth="1" fill="none" opacity="0.4" />
            </svg>

            {/* Render connecting line to NEXT card if it exists */}
            {index < dotPositions.length - 1 && (
              <ConnectionLineSegment
                start={pos.bottomDot}
                end={dotPositions[index + 1].topDot}
              />
            )}
          </div>
        ))}

        {/* --- STEPS CONTENT --- */}
        <div className="relative z-10 flex flex-col gap-64 pt-20">
          {JOURNEY_STEPS.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={step.id}
                className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${step.align === 'right' ? 'md:flex-row-reverse' : ''} ${step.align === 'center' ? 'justify-center md:flex-col text-center' : ''}`}
              >
                {/* IMAGE CARD (THE COMPASS/VIEW) */}
                <motion.div
                  ref={(el) => (cardRefs.current[index] = el)}
                  initial={{ scale: 0.8, opacity: 0, rotate: isEven ? -5 : 5 }}
                  whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="relative group perspective-1000"
                >
                  {/* Floating Animation Wrapper */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 1 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#DD1764] to-[#a855f7] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-[2rem]" />

                    <div className="relative w-64 h-80 md:w-80 md:h-96 bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-[2rem] shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02] group-hover:rotate-1">
                      <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-black/50">
                        <Image
                          src={step.imageSrc}
                          alt={step.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                        {/* Step Number Tag */}
                        <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
                          <span className="text-[10px] font-bold tracking-widest uppercase text-white/90">
                            Elevation 0{step.id}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* TEXT CONTENT (THE JOURNAL ENTRY) */}
                <motion.div
                  initial={{ x: isEven ? -50 : 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`flex flex-col ${step.align === 'center' ? 'items-center max-w-2xl' : 'max-w-md'}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`h-px w-8 bg-gradient-to-r ${isEven ? 'from-transparent to-[#DD1764]' : 'from-[#DD1764] to-transparent'} ${step.align === 'center' ? 'hidden' : ''}`} />
                    <h3 className="text-[#eeb9ff] font-bold tracking-[0.2em] text-xs uppercase">
                      {step.subtitle}
                    </h3>
                    <span className={`h-px w-8 bg-gradient-to-r ${isEven ? 'from-[#DD1764] to-transparent' : 'from-transparent to-[#DD1764]'} ${step.align === 'center' ? 'hidden' : ''}`} />
                  </div>

                  <h2 className="text-3xl md:text-5xl font-light text-[#eeb9ff] mb-6 leading-tight">
                    {step.title}
                  </h2>

                  <div className="relative pl-6 border-l border-white/10">
                    <p className="text-lg text-gray-300 leading-relaxed italic font-light">
                      "{step.desc}"
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      <ReadyToBook />
    </div>
  );
}