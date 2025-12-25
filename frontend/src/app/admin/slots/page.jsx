"use client";
import { useEffect, useState } from "react";
import { Calendar, Filter, PlusCircle, Trash2, Clock, CheckCircle, XCircle } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminSlotsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [slots, setSlots] = useState([]);
  
  // Form State
  const [weekStartDate, setWeekStartDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("17:00");
  const [duration, setDuration] = useState(60);
  const [sessionMode, setSessionMode] = useState("both");
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  // Filter State
  const [filterDate, setFilterDate] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [deletingSlotId, setDeletingSlotId] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  async function loadSlots({ date, sessionType } = {}) {
    const params = new URLSearchParams();
    if (date) params.set("date", date);
    if (sessionType && sessionType !== "all") params.set("sessionType", sessionType);

    const res = await fetch(`${API_BASE_URL}/slots?${params.toString()}`, { credentials: "include" });
    if (!res.ok) throw new Error("Failed to load slots");
    const data = await res.json();
    setSlots(data.data || []);
  }

  useEffect(() => {
    loadSlots().catch(e => setError(e.message)).finally(() => setLoading(false));
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const sessionTypes = sessionMode === "both" ? ["online", "offline"] : [sessionMode];
      const res = await fetch(`${API_BASE_URL}/slots/generate-week`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weekStartDate, startTime, endTime, slotDurationMinutes: Number(duration), sessionTypes }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Generation failed");
      setFormMessage(`Generated ${data.createdCount} slots.`);
      loadSlots({ date: filterDate, sessionType: filterType });
    } catch (err) {
      setFormMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSlot = async (slotId, isBooked) => {
    if (isBooked) return setDeleteError("Booked slots cannot be deleted.");
    if (!window.confirm("Delete this slot?")) return;

    setDeletingSlotId(slotId);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/slots/${slotId}`, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error("Delete failed");
      setSlots(prev => prev.filter(s => s._id !== slotId));
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setDeletingSlotId(null);
    }
  };

  if (loading) return <div className="flex items-center gap-2 p-8 text-[#5E5A6B]"><Clock className="animate-spin" /> Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-[#3F2965]/10 pb-4">
        <h1 className="text-3xl font-light text-[#2E2A36]">Slot <span className="font-medium">Management</span></h1>
        <div className="flex items-center gap-2 text-xs font-medium text-[#5E5A6B]">
          <div className="w-3 h-3 rounded-full bg-green-500" /> Available
          <div className="w-3 h-3 rounded-full bg-blue-500" /> Booked
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar: Filters & Generator */}
        <aside className="space-y-6">
          <section className="bg-white rounded-3xl p-6 shadow-sm border border-[#3F2965]/10">
            <h3 className="flex items-center gap-2 text-[#3F2965] font-semibold mb-4"><Filter size={18} /> Filters</h3>
            <div className="space-y-4">
              <input type="date" value={filterDate} onChange={(e) => {setFilterDate(e.target.value); loadSlots({date: e.target.value, sessionType: filterType});}} className="w-full p-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#3F2965]/20" />
              <select value={filterType} onChange={(e) => {setFilterType(e.target.value); loadSlots({date: filterDate, sessionType: e.target.value});}} className="w-full p-3 rounded-xl border border-gray-200 text-sm outline-none bg-white">
                <option value="all">All Modes</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </section>

          <section className="bg-[#3F2965] rounded-3xl p-6 text-white shadow-lg">
            <h3 className="flex items-center gap-2 font-semibold mb-4"><PlusCircle size={18} /> Bulk Generate</h3>
            <form onSubmit={handleGenerate} className="space-y-4 text-sm">
              <input type="date" value={weekStartDate} onChange={e => setWeekStartDate(e.target.value)} className="w-full p-3 rounded-xl text-black" required />
              <div className="grid grid-cols-2 gap-2">
                <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="p-3 rounded-xl text-black" required />
                <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="p-3 rounded-xl text-black" required />
              </div>
              <select value={sessionMode} onChange={e => setSessionMode(e.target.value)} className="w-full p-3 rounded-xl text-black">
                <option value="both">Both Modes</option>
                <option value="online">Online Only</option>
                <option value="offline">Offline Only</option>
              </select>
              <button disabled={submitting} className="w-full py-3 bg-[#DD1764] hover:bg-[#c11457] rounded-xl font-bold transition-all disabled:opacity-50">
                {submitting ? "Processing..." : "Generate Week"}
              </button>
              {formMessage && <p className="text-xs text-white/80 mt-2">{formMessage}</p>}
            </form>
          </section>
        </aside>

        {/* Main: Slot List */}
        <main className="lg:col-span-2">
          {error && <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-4 text-sm">{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slots.map((s) => (
              <div key={s._id} className={`group relative p-5 rounded-3xl border transition-all ${s.isBooked ? 'bg-blue-50/50 border-blue-200' : 'bg-white border-gray-100 hover:shadow-md'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${s.sessionType === 'online' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>
                      {s.sessionType}
                    </span>
                    <h4 className="text-lg font-semibold text-[#2E2A36] mt-2">
                      {s.startTime} - {s.endTime}
                    </h4>
                    <p className="text-xs text-[#5E5A6B]">{new Date(s.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                  </div>
                  {s.isBooked ? <CheckCircle size={20} className="text-blue-500" /> : <div className="w-2 h-2 rounded-full bg-green-500" />}
                </div>
                
                {!s.isBooked && (
                  <button onClick={() => handleDeleteSlot(s._id, s.isBooked)} className="absolute bottom-4 right-4 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100">
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}