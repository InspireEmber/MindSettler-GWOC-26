
import Link from "next/link";

export default function ReadyToBook() {
  return (
    <section className="py-10 sm:py-14 md:py-20 lg:py-24 px-4 sm:px-6">
      <div
        className="max-w-5xl mx-auto relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12 md:p-16 lg:p-24 text-center text-[#eeb9ff] shadow-2xl shadow-[#3F2965]/30 min-h-[400px] flex flex-col items-center justify-center isolate"
      >
        {/* --- Background Image --- */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/StockCake-Purple_Mountain_Twilight-1827238-standard.jpg"
            alt="Background Pattern"
            className="w-full h-full object-cover"
          />
          {/* Blur Overlay */}
          <div className="absolute inset-0 backdrop-blur-[2px] bg-black/60" />
        </div>

        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-serif italic mb-6 sm:mb-8 leading-tight px-2">
            Begin Your Journey to Serenity
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-serif italic opacity-90 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
            "A sanctuary where compassion meets professional care."
          </p>
          <Link
            href="/book-session"
            className="inline-flex px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-white text-[#3F2965] font-bold text-base sm:text-lg hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 transition-all min-h-[44px] items-center justify-center"
          >
            Book Your First Session
          </Link>
        </div>
      </div>
    </section >
  );
}
