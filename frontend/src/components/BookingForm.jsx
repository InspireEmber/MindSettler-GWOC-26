"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Info, Loader2, Check } from "lucide-react";
import api from "../services/api";

export default function BookingForm() {
  const router = useRouter();
  const today = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    sessionType: "online",
    preferredDate: today,
    preferredTime: "",
    slotId: "",
    isFirstSession: true,
    message: "",
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (formData.sessionType && formData.preferredDate) {
      const fetchSlots = async () => {
        try {
          const slots = await api.getAvailableSlots({
            sessionType: formData.sessionType,
            date: formData.preferredDate,
          });
          setAvailableSlots(slots);
        } catch (err) {
          console.error("Error fetching slots:", err);
        }
      };
      fetchSlots();
    }
  }, [formData.sessionType, formData.preferredDate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "preferredTime" ? { slotId: value } : {}),
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const { sessionType, preferredDate, preferredTime, slotId, isFirstSession, message } = formData;
      const booking = await api.createBooking({
        sessionType,
        preferredDate,
        preferredTime,
        slotId,
        isFirstSession,
        message,
      });
      router.push(`/appointment-status?id=${booking.id}`);
    } catch (err) {
      setError(err.message || "Failed to create booking.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 md:p-12 rounded-3xl bg-[#F6F4FA] border border-[#3F2965]/10 shadow-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-light text-[#2E2A36] mb-2">Session Booking</h2>
        <p className="text-[#5E5A6B]">Request a 60-minute psycho-education session below.</p>
      </div>

      {formData.isFirstSession && (
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-[#3F2965] to-[#DD1764] text-white flex gap-4 items-start shadow-md">
          <Info className="shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold mb-1">First Session</h3>
            <p className="text-sm opacity-90">Please review our confidentiality policy before proceeding.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="grid grid-cols-2 gap-4">
          {["online", "offline"].map((type) => (
            <label key={type} className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 capitalize ${formData.sessionType === type ? "border-[#3F2965] bg-[#3F2965]/5" : "border-[#3F2965]/10 bg-white hover:border-[#3F2965]/30"}`}>
              <input type="radio" name="sessionType" value={type} checked={formData.sessionType === type} onChange={handleChange} className="sr-only" />
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.sessionType === type ? "border-[#3F2965]" : "border-gray-300"}`}>
                {formData.sessionType === type && <div className="w-2.5 h-2.5 rounded-full bg-[#3F2965]" />}
              </div>
              <span className="font-medium text-[#2E2A36]">{type}</span>
            </label>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="date"
            name="preferredDate"
            required
            value={formData.preferredDate}
            onChange={handleChange}
            min={today}
            className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none bg-white"
          />

          <select
            name="preferredTime"
            required
            value={formData.preferredTime}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none bg-white"
          >
            <option value="">Select Time Slot</option>
            {availableSlots.map((s) => {
              const slotDate = new Date(s.date);
              const dateLabel = slotDate.toLocaleDateString('en-US', {
                weekday: 'short', month: 'short', day: 'numeric',
              });
              const label = `${dateLabel} — ${s.startTime} – ${s.endTime}`;
              return (
                <option key={s.id} value={s.id}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>

        <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Additional notes..."
          className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none bg-white resize-none" />

        <label className="flex items-start gap-3 cursor-pointer group">
          <input type="checkbox" name="confidentiality" required className="mt-1 w-5 h-5 rounded border-[#3F2965]/30 text-[#3F2965] focus:ring-[#3F2965]" />
          <span className="text-sm text-[#5E5A6B] group-hover:text-[#2E2A36] transition-colors">
            I agree to the <a href="/policies/confidentiality" className="text-[#3F2965] font-semibold hover:underline" target="_blank">Confidentiality Policy</a>.
          </span>
        </label>

        {error && <div className="p-4 rounded-xl bg-red-50 text-red-800 text-sm border border-red-100">{error}</div>}

        <button type="submit" disabled={isSubmitting}
          className="w-full py-4 rounded-full bg-[#3F2965] text-white font-medium text-lg hover:shadow-xl transition-all disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2">
          {isSubmitting ? <><Loader2 className="animate-spin" /> Submitting...</> : "Confirm Booking Request"}
        </button>
      </form>
    </div>
  );
}