import Link from "next/link";
import { ShieldCheck, Database, EyeOff, UserCircle, Mail } from "lucide-react";
import ReadyToBook from "@/components/ReadyToBook";

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
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-8 md:pt-32 md:pb-12 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-1 w-24 bg-gradient-to-r from-white/20 via-white to-white/20 rounded-full mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-light text-white mb-6">
            Privacy <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#eeb9ff] to-[#fff]">Policy</span>
          </h1>
          <p className="text-xl text-gray-200 font-redhat">How we collect, use, and protect your information.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 py-16 md:py-24 max-w-4xl mx-auto px-6">
        <div className="space-y-16">
          <div className="flex items-center gap-2 text-sm font-medium text-[#eeb9ff]/80 uppercase tracking-widest">
            <ShieldCheck size={16} /> Last Updated: {lastUpdated}
          </div>

          <div className="grid gap-16">
            {POLICY_DATA.map((section, i) => (
              <div key={i} className="group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-white/10 text-[#eeb9ff]">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-medium text-white">{section.title}</h2>
                </div>
                <p className="mb-4 leading-relaxed text-gray-200 font-redhat">{section.intro}</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#DD1764] mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                {section.extra && <p className="text-sm italic text-gray-400 opacity-80 font-redhat">{section.extra}</p>}
              </div>
            ))}
          </div>

          {/* Contact Summary */}
          <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20">
            <h3 className="text-xl font-medium text-white mb-4">Exercise Your Rights</h3>
            <p className="text-sm leading-relaxed mb-6 text-gray-200 font-redhat">
              You have the right to access, correct, or delete your personal information at any time.
              To exercise these rights, please reach out to us.
            </p>
            <a href="mailto:info@mindsettler.com" className="inline-flex items-center gap-2 text-[#eeb9ff] font-semibold hover:underline">
              <Mail size={16} /> info@mindsettler.com
            </a>
          </div>
        </div>
      </section>

      <ReadyToBook />
    </div>
  );
}
