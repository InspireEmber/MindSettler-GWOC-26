"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/services/api";
import AuthSideVisual from "@/components/AuthSideVisual";

export default function ResetPasswordPage() {
    const router = useRouter();
    const params = useParams();
    const token = params?.token;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }

        try {
            await api.resetPassword(token, password);
            setMessage("Password successfully reset! Redirecting to login...");
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (err) {
            setError(err.message || "Failed to reset password. Link might be expired.");
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

                {/* Right Side - Reset Password Form */}
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden relative z-10 p-8 md:p-10"
                >
                    <div className="text-center mb-8">
                        <img src="/logo.svg" alt="Logo" className="h-20 mx-auto mb-6 w-auto" />
                        <h2 className="text-2xl font-light text-white mb-2">Reset Password</h2>
                        <p className="text-gray-300 text-sm">Enter your new password below.</p>
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
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    minLength={6}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 rounded-xl border border-white/20 bg-white/5 focus:ring-2 focus:ring-[#eeb9ff] outline-none text-white placeholder-gray-400 transition-all"
                                    placeholder="••••••••"
                                    suppressHydrationWarning
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                                    suppressHydrationWarning
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                required
                                minLength={6}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/5 focus:ring-2 focus:ring-[#eeb9ff] outline-none text-white placeholder-gray-400 transition-all"
                                placeholder="••••••••"
                                suppressHydrationWarning
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-full bg-[#eeb9ff] text-[#2E2A36] font-medium text-base hover:bg-[#eeb9ff]/90 hover:shadow-lg hover:shadow-[#eeb9ff]/20 transition-all disabled:opacity-60"
                            suppressHydrationWarning
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link href="/login" className="text-sm text-[#eeb9ff] hover:text-white transition-colors">
                            Back to Login
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
