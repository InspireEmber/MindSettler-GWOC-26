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
    <div className="min-h-screen bg-white text-[#5E5A6B]">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/resources" className="inline-flex items-center gap-2 text-sm font-medium text-[#3F2965] hover:gap-3 transition-all mb-8 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Resources
          </Link>
          <h1 className="text-4xl md:text-5xl font-light text-[#2E2A36] mb-6">
            Articles & <span className="font-medium text-[#3F2965]">Blogs</span>
          </h1>
          <p className="text-xl leading-relaxed max-w-2xl">
            Verified external resources to support your learning journey in mental well-being and emotional clarity.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ARTICLES.map((post, i) => (
              <div key={i} className="flex flex-col p-8 rounded-3xl bg-[#F6F4FA] border border-[#3F2965]/10 hover:shadow-xl hover:border-[#3F2965]/30 transition-all group">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#DD1764]">{post.category}</span>
                  <div className="flex items-center gap-1 text-xs">
                    <Clock size={12} /> {post.readTime}
                  </div>
                </div>
                <h2 className="text-2xl font-medium text-[#2E2A36] mb-4 group-hover:text-[#3F2965] transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed mb-8 flex-grow">{post.excerpt}</p>
                
                {/* External Link Logic */}
                <a 
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#3F2965] group/link"
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
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="rounded-2xl bg-[#F6F4FA] border border-[#3F2965]/10 p-6 text-sm italic leading-relaxed">
            <p>
              <strong>Disclaimer:</strong> These are external educational resources. MindSettler is not responsible for the content on third-party websites. This content does not replace professional diagnosis or emergency care.
            </p>
          </div>
        </div>
      </section>

      {/* Your Persistent Vibrant CTA */}
      <section className="py-24 md:py-32 bg-[#F6F4FA]/50">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#3F2965] to-[#2E2A36] p-10 sm:p-12 md:p-20 text-center text-white shadow-2xl shadow-[#3F2965]/30">
            {/* Decorative Brand Accents */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#DD1764]/15 rounded-full blur-[80px]" />
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
                className="inline-flex px-10 py-4 md:px-12 md:py-5 rounded-full bg-white text-[#3F2965] font-medium text-lg hover:bg-white/95 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:scale-[1.03] active:scale-95 shadow-lg items-center justify-center"
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



// import Link from "next/link";

// export default function ArticlesResourcesPage() {
//   return (
//     <div className="min-h-screen bg-white">
//       <section className="bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA] py-16 md:py-24">
//         <div className="max-w-4xl mx-auto px-6 md:px-12">
//           <Link
//             href="/resources"
//             className="inline-flex items-center text-sm text-[#5E5A6B] hover:text-[#3F2965] mb-6"
//           >
//             Back to Resources
//           </Link>
//           <h1 className="text-4xl md:text-5xl font-light text-[#2E2A36] mb-4">
//             Articles &amp; Blogs
//           </h1>
//           <p className="text-lg text-[#5E5A6B] leading-relaxed">
//             A calm space where written pieces will be added to support understanding and reflection.
//           </p>
//         </div>
//       </section>

//       <section className="py-12 md:py-16 bg-white">
//         <div className="max-w-5xl mx-auto px-6 md:px-12">
//           <div className="rounded-2xl border border-[#3F2965]/10 bg-[#F6F4FA] p-8 text-center">
//             <h2 className="text-2xl font-medium text-[#2E2A36] mb-3">Content will be added soon</h2>
//             <p className="text-[#5E5A6B] leading-relaxed max-w-2xl mx-auto">
//               This section will later include articles and blog-style reflections created specifically for MindSettler.
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="py-10 bg-[#F6F4FA]">
//         <div className="max-w-5xl mx-auto px-6 md:px-12">
//           <div className="rounded-2xl bg-white border border-[#3F2965]/10 p-6 text-sm text-[#5E5A6B] leading-relaxed">
//             <p>
//               This content is provided for awareness and educational purposes only. It does not replace professional
//               diagnosis, treatment, or emergency care.
//             </p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
