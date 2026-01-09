"use client";

import { useRef } from "react";
import Link from "next/link";

export default function ReadyToBook() {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section className="py-10 sm:py-14 md:py-20 lg:py-24 px-4 sm:px-6">
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        className="max-w-5xl mx-auto relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12 md:p-16 lg:p-24 text-center text-[#eeb9ff] shadow-2xl shadow-[#3F2965]/30 min-h-[400px] flex flex-col items-center justify-center isolate group"
        style={{
          "--mouse-x": "50%",
          "--mouse-y": "50%",
          "--spotlight-color": "rgba(238, 185, 255, 0.25)",
        }}
      >
        {/* Spotlight Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%)",
          }}
        />

        {/* --- Background Image --- */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978724/mindsettler_assets/StockCake-Purple_Mountain_Twilight-1827238-standard.jpg"
            alt="Background Pattern"
            className="w-full h-full object-cover"
          />
          {/* Blur Overlay */}
          <div className="absolute inset-0 backdrop-blur-[2px] bg-black/60" />
        </div>

        <div className="relative z-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-serif italic mb-6 sm:mb-8 leading-tight px-2">
            Start Your Path to Peace
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-serif italic opacity-90 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
            "A safe place for kind and professional help."
          </p>
          <Link
            href="/book-session"
            className="inline-flex px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-[#eeb9ff] text-[#3F2965] font-bold text-base sm:text-lg hover:shadow-[0_20px_50px_rgba(238,185,255,0.4)] hover:bg-[#eeb9ff]/90 hover:scale-105 active:scale-95 transition-all min-h-[44px] items-center justify-center"
          >
            Book Your First Session
          </Link>
        </div>
      </div>
    </section>
  );
}
