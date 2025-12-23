import Link from "next/link";

export default function VideosResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA] py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
          <Link
            href="/resources"
            className="inline-flex items-center text-sm text-[#5E5A6B] hover:text-[#3F2965] mb-4 sm:mb-6 min-h-[32px]"
          >
            ← Back to Resources
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#2E2A36] mb-3 sm:mb-4 leading-tight">
            Videos &amp; Guides
          </h1>
          <p className="text-base sm:text-lg text-[#5E5A6B] leading-relaxed">
            Gentle video explanations and guided walk-throughs to support your mental well-being journey.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Video 1 */}
            <div className="space-y-4 sm:space-y-5">
              {/* Video Heading Placeholder */}
              <div>
                <h2 className="text-xl sm:text-2xl font-light text-[#2E2A36] mb-3 sm:mb-4">
                  Panic Attack vs Anxiety Attack
                </h2>
              </div>

              {/* Video Player - Original Size */}
              <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#F6F4FA] border border-[#3F2965]/10 shadow-sm">
                <video
                  className="w-full h-auto"
                  controls
                  preload="metadata"
                  poster=""
                >
                  <source src="/videos/panicanx.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video Information Placeholder */}
              <div className="bg-[#F6F4FA] rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-[#3F2965]/10 space-y-4">
                <div className="space-y-3 text-sm sm:text-base text-[#5E5A6B] leading-relaxed">
                  <div>
                    <h3 className="font-semibold text-[#3F2965] mb-1.5 text-base sm:text-lg">Panic Attack:</h3>
                    <p>Triggers: Often linked to specific stressors or situations, or a general feeling of worry.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#3F2965] mb-1.5 text-base sm:text-lg">Anxiety Attack:</h3>
                    <p>Triggers: Can occur without a clear external threat; often linked to the body's fight-or-flight response being activated inappropriately.</p>
                  </div>
                </div>
                
                {/* Links Section */}
                <div className="pt-4 border-t border-[#3F2965]/10">
                  <p className="text-sm sm:text-base font-medium text-[#3F2965] mb-3">Related Links:</p>
                  <ul className="space-y-2">
                    <li>
                      <a 
                        href="https://www.maxhealthcare.in/blogs/panic-attacks-symptoms-and-causes" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base text-[#3F2965] hover:text-[#DD1764] hover:underline transition-colors"
                      >
                        Panic attack symptoms
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Video 2 */}
            <div className="space-y-4 sm:space-y-5">
              {/* Video Heading Placeholder */}
              <div>
                <h2 className="text-xl sm:text-2xl font-light text-[#2E2A36] mb-3 sm:mb-4">
                  Walls vs Boundaries
                </h2>
              </div>

              {/* Video Player - Original Size */}
              <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#F6F4FA] border border-[#3F2965]/10 shadow-sm">
                <video
                  className="w-full h-auto"
                  controls
                  preload="metadata"
                  poster=""
                >
                  <source src="/videos/wallbound.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video Information Placeholder */}
              <div className="bg-[#F6F4FA] rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-[#3F2965]/10 space-y-4">
                <div className="text-sm sm:text-base text-[#5E5A6B] leading-relaxed">
                  <p>
                    Whether you're dealing with romantic partners, family, friends, or coworkers, 
                    maintaining healthy boundaries can help you strengthen relationships, 
                    avoid unhealthy connections, and improve your self-esteem and overall well-being.
                  </p>
                </div>
                
                {/* Links Section */}
                <div className="pt-4 border-t border-[#3F2965]/10">
                  <p className="text-sm sm:text-base font-medium text-[#3F2965] mb-3">Related Links:</p>
                  <ul className="space-y-2">
                    <li>
                      <a 
                        href="https://www.helpguide.org/relationships/social-connection/setting-healthy-boundaries-in-relationships" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base text-[#3F2965] hover:text-[#DD1764] hover:underline transition-colors"
                      >
                        healthy boundaries
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 bg-[#F6F4FA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="rounded-xl sm:rounded-2xl bg-white border border-[#3F2965]/10 p-6 sm:p-8 text-xs sm:text-sm text-[#5E5A6B] leading-relaxed">
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
