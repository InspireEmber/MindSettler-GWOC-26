"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "../../services/api";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.userSignup(formData);
      // After successful signup, redirect to login or directly to booking
      router.push("/login");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
      <div className="max-w-md w-full border border-[#3F2965]/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-[#F6F4FA]">
        <h1 className="text-2xl sm:text-3xl font-light text-[#2E2A36] mb-2">
          Create an Account
        </h1>
        <p className="text-sm sm:text-base text-[#5E5A6B] mb-6">
          Sign up to book and track your psycho-education sessions more easily.
        </p>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-[#2E2A36] mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              required
              minLength={2}
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none bg-white min-h-[44px] text-sm sm:text-base"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2E2A36] mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none bg-white min-h-[44px] text-sm sm:text-base"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2E2A36] mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none bg-white min-h-[44px] text-sm sm:text-base"
              placeholder="+91..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2E2A36] mb-2">Password</label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none bg-white min-h-[44px] text-sm sm:text-base"
              placeholder="Create a password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 sm:py-4 rounded-full bg-[#3F2965] text-white font-medium text-sm sm:text-base hover:bg-[#3F2965]/90 transition-colors disabled:opacity-60 min-h-[44px]"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-xs sm:text-sm text-[#5E5A6B] text-center">
          Already have an account? {" "}
          <Link href="/login" className="text-[#3F2965] font-medium underline min-h-[32px] inline-flex items-center">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
