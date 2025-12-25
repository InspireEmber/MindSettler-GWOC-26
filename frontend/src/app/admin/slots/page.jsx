"use client";
import { useEffect, useState } from "react";
import { Calendar, Filter, Plus, Trash2, Clock, History, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminSlotsPage() {
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  
  // Consolidated Form & Filter State
  const [form, setForm] = useState({ startDate: "", startTime: "10:00", endTime: "17:00", mode: "both" });
  const [filter, setFilter] = useState({ date: "", type: "all", timeline: "upcoming" });

  const fetchSlots = async (date = filter.date, type = filter.type, timeline = filter.timeline) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (date) params.set("date", date);
      if (type !== "all") params.set("sessionType", type);
      
      const res = await fetch(`${API_BASE_URL}/slots?${params.toString()}`, { credentials: "include" });
      const data = await res.json();
      let list = data.data || [];

      // Local Filter: Upcoming vs Past (only if specific date not selected)
      if (!date) {
        const today = new Date(); today.setHours(0,0,0,0);
        list = list.filter(s => timeline === "upcoming" ? new Date(s.date) >= today : new Date(s.date) < today);
      }
      setSlots(list);
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
          weekStartDate: form.startDate, startTime: form.startTime, endTime: form.endTime, slotDurationMinutes: 60, 
          sessionTypes: form.mode === "both" ? ["online", "offline"] : [form.mode], daysOfWeek: [1, 2, 3, 4, 5] 
        }),
      });
      fetchSlots(); alert("Generated!");
    } catch (err) { alert("Failed"); } finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete slot?")) return;
    const res = await fetch(`${API_BASE_URL}/admin/slots/${id}`, { method: "DELETE", credentials: "include" });
    if (res.ok) setSlots(prev => prev.filter(s => s._id !== id));
  };

  const updateFilter = (key, val) => {
    const newFilter = { ...filter, [key]: val };
    setFilter(newFilter);
    fetchSlots(newFilter.date, newFilter.type, newFilter.timeline);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-light text-[#2E2A36]">Slot <span className="font-medium">Manager</span></h1>
      </header>

      {/* Compact Generator */}
      <section className="bg-[#3F2965] rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
        <form onSubmit={handleGenerate} className="flex flex-wrap items-end gap-4 relative z-10">
          <div className="flex-1 min-w-[160px]">
            <label className="text-[10px] font-bold opacity-60 uppercase">Start (Mon)</label>
            <input type="date" required value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} className="w-full h-12 px-4 rounded-xl bg-white/10 border-none outline-none focus:bg-white focus:text-black transition-all" />
          </div>
          <div className="flex-[1.5] min-w-[220px]">
            <label className="text-[10px] font-bold opacity-60 uppercase">Hours</label>
            <div className="flex gap-2">
              <input type="time" value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})} className="w-full h-12 px-2 rounded-xl bg-white/10 outline-none focus:bg-white focus:text-black text-center" />
              <input type="time" value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})} className="w-full h-12 px-2 rounded-xl bg-white/10 outline-none focus:bg-white focus:text-black text-center" />
            </div>
          </div>
          <div className="flex-1 min-w-[160px]">
            <label className="text-[10px] font-bold opacity-60 uppercase">Mode</label>
            <select value={form.mode} onChange={e => setForm({...form, mode: e.target.value})} className="w-full h-12 px-4 rounded-xl bg-white/10 outline-none focus:bg-white focus:text-black appearance-none">
              <option className="text-black" value="both">All Modes</option>
              <option className="text-black" value="online">Online</option>
              <option className="text-black" value="offline">Offline</option>
            </select>
          </div>
          <button disabled={submitting} className="h-12 px-6 bg-[#DD1764] hover:bg-white hover:text-[#DD1764] rounded-xl font-bold transition-all disabled:opacity-50 flex items-center gap-2">
            {submitting ? "..." : "Generate"} <ChevronRight size={16} />
          </button>
        </form>
      </section>

      {/* Unified Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm items-center">
        <div className="flex items-center gap-3 pl-4 w-full lg:w-auto">
          <Calendar size={18} className="text-[#3F2965]" />
          <input type="date" value={filter.date} onChange={(e) => updateFilter('date', e.target.value)} className="bg-transparent text-sm font-bold text-[#3F2965] outline-none w-full" />
        </div>
        
        <div className="flex gap-2 w-full lg:w-auto justify-center bg-gray-50 p-1 rounded-xl">
           {[ {id:'upcoming', icon:<Clock size={12}/>}, {id:'past', icon:<History size={12}/>} ].map(t => (
             <button key={t.id} onClick={() => updateFilter('timeline', t.id)} className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase ${filter.timeline === t.id ? "bg-white shadow-sm text-[#3F2965]" : "text-gray-400"}`}>
               {t.icon} {t.id}
             </button>
           ))}
        </div>

        <div className="flex gap-1 w-full lg:w-auto bg-gray-50 p-1 rounded-xl">
          {["all", "online", "offline"].map(t => (
            <button key={t} onClick={() => updateFilter('type', t)} className={`flex-1 px-6 py-1.5 rounded-lg text-[10px] font-bold uppercase ${filter.type === t ? "bg-white shadow-sm text-[#3F2965]" : "text-gray-400"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Slot Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <AnimatePresence mode="popLayout">
          {slots.map((s) => (
            <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} key={s._id} 
              className={`p-5 rounded-[2rem] border transition-all relative group ${s.isBooked ? 'bg-blue-50/50 border-blue-100' : 'bg-white border-gray-100 hover:shadow-lg hover:border-[#3F2965]/20'}`}>
              
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-2">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${s.sessionType === 'online' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>{s.sessionType}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${s.isBooked ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{s.isBooked ? 'Booked' : 'Open'}</span>
                </div>
                {/* DELETE BUTTON - Only shows if not booked */}
                {!s.isBooked && (
                  <button onClick={() => handleDelete(s._id)} className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                    <Trash2 size={16}/>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center shrink-0 ${s.isBooked ? 'bg-blue-500 text-white' : 'bg-gray-50 text-[#3F2965]'}`}>
                    <span className="text-[9px] font-bold uppercase leading-none opacity-60">{new Date(s.date).toLocaleDateString(undefined, {month:'short'})}</span>
                    <span className="text-lg font-bold leading-none">{new Date(s.date).getDate()}</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#2E2A36]">{s.startTime}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">to {s.endTime}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!loading && slots.length === 0 && (
        <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-[3rem] text-gray-400">
          No slots found. Try generating some!
        </div>
      )}
    </div>
  );
}