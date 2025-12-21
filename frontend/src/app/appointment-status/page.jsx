"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, XCircle, CalendarCheck } from "lucide-react";
import SessionCard from "../../components/SessionCard";
import api from "../../services/api";

function LoadingState({ message = "Loading..." }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center text-center">
      <div>
        <Loader2 className="w-12 h-12 mx-auto mb-4 text-[#3F2965] animate-spin" />
        <p className="text-[#5E5A6B]">{message}</p>
      </div>
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
        const response = await api.getBookingStatus(bookingId);
        setBooking(response.data);
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
      <div className="min-h-screen bg-white py-20 md:py-32 flex flex-col items-center justify-center px-6 text-center">
        <XCircle className="w-20 h-20 text-red-500 mb-6" />
        <h1 className="text-3xl font-light text-[#2E2A36] mb-4">Booking Not Found</h1>
        <p className="text-[#5E5A6B] max-w-md mb-8">{error || "The booking doesn't exist or was removed."}</p>
        <Link href="/book-session" className="px-8 py-4 rounded-full bg-[#3F2965] text-white hover:shadow-lg transition-all active:scale-95">
          Book a New Session
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA] py-20 md:py-32 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-light text-[#2E2A36]">
            Appointment <span className="font-medium text-[#3F2965]">Status</span>
          </h1>
        </div>
      </section>

      {/* Status Card */}
      <section className="py-16 md:py-24 max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-3xl p-1 md:p-6 border border-[#3F2965]/5 shadow-sm">
          <SessionCard booking={booking} />
        </div>
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