"use client";
import { useState } from "react";
import { Mail, Globe, Send } from "lucide-react"; // npm install lucide-react

const CONTACT_INFO = [
  {
    title: "Email",
    value: "info@mindsettler.com",
    href: "mailto:info@mindsettler.com",
    icon: <Mail className="w-6 h-6 text-[#3F2965]" />,
    bgColor: "bg-[#3F2965]/10",
  },
  {
    title: "Social Media",
    value: "@mindsettlerbypb",
    href: "https://www.instagram.com/mindsettlerbypb/",
    icon: <Globe className="w-6 h-6 text-[#DD1764]" />,
    bgColor: "bg-[#DD1764]/10",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white text-[#5E5A6B]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA] py-12 sm:py-16 md:py-20 lg:py-32 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto mb-4 sm:mb-6" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#2E2A36] mb-4 sm:mb-6 leading-tight">
            Get in <span className="font-medium text-[#3F2965]">Touch</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed px-2">Have questions? We're here to help. Reach out and we'll get back to you soon.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
        {/* Sidebar Info */}
        <div className="space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-3xl font-light text-[#2E2A36]">Contact Information</h2>
          <div className="space-y-5 sm:space-y-6">
            {CONTACT_INFO.map((info, idx) => (
              <div key={idx} className="flex items-start gap-3 sm:gap-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 min-w-[44px] min-h-[44px] ${info.bgColor}`}>
                  {info.icon}
                </div>
                <div>
                  <h3 className="font-medium text-[#2E2A36] text-sm sm:text-base mb-1">{info.title}</h3>
                  <a href={info.href} target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base hover:text-[#3F2965] transition-colors break-all">{info.value}</a>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-[#F6F4FA] border border-[#3F2965]/10">
            <h3 className="text-lg sm:text-xl font-medium text-[#2E2A36] mb-3 sm:mb-4">Response Time</h3>
            <p className="text-sm sm:text-base leading-relaxed">Typically 24-48 hours. For urgent booking matters, please mention it in your message.</p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-3xl font-light text-[#2E2A36]">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {[
              { label: "Name", name: "name", type: "text", ph: "Your name" },
              { label: "Email", name: "email", type: "email", ph: "your@email.com" },
              { label: "Subject", name: "subject", type: "text", ph: "What is this regarding?" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-[#2E2A36] mb-2">{field.label}</label>
                <input
                  {...field}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none transition-all min-h-[44px] text-sm sm:text-base"
                  placeholder={field.ph}
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-[#2E2A36] mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none resize-none transition-all text-sm sm:text-base min-h-[120px]"
                placeholder="Your message..."
              />
            </div>

            {status === "success" && (
              <div className="p-4 rounded-xl bg-green-50 text-green-800 text-sm animate-fade-in">
                Thank you! Message sent successfully.
              </div>
            )}

            <button
              disabled={isSubmitting}
              className="w-full py-4 rounded-full bg-[#3F2965] text-white font-medium hover:bg-[#3F2965]/90 transition-all hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 min-h-[44px] text-sm sm:text-base"
            >
              {isSubmitting ? "Sending..." : <><Send size={18} /> Send Message</>}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}