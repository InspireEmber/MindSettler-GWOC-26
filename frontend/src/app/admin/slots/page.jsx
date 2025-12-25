"use client";
import { useEffect, useState } from "react";
import { Calendar, Filter, Plus, Trash2, Clock, Sparkles, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminSlotsPage() {
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState([]);
  const [form, setForm] = useState({
    startDate: "", startTime: "10:00", endTime: "17:00", duration: 60, mode: "both"
  });
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState({ date: "", type: "all" });

  const fetchSlots = async (date = filter.date, type = filter.type) => {
    try {
      const params = new URLSearchParams();
      if (date) params.set("date", date);
      if (type !== "all") params.set("sessionType", type);
      const res = await fetch(`${API_BASE_URL}/slots?${params.toString()}`, { credentials: "include" });
      const data = await res.json();
      setSlots(data.data || []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(() => { fetchSlots(); }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(`${API_BASE_URL}/slots/generate-week`, {
        method: "POST", credentials: "include", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          weekStartDate: form.startDate, startTime: form.startTime, endTime: form.endTime, 
          slotDurationMinutes: Number(form.duration), 
          sessionTypes: form.mode === "both" ? ["online", "offline"] : [form.mode],
          daysOfWeek: [1, 2, 3, 4, 5] 
        }),
      });
      fetchSlots();
      alert("Weekly schedule generated!");
    } catch (err) { alert("Generation failed"); } 
    finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this available slot?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/admin/slots/${id}`, { method: "DELETE", credentials: "include" });
      if (res.ok) setSlots(prev => prev.filter(s => s._id !== id));
    } catch (e) { alert("Delete failed"); }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#3F2965]/10 pb-6">
        <div>
          <h1 className="text-3xl font-light text-[#2E2A36]">Slot <span className="font-medium">Manager</span></h1>
          <p className="text-sm text-[#5E5A6B] mt-1">Design your weekly availability and manage existing sessions.</p>
        </div>
        <div className="flex gap-4">
           <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/> 
             <span className="text-[10px] font-bold uppercase tracking-widest text-green-700">Available</span>
           </div>
           <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
             <div className="w-1.5 h-1.5 rounded-full bg-blue-500"/> 
             <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700">Booked</span>
           </div>
        </div>
      </div>

      <section className="bg-[#3F2965] rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
  
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-[#DD1764] rounded-lg shadow-lg">
            <Plus size={20} />
          </div>
          <h2 className="text-xl font-medium">Bulk Week Generator</h2>
        </div>

        <form onSubmit={handleGenerate} className="flex flex-wrap items-end gap-6 relative z-10">
          <div className="flex-1 min-w-[200px] space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-[0.1em] opacity-60 ml-1">Starting Monday</label>
            <input type="date" required value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} 
              className="w-full h-14 px-5 rounded-2xl bg-white/10 border border-white/10 focus:bg-white focus:text-[#3F2965] outline-none transition-all placeholder-white/50" />
          </div>

          <div className="flex-[1.5] min-w-[280px] space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-[0.1em] opacity-60 ml-1">Active Hours</label>
            <div className="flex items-center gap-3">
              <input type="time" required value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})} className="w-full h-14 px-4 rounded-2xl bg-white/10 border border-white/10 focus:bg-white focus:text-[#3F2965] outline-none text-center font-medium" />
              <span className="text-white/40 font-light">to</span>
              <input type="time" required value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})} className="w-full h-14 px-4 rounded-2xl bg-white/10 border border-white/10 focus:bg-white focus:text-[#3F2965] outline-none text-center font-medium" />
            </div>
          </div>

          <div className="flex-1 min-w-[200px] space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-[0.1em] opacity-60 ml-1">Session Mode</label>
            <select value={form.mode} onChange={e => setForm({...form, mode: e.target.value})} 
              className="w-full h-14 px-5 rounded-2xl bg-white/10 border border-white/10 focus:bg-white focus:text-[#3F2965] outline-none appearance-none cursor-pointer font-medium">
              <option className="text-black" value="both">All Modes</option>
              <option className="text-black" value="online">Online Only</option>
              <option className="text-black" value="offline">Offline Only</option>
            </select>
          </div>

          <button disabled={submitting} className="h-14 px-10 bg-[#DD1764] hover:bg-white hover:text-[#DD1764] rounded-2xl font-bold shadow-xl transition-all disabled:opacity-50 active:scale-95 flex items-center gap-2 shrink-0">
            {submitting ? "Processing..." : "Generate Week"} <ChevronRight size={18} />
          </button>
        </form>
      </section>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-4 rounded-[2rem] border border-[#3F2965]/5 shadow-sm">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-10 h-10 rounded-full bg-[#F6F4FA] flex items-center justify-center text-[#3F2965]">
            <Calendar size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Selected Date</span>
            <input type="date" value={filter.date} onChange={(e) => { setFilter({...filter, date: e.target.value}); fetchSlots(e.target.value, filter.type); }} 
              className="bg-transparent text-sm font-bold text-[#3F2965] outline-none" />
          </div>
        </div>

        <div className="flex bg-[#F6F4FA] p-1.5 rounded-2xl w-full md:w-auto">
          {["all", "online", "offline"].map(t => (
            <button key={t} onClick={() => { setFilter({...filter, type: t}); fetchSlots(filter.date, t); }} 
              className={`flex-1 md:flex-none px-8 py-2.5 rounded-xl text-[10px] font-bold uppercase transition-all tracking-wider ${filter.type === t ? "bg-white text-[#3F2965] shadow-md" : "text-gray-400 hover:text-[#3F2965]"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-[#5E5A6B] gap-4">
          <Clock className="w-10 h-10 animate-spin text-[#3F2965]/20" />
          <p className="font-medium animate-pulse">Fetching your schedule...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          <AnimatePresence>
            {slots.map((s) => (
              <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} key={s._id} 
                className={`group relative p-6 rounded-[2.5rem] border transition-all ${s.isBooked ? 'bg-blue-50/50 border-blue-100 shadow-inner' : 'bg-white border-gray-100 hover:border-[#3F2965]/20 hover:shadow-2xl hover:shadow-[#3F2965]/5'}`}>
                
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${s.sessionType === 'online' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>{s.sessionType}</span>
                    {!s.isBooked && (
                      <button onClick={() => handleDelete(s._id)} className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                        <Trash2 size={14}/>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-sm ${s.isBooked ? 'bg-blue-500 text-white' : 'bg-[#F6F4FA] text-[#3F2965]'}`}>
                       <span className="text-[9px] font-black uppercase leading-none opacity-60">{new Date(s.date).toLocaleDateString(undefined, {month:'short'})}</span>
                       <span className="text-xl font-bold leading-none mt-1">{new Date(s.date).getDate()}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#2E2A36] tracking-tight">{s.startTime}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">to {s.endTime}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!loading && slots.length === 0 && (
        <div className="text-center py-20 bg-[#F6F4FA] rounded-[3rem] border border-dashed border-[#3F2965]/10">
          <Calendar className="w-12 h-12 text-[#3F2965]/10 mx-auto mb-4" />
          <p className="text-[#5E5A6B] font-medium italic">No sessions scheduled for this period.</p>
        </div>
      )}
    </div>
  );
}