"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, XCircle, CalendarCheck } from "lucide-react";
import SessionCard from "../../components/SessionCard";
import api from "../../services/api";
import { motion } from "framer-motion";

function LoadingState({ message = "Loading..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center text-center relative z-10 bg-black/20 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Loader2 className="w-12 h-12 mx-auto mb-4 text-[#eeb9ff] animate-spin" />
        <p className="text-[#eeb9ff]/80 font-serif italic">{message}</p>
      </motion.div>
    </div>
  );
}

function AppointmentStatusContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!bookingId) {
      setError("No booking ID provided");
      setLoading(false);
      return;
    }
    const fetchStatus = async () => {
      try {
        const booking = await api.getBookingStatus(bookingId);
        setBooking(booking);
      } catch (err) {
        setError(err.message || "Failed to fetch booking status");
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, [bookingId]);

  if (loading) return <LoadingState message="Fetching booking status..." />;

  if (error || !booking) {
    return (
      <div className="min-h-screen py-20 md:py-32 flex flex-col items-center justify-center px-6 text-center relative z-10">
        <XCircle className="w-20 h-20 text-red-400/80 mb-6" />
        <h1 className="text-3xl font-serif text-white mb-4">Booking Not Found</h1>
        <p className="text-white/60 max-w-sm mb-8 font-light leading-relaxed">{error || "The booking doesn't exist or was removed."}</p>
        <Link href="/book-session" className="px-10 py-4 rounded-full bg-[#eeb9ff] text-[#3F2965] font-serif font-bold shadow-xl shadow-[#eeb9ff]/10 hover:shadow-[#eeb9ff]/20 hover:scale-105 transition-all active:scale-95">
          Try Again
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 text-center z-10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-1 w-16 bg-gradient-to-r from-[#eeb9ff] to-[#DD1764] rounded-full mx-auto mb-8 shadow-[0_0_10px_rgba(238,185,255,0.4)]"
          />
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-white leading-tight"
          >
            Session <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#eeb9ff] to-[#fff]">Status</span>
          </motion.h1>
        </div>
      </section>

      {/* Status Card */}
      <section className="pb-24 max-w-3xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-1 md:p-6 border border-white/10 shadow-2xl"
        >
          <SessionCard booking={booking} />
        </motion.div>
      </section>
    </div>
  );
}

export default function AppointmentStatusPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <AppointmentStatusContent />
    </Suspense>
  );
}