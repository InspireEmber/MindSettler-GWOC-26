"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      // Best-effort logout; ignore errors for UI stub
      console.error("Admin logout failed", e);
    } finally {
      router.push("/admin/login");
    }
  };

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-white/15 backdrop-blur-xl border-b border-white/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
          <Link href="/admin/dashboard" className="font-semibold text-[#2D1B5E] drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
            Admin Panel
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/admin/dashboard" className="text-white/80 hover:text-white font-medium">
              Dashboard
            </Link>
            <Link href="/admin/appointments" className="text-white/80 hover:text-white font-medium">
              Appointments
            </Link>
            <Link href="/admin/slots" className="text-white/80 hover:text-white font-medium">
              Slots
            </Link>
            <Link
              href="/admin/corporate-inquiries"
              className="text-white/80 hover:text-white font-medium"
            >
              Corporate Inquiries
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="ml-2 px-3 py-1.5 rounded-full border border-white/40 bg-[#2D1B5E] text-white hover:bg-[#211246] text-xs md:text-sm shadow-md shadow-[#2D1B5E]/40"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
