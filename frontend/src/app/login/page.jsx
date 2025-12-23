"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "../../services/api";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      await api.userLogin(formData);
      // Force a full reload so Navbar/useAuth picks up the new session cookie
      window.location.href = "/book-session";
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
      <div className="max-w-md w-full border border-[#3F2965]/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-[#F6F4FA]">
        <h1 className="text-2xl sm:text-3xl font-light text-[#2E2A36] mb-2">
          User Login
        </h1>
        <p className="text-sm sm:text-base text-[#5E5A6B] mb-6">
          Log in to quickly book and track your psycho-education sessions.
        </p>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-[#2E2A36] mb-2">
              Email
            </label>
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
            <label className="block text-sm font-medium text-[#2E2A36] mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              minLength={6}
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none bg-white min-h-[44px] text-sm sm:text-base"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 sm:py-4 rounded-full bg-[#3F2965] text-white font-medium text-sm sm:text-base hover:bg-[#3F2965]/90 transition-colors disabled:opacity-60 min-h-[44px]"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-xs sm:text-sm text-[#5E5A6B] text-center">
          Don&apos;t have an account? {" "}
          <Link href="/signup" className="text-[#3F2965] font-medium underline min-h-[32px] inline-flex items-center">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
