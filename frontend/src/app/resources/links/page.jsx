import Link from "next/link";
import { ArrowLeft, ExternalLink, PhoneCall, Globe, GraduationCap } from "lucide-react";

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

export default function HelpfulLinksResourcesPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 z-10">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:gap-3 hover:text-white transition-all mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Resources
          </Link>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6">
            Helpful <span className="font-medium text-[#eeb9ff]">Links</span>
          </h1>
          <p className="text-xl leading-relaxed text-gray-200">
            A curated directory of trusted global organizations and support services.
          </p>
        </div>
      </section>

      {/* Links Grid */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          {HELPFUL_RESOURCES.map((section, i) => (
            <div key={i} className="group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-white/10 border border-white/20 shadow-sm backdrop-blur-md">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-medium text-white">{section.category}</h2>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-2xl">
                {section.description}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-[#eeb9ff]/30 hover:shadow-lg transition-all group/link"
                    >
                      <span className="text-gray-100 font-medium group-hover/link:text-[#eeb9ff] transition-colors">{link.name}</span>
                      <ExternalLink size={14} className="text-gray-400 group-hover/link:text-[#eeb9ff] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 text-sm italic leading-relaxed text-gray-400">
            <p>
              <strong>Disclaimer:</strong> This content is provided for awareness and educational purposes only. It does not replace professional
              diagnosis, treatment, or emergency care. MindSettler is not responsible for the content of external sites.
            </p>
          </div>
        </div>
      </section>

      {/* Custom Resource Navigation CTA */}
      <section className="py-24 md:py-32 relative z-10">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white/5 backdrop-blur-md border border-white/10 p-10 sm:p-12 md:p-20 text-center text-white shadow-2xl shadow-[#3F2965]/20 isolate">
            {/* Decorative Brand Accents */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#DD1764]/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#3F2965]/40 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                Continue Your <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#eeb9ff] to-white">Exploration</span>
              </h2>
              <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
                Our library is vast. Discover more articles, guides, and tools designed to support your path to clarity.
              </p>
              <Link
                href="/resources"
                className="inline-flex px-10 py-4 md:px-12 md:py-5 rounded-full bg-[#eeb9ff] text-[#3F2965] font-bold text-lg hover:bg-[#eeb9ff]/90 hover:shadow-[0_0_30px_rgba(238,185,255,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-xl items-center justify-center gap-2 group"
              >
                Browse All Resources
                <ArrowLeft size={20} className="rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}