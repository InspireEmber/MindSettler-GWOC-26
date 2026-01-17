// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { 
//   Users, CalendarCheck, Clock, TrendingUp, 
//   DollarSign, Activity, ArrowRight
// } from "lucide-react";
// import { motion } from "framer-motion";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// export default function AdminDashboardPage() {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     async function loadStats() {
//       try {
//         const res = await fetch(`${API_BASE_URL}/admin/stats/overview`, {
//           credentials: "include",
//         });
//         if (!res.ok) throw new Error("Failed to sync data");
//         const data = await res.json();
//         setStats(data.data || null);
//       } catch (e) {
//         setError(e.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadStats();
//   }, []);

//   if (loading) return (
//     <div className="flex flex-col items-center justify-center min-h-[400px]">
//       <div className="w-10 h-10 border-4 border-pink-100 border-t-pink-500 rounded-full animate-spin" />
//     </div>
//   );

//   return (
//     <div className="space-y-6 md:space-y-8">

//       {/* Header */}
//       <div className="flex flex-col gap-2">
//         <h1 className="text-2xl md:text-3xl font-bold text-[#334155] tracking-tight">
//           Dashboard
//         </h1>
//         <p className="text-sm md:text-base text-[#64748B] font-medium">
//           Welcome back to your command center.
//         </p>
//       </div>

//       {error && (
//         <div className="p-4 bg-rose-50/80 backdrop-blur-sm border border-rose-100 text-rose-600 rounded-2xl flex items-center gap-2 text-sm">
//           <Activity size={16} className="shrink-0" /> {error}
//         </div>
//       )}

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
//         <StatCard 
//           label="Total Appointments" 
//           value={stats?.totalAppointments} 
//           icon={<CalendarCheck size={22} />} 
//           trend="+12%" 
//           theme="rose"
//         />
//         <StatCard 
//           label="Pending Review" 
//           value={stats?.pendingReview || stats?.upcomingAppointments} 
//           icon={<Clock size={22} />} 
//           trend="Action" 
//           theme="amber"
//         />
//         <StatCard 
//           label="Total Users" 
//           value={stats?.totalUsers} 
//           icon={<Users size={22} />} 
//           trend="Active" 
//           theme="blue"
//         />
//         <StatCard 
//           label="Total Revenue" 
//           value={`₹${stats?.revenue || 0}`} 
//           icon={<DollarSign size={22} />} 
//           trend="Net" 
//           theme="emerald"
//         />
//       </div>

//       {/* Action Hub */}
//       <div className="w-full">
//         <div className="bg-white/60 backdrop-blur-xl rounded-[24px] md:rounded-[30px] p-6 md:p-8 border border-white/50 shadow-sm relative overflow-hidden group">

//           {/* Subtle decoration - Hidden on mobile to save space/performance */}
//           <div className="absolute -right-10 -top-10 text-rose-500/5 group-hover:scale-110 transition-transform duration-1000 hidden md:block">
//             <TrendingUp size={350} />
//           </div>

//           <div className="relative z-10">
//             <h3 className="text-lg md:text-xl font-bold text-[#334155] mb-2">Quick Actions</h3>
//             <p className="text-sm md:text-base text-[#64748B] mb-6 md:mb-8 max-w-md">
//               Navigate to your most frequent administrative tasks.
//             </p>

//             {/* Grid of actions */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-4xl">
//               <ActionButton 
//                 href="/admin/appointments" 
//                 icon={<CalendarCheck size={24} />} 
//                 title="Review Appointments" 
//                 desc="Manage incoming bookings"
//                 colorClass="bg-rose-50 text-rose-600 group-hover:bg-rose-500 group-hover:text-white"
//                 arrowColor="text-rose-300"
//               />
//               <ActionButton 
//                 href="/admin/slots" 
//                 icon={<Clock size={24} />} 
//                 title="Manage Slots" 
//                 desc="Update weekly availability"
//                 colorClass="bg-sky-50 text-sky-600 group-hover:bg-sky-500 group-hover:text-white"
//                 arrowColor="text-sky-300"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

// // Reusable Components

