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

          <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
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
              <motion.div key={index} variants={fadeInUp}>
                <Link href={category.href} className="group block h-full">
                  <div className="h-full p-8 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 hover:shadow-[#eeb9ff]/10 transition-all duration-500">
                    <div className="flex justify-between items-start mb-10">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-[#eeb9ff] group-hover:bg-[#eeb9ff] group-hover:text-[#3F2965] transition-all duration-500">
                        {category.icon}
                      </div>
                      <span className="px-4 py-1.5 rounded-xl bg-white/10 border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider">
                        {category.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-medium text-white mb-4 group-hover:text-[#eeb9ff] transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-200 text-sm leading-relaxed mb-10">
                      {category.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-bold text-gray-300 group-hover:text-[#eeb9ff] transition-all">
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
