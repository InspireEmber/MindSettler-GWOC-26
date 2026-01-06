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

      {/* Persistent Vibrant CTA */}
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