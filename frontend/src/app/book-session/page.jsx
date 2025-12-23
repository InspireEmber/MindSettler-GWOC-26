"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BookingForm from "../../components/BookingForm";
import { Clock, Shield, Globe } from "lucide-react";
import { getCurrentUser } from "../../services/auth";

const SESSION_FEATURES = [
  { 
    title: "60 Minutes", 
    desc: "Structured session duration", 
    icon: <Clock className="w-8 h-8" />, 
    bg: "bg-[#3F2965]/10", 
    color: "text-[#3F2965]" 
  },
  { 
    title: "Confidential", 
    desc: "Safe and private environment", 
    icon: <Shield className="w-8 h-8" />, 
    bg: "bg-[#DD1764]/10", 
    color: "text-[#DD1764]" 
  },
  { 
    title: "Flexible", 
    desc: "Online or offline options", 
    icon: <Globe className="w-8 h-8" />, 
    bg: "bg-[#3F2965]/10", 
    color: "text-[#3F2965]" 
  },
];

export default function BookSessionPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function checkAuth() {
      try {
        const user = await getCurrentUser();
        if (!user && !cancelled) {
          router.replace("/login");
          return;
        }
      } catch (e) {
        if (!cancelled) {
          router.replace("/login");
          return;
        }
      } finally {
        if (!cancelled) setCheckingAuth(false);
      }
    }

    checkAuth();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center text-[#5E5A6B]">Checking your session...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#F6F4FA] via-white to-[#F6F4FA] py-12 sm:py-16 md:py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="h-1 w-16 bg-gradient-to-r from-[#3F2965] to-[#DD1764] rounded-full mx-auto mb-4 sm:mb-6" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#2E2A36] mb-4 sm:mb-6 leading-tight">
            Book Your <span className="font-medium text-[#3F2965]">Session</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#5E5A6B] leading-relaxed px-2">
            Take the first step toward understanding your mind. Book a 60-minute psycho-education session.
          </p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-0 sm:p-2 md:p-8 border border-[#3F2965]/5 shadow-sm">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* Session Info Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#F6F4FA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            {SESSION_FEATURES.map((feature, i) => (
              <div key={i} className="text-center group">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full ${feature.bg} ${feature.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-lg font-medium text-[#2E2A36] mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-[#5E5A6B] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}














// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import ApiService from "../../services/api";
// import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

// export default function BookingForm() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [slots, setSlots] = useState([]);
//   const [error, setError] = useState("");
  
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     sessionType: "online",
//     slotId: "",
//     message: ""
//   });

//   // Fetch available slots when component mounts
//   useEffect(() => {
//     const fetchSlots = async () => {
//       try {
//         const response = await ApiService.getAvailableSlots();
//         setSlots(response.data || []);
//       } catch (err) {
//         setError("Could not load available times. Please try again later.");
//       }
//     };
//     fetchSlots();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const result = await ApiService.createBooking(formData);
//       // Redirect to the status page using the new booking ID
//       router.push(`/appointment-status?id=${result.data._id}`);
//     } catch (err) {
//       setError(err.message || "Something went wrong. Please check your details.");
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       {error && (
//         <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 text-red-700 text-sm border border-red-100">
//           <AlertCircle size={18} /> {error}
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-[#2E2A36] mb-2">Full Name</label>
//           <input
//             required
//             type="text"
//             className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none transition-all"
//             placeholder="John Doe"
//             onChange={(e) => setFormData({...formData, name: e.target.value})}
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-[#2E2A36] mb-2">Email Address</label>
//           <input
//             required
//             type="email"
//             className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none transition-all"
//             placeholder="john@example.com"
//             onChange={(e) => setFormData({...formData, email: e.target.value})}
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-[#2E2A36] mb-2">Session Preference</label>
//           <select 
//             className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none bg-white"
//             onChange={(e) => setFormData({...formData, sessionType: e.target.value})}
//           >
//             <option value="online">Online Session (Google Meet)</option>
//             <option value="offline">Offline Session (In-Person)</option>
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-[#2E2A36] mb-2">Select Available Time</label>
//           <select 
//             required
//             className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none bg-white disabled:opacity-50"
//             onChange={(e) => setFormData({...formData, slotId: e.target.value})}
//             disabled={slots.length === 0}
//           >
//             <option value="">{slots.length > 0 ? "Choose a time slot" : "No slots available"}</option>
//             {slots.map((slot) => (
//               <option key={slot._id} value={slot._id}>
//                 {new Date(slot.startTime).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' })}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-[#2E2A36] mb-2">Notes for the Practitioner (Optional)</label>
//         <textarea
//           rows={4}
//           className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none resize-none"
//           placeholder="Briefly describe what you'd like to focus on..."
//           onChange={(e) => setFormData({...formData, message: e.target.value})}
//         />
//       </div>

//       <button
//         disabled={loading || slots.length === 0}
//         type="submit"
//         className="w-full py-4 rounded-full bg-[#3F2965] text-white font-medium text-lg hover:bg-[#3F2965]/90 transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
//       >
//         {loading ? (
//           <>
//             <Loader2 className="animate-spin" size={20} /> Processing...
//           </>
//         ) : (
//           <>
//             Confirm Booking <CheckCircle2 size={20} />
//           </>
//         )}
//       </button>

//       <p className="text-center text-xs text-[#5E5A6B]">
//         By confirming, you agree to our <a href="/policies/confidentiality" className="underline">Confidentiality Policy</a>.
//       </p>
//     </form>
//   );
// }
