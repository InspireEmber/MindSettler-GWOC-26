"use client";
import { useEffect, useState } from "react";
import { Calendar, Trash2, Clock, Globe, MapPin, CheckSquare, Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminSlotsPage() {
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]); 
  
  const [form, setForm] = useState({ 
    startDate: "", 
    endDate: "",
    startTime: "10:00", 
    endTime: "17:00", 
    mode: "both",
    duration: "60" 
  });
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
      if (!date) {
        const today = new Date(); today.setHours(0,0,0,0);
        list = list.filter(s => timeline === "upcoming" ? new Date(s.date) >= today : new Date(s.date) < today);
      }
      setSlots(list.sort((a, b) => new Date(a.date) - new Date(b.date) || a.startTime.localeCompare(b.startTime)));
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
          startDate: form.startDate, 
          endDate: form.endDate,
          startTime: form.startTime, 
          endTime: form.endTime, 
          slotDurationMinutes: parseInt(form.duration),
          sessionTypes: form.mode === "both" ? ["online", "offline"] : [form.mode], 
          daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
        }),
      });
      fetchSlots();
      alert("Schedule generated successfully!");
    } catch (err) { alert("Failed to generate"); } finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this time slot?")) return;
    const res = await fetch(`${API_BASE_URL}/admin/slots/${id}`, { method: "DELETE", credentials: "include" });
    if (res.ok) setSlots(prev => prev.filter(s => s._id !== id));
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selectedSlots.length} selected slots?`)) return;
    const deletePromises = selectedSlots.map(id => 
      fetch(`${API_BASE_URL}/admin/slots/${id}`, { method: "DELETE", credentials: "include" })
    );
    await Promise.all(deletePromises);
    setSlots(prev => prev.filter(s => !selectedSlots.includes(s._id)));
    setSelectedSlots([]);
  };

  const toggleSelect = (id) => {
    setSelectedSlots(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const deletableIds = slots.filter(s => !s.isBooked).map(s => s._id);
    setSelectedSlots(selectedSlots.length === deletableIds.length ? [] : deletableIds);
  };

  const updateFilter = (key, val) => {
    const newFilter = { ...filter, [key]: val };
    setFilter(newFilter);
    fetchSlots(newFilter.date, newFilter.type, newFilter.timeline);
  };

  return (
    <div className="min-h-screen text-white/90">
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
              Schedule Manager
            </h1>
            <p className="text-sm text-white/80 mt-1 font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]">
              Create, track, and manage session availability
            </p>
          </div>
          {selectedSlots.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-4 py-2.5 bg-schedule-pink text-white rounded-full shadow-lg shadow-schedule-pink/40 hover:bg-[#ff375c] transition-all font-semibold text-sm"
            >
              <Trash2 size={16} /> Delete Selected ({selectedSlots.length})
            </motion.button>
          )}
        </header>

        {/* Generate Slots Card (glassmorphism) */}
        <section className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-glass p-6 md:p-8 shadow-[0_22px_60px_rgba(15,23,42,0.55)]">
          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="inline-flex items-center text-[11px] font-semibold text-schedule-purple uppercase tracking-widest px-3 py-1 rounded-full bg-white/40">
                  Start Date
                </label>
                <input
                  type="date"
                  required
                  value={form.startDate}
                  onChange={e => setForm({ ...form, startDate: e.target.value })}
                  className="w-full h-12 px-4 rounded-2xl bg-white text-[#2E2A36] border border-white/40 focus:border-schedule-pink focus:ring-2 focus:ring-schedule-pink/40 outline-none transition-all text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="inline-flex items-center text-[11px] font-semibold text-schedule-purple uppercase tracking-widest px-3 py-1 rounded-full bg-white/40">
                  End Date
                </label>
                <input
                  type="date"
                  required
                  value={form.endDate}
                  onChange={e => setForm({ ...form, endDate: e.target.value })}
                  className="w-full h-12 px-4 rounded-2xl bg-white text-[#2E2A36] border border-white/40 focus:border-schedule-pink focus:ring-2 focus:ring-schedule-pink/40 outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <label className="inline-flex items-center gap-1 text-[11px] font-semibold text-schedule-purple uppercase tracking-widest px-3 py-1 rounded-full bg-white/40">
                  <Clock size={12} /> Time Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={e => setForm({ ...form, startTime: e.target.value })}
                    className="flex-1 h-12 px-3 rounded-2xl bg-white text-[#2E2A36] border border-white/40 outline-none text-center text-sm focus:border-schedule-pink focus:ring-2 focus:ring-schedule-pink/40"
                  />
                  <span className="text-white/50 font-semibold">
                    -
                  </span>
                  <input
                    type="time"
                    value={form.endTime}
                    onChange={e => setForm({ ...form, endTime: e.target.value })}
                    className="flex-1 h-12 px-3 rounded-2xl bg-white text-[#2E2A36] border border-white/40 outline-none text-center text-sm focus:border-schedule-pink focus:ring-2 focus:ring-schedule-pink/40"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="inline-flex items-center text-[11px] font-semibold text-schedule-purple uppercase tracking-widest px-3 py-1 rounded-full bg-white/40">
                  Mins/Slot
                </label>
                <select
                  value={form.duration}
                  onChange={e => setForm({ ...form, duration: e.target.value })}
                  className="w-full h-12 px-4 rounded-2xl bg-white text-[#2E2A36] border border-white/40 outline-none text-sm cursor-pointer appearance-none focus:border-schedule-pink focus:ring-2 focus:ring-schedule-pink/40"
                >
                  <option value="30">30 min</option>
                  <option value="45">45 min</option>
                  <option value="60">60 min</option>
                  <option value="90">90 min</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="inline-flex items-center text-[11px] font-semibold text-schedule-purple uppercase tracking-widest px-3 py-1 rounded-full bg-white/40">
                  Mode
                </label>
                <select
                  value={form.mode}
                  onChange={e => setForm({ ...form, mode: e.target.value })}
                  className="w-full h-12 px-4 rounded-2xl bg-white text-[#2E2A36] border border-white/40 outline-none text-sm cursor-pointer appearance-none focus:border-schedule-pink focus:ring-2 focus:ring-schedule-pink/40"
                >
                  <option value="both">Both</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
              </div>

              <button
                disabled={submitting}
                className="h-12 bg-schedule-purple text-white rounded-2xl font-bold shadow-lg shadow-schedule-purple/40 hover:bg-[#24124b] transition-all disabled:opacity-60"
              >
                {submitting ? "..." : "Generate"}
              </button>
            </div>
          </form>
        </section>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center bg-white/10 backdrop-blur-xl p-2 rounded-full border border-white/20 shadow-[0_12px_40px_rgba(15,23,42,0.55)]">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full w-full sm:w-auto border border-white/60">
            <Calendar size={14} className="text-schedule-pink" />
            <input
              type="date"
              value={filter.date}
              onChange={e => updateFilter("date", e.target.value)}
              className="bg-transparent text-xs font-semibold text-schedule-purple outline-none"
            />
          </div>
          <div className="flex flex-1 gap-1">
            {["upcoming", "past"].map(t => (
              <button
                key={t}
                onClick={() => updateFilter("timeline", t)}
                className={`flex-1 sm:flex-none px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter.timeline === t
                    ? "bg-schedule-purple text-white shadow-md shadow-schedule-purple/50"
                    : "bg-white/70 text-schedule-purple/80"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {["all", "online", "offline"].map(t => (
              <button
                key={t}
                onClick={() => updateFilter("type", t)}
                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase transition-all ${
                  filter.type === t
                    ? "bg-schedule-pink text-white shadow-md shadow-schedule-pink/40"
                    : "bg-white/70 text-schedule-purple/80"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Slots table card (glassmorphism) */}
        <div className="bg-white/15 backdrop-blur-xl border border-white/25 rounded-glass overflow-hidden shadow-[0_22px_60px_rgba(15,23,42,0.55)]">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white/10 border-b border-white/20 text-left">
                  <th className="px-6 py-5 w-10">
                    <button onClick={toggleSelectAll} className="text-white/40 hover:text-white transition-colors">
                      {selectedSlots.length > 0 ? <CheckSquare size={20} /> : <Square size={20} />}
                    </button>
                  </th>
                  <th className="px-6 py-5 text-[10px] font-bold text-white/80 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-white/80 uppercase tracking-widest">Time</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-white/80 uppercase tracking-widest">Mode</th>
                  <th className="px-6 py-5 text-[10px] font-bold text-white/80 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-5 text-right text-[10px] font-bold text-white/80 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-100/50">
                <AnimatePresence mode="popLayout">
                  {slots.map((s) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={s._id}
                      className={`transition-colors ${
                        selectedSlots.includes(s._id)
                          ? "bg-white/15 hover:bg-white/20"
                          : "hover:bg-white/10"
                      }`}
                    >
                      <td className="px-6 py-4">
                        {!s.isBooked && (
                          <button
                            onClick={() => toggleSelect(s._id)}
                            className={`rounded-full p-1.5 border transition-colors ${
                              selectedSlots.includes(s._id)
                                ? "bg-schedule-pink/10 border-schedule-pink text-schedule-pink"
                                : "border-white/30 text-white/50 hover:text-white"
                            }`}
                          >
                            {selectedSlots.includes(s._id) ? <CheckSquare size={18} /> : <Square size={18} />}
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white">
                            {new Date(s.date).toLocaleDateString(undefined, { day: "2-digit", month: "short" })}
                          </span>
                          <span className="text-[10px] text-white/70 font-bold uppercase">
                            {new Date(s.date).toLocaleDateString(undefined, { weekday: "short" })}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-white">
                        {s.startTime} — {s.endTime}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          {s.sessionType === "online" ? (
                            <Globe size={14} className="text-sky-300" />
                          ) : (
                            <MapPin size={14} className="text-schedule-pink" />
                          )}
                          <span className="text-[10px] font-black uppercase text-white/80">
                            {s.sessionType}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                            s.isBooked
                              ? "bg-schedule-purple text-white"
                              : "bg-schedule-softPink text-schedule-pink"
                          }`}
                        >
                          {s.isBooked ? "Booked" : "Open"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {!s.isBooked && (
                          <button
                            onClick={() => handleDelete(s._id)}
                            className="inline-flex items-center justify-center p-2 text-schedule-pink hover:text-white hover:bg-schedule-pink rounded-full transition-all shadow-sm shadow-schedule-pink/40"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}