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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-[#5E5A6B]">Checking admin access...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F4FA]">
      <AdminHeader />
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-6">{children}</main>
    </div>
  );
}
