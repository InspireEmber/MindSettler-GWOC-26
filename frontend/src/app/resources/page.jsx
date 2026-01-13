"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { BookOpen, Play, Link2, ArrowRight, ExternalLink, Maximize, X, PhoneCall, Globe, GraduationCap } from "lucide-react";
import ReadyToBook from "@/components/ReadyToBook";

const HELPFUL_RESOURCES = [
  {
    category: "Emergency & Global Helplines",
    icon: <PhoneCall className="w-5 h-5 text-[#DD1764]" />,
    description: "If you are in immediate danger or need urgent crisis support, please contact these services.",
    links: [
      { name: "Find A Helpline (Global Search)", url: "https://findahelpline.com/" },
      { name: "Befrienders Worldwide", url: "https://www.befrienders.org/" },
      { name: "International Association for Suicide Prevention", url: "https://www.iasp.info/resources/Crisis_Centres/" }
    ]
  },
  {
    category: "World-Leading Organizations",
    icon: <Globe className="w-5 h-5 text-[#3F2965]" />,
    description: "Reliable global authorities for mental health information and research.",
    links: [
      { name: "World Health Organization (WHO) - Mental Health", url: "https://www.who.int/health-topics/mental-health" },
      { name: "National Institute of Mental Health (NIMH)", url: "https://www.nimh.nih.gov/" },
      { name: "Mental Health Foundation", url: "https://www.mentalhealth.org.uk/" }
    ]
  },
  {
    category: "Student & Youth Support",
    icon: <GraduationCap className="w-5 h-5 text-[#3F2965]" />,
    description: "Resources specifically designed for students and young adults navigating transitions.",
    links: [
      { name: "The Trevor Project (LGBTQ+ Youth)", url: "https://www.thetrevorproject.org/" },
      { name: "Active Minds (Student Mental Health)", url: "https://www.activeminds.org/" },
      { name: "Surgeon General’s Advisory on Youth Mental Health", url: "https://www.hhs.gov/surgeongeneral/reports-and-publications/youth-mental-health/index.html" }
    ]
  }
];

// --- Animation Components (Restored) ---

