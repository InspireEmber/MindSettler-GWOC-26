import Link from "next/link";

export default function HelpfulLinksResourcesPage() {
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
            Helpful Links
          </h1>
          <p className="text-lg text-[#5E5A6B] leading-relaxed">
            A curated space where external resources will be organized into calm, easy-to-browse sections.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-10">
          <div>
            <h2 className="text-2xl font-medium text-[#2E2A36] mb-3">Emergency &amp; Helplines</h2>
            <p className="text-sm text-[#5E5A6B] mb-3">Placeholder links only. Actual helpline information will be added later.</p>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#3F2965] underline underline-offset-2 hover:text-[#DD1764]">
                  Emergency helpline placeholder
                </a>
              </li>
              <li>
                <a href="#" className="text-[#3F2965] underline underline-offset-2 hover:text-[#DD1764]">
                  Crisis support service placeholder
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-[#2E2A36] mb-3">Awareness Organizations</h2>
            <p className="text-sm text-[#5E5A6B] mb-3">Placeholder organizations. Real awareness resources will be linked here later.</p>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#3F2965] underline underline-offset-2 hover:text-[#DD1764]">
                  Mental health awareness group placeholder
                </a>
              </li>
              <li>
                <a href="#" className="text-[#3F2965] underline underline-offset-2 hover:text-[#DD1764]">
                  Community support organization placeholder
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-[#2E2A36] mb-3">Student / Youth Resources</h2>
            <p className="text-sm text-[#5E5A6B] mb-3">Placeholder links for students and young people. Actual resources will be added in the future.</p>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#3F2965] underline underline-offset-2 hover:text-[#DD1764]">
                  Campus support service placeholder
                </a>
              </li>
              <li>
                <a href="#" className="text-[#3F2965] underline underline-offset-2 hover:text-[#DD1764]">
                  Youth-focused helpline placeholder
                </a>
              </li>
            </ul>
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
