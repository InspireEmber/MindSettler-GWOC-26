"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
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
      // Admin login
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Invalid admin credentials");
      }

      // Verify role via /auth/me
      const meRes = await fetch(`${API_BASE_URL}/auth/me`, {
        credentials: "include",
      });
      const me = await meRes.json().catch(() => null);
      const role = me?.data?.role;

      if (role !== "admin") {
        // Not admin: logout immediately and show error
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
        throw new Error("Access denied: admin account required");
      }

      window.location.href = "/admin/dashboard";
    } catch (err) {
      setError(err.message || "Admin login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-16">
      <div className="max-w-md w-full border border-[#3F2965]/10 rounded-3xl p-8 bg-[#F6F4FA]">
        <h1 className="text-2xl md:text-3xl font-light text-[#2E2A36] mb-2">
          Admin Login
        </h1>
        <p className="text-sm md:text-base text-[#5E5A6B] mb-6">
          Enter your admin credentials to access the dashboard.
        </p>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-[#2E2A36] mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none bg-white"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2E2A36] mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none bg-white"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-[#3F2965] text-white font-medium text-sm md:text-base hover:bg-[#3F2965]/90 transition-colors disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}