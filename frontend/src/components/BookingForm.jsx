"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Info, Loader2, Calendar as CalendarIcon, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";

export default function BookingForm() {
  const router = useRouter();
  const today = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    sessionType: "online",
    preferredDate: today,
    slotId: "",
    isFirstSession: true,
    message: "",
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Fetch slots based on date and type
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

  const handleSlotSelect = (id) => {
    setFormData(prev => ({ ...prev, slotId: id }));
    setError("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.slotId) {
      setError("Please select a specific time slot.");
      return;
    }
    setIsSubmitting(true);
    try {
      const booking = await api.createBooking(formData);
      router.push(`/appointment-status?id=${booking.id}`);
    } catch (err) {
      setError(err.message || "Failed to create booking.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-1">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-white border border-[#3F2965]/10 shadow-2xl overflow-hidden"
      >
        {/* Progress Header */}
        <div 
          className="p-8 text-white" 
          style={{ background: "linear-gradient(to right, #8e44ad, #c0392b)" }}
        >
          <h2 className="text-3xl font-light mb-2 flex items-center gap-3">
            <CheckCircle2 className="text-white/80" /> Reserve a Session
          </h2>
          <p className="text-white/80 text-sm">Choose your preferred mode and time to begin.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
          
          {/* Step 1: Session Type */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-[#3F2965] uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={16} /> 1. Select Mode
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {["online", "offline"].map((type) => (
                <label key={type} className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center gap-2 capitalize group ${formData.sessionType === type ? "border-[#3F2965] bg-[#F6F4FA] shadow-md" : "border-gray-100 hover:border-[#3F2965]/30"}`}>
                  <input type="radio" name="sessionType" value={type} checked={formData.sessionType === type} onChange={handleChange} className="sr-only" />
                  <span className={`text-lg font-medium ${formData.sessionType === type ? "text-[#3F2965]" : "text-gray-400"}`}>{type}</span>
                  {formData.sessionType === type && (
                    <motion.div layoutId="activeType" className="absolute -top-2 -right-2 bg-[#DD1764] text-white p-1 rounded-full shadow-lg">
                      <CheckCircle2 size={16} />
                    </motion.div>
                  )}
                </label>
              ))}
            </div>
          </section>

          {/* Step 2: Date Selection */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-[#3F2965] uppercase tracking-widest flex items-center gap-2">
              <CalendarIcon size={16} /> 2. Choose Date
            </h3>
            <input
              type="date"
              name="preferredDate"
              required
              value={formData.preferredDate}
              onChange={handleChange}
              min={today}
              className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#3F2965]/20 outline-none bg-[#FAFAFA] text-lg font-medium text-[#2E2A36]"
            />
          </section>

          {/* Step 3: Time Slot Grid */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-[#3F2965] uppercase tracking-widest flex items-center gap-2">
              <Clock size={16} /> 3. Available Times
            </h3>
            {availableSlots.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableSlots.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSlotSelect(s.id)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${formData.slotId === s.id ? "text-white border-transparent shadow-lg" : "bg-white border-gray-200 text-[#5E5A6B] hover:border-[#3F2965]"}`}
                    style={formData.slotId === s.id ? { background: "linear-gradient(to right, #8e44ad, #c0392b)" } : {}}
                  >
                    {s.startTime}
                  </button>
                ))}
              </div>
            ) : (
              <div 
                className="p-8 text-white"
                style={{ background: "linear-gradient(to right, #8e44ad, #c0392b)" }}
              >
                No slots available for this date.
              </div>
            )}
          </section>

          {/* Additional Notes */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-[#3F2965] uppercase tracking-widest">Additional Context</h3>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              rows={3} 
              placeholder="What would you like to focus on?"
              className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[#3F2965]/20 outline-none bg-[#FAFAFA] resize-none" 
            />
          </section>

          {/* Policy & Submit */}
          <div className="pt-4 space-y-6">
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative flex items-center">
                <input type="checkbox" required className="peer h-6 w-6 rounded-md border-gray-300 text-[#3F2965] focus:ring-[#3F2965]" />
              </div>
              <span className="text-xs text-[#5E5A6B] leading-relaxed">
                I agree to the <a href="/policies/confidentiality" className="text-[#3F2965] font-bold hover:underline">Confidentiality Policy</a>. 
                I understand this is an educational session, not medical treatment.
              </span>
            </label>

            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-2xl bg-red-50 text-red-800 text-sm border border-red-100 flex items-center gap-3">
                  <Info size={18} /> {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit" 
              disabled={isSubmitting || !formData.slotId}
              className="w-full py-5 rounded-full text-white font-bold text-lg hover:shadow-2xl transition-all disabled:opacity-30 disabled:grayscale active:scale-95 flex items-center justify-center gap-3"
              style={{ background: "linear-gradient(to right, #8e44ad, #c0392b)" }}
            >
              {isSubmitting ? <><Loader2 className="animate-spin" /> Processing...</> : "Confirm Request"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}