"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import AdminHeader from "../../components/AdminHeader";
import { Loader2 } from "lucide-react";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const { loading, isAdmin } = useAdminAuth();

  useEffect(() => {
    if (isLoginPage) return;
    if (loading) return;
    if (!isAdmin) {
      router.replace("/login");
    }
  }, [loading, isAdmin, router, isLoginPage]);

  if (isLoginPage) return <>{children}</>;

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 relative font-sans text-slate-800 selection:bg-rose-200 overflow-x-hidden">

      {/* BACKGROUND LAYER */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[70rem] h-[70rem] rounded-full bg-indigo-500/25 blur-[150px] mix-blend-multiply animate-blob filter"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[70rem] h-[70rem] rounded-full bg-cyan-500/25 blur-[150px] mix-blend-multiply animate-blob animation-delay-2000 filter"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80rem] h-[80rem] rounded-full bg-rose-500/20 blur-[180px] mix-blend-multiply animate-blob animation-delay-4000 filter"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <AdminHeader />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 animate-in fade-in duration-700">
          {children}
        </main>
      </div>
    </div>
  );
}