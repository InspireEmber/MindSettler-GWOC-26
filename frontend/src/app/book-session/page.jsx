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
      <section className="relative pt-20 pb-32 overflow-hidden">
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[#eeb9ff] text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Sparkles size={14} /> Invest in Your Mental Clarity
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-light text-white leading-tight mb-6">
            Begin Your <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#eeb9ff] to-[#fff]">Journey</span>
          </h1>
        </div>
      </section>

      {/* 2. Main Booking Area (Split Layout) */}
      <section className="pb-16 md:pb-24 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12">
          {/* Left: The Roadmap */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] shadow-xl border border-white/20">
              <h2 className="text-xl font-medium mb-8 text-white">How it works</h2>
              <div className="space-y-8 relative">
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-white/10 -z-0" />
                {STEPS.map((step, i) => (
                  <div key={i} className="flex gap-4 relative z-10">
                    <div className="w-8 h-8 rounded-full bg-[#3F2965] border border-white/20 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-lg">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{step.title}</h4>
                      <p className="text-xs text-gray-300">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div 
              className="p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden bg-white/5 backdrop-blur-md border border-white/10"
            >
              <div 
                className="absolute inset-0 opacity-20"
                style={{ 
                  background: "linear-gradient(90deg, hsla(286, 28%, 66%, 1) 0%, hsla(340, 73%, 75%, 1) 50%, hsla(263, 47%, 58%, 1) 100%)",
                }} 
              />
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2 relative z-10">
                <CheckCircle size={20} className="text-[#eeb9ff]" /> Confidentiality
              </h3>
              <p className="text-sm leading-relaxed opacity-80 relative z-10">
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
            <p className="text-[10px] sm:text-xs tracking-[0.3em] font-semibold text-[#eeb9ff] uppercase mb-3">
              A good therapy session also includes...
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white leading-tight">
              Gentle reminders that you are supported.
            </h2>
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
