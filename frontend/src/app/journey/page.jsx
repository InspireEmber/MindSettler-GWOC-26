"use client";

export default function JourneyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-x-hidden">
      <div className="max-w-2xl text-center relative z-10">
        <div className="h-1 w-16 bg-gradient-to-r from-[#eeb9ff] to-[#DD1764] rounded-full mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
          Journey Page Coming Soon
        </h1>
        <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
          We are designing an interactive way to help you reflect on your thoughts,
          track sessions, and understand your emotional patterns over time.
        </p>
        <p className="text-sm text-gray-400">
          For now, you can book a session or explore our psycho-education resources
          from the main navigation.
        </p>
      </div>
    </div>
  );
}