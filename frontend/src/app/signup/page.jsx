"use client";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-16">
      <div className="max-w-md w-full text-center border border-[#3F2965]/10 rounded-3xl p-8 bg-[#F6F4FA]">
        <h1 className="text-2xl md:text-3xl font-light text-[#2E2A36] mb-4">
          User Signup
        </h1>
        <p className="text-sm md:text-base text-[#5E5A6B] mb-8">
          User sign-up is coming soon. In the meantime, you can book sessions as a
          guest and track them using your booking ID.
        </p>
        <Link
          href="/book-session"
          className="inline-block px-6 py-3 rounded-full bg-[#3F2965] text-white text-sm md:text-base hover:bg-[#3F2965]/90 transition-colors"
        >
          Go to Booking Page
        </Link>
      </div>
    </div>
  );
}