// function StatCard({ label, value, icon, trend, theme }) {
//   const themes = {
//     rose:    { bg: "bg-rose-50/80",    icon: "text-rose-600",    border: "border-rose-100",    trend: "bg-rose-100 text-rose-700" },
//     teal:    { bg: "bg-teal-50/80",    icon: "text-teal-600",    border: "border-teal-100",    trend: "bg-teal-100 text-teal-700" },
//     amber:   { bg: "bg-amber-50/80",   icon: "text-amber-600",   border: "border-amber-100",   trend: "bg-amber-100 text-amber-700" },
//     blue:    { bg: "bg-sky-50/80",     icon: "text-sky-600",     border: "border-sky-100",     trend: "bg-sky-100 text-sky-700" },
//     emerald: { bg: "bg-emerald-50/80", icon: "text-emerald-600", border: "border-emerald-100", trend: "bg-emerald-100 text-emerald-700" },
//   };

//   const t = themes[theme] || themes.blue;

//   return (
//     <motion.div 
//       whileHover={{ y: -4 }}
//       className={`${t.bg} backdrop-blur-md rounded-[20px] md:rounded-[24px] p-5 md:p-6 border ${t.border} shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-lg transition-all`}
//     >
//       <div className="flex items-center justify-between mb-4">
//          <div className={`p-3 rounded-xl bg-white/60 shadow-sm ${t.icon}`}>
//           {icon}
//         </div>
//         <span className={`text-[10px] md:text-[11px] font-bold px-2 md:px-3 py-1 rounded-full ${t.trend} uppercase tracking-wider`}>
//           {trend}
//         </span>
//       </div>
//       <div>
//         <p className="text-2xl md:text-3xl font-bold text-[#1E293B]">{value ?? 0}</p>
//         <p className="text-[10px] md:text-xs font-semibold text-[#64748B] uppercase tracking-wider mt-1">{label}</p>
//       </div>
//     </motion.div>
//   );
// }

// function ActionButton({ href, icon, title, desc, colorClass, arrowColor }) {
//   return (
//     <Link href={href} className="group flex items-center justify-between p-4 md:p-5 bg-white/40 border border-white/60 rounded-[20px] hover:bg-white/90 hover:shadow-md transition-all duration-300">
//       <div className="flex items-center gap-4 md:gap-5">
//         <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 shadow-sm shrink-0 ${colorClass}`}>
//           {icon}
//         </div>
//         <div className="text-left min-w-0">
//           <p className="font-bold text-[#334155] text-base md:text-lg group-hover:text-black transition-colors truncate">{title}</p>
//           <p className="text-xs md:text-sm text-[#64748B] truncate">{desc}</p>
//         </div>
//       </div>
//       <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 ${arrowColor} opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all hidden sm:flex`}>
//          <ArrowRight size={18} />
//       </div>
//     </Link>
//   );
// }


