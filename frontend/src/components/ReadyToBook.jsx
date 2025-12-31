
import Link from "next/link";

export default function ReadyToBook() {
  return (
    <section className="py-10 sm:py-14 md:py-20 lg:py-24 px-4 sm:px-6">
      <div 
        className="max-w-5xl mx-auto relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12 md:p-16 lg:p-24 text-center text-white shadow-2xl shadow-[#3F2965]/30"
        style={{
          background: "linear-gradient(90deg, hsla(286, 28%, 66%, 1) 0%, hsla(340, 73%, 75%, 1) 50%, hsla(263, 47%, 58%, 1) 100%)",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Decorative Brand Accents */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#DD1764]/15 rounded-full blur-[80px]" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#3F2965]/40 rounded-full blur-[80px]" />

        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light mb-6 sm:mb-8 leading-tight px-2">
            Ready to write your next chapter?
          </h2>
          <p className="text-base sm:text-lg md:text-xl opacity-90 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
            Step into a space where your mental well-being is prioritized
            through understanding and professional care.
          </p>
          <Link
            href="/book-session"
            className="inline-flex px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-white text-[#3F2965] font-bold text-base sm:text-lg hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all min-h-[44px] items-center justify-center"
          >
            Book Your First Session
          </Link>
        </div>
      </div>
    </section>
  );
}
