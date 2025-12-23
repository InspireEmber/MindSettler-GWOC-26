import Link from "next/link";

export default function ResourcesPage() {
  const resourceCategories = [
    {
      title: "Articles & Blogs",
      description: "Educational articles about mental health, emotional well-being, and self-care practices.",
      href: "/resources/articles",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: "Videos & Guides",
      description: "Visual content and guides to help you understand mental health concepts and coping strategies.",
      href: "/resources/videos",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Helpful Links",
      description: "Curated resources and organizations that support mental health awareness and well-being.",
      href: "/resources/links",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA] py-12 sm:py-16 md:py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 text-center">
          <div className="inline-block mb-4 sm:mb-6">
            <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto"></div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#2E2A36] mb-4 sm:mb-6 leading-tight">
            Mental Health <span className="font-medium text-[#3F2965]">Resources</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#5E5A6B] leading-relaxed px-2">
            Educational content, articles, and helpful links to support your mental health journey.
          </p>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {resourceCategories.map((category, index) => (
            <Link key={index} href={category.href} className="block">
              <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-[#F6F4FA] border border-[#3F2965]/10 hover:shadow-lg transition-all duration-300 min-h-[44px]">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#3F2965]/10 flex items-center justify-center mb-4 sm:mb-6 text-[#3F2965]">
                  {category.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-medium text-[#2E2A36] mb-3 sm:mb-4">
                  {category.title}
                </h3>
                <p className="text-sm sm:text-base text-[#5E5A6B] leading-relaxed">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

          {/* Coming Soon Notice */}
          <div className="text-center p-8 sm:p-10 md:p-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#E9E6F2] to-[#F6F4FA] border border-[#3F2965]/10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-[#3F2965]/10 flex items-center justify-center">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#3F2965]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-medium text-[#2E2A36] mb-3 sm:mb-4">
              Resources Coming Soon
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-[#5E5A6B] leading-relaxed max-w-2xl mx-auto px-2">
              We're curating valuable mental health resources, articles, videos, and helpful links to support 
              your journey. Check back soon for educational content that complements our psycho-education sessions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#F6F4FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2E2A36] mb-4 sm:mb-6 leading-tight">
            Start Your Learning Journey
          </h2>
          <p className="text-base sm:text-lg text-[#5E5A6B] mb-6 sm:mb-8 px-2">
            While we prepare our resource library, book a session to begin your structured psycho-education journey.
          </p>
          <a 
            href="/book-session"
            className="inline-block px-8 py-4 rounded-full bg-[#3F2965] text-white font-medium text-base sm:text-lg hover:bg-[#3F2965]/90 transition-all duration-300 hover:shadow-lg hover:shadow-[#3F2965]/25 min-h-[44px] flex items-center justify-center"
          >
            Book Your First Session
          </a>
        </div>
      </section>
    </div>
  );
}
