"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Video, Link2, ArrowRight } from "lucide-react";
import ReadyToBook from "@/components/ReadyToBook";

// --- Animation Components ---

const FloatingPageParticle = ({ width, height, color }) => (
  <div
    className="w-full h-full bg-white/10 backdrop-blur-[1px] border border-white/20 rounded-[2px]"
    style={{ borderColor: color }}
  >
    {/* Lines to simulate text */}
    <div className="w-[80%] h-[1px] bg-white/30 mx-auto mt-[20%]" />
    <div className="w-[80%] h-[1px] bg-white/30 mx-auto mt-2" />
    <div className="w-[60%] h-[1px] bg-white/30 mx-auto mt-2" />
  </div>
);

const FilmStripParticle = ({ width, height, color }) => (
  <div
    className="w-full h-full bg-black/20 backdrop-blur-[1px] border border-white/20 flex flex-col justify-between py-[2px]"
    style={{ borderColor: color }}
  >
    {/* Sprocket holes */}
    <div className="flex justify-between px-[2px]">
      <div className="w-[2px] h-[3px] bg-white/40 rounded-full" />
      <div className="w-[2px] h-[3px] bg-white/40 rounded-full" />
    </div>
    <div className="w-[80%] h-[40%] bg-white/10 mx-auto rounded-[1px] border border-white/10" />
    <div className="flex justify-between px-[2px]">
      <div className="w-[2px] h-[3px] bg-white/40 rounded-full" />
      <div className="w-[2px] h-[3px] bg-white/40 rounded-full" />
    </div>
  </div>
);

const MixedRain = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const newItems = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      type: Math.random() > 0.5 ? "page" : "film",
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
      size: 20 + Math.random() * 15,
      color: ["#eeb9ff", "#DD1764", "#ffffff"][Math.floor(Math.random() * 3)],
      rotate: Math.random() * 360
    }));
    setItems(newItems);
  }, []);

  return (
    <div className="fixed inset-0 h-full w-full overflow-hidden pointer-events-none z-0">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute top-[-10%]"
          style={{
            left: item.left,
            width: item.size,
            height: item.size * 1.4, // Aspect ratio for rect
            opacity: 0.4
          }}
          animate={{
            y: ["0vh", "120vh"],
            rotate: [item.rotate, item.rotate + 180, item.rotate + 360],
            x: [0, Math.random() * 40 - 20, 0]
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "linear"
          }}
        >
          {item.type === "page" ? (
            <FloatingPageParticle color={item.color} />
          ) : (
            <FilmStripParticle color={item.color} />
          )}
        </motion.div>
      ))}
    </div>
  );
};

// --- Mock Data ---
const ALL_RESOURCES = {
  articles: [
    {
      id: "a1",
      title: "Understanding Emotional Regulation",
      desc: "Learn how to manage and respond to an emotional experience with a range of healthy strategies.",
      tag: "Basics",
      href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10460911/"
    },
    {
      id: "a2",
      title: "The Architecture of Anxiety",
      desc: "Breaking down how the brain's 'alarm system' works and the role of the amygdala in stress responses.",
      tag: "Deep Dive",
      href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7774415/"
    },
    {
      id: "a3",
      title: "Boundaries as Self-Care",
      desc: "A practical guide on how to establish healthy boundaries to protect your time, energy, and mental health.",
      tag: "Relationships",
      href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5178866/"
    }
  ],
  videos: [
    {
      id: "v1",
      title: "Panic Attack vs Anxiety Attack",
      desc: "Understanding the difference between panic and anxiety attacks, and their specific triggers.",
      tag: "WATCH",
      href: "/videos/panicanx.mp4"
    },
    {
      id: "v2",
      title: "Walls vs Boundaries",
      desc: "How healthy boundaries strengthen relationships and improve self-esteem compared to building walls.",
      tag: "WATCH",
      href: "/videos/wallbound.mp4"
    }
  ],
  links: [
    // Emergency & Global Helplines
    {
      id: "l1",
      title: "Find A Helpline (Global)",
      desc: "Instant access to verified mental health helplines in your country.",
      tag: "EXPLORE",
      href: "https://findahelpline.com/"
    },
    {
      id: "l2",
      title: "Befrienders Worldwide",
      desc: "Emotional support to prevent suicide worldwide.",
      tag: "EXPLORE",
      href: "https://www.befrienders.org/"
    },
    {
      id: "l3",
      title: "Intl. Assoc. for Suicide Prevention",
      desc: "Resources and crisis centres for suicide prevention globally.",
      tag: "EXPLORE",
      href: "https://www.iasp.info/resources/Crisis_Centres/"
    },
    // World-Leading Organizations
    {
      id: "l4",
      title: "WHO - Mental Health",
      desc: "Global mental health data, policies, and information from the World Health Organization.",
      tag: "EXPLORE",
      href: "https://www.who.int/health-topics/mental-health"
    },
    {
      id: "l5",
      title: "NIMH - National Inst. of Mental Health",
      desc: "The lead federal agency for research on mental disorders.",
      tag: "EXPLORE",
      href: "https://www.nimh.nih.gov/"
    },
    {
      id: "l6",
      title: "Mental Health Foundation",
      desc: "UK's charity for everyone's mental health.",
      tag: "EXPLORE",
      href: "https://www.mentalhealth.org.uk/"
    },
    // Student & Youth Support
    {
      id: "l7",
      title: "The Trevor Project",
      desc: "Crisis intervention and suicide prevention services for LGBTQ+ youth.",
      tag: "EXPLORE",
      href: "https://www.thetrevorproject.org/"
    },
    {
      id: "l8",
      title: "Active Minds",
      desc: "Supporting mental health awareness and education for students.",
      tag: "EXPLORE",
      href: "https://www.activeminds.org/"
    },
    {
      id: "l9",
      title: "Youth Mental Health Advisory",
      desc: "U.S. Surgeon General’s Advisory on protecting youth mental health.",
      tag: "EXPLORE",
      href: "https://www.hhs.gov/surgeongeneral/reports-and-publications/youth-mental-health/index.html"
    }
  ]
};

