"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Users, CalendarCheck, Clock, TrendingUp, 
  DollarSign, Activity, LayoutDashboard, ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/stats/overview`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to sync dashboard data");
        const data = await res.json();
        setStats(data.data || null);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-[#5E5A6B] space-y-4">
      <div className="w-10 h-10 border-4 border-[#3F2965]/10 border-t-[#3F2965] rounded-full animate-spin" />
      <p className="animate-pulse font-medium">Building your overview...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-[#2E2A36] flex items-center gap-3">
            <LayoutDashboard className="text-[#3F2965]" />
            Dashboard <span className="font-medium">Overview</span>
          </h1>
          <p className="text-sm text-[#5E5A6B] mt-1">Real-time performance and engagement metrics.</p>
        </div>
        <div className="hidden md:flex gap-2 text-[10px] font-bold uppercase tracking-widest text-[#3F2965]">
          <span className="px-3 py-1 bg-[#3F2965]/5 rounded-full border border-[#3F2965]/10 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live System Data
          </span>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-2 text-sm">
          <Activity size={16} /> {error}
        </div>
      )}

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Appointments" 
          value={stats?.totalAppointments} 
          icon={<CalendarCheck size={20} />} 
          trend="+12% growth" 
          color="bg-[#3F2965]" 
        />
        <StatCard 
          label="Pending Review" 
          value={stats?.pendingReview || stats?.upcomingAppointments} 
          icon={<Clock size={20} />} 
          trend="Needs Attention" 
          color="bg-[#DD1764]" 
        />
        <StatCard 
          label="Total Users" 
          value={stats?.totalUsers} 
          icon={<Users size={20} />} 
          trend="Active Community" 
          color="bg-[#2E2A36]" 
        />
        <StatCard 
          label="Total Revenue" 
          value={`₹${stats?.revenue || 0}`} 
          icon={<DollarSign size={20} />} 
          trend="Net Earnings" 
          color="bg-emerald-600" 
        />
      </div>

      {/* Action Hub */}
      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-[#3F2965]/5 shadow-[0_20px_50px_rgba(63,41,101,0.02)] overflow-hidden relative">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
          <TrendingUp size={240} />
        </div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-light text-[#2E2A36] mb-2">Management <span className="font-medium">Hub</span></h3>
          <p className="text-[#5E5A6B] text-sm mb-10 max-w-md">Quickly navigate to core administrative tasks to keep MindSettler running smoothly.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            <Link href="/admin/appointments" className="group flex items-center justify-between p-6 bg-[#3F2965] text-white rounded-[2rem] hover:shadow-2xl hover:shadow-[#3F2965]/20 transition-all active:scale-[0.98]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <CalendarCheck size={24} />
                </div>
                <div>
                  <p className="font-bold">Review Appointments</p>
                  <p className="text-xs text-white/60">Approve or manage bookings</p>
                </div>
              </div>
              <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>

            <Link href="/admin/slots" className="group flex items-center justify-between p-6 bg-[#F6F4FA] text-[#3F2965] rounded-[2rem] border border-[#3F2965]/5 hover:bg-white hover:shadow-xl transition-all active:scale-[0.98]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#3F2965]/5 flex items-center justify-center">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="font-bold">Weekly Slots</p>
                  <p className="text-xs text-[#5E5A6B]">Generate session availability</p>
                </div>
              </div>
              <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, trend, color }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-[2rem] p-6 shadow-[0_10px_40px_rgba(63,41,101,0.03)] border border-[#3F2965]/5 flex items-start gap-4 transition-all hover:border-[#3F2965]/20"
    >
      <div className={`w-12 h-12 rounded-2xl ${color} text-white flex items-center justify-center shrink-0 shadow-lg`}>
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#5E5A6B]">{label}</p>
        <p className="text-2xl font-bold text-[#2E2A36]">{value ?? 0}</p>
        <p className="text-[10px] text-[#3F2965] font-bold opacity-60 flex items-center gap-1 uppercase tracking-tighter">
          {trend}
        </p>
      </div>
    </motion.div>
  );
}