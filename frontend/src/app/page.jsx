"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA]">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#3F2965]/5 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-[#DD1764]/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#3F2965]/3 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div
              className={`space-y-8 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              {/* Header Section */}
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full"></div>
                  <span className="text-sm font-medium text-[#5E5A6B] tracking-wider uppercase">
                    Your Journey Begins Here
                  </span>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-[#2E2A36]">
                Understand Your Mind.
                <br />
                <span className="font-medium bg-gradient-to-r from-[#3F2965] to-[#DD1764] bg-clip-text text-transparent">
                  Build Emotional Clarity.
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-[#5E5A6B] leading-relaxed max-w-2xl">
                MindSettler helps you navigate thoughts and emotions through
                calm, guided psycho-education sessions in a safe and
                confidential environment.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/book-session"
                  className="group relative px-8 py-4 rounded-full bg-[#3F2965] text-white font-medium text-lg hover:bg-[#3F2965]/90 transition-all duration-300 hover:shadow-lg hover:shadow-[#3F2965]/25 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Book Your First Session
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3F2965] to-[#DD1764] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                <Link
                  href="/how-it-works"
                  className="px-8 py-4 rounded-full border-2 border-[#3F2965]/30 text-[#3F2965] font-medium text-lg hover:bg-[#3F2965]/5 hover:border-[#3F2965]/50 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-8 text-sm text-[#5E5A6B]">
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-[#3F2965]/10">
                  <svg
                    className="w-5 h-5 text-[#3F2965]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Safe & Confidential</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-[#3F2965]/10">
                  <svg
                    className="w-5 h-5 text-[#3F2965]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Structured Sessions</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-[#3F2965]/10">
                  <svg
                    className="w-5 h-5 text-[#3F2965]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Personalized Guidance</span>
                </div>
              </div>
            </div>

            {/* Right Visual - Logo Showcase */}
            <div
              className={`relative ${
                isVisible ? "animate-fade-in" : "opacity-0"
              }`}
            >
              <div className="relative">
                {/* Main Visual Container */}
                <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E9E6F2] via-[#F6F4FA] to-[#E9E6F2]"></div>

                  {/* Decorative Circles */}
                  <div className="absolute top-10 right-10 w-32 h-32 bg-[#3F2965]/10 rounded-full blur-2xl animate-pulse"></div>
                  <div
                    className="absolute bottom-10 left-10 w-40 h-40 bg-[#DD1764]/10 rounded-full blur-2xl animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>

                  {/* Logo Display */}
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="text-center space-y-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#3F2965]/20 to-[#DD1764]/20 rounded-full blur-2xl scale-150"></div>
                        <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-[#3F2965]/10">
                          <Image
                            src="/logo.png"
                            alt="MindSettler Logo"
                            width={300}
                            height={300}
                            className="object-contain mx-auto"
                            priority
                          />
                        </div>
                      </div>
                      <p className="text-[#5E5A6B] font-medium text-lg">
                        Your Mental Health Companion
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#DD1764]/20 rounded-2xl rotate-12 blur-sm animate-pulse"></div>
                <div
                  className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#3F2965]/20 rounded-2xl -rotate-12 blur-sm animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-[#3F2965]/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-[#2E2A36] mb-6">
              Why Choose{" "}
              <span className="font-medium text-[#3F2965]">MindSettler</span>
            </h2>
            <p className="text-xl text-[#5E5A6B] max-w-2xl mx-auto">
              A compassionate approach to mental well-being through structured
              psycho-education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#F6F4FA] to-white border border-[#3F2965]/10 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-[#3F2965]/10 flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-[#3F2965]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-[#2E2A36] mb-4">
                Confidential & Safe
              </h3>
              <p className="text-[#5E5A6B] leading-relaxed">
                Your privacy is our priority. All sessions are conducted in a
                secure, confidential environment where you can speak freely.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#F6F4FA] to-white border border-[#DD1764]/10 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-[#DD1764]/10 flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-[#DD1764]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-[#2E2A36] mb-4">
                Structured Learning
              </h3>
              <p className="text-[#5E5A6B] leading-relaxed">
                Our 60-minute sessions follow a clear, organized format designed
                to maximize understanding and emotional clarity.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#F6F4FA] to-white border border-[#3F2965]/10 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 rounded-full bg-[#3F2965]/10 flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-[#3F2965]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-[#2E2A36] mb-4">
                Human-Led Support
              </h3>
              <p className="text-[#5E5A6B] leading-relaxed">
                Every session is guided by trained professionals who understand
                the importance of human connection in mental health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-[#3F2965] to-[#DD1764]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Take the first step toward understanding your mind and building
            emotional clarity.
          </p>
          <Link
            href="/book-session"
            className="inline-block px-8 py-4 rounded-full bg-white text-[#3F2965] font-medium text-lg hover:bg-white/90 transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            Book Your First Session
          </Link>
        </div>
      </section>
    </div>
  );
}
