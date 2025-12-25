"use client";
import { useEffect, useState } from "react";
import { 
  CheckCircle2, XCircle, CreditCard, Clock, 
  User, Mail, Calendar, RefreshCcw, AlertCircle 
} from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminAppointmentsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const [actionLoading, setActionLoading] = useState({});
  const [actionError, setActionError] = useState({});

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
    if (reason === null) return;
    handleAction(appt._id, "reject", { reason: reason.trim() }, "reject");
  };

  const handleMarkPaid = (appt) => {
    const method = window.prompt('Enter method ("upi" or "cash"):', "upi");
    if (!method) return;
    const ref = window.prompt("Payment reference (optional):", "");
    handleAction(appt._id, "payment", { 
        paymentStatus: "paid", 
        paymentMethod: method.toLowerCase(), 
        paymentReference: ref 
    }, "payment");
  };

  const filteredAppointments = appointments.filter(a => filter === "all" || a.status === filter);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-[#5E5A6B] space-y-4">
      <RefreshCcw className="w-8 h-8 animate-spin text-[#3F2965]" />
      <p className="font-medium">Syncing appointments...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#3F2965]/10 pb-6">
        <div>
          <h1 className="text-3xl font-light text-[#2E2A36]">Appointment <span className="font-medium">Requests</span></h1>
          <p className="text-sm text-[#5E5A6B] mt-1">Manage client bookings and payment status.</p>
        </div>
        
        <div className="flex bg-[#F6F4FA] p-1 rounded-xl border border-[#3F2965]/10">
          {["all", "pending", "confirmed", "rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                filter === f ? "bg-white text-[#3F2965] shadow-sm" : "text-[#5E5A6B] hover:text-[#3F2965]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl flex items-center gap-3">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      <div className="grid gap-4">
        {filteredAppointments.map((a) => (
          <div key={a._id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#3F2965]/5 hover:border-[#3F2965]/20 transition-all group">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              {/* Client Info */}
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-[#F6F4FA] flex items-center justify-center text-[#3F2965] shrink-0">
                  <User size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-[#2E2A36] text-lg">{a.user?.name || "Unknown Guest"}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#5E5A6B]">
                    <span className="flex items-center gap-1"><Mail size={14} /> {a.user?.email}</span>
                    <span className="flex items-center gap-1 uppercase font-bold text-[10px] tracking-widest text-[#DD1764]">
                        {a.sessionType} Session
                    </span>
                  </div>
                </div>
              </div>

              {/* Schedule Info */}
              <div className="flex items-center gap-4 px-6 border-x border-[#3F2965]/5 hidden lg:flex">
                <Calendar className="text-[#3F2965] opacity-40" />
                <div>
                  <p className="text-sm font-bold text-[#2E2A36]">
                    {a.slot?.date ? new Date(a.slot.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "No Date"}
                  </p>
                  <p className="text-xs text-[#5E5A6B]">{a.slot?.startTime} - {a.slot?.endTime}</p>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex flex-col items-end gap-2">
                   <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border ${
                            a.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            a.status === 'rejected' ? 'bg-red-50 text-red-600 border-red-100' : 
                            'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>
                            {a.status}
                        </span>
                        {a.paymentStatus === 'paid' && (
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter bg-[#3F2965] text-white">
                                Paid
                            </span>
                        )}
                   </div>
                   {actionError[a._id] && <p className="text-[10px] text-red-500 font-medium">{actionError[a._id]}</p>}
                </div>

                <div className="flex gap-2">
                  {a.status === "pending" && (
                    <>
                      <button onClick={() => handleApprove(a)} disabled={actionLoading[a._id]}
                        className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all">
                        <CheckCircle2 size={20} />
                      </button>
                      <button onClick={() => handleReject(a)} disabled={actionLoading[a._id]}
                        className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all">
                        <XCircle size={20} />
                      </button>
                    </>
                  )}
                  {a.status === "confirmed" && a.paymentStatus !== "paid" && (
                    <button onClick={() => handleMarkPaid(a)} disabled={actionLoading[a._id]}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#3F2965] text-white text-xs font-bold hover:bg-[#2e1d4a] transition-all">
                      <CreditCard size={16} /> Mark Paid
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
      
      {filteredAppointments.length === 0 && (
        <div className="text-center py-20 bg-[#F6F4FA] rounded-[2rem] border border-dashed border-[#3F2965]/20">
          <Clock className="w-12 h-12 text-[#3F2965]/20 mx-auto mb-4" />
          <p className="text-[#5E5A6B]">No appointments found for this filter.</p>
        </div>
      )}
    </div>
  );
}