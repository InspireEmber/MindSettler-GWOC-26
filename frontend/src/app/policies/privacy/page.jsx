import Link from "next/link";
import { ShieldCheck, Database, EyeOff, UserCircle, Mail } from "lucide-react";

const POLICY_DATA = [
  {
    title: "Information We Collect",
    icon: <Database className="w-5 h-5" />,
    intro: "We collect information you provide directly to us when you:",
    items: ["Book a session or make an inquiry", "Contact us through our website", "Subscribe to our communications"],
    extra: "This may include your name, email, phone number, and message content."
  },
  {
    title: "How We Use Your Information",
    icon: <UserCircle className="w-5 h-5" />,
    intro: "We use the collected data to:",
    items: ["Process and manage bookings", "Communicate about your sessions", "Respond to inquiries", "Improve our website experience"]
  },
  {
    title: "Sharing & Protection",
    icon: <EyeOff className="w-5 h-5" />,
    intro: "We do not sell or rent your data. Sharing only occurs:",
    items: ["With your explicit consent", "To comply with legal obligations", "To protect our rights and safety"]
  }
];

export default function PrivacyPolicyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-white text-[#5E5A6B]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA] py-20 md:py-32 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-light text-[#2E2A36] mb-6">
            Privacy <span className="font-medium text-[#3F2965]">Policy</span>
          </h1>
          <p className="text-xl">How we collect, use, and protect your information.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 max-w-4xl mx-auto px-6">
        <div className="space-y-16">
          <div className="flex items-center gap-2 text-sm font-medium text-[#3F2965]/60 uppercase tracking-widest">
            <ShieldCheck size={16} /> Last Updated: {lastUpdated}
          </div>

          <div className="grid gap-16">
            {POLICY_DATA.map((section, i) => (
              <div key={i} className="group">
                <div className="flex items-center gap-3 mb-6">
                   <div className="p-2 rounded-lg bg-[#3F2965]/10 text-[#3F2965]">
                     {section.icon}
                   </div>
                   <h2 className="text-2xl font-medium text-[#2E2A36]">{section.title}</h2>
                </div>
                <p className="mb-4 leading-relaxed">{section.intro}</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#DD1764] mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                {section.extra && <p className="text-sm italic opacity-80">{section.extra}</p>}
              </div>
            ))}
          </div>

          {/* Contact Summary */}
          <div className="p-8 rounded-3xl bg-[#F6F4FA] border border-[#3F2965]/10">
            <h3 className="text-xl font-medium text-[#2E2A36] mb-4">Exercise Your Rights</h3>
            <p className="text-sm leading-relaxed mb-6">
              You have the right to access, correct, or delete your personal information at any time. 
              To exercise these rights, please reach out to us.
            </p>
            <a href="mailto:info@mindsettler.com" className="inline-flex items-center gap-2 text-[#3F2965] font-semibold hover:underline">
              <Mail size={16} /> info@mindsettler.com
            </a>
          </div>
        </div>
      </section>

      {/* Persistent Vibrant CTA */}
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
                className="inline-flex px-10 py-4 md:px-12 md:py-5 rounded-full bg-white text-[#3F2965] font-medium text-lg hover:bg-white/95 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:scale-[1.03] active:scale-95 items-center justify-center"
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