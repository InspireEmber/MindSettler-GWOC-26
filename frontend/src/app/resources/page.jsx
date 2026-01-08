"use client";
import ReadyToBook from "@/components/ReadyToBook";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Video, Link2, Sparkles, ArrowRight } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function ResourcesPage() {
  const resourceCategories = [
    {
      title: "Articles & Blogs",
      description: "Deep dives into psychological frameworks, emotional intelligence, and self-care science.",
      href: "/resources/articles",
      icon: <BookOpen className="w-6 h-6" />,
      tag: "Read",
      color: "#eeb9ff"
    },
    {
      title: "Videos & Guides",
      description: "Visual walkthroughs of coping strategies and cognitive behavioral concepts.",
      href: "/resources/videos",
      icon: <Video className="w-6 h-6" />,
      tag: "Watch",
      color: "#DD1764"
    },
    {
      title: "Curated Links",
      description: "Hand-picked external tools and clinical organizations for deeper support.",
      href: "/resources/links",
      icon: <Link2 className="w-6 h-6" />,
      tag: "Explore",
      color: "#eeb9ff"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden">

      <section className="relative pt-24 pb-12 overflow-hidden text-center z-10">

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-5xl mx-auto px-6 relative z-10"
        >
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-light text-white mb-8 leading-[1.1]">
            Empowerment through <br />
            <span className="font-medium text-[#eeb9ff]">Knowledge</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-redhat">
            Access our library of structured psycho-education content designed
            to help you decode the complexity of your mind.
          </motion.p>
        </motion.div>
      </section>

      <section className="pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {resourceCategories.map((category, index) => (
              <motion.div key={index} variants={fadeInUp} className="h-full">
                <Link href={category.href} className="group block h-full relative perspective-1000">
                  <div className="h-full p-8 rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">

                    {/* Hover Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#eeb9ff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Video Specific: Rotating Light / Film Roll Effect */}
                    {category.tag === "Watch" && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-[200%] h-full -translate-x-[150%] skew-x-12 group-hover:animate-[shine_1.5s_infinite] pointer-events-none" />
                    )}

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-8">
                        <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#eeb9ff] transition-all duration-500 shadow-inner group-hover:scale-110 group-hover:bg-[#eeb9ff] group-hover:text-[#3F2965] ${category.tag === 'Read' ? 'group-hover:[transform:rotateY(180deg)]' : ''}`}>
                          <div className={category.tag === 'Read' ? 'transition-all duration-500 group-hover:[transform:rotateY(-180deg)]' : ''}>
                            {category.icon}
                          </div>
                        </div>

                        <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-[10px] font-bold uppercase tracking-wider group-hover:bg-[#eeb9ff] group-hover:text-[#3F2965] transition-colors">
                          {category.tag}
                        </span>
                      </div>

                      <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-[#eeb9ff] transition-colors">
                        {category.title}
                      </h3>

                      {/* Content that 'opens' / becomes clearer on hover */}
                      <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow group-hover:text-gray-200 transition-colors duration-500 font-redhat">
                        {category.description}
                      </p>

                      <div className="flex items-center gap-2 text-xs font-bold text-gray-500 group-hover:text-white transition-all mt-auto border-t border-white/5 pt-4 group-hover:border-white/20">
                        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">Explore Now</span>
                        <ArrowRight size={14} className="ml-auto group-hover:-rotate-45 transition-transform duration-500" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <ReadyToBook />
    </div>
  );
}