const FloatingPageParticle = ({ width, height, color }) => (
  <div
    className="w-full h-full bg-white/10 backdrop-blur-[1px] border border-white/20 rounded-[2px]"
    style={{ borderColor: color }}
  >
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
    // Only run on client
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
            height: item.size * 1.4,
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

// --- Specialized Resource Components ---

// 1. Video Card with Direct Playback
const VideoResourceCard = ({ video, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isHovered) {
      // Play on hover, but KEEP MUTED
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Auto-play was prevented
          console.error("Preview autoplay prevented:", error);
        });
      }
    } else {
      videoEl.pause();
      videoEl.currentTime = 0;
      // Ensure it stays muted
      videoEl.muted = true;
    }
  }, [isHovered]);

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // Mobile "Hold" support
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      onContextMenu={(e) => e.preventDefault()} // Prevent menu
      onClick={onClick}
      className="relative min-w-[320px] md:min-w-[400px] h-[260px] rounded-[2rem] bg-black/40 overflow-hidden group cursor-pointer border border-white/5 snap-start shadow-lg hover:shadow-2xl hover:shadow-[#DD1764]/20 transition-all duration-300"
    >
      {/* Background Video Preview */}
      <video
        ref={videoRef}
        src={video.href}
        muted // Start muted
        loop
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-40'}`}
      />

      {/* Static Thumbnail (Optional Overlay) */}
      {!isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
          {/* Tag Removed */}
        </div>

        <div>
          <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-[#eeb9ff] transition-colors drop-shadow-md">
            {video.title}
          </h3>
          <p className="text-sm text-gray-200 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 font-redhat font-light leading-relaxed">
            {video.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// 2. Video Modal (Split View: Video Left | Text Right)
const VideoModal = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-6xl h-[85vh] bg-[#150a1f] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* LEFT: Video Player */}
        <div className="lg:w-[65%] h-[40vh] lg:h-full bg-black relative flex items-center justify-center">
          <video
            src={video.href}
            autoPlay
            controls
            className="w-full h-full object-contain"
          />
        </div>

        {/* RIGHT: Related Article/Text */}
        <div className="lg:w-[35%] h-full overflow-y-auto custom-scrollbar border-l border-white/10 bg-[#1a1025]">
          <div className="p-8">
            <div className="mb-6">
              <span className="text-xs font-bold text-[#eeb9ff] tracking-widest uppercase mb-2 block">Related Guide</span>
              <h3 className="text-3xl font-serif text-white mb-2 leading-tight">{video.relatedTitle || video.title}</h3>
              <p className="text-gray-400 text-sm font-light font-redhat">{video.desc}</p>
            </div>

            <div className="h-px w-full bg-white/10 mb-6" />

            <div className="prose prose-invert prose-sm md:prose-base max-w-none text-gray-300 font-redhat font-light leading-relaxed space-y-4">
              {video.relatedContent ? (
                video.relatedContent.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))
              ) : (
                <p>No text guide available for this video.</p>
              )}
            </div>

            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/5">
              <p className="text-xs text-gray-400 italic">
                "This visual guide is designed to be a companion to your practice. Revisit this video whenever you need a refresher."
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};


// 4. Standalone Article Marquee
const ArticleMarquee = ({ articles }) => {
  return (
    <div className="relative w-full py-10">
      <div
        className="flex gap-6 px-6 overflow-x-auto scrollbar-hide snap-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {articles.map((article, idx) => (
          <motion.a
            key={`${article.id}-${idx}`}
            href={article.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -10, scale: 1.02 }}
            className="min-w-[320px] h-[220px] p-8 rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 flex flex-col justify-between group hover:bg-white/10 transition-all cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-[#eeb9ff]/10 snap-center"
          >
            <div>
              <div className="flex justify-between mb-4">
                <span className="text-[11px] text-[#eeb9ff] font-bold tracking-widest uppercase font-redhat bg-white/5 px-3 py-1 rounded-full">{article.tag}</span>
                <ExternalLink size={20} className="text-white/20 group-hover:text-[#eeb9ff] transition-colors" />
              </div>
              <h3 className="text-2xl text-white font-serif tracking-wide group-hover:text-[#eeb9ff] transition-colors duration-300">{article.title}</h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-widest group-hover:text-white transition-colors font-redhat">
              Visit Source <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

// 5. Video Marquee (Visual Guides)
const VideoMarquee = ({ videos, onVideoClick }) => {
  return (
    <div className="relative w-full py-10">
      <div
        className="flex gap-8 px-6 overflow-x-auto scrollbar-hide snap-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {videos.map((video, idx) => (
          <div key={`${video.id}-${idx}`} className="snap-center">
            <VideoResourceCard
              video={video}
              onClick={() => onVideoClick(video)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Page Component ---

export default function ResourcesPage() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // 1. VISUAL GUIDES DATA (Includes the Related Text that appears in the modal)
  const [videoData] = useState([
    {
      id: 'v1',
      title: 'Managing Anxiety Attacks',
      desc: 'Direct breathing techniques for immediate relief.',
      tag: 'WATCH NOW',
      href: 'https://res.cloudinary.com/dlplhnb7o/video/upload/v1767978906/mindsettler_assets/panicanx.mp4',
      relatedTitle: 'The Physiology of Panic',
      relatedContent: "Panic attacks can feel life-threatening, but they are essentially a false alarm in your body's survival system. The techniques shown in this video—specifically the 4-7-8 breathing method—work by hacking your vagus nerve.\n\nWhen you extend your exhale, you send a direct signal to your parasympathetic nervous system to initiate the 'rest and digest' response. This physically forces your heart rate to slow down, overriding the adrenaline rush.\n\nPractice these breaths when you are calm so that the neural pathway is strong enough to access when you are in distress."
    },
    {
      id: 'v2',
      title: 'Walls vs Boundaries',
      desc: 'How to build healthy relationship structures.',
      tag: 'WATCH NOW',
      href: 'https://res.cloudinary.com/dlplhnb7o/video/upload/v1767978922/mindsettler_assets/wallbound.mp4',
      relatedTitle: 'Understanding Relational Space',
      relatedContent: "There is a distinct difference between a wall (which keeps everyone out to protect a fragile self) and a boundary (which shows people where the door is). The video illustrates this dynamic visually.\n\nHealthy boundaries are permeable—they allow love and connection in while keeping disrespect and harm out. Walls are impermeable; they create safety at the cost of connection, leading to isolation.\n\nMoving from walls to boundaries requires the courage to say 'this is who I am' and 'this is what I need' without the fear of rejection."
    },
    {
      id: 'v4',
      title: "Your Therapist's Memory",
      desc: "Insights into how therapists recall details of your sessions.",
      tag: 'WATCH NOW',
      href: 'https://res.cloudinary.com/dlplhnb7o/video/upload/v1767983067/mindsettler_assets/IMG_6361.mov',
      relatedTitle: 'The Therapeutic Alliance',
      relatedContent: "Research shows that the relationship between therapist and client—the therapeutic alliance—is one of the strongest predictors of successful treatment outcome, often more so than the specific type of therapy used.\n\nThis relationship is built on trust, empathy, and consistency. Part of this bond is the therapist's ability to hold your story in their mind, connecting dots across sessions that you might not see yourself.\n\nFeeling 'known' and 'remembered' by your therapist creates a safe container where deep healing work can occur."
    },
    {
      id: 'v3',
      title: 'Myths in Therapy',
      desc: 'Common misconceptions about therapy debunked.',
      tag: 'WATCH NOW',
      href: 'https://res.cloudinary.com/dlplhnb7o/video/upload/v1767983026/mindsettler_assets/IMG_0992.mov',
      relatedTitle: 'Demystifying the Process',
      relatedContent: "Many people avoid therapy because they believe it means they are 'broken' or that they will be forced to relive trauma immediately. This video addresses the reality: therapy is a collaborative process.\n\nIt is not something done 'to' you, but something done 'with' you. You set the pace. Another common myth is that therapists possess a magical ability to read minds; in reality, we are trained to read patterns.\n\nSuccess in therapy often looks like gradual shifts in perspective rather than sudden, dramatic breakthroughs."
    }
  ]);

  // 2. RESEARCH & PAPERS DATA (Standalone articles)
  const [researchArticles] = useState([
    {
      id: 'r1',
      title: 'Neuroplasticity: Rewiring Your Brain',
      tag: 'RESEARCH',
      href: "https://www.ncbi.nlm.nih.gov/books/NBK557811/"
    },
    {
      id: 'r2',
      title: 'The Gut-Brain Axis',
      tag: 'STUDY',
      href: "https://www.health.harvard.edu/diseases-and-conditions/the-gut-brain-connection"
    },
    {
      id: 'r3',
      title: 'Sleep & Emotional Resilience',
      tag: 'PAPER',
      href: "https://www.sleepfoundation.org/mental-health"
    },
    {
      id: 'r4',
      title: 'The Psychology of Color',
      tag: 'INSIGHT',
      href: "https://www.verywellmind.com/color-psychology-2795824"
    },
  ]);

  return (
    <main className="min-h-screen text-white overflow-x-hidden pt-24 relative">
      <MixedRain />

      {/* Video Modal with Split View */}
      <AnimatePresence>
        {selectedVideo && <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />}
      </AnimatePresence>

      {/* 1. VISUAL GUIDES (Video Only Marquee) */}
      <section className="mb-20">
        <div className="px-6 md:px-12 mb-8">
          <h2 className="text-5xl md:text-6xl font-serif tracking-wide text-white">
            Visual <span className="italic text-[#DD1764]">Guides</span>
          </h2>
          <p className="mt-4 text-gray-300 font-light max-w-2xl">
            Click on any guide to watch and read the companion insight in our interactive player.
          </p>
        </div>

        <VideoMarquee videos={videoData} onVideoClick={setSelectedVideo} />
      </section>

      {/* 2. RESEARCH & INSIGHTS (Standalone Articles) */}
      <section className="mb-20">
        <div className="px-6 md:px-12 mb-8">
          <h2 className="text-5xl md:text-6xl font-serif tracking-wide text-white">
            Research <span className="italic text-[#eeb9ff]">&</span> Insights
          </h2>
          <p className="mt-4 text-gray-300 font-light max-w-2xl">
            Deep dives, study papers, and scientific context for your mental health journey.
          </p>
        </div>

        <ArticleMarquee articles={researchArticles} />
      </section>

      {/* 3. HELPFUL LINKS GRID */}
      <section className="mb-16">
        <div className="px-6 md:px-12 mb-6">
          <h2 className="text-5xl md:text-6xl font-serif tracking-wide text-white">
            Helpful <span className="italic text-[#DD1764]">Links</span>
          </h2>
        </div>

        <div className="flex flex-col gap-10">
          {HELPFUL_RESOURCES.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="px-6 md:px-12 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 shadow-sm backdrop-blur-md text-[#eeb9ff]">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-serif font-medium text-white tracking-wide">{section.category}</h3>
                </div>
                <p className="text-sm text-gray-200 font-light font-redhat max-w-xl leading-relaxed">
                  {section.description}
                </p>
              </div>

              {/* Horizontal Scroll Container */}
              <div className="flex overflow-x-auto gap-4 px-6 md:px-12 pb-6 scrollbar-hide snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {section.links.map((link, j) => (
                  <motion.a
                    key={j}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="min-w-[280px] md:min-w-[320px] p-6 rounded-[1.5rem] bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-[#eeb9ff]/20 hover:shadow-xl hover:shadow-[#eeb9ff]/5 transition-all group/link flex flex-col justify-between h-[150px] snap-start"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div className="p-2 bg-white/5 rounded-full">
                          <ExternalLink size={14} className="text-gray-300 group-hover/link:text-[#eeb9ff] transition-colors" />
                        </div>
                        <ArrowRight size={14} className="text-gray-300 group-hover/link:text-white -rotate-45 group-hover/link:rotate-0 transition-transform duration-300" />
                      </div>
                      <span className="text-lg font-serif font-medium text-gray-100 group-hover/link:text-white transition-colors line-clamp-2 leading-tight">
                        {link.name}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-gray-300 uppercase tracking-widest font-redhat group-hover/link:text-[#eeb9ff] transition-colors">
                      Visit Resource
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>



      <ReadyToBook />

      {/* Global CSS for utilities used */}
      <style jsx global>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .shadow-3xl { box-shadow: 0 50px 100px -20px rgba(0, 0, 0, 0.7); }
        .rotateY-180 { transform: rotateY(180deg); }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}