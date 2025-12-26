import Link from "next/link";
import ReadyToBook from "@/components/ReadyToBook";

const APPROACHES = [
  {
    title: "Structured Learning",
    desc: "Our sessions follow a structured format designed to help you understand mental health concepts in a clear, digestible way.",
  },
  {
    title: "Guided Exploration",
    desc: "Sessions are guided by professionals helping you explore thoughts in a safe, non-judgmental environment.",
  },
  {
    title: "Practical Application",
    desc: "Focus on practical tools and strategies you can apply daily to build emotional resilience.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-[#5E5A6B]">
      {/* Founder Intro Section */}

      <section className="bg-white py-10 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid md:grid-cols-[240px_1fr] gap-10 items-center">
          {/* Left – Profile Image */}
          <div className="flex justify-center md:justify-start">
            <div className="w-60 h-60 rounded-full overflow-hidden shadow-lg flex-shrink-0">
              <img
                src="/images/parnika.jpeg"
                alt="Parnika Bajaj – Psychotherapist"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right – Text (Vertically Centered via 'items-center' on the grid) */}
          <div className="flex flex-col justify-center">
            <p className="text-[16px] leading-[1.7] text-[#5E5A6B] m-0">
              Hello, I’m{" "}
              <span className="font-semibold text-[#3F2965]">
                Parnika Bajaj
              </span>
              , a Psychotherapist born and raised in Surat, Gujarat. I hold a
              B.Sc. in Psychology (Honours) from the University of Edinburgh and
              a Master’s degree in Counselling Psychology from Golden Gate
              University, San Francisco. MindSettler by Parnika is my initiative
              to create a safe, supportive space where individuals can better
              understand and navigate their mental and emotional well-being. I
              strongly believe that mental health is as important as physical
              and spiritual health, and through structured psycho-education and
              awareness, meaningful and lasting change becomes possible.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Identity Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#F6F4FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="h-1 w-10 rounded-full bg-gradient-to-r from-[#3F2965] to-[#DD1764]" />
            <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-[#3F2965]">
              Our Identity
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2E2A36] mb-6">
            The Meaning Behind Our Logo & Colours
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-[#5E5A6B] mb-5">
            The MindSettler logo is a mindful representation of the balance
            between emotion and logic that every individual inevitably needs.
            The purple in the logo represents wisdom and spirituality, while
            pink reflects innocence and a nurturing nature—symbolising the
            softness and vulnerability of the heart.
          </p>

          <p className="text-base sm:text-lg leading-relaxed text-[#5E5A6B]">
            While the heart is commonly associated with emotions, the geometric
            heart in the logo reflects the presence of logic within emotional
            experiences. The brain represents the physical and cognitive aspects
            of the body, united with the heart to highlight the deep connection
            between emotions and physiology, and the interconnected nature of
            mental well-being.
          </p>
        </div>
      </section>

      {/* Mission & Vision Sections */}
      {[
        {
          label: "Our Mission",
          title: "Empowering Mental Clarity",
          color: "#3F2965",
          bg: "bg-white",
          icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
        },
        {
          label: "Our Vision",
          title: "A World of Emotional Understanding",
          color: "#DD1764",
          bg: "bg-white",
          icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
          reverse: true,
        },
      ].map((s, i) => (
        <section key={i} className={`py-12 sm:py-16 md:py-20 lg:py-24 ${s.bg}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div className={s.reverse ? "md:order-2" : ""}>
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div
                  className="h-1 w-8 sm:w-12 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                <span
                  className="text-xs sm:text-sm font-medium uppercase tracking-wider"
                  style={{ color: s.color }}
                >
                  {s.label}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2E2A36] mb-4 sm:mb-6 leading-tight">
                {s.title}
              </h2>

              {s.label === "Our Mission" ? (
                <>
                  <p className="text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
                    MindSettler’s mission is to support individuals in
                    understanding their mental and emotional experiences in a
                    structured, informed, and compassionate manner.
                  </p>
                  <p className="text-base sm:text-lg leading-relaxed">
                    Through psycho-education and guided exploration, we help
                    people develop clarity around their thoughts, emotions, and
                    behavioural patterns—empowering them to build emotional
                    balance and self-awareness in everyday life.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
                    Our vision is a world where mental health awareness feels
                    natural, accessible, and free from stigma.
                  </p>
                  <p className="text-base sm:text-lg leading-relaxed">
                    We aspire to foster a culture where emotional understanding
                    is valued, self-awareness is encouraged, and individuals
                    feel confident in caring for their mental well-being with
                    the same importance as physical health.
                  </p>
                </>
              )}
            </div>

            <div
              className={`${
                s.reverse ? "md:order-1" : ""
              } h-48 sm:h-64 md:h-80 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#E9E6F2] to-[#F6F4FA] flex flex-col items-center justify-center mt-6 md:mt-0`}
            >
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${s.color}1A` }}
              >
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10"
                  fill="none"
                  stroke={s.color}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={s.icon}
                  />
                </svg>
              </div>
              <p className="font-medium text-sm sm:text-base">{s.label}</p>
            </div>
          </div>
        </section>
      ))}

      {/* Approach Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          {/* Light Violet Shade Background Accent - Matches the image feel */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-[#3F2965]/5 rounded-[100px] blur-3xl -z-10" />

          {/* Updated Heading Style based on provided image */}
          <div className="text-center mb-16 md:mb-24">
            <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto mb-8" />

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-[#2E2A36] leading-[1.1] tracking-tight mb-4">
              Our Psycho-Education <br className="hidden sm:block" />
              <span className="font-light italic text-[#3F2965]">Approach</span>
            </h2>

            <p className="text-[#5E5A6B] font-light tracking-[0.2em] uppercase text-[10px] sm:text-xs mt-6 opacity-80">
              A World of Emotional Understanding
            </p>
          </div>

          {/* Remaining Content Stays Exactly the Same */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-[#3F2965]/10 -translate-y-1/2 z-0" />

            {/* Card 1 */}
            <div className="group relative z-10 bg-[#F6F4FA] p-8 rounded-2xl border border-[#3F2965]/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#3F2965]/5">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-4xl font-serif italic text-[#3F2965]/20">
                  01
                </span>
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-[#3F2965]" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-[#3F2965] mb-4">
                Thoughtful & Structured Sessions
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#5E5A6B]">
                Sessions at MindSettler follow a thoughtful and structured
                format, designed to help individuals better understand mental
                health concepts in a clear and accessible way.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative z-10 bg-[#F6F4FA] p-8 rounded-2xl border border-[#3F2965]/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#3F2965]/5 md:mt-8">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-4xl font-serif italic text-[#3F2965]/20">
                  02
                </span>
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-[#DD1764]" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-[#3F2965] mb-4">
                Guided Reflection with Parnika
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#5E5A6B]">
                Each session is personally guided by me, offering a safe,
                non-judgmental space. The focus remains on understanding
                thoughts and emotions at one’s own pace.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group relative z-10 bg-[#F6F4FA] p-8 rounded-2xl border border-[#3F2965]/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#3F2965]/5">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-4xl font-serif italic text-[#3F2965]/20">
                  03
                </span>
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-[#3F2965]" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-[#3F2965] mb-4">
                Practical Awareness for Daily Life
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#5E5A6B]">
                The approach emphasises practical awareness—helping individuals
                apply insights from sessions to everyday situations to support
                emotional balance and mindful decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>
      <ReadyToBook />
    </div>
  );
}
