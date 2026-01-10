"use client";
import { useEffect, useState } from "react";
import {
    CheckCircle2, CreditCard, Clock,
    Mail, AlertCircle, MapPin, Video,
    ChevronLeft, ChevronRight, LayoutGrid, List as ListIcon, X, Calendar as CalendarIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "../../../config/api";

export default function AdminAppointmentsPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [appointments, setAppointments] = useState([]);

    // View States
    const [viewMode, setViewMode] = useState("calendar");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentDate, setCurrentDate] = useState(new Date());

    // Interaction States
    const [actionLoading, setActionLoading] = useState({});
    const [actionError, setActionError] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);

    async function fetchAppointments() {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/admin/appointments`, { credentials: "include" });
            if (!res.ok) throw new Error("Failed to load appointments");
            const data = await res.json();
            setAppointments(data.data || []);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchAppointments(); }, []);

    // --- Actions ---
    async function handleAction(id, endpoint, body = {}, type) {
        setActionError(prev => ({ ...prev, [id]: "" }));
        setActionLoading(prev => ({ ...prev, [id]: type }));
        try {
            const res = await fetch(`${API_BASE_URL}/admin/appointments/${id}/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || `Failed to ${type}`);
            await fetchAppointments();
        } catch (err) {
            setActionError(prev => ({ ...prev, [id]: err.message }));
        } finally {
            setActionLoading(prev => ({ ...prev, [id]: null }));
        }
    }

    const handleApprove = (appt) => handleAction(appt._id, "approve", {}, "approve");
    const handleReject = (appt) => {
        const reason = window.prompt("Enter rejection reason:");
        if (reason) handleAction(appt._id, "reject", { reason: reason.trim() }, "reject");
    };
    const handleMarkPaid = (appt) => {
        const method = window.prompt('Enter method ("upi" or "cash"):', "upi");
        if (method) {
            const ref = window.prompt("Payment reference (optional):", "");
            handleAction(appt._id, "payment", {
                paymentStatus: "paid",
                paymentMethod: method.toLowerCase(),
                paymentReference: ref
            }, "payment");
        }
    };

    // --- Date Logic ---
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const isSameDay = (dateString, dateObj) => {
        if (!dateString || !dateObj) return false;
        const d = new Date(dateString);
        return d.getDate() === dateObj.getDate() &&
            d.getMonth() === dateObj.getMonth() &&
            d.getFullYear() === dateObj.getFullYear();
    };

    // --- Filtering ---
    const filteredAppointments = appointments.filter(a => statusFilter === "all" || a.status === statusFilter);

    // --- Components ---
    const AppointmentCard = ({ a, isModal = false }) => {
        const dateObj = new Date(a.slot?.date);
        const dayVal = dateObj.getDate();
        const monthVal = dateObj.toLocaleDateString('en-US', { month: 'short' });
        const weekVal = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

        return (
            <div className={`relative bg-white rounded-2xl p-4 md:p-5 border border-slate-100 ${!isModal && "shadow-sm hover:shadow-lg"} transition-all duration-200`}>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">

                    {/* Date Box */}
                    <div className="flex-shrink-0 w-full sm:w-20 h-14 sm:h-20 bg-slate-50 rounded-xl border border-slate-100 flex sm:flex-col flex-row items-center justify-center sm:justify-center gap-2 sm:gap-0 shadow-sm">
                        <span className="text-xs font-bold text-rose-500 uppercase">{monthVal}</span>
                        <span className="text-xl sm:text-3xl font-bold text-slate-800 leading-none sm:my-1">{dayVal}</span>
                        <span className="text-[10px] text-slate-400 font-medium uppercase">{weekVal}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

                        {/* Info */}
                        <div className="md:col-span-4 flex flex-col gap-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h3 className="text-lg md:text-xl font-bold text-slate-900 truncate">{a.user?.name || "Guest User"}</h3>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shrink-0 ${a.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                        a.status === 'rejected' ? 'bg-red-50 text-red-700 border-red-100' :
                                            'bg-amber-50 text-amber-700 border-amber-100'
                                    }`}>
                                    {a.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium break-all">
                                <Mail size={14} className="text-slate-400 shrink-0" /> {a.user?.email}
                            </div>
                        </div>

                        {/* Timing & Type */}
                        <div className="md:col-span-5 flex md:justify-center w-full">
                            <div className="flex flex-wrap sm:flex-nowrap items-center sm:justify-center gap-x-5 gap-y-2 bg-slate-50/80 px-4 py-3 rounded-xl border border-slate-100 w-full sm:w-auto">
                                <div className="flex items-center gap-2">
                                    <Clock size={18} className="text-indigo-500 shrink-0" />
                                    <span className="text-sm font-bold text-slate-700 whitespace-nowrap">
                                        {a.slot?.startTime} - {a.slot?.endTime}
                                    </span>
                                </div>
                                <div className="hidden sm:block w-px h-5 bg-slate-300"></div>
                                <div className="flex items-center gap-2">
                                    {a.sessionType === 'online' ? <Video size={18} className="text-orange-500 shrink-0" /> : <MapPin size={18} className="text-orange-500 shrink-0" />}
                                    <span className="text-sm font-semibold text-slate-600 capitalize whitespace-nowrap">{a.sessionType}</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="md:col-span-3 flex flex-col sm:items-end gap-3 w-full">
                            {(a.status === "pending" || (a.status === "confirmed" && a.paymentStatus !== "paid")) && (
                                <div className="flex flex-row sm:flex-row items-center gap-2 w-full sm:justify-end">
                                    {a.status === "pending" && (
                                        <>
                                            <button onClick={(e) => { e.stopPropagation(); handleReject(a); }} disabled={actionLoading[a._id]} className="flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100 transition-colors">
                                                {actionLoading[a._id] === 'reject' ? '...' : 'Reject'}
                                            </button>
                                            <button onClick={(e) => { e.stopPropagation(); handleApprove(a); }} disabled={actionLoading[a._id]} className="flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-sm transition-colors">
                                                {actionLoading[a._id] === 'approve' ? '...' : 'Approve'}
                                            </button>
                                        </>
                                    )}
                                    {a.status === "confirmed" && a.paymentStatus !== "paid" && (
                                        <button onClick={(e) => { e.stopPropagation(); handleMarkPaid(a); }} disabled={actionLoading[a._id]} className="w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center gap-2 transition-colors">
                                            <CreditCard size={14} /> Mark Paid
                                        </button>
                                    )}
                                </div>
                            )}
                            <div className="flex flex-col items-start sm:items-end w-full sm:w-auto">
                                {a.paymentStatus === 'paid' && <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1"><CheckCircle2 size={12} /> PAID</span>}
                                {actionError[a._id] && <span className="text-xs text-red-500 font-medium mt-1 text-center sm:text-right w-full">{actionError[a._id]}</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400 space-y-4">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
            <p className="font-medium animate-pulse text-sm">Loading...</p>
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-700 pb-12 relative">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Appointments</h1>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="bg-white p-1 rounded-lg border border-slate-200 flex items-center shadow-sm w-full sm:w-auto">
                        <button onClick={() => setViewMode("calendar")} className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${viewMode === 'calendar' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}>
                            <LayoutGrid size={16} /> <span className="sm:hidden lg:inline">Calendar</span>
                        </button>
                        <button onClick={() => setViewMode("list")} className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${viewMode === 'list' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}>
                            <ListIcon size={16} /> <span className="sm:hidden lg:inline">List</span>
                        </button>
                    </div>

                    {/* Scrollable Filters */}
                    <div className="flex items-center gap-1 p-1 bg-white/60 backdrop-blur-md border border-white/50 rounded-lg shadow-sm overflow-x-auto no-scrollbar w-full sm:w-auto">
                        {["all", "pending", "confirmed", "rejected"].map((f) => (
                            <button key={f} onClick={() => setStatusFilter(f)} className={`px-4 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-all whitespace-nowrap ${statusFilter === f ? "bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm" : "text-slate-500 hover:bg-white/50 hover:text-slate-900"}`}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {error && <div className="bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-xl flex items-center gap-3 text-sm font-medium"><AlertCircle size={18} /> {error}</div>}

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
                            {/* Fixed Duplicate Key Issue: Using index (i) instead of day letter (d) */}
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                                <div key={i} className="text-center text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">{d}</div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1 md:gap-2">
                            {/* Empty Slots */}
                            {Array.from({ length: getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth()) }).map((_, i) => (
                                <div key={`empty-${i}`} className="h-20 md:h-32 rounded-xl bg-slate-50/30 border border-transparent"></div>
                            ))}

                            {/* Day Cells */}
                            {Array.from({ length: getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()) }).map((_, i) => {
                                const day = i + 1;
                                const thisDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                const isToday = new Date().toDateString() === thisDate.toDateString();
                                const dayAppts = filteredAppointments.filter(a => isSameDay(a.slot?.date, thisDate));

                                return (
                                    <div
                                        key={day}
                                        onClick={() => setSelectedDate(thisDate)}
                                        className={`h-20 md:h-32 p-1 md:p-2 rounded-lg md:rounded-xl border transition-all relative cursor-pointer group flex flex-col items-center md:items-stretch ${isToday ? 'bg-indigo-50/30 border-indigo-200 shadow-sm ring-1 ring-indigo-50' :
                                                'bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-1 w-full">
                                            <span className={`text-[10px] md:text-sm font-bold w-5 h-5 md:w-7 md:h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-indigo-600 text-white' : 'text-slate-400 group-hover:text-slate-800'}`}>
                                                {day}
                                            </span>
                                            {/* Mobile count indicator */}
                                            {dayAppts.length > 0 && (
                                                <div className="md:hidden w-1.5 h-1.5 rounded-full bg-rose-500 mt-1"></div>
                                            )}
                                            {/* Desktop count */}
                                            {dayAppts.length > 0 && (
                                                <span className="hidden md:inline-block text-[10px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md">
                                                    {dayAppts.length}
                                                </span>
                                            )}
                                        </div>

                                        {/* Detailed Pills (Desktop Only) */}
                                        <div className="hidden md:block space-y-1 overflow-hidden">
                                            {dayAppts.slice(0, 3).map(appt => (
                                                <div key={appt._id} className={`p-1 rounded border text-[9px] font-bold truncate ${appt.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                        appt.status === 'rejected' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                                                            'bg-amber-50 text-amber-700 border-amber-100'
                                                    }`}>
                                                    {appt.slot?.startTime}
                                                </div>
                                            ))}
                                            {dayAppts.length > 3 && (
                                                <div className="text-[9px] text-slate-400 font-medium text-center">
                                                    +{dayAppts.length - 3}
                                                </div>
                                            )}
                                        </div>

                                        {/* Simple Dots (Mobile View) */}
                                        <div className="md:hidden flex flex-wrap gap-0.5 justify-center mt-1">
                                            {dayAppts.slice(0, 4).map((_, idx) => (
                                                <div key={idx} className={`w-1 h-1 rounded-full ${idx === 0 ? 'bg-indigo-400' : 'bg-slate-300'}`} />
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* ==================== LIST VIEW ==================== */}
            {viewMode === 'list' && (
                <div className="space-y-4">
                    {filteredAppointments.length === 0 ? (
                        <div className="text-center py-20 bg-white/30 rounded-3xl border border-dashed border-slate-300">
                            <p className="text-slate-500 font-medium">No appointments found.</p>
                        </div>
                    ) : (
                        filteredAppointments.map(a => <AppointmentCard key={a._id} a={a} />)
                    )}
                </div>
            )}

            {/* ==================== DAY VIEW MODAL ==================== */}
            <AnimatePresence>
                {selectedDate && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
                        onClick={() => setSelectedDate(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-slate-50 rounded-2xl shadow-2xl w-full max-w-2xl lg:max-w-4xl max-h-[85vh] flex flex-col overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="p-4 md:p-5 bg-white border-b border-slate-200 flex justify-between items-center z-10">
                                <div>
                                    <h3 className="text-lg md:text-xl font-bold text-slate-800">
                                        {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                    </h3>
                                    <p className="text-xs md:text-sm text-slate-500">
                                        {filteredAppointments.filter(a => isSameDay(a.slot?.date, selectedDate)).length} Appointments
                                    </p>
                                </div>
                                <button onClick={() => setSelectedDate(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Body (Scrollable List) */}
                            <div className="flex-1 overflow-y-auto p-3 md:p-5 space-y-3 md:space-y-4 custom-scrollbar">
                                {filteredAppointments.filter(a => isSameDay(a.slot?.date, selectedDate)).length > 0 ? (
                                    filteredAppointments
                                        .filter(a => isSameDay(a.slot?.date, selectedDate))
                                        .map(a => <AppointmentCard key={a._id} a={a} isModal={true} />)
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-32 md:h-48 text-slate-400">
                                        <CalendarIcon size={40} className="mb-3 opacity-20" />
                                        <p className="text-sm">No appointments scheduled.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}