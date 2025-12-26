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
      color: "#3F2965"
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
      color: "#3F2965"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] selection:bg-[#3F2965] selection:text-white">
      
      <section className="relative pt-24 pb-20 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3F2965]/5 rounded-full blur-[120px] -z-0 translate-x-1/4 -translate-y-1/4" />
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-5xl mx-auto px-6 relative z-10"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3F2965]/5 border border-[#3F2965]/10 text-[#3F2965] text-xs font-bold uppercase tracking-widest mb-8">
            <Sparkles size={14} className="text-[#DD1764]" /> The Learning Hub
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-light text-[#2E2A36] mb-8 leading-[1.1]">
            Empowerment through <br />
            <span className="font-medium text-[#3F2965]">Knowledge</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-[#5E5A6B] max-w-2xl leading-relaxed">
            Access our library of structured psycho-education content designed 
            to help you decode the complexity of your mind.
          </motion.p>
        </motion.div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-[#5E5A6B] mb-10 px-2"
          >

          </motion.h2>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {resourceCategories.map((category, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Link href={category.href} className="group block h-full">
                  <div className="h-full p-8 rounded-[2rem] bg-white border border-[#3F2965]/5 shadow-[0_8px_30px_rgba(63,41,101,0.02)] hover:shadow-[0_20px_50px_rgba(63,41,101,0.08)] transition-all duration-500">
                    <div className="flex justify-between items-start mb-10">
                      <div className="w-14 h-14 rounded-2xl bg-[#3F2965]/5 flex items-center justify-center text-[#3F2965] group-hover:bg-[#3F2965] group-hover:text-white transition-all duration-500">
                        {category.icon}
                      </div>
                      <span className="px-4 py-1.5 rounded-xl bg-[#F6F4FA] text-[#3F2965] text-[10px] font-bold uppercase tracking-wider">
                        {category.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-medium text-[#2E2A36] mb-4 group-hover:text-[#3F2965] transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-[#5E5A6B] text-sm leading-relaxed mb-10">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-xs font-bold text-[#5E5A6B] group-hover:text-[#3F2965] transition-all">
                      View Section <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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