// --- Components ---

const ResourceCard = ({ resource, icon: Icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="min-w-[300px] md:min-w-[340px] h-[220px] p-6 rounded-[1.5rem] bg-white/5 backdrop-blur-md border border-white/10 relative overflow-hidden group cursor-pointer flex flex-col justify-between transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_10px_30px_rgba(238,185,255,0.1)] snap-start"
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#eeb9ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <span className="bg-white/10 text-[10px] font-bold tracking-widest uppercase text-[#eeb9ff] px-3 py-1 rounded-full border border-white/5">
            {resource.tag}
          </span>
          <div className="text-white/20 group-hover:text-[#eeb9ff] transition-colors duration-300">
            <Icon size={20} />
          </div>
        </div>

        <h3 className="text-xl font-medium text-white mb-2 line-clamp-2 group-hover:text-[#eeb9ff] transition-colors">{resource.title}</h3>
        <p className="text-sm text-gray-400 font-light leading-relaxed line-clamp-2 group-hover:text-gray-200 font-redhat">{resource.desc}</p>
      </div>

      <div className="relative z-10 flex items-center gap-2 text-xs font-medium text-gray-500 group-hover:text-white transition-colors mt-4">
        <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">Open Resource</span>
        <ArrowRight size={14} className="ml-auto group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
};

const ResourceRow = ({ title, resources, icon }) => {
  return (
    <section className="mb-16 last:mb-0">
      <div className="flex items-center justify-between px-6 md:px-12 mb-6">
        <h2 className="text-2xl md:text-3xl font-light text-white flex items-center gap-3">
          {title}
        </h2>
      </div>

      {/* Scroll Container */}
      <div className="flex overflow-x-auto gap-6 px-6 md:px-12 pb-8 scrollbar-hide snap-x snap-mandatory">
        {resources.map((item) => {
          const isExternal = item.href.startsWith("http");
          return (
            <Link
              key={item.id}
              href={item.href}
              target={isExternal ? "_blank" : "_self"}
              rel={isExternal ? "noopener noreferrer" : ""}
              passHref
            >
              <ResourceCard resource={item} icon={icon} />
            </Link>
          );
        })}
        {/* Spacer for right padding */}
        <div className="min-w-[1px] h-1" />
      </div>
    </section>
  );
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-[#eeb9ff] selection:text-[#3F2965]">
      <MixedRain />

      {/* Header */}
      <section className="pt-32 pb-12 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-thin text-white mb-6">
            Resource <span className="font-serif italic text-[#eeb9ff]">Library</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl font-redhat">
            Curated tools for your mental well-being journey. Swipe through our collections of articles, exercises, and trusted external links.
          </p>
        </motion.div>
      </section>

      {/* Rows */}
      <div className="pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ResourceRow
            title="Articles & Blogs"
            resources={ALL_RESOURCES.articles}
            icon={BookOpen}
          />

          <ResourceRow
            title="Videos & Guides"
            resources={ALL_RESOURCES.videos}
            icon={Video}
          />

          <ResourceRow
            title="Curated Links"
            resources={ALL_RESOURCES.links}
            icon={Link2}
          />
        </motion.div>
      </div>

      <ReadyToBook />
    </div>
  );
}
