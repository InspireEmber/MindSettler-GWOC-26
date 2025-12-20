import Link from "next/link";
import { Calendar, CheckCircle, Users, Lightbulb, Clock, Shield, Globe } from "lucide-react";

const STEPS = [
  {
    num: "01",
    title: "Book Your Session",
    desc: "Choose between online or offline sessions and select a convenient 60-minute time slot that works for you.",
    icon: <Calendar className="w-8 h-8" />
  },
  {
    num: "02",
    title: "Confirmation & Preparation",
    desc: "Once your booking is confirmed, you'll receive session details and a brief guide to help you prepare.",
    icon: <CheckCircle className="w-8 h-8" />
  },
  {
    num: "03",
    title: "Attend Your Session",
    desc: "Join your structured 60-minute psycho-education session in a calm, confidential environment focused on awareness.",
    icon: <Users className="w-8 h-8" />
  },
  {
    num: "04",
    title: "Reflect & Apply",
    desc: "Take time to reflect on what you've learned and apply the insights in your daily life to build emotional clarity.",
    icon: <Lightbulb className="w-8 h-8" />
  }
];

const DETAILS = [
  { title: "60 Minutes", desc: "Structured duration", color: "#3F2965", icon: <Clock /> },
  { title: "Confidential", desc: "Safe and private", color: "#DD1764", icon: <Shield /> },
  { title: "Online/Offline", desc: "Your preferred format", color: "#3F2965", icon: <Globe /> }
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white text-[#5E5A6B]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA] py-20 md:py-32 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-light text-[#2E2A36] mb-6">
            How It <span className="font-medium text-[#3F2965]">Works</span>
          </h1>
          <p className="text-xl">A simple, structured journey toward emotional clarity and mental well-being.</p>
        </div>
      </section>

      {/* Timeline Steps */}
      <section className="py-16 md:py-24 max-w-6xl mx-auto px-6 space-y-24">
        {STEPS.map((step, i) => (
          <div key={i} className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className={i % 2 !== 0 ? 'md:order-2' : ''}>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-light text-[#3F2965]/20">{step.num}</span>
                <div className="h-1 w-16 bg-[#3F2965] rounded-full" />
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-[#2E2A36] mb-6">{step.title}</h2>
              <p className="text-lg leading-relaxed">{step.desc}</p>
            </div>
            <div className={`${i % 2 !== 0 ? 'md:order-1' : ''} h-64 md:h-80 rounded-3xl bg-gradient-to-br from-[#E9E6F2] to-[#F6F4FA] flex flex-col items-center justify-center`}>
              <div className="w-20 h-20 mb-4 rounded-full bg-[#3F2965]/10 flex items-center justify-center text-[#3F2965]">
                {step.icon}
              </div>
              <p className="font-medium">Step {step.num}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Session Details Grid */}
      <section className="py-20 bg-[#F6F4FA]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-[#2E2A36] mb-12">Session Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DETAILS.map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white border border-[#3F2965]/5 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                   {item.icon}
                </div>
                <h3 className="text-xl font-medium mb-2" style={{ color: item.color }}>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-light text-[#2E2A36] mb-6">Ready to Start?</h2>
          <p className="text-lg mb-10 leading-relaxed">Book your first session and take the first step toward understanding your mind.</p>
          <Link href="/book-session" className="px-10 py-4 rounded-full bg-[#3F2965] text-white font-medium text-lg hover:shadow-xl transition-all active:scale-95 inline-block">
            Book Your First Session
          </Link>
        </div>
      </section>
    </div>
  );
}