"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../services/api";
import { API_BASE_URL } from "../../config/api";
import AuthSideVisual from "@/components/AuthSideVisual";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Check for hardcoded admin credentials
    if (formData.email === "warp799@gmail.com" && formData.password === "admin123") {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            username: "admin", // Map known email to default admin username
            password: formData.password
          }),
        });

        if (!res.ok) {
          throw new Error("Admin login failed");
        }

        // Force reload to ensure auth state is picked up
        window.location.href = "/admin/dashboard";
        return;
      } catch (err) {
        setError("Admin login failed. Please check credentials.");
        setLoading(false);
        return;
      }
    }

    try {
      await api.userLogin(formData);
      // Use window.location.href to force a full page reload
      // This ensures the auth cookie is picked up by useAuth hook
      window.location.href = "/book-session";
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 lg:p-0">
      <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-20 items-center relative z-10">

        {/* Left Side - Visuals (Desktop Only) */}
        <div className="hidden lg:flex justify-center items-center h-full min-h-[600px] p-10">
          <AuthSideVisual />
        </div>

        {/* Right Side - Login Form (Identical to original block) */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden relative z-10 p-8 md:p-10"
        >
          <div className="text-center mb-8">
            <img src="/logo.svg" alt="Logo" className="h-20 mx-auto mb-6 w-auto" />
          </div>

          {error && (
            <div className="mb-6 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-sm px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:ring-2 focus:ring-[#eeb9ff] outline-none text-white placeholder-gray-400 transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-white/20 bg-white/5 focus:ring-2 focus:ring-[#eeb9ff] outline-none text-white placeholder-gray-400 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/30 text-[#eeb9ff] focus:ring-[#eeb9ff] bg-transparent"
                />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  Remember Me
                </span>
              </label>
              <Link
                href="#"
                className="text-sm text-[#eeb9ff] hover:text-white transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-[#eeb9ff] text-[#2E2A36] font-medium text-base hover:bg-[#eeb9ff]/90 hover:shadow-lg hover:shadow-[#eeb9ff]/20 transition-all disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-gray-300">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-center mb-8">
            <button
              type="button"
              onClick={() => {
                window.location.href = `${API_BASE_URL}/auth/google`;
              }}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white font-medium text-sm hover:bg-white/10 transition-all"
            >
              {/* Keeping SVGs same but ensuring fill is currentColor and colors are correct */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="hidden sm:inline">Google</span>
            </button>
          </div>

          <p className="text-sm text-gray-400 text-center font-redhat">
            Don&apos;t have any account?{" "}
            <Link href="/signup" className="text-[#eeb9ff] font-medium hover:text-white transition-colors">
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}