"use client";

import { useEffect, useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminAppointmentsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState([]);

  // Per-appointment action loading state: "approve" | "reject" | "payment" | null
  const [actionLoading, setActionLoading] = useState({});
  // Per-appointment inline error for admin actions
  const [actionError, setActionError] = useState({});


  async function fetchAppointments() {
  setLoading(true);
  setError("");

  try {
    const res = await fetch(`${API_BASE_URL}/admin/appointments`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to load appointments");
    const data = await res.json();
    setAppointments(data.data || []);
  } catch (e) {
    setError(e.message || "Failed to load appointments");
  } finally {
    setLoading(false);
  }
}
useEffect(() => {
  fetchAppointments();
}, []);

  // useEffect(() => {
  //   let cancelled = false;

  //   async function load() {
  //     try {
  //       const res = await fetch(`${API_BASE_URL}/admin/appointments`, {
  //         // credentials: "include" is REQUIRED so the browser sends the
  //         // Passport session cookie to the backend. Without this, the admin
  //         // endpoints would treat the request as unauthenticated.
  //         credentials: "include",
  //       });
  //       if (!res.ok) throw new Error("Failed to load appointments");
  //       const data = await res.json();
  //       if (cancelled) return;
  //       setAppointments(data.data || []);
  //     } catch (e) {
  //       if (!cancelled) setError(e.message || "Failed to load appointments");
  //     } finally {
  //       if (!cancelled) setLoading(false);
  //     }
  //   }

  //   load();
  //   return () => {
  //     cancelled = true;
  //   };
  // }, []);

  // Helper: update a single appointment in state without refetching the whole list
  // function updateAppointment(id, updatedFields) {
  //   setAppointments((prev) =>
  //     prev.map((appt) =>
  //       appt._id === id ? { ...appt, ...updatedFields } : appt,
  //     ),
  //   );
  // }

  // --- Approve logic: uses POST /api/admin/appointments/:id/approve ---
  async function handleApprove(appt) {
    const id = appt._id;
    setActionError((prev) => ({ ...prev, [id]: "" }));
    setActionLoading((prev) => ({ ...prev, [id]: "approve" }));
    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/appointments/${id}/approve`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // credentials: "include" ensures admin session cookie is sent
          credentials: "include",
          body: JSON.stringify({}), // endpoint doesn't require additional fields
        },
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Failed to approve appointment");
      }
      // data.data is the updated appointment; merge into state
      // updateAppointment(id, data.data || {});
      await fetchAppointments();
    } catch (err) {
      setActionError((prev) => ({
        ...prev,
        [id]: err.message || "Failed to approve appointment",
      }));
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: null }));
    }
  }

  // --- Reject logic: confirm + POST /api/admin/appointments/:id/reject ---
  async function handleReject(appt) {
    const id = appt._id;
    // Simple confirmation using window.confirm as requested
    const confirmed = window.confirm(
      "Are you sure you want to reject this appointment?",
    );
    const reason = window.prompt(
      "Enter reason for rejecting this appointment:"
    );
    if (!confirmed) return;

    setActionError((prev) => ({ ...prev, [id]: "" }));
    setActionLoading((prev) => ({ ...prev, [id]: "reject" }));
    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/appointments/${id}/reject`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          // Reason is optional; we send empty string for now
          // body: JSON.stringify({ reason: "" }),
          body: JSON.stringify({
          reason: reason.trim(), // 🔥 THIS IS THE KEY
          }),

        },
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Failed to reject appointment");
      }
      // updateAppointment(id, data.data || {});
      await fetchAppointments();
    } catch (err) {
      setActionError((prev) => ({
        ...prev,
        [id]: err.message || "Failed to reject appointment",
      }));
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: null }));
    }
  }

  // --- Payment logic: prompt for method/reference + POST /api/admin/appointments/:id/payment ---
  async function handleMarkPaid(appt) {
    const id = appt._id;

    // Ask for payment method (upi | cash)
    const rawMethod = window.prompt(
      'Enter payment method ("upi" or "cash"):',
      "upi",
    );
    if (!rawMethod) return;
    const method = rawMethod.trim().toLowerCase();
    if (method !== "upi" && method !== "cash") {
      window.alert('Payment method must be "upi" or "cash".');
      return;
    }

    // Optional reference
    const reference =
      window.prompt("Payment reference (optional):", "")?.trim() || "";

    setActionError((prev) => ({ ...prev, [id]: "" }));
    setActionLoading((prev) => ({ ...prev, [id]: "payment" }));
    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/appointments/${id}/payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            paymentStatus: "paid",
            paymentMethod: method,
            paymentReference: reference,
          }),
        },
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Failed to mark payment as received");
      }
      // updateAppointment(id, data.data || {});
      await fetchAppointments();
    } catch (err) {
      setActionError((prev) => ({
        ...prev,
        [id]: err.message || "Failed to mark payment as received",
      }));
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: null }));
    }
  }

  if (loading) return <div className="text-[#5E5A6B]">Loading appointments...</div>;
  if (error) return <div className="text-red-600 text-sm">{error}</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-light text-[#2E2A36]">Appointments</h1>
      <div className="space-y-3">
        {appointments.map((a) => {
          const id = a._id;
          const isPending = a.status === "pending";
          const isConfirmed = a.status === "confirmed";
          const isRejected = a.status === "rejected";
          const isPaid = a.paymentStatus === "paid";
          const loadingType = actionLoading[id] || null;
          const inlineError = actionError[id] || "";

          return (
            <div
              key={id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-[#3F2965]/10 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
            >
              <div className="text-xs text-[#5E5A6B]">
                <p className="font-medium text-[#2E2A36]">
                  {a.user?.name} · {a.user?.email}
                </p>
                <p>
                  {a.slot?.date
                    ? new Date(a.slot.date).toLocaleDateString()
                    : "-"}{" "}
                  · {a.slot?.startTime} - {a.slot?.endTime} ({a.sessionType})
                </p>
              </div>

              <div className="flex flex-col items-end gap-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                    {a.status}
                  </span>
                  {isPaid && (
                    <span className="inline-flex px-2 py-1 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                      Paid
                    </span>
                  )}
                </div>

                {/* Action buttons: approve/reject/payment based on status & paymentStatus */}
                <div className="flex flex-wrap justify-end gap-2 mt-1">
                  {isPending && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleApprove(a)}
                        disabled={!!loadingType}
                        className="px-3 py-1 rounded-full border border-emerald-200 text-emerald-700 hover:bg-emerald-50 text-[11px] disabled:opacity-60"
                      >
                        {loadingType === "approve" ? "Approving…" : "Approve"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReject(a)}
                        disabled={!!loadingType}
                        className="px-3 py-1 rounded-full border border-red-200 text-red-700 hover:bg-red-50 text-[11px] disabled:opacity-60"
                      >
                        {loadingType === "reject" ? "Rejecting…" : "Reject"}
                      </button>
                    </>
                  )}

                  {isConfirmed && !isPaid && (
                    <button
                      type="button"
                      onClick={() => handleMarkPaid(a)}
                      disabled={!!loadingType}
                      className="px-3 py-1 rounded-full border border-amber-200 text-amber-700 hover:bg-amber-50 text-[11px] disabled:opacity-60"
                    >
                      {loadingType === "payment" ? "Marking…" : "Mark Paid"}
                    </button>
                  )}

                  {isRejected && (
                    <span className="px-3 py-1 rounded-full border border-slate-200 text-slate-400 text-[11px] cursor-not-allowed">
                      Rejected
                    </span>
                  )}
                </div>

                {inlineError && (
                  <p className="text-[10px] text-red-600 mt-1 text-right">
                    {inlineError}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// "use client";

// import { useEffect, useState } from "react";

// const API_BASE_URL =
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// export default function AdminAppointmentsPage() {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [appointments, setAppointments] = useState([]);

//   useEffect(() => {
//     let cancelled = false;

//     async function load() {
//       try {
//         const res = await fetch(`${API_BASE_URL}/admin/appointments`, {
//           credentials: "include",
//         });
//         if (!res.ok) throw new Error("Failed to load appointments");
//         const data = await res.json();
//         if (cancelled) return;
//         setAppointments(data.data || []);
//       } catch (e) {
//         if (!cancelled) setError(e.message || "Failed to load appointments");
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     }

//     load();
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   if (loading) return <div className="text-[#5E5A6B]">Loading appointments...</div>;
//   if (error) return <div className="text-red-600 text-sm">{error}</div>;

//   return (
//     <div className="space-y-4">
//       <h1 className="text-2xl font-light text-[#2E2A36]">Appointments</h1>
//       <div className="space-y-3">
//         {appointments.map((a) => (
//           <div
//             key={a._id}
//             className="bg-white rounded-2xl p-4 shadow-sm border border-[#3F2965]/10 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
//           >
//             <div className="text-xs text-[#5E5A6B]">
//               <p className="font-medium text-[#2E2A36]">
//                 {a.user?.name}  b7 {a.user?.email}
//               </p>
//               <p>
//                 {a.slot?.date ? new Date(a.slot.date).toLocaleDateString() : "-"}  b7
//                 {a.slot?.startTime} - {a.slot?.endTime} ({a.sessionType})
//               </p>
//             </div>
//             <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
//               {a.status}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }