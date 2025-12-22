"use client";

export default function JourneyPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl text-center">
        <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-light text-[#2E2A36] mb-4">
          Journey Page Coming Soon
        </h1>
        <p className="text-lg md:text-xl text-[#5E5A6B] leading-relaxed mb-8">
          We are designing an interactive way to help you reflect on your thoughts,
          track sessions, and understand your emotional patterns over time.
        </p>
        <p className="text-sm text-[#8A8698]">
          For now, you can book a session or explore our psycho-education resources
          from the main navigation.
        </p>
      </div>
    </div>
  );
}