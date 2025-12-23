"use client";
import Link from "next/link";
import FAQAccordion from "../../components/FAQAccordion";

export default function FAQsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA] py-12 sm:py-16 md:py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto mb-4 sm:mb-6" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#2E2A36] mb-4 sm:mb-6 leading-tight">
            Frequently Asked <span className="font-medium text-[#3F2965]">Questions</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#5E5A6B] leading-relaxed px-2">
            Everything you need to know about sessions, privacy, and the booking process.
          </p>
        </div>
      </section>

      {/* FAQs Content */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FAQAccordion />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-br from-[#3F2965] to-[#DD1764]">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 text-center">
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 sm:mb-6 leading-tight">
      Still Have Questions?
    </h2>
    <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed px-2">
      Feel free to reach out. We're here to help you understand how MindSettler can support your mental well-being journey.
    </p>
    <Link 
      href="/contact"
      className="inline-block px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-white text-[#3F2965] font-medium text-base sm:text-lg hover:bg-white/90 transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 min-h-[44px] flex items-center justify-center"
    >
      Contact Us
    </Link>
  </div>
</section>
    </div>
  );
}
