import Link from "next/link";

const APPROACHES = [
  { title: "Structured Learning", desc: "Our sessions follow a structured format designed to help you understand mental health concepts in a clear, digestible way." },
  { title: "Guided Exploration", desc: "Sessions are guided by professionals helping you explore thoughts in a safe, non-judgmental environment." },
  { title: "Practical Application", desc: "Focus on practical tools and strategies you can apply daily to build emotional resilience." }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-[#5E5A6B]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA] py-12 sm:py-16 md:py-20 lg:py-32 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto mb-4 sm:mb-6" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#2E2A36] mb-4 sm:mb-6 leading-tight">
            About <span className="font-medium text-[#3F2965]">MindSettler</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed px-2">A compassionate platform dedicated to mental well-being through structured psycho-education.</p>
        </div>
      </section>

      {/* Mission & Vision Sections */}
      {[ 
        { label: "Our Mission", title: "Empowering Mental Clarity", color: "#3F2965", bg: "bg-white", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
        { label: "Our Vision", title: "A World of Emotional Understanding", color: "#DD1764", bg: "bg-[#F6F4FA]", icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z", reverse: true }
      ].map((s, i) => (
        <section key={i} className={`py-12 sm:py-16 md:py-20 lg:py-24 ${s.bg}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            <div className={s.reverse ? "md:order-2" : ""}>
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="h-1 w-8 sm:w-12 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-xs sm:text-sm font-medium uppercase tracking-wider" style={{ color: s.color }}>{s.label}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2E2A36] mb-4 sm:mb-6 leading-tight">{s.title}</h2>
              <p className="text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">MindSettler provides a safe, confidential space to explore thoughts with professional guidance.</p>
              <p className="text-base sm:text-lg leading-relaxed">We strive to foster a culture of empathy, understanding, and proactive mental health care.</p>
            </div>
            <div className={`${s.reverse ? "md:order-1" : ""} h-48 sm:h-64 md:h-80 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#E9E6F2] to-[#F6F4FA] flex flex-col items-center justify-center mt-6 md:mt-0`}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${s.color}1A` }}>
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke={s.color} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} /></svg>
              </div>
              <p className="font-medium text-sm sm:text-base">{s.label} Visual</p>
            </div>
          </div>
        </section>
      ))}

      {/* Approach Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto mb-6 sm:mb-8 md:mb-12" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2E2A36] mb-8 sm:mb-10 md:mb-12 leading-tight">Our Psycho-Education Approach</h2>
          <div className="space-y-6 sm:space-y-8 text-left">
            {APPROACHES.map((item, i) => (
              <div key={i} className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-[#F6F4FA] border border-[#3F2965]/10 hover:border-[#3F2965]/30 transition-colors">
                <h3 className="text-xl sm:text-2xl font-medium text-[#3F2965] mb-3 sm:mb-4">{item.title}</h3>
                <p className="text-sm sm:text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}






// export default function AboutPage() {
//   return (
//     <div className="min-h-screen bg-white">
 
//       <section className="bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA] py-20 md:py-32">
//         <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
//           <div className="inline-block mb-6">
//             <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto"></div>
//           </div>
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#2E2A36] mb-6">
//             About <span className="font-medium text-[#3F2965]">MindSettler</span>
//           </h1>
//           <p className="text-xl text-[#5E5A6B] leading-relaxed">
//             A compassionate platform dedicated to mental well-being through structured psycho-education and guidance.
//           </p>
//         </div>
//       </section>

 
//       <section className="py-16 md:py-24 bg-white">
//         <div className="max-w-6xl mx-auto px-6 md:px-12">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
//             <div>
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="h-1 w-12 bg-[#3F2965] rounded-full"></div>
//                 <span className="text-sm font-medium text-[#3F2965] tracking-wider uppercase">Our Mission</span>
//               </div>
//               <h2 className="text-3xl md:text-4xl font-light text-[#2E2A36] mb-6">
//                 Empowering Mental Clarity
//               </h2>
//               <p className="text-lg text-[#5E5A6B] leading-relaxed mb-4">
//                 MindSettler is committed to helping individuals understand their mental health journey through 
//                 calm, structured psycho-education sessions. We believe that awareness and understanding are the 
//                 first steps toward emotional well-being.
//               </p>
//               <p className="text-lg text-[#5E5A6B] leading-relaxed">
//                 Our mission is to provide a safe, confidential space where you can explore your thoughts and 
//                 emotions with professional guidance, without judgment or pressure.
//               </p>
//             </div>
//             <div className="h-64 md:h-80 rounded-2xl bg-gradient-to-br from-[#E9E6F2] to-[#F6F4FA] flex items-center justify-center">
//               <div className="text-center p-8">
//                 <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#3F2965]/10 flex items-center justify-center">
//                   <svg className="w-10 h-10 text-[#3F2965]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                   </svg>
//                 </div>
//                 <p className="text-[#5E5A6B] font-medium">Mission Visual</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Vision Section */}
//       <section className="py-16 md:py-24 bg-[#F6F4FA]">
//         <div className="max-w-6xl mx-auto px-6 md:px-12">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
//             <div className="order-2 md:order-1 h-64 md:h-80 rounded-2xl bg-gradient-to-br from-[#E9E6F2] to-[#F6F4FA] flex items-center justify-center">
//               <div className="text-center p-8">
//                 <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#DD1764]/10 flex items-center justify-center">
//                   <svg className="w-10 h-10 text-[#DD1764]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                   </svg>
//                 </div>
//                 <p className="text-[#5E5A6B] font-medium">Vision Visual</p>
//               </div>
//             </div>
//             <div className="order-1 md:order-2">
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="h-1 w-12 bg-[#DD1764] rounded-full"></div>
//                 <span className="text-sm font-medium text-[#DD1764] tracking-wider uppercase">Our Vision</span>
//               </div>
//               <h2 className="text-3xl md:text-4xl font-light text-[#2E2A36] mb-6">
//                 A World of Emotional Understanding
//               </h2>
//               <p className="text-lg text-[#5E5A6B] leading-relaxed mb-4">
//                 We envision a future where mental health awareness is accessible to everyone. Through our 
//                 psycho-education approach, we aim to break down barriers and create a supportive community 
//                 where individuals feel empowered to understand and navigate their emotional landscape.
//               </p>
//               <p className="text-lg text-[#5E5A6B] leading-relaxed">
//                 Our vision extends beyond individual sessions—we strive to foster a culture of empathy, 
//                 understanding, and proactive mental health care.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Psycho-Education Approach Section */}
//       <section className="py-16 md:py-24 bg-white">
//         <div className="max-w-4xl mx-auto px-6 md:px-12">
//           <div className="text-center mb-12">
//             <div className="inline-block mb-6">
//               <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto"></div>
//             </div>
//             <h2 className="text-3xl md:text-4xl font-light text-[#2E2A36] mb-6">
//               Our Psycho-Education Approach
//             </h2>
//             <p className="text-lg text-[#5E5A6B] leading-relaxed">
//               We believe in education as the foundation of mental well-being
//             </p>
//           </div>

//           <div className="space-y-8">
//             <div className="p-8 rounded-2xl bg-[#F6F4FA] border border-[#3F2965]/10">
//               <h3 className="text-2xl font-medium text-[#3F2965] mb-4">Structured Learning</h3>
//               <p className="text-[#5E5A6B] leading-relaxed">
//                 Our sessions follow a structured format designed to help you understand mental health concepts, 
//                 emotional patterns, and coping strategies in a clear, digestible way.
//               </p>
//             </div>

//             <div className="p-8 rounded-2xl bg-[#F6F4FA] border border-[#3F2965]/10">
//               <h3 className="text-2xl font-medium text-[#3F2965] mb-4">Guided Exploration</h3>
//               <p className="text-[#5E5A6B] leading-relaxed">
//                 Each session is guided by trained professionals who help you explore your thoughts and emotions 
//                 in a safe, non-judgmental environment. We provide the framework; you bring your unique experience.
//               </p>
//             </div>

//             <div className="p-8 rounded-2xl bg-[#F6F4FA] border border-[#3F2965]/10">
//               <h3 className="text-2xl font-medium text-[#3F2965] mb-4">Practical Application</h3>
//               <p className="text-[#5E5A6B] leading-relaxed">
//                 Beyond understanding, we focus on practical tools and strategies you can apply in your daily life 
//                 to navigate challenges and build emotional resilience.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
