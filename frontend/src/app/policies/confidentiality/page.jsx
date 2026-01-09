import Link from "next/link";
import { ShieldAlert, Lock, Eye, FileCheck, UserPlus } from "lucide-react";
import ReadyToBook from "@/components/ReadyToBook";

const POLICY_SECTIONS = [
  {
    title: "What is Confidential",
    content: "All information shared during your sessions is considered confidential, including:",
    items: ["Personal information and contact details", "Content discussed during sessions", "Session notes and records", "Booking and appointment information"]
  },
  {
    title: "How We Protect Your Information",
    content: "We implement strict measures to protect your confidentiality:",
    items: ["Secure storage of session records", "Limited access to authorized personnel", "Encrypted communication channels", "Regular security audits"]
  },
  {
    title: "Information Sharing",
    content: "We do not share your information except in these limited circumstances:",
    items: ["With explicit written consent", "When required by law or court order", "To prevent imminent harm to self/others", "For professional supervision (anonymous)"]
  },
  {
    title: "Your Rights",
    content: "You have the right to:",
    items: ["Request data usage information", "Access your session records", "Request corrections to inaccurate info", "Withdraw consent for sharing"]
  }
];

export default function ConfidentialityPolicyPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-8 md:pt-32 md:pb-12 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-1 w-24 bg-gradient-to-r from-white/20 via-white to-white/20 rounded-full mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-light text-white mb-6">
            Confidentiality <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#eeb9ff] to-[#fff]">Policy</span>
          </h1>
          <p className="text-xl text-gray-200 font-redhat">Your privacy and confidentiality are our top priorities.</p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="relative z-10 py-16 md:py-24 max-w-4xl mx-auto px-6">
        <div className="space-y-12">
          {/* Pre-session Alert */}
          <div className="p-6 rounded-2xl bg-[#3F2965]/20 border border-[#3F2965]/40 flex items-center gap-4">
            <ShieldAlert className="text-[#eeb9ff] shrink-0" />
            <p className="text-[#eeb9ff] font-medium font-redhat">This policy must be acknowledged before your first session.</p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-light text-white">Our Commitment</h2>
            <p className="leading-relaxed text-gray-200 font-redhat">MindSettler is committed to maintaining the highest standards of privacy. All information shared is treated with the utmost respect and protection.</p>
          </div>

          {/* Dynamic Sections */}
          <div className="grid gap-12">
            {POLICY_SECTIONS.map((section, i) => (
              <div key={i} className="group">
                <h2 className="text-2xl font-medium text-white mb-4 group-hover:text-[#eeb9ff] transition-colors">{section.title}</h2>
                <p className="mb-4 text-gray-200 font-redhat">{section.content}</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#DD1764]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-medium text-white">Session Privacy & Records</h2>
            <p className="leading-relaxed text-sm text-gray-200 font-redhat">Online sessions use encrypted platforms, and offline sessions take place in confidential spaces. We maintain minimal records necessary and retain them only as long as required for legal purposes.</p>
          </div>

          <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20">
            <h3 className="text-xl font-medium text-white mb-2">Acknowledgment</h3>
            <p className="text-sm leading-relaxed mb-6 text-gray-200 font-redhat">By booking a session with MindSettler, you acknowledge that you have read, understood, and agree to this confidentiality policy.</p>
            <Link href="/contact" className="text-[#eeb9ff] font-medium hover:underline inline-flex items-center gap-2">
              Questions? Contact Us <Lock size={14} />
            </Link>
          </div>
        </div>
      </section>

      <ReadyToBook />
    </div>
  );
}
