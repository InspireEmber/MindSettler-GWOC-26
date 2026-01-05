// "use client";
// import { useEffect, useState } from "react";
// import api from "../../../services/api"; // Use the api service

// export default function AdminCorporateInquiriesPage() {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [inquiries, setInquiries] = useState([]);
//   const [filter, setFilter] = useState("");

//   async function loadInquiries() {
//     setLoading(true);
//     try {
//       const query = filter ? { status: filter } : {};
//       const data = await api.getCorporateInquiries(query);
//       setInquiries(data);
//     } catch (e) {
//       setError(e.message || "Failed to load corporate inquiries");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     loadInquiries();
//   }, [filter]);

//   const handleStatusChange = async (id, newStatus) => {
//     const originalInquiries = [...inquiries];

//     const updatedInquiries = inquiries.map((i) =>
//       i._id === id ? { ...i, status: newStatus } : i
//     );
//     setInquiries(updatedInquiries);

//     try {
//       await api.updateCorporateInquiryStatus(id, newStatus);
//     } catch (err) {
//       setError(`Failed to update status for ${id}. Please try again.`);
//       setInquiries(originalInquiries); // Revert on failure
//     }
//   };

//   if (loading)
//     return (
//       <div className="text-[#5E5A6B]">
//         Loading corporate inquiries...
//       </div>
//     );

//   return (
//     <div className="space-y-4">
//       {error && (
//         <div className="text-red-600 text-sm p-3 bg-red-50 rounded-lg">
//           {error}
//         </div>
//       )}

//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-light text-[#2E2A36]">
//           Corporate Inquiries
//         </h1>

//         {/* ✅ FIXED FILTER SELECT */}
//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="px-3 py-2 border rounded-lg text-sm"
//         >
//           <option value="">All</option>
//           <option value="new">New</option>
//           <option value="in_progress">In Progress</option>
//           <option value="closed">Closed</option>
//         </select>
//       </div>

//       {/* ✅ FIXED LIST RENDERING */}
//       {inquiries.map((i) => (
//         <div
//           key={i._id}
//           className="bg-white rounded-2xl p-4 shadow-sm border border-[#3F2965]/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
//         >
//           <div className="flex-1">
//             <p className="font-medium text-[#2E2A36]">
//               {i.companyName} &middot; {i.contactPerson}
//             </p>
//             <p className="text-slate-600 text-sm">
//               {i.email}
//               {i.phone && `, ${i.phone}`}
//             </p>
//             {i.message && (
//               <p className="text-slate-500 mt-2 text-xs">
//                 {i.message}
//               </p>
//             )}
//           </div>

//           <div className="flex items-center gap-3">
//             <p className="text-slate-500 text-xs">
//               {new Date(i.createdAt).toLocaleDateString()}
//             </p>

//             <select
//               value={i.status}
//               onChange={(e) =>
//                 handleStatusChange(i._id, e.target.value)
//               }
//               className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${
//                 i.status === "new"
//                   ? "bg-blue-100 text-blue-700 border-blue-200"
//                   : i.status === "in_progress"
//                   ? "bg-yellow-100 text-yellow-700 border-yellow-200"
//                   : "bg-slate-100 text-slate-700 border-slate-200"
//               }`}
//             >
//               <option value="new">New</option>
//               <option value="in_progress">In Progress</option>
//               <option value="closed">Closed</option>
//             </select>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

//1
// "use client";
// import { useEffect, useState } from "react";
// import api from "../../../services/api"; // Use the api service

// export default function AdminCorporateInquiriesPage() {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [inquiries, setInquiries] = useState([]);
//   const [filter, setFilter] = useState("");

//   async function loadInquiries() {
//     setLoading(true);
//     try {
//       const query = filter ? { status: filter } : {};
//       const data = await api.getCorporateInquiries(query);
//       setInquiries(data);
//     } catch (e) {
//       setError(e.message || "Failed to load corporate inquiries");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     loadInquiries();
//   }, [filter]);

//   const handleStatusChange = async (id, newStatus) => {
//     const originalInquiries = [...inquiries];

//     const updatedInquiries = inquiries.map((i) =>
//       i._id === id ? { ...i, status: newStatus } : i
//     );
//     setInquiries(updatedInquiries);

//     try {
//       await api.updateCorporateInquiryStatus(id, newStatus);
//     } catch (err) {
//       setError(`Failed to update status for ${id}. Please try again.`);
//       setInquiries(originalInquiries); // Revert on failure
//     }
//   };

//   if (loading)
//     return (
//       <div className="text-[#5E5A6B]">
//         Loading corporate inquiries...
//       </div>
//     );

//   return (
//     <div className="space-y-4">
//       {error && (
//         <div className="text-red-600 text-sm p-3 bg-red-50 rounded-lg">
//           {error}
//         </div>
//       )}

//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-light text-[#2E2A36]">
//           Corporate Inquiries
//         </h1>

//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="px-3 py-2 border rounded-lg text-sm"
//         >
//           <option value="">All</option>
//           <option value="new">New</option>
//           <option value="in_progress">In Progress</option>
//           <option value="closed">Closed</option>
//         </select>
//       </div>

//       {inquiries.map((i) => (
//         <div
//           key={i._id}
//           className="bg-white rounded-2xl p-4 shadow-sm border border-[#3F2965]/10 flex flex-col gap-4"
//         >
//           <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
//             <div className="flex-1">
//               <div className="flex items-center gap-3 mb-2">
//                 <p className="font-medium text-[#2E2A36]">
//                   {i.companyName} &middot; {i.contactPerson}
//                 </p>
//                 <span
//                   className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize border ${
//                     i.inquiryType === "sponsorship"
//                       ? "bg-purple-100 text-purple-700 border-purple-200"
//                       : "bg-green-100 text-green-700 border-green-200"
//                   }`}
//                 >
//                   {i.inquiryType || 'services'}
//                 </span>
//               </div>
//               <p className="text-slate-600 text-sm">
//                 {i.email}
//                 {i.phone && `, ${i.phone}`}
//               </p>
//             </div>

