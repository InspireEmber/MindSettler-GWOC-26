"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import AdminHeader from "../../components/AdminHeader";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const { loading, isAdmin } = useAdminAuth();

  useEffect(() => {
    // Never guard the login page itself
    if (isLoginPage) return;
    if (loading) return;
    if (!isAdmin) {
      router.replace("/admin/login");
    }
  }, [loading, isAdmin, router, isLoginPage]);

  // For /admin/login, just render children without header/guard
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen bg-mesh-gradient grainy-texture flex items-center justify-center overflow-x-hidden font-sans">
        <div className="relative z-10 text-sm text-[#2D1B5E] bg-white/80 px-4 py-2 rounded-full shadow-lg">
          Checking admin access...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mesh-gradient grainy-texture relative overflow-x-hidden font-sans">
      <div className="relative z-10">
        <AdminHeader />
        <main className="max-w-6xl mx-auto px-4 md:px-8 py-10">{children}</main>
      </div>
    </div>
  );
}
