import Link from "next/link";

export default function VideosResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Link
            href="/resources"
            className="inline-flex items-center text-sm text-[#5E5A6B] hover:text-[#3F2965] mb-6"
          >
            Back to Resources
          </Link>
          <h1 className="text-4xl md:text-5xl font-light text-[#2E2A36] mb-4">
            Videos &amp; Guides
          </h1>
          <p className="text-lg text-[#5E5A6B] leading-relaxed">
            A future collection of gentle video explanations and guided walk-throughs.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="mb-8 text-center">
            <p className="text-base text-[#5E5A6B]">Content will be added soon.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[#3F2965]/10 bg-[#F6F4FA] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-white/70 border border-[#3F2965]/10 flex items-center justify-center mb-4 text-[#3F2965]">
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                  <h2 className="text-xl font-medium text-[#2E2A36] mb-2">Placeholder video or guide</h2>
                  <p className="text-sm text-[#5E5A6B] leading-relaxed">
                    A calm, educational video or step-by-step guide will appear here in the future.
                  </p>
                </div>
                <div className="mt-4 h-10 rounded-full bg-white/60 border border-dashed border-[#3F2965]/20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-[#F6F4FA]">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="rounded-2xl bg-white border border-[#3F2965]/10 p-6 text-sm text-[#5E5A6B] leading-relaxed">
            <p>
              This content is provided for awareness and educational purposes only. It does not replace professional
              diagnosis, treatment, or emergency care.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
