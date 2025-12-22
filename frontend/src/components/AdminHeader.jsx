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
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#3F2965]/10">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <Link href="/admin/dashboard" className="font-semibold text-[#2E2A36]">
          Admin Panel
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/admin/dashboard" className="text-[#5E5A6B] hover:text-[#3F2965]">
            Dashboard
          </Link>
          <Link href="/admin/appointments" className="text-[#5E5A6B] hover:text-[#3F2965]">
            Appointments
          </Link>
          <Link href="/admin/slots" className="text-[#5E5A6B] hover:text-[#3F2965]">
            Slots
          </Link>
          <Link
            href="/admin/corporate-inquiries"
            className="text-[#5E5A6B] hover:text-[#3F2965]"
          >
            Corporate Inquiries
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="ml-2 px-3 py-1.5 rounded-full border border-[#3F2965]/30 text-[#3F2965] hover:bg-[#3F2965]/5 text-xs md:text-sm"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
