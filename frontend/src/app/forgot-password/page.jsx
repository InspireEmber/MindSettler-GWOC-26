"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import api from "../../services/api";
import AuthSideVisual from "@/components/AuthSideVisual";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        try {
            await api.forgotPassword(email);
            setMessage("Password reset email sent. Please check your inbox.");
        } catch (err) {
            setError(err.message || "Failed to send reset email. Please try again.");
        } finally {
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

                {/* Right Side - Forgot Password Form */}
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden relative z-10 p-8 md:p-10"
                >
                    <div className="text-center mb-8">
                        <img src="/logo.svg" alt="Logo" className="h-20 mx-auto mb-6 w-auto" />
                        <h2 className="text-2xl font-light text-white mb-2">Forgot Password?</h2>
                        <p className="text-gray-300 text-sm">Enter your email to receive a reset link.</p>
                    </div>

                    {message && (
                        <div className="mb-6 rounded-xl bg-green-500/20 border border-green-500/30 text-green-200 text-sm px-4 py-3">
                            {message}
                        </div>
                    )}

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
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:ring-2 focus:ring-[#eeb9ff] outline-none text-white placeholder-gray-400 transition-all"
                                placeholder="you@example.com"
                                suppressHydrationWarning
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-full bg-[#eeb9ff] text-[#2E2A36] font-medium text-base hover:bg-[#eeb9ff]/90 hover:shadow-lg hover:shadow-[#eeb9ff]/20 transition-all disabled:opacity-60"
                            suppressHydrationWarning
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            href="/login"
                            className="text-sm text-[#eeb9ff] hover:text-white transition-colors"
                        >
                            Back to Login
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
