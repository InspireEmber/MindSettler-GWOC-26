import Link from "next/link";
import { AlertCircle, Clock, CalendarX, Info } from "lucide-react";

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
    <div className="min-h-screen bg-white text-[#5E5A6B]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA] py-20 md:py-32 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-light text-[#2E2A36] mb-6">
            Non-Refund <span className="font-medium text-[#3F2965]">Policy</span>
          </h1>
          <p className="text-xl">Our policy regarding refunds and cancellations.</p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16 md:py-24 max-w-4xl mx-auto px-6">
        <div className="space-y-12">
          {/* Important Alert */}
          <div className="p-6 rounded-2xl bg-yellow-50 border border-yellow-200 flex items-center gap-4">
            <AlertCircle className="text-yellow-700 shrink-0" />
            <p className="text-yellow-900 font-medium">Please read this policy carefully before booking a session.</p>
          </div>

          <div className="grid gap-12">
            {POLICY_POINTS.map((point, i) => (
              <div key={i} className="group">
                <h2 className="text-2xl font-medium text-[#2E2A36] mb-4 group-hover:text-[#3F2965] transition-colors">
                  {point.title}
                </h2>
                <p className="leading-relaxed mb-4">{point.content}</p>
                {point.items && (
                  <ul className="space-y-3">
                    {point.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#DD1764]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="p-8 rounded-3xl bg-[#F6F4FA] border border-[#3F2965]/10">
            <h3 className="text-xl font-medium text-[#2E2A36] mb-3 flex items-center gap-2">
              <Info size={20} className="text-[#3F2965]"/> Contact Us
            </h3>
            <p className="text-sm leading-relaxed mb-6">
              If you have questions or need to request a rescheduling, please contact us at 
              <a href="mailto:info@mindsettler.com" className="text-[#3F2965] font-semibold hover:underline ml-1">
                info@mindsettler.com
              </a>.
            </p>
          </div>
        </div>
      </section>

      {/* Persistent Vibrant CTA */}
      <section className="py-24 md:py-32 bg-[#F6F4FA]/50">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#3F2965] to-[#2E2A36] p-10 sm:p-12 md:p-20 text-center text-white shadow-2xl shadow-[#3F2965]/30">
            {/* Decorative Brand Accents */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#DD1764]/15 rounded-full blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#3F2965]/40 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                Ready to Begin Your Journey?
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                Take the first step toward understanding your mind and building emotional clarity.
              </p>
              <Link
                href="/book-session"
                className="inline-flex px-10 py-4 md:px-12 md:py-5 rounded-full bg-white text-[#3F2965] font-medium text-lg hover:bg-white/95 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:scale-[1.03] active:scale-95 items-center justify-center"
              >
                Book Your First Session
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}