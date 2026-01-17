"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Info, Loader2, Calendar as CalendarIcon, Clock, ShieldCheck, CheckCircle2, QrCode, Banknote, Copy, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";

const BlobBackground = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none bg-purple-100">
    <div className="absolute top-[-50%] left-[-20%] w-[120%] h-[120%] rounded-full bg-purple-500/50 blur-3xl mix-blend-multiply" />
    <div className="absolute top-[-50%] right-[-20%] w-[120%] h-[120%] rounded-full bg-pink-500/50 blur-3xl mix-blend-multiply" />
    <div className="absolute bottom-[-50%] left-[-20%] w-[120%] h-[120%] rounded-full bg-yellow-400/50 blur-3xl mix-blend-multiply" />
  </div>
);

export default function BookingForm() {
  const router = useRouter();
  const today = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    sessionType: "online",
    preferredDate: today,
    slotId: "",
    isFirstSession: true,
    message: "",
    paymentMethod: "upi",
    paymentReference: "",
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
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Auto-set payment method if online session is selected
      if (name === "sessionType" && value === "online") {
        newData.paymentMethod = "upi";
      }

      return newData;
    });
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
        className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/15 shadow-2xl overflow-hidden"
      >
        {/* Progress Header */}
        <div className="p-8 relative overflow-hidden group bg-[#eeb9ff]">
          <div className="relative z-10">
            <h2 className="text-3xl font-light mb-2 flex items-center gap-3 text-[#3F2965]">
              <CheckCircle2 className="text-[#3F2965]" /> Reserve a Session
            </h2>
            <p className="text-[#3F2965]/80 text-sm font-redhat">Choose your preferred mode and time to begin.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">

          {/* Step 1: Session Type */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-[#eeb9ff] uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={16} /> 1. Select Mode
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {["online", "offline"].map((type) => (
                <label key={type} className={`relative p-5 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 capitalize group cursor-pointer ${formData.sessionType === type ? "border-[#eeb9ff] bg-white/10 shadow-lg" : "border-white/5 hover:border-white/20 bg-white/5"}`}>
                  <input type="radio" name="sessionType" value={type} checked={formData.sessionType === type} onChange={handleChange} className="sr-only" />
                  <span className={`text-lg font-medium ${formData.sessionType === type ? "text-white" : "text-white/60"}`}>{type}</span>
                  {formData.sessionType === type && (
                    <motion.div layoutId="activeType" className="absolute top-3 right-3 bg-[#eeb9ff] text-[#3F2965] p-1 rounded-full shadow-lg">
                      <CheckCircle2 size={16} />
                    </motion.div>
                  )}
                </label>
              ))}
            </div>

            <div className="mt-4 p-4 rounded-xl bg-[#eeb9ff]/10 border border-[#eeb9ff]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#eeb9ff] flex items-center justify-center text-[#3F2965]">
                  <Banknote size={20} />
                </div>
                <div>
                  <p className="text-[#eeb9ff] text-xs font-bold uppercase tracking-widest">Total Price</p>
                  <p className="text-white/60 text-xs text-light">Inclusive of all charges</p>
                </div>
              </div>
              <div className="text-3xl font-serif text-white">
                ₹749
              </div>
            </div>
          </section>

          {/* Step 2: Date Selection */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-[#eeb9ff] uppercase tracking-widest flex items-center gap-2">
              <CalendarIcon size={16} /> 2. Choose Date
            </h3>
            <input
              type="date"
              name="preferredDate"
              required
              value={formData.preferredDate}
              onChange={handleChange}
              min={today}
              className="w-full px-6 py-4 rounded-2xl border border-white/10 focus:outline-none focus:border-[#eeb9ff] focus:ring-1 focus:ring-[#eeb9ff] bg-white/5 text-lg font-medium text-white appearance-none"
            />
          </section>

          {/* Step 3: Time Slot Grid */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-[#eeb9ff] uppercase tracking-widest flex items-center gap-2">
              <Clock size={16} /> 3. Available Times
            </h3>
            {availableSlots.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableSlots.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSlotSelect(s.id)}
                    className={`p-3 rounded-xl border text-sm font-serif italic transition-all relative overflow-hidden ${formData.slotId === s.id ? "text-[#3F2965] border-transparent shadow-lg" : "bg-white/5 border-white/10 text-white/80 hover:border-[#eeb9ff] hover:bg-white/10"}`}
                  >
                    {formData.slotId === s.id && <div className="absolute inset-0 bg-[#eeb9ff]" />}
                    <span className="relative z-10">{s.startTime}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 text-[#eeb9ff] relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <span className="relative z-10">No slots available for this date.</span>
              </div>
            )}
          </section>

          {/* Step 4: Payment Method */}
          <section className="space-y-6">
            <h3 className="text-sm font-bold text-[#eeb9ff] uppercase tracking-widest flex items-center gap-2">
              <Wallet size={16} /> 4. Payment Method (₹749)
            </h3>

            {formData.sessionType === "online" ? (
              <div className="p-6 rounded-2xl bg-[#eeb9ff]/10 border border-[#eeb9ff]/30 space-y-4">
                <div className="flex items-center gap-3 text-[#eeb9ff]">
                  <Info size={20} />
                  <p className="font-medium text-sm">You have booked session online. Payment must be completed online.</p>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-12 h-12 rounded-full bg-[#eeb9ff] flex items-center justify-center text-[#3F2965]">
                    <QrCode size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Online (UPI)</h4>
                    <p className="text-white/60 text-xs">Secure digital payment</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: "upi", label: "Online (UPI)", icon: QrCode },
                  { id: "cash", label: "Offline (Cash)", icon: Banknote }
                ].map((method) => (
                  <label key={method.id} className={`relative p-5 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 capitalize group cursor-pointer ${formData.paymentMethod === method.id ? "border-[#eeb9ff] bg-white/10 shadow-lg" : "border-white/5 hover:border-white/20 bg-white/5"}`}>
                    <input type="radio" name="paymentMethod" value={method.id} checked={formData.paymentMethod === method.id} onChange={handleChange} className="sr-only" />
                    <method.icon size={24} className={formData.paymentMethod === method.id ? "text-[#eeb9ff]" : "text-white/40 group-hover:text-white/60"} />
                    <span className={`text-sm font-medium ${formData.paymentMethod === method.id ? "text-white" : "text-white/60"}`}>{method.label}</span>
                  </label>
                ))}
              </div>
            )}

            <div className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <Info className="w-5 h-5 text-[#eeb9ff] shrink-0 mt-0.5" />
              <p className="text-sm text-white/70 font-light leading-relaxed">
                You will receive the <span className="text-[#eeb9ff] font-medium">Payment Scanner & UPI ID</span> after your appointment is approved. You can check this in your <span className="font-medium text-white">Appointment Status</span> page or the email we sent you.
              </p>
            </div>


          </section>

          {/* Additional Notes */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold text-[#eeb9ff] uppercase tracking-widest">Additional Context</h3>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              placeholder="What would you like to focus on?"
              className="w-full px-6 py-4 rounded-2xl border border-white/10 focus:ring-2 focus:ring-[#eeb9ff]/20 outline-none bg-white/5 text-white placeholder-white/40 resize-none transition-all"
            />
          </section>

          {/* Policy & Submit */}
          <div className="pt-4 space-y-6">
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative flex items-center">
                <input type="checkbox" required className="peer h-6 w-6 rounded-md border-white/20 bg-white/5 text-[#eeb9ff] focus:ring-[#eeb9ff] cursor-pointer" />
              </div>
              <span className="text-xs text-white/60 leading-relaxed font-light">
                I agree to the <a href="/policies/confidentiality" className="text-[#eeb9ff] font-bold hover:underline">Confidentiality Policy</a>.
                I understand this is an educational session, not medical treatment.
              </span>
            </label>

            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative flex items-center">
                <input type="checkbox" required className="peer h-6 w-6 rounded-md border-white/20 bg-white/5 text-[#eeb9ff] focus:ring-[#eeb9ff] cursor-pointer" />
              </div>
              <span className="text-xs text-white/60 leading-relaxed font-light">
                I agree to the <a href="/policies/non-refund" className="text-[#eeb9ff] font-bold hover:underline">Non-Refund Policy</a>.
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
              className="w-full py-5 rounded-full bg-[#eeb9ff] text-[#3F2965] font-serif font-bold text-lg shadow-xl shadow-[#eeb9ff]/10 hover:shadow-[#eeb9ff]/20 hover:scale-[1.02] transition-all disabled:opacity-30 disabled:grayscale active:scale-95 flex items-center justify-center gap-3 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                {isSubmitting ? <><Loader2 className="animate-spin" /> Processing...</> : "Confirm Request"}
              </span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}