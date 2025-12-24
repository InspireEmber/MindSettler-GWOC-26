"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BookingForm from "../../components/BookingForm";
import { Clock, Shield, Globe, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { getCurrentUser } from "../../services/auth";
import { motion } from "framer-motion";

const STEPS = [
  { title: "Select Mode", desc: "Choose Online or In-person" },
  { title: "Pick a Time", desc: "Find a slot that fits your day" },
  { title: "Initial Chat", desc: "Share your focus areas" },
  { title: "Confirmation", desc: "Receive your session link" }
];

const FEATURES = [
  { 
    title: "Guided Learning", 
    desc: "Not just talk therapy, but actual psychological frameworks.", 
    icon: <Clock />, 
    color: "text-[#3F2965]",
    bg: "bg-[#3F2965]/5"
  },
  { 
    title: "Privacy First", 
    desc: "Encrypted sessions and strictly confidential records.", 
    icon: <Shield />, 
    color: "text-[#DD1764]",
    bg: "bg-[#DD1764]/5"
  },
  { 
    title: "Global Access", 
    desc: "Connect from anywhere via our secure platform.", 
    icon: <Globe />, 
    color: "text-[#3F2965]",
    bg: "bg-[#3F2965]/5"
  },
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
          <p className="text-lg md:text-xl text-[#5E5A6B] max-w-2xl mx-auto leading-relaxed">
            Book a structured psycho-education session to unravel unhelpful patterns and build lasting emotional resilience.
          </p>
        </div>
      </section>

      {/* 2. Main Booking Area (Split Layout) */}
      <section className="pb-24 -mt-20 relative z-20">
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

      {/* 3. Session Features */}
      <section className="py-24 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl font-light">Why Choose <span className="font-medium text-[#3F2965]">MindSettler</span>?</h2>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <div key={i} className="p-10 rounded-3xl bg-[#FAFAFA] border border-transparent hover:border-[#3F2965]/10 hover:bg-white transition-all group text-center">
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-4">{feature.title}</h3>
              <p className="text-[#5E5A6B] leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}