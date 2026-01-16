import { useState } from "react";
import { CheckCircle2, Clock, XCircle, Calendar, User, Mail, Phone, Laptop, MapPin, QrCode, Banknote, Info, Copy, Send, Loader2, Check } from "lucide-react";
import Link from "next/link";
import api from "../services/api";

const STATUS_CONFIG = {
  confirmed: { color: "bg-green-500/20 text-green-300 border-green-500/20", icon: <CheckCircle2 size={20} />, bgLight: "bg-green-500/10 border-green-500/20 text-green-200" },
  pending: { color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/20", icon: <Clock size={20} />, bgLight: "bg-yellow-500/10 border-yellow-500/20 text-yellow-200" },
  rejected: { color: "bg-red-500/20 text-red-300 border-red-500/20", icon: <XCircle size={20} />, bgLight: "bg-red-500/10 border-red-500/20 text-red-200" },
  default: { color: "bg-gray-500/20 text-gray-300 border-gray-500/20", icon: null, bgLight: "bg-gray-500/10 border-gray-500/20 text-gray-200" }
};

export default function SessionCard({ booking }) {
  const [paymentRef, setPaymentRef] = useState(booking.paymentReference || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(null); // 'success', 'error', null

  const status = booking?.status?.toLowerCase() || "pending";
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.default;

  const DetailItem = ({ label, value, icon: Icon }) => (
    <div>
      <p className="text-xs font-bold text-[#eeb9ff] uppercase tracking-widest mb-1 flex items-center gap-2 opacity-80 font-redhat">
        {Icon && <Icon size={12} />} {label}
      </p>
      <p className="text-lg text-white capitalize font-serif italic">{value || "Not specified"}</p>
    </div>
  );

  return (
    <div className="p-8 md:p-12">
      {/* Status Badge */}
      <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-10 backdrop-blur-sm ${config.color}`}>
        {config.icon}
        <span className="font-semibold capitalize tracking-wide">{status}</span>
      </div>

      <div className="space-y-10">
        <h2 className="text-3xl font-serif italic text-white/90">Session Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <DetailItem label="Name" value={booking.name} icon={User} />
          <DetailItem label="Email" value={booking.email} icon={Mail} />
          <DetailItem label="Phone" value={booking.phone} icon={Phone} />
          <DetailItem label="Session Type" value={booking.sessionType} icon={booking.sessionType === "online" ? Laptop : MapPin} />
          <DetailItem
            label="Date"
            icon={Calendar}
            value={booking.preferredDate && new Date(booking.preferredDate).toLocaleDateString('en-US', {
              weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
            })}
          />
          <DetailItem label="Time Slot" value={booking.preferredTime} icon={Clock} />
          <DetailItem label="Payment Status" value={booking.paymentStatus || 'pending'} icon={CheckCircle2} />
          <DetailItem label="Payment Method" value={booking.paymentMethod} icon={booking.paymentMethod === 'upi' ? QrCode : Banknote} />
          {booking.paymentReference && <DetailItem label="Ref No." value={booking.paymentReference} icon={CheckCircle2} />}
          {booking.meetingLink && (
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-400 mb-1 flex items-center gap-2 font-redhat">
                <Calendar size={14} /> Meeting Link
              </p>
              <a
                href={booking.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#eeb9ff] underline break-all hover:text-white transition-colors"
              >
                {booking.meetingLink}
              </a>
            </div>
          )}
        </div>

        {booking.isFirstSession && (
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white font-medium flex items-center gap-3 backdrop-blur-md">
            <div className="w-6 h-6 rounded-full bg-[#eeb9ff] text-[#3F2965] flex items-center justify-center text-xs">✓</div>
            First session with MindSettler
          </div>
        )}

        {/* Dynamic Status Messaging */}
        <div className={`p-6 rounded-2xl border backdrop-blur-md ${config.bgLight}`}>
          <div className="flex gap-4">
            <div className="shrink-0 mt-1">{config.icon}</div>
            <div className="flex-1">
              <h3 className="font-serif italic text-lg mb-2 capitalize">
                {status === "pending" ? "Awaiting Review" : `Booking ${status}`}
              </h3>
              <p className="text-sm leading-relaxed mb-4 text-white/90 font-redhat">
                {status === "confirmed" && (
                  <>
                    {booking.sessionType === "online" && (
                      <span className="block mb-2 text-[#eeb9ff] font-bold text-base">
                        You have booked this session online.
                      </span>
                    )}
                    Success! Detailed session information and meeting links will arrive via email shortly.
                  </>
                )}
                {status === "pending" && "Your request is under review. Expect an email confirmation within 24-48 hours."}
                {status === "rejected" && (
                  <>
                    <span className="block mb-3">
                      We couldn't accommodate this slot.
                    </span>

                    {booking.rejectionReason && (
                      <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-sm">
                        <span className="font-semibold text-red-100">Reason:</span>{" "}
                        {booking.rejectionReason}
                      </div>
                    )}
                  </>
                )}
              </p>

              {/* Payment Instructions for Confirmed but Unpaid status */}
              {status === "confirmed" && booking.paymentStatus !== "paid" && (
                <div className="mt-6 space-y-4">
                  {booking.paymentMethod === "upi" ? (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
                      <div className="flex items-center gap-2 text-[#eeb9ff]">
                        <QrCode size={18} />
                        <span className="text-sm font-bold uppercase tracking-wider">UPI Payment Details</span>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="w-32 h-32 bg-white rounded-xl p-2 flex items-center justify-center">
                          <QrCode size={100} className="text-black" />
                        </div>
                        <div className="flex-1 space-y-3 w-full">
                          <div>
                            <p className="text-[10px] text-white/40 uppercase font-bold mb-1">UPI ID</p>
                            <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2 rounded-lg">
                              <code className="text-[#eeb9ff] font-mono text-xs flex-1">mindsettler@upi</code>
                              <button
                                onClick={() => navigator.clipboard.writeText("mindsettler@upi")}
                                className="p-1.5 hover:bg-white/10 rounded text-white/40 hover:text-white transition-colors"
                              >
                                <Copy size={14} />
                              </button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Transaction Reference</p>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                placeholder="Enter Ref No. / Transaction ID"
                                value={paymentRef}
                                onChange={(e) => setPaymentRef(e.target.value)}
                                className="flex-1 bg-white/5 border border-white/10 p-2 rounded-lg text-xs text-white placeholder-white/20 focus:border-[#eeb9ff] outline-none transition-all"
                              />
                              <button
                                onClick={async () => {
                                  if (!paymentRef || isUpdating) return;
                                  setIsUpdating(true);
                                  try {
                                    await api.updateBookingPaymentInfo(booking.id || booking._id, paymentRef);
                                    setUpdateStatus("success");
                                    setTimeout(() => setUpdateStatus(null), 3000);
                                  } catch (err) {
                                    setUpdateStatus("error");
                                    setTimeout(() => setUpdateStatus(null), 3000);
                                  } finally {
                                    setIsUpdating(false);
                                  }
                                }}
                                disabled={isUpdating}
                                className={`p-2 rounded-lg transition-all ${updateStatus === 'success' ? 'bg-green-500 text-white' : 'bg-[#eeb9ff] text-[#3F2965] hover:opacity-90'}`}
                              >
                                {isUpdating ? <Loader2 size={14} className="animate-spin" /> : (updateStatus === 'success' ? <Check size={14} /> : <Send size={14} />)}
                              </button>
                            </div>
                            <p className="text-[10px] text-white/50 italic leading-tight">
                              Shared transaction reference number helps in faster verification.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                        <Banknote size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Cash Payment Selected</p>
                        <p className="text-xs text-white/60">Please bring the exact amount to the session location.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {status === "rejected" && (
                <Link href="/book-session" className="inline-block px-6 py-2 rounded-full bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-900/20">
                  Reschedule
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
