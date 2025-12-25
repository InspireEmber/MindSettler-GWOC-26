"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BookingForm from "../../components/BookingForm";
import { Clock, Shield, Globe, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { getCurrentUser } from "../../services/auth";
import { motion } from "framer-motion";

const SESSION_PHOTOS = [
  "/images/5.jpeg",
  "/images/6.jpeg",
  "/images/7.jpeg",
  "/images/8.jpeg",
  "/images/9.jpeg",
  "/images/10.jpeg",
  "/images/11.jpeg",
  "/images/12.jpeg",
  "/images/13.jpeg",
  "/images/14.jpeg",
];

const STEPS = [
  { title: "Select Mode", desc: "Choose Online or In-person" },
  { title: "Pick a Time", desc: "Find a slot that fits your day" },
  { title: "Initial Chat", desc: "Share your focus areas" },
  { title: "Confirmation", desc: "Receive your session link" }
];


export default function BookSessionPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await getCurrentUser();
        if (!user) router.replace("/login");
        else setCheckingAuth(false);
      } catch (e) {
        router.replace("/login");
      }
    }
    checkAuth();
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#3F2965]/20 border-t-[#3F2965] rounded-full mb-4"
        />
        <div className="text-[#5E5A6B] font-medium tracking-wide">Preparing your safe space...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#2E2A36]">
      {/* 1. Hero Section */}
      <section className="relative bg-white pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F6F4FA] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-0" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3F2965]/5 text-[#3F2965] text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Sparkles size={14} /> Invest in Your Mental Clarity
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-light leading-tight mb-6">
            Begin Your <span className="font-serif italic text-[#3F2965]">Journey</span>
          </h1>
        </div>
      </section>

      {/* 2. Main Booking Area (Split Layout) */}
      <section className="pb-16 md:pb-24 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12">
          {/* Left: The Roadmap */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#3F2965]/5">
              <h2 className="text-xl font-medium mb-8">How it works</h2>
              <div className="space-y-8 relative">
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-100 -z-0" />
                {STEPS.map((step, i) => (
                  <div key={i} className="flex gap-4 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-[#F6F4FA] border border-[#3F2965]/10 flex items-center justify-center text-xs font-bold text-[#3F2965] shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#3F2965]">{step.title}</h4>
                      <p className="text-xs text-[#5E5A6B]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#3F2965] p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <CheckCircle size={20} className="text-[#DD1764]" /> Confidentiality
              </h3>
              <p className="text-sm leading-relaxed opacity-80">
                Your safety is our priority. Every session is conducted via secure, end-to-end encrypted channels.
              </p>
            </div>
          </div>

          {/* Right: The Form */}
          <div className="lg:col-span-8">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* 3. Session Mood Gallery */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8 md:mb-10 text-left md:text-center max-w-2xl mx-auto">
            <p className="text-[10px] sm:text-xs tracking-[0.3em] font-semibold text-[#3F2965] uppercase mb-3">
              A good therapy session also includes...
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[#2E2A36] leading-tight">
              Gentle reminders that you are supported.
            </h2>
          </div>

          {/* Horizontal strip, all cards same size, smooth slide, no scrollbar */}
          <div className="no-scrollbar overflow-x-auto scroll-smooth -mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex gap-4 sm:gap-6 py-2">
              {SESSION_PHOTOS.map((src, index) => (
                <motion.div
                  key={src}
                  className="relative flex-shrink-0 w-52 h-72 sm:w-56 sm:h-80 rounded-3xl bg-[#F6F4FA] border border-[#3F2965]/10 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#3F2965]/10 transition-transform duration-300 hover:-translate-y-1"
                  whileTap={{ scale: 0.97 }}
                >
                  <Image
                    src={src}
                    alt={`Therapy visual ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 224px, (min-width: 640px) 208px, 208px"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      
    </div>
  );
}
