"use client";
import { useState } from "react";
import { Building2, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import api from "../../services/api";

export default function CorporatePage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    employeeCount: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      await api.createCorporateInquiry({
        ...formData,
        employeeCount: formData.employeeCount ? Number(formData.employeeCount) : undefined,
      });
      setSuccess("Inquiry submitted successfully. We will reach out soon.");
      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        employeeCount: "",
        message: "",
      });
    } catch (err) {
      setError(err.message || "Failed to submit inquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA] py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-light text-[#2E2A36] mb-4">
            Corporate <span className="font-medium text-[#3F2965]">Programs</span>
          </h1>
          <p className="text-xl text-[#5E5A6B] leading-relaxed max-w-2xl mx-auto">
            Share your organisation's needs and explore customised mental health and psycho-education programs for your teams.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="p-8 md:p-12 rounded-3xl bg-[#F6F4FA] border border-[#3F2965]/10 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#3F2965]/10 flex items-center justify-center text-[#3F2965]">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-light text-[#2E2A36]">Corporate Inquiry</h2>
                <p className="text-sm text-[#5E5A6B]">Provide basic details and we’ll follow up with a discovery call.</p>
              </div>
            </div>

            {error && (
              <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-800 text-sm border border-red-100">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}

            {success && (
              <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-sm border border-emerald-100">
                <CheckCircle2 className="w-4 h-4" /> {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#2E2A36] mb-2">Company Name *</label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 bg-white focus:ring-2 focus:ring-[#3F2965] outline-none"
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2E2A36] mb-2">Contact Person *</label>
                  <input
                    type="text"
                    name="contactPerson"
                    required
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 bg-white focus:ring-2 focus:ring-[#3F2965] outline-none"
                    placeholder="HR / People Ops contact"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#2E2A36] mb-2">Work Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 bg-white focus:ring-2 focus:ring-[#3F2965] outline-none"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2E2A36] mb-2">Phone (optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 bg-white focus:ring-2 focus:ring-[#3F2965] outline-none"
                    placeholder="+91..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2E2A36] mb-2">Approx. Employee Count</label>
                <input
                  type="number"
                  name="employeeCount"
                  min="1"
                  value={formData.employeeCount}
                  onChange={handleChange}
                  className="w-full max-w-xs px-4 py-3 rounded-xl border border-[#3F2965]/20 bg-white focus:ring-2 focus:ring-[#3F2965] outline-none"
                  placeholder="e.g. 50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2E2A36] mb-2">What are you looking for? (optional)</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 bg-white focus:ring-2 focus:ring-[#3F2965] outline-none resize-none"
                  placeholder="e.g. group psycho-education sessions, manager training, burnout prevention..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-full bg-[#3F2965] text-white font-medium text-lg hover:shadow-xl transition-all disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                  </>
                ) : (
                  "Submit Inquiry"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}