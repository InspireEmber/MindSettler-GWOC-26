import Link from "next/link";

export default function ArticlesResourcesPage() {
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
            Articles &amp; Blogs
          </h1>
          <p className="text-lg text-[#5E5A6B] leading-relaxed">
            A calm space where written pieces will be added to support understanding and reflection.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="rounded-2xl border border-[#3F2965]/10 bg-[#F6F4FA] p-8 text-center">
            <h2 className="text-2xl font-medium text-[#2E2A36] mb-3">Content will be added soon</h2>
            <p className="text-[#5E5A6B] leading-relaxed max-w-2xl mx-auto">
              This section will later include articles and blog-style reflections created specifically for MindSettler.
            </p>
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
