export default function Hero() {
  return (
    <main className="px-12 mt-28 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
<section className="px-12 pt-32 pb-40 bg-[#F6F4FA]">
  <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-24 items-center">

    {/* LEFT */}
    <div className="relative">
      <div className="absolute -left-6 top-2 h-24 w-[3px] bg-[#3F2965]/60 rounded-full"></div>

      <h1 className="text-5xl font-light leading-snug text-[#2E2A36]">
        Understand Your Mind.
        <br />
        Build Emotional Clarity.
      </h1>

      <p className="mt-8 text-lg text-[#5E5A6B] max-w-xl">
        MindSettler helps you navigate thoughts and emotions through calm,
        guided psycho-education sessions.
      </p>

      <div className="mt-12 flex gap-6">
        <button className="px-8 py-4 rounded-xl bg-[#3F2965] text-white">
          Book Your First Session
        </button>
        <button className="px-8 py-4 rounded-xl border border-[#3F2965]/30 text-[#3F2965]">
          Learn More
        </button>
      </div>
    </div>

    {/* RIGHT */}
    <div className="h-[380px] rounded-3xl bg-[#E9E6F2]" />
  </div>
</section>

    </main>
  );
}