'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users, CalendarCheck, Clock, TrendingUp,
  Activity, ArrowRight, Newspaper, IndianRupee
} from "lucide-react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "../../../config/api";

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
        if (!res.ok) throw new Error("Failed to sync data");
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
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="w-10 h-10 border-4 border-pink-100 border-t-pink-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6 md:space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-[#334155] tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm md:text-base text-[#64748B] font-medium">
          Welcome back to your command center.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-50/80 backdrop-blur-sm border border-rose-100 text-rose-600 rounded-2xl flex items-center gap-2 text-sm">
          <Activity size={16} className="shrink-0" /> {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <StatCard
          label="Total Appointments"
          value={stats?.totalAppointments}
          icon={<CalendarCheck size={22} />}
          trend="+12%"
          theme="rose"
        />
        <StatCard
          label="Pending Review"
          value={stats?.pendingAppointments}
          icon={<Clock size={22} />}
          trend="Action"
          theme="amber"
        />
        <StatCard
          label="Total Users"
          value={stats?.totalUsers}
          icon={<Users size={22} />}
          trend="Active"
          theme="blue"
        />
        <StatCard
          label="Total Revenue"
          value={`₹${stats?.revenue || 0}`}
          icon={<IndianRupee size={22} />}
          trend="Net"
          theme="emerald"
        />
      </div>

      {/* Action Hub */}
      <div className="w-full">
        <div className="bg-white/60 backdrop-blur-xl rounded-[24px] md:rounded-[30px] p-6 md:p-8 border border-white/50 shadow-sm relative overflow-hidden group">

          {/* Subtle decoration - Hidden on mobile to save space/performance */}
          <div className="absolute -right-10 -top-10 text-rose-500/5 group-hover:scale-110 transition-transform duration-1000 hidden md:block">
            <TrendingUp size={350} />
          </div>

          <div className="relative z-10">
            <h3 className="text-lg md:text-xl font-bold text-[#334155] mb-2">Quick Actions</h3>
            <p className="text-sm md:text-base text-[#64748B] mb-6 md:mb-8 max-w-md">
              Navigate to your most frequent administrative tasks.
            </p>

            {/* Grid of actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-4xl">
              <ActionButton
                href="/admin/appointments"
                icon={<CalendarCheck size={24} />}
                title="Review Appointments"
                desc="Manage incoming bookings"
                colorClass="bg-rose-50 text-rose-600 group-hover:bg-rose-500 group-hover:text-white"
                arrowColor="text-rose-300"
              />
              <ActionButton
                href="/admin/slots"
                icon={<Clock size={24} />}
                title="Manage Slots"
                desc="Update weekly availability"
                colorClass="bg-sky-50 text-sky-600 group-hover:bg-sky-500 group-hover:text-white"
                arrowColor="text-sky-300"
              />
              <ActionButton
                href="/admin/latest-events"
                icon={<Newspaper size={24} />}
                title="Manage Events"
                desc="Create and update latest events"
                colorClass="bg-purple-50 text-purple-600 group-hover:bg-purple-500 group-hover:text-white"
                arrowColor="text-purple-300"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// Reusable Components

function StatCard({ label, value, icon, trend, theme }) {
  const themes = {
    rose: { bg: "bg-rose-50/80", icon: "text-rose-600", border: "border-rose-100", trend: "bg-rose-100 text-rose-700" },
    teal: { bg: "bg-teal-50/80", icon: "text-teal-600", border: "border-teal-100", trend: "bg-teal-100 text-teal-700" },
    amber: { bg: "bg-amber-50/80", icon: "text-amber-600", border: "border-amber-100", trend: "bg-amber-100 text-amber-700" },
    blue: { bg: "bg-sky-50/80", icon: "text-sky-600", border: "border-sky-100", trend: "bg-sky-100 text-sky-700" },
    emerald: { bg: "bg-emerald-50/80", icon: "text-emerald-600", border: "border-emerald-100", trend: "bg-emerald-100 text-emerald-700" },
  };

  const t = themes[theme] || themes.blue;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`${t.bg} backdrop-blur-md rounded-[20px] md:rounded-[24px] p-5 md:p-6 border ${t.border} shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-lg transition-all`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-white/60 shadow-sm ${t.icon}`}>
          {icon}
        </div>
        <span className={`text-[10px] md:text-[11px] font-bold px-2 md:px-3 py-1 rounded-full ${t.trend} uppercase tracking-wider`}>
          {trend}
        </span>
      </div>
      <div>
        <p className="text-2xl md:text-3xl font-bold text-[#1E293B]">{value ?? 0}</p>
        <p className="text-[10px] md:text-xs font-semibold text-[#64748B] uppercase tracking-wider mt-1">{label}</p>
      </div>
    </motion.div>
  );
}

function ActionButton({ href, icon, title, desc, colorClass, arrowColor }) {
  return (
    <Link href={href} className="group flex items-center justify-between p-4 md:p-5 bg-white/40 border border-white/60 rounded-[20px] hover:bg-white/90 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-4 md:gap-5">
        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 shadow-sm shrink-0 ${colorClass}`}>
          {icon}
        </div>
        <div className="text-left min-w-0">
          <p className="font-bold text-[#334155] text-base md:text-lg group-hover:text-black transition-colors truncate">{title}</p>
          <p className="text-xs md:text-sm text-[#64748B] truncate">{desc}</p>
        </div>
      </div>
      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 ${arrowColor} opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all hidden sm:flex`}>
        <ArrowRight size={18} />
      </div>
    </Link>
  );
}