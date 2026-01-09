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

// Update CONTACT_INFO colors if needed, passing distinct classes or using inline styles in loop.
// For now, I'll update the component structure to use white text/icons.

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
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative z-10 py-12 sm:py-16 md:py-20 lg:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="h-1 w-24 bg-gradient-to-r from-white/20 via-white to-white/20 rounded-full mx-auto mb-6 sm:mb-8" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 sm:mb-6 leading-tight">
            Get in <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#eeb9ff] to-[#fff]">Touch</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed px-2 text-gray-200 font-redhat">Have questions? We're here to help. Reach out and we'll get back to you soon.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 py-8 sm:py-12 md:py-16 lg:py-20 max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
        {/* Sidebar Info */}
        <div className="space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-3xl font-light text-white">Contact Information</h2>
          <div className="space-y-5 sm:space-y-6">
            {CONTACT_INFO.map((info, idx) => (
              <div key={idx} className="flex items-start gap-3 sm:gap-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 min-w-[44px] min-h-[44px] bg-white/10 backdrop-blur-md border border-white/10`}>
                  {info.icon}
                </div>
                <div>
                  <h3 className="font-medium text-white text-sm sm:text-base mb-1">{info.title}</h3>
                  <a href={info.href} target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base text-gray-300 hover:text-[#eeb9ff] transition-colors break-all">{info.value}</a>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <h3 className="text-lg sm:text-xl font-medium text-white mb-3 sm:mb-4">Response Time</h3>
            <p className="text-sm sm:text-base leading-relaxed text-gray-200 font-redhat">Typically 24-48 hours. For urgent booking matters, please mention it in your message.</p>
          </div>
        </div>

        {/* Form */}
        {/* Form Container */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-8">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {[
              { label: "Name", name: "name", type: "text", ph: "Your name" },
              { label: "Email", name: "email", type: "email", ph: "your@email.com" },
              { label: "Subject", name: "subject", type: "text", ph: "What is this regarding?" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-300 mb-2">{field.label}</label>
                <input
                  {...field}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/60 focus:ring-2 focus:ring-[#eeb9ff]/50 focus:border-[#eeb9ff]/50 outline-none transition-all min-h-[44px] text-sm sm:text-base"
                  placeholder={field.ph}
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/60 focus:ring-2 focus:ring-[#eeb9ff]/50 focus:border-[#eeb9ff]/50 outline-none resize-none transition-all text-sm sm:text-base min-h-[120px]"
                placeholder="Your message..."
              />
            </div>

            {status === "success" && (
              <div className="p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-200 text-sm animate-fade-in">
                Thank you! Message sent successfully.
              </div>
            )}

            <button
              disabled={isSubmitting}
              className="w-full py-5 rounded-full bg-[#eeb9ff] text-[#3F2965] font-serif font-bold text-lg shadow-xl shadow-[#eeb9ff]/10 hover:shadow-[#eeb9ff]/20 hover:scale-[1.02] transition-all disabled:opacity-30 disabled:grayscale active:scale-95 flex items-center justify-center gap-3 relative overflow-hidden"
            >
              {isSubmitting ? "Sending..." : <><Send size={18} /> Send Message</>}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
