"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { 
  User, Calendar, CheckCircle2, Clock, 
  XCircle, ChevronRight, Activity, LogOut, MessageSquare, Building2
} from "lucide-react";
import { motion } from "framer-motion";
import api from "../../services/api";
import { ExternalLink } from "lucide-react";

// --- COMPONENT: Soft Mesh Background (Pink & Gray Edition) ---
const SoftBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-[#FBF7FF]">
      {/* 1. Top Left - Purple (Brand) */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-300/30 blur-[120px]"
      />

      {/* 2. Top Right - SOFT PINK (Replaced Mint) */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], x: [0, -30, 0], y: [0, 50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-pink-300/25 blur-[120px]"
      />

      {/* 3. Bottom Left - Deep Brand Tint */}
      <motion.div 
        animate={{ scale: [1, 1.3, 1], x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-20%] left-[10%] w-[60vw] h-[60vw] rounded-full bg-[#3F2965]/15 blur-[150px]"
      />

      {/* 4. Bottom Right - COOL GRAY (Replaced Emerald) */}
      <motion.div 
         animate={{ scale: [1, 1.2, 1], x: [0, -50, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-gray-400/20 blur-[100px]"
      />
    </div>
  );
};

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [sessions, setSessions] = useState([]);

  const refreshSessions = async () => {
    const freshSessions = await api.getUserSessions();
    setSessions(freshSessions || []);
  };

  useEffect(() => {
    async function loadData() {
      try {
        const [p, s, sess] = await Promise.all([
          api.getUserProfile(),
          api.getUserSessionsSummary(),
          api.getUserSessions(),
        ]);
        setProfile(p);
        setSummary(s);
        setSessions(sess || []);
      } catch (e) {
        if (e.message?.toLowerCase().includes("login")) {
          router.replace("/login");
          return;
        }
        setError(e.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [router]);

  useEffect(() => {
    const onFocus = () => refreshSessions();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#FBF7FF]/90 flex flex-col items-center justify-center space-y-4">
      <SoftBackground />
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-10 h-10 border-4 border-[#3F2965]/10 border-t-[#3F2965] rounded-full" />
      <p className="text-[#3F2965] animate-pulse font-medium">Syncing your journey...</p>
    </div>
  );

  const approvedUpcoming = sessions.filter(s => s.displayCategory === 'approvedUpcoming').sort((a, b) => new Date(a.date) - new Date(b.date));
  const pendingUpcoming = sessions.filter(s => s.displayCategory === 'pendingUpcoming').sort((a, b) => new Date(a.date) - new Date(b.date));
  const completed = sessions.filter(s => s.displayCategory === 'completed');
  const rejected = sessions.filter(s => s.displayCategory === 'rejected');

  return (
    <div className="min-h-screen relative font-sans text-[#2E2A36]">
      <SoftBackground />

      <div className="relative z-10 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-3xl md:text-5xl font-light text-[#2E2A36]">
                Hello, <span className="font-medium text-[#3F2965]">{profile?.name.split(' ')[0]}</span>
              </h1>
              <p className="text-[#5E5A6B] mt-2 flex items-center gap-2">
                <Calendar size={14} /> {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </motion.div>
            <div className="flex items-center gap-4">
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                     href="/corporate" 
                     // Updated to Pink/Gray theme (Light gray bg with purple text)
                     className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E5E7EB] border border-gray-300 text-sm font-bold text-[#3F2965] shadow-sm hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                      <Building2 size={16} /> Corporate Inquiry
                  </Link>
              </motion.div>

              <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => { /* Add your logout logic here */ }}
                 // Updated to Pinkish-Red theme
                 className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFE4E6] border border-pink-200 text-sm font-bold text-pink-700 shadow-sm hover:bg-pink-100 transition-colors"
              >
                <LogOut size={16} /> Sign Out
              </motion.button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            
            {/* Identity Card */}
            <div className="lg:col-span-1 bg-[#FAF5FF]/90 rounded-[2rem] p-8 shadow-sm border border-[#E9D5FF] relative overflow-hidden group transition-all">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-[#3F2965]">
                <User size={100} />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#3F2965] mb-6">Identity</h3>
              <div className="space-y-4 relative z-10">
                 <div>
                   <p className="text-[10px] text-[#5E5A6B] uppercase font-bold">Email Address</p>
                   <p className="text-[#2E2A36] font-medium">{profile?.email}</p>
                 </div>
                 <div>
                   <p className="text-[10px] text-[#5E5A6B] uppercase font-bold">Member Since</p>
                   <p className="text-[#2E2A36] font-medium">{new Date(profile?.createdAt).toLocaleDateString()}</p>
                 </div>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <SummaryCard label="Total" value={summary?.totalSessions} icon={<Activity size={18}/>} color="bg-[#3F2965]" />
              {/* Updated Colors for Stats */}
              <SummaryCard label="Approved" value={summary?.approvedUpcomingSessions} icon={<CheckCircle2 size={18}/>} color="bg-pink-500" />
              <SummaryCard label="Pending" value={summary?.pendingSessions} icon={<Clock size={18}/>} color="bg-gray-500" />
              <SummaryCard label="Completed" value={summary?.completedSessions} icon={<CheckCircle2 size={18}/>} color="bg-purple-400" />
            </div>
          </div>

          {/* Sessions Sections */}
          <div className="space-y-12">
            <SessionSection title="Confirmed Appointments" data={approvedUpcoming} type="approvedUpcoming" router={router} />
            <SessionSection title="Waiting for Approval" data={pendingUpcoming} type="pendingUpcoming" router={router} />
            
            <div className="grid md:grid-cols-2 gap-8">
              <SessionSection title="History" data={completed} type="completed" router={router} />
              <SessionSection title="Archive" data={rejected} type="rejected" router={router} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, icon, color }) {
  return (
    <div className="bg-[#FAF5FF]/80 rounded-[2rem] p-5 border border-[#E9D5FF] shadow-sm flex flex-col justify-between hover:bg-[#F3E8FF] transition-colors">
      <div className={`w-10 h-10 rounded-xl ${color} text-white flex items-center justify-center mb-4 shadow-md`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase text-[#5E5A6B] tracking-tighter">{label}</p>
        <p className="text-2xl font-bold text-[#2E2A36]">{value ?? 0}</p>
      </div>
    </div>
  );
}

function SessionSection({ title, data, type, router }) {
  // --- UPDATED COLOR LOGIC ---
  // Approved = Pink (Warm/Welcoming)
  // Pending = Gray (Neutral)
  // Completed = Purple (Brand)
  // Rejected = Red (Standard)
  const styles = {
    approvedUpcoming: "bg-pink-100/60 text-pink-800 border-pink-200",
    pendingUpcoming: "bg-gray-100/60 text-gray-700 border-gray-200",
    completed: "bg-purple-100/60 text-purple-800 border-purple-200",
    rejected: "bg-red-50 text-red-800 border-red-200",
  };

  const icons = {
    approvedUpcoming: <CheckCircle2 size={14} />,
    pendingUpcoming: <Clock size={14} />,
    completed: <CheckCircle2 size={14} />,
    rejected: <XCircle size={14} />,
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#3F2965] mb-5 px-2 opacity-90">{title}</h2>
      {data.length === 0 ? (
        <div className="bg-[#3F2965]/5 rounded-3xl p-6 border border-dashed border-[#3F2965]/20 text-sm text-[#5E5A6B] text-center italic">
          No records found in this category.
        </div>
      ) : (
        <div className="grid gap-3">
          {data.map((s) => (
            <motion.div 
              key={s._id || s.id}
              whileHover={{ x: 5, backgroundColor: "#F3E8FF" }}
              className="bg-[#FAF5FF]/90 rounded-2xl p-5 shadow-sm border border-[#E9D5FF] flex flex-col gap-4 group transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center ${styles[type]}`}>
                      <span className="text-[10px] font-bold uppercase">{new Date(s.date || s.slot?.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                      <span className="text-lg font-bold leading-none">{new Date(s.date || s.slot?.date).getDate()}</span>
                  </div>
                  <div>
                    <p className="font-bold text-[#2E2A36]">{s.startTime || s.slot?.startTime} - {s.endTime || s.slot?.endTime}</p>
                    <p className="text-xs text-[#5E5A6B] capitalize">{s.sessionType} Session</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 self-end md:self-auto">
                  <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[type]} shadow-sm`}>
                    {icons[type]} {type === 'approvedUpcoming' ? 'Approved' : type === 'pendingUpcoming' ? 'Pending' : type}
                  </span>

                  {/* ADD TO GOOGLE CALENDAR BUTTON */}
                   {type === "approvedUpcoming" && s.calendarEventLink && (
                      <a
                        href={s.calendarEventLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100 text-pink-700 text-[10px] font-bold uppercase hover:bg-pink-200 transition-colors"
                      >
                        <ExternalLink size={12} />
                        Add to Calendar
                      </a>
                    )}
                    
                  <button 
                    onClick={() => router.push(`/appointment-status?id=${s._id || s.id}`)}
                    className="p-2 rounded-full bg-[#F3E8FF] text-[#3F2965] hover:bg-[#E9D5FF] transition-colors shadow-sm border border-[#D8B4FE]"
                    title="View Full Details"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* REJECTION REASON PREVIEW */}
              {type === 'rejected' && s.rejectionReason && (
                <div className="mt-2 p-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
                  <MessageSquare size={14} className="text-red-400 mt-0.5 shrink-0" />
                  <div className="text-xs text-red-800">
                    <p className="font-bold mb-0.5">Reason for rejecting your appointment request:</p>
                    <p>{s.rejectionReason}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}