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
      <section className="bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA] py-12 sm:py-16 md:py-20 lg:py-32 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto mb-4 sm:mb-6" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#2E2A36] mb-4 sm:mb-6 leading-tight">
            How It <span className="font-medium text-[#3F2965]">Works</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl px-2">A simple, structured journey toward emotional clarity and mental well-being.</p>
        </div>
      </section>

      {/* Timeline Steps */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 max-w-6xl mx-auto px-4 sm:px-6 space-y-16 sm:space-y-20 md:space-y-24">
        {STEPS.map((step, i) => (
          <div key={i} className={`grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className={i % 2 !== 0 ? 'md:order-2' : ''}>
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <span className="text-4xl sm:text-5xl font-light text-[#3F2965]/20">{step.num}</span>
                <div className="h-1 w-12 sm:w-16 bg-[#3F2965] rounded-full" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2E2A36] mb-4 sm:mb-6 leading-tight">{step.title}</h2>
              <p className="text-base sm:text-lg leading-relaxed">{step.desc}</p>
            </div>
            <div className={`${i % 2 !== 0 ? 'md:order-1' : ''} h-48 sm:h-64 md:h-80 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#E9E6F2] to-[#F6F4FA] flex flex-col items-center justify-center mt-6 md:mt-0`}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4 rounded-full bg-[#3F2965]/10 flex items-center justify-center text-[#3F2965]">
                {step.icon}
              </div>
              <p className="font-medium text-sm sm:text-base">Step {step.num}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Session Details Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#F6F4FA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2E2A36] mb-8 sm:mb-10 md:mb-12 leading-tight">Session Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {DETAILS.map((item, i) => (
              <div key={i} className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-[#3F2965]/5 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                   {item.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-medium mb-2" style={{ color: item.color }}>{item.title}</h3>
                <p className="text-sm sm:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-br from-[#3F2965] to-[#DD1764]">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 text-center">
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 sm:mb-6 leading-tight">
      Ready to Start?
    </h2>
    <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed px-2">
      Book your first session and take the first step toward understanding your mind.
    </p>
    <Link 
      href="/book-session"
      className="inline-block px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-white text-[#3F2965] font-medium text-base sm:text-lg hover:bg-white/90 transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 min-h-[44px] flex items-center justify-center"
    >
      Book Your First Session
    </Link>
  </div>
</section>
    </div>
  );
}