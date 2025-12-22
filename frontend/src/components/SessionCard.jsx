import { CheckCircle2, Clock, XCircle, Calendar, User, Mail, Phone, Laptop, MapPin } from "lucide-react";
import Link from "next/link";

const STATUS_CONFIG = {
  confirmed: { color: "bg-green-100 text-green-800 border-green-200", icon: <CheckCircle2 size={20} />, bgLight: "bg-green-50 border-green-200" },
  pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: <Clock size={20} />, bgLight: "bg-yellow-50 border-yellow-200" },
  rejected: { color: "bg-red-100 text-red-800 border-red-200", icon: <XCircle size={20} />, bgLight: "bg-red-50 border-red-200" },
  default: { color: "bg-gray-100 text-gray-800 border-gray-200", icon: null, bgLight: "bg-gray-50 border-gray-200" }
};

export default function SessionCard({ booking }) {
  const status = booking?.status?.toLowerCase() || "pending";
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.default;

  const DetailItem = ({ label, value, icon: Icon }) => (
    <div>
      <p className="text-sm font-medium text-[#5E5A6B] mb-1 flex items-center gap-2">
        {Icon && <Icon size={14} />} {label}
      </p>
      <p className="text-lg text-[#2E2A36] capitalize">{value || "Not specified"}</p>
    </div>
  );

  return (
    <div className="p-8 md:p-12 rounded-3xl bg-white border border-[#3F2965]/10 shadow-xl">
      {/* Status Badge */}
      <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-10 ${config.color}`}>
        {config.icon}
        <span className="font-semibold capitalize tracking-wide">{status}</span>
      </div>

      <div className="space-y-10">
        <h2 className="text-3xl font-light text-[#2E2A36]">Session Details</h2>

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
          {booking.meetingLink && (
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-[#5E5A6B] mb-1 flex items-center gap-2">
                <Calendar size={14} /> Meeting Link
              </p>
              <a
                href={booking.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3F2965] underline break-all"
              >
                {booking.meetingLink}
              </a>
            </div>
          )}
        </div>

        {booking.isFirstSession && (
          <div className="p-4 rounded-2xl bg-[#3F2965]/5 border border-[#3F2965]/10 text-[#3F2965] font-medium flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#3F2965] text-white flex items-center justify-center text-xs">✓</div>
            First session with MindSettler
          </div>
        )}

        {/* Dynamic Status Messaging */}
        <div className={`p-6 rounded-2xl border ${config.bgLight}`}>
          <div className="flex gap-4">
            <div className="shrink-0 mt-1">{config.icon}</div>
            <div>
              <h3 className="font-bold mb-2 capitalize">
                {status === "pending" ? "Awaiting Review" : `Booking ${status}`}
              </h3>
              <p className="text-sm leading-relaxed mb-4">
                {status === "pending" && "Your request is under review. Expect an email confirmation within 24-48 hours."}
                {status === "confirmed" && "Success! Detailed session information and meeting links will arrive via email shortly."}
                {status === "rejected" && "We couldn't accommodate this slot. Please try another time or contact support."}
              </p>
              {status === "rejected" && (
                <Link href="/book-session" className="inline-block px-6 py-2 rounded-full bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-all">
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