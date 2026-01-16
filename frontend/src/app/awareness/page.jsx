"use client";

import { useRef, useState } from "react";
import ReadyToBook from "@/components/ReadyToBook";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
     Brain,
     Heart,
     Users,
     Shield,
     Sparkles,
     ArrowRight,
     BookOpen,
     Lightbulb,
} from "lucide-react";

// Mental Health Topics Data
const AWARENESS_TOPICS = [
     {
          id: 1,
          title: "Anxiety",
          description: "Persistent worry, fear, or unease that can interfere with daily life.",
          image: "/images/bg18.jpg",
          color: "from-purple-400/20 to-pink-400/20",
          icon: Brain,
     },
     {
          id: 2,
          title: "Depression",
          description: "Feelings of sadness, emptiness, or hopelessness lasting over time.",
          image: "/images/bg20.jpg",
          color: "from-blue-400/20 to-purple-400/20",
          icon: Heart,
     },
     {
          id: 3,
          title: "Stress",
          description: "Mental and emotional strain caused by overwhelming situations.",
          image: "/images/bg21.jpg",
          color: "from-pink-400/20 to-rose-400/20",
          icon: Sparkles,
     },
     {
          id: 4,
          title: "Relationship Issues",
          description: "Challenges in communication, trust, or emotional connection.",
          image: "/images/bg23.jpg",
          color: "from-rose-400/20 to-orange-400/20",
          icon: Users,
     },
     {
          id: 5,
          title: "Self-Esteem",
          description: "Struggles with self-worth, confidence, and self-acceptance.",
          image: "/images/bg24.jpg",
          color: "from-indigo-400/20 to-purple-400/20",
          icon: Shield,
     },
     {
          id: 6,
          title: "Trauma",
          description: "Emotional responses to deeply distressing experiences.",
          image: "/images/bg25.jpg",
          color: "from-violet-400/20 to-fuchsia-400/20",
          icon: Lightbulb,
     },
];

// Content Reveal Animation
const fadeInUp = {
     hidden: { opacity: 0, y: 30 },
     visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" }
     },
};

const staggerContainer = {
     hidden: { opacity: 0 },
     visible: {
          opacity: 1,
          transition: {
               staggerChildren: 0.15,
               delayChildren: 0.2
          }
     }
};

