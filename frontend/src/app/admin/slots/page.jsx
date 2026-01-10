"use client";
import { useEffect, useState } from "react";
import {
    Calendar as CalendarIcon, Clock, Globe, MapPin,
    ChevronLeft, ChevronRight, X, Plus, LayoutGrid, List as ListIcon,
    Search, Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "../../../config/api";

export default function AdminSlotsPage() {
    const [loading, setLoading] = useState(true);
    const [slots, setSlots] = useState([]);

    // View States
    const [viewMode, setViewMode] = useState("calendar");
    const [currentDate, setCurrentDate] = useState(new Date());

    // Modal States
    const [selectedDate, setSelectedDate] = useState(null);
    const [showGenerateModal, setShowGenerateModal] = useState(false);

    // Filter State
    const [filter, setFilter] = useState({ date: "", type: "all", timeline: "upcoming" });

    // Form States
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        startDate: "", endDate: "", startTime: "10:00", endTime: "17:00",
        mode: "both", duration: "60"
    });

    // --- Fetching Logic ---
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
                const today = new Date(); today.setHours(0, 0, 0, 0);
                list = list.filter(s => {
                    const slotDate = new Date(s.date);
                    return timeline === "upcoming" ? slotDate >= today : slotDate < today;
                });
            }

            setSlots(list.sort((a, b) => new Date(a.date) - new Date(b.date) || a.startTime.localeCompare(b.startTime)));
        } catch (e) { console.error(e); } finally { setLoading(false); }
    };

    useEffect(() => { fetchSlots(); }, []);

    const updateFilter = (key, val) => {
        const newFilter = { ...filter, [key]: val };
        setFilter(newFilter);
        fetchSlots(newFilter.date, newFilter.type, newFilter.timeline);
    };

    // --- FIXED GENERATE LOGIC ---
    const handleGenerate = async (e) => {
        e.preventDefault();

        // 1. Frontend Validation
        if (!form.startDate || !form.endDate) {
            alert("Please select both start and end dates.");
            return;
        }
        if (new Date(form.startDate) > new Date(form.endDate)) {
            alert("Start date cannot be after the end date.");
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch(`${API_BASE_URL}/slots/generate-week`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
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

            // 2. Parse response
            const data = await res.json();

            // 3. Check for Server Errors (Status 400/500)
            if (!res.ok) {
                throw new Error(data.message || data.error || "Failed to generate slots");
            }

            // Success Path
            await fetchSlots(); // Wait for fetch to finish
            setShowGenerateModal(false);
            alert(data.message || `Successfully generated slots from ${form.startDate} to ${form.endDate}`);

        } catch (err) {
            console.error("Generation Error:", err);
            alert(err.message); // Alert the actual error message
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this time slot?")) return;
        try {
            const res = await fetch(`${API_BASE_URL}/admin/slots/${id}`, { method: "DELETE", credentials: "include" });
            if (res.ok) setSlots(prev => prev.filter(s => s._id !== id));
        } catch (e) { console.error(e); }
    };

    // --- Calendar Helpers ---
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
    const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    const isSameDay = (d1, d2) => {
        if (!d1 || !d2) return false;
        const d = new Date(d1);
        return d.getDate() === d2.getDate() && d.getMonth() === d2.getMonth() && d.getFullYear() === d2.getFullYear();
    };

    // --- Component: Slot Card ---
    const SlotCard = ({ s, isModal = false }) => (
        <div className={`relative bg-white rounded-2xl p-4 md:p-5 border border-slate-100 ${!isModal && "shadow-sm hover:shadow-md"} transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 animate-in slide-in-from-bottom-2`}>

            {/* 1. Date Box */}
            {!isModal && (
                <div className="w-full sm:w-20 h-14 sm:h-20 bg-slate-50 rounded-xl border border-slate-100 flex sm:flex-col flex-row items-center justify-center gap-2 sm:gap-0 flex-shrink-0">
                    <span className="text-xs font-bold text-rose-500 uppercase tracking-wide">{new Date(s.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                    <span className="text-xl sm:text-3xl font-bold text-slate-800 leading-none">{new Date(s.date).getDate()}</span>
                </div>
            )}

            {/* 2. Middle Section: Time | Status | Type */}
            <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center gap-3 lg:gap-8">

                {/* Time */}
                <div className="flex items-center gap-2 md:gap-3 text-slate-800 font-bold text-lg md:text-xl min-w-fit">
                    <Clock size={18} className="text-indigo-500 shrink-0" />
                    <span>{s.startTime} - {s.endTime}</span>
                </div>

                {/* Badges Container */}
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    {/* Status Badge */}
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider border flex items-center gap-1.5 ${s.isBooked ? "bg-slate-100 text-slate-500 border-slate-200" : "bg-emerald-50 text-emerald-700 border-emerald-100"
                        }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${s.isBooked ? "bg-slate-400" : "bg-emerald-500"}`}></div>
                        {s.isBooked ? "Booked" : "Open"}
                    </span>

                    {/* Mode Badge */}
                    <span className="px-2.5 py-1 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider border bg-white border-slate-200 text-slate-600 flex items-center gap-1.5">
                        {s.sessionType === 'online' ? <Globe size={12} className="text-sky-500" /> : <MapPin size={12} className="text-rose-500" />}
                        {s.sessionType}
                    </span>
                </div>
            </div>

            {/* 3. Delete Button */}
            {!s.isBooked && (
                <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(s._id); }}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg font-bold text-xs bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 border border-rose-100 transition-colors flex items-center justify-center gap-2"
                >
                    <Trash2 size={14} /> <span className="sm:hidden">Delete Slot</span>
                </button>
            )}
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-700 pb-12 relative">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Schedule</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage slots & availability.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <button
                        onClick={() => setShowGenerateModal(true)}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-sm hover:shadow-md transition-all text-sm w-full sm:w-auto"
                    >
                        <Plus size={18} /> Generate
                    </button>

                    <div className="bg-white p-1 rounded-lg border border-slate-200 flex items-center shadow-sm w-full sm:w-auto">
                        <button onClick={() => setViewMode("calendar")} className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${viewMode === 'calendar' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}>
                            <LayoutGrid size={16} />
                        </button>
                        <button onClick={() => setViewMode("list")} className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${viewMode === 'list' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}>
                            <ListIcon size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ==================== CALENDAR VIEW ==================== */}
            {viewMode === 'calendar' && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                    <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-100 bg-slate-50/50">
                        <button onClick={handlePrevMonth} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all border border-transparent hover:border-slate-200"><ChevronLeft size={20} className="text-slate-600" /></button>
                        <h2 className="text-lg md:text-xl font-bold text-slate-800">{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
                        <button onClick={handleNextMonth} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all border border-transparent hover:border-slate-200"><ChevronRight size={20} className="text-slate-600" /></button>
                    </div>

                    <div className="p-2 md:p-6">
                        <div className="grid grid-cols-7 mb-2 md:mb-4">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                                <div key={i} className="text-center text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">{d}</div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1 md:gap-2">
                            {/* Empty slots for start of month */}
                            {Array.from({ length: getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth()) }).map((_, i) => (
                                <div key={`empty-${i}`} className="h-20 md:h-28 rounded-xl bg-slate-50/30 border border-transparent"></div>
                            ))}

                            {/* Days */}
                            {Array.from({ length: getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()) }).map((_, i) => {
                                const day = i + 1;
                                const thisDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                const isToday = new Date().toDateString() === thisDate.toDateString();
                                const daySlots = slots.filter(s => isSameDay(s.date, thisDate));
                                const availableCount = daySlots.filter(s => !s.isBooked).length;
                                const bookedCount = daySlots.filter(s => s.isBooked).length;

                                return (
                                    <div
                                        key={day}
                                        onClick={() => setSelectedDate(thisDate)}
                                        className={`h-20 md:h-28 p-1 md:p-2 rounded-lg md:rounded-xl border transition-all relative cursor-pointer group flex flex-col items-center md:items-stretch ${isToday ? 'bg-indigo-50/30 border-indigo-200 shadow-sm ring-1 ring-indigo-50' :
                                                'bg-white border-slate-100 hover:border-indigo-300 hover:shadow-md'
                                            }`}
                                    >
                                        <span className={`text-[10px] md:text-sm font-bold w-5 h-5 md:w-7 md:h-7 flex items-center justify-center rounded-full mb-1 ${isToday ? 'bg-indigo-600 text-white' : 'text-slate-400 group-hover:text-slate-800'}`}>
                                            {day}
                                        </span>

                                        {/* Indicators */}
                                        {daySlots.length > 0 ? (
                                            <div className="w-full space-y-1">
                                                {/* Desktop Pills */}
                                                <div className="hidden md:block space-y-1">
                                                    {bookedCount > 0 && <div className="text-[9px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 truncate text-center">{bookedCount} Booked</div>}
                                                    {availableCount > 0 && <div className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 truncate text-center">{availableCount} Free</div>}
                                                </div>
                                                {/* Mobile Dots */}
                                                <div className="md:hidden flex flex-wrap justify-center gap-0.5">
                                                    {daySlots.slice(0, 4).map((s, idx) => (
                                                        <div key={idx} className={`w-1 h-1 rounded-full ${s.isBooked ? 'bg-slate-300' : 'bg-emerald-400'}`} />
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Plus size={16} className="text-slate-300" /></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* ==================== LIST VIEW (WITH FILTERS) ==================== */}
            {viewMode === 'list' && (
                <div className="space-y-4">
                    {/* FILTERS BAR */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3 bg-white p-3 md:p-4 rounded-2xl border border-slate-200 shadow-sm">

                        <div className="flex items-center gap-3 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 w-full lg:w-auto">
                            <CalendarIcon size={16} className="text-slate-400" />
                            <input
                                type="date"
                                value={filter.date}
                                onChange={e => updateFilter("date", e.target.value)}
                                className="bg-transparent outline-none text-sm font-bold text-slate-700 w-full"
                            />
                            {filter.date && <button onClick={() => updateFilter("date", "")}><X size={14} className="text-slate-400 hover:text-rose-500" /></button>}
                        </div>

                        <div className="h-8 w-px bg-slate-200 hidden lg:block"></div>

                        <div className="flex bg-slate-100 p-1 rounded-xl w-full lg:w-auto overflow-x-auto">
                            {["upcoming", "past"].map(t => (
                                <button
                                    key={t}
                                    onClick={() => updateFilter("timeline", t)}
                                    className={`flex-1 lg:flex-none px-4 md:px-6 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${filter.timeline === t ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>

                        <div className="h-8 w-px bg-slate-200 hidden lg:block"></div>

                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto">
                            {["all", "online", "offline"].map(t => (
                                <button
                                    key={t}
                                    onClick={() => updateFilter("type", t)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase border transition-all whitespace-nowrap ${filter.type === t ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                                        }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* List Content */}
                    {loading ? (
                        <div className="text-center py-20"><div className="w-8 h-8 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin mx-auto" /></div>
                    ) : slots.length === 0 ? (
                        <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-slate-300">
                            <Search size={32} className="mx-auto text-slate-300 mb-3" />
                            <p className="text-slate-500 font-medium text-sm">No slots found.</p>
                        </div>
                    ) : (
                        slots.map(s => <SlotCard key={s._id} s={s} />)
                    )}
                </div>
            )}

            {/* ==================== MODALS ==================== */}
            <AnimatePresence>
                {/* Day View Modal */}
                {selectedDate && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedDate(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
                        <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} onClick={(e) => e.stopPropagation()} className="bg-slate-50 rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden">
                            <div className="p-4 md:p-5 bg-white border-b border-slate-200 flex justify-between items-center">
                                <h3 className="text-lg md:text-xl font-bold text-slate-800">{selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</h3>
                                <button onClick={() => setSelectedDate(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500"><X size={20} /></button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-3 md:p-5 space-y-3 custom-scrollbar">
                                {slots.filter(s => isSameDay(s.date, selectedDate)).length > 0 ? (
                                    slots.filter(s => isSameDay(s.date, selectedDate)).map(s => <SlotCard key={s._id} s={s} isModal={true} />)
                                ) : (
                                    <div className="text-center py-10 text-slate-400">
                                        <p className="text-sm">No slots for this day.</p>
                                        <button onClick={() => { setSelectedDate(null); setShowGenerateModal(true); }} className="text-indigo-600 font-bold mt-2 text-sm hover:underline">Generate Slots?</button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Generate Modal */}
                {showGenerateModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowGenerateModal(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 md:p-8 overflow-y-auto max-h-[90vh]">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl md:text-2xl font-bold text-slate-800">Generate Bulk Slots</h2>
                                <button onClick={() => setShowGenerateModal(false)}><X className="text-slate-400 hover:text-slate-600" /></button>
                            </div>
                            <form onSubmit={handleGenerate} className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="text-xs font-bold text-slate-500 uppercase block mb-1">Start Date</label><input type="date" required value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-medium outline-none focus:ring-2 focus:ring-indigo-500 text-sm" /></div>
                                    <div><label className="text-xs font-bold text-slate-500 uppercase block mb-1">End Date</label><input type="date" required value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-medium outline-none focus:ring-2 focus:ring-indigo-500 text-sm" /></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="text-xs font-bold text-slate-500 uppercase block mb-1">Start Time</label><input type="time" value={form.startTime} onChange={e => setForm({ ...form, startTime: e.target.value })} className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-medium text-sm" /></div>
                                    <div><label className="text-xs font-bold text-slate-500 uppercase block mb-1">End Time</label><input type="time" value={form.endTime} onChange={e => setForm({ ...form, endTime: e.target.value })} className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-medium text-sm" /></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="text-xs font-bold text-slate-500 uppercase block mb-1">Duration</label><select value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-medium text-sm"><option value="30">30 min</option><option value="45">45 min</option><option value="60">60 min</option></select></div>
                                    <div><label className="text-xs font-bold text-slate-500 uppercase block mb-1">Mode</label><select value={form.mode} onChange={e => setForm({ ...form, mode: e.target.value })} className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-200 font-medium text-sm"><option value="both">Both</option><option value="online">Online</option><option value="offline">Offline</option></select></div>
                                </div>
                                <button disabled={submitting} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md text-sm md:text-base">{submitting ? "Generating..." : "Generate Schedule"}</button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}