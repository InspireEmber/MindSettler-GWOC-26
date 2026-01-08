"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

export default function VideosResourcesPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
          <Link
            href="/resources"
            className="inline-flex items-center text-sm text-gray-300 hover:text-white mb-4 sm:mb-6 min-h-[32px] transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>&nbsp; Back to Resources
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-3 sm:mb-4 leading-tight"
          >
            Videos &amp; <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#eeb9ff] to-white">Guides</span>
          </motion.h1>
          <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-2xl">
            Gentle video explanations and guided walk-throughs to support your mental well-being journey.
          </p>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-10 sm:py-12 md:py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">

            {/* Video 1 */}
            <div className="space-y-6 group">
              <motion.div
                className="relative pl-6 border-l-2 border-[#eeb9ff]/30 group-hover:border-[#eeb9ff] transition-colors duration-500"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl sm:text-3xl font-serif text-white group-hover:text-[#eeb9ff] transition-colors duration-300 flex items-center gap-3">
                  Panic Attack vs Anxiety Attack
                </h2>
              </motion.div>

              {/* Video Player */}
              <div className="relative w-full rounded-2xl overflow-hidden bg-black/20 border border-white/10 shadow-2xl group-hover:shadow-[0_0_30px_rgba(238,185,255,0.15)] transition-all duration-500">
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

              {/* Video Information */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-4 hover:bg-white/10 transition-all duration-300">
                <div className="space-y-3 text-sm sm:text-base text-gray-200 leading-relaxed">
                  <div>
                    <h3 className="font-semibold text-[#eeb9ff] mb-1.5 text-base sm:text-lg">Panic Attack:</h3>
                    <p>Triggers: Often linked to specific stressors or situations, or a general feeling of worry.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#eeb9ff] mb-1.5 text-base sm:text-lg">Anxiety Attack:</h3>
                    <p>Triggers: Can occur without a clear external threat; often linked to the body's fight-or-flight response being activated inappropriately.</p>
                  </div>
                </div>

                {/* Links Section */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm sm:text-base font-medium text-white mb-3">Related Links:</p>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="https://www.maxhealthcare.in/blogs/panic-attacks-symptoms-and-causes"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base text-[#eeb9ff] hover:text-white hover:underline transition-colors flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#eeb9ff]" /> Panic attack symptoms
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Video 2 */}
            <div className="space-y-6 group">
              <motion.div
                className="relative pl-6 border-l-2 border-[#eeb9ff]/30 group-hover:border-[#eeb9ff] transition-colors duration-500"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl sm:text-3xl font-serif text-white group-hover:text-[#eeb9ff] transition-colors duration-300">
                  Walls vs Boundaries
                </h2>
              </motion.div>

              {/* Video Player */}
              <div className="relative w-full rounded-2xl overflow-hidden bg-black/20 border border-white/10 shadow-2xl group-hover:shadow-[0_0_30px_rgba(238,185,255,0.15)] transition-all duration-500">
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

              {/* Video Information */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-4 hover:bg-white/10 transition-all duration-300">
                <div className="text-sm sm:text-base text-gray-200 leading-relaxed">
                  <p>
                    Whether you're dealing with romantic partners, family, friends, or coworkers,
                    maintaining healthy boundaries can help you strengthen relationships,
                    avoid unhealthy connections, and improve your self-esteem and overall well-being.
                  </p>
                </div>

                {/* Links Section */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm sm:text-base font-medium text-white mb-3">Related Links:</p>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="https://www.helpguide.org/relationships/social-connection/setting-healthy-boundaries-in-relationships"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base text-[#eeb9ff] hover:text-white hover:underline transition-colors flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#eeb9ff]" /> healthy boundaries
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 sm:py-12 relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 text-xs sm:text-sm text-gray-400 leading-relaxed italic text-center">
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
