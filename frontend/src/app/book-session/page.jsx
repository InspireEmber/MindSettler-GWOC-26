"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BookingForm from "../../components/BookingForm";
import { Clock, Shield, Globe, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { getCurrentUser } from "../../services/auth";
import { motion } from "framer-motion";

const SESSION_PHOTOS = [
  "https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978643/mindsettler_assets/5.jpg",
  "https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978646/mindsettler_assets/6.jpg",
  "https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978650/mindsettler_assets/7.jpg",
  "https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978651/mindsettler_assets/8.jpg",
  "https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978652/mindsettler_assets/9.jpg",
  "https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978629/mindsettler_assets/10.jpg",
  "https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978630/mindsettler_assets/11.jpg",
  "https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978631/mindsettler_assets/12.jpg",
  "https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978632/mindsettler_assets/13.jpg",
  "https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978633/mindsettler_assets/14.jpg",
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
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#3F2965]/20 border-t-[#eeb9ff] rounded-full mb-4"
        />
        <div className="text-white font-medium tracking-wide">Preparing your safe space...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-white leading-tight mb-6"
          >
            Begin Your <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#eeb9ff] to-[#fff]">Journey</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light font-redhat"
          >
            "Take the first step toward understanding and tranquility in a supportive, professional environment."
          </motion.p>
        </div>
      </section>

      {/* 2. Main Booking Area (Split Layout) */}
      <section className="pb-16 md:pb-24 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12">
          {/* Left: The Roadmap */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-8"
          >
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white/10">
              <h2 className="text-xl font-serif italic mb-8 text-white/90">How it works</h2>
              <div className="space-y-8 relative">
                <div className="absolute left-4 top-2 bottom-2 w-[1px] bg-white/10 -z-0" />
                {STEPS.map((step, i) => (
                  <div key={i} className="flex gap-4 relative z-10 group">
                    <div className="w-8 h-8 rounded-full bg-[#eeb9ff] flex items-center justify-center text-xs font-bold text-[#3F2965] shrink-0 shadow-[0_0_15px_rgba(238,185,255,0.3)] transition-transform group-hover:scale-110">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white/90">{step.title}</h4>
                      <p className="text-xs text-white/50 font-redhat">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#eeb9ff]/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#3F2965]/20 rounded-full blur-2xl" />
              <h3 className="text-lg font-serif italic mb-4 flex items-center gap-2 relative z-10">
                <CheckCircle size={20} className="text-[#eeb9ff]" /> Confidentiality
              </h3>
              <p className="text-sm leading-relaxed text-white/70 font-light relative z-10 font-redhat">
                Your safety is our priority. Every session is conducted via secure, end-to-end encrypted channels.
              </p>
            </div>
          </motion.div>

          {/* Right: The Form */}
          <div className="lg:col-span-8">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* 3. Session Mood Gallery */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-10 text-center max-w-2xl mx-auto"
          >
            <p className="text-[10px] sm:text-xs tracking-[0.3em] font-semibold text-[#eeb9ff] uppercase mb-4">
              A Glimpse into the Space
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-white/90 leading-tight">
              "Gentle reminders that you are supported."
            </h2>
          </motion.div>
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
