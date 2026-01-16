"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import {
  User, Calendar, CheckCircle2, Clock,
  XCircle, ChevronRight, Activity, LogOut, MessageSquare, Building2, Edit2, Check, X
} from "lucide-react";
import { motion } from "framer-motion";
import api from "../../services/api";
import { ExternalLink } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const startEditing = () => {
    setTempName(profile?.name || "");
    setIsEditingName(true);
  };

  const cancelEditing = () => {
    setIsEditingName(false);
    setTempName("");
  };

  const handleSaveName = async () => {
    if (!tempName.trim()) return;
    setIsSaving(true);
    try {
      await api.updateUserProfile({ name: tempName });
      setProfile((prev) => ({ ...prev, name: tempName }));
      setIsEditingName(false);
    } catch (err) {
      console.error("Failed to update name", err);
      alert("Failed to update name. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const refreshSessions = async () => {
    try {
      const freshSessions = await api.getUserSessions();
      setSessions(freshSessions || []);
    } catch (error) {
      console.warn("Failed to refresh sessions silently:", error);
      if (error.message?.includes("User account required")) {
        // Session likely invalid/admin logged in elsewhere.
        // We could redirect aka router.replace('/login') or just let it be.
      }
    }
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
        if (e.message?.toLowerCase().includes("login") || e.message?.includes("User account required")) {
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
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4 relative z-10">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-10 h-10 border-4 border-white/15 border-t-[#eeb9ff] rounded-full" />
      <p className="text-white animate-pulse font-medium font-redhat">Syncing your journey...</p>
    </div>
  );

  const approvedUpcoming = sessions.filter(s => s.displayCategory === 'approvedUpcoming').sort((a, b) => new Date(a.date) - new Date(b.date));
  const pendingUpcoming = sessions.filter(s => s.displayCategory === 'pendingUpcoming').sort((a, b) => new Date(a.date) - new Date(b.date));
  const completed = sessions.filter(s => s.displayCategory === 'completed');
  const rejected = sessions.filter(s => s.displayCategory === 'rejected');

  return (
    <div className="min-h-screen relative font-sans text-gray-200 overflow-x-hidden">
      <div className="relative z-10 py-12 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-3xl md:text-5xl font-light text-white">
                Hello, <span className="font-medium text-[#eeb9ff]">{profile?.name?.split(' ')[0]}</span>
              </h1>
              <p className="text-gray-300 mt-2 flex items-center gap-2 font-redhat">
                <Calendar size={14} /> {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </motion.div>
            <div className="flex items-center gap-4">

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/corporate"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-sm font-bold text-white shadow-sm hover:bg-white/20 transition-colors cursor-pointer backdrop-blur-md"
                >
                  <Building2 size={16} /> Corporate Inquiry
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">

            {/* Identity Card */}
            <div className="lg:col-span-1 bg-white/10 backdrop-blur-md rounded-[2rem] p-8 shadow-lg border border-white/15 relative overflow-hidden group transition-all">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-white">
                <User size={100} />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#eeb9ff] mb-6">Identity</h3>
              <div className="space-y-4 relative z-10">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Username</p>
                  {isEditingName ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="w-full bg-white/5 border border-white/20 rounded px-2 py-1 text-sm text-white focus:outline-none focus:border-[#eeb9ff]"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveName();
                        }}
                      />
                      <button onClick={handleSaveName} disabled={isSaving} className="text-green-400 hover:text-green-300">
                        <Check size={16} />
                      </button>
                      <button onClick={cancelEditing} disabled={isSaving} className="text-red-400 hover:text-red-300">
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 group/edit">
                      <p className="text-white font-medium text-lg truncate">{profile?.name}</p>
                      <button onClick={startEditing} className="text-[#eeb9ff] hover:text-[#eeb9ff]/80 transition-all p-1">
                        <Edit2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Email Address</p>
                  <p className="text-white font-medium">{profile?.email}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Member Since</p>
                  <p className="text-white font-medium">{new Date(profile?.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <SummaryCard label="Total" value={summary?.totalSessions} icon={<Activity size={18} />} color="bg-[#eeb9ff]/20 text-[#eeb9ff] border-white/15" />
              <SummaryCard label="Approved" value={summary?.approvedUpcomingSessions} icon={<CheckCircle2 size={18} />} color="bg-green-500/20 text-green-300 border-white/15" />
              <SummaryCard label="Pending" value={summary?.pendingSessions} icon={<Clock size={18} />} color="bg-yellow-500/20 text-yellow-300 border-white/15" />
              <SummaryCard label="Completed" value={summary?.completedSessions} icon={<CheckCircle2 size={18} />} color="bg-blue-500/20 text-blue-300 border-white/15" />
            </div>
          </div>

          {/* Sessions Sections */}
          <div className="space-y-12">
            <SessionSection title="Confirmed Appointments" data={approvedUpcoming} type="approvedUpcoming" router={router} profile={profile} />
            <SessionSection title="Waiting for Approval" data={pendingUpcoming} type="pendingUpcoming" router={router} profile={profile} />

            <div className="grid md:grid-cols-2 gap-8">
              <SessionSection title="History" data={completed} type="completed" router={router} profile={profile} />
              <SessionSection title="Archive" data={rejected} type="rejected" router={router} profile={profile} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, icon, color }) {
  // Extract background and text color from the composite class string for icon styling logic if needed, 
  // but here we just use the passed color class directly on the icon container
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-[2rem] p-5 border border-white/15 shadow-sm flex flex-col justify-between hover:bg-white/10 transition-colors">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-md ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase text-gray-400 tracking-tighter font-redhat">{label}</p>
        <p className="text-2xl font-bold text-white font-redhat">{value ?? 0}</p>
      </div>
    </div>
  );
}

function SessionSection({ title, data, type, router, profile }) {
  const styles = {
    approvedUpcoming: "bg-green-500/20 text-green-300 border-green-500/20",
    pendingUpcoming: "bg-yellow-500/20 text-yellow-300 border-yellow-500/20",
    completed: "bg-blue-500/20 text-blue-300 border-blue-500/20",
    rejected: "bg-red-500/20 text-red-300 border-red-500/20",
  };

  const icons = {
    approvedUpcoming: <CheckCircle2 size={14} />,
    pendingUpcoming: <Clock size={14} />,
    completed: <CheckCircle2 size={14} />,
    rejected: <XCircle size={14} />,
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#eeb9ff] mb-5 px-2 opacity-90">{title}</h2>
      {data.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-dashed border-white/10 text-sm text-gray-400 text-center italic">
          No records found in this category.
        </div>
      ) : (
        <div className="grid gap-3">
          {data.map((s) => (
            <motion.div
              key={s._id || s.id}
              whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.15)" }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-lg border border-white/20 flex flex-col gap-4 group transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center ${styles[type]}`}>
                    <span className="text-[10px] font-bold uppercase">{new Date(s.date || s.slot?.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                    <span className="text-lg font-bold leading-none">{new Date(s.date || s.slot?.date).getDate()}</span>
                  </div>
                  <div>
                    <p className="font-bold text-white font-redhat">{s.startTime || s.slot?.startTime} - {s.endTime || s.slot?.endTime}</p>
                    <p className="text-xs text-gray-400 capitalize font-redhat">{s.sessionType} Session</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-auto">
                  <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[type]} shadow-sm`}>
                    {icons[type]} {type === 'approvedUpcoming' ? 'Approved' : type === 'pendingUpcoming' ? 'Pending' : type}
                  </span>

                  {/* ADD TO GOOGLE CALENDAR BUTTON */}
                  {type === "approvedUpcoming" && (
                    <a
                      href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=MindSettler+Session&details=Psycho-education+session+(${s.sessionType}).&dates=${(() => {
                        const getDateStr = (d, time) => {
                          const dateObj = new Date(d);
                          const [hours, mins] = time.split(':');
                          dateObj.setHours(parseInt(hours), parseInt(mins), 0);
                          return dateObj.toISOString().replace(/-|:|\.\d\d\d/g, "");
                        };

                        const baseDate = s.date || s.slot?.date;
                        const startT = s.startTime || s.slot?.startTime;
                        const endT = s.endTime || s.slot?.endTime;

                        if (!baseDate || !startT || !endT) return "";

                        return `${getDateStr(baseDate, startT)}/${getDateStr(baseDate, endT)}`;
                      })()}${profile?.email ? `&authuser=${profile.email}` : ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase hover:bg-blue-500/30 transition-colors cursor-pointer"
                    >
                      <ExternalLink size={12} />
                      Add to Calendar
                    </a>
                  )}

                  <button
                    onClick={() => router.push(`/appointment-status?id=${s._id || s.id}`)}
                    className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors shadow-sm border border-white/20"
                    title="View Full Details"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* REJECTION REASON PREVIEW */}
              {type === 'rejected' && s.rejectionReason && (
                <div className="mt-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                  <MessageSquare size={14} className="text-red-400 mt-0.5 shrink-0" />
                  <div className="text-xs text-red-200">
                    <p className="font-bold mb-0.5 text-red-300 font-redhat">Reason for rejecting your appointment request:</p>
                    <p className="font-redhat">{s.rejectionReason}</p>
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