// Topic Card Component
const TopicCard = ({ topic, index }) => {
     const [isExpanded, setIsExpanded] = useState(false);

     return (
          <motion.div
               variants={fadeInUp}
               whileHover={{ y: -8 }}
               className="group relative h-full"
          >
               <div className="h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(238,185,255,0.15)] hover:border-[#eeb9ff]/30 transition-all duration-500 flex flex-col">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                         <Image
                              src={topic.image}
                              alt={topic.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />

                         {/* Icon Badge */}
                         <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                              <topic.icon className="w-6 h-6 text-white" />
                         </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow">
                         <h3 className="text-2xl font-light text-[#eeb9ff] mb-4 group-hover:text-white transition-colors">
                              {topic.title}
                         </h3>
                         <p className="text-gray-200 leading-relaxed font-redhat mb-6 flex-grow font-light">
                              {topic.description}
                         </p>

                         <Link
                              href="/resources"
                              className="inline-flex items-center gap-2 text-[#eeb9ff] hover:text-white font-medium text-sm transition-all group/link mt-auto uppercase tracking-widest"
                         >
                              <span>Learn More</span>
                              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                         </Link>
                    </div>
               </div>
          </motion.div>
     );
};

export default function AwarenessPage() {
     const containerRef = useRef(null);

     // Parallax for the content against the fixed background
     const { scrollYProgress } = useScroll({
          target: containerRef,
          offset: ["start start", "end end"],
     });

     return (
          <div ref={containerRef} className="min-h-screen relative text-white overflow-x-hidden selection:bg-[#DD1764] selection:text-white">

               <div className="relative z-10">

                    {/* Hero Section */}
                    <section className="relative py-24 md:py-32 text-center min-h-[80vh] flex flex-col items-center justify-center overflow-visible">

                         {/* Background Ambient Glow for Depth */}
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#eeb9ff]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

                         <motion.div
                              initial="hidden"
                              animate="visible"
                              variants={staggerContainer}
                              className="max-w-5xl mx-auto px-6 relative z-10 w-full"
                         >
                              {/* The Universal Separator Pill */}
                              <motion.div
                                   variants={fadeInUp}
                                   className="h-1 w-24 bg-gradient-to-r from-white/20 via-white to-white/20 rounded-full mx-auto mb-12"
                              />

                              <div className="relative flex flex-col items-center justify-center mb-16">

                                   {/* Layer 1: "Building" (Behind) */}
                                   <motion.h1
                                        variants={fadeInUp}
                                        className="text-6xl sm:text-7xl md:text-9xl font-light text-white/25 uppercase tracking-widest absolute -top-12 md:-top-24 z-0 select-none blur-[1px]"
                                   >
                                        Building
                                   </motion.h1>

                                   {/* Layer 2: Central Illustration (Middle) */}
                                   <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 1.2, ease: "easeOut" }}
                                        className="relative z-10 w-64 h-64 md:w-96 md:h-96 my-[-4rem] md:my-[-6rem]"
                                   >
                                        <div className="w-full h-full relative">
                                             <div className="absolute inset-0 bg-gradient-to-tr from-[#eeb9ff]/20 to-transparent rounded-full blur-3xl animate-pulse" />
                                             <Image
                                                  src="/images/bg15.jpg"
                                                  alt="Awareness Bloom"
                                                  fill
                                                  className="object-cover rounded-full opacity-80 mix-blend-screen mask-image-radial"
                                                  style={{ maskImage: 'radial-gradient(circle, black 35%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 70%)' }}
                                             />
                                        </div>
                                   </motion.div>

                                   {/* Layer 3: "Awareness" (Front & Pop out) */}
                                   <motion.h1
                                        variants={fadeInUp}
                                        className="relative z-20 text-6xl sm:text-7xl md:text-9xl leading-none mt-8"
                                   >
                                        <span className="font-baskervville  font-semibold text-transparent bg-clip-text bg-gradient-to-b from-[#eeb9ff] via-[#ffffff] to-[#eeb9ff] drop-shadow-[0_10px_30px_rgba(238,185,255,0.5)] block">
                                             Awareness
                                        </span>
                                   </motion.h1>
                              </div>

                              <motion.p
                                   variants={fadeInUp}
                                   className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-redhat font-light leading-relaxed drop-shadow-lg relative z-30"
                              >
                                   "Awareness is the bridge between clinical insight and lived experience.
                                   Understanding your mind is the first step toward masterfully navigating it."
                              </motion.p>
                         </motion.div>
                    </section>

                    {/* Topics Grid Section */}
                    <section className="pb-32 px-6">
                         <div className="max-w-7xl mx-auto">

                              {/* Section Header */}
                              <motion.div
                                   initial={{ opacity: 0, y: 30 }}
                                   whileInView={{ opacity: 1, y: 0 }}
                                   viewport={{ once: true }}
                                   className="text-center mb-16"
                              >
                                   <div className="inline-flex items-center gap-3 mb-6">
                                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#eeb9ff]" />
                                        <span className="text-sm font-bold uppercase tracking-[0.3em] text-[#eeb9ff]">
                                             Understanding
                                        </span>
                                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#eeb9ff]" />
                                   </div>
                                   <h2 className="text-3xl md:text-5xl font-light text-white mb-6">
                                        Common Mental Health Topics
                                   </h2>
                              </motion.div>

                              {/* Topics Grid */}
                              <motion.div
                                   initial="hidden"
                                   whileInView="visible"
                                   viewport={{ once: true, margin: "-100px" }}
                                   variants={staggerContainer}
                                   className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
                              >
                                   {AWARENESS_TOPICS.map((topic, index) => (
                                        <TopicCard key={topic.id} topic={topic} index={index} />
                                   ))}
                              </motion.div>

                         </div>
                    </section>

                    {/* CTA Section */}
                    <ReadyToBook />
               </div>
          </div>
     );
}
