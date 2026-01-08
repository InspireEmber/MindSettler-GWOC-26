"use client";
import Link from "next/link";
import { ArrowLeft, Clock, ArrowRight, ExternalLink } from "lucide-react";
import ReadyToBook from "@/components/ReadyToBook";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ARTICLES = [
  {
    title: "Understanding Emotional Regulation",
    excerpt: "Learn how to manage and respond to an emotional experience with a range of healthy strategies.",
    readTime: "6 min read",
    category: "Basics",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10460911/"
  },
  {
    title: "The Architecture of Anxiety",
    excerpt: "Breaking down how the brain's 'alarm system' works and the role of the amygdala in stress responses.",
    readTime: "8 min read",
    category: "Deep Dive",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7774415/"
  },
  {
    title: "Boundaries as Self-Care",
    excerpt: "A practical guide on how to establish healthy boundaries to protect your time, energy, and mental health.",
    readTime: "7 min read",
    category: "Relationships",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5178866/"
  }
];

// --- Falling Pages Background ---
const FloatingPages = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const newPages = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 1, // Faster start (0-3s)
      duration: 15 + Math.random() * 10,
      rotate: Math.random() * 360,
      size: 20 + Math.random() * 20
    }));
    setPages(newPages);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 h-full w-full">
      {pages.map((page) => (
        <motion.div
          key={page.id}
          // The "page" look: white glassmorphism with lines
          className="absolute top-[-10%] bg-white/5 border border-white/10 rounded-[2px] backdrop-blur-[1px]"
          style={{
            left: page.left,
            width: page.size,
            height: page.size * 1.4
          }}
          animate={{
            y: ["0vh", "120vh"],
            rotate: [page.rotate, page.rotate + 180, page.rotate + 360],
            x: [0, Math.random() * 60 - 30, 0]
          }}
          transition={{
            duration: page.duration,
            repeat: Infinity,
            delay: page.delay,
            ease: "linear"
          }}
        >
          {/* Subtle lines to look like text on a page */}
          <div className="w-[80%] h-[1px] bg-white/20 mx-auto mt-[20%]" />
          <div className="w-[80%] h-[1px] bg-white/20 mx-auto mt-1" />
          <div className="w-[60%] h-[1px] bg-white/20 mx-auto mt-1" />
        </motion.div>
      ))}
    </div>
  );
};

export default function ArticlesResourcesPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">

      {/* Background Rain Animation */}
      <FloatingPages />

      {/* Header Section */}
      <section className="relative py-16 md:py-24 z-10">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/resources" className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white hover:gap-3 transition-all mb-8 group relative z-20">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Resources
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-light text-white mb-6"
          >
            Articles & <span className="font-medium text-[#eeb9ff]">Blogs</span>
          </motion.h1>
          <p className="text-xl leading-relaxed max-w-2xl text-gray-200">
            Verified external resources to support your learning journey in mental well-being and emotional clarity.
          </p>
        </div>
      </section>

      {/* Articles Grid - Enhanced Animations */}
      <section className="py-12 md:py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTICLES.map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="group relative flex flex-col h-full p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden hover:border-white/20 hover:shadow-[0_0_40px_rgba(238,185,255,0.1)] hover:-translate-y-2 transition-all duration-500 isolate">

                  {/* Glass Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0">
                    <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
                  </div>

                  {/* Content Container (z-10 to stay above effects) */}
                  <div className="relative z-10 flex flex-col h-full pointer-events-none">
                    <div className="flex justify-between items-center mb-6">
                      <span
                        className="text-xs font-bold uppercase tracking-widest text-[#eeb9ff] py-1 px-3 rounded-full border border-[#eeb9ff]/20 bg-[#eeb9ff]/5 group-hover:bg-[#eeb9ff] group-hover:text-[#3F2965] transition-all duration-300"
                      >
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400 group-hover:text-gray-200 transition-colors">
                        <Clock size={12} className="group-hover:text-[#eeb9ff]" /> {post.readTime}
                      </div>
                    </div>

                    <h2 className="text-2xl font-serif text-white mb-4 group-hover:text-[#eeb9ff] transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-sm leading-relaxed mb-8 flex-grow text-gray-300 group-hover:text-gray-100 transition-colors duration-300">
                      {post.excerpt}
                    </p>

                    {/* Interactive Link Area */}
                    <div className="mt-auto pointer-events-auto">
                      <a
                        href={post.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold text-white group/link"
                      >
                        <span className="relative overflow-hidden pb-0.5">
                          Read Full Article
                          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#eeb9ff] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                        </span>
                        <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-[#eeb9ff]" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 text-sm italic leading-relaxed text-gray-400">
            <p>
              <strong>Disclaimer:</strong> These are external educational resources. MindSettler is not responsible for the content on third-party websites. This content does not replace professional diagnosis or emergency care.
            </p>
          </div>
        </div>
      </section>

      {/* Standard Ready To Book CTA */}
      <ReadyToBook />
    </div>
  );
}
