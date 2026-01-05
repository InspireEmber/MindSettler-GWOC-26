"use client";
import { useState } from "react";
import { Building2, Loader2, CheckCircle2, AlertCircle, Handshake, Briefcase } from "lucide-react";
import api from "../../services/api";

export default function CorporatePage() {
  const [inquiryType, setInquiryType] = useState("services"); // 'services' or 'sponsorship'
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    employeeCount: "",
    message: "",
    sponsorshipLevel: "",
    proposedContribution: "",
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
      let payload = {
        inquiryType,
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      };

      if (inquiryType === 'services') {
        payload.employeeCount = formData.employeeCount;
      } else { // 'sponsorship'
        payload.sponsorshipLevel = formData.sponsorshipLevel;
        payload.proposedContribution = formData.proposedContribution;
      }

      await api.createCorporateInquiry(payload);
      setSuccess("Inquiry submitted successfully. We will reach out soon.");
      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        employeeCount: "",
        message: "",
        sponsorshipLevel: "",
        proposedContribution: "",
      });
    } catch (err) {
      const errorMessage = err.response?.data?.errors?.[0]?.message || err.message || "Failed to submit inquiry.";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const renderServicesForm = () => (
    <>
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
    </>
  );

  const renderSponsorshipForm = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#2E2A36] mb-2">Organization Name *</label>
          <input
            type="text"
            name="companyName"
            required
            value={formData.companyName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 bg-white focus:ring-2 focus:ring-[#3F2965] outline-none"
            placeholder="Your Foundation / Company"
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
            placeholder="Your name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#2E2A36] mb-2">Email *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 bg-white focus:ring-2 focus:ring-[#3F2965] outline-none"
            placeholder="you@organization.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#2E2A36] mb-2">Phone (optional)</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 bg-white focus:ring-2 focus:ring-[#3F2-965] outline-none"
            placeholder="+91..."
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2E2A36] mb-2">Sponsorship Level (optional)</label>
        <select
          name="sponsorshipLevel"
          value={formData.sponsorshipLevel}
          onChange={handleChange}
          className="w-full max-w-xs px-4 py-3 rounded-xl border border-[#3F2965]/20 bg-white focus:ring-2 focus:ring-[#3F2965] outline-none"
        >
          <option value="">Select a level</option>
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
          <option value="bronze">Bronze</option>
          <option value="custom">Custom</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-[#2E2A36] mb-2">Proposed Contribution / Collaboration Idea (optional)</label>
        <textarea
          name="proposedContribution"
          rows={4}
          value={formData.proposedContribution}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 bg-white focus:ring-2 focus:ring-[#3F2965] outline-none resize-none"
          placeholder="Describe your sponsorship idea, e.g., sponsoring a number of therapy sessions for a specific demographic, co-hosting a workshop, etc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#2E2A36] mb-2">Message (optional)</label>
        <textarea
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 bg-white focus:ring-2 focus:ring-[#3F2965] outline-none resize-none"
          placeholder="Any additional details or questions."
        />
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA] py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-light text-[#2E2A36] mb-4">
            Corporate <span className="font-medium text-[#3F2965]">Partnerships</span>
          </h1>
          <p className="text-xl text-[#5E5A6B] leading-relaxed max-w-2xl mx-auto">
            Explore opportunities for corporate wellness services or sponsor our programs to make a positive impact.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="p-8 md:p-12 rounded-3xl bg-[#F6F4FA] border border-[#3F2965]/10 shadow-sm">
            
            {/* Inquiry Type Selector */}
            <div className="flex justify-center mb-8">
              <div className="flex rounded-full bg-white p-1 border border-[#3F2965]/10">
                <button 
                  onClick={() => setInquiryType('services')}
                  className={`px-6 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${inquiryType === 'services' ? 'bg-[#3F2965] text-white' : 'text-[#5E5A6B]'}`}
                >
                  <Briefcase className="w-4 h-4" />
                  Services
                </button>
                <button
                  onClick={() => setInquiryType('sponsorship')}
                  className={`px-6 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${inquiryType === 'sponsorship' ? 'bg-[#3F2965] text-white' : 'text-[#5E5A6B]'}`}
                >
                  <Handshake className="w-4 h-4" />
                  Sponsorship
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#3F2965]/10 flex items-center justify-center text-[#3F2965]">
                {inquiryType === 'services' ? <Building2 className="w-5 h-5" /> : <Handshake className="w-5 h-5" />}
              </div>
              <div>
                <h2 className="text-2xl font-light text-[#2E2A36]">
                  {inquiryType === 'services' ? 'Corporate Services Inquiry' : 'Sponsorship Inquiry'}
                </h2>
                <p className="text-sm text-[#5E5A6B]">
                  {inquiryType === 'services' 
                    ? 'Provide basic details and we’ll follow up with a discovery call.' 
                    : 'Let us know how you’d like to partner with us.'}
                </p>
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
              {inquiryType === 'services' ? renderServicesForm() : renderSponsorshipForm()}
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