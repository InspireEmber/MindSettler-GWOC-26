"use client";
import Link from "next/link";
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
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#3F2965]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#Dd1764]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#3F2965]/3 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              {/* Accent Line */}
              <div className="flex items-center gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#Dd1764] rounded-full"></div>
                <span className="text-sm font-medium text-[#5E5A6B] tracking-wider uppercase">
                  Your Journey Begins Here
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-[#2E2A36]">
                Understand Your Mind.
                <br />
                <span className="font-medium bg-gradient-to-r from-[#3F2965] to-[#Dd1764] bg-clip-text text-transparent">
                  Build Emotional Clarity.
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-[#5E5A6B] leading-relaxed max-w-2xl">
                MindSettler helps you navigate thoughts and emotions through calm, 
                guided psycho-education sessions in a safe and confidential environment.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  href="/book-session"
                  className="group relative px-8 py-4 rounded-full bg-[#3F2965] text-white font-medium text-lg hover:bg-[#3F2965]/90 transition-all duration-300 hover:shadow-lg hover:shadow-[#3F2965]/25 hover:scale-105"
                >
                  <span className="relative z-10">Book Your First Session</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3F2965] to-[#Dd1764] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#3F2965]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Safe & Confidential</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#3F2965]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Structured Sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#3F2965]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Personalized Guidance</span>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className={`relative ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="relative">
                {/* Main Visual Container */}
                <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E9E6F2] via-[#F6F4FA] to-[#E9E6F2]"></div>
                  
                  {/* Decorative Circles */}
                  <div className="absolute top-10 right-10 w-32 h-32 bg-[#3F2965]/10 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#Dd1764]/10 rounded-full blur-2xl"></div>
                  
                  {/* Center Content Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4 p-8">
                      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#3F2965] to-[#Dd1764] flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <p className="text-[#5E5A6B] font-medium">Visual Content</p>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#Dd1764]/20 rounded-2xl rotate-12 blur-sm"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#3F2965]/20 rounded-2xl -rotate-12 blur-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-[#3F2965]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>
    </div>
  );
}
