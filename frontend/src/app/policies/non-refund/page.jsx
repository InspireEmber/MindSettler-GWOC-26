import Link from "next/link";
import { AlertCircle, Clock, CalendarX, Info } from "lucide-react";
import ReadyToBook from "@/components/ReadyToBook";

const POLICY_POINTS = [
  {
    title: "General Policy",
    content: "All confirmed session bookings are non-refundable. Once payment has been processed, refunds will not be issued under normal circumstances."
  },
  {
    title: "Cancellation Terms",
    content: "Requests must be made at least 48 hours before your session:",
    items: [
      "48+ hours notice: Eligible for rescheduling",
      "Less than 48 hours: Not eligible for refund/reschedule",
      "No-shows: Not eligible for refund/reschedule"
    ]
  },
  {
    title: "Exceptional Circumstances",
    content: "In cases of medical emergencies or unforeseen events, we may consider rescheduling on a case-by-case basis. Refunds remain at our sole discretion."
  }
];

export default function NonRefundPolicyPage() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-8 md:pt-32 md:pb-12 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-light text-white mb-6">
            Non-Refund <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#eeb9ff] to-[#fff]">Policy</span>
          </h1>
          <p className="text-xl text-gray-200">Our policy regarding refunds and cancellations.</p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="relative z-10 py-16 md:py-24 max-w-4xl mx-auto px-6">
        <div className="space-y-12">
          {/* Important Alert */}
          <div className="p-6 rounded-2xl bg-yellow-900/20 border border-yellow-500/30 flex items-center gap-4">
            <AlertCircle className="text-yellow-400 shrink-0" />
            <p className="text-yellow-100 font-medium">Please read this policy carefully before booking a session.</p>
          </div>

          <div className="grid gap-12">
            {POLICY_POINTS.map((point, i) => (
              <div key={i} className="group">
                <h2 className="text-2xl font-medium text-white mb-4 group-hover:text-[#eeb9ff] transition-colors">
                  {point.title}
                </h2>
                <p className="leading-relaxed mb-4 text-gray-200">{point.content}</p>
                {point.items && (
                  <ul className="space-y-3">
                    {point.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#DD1764]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20">
            <h3 className="text-xl font-medium text-white mb-3 flex items-center gap-2">
              <Info size={20} className="text-[#eeb9ff]"/> Contact Us
            </h3>
            <p className="text-sm leading-relaxed mb-6 text-gray-200">
              If you have questions or need to request a rescheduling, please contact us at 
              <a href="mailto:info@mindsettler.com" className="text-[#eeb9ff] font-semibold hover:underline ml-1">
                info@mindsettler.com
              </a>.
            </p>
          </div>
        </div>
      </section>

      <ReadyToBook />
    </div>
  );
}
