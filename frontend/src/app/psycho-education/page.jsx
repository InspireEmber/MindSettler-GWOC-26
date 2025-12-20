import Link from "next/link";
import { BookOpen, Brain, Sparkles, ShieldCheck, Users2 } from "lucide-react";

const CONCEPTS = [
  { title: "Emotional Awareness", desc: "Recognize and name emotions to understand your mental well-being. We explore why they matter.", icon: <Brain />, color: "text-[#3F2965]", bg: "bg-[#3F2965]/10" },
  { title: "Thought Patterns", desc: "Understand how thoughts influence feelings to develop healthier cognitive responses to life's challenges.", icon: <Sparkles />, color: "text-[#DD1764]", bg: "bg-[#DD1764]/10" },
  { title: "Stress Management", desc: "Practical strategies for managing anxiety and overwhelm to build resilience and maintain balance.", icon: <ShieldCheck />, color: "text-[#3F2965]", bg: "bg-[#3F2965]/10" },
  { title: "Relationships", desc: "Healthy relationship dynamics and boundaries are crucial for emotional growth and well-being.", icon: <Users2 />, color: "text-[#DD1764]", bg: "bg-[#DD1764]/10" }
];

const BENEFITS = [
  { title: "Builds Self-Awareness", desc: "Gain deeper insight into your emotional triggers through structured learning." },
  { title: "Reduces Stigma", desc: "Education normalizes mental health conversations and reduces fear or shame." },
  { title: "Empowers Decision-Making", desc: "Learn to make informed, healthier choices about your mental well-being." },
  { title: "Provides Practical Tools", desc: "Concrete techniques you can apply immediately to improve your daily experience." }
];

export default function PsychoEducationPage() {
  return (
    <div className="min-h-screen bg-white text-[#5E5A6B]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA] py-20 md:py-32 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-light text-[#2E2A36] mb-6">
            Psycho-<span className="font-medium text-[#3F2965]">Education</span>
          </h1>
          <p className="text-xl leading-relaxed">Understanding mental health through education, awareness, and structured guidance.</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-24 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-light text-[#2E2A36] mb-8">What is Psycho-Education?</h2>
        <div className="space-y-6 text-lg leading-relaxed mb-12">
          <p>Psycho-education combines psychological principles with educational methods to help individuals understand their emotions and behaviors. It empowers you with tools to navigate your mental well-being journey.</p>
          <p>Unlike traditional therapy, we focus on the "why" behind your thoughts, helping you build a foundation for meaningful change.</p>
        </div>
        <div className="h-64 rounded-3xl bg-gradient-to-br from-[#E9E6F2] to-[#F6F4FA] flex flex-col items-center justify-center border border-[#3F2965]/5">
          <div className="w-16 h-16 rounded-full bg-[#3F2965]/10 flex items-center justify-center text-[#3F2965] mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <span className="font-medium">Educational Content</span>
        </div>
      </section>

      {/* Concepts Grid */}
      <section className="py-20 bg-[#F6F4FA]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-[#2E2A36] mb-4">Key Concepts We Explore</h2>
            <p className="text-lg">Foundational knowledge for building emotional clarity</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CONCEPTS.map((c, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white border border-[#3F2965]/10 hover:shadow-xl transition-all">
                <div className={`w-12 h-12 rounded-full ${c.bg} ${c.color} flex items-center justify-center mb-6`}>
                  {c.icon}
                </div>
                <h3 className={`text-2xl font-medium mb-4 ${c.color}`}>{c.title}</h3>
                <p className="leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits List */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-light text-[#2E2A36] text-center mb-16">How Psycho-Education Helps</h2>
        <div className="space-y-8">
          {BENEFITS.map((b, i) => (
            <div key={i} className="flex gap-6 group">
              <div className="shrink-0 w-8 h-8 rounded-full bg-[#3F2965]/10 flex items-center justify-center mt-1 group-hover:scale-110 transition-transform">
                <div className="w-2 h-2 rounded-full bg-[#3F2965]" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-[#2E2A36] mb-2">{b.title}</h3>
                <p className="leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#F6F4FA] to-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-light text-[#2E2A36] mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-lg mb-10 leading-relaxed">Book your first 60-minute psycho-education session and take the first step toward emotional clarity.</p>
          <Link href="/book-session" className="px-10 py-4 rounded-full bg-[#3F2965] text-white font-medium text-lg hover:shadow-xl transition-all active:scale-95 inline-block">
            Book Your First Session
          </Link>
        </div>
      </section>
    </div>
  );
}