//             <div className="flex items-center gap-3">
//               <p className="text-slate-500 text-xs">
//                 {new Date(i.createdAt).toLocaleDateString()}
//               </p>
//               <select
//                 value={i.status}
//                 onChange={(e) => handleStatusChange(i._id, e.target.value)}
//                 className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${
//                   i.status === "new"
//                     ? "bg-blue-100 text-blue-700 border-blue-200"
//                     : i.status === "in_progress"
//                     ? "bg-yellow-100 text-yellow-700 border-yellow-200"
//                     : "bg-slate-100 text-slate-700 border-slate-200"
//                 }`}
//               >
//                 <option value="new">New</option>
//                 <option value="in_progress">In Progress</option>
//                 <option value="closed">Closed</option>
//               </select>
//             </div>
//           </div>

//           <div className="text-sm text-slate-600 pt-3 border-t border-slate-100 space-y-2">
//             {(i.inquiryType === 'services' || !i.inquiryType) && (
//               <>
//                 <p><strong>Employee Count:</strong> {i.employeeCount || 'N/A'}</p>
//                 {i.message && <p className="text-xs text-slate-500"><strong>Message:</strong> {i.message}</p>}
//               </>
//             )}
//             {i.inquiryType === 'sponsorship' && (
//               <>
//                  <p><strong>Sponsorship Level:</strong> {i.sponsorshipLevel || 'N/A'}</p>
//                  {i.proposedContribution && <p><strong>Proposed Contribution:</strong> {i.proposedContribution}</p>}
//                  {i.message && <p className="text-xs text-slate-500"><strong>Message:</strong> {i.message}</p>}
//               </>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import api from "../../../services/api"; // Use the api service

export default function AdminCorporateInquiriesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [inquiries, setInquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  async function loadInquiries() {
    setLoading(true);
    try {
      const query = {};
      if (statusFilter) query.status = statusFilter;
      if (typeFilter) query.inquiryType = typeFilter;

      const data = await api.getCorporateInquiries(query);
      setInquiries(data);
    } catch (e) {
      setError(e.message || "Failed to load corporate inquiries");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInquiries();
  }, [statusFilter, typeFilter]);

  const handleStatusChange = async (id, newStatus) => {
    const originalInquiries = [...inquiries];

    const updatedInquiries = inquiries.map((i) =>
      i._id === id ? { ...i, status: newStatus } : i
    );
    setInquiries(updatedInquiries);

    try {
      await api.updateCorporateInquiryStatus(id, newStatus);
    } catch (err) {
      setError(`Failed to update status for ${id}. Please try again.`);
      setInquiries(originalInquiries); // Revert on failure
    }
  };

  if (loading)
    return (
      <div className="text-[#5E5A6B]">
        Loading corporate inquiries...
      </div>
    );

  return (
    <div className="space-y-4">
      {error && (
        <div className="text-red-600 text-sm p-3 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-light text-[#2E2A36]">
          Corporate Inquiries
        </h1>

        <div className="flex items-center gap-4">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm bg-white"
          >
            <option value="">All Types</option>
            <option value="services">Services</option>
            <option value="sponsorship">Sponsorship</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg text-sm bg-white"
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {inquiries.map((i) => (
        <div
          key={i._id}
          className="bg-white rounded-2xl p-4 shadow-sm border border-[#3F2965]/10 flex flex-col gap-4"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <p className="font-medium text-[#2E2A36]">
                  {i.companyName} &middot; {i.contactPerson}
                </p>
                <span
                  className={`inline-flex px-2 py-1 rounded-full text-xs font-medium capitalize border ${
                    i.inquiryType === "sponsorship"
                      ? "bg-purple-100 text-purple-700 border-purple-200"
                      : "bg-teal-100 text-teal-700 border-teal-200"
                  }`}
                >
                  {i.inquiryType === "sponsorship" ? "Sponsorship" : "Services"}
                </span>
              </div>
              <p className="text-slate-600 text-sm">
                {i.email}
                {i.phone && `, ${i.phone}`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <p className="text-slate-500 text-xs">
                {new Date(i.createdAt).toLocaleDateString()}
              </p>
              <select
                value={i.status}
                onChange={(e) => handleStatusChange(i._id, e.target.value)}
                className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${
                  i.status === "new"
                    ? "bg-blue-100 text-blue-700 border-blue-200"
                    : i.status === "in_progress"
                    ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                    : "bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                <option value="new">New</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-slate-600 pt-3 border-t border-slate-100 space-y-3">
            {(i.inquiryType === 'services' || !i.inquiryType) ? (
              <>
                <p><strong>Employee Count:</strong> {i.employeeCount || 'N/A'}</p>
                {i.message && (
                  <div>
                    <p className="font-medium">Message:</p>
                    <p className="text-slate-500 whitespace-pre-wrap">{i.message}</p>
                  </div>
                )}
              </>
            ) : (
              <>
                <p><strong>Sponsorship Level:</strong> {i.sponsorshipLevel || 'N/A'}</p>
                {i.proposedContribution && (
                  <div>
                    <p className="font-medium">Proposed Contribution:</p>
                    <p className="text-slate-500 whitespace-pre-wrap">{i.proposedContribution}</p>
                  </div>
                )}
                {i.message && (
                  <div>
                    <p className="font-medium">Message:</p>
                    <p className="text-slate-500 whitespace-pre-wrap">{i.message}</p>
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      ))}
    </div>
  );
}
