import Link from "next/link";
import { ArrowLeft, Clock, ArrowRight, ExternalLink } from "lucide-react";

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

export default function ArticlesResourcesPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Header Section */}
      <section className="relative py-16 md:py-24 z-10">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/resources" className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white hover:gap-3 transition-all mb-8 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Resources
          </Link>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
            Articles & <span className="font-medium text-[#eeb9ff]">Blogs</span>
          </h1>
          <p className="text-xl leading-relaxed max-w-2xl text-gray-200">
            Verified external resources to support your learning journey in mental well-being and emotional clarity.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 md:py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTICLES.map((post, i) => (
              <div key={i} className="flex flex-col p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:shadow-2xl hover:shadow-[#eeb9ff]/10 hover:-translate-y-1 transition-all group">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#eeb9ff]">{post.category}</span>
                  <div className="flex items-center gap-1 text-xs text-gray-300">
                    <Clock size={12} /> {post.readTime}
                  </div>
                </div>
                <h2 className="text-2xl font-medium text-white mb-4 group-hover:text-[#eeb9ff] transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed mb-8 flex-grow text-gray-200">{post.excerpt}</p>
                
                {/* External Link Logic */}
                <a 
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white group/link hover:text-[#eeb9ff] transition-colors"
                >
                  Read Full Article 
                  <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
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

      {/* Your Persistent Vibrant CTA */}
      <section className="py-24 md:py-32 relative z-10">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white/5 backdrop-blur-md border border-white/10 p-10 sm:p-12 md:p-20 text-center text-white shadow-2xl shadow-[#3F2965]/20">
            {/* Decorative Brand Accents */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#DD1764]/20 rounded-full blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#3F2965]/40 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                Ready to Begin Your Journey?
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                Take the first step toward understanding your mind and building emotional clarity.
              </p>
              <Link
                href="/book-session"
                className="inline-flex px-10 py-4 md:px-12 md:py-5 rounded-full bg-white text-[#3F2965] font-medium text-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:scale-[1.03] active:scale-95 shadow-md items-center justify-center"
              >
                Book Your First Session
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
