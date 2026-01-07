"use client";

import { useRef } from "react";
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

const JOURNEY_STEPS = [
  {
    id: 1,
    title: "The Unsettled Mind",
    subtitle: "The Foggy Base",
    desc: "It starts with a feeling—something isn't right. Thoughts feel tangled, emotions overwhelming. You stand at the base of a mountain, looking up at the clouds.",
    // icon: HelpCircle,
    color: "#a855f7", // Purple
    imageSrc: "/images/unsettled mind.jpg",
    align: "left"
  },
  {
    id: 2,
    title: "The Spark of Awareness",
    subtitle: "Finding the Trailhead",
    desc: "A moment of insight. You acknowledge that seeking help isn't weakness—it's the first step toward strength. You spot the path forward.",
    // icon: Lightbulb,
    color: "#eeb9ff", // Light Pink/Purple
    imageSrc: "/images/spark of awarness.jpg",
    align: "right"
  },
  {
    id: 3,
    title: "Structured Learning",
    subtitle: "The Climb",
    desc: "This is where the work begins. Through structured psycho-education, you navigate the steep terrain, building the muscles of resilience and understanding.",
    // icon: BookOpen,
    color: "#DD1764", // Pink
    imageSrc: "/images/structured learning.jpg",
    align: "left"
  },
  {
    id: 4,
    title: "Incubation & Settling",
    subtitle: "The Plateau",
    desc: "Knowledge turns into wisdom. You pause at a high camp to reflect, letting the insights settle deep within your mind. The air is clearer here.",
    // icon: Sprout,
    color: "#a855f7", // Purple
    imageSrc: "/images/incubation.jpg",
    align: "right"
  },
  {
    id: 5,
    title: "Moving Forward",
    subtitle: "The Summit View",
    desc: "You stand on solid ground. Armed with understanding and resilience, you face the horizon with a renewed sense of self and purpose.",
    // icon: Mountain,
    color: "#DD1764", // Pink
    imageSrc: "/images/moving forward.jpg",
    align: "center"
  }
];

export default function JourneyPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax transform for the mountain background
  const mountainY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="min-h-screen relative text-white selection:bg-[#DD1764] selection:text-white overflow-hidden">
      
      {/* 1. HERO HEADER */}
      <section className="relative z-20 pt-32 pb-12 px-6 text-center">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-block mb-4"
            >
                <div className="h-1 w-24 bg-gradient-to-r from-white/20 via-white to-white/20 rounded-full mx-auto" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-light mb-8 leading-tight">
                The <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-b from-[#eeb9ff] to-[#DD1764] px-2 py-1">Climb</span>
            </h1>
            
            <p className="text-2xl md:text-3xl font-serif italic text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
                "Mental health is a journey, not a destination."
            </p>
      </section>

      {/* 2. MOUNTAIN SECTION */}
      <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 md:px-12 pb-40">

        {/* --- THE TRAIL (PATH) --- */}
        {/* A line connecting the steps, styled like a topographic trail */}
        <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none hidden md:block z-0">
             <svg 
                className="w-full h-full" 
                viewBox="0 0 1200 2400" 
                fill="none" 
                preserveAspectRatio="xMidYMin slice"
             >
                {/* Dashed Guide */}
                <path 
                    d="M 600 100 
                       L 300 400
                       L 900 800
                       L 300 1200
                       L 900 1600
                       L 600 2100"
                    stroke="rgba(255,255,255,0.1)" 
                    strokeWidth="2"
                    strokeDasharray="8 8"
                    strokeLinecap="round"
                    fill="none"
                />
                {/* Lit Up Path */}
                <motion.path 
                     d="M 600 100 
                       L 300 400
                       L 900 800
                       L 300 1200
                       L 900 1600
                       L 600 2100"
                    stroke="url(#trailGradient)" 
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    style={{ pathLength }}
                />
                <defs>
                    <linearGradient id="trailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="50%" stopColor="#ff8ac0" />
                        <stop offset="100%" stopColor="#DD1764" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
             </svg>
        </div>

        {/* --- STEPS CONTENT --- */}
        <div className="relative z-10 flex flex-col gap-32 pt-20">
             {JOURNEY_STEPS.map((step, index) => {
                 const isEven = index % 2 === 0;
                 return (
                    <div 
                        key={step.id} 
                        className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${step.align === 'right' ? 'md:flex-row-reverse' : ''} ${step.align === 'center' ? 'justify-center md:flex-col text-center' : ''}`}
                    >
                         {/* IMAGE CARD (THE COMPASS/VIEW) */}
                         <motion.div 
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
                             
                             <h2 className="text-3xl md:text-5xl font-light text-white mb-6 leading-tight">
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
