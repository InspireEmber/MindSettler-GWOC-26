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
    <div className="min-h-screen bg-white text-[#5E5A6B]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#3F2965] hover:gap-3 transition-all mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Resources
          </Link>
          <h1 className="text-4xl md:text-5xl font-light text-[#2E2A36] mb-6">
            Helpful <span className="font-medium text-[#3F2965]">Links</span>
          </h1>
          <p className="text-xl leading-relaxed">
            A curated directory of trusted global organizations and support services.
          </p>
        </div>
      </section>

      {/* Links Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          {HELPFUL_RESOURCES.map((section, i) => (
            <div key={i} className="group">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gray-50 border border-gray-100 shadow-sm">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-medium text-[#2E2A36]">{section.category}</h2>
              </div>
              <p className="text-[#5E5A6B] mb-6 leading-relaxed max-w-2xl">
                {section.description}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-xl border border-[#3F2965]/10 bg-[#F6F4FA] hover:bg-white hover:border-[#3F2965]/30 hover:shadow-md transition-all group/link"
                    >
                      <span className="text-[#3F2965] font-medium">{link.name}</span>
                      <ExternalLink size={14} className="text-[#3F2965]/40 group-hover/link:text-[#DD1764] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-2xl bg-[#F6F4FA] border border-[#3F2965]/10 p-6 text-sm italic leading-relaxed">
            <p>
              <strong>Disclaimer:</strong> This content is provided for awareness and educational purposes only. It does not replace professional
              diagnosis, treatment, or emergency care. MindSettler is not responsible for the content of external sites.
            </p>
          </div>
        </div>
      </section>

      {/* Persistent Vibrant CTA */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-[#3F2965] to-[#DD1764]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Take the first step toward understanding your mind and building emotional clarity.
          </p>
          <Link 
            href="/book-session" 
            className="inline-block px-10 py-4 rounded-full bg-white text-[#3F2965] font-medium text-lg hover:bg-white/90 transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 shadow-lg"
          >
            Book Your First Session
          </Link>
        </div>
      </section>
    </div>
  );
}