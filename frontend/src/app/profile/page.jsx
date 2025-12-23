"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../services/api";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [p, s, sess] = await Promise.all([
          api.getUserProfile(),
          api.getUserSessionsSummary(),
          api.getUserSessions(),
        ]);
        if (cancelled) return;
        setProfile(p);
        setSummary(s);
        setSessions(sess || []);
      } catch (e) {
        if (cancelled) return;
        if (e.message?.toLowerCase().includes("login")) {
          router.replace("/login");
          return;
        }
        setError(e.message || "Failed to load profile");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-[#5E5A6B]">Loading your profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <h1 className="text-2xl font-light text-[#2E2A36] mb-2">Profile Error</h1>
          <p className="text-sm text-[#5E5A6B] mb-4">{error}</p>
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-3 rounded-full bg-[#3F2965] text-white text-sm"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // const upcoming = sessions.filter((s) => s.derivedStatus === "upcoming");
  // const completed = sessions.filter((s) => s.derivedStatus === "completed");
  // const upcoming = sessions.filter((s) => s.derivedStatus === "upcoming" && s.status !== "rejected");
  const approvedUpcoming = sessions.filter(s => s.displayCategory === 'approvedUpcoming').sort((a, b) => new Date(a.date) - new Date(b.date));
  const pendingUpcoming = sessions.filter(s => s.displayCategory === 'pendingUpcoming').sort((a, b) => new Date(a.date) - new Date(b.date));

  // const completed = sessions.filter((s) => s.derivedStatus === "completed" && s.status !== "rejected");
  // const rejected = sessions.filter((s) => s.status === "rejected");
  const completed = sessions.filter(s => s.displayCategory === 'completed');
  const rejected = sessions.filter(s => s.displayCategory === 'rejected');

  function StatusBadge({ type }) {
    const styles = {
      approvedUpcoming: "bg-emerald-50 text-emerald-700 border border-emerald-100",
      pendingUpcoming: "bg-amber-50 text-amber-700 border border-amber-100",
      completed: "bg-slate-100 text-slate-700 border border-slate-200",
      rejected: "bg-red-50 text-red-700 border border-red-200",
    };

    const labels = {
      approvedUpcoming: "Admin approved",
      pendingUpcoming: "Awaiting admin approval",
      completed: "Completed",
      rejected: "Rejected",
    };

    return (
      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${styles[type]}`}>
        {labels[type]}
      </span>
    );
  }


  return (
    <div className="min-h-screen bg-[#F6F4FA] py-12">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-light text-[#2E2A36] mb-8">
          Your Profile
        </h1>

        {/* User Info + Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#3F2965]/10">
            <h2 className="text-lg font-medium text-[#2E2A36] mb-4">
              Account Details
            </h2>
            <p className="text-sm text-[#5E5A6B]"><span className="font-medium text-[#2E2A36]">Name:</span> {profile?.name}</p>
            <p className="text-sm text-[#5E5A6B]"><span className="font-medium text-[#2E2A36]">Email:</span> {profile?.email}</p>
            <p className="text-sm text-[#5E5A6B]"><span className="font-medium text-[#2E2A36]">Role:</span> {profile?.role || "user"}</p>
            <p className="text-sm text-[#5E5A6B] mt-2">
              <span className="font-medium text-[#2E2A36]">Member since:</span>{" "}
              {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "-"}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#3F2965]/10">
            <h2 className="text-lg font-medium text-[#2E2A36] mb-4">
              Session Overview
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-xl bg-[#3F2965]/5">
                <p className="text-xs text-[#5E5A6B]">Total Sessions</p>
                <p className="text-xl font-semibold text-[#2E2A36]">
                  {summary?.totalSessions ?? 0}
                </p>
              </div>
              {/* <div className="p-3 rounded-xl bg-[#3F2965]/5">
                <p className="text-xs text-[#5E5A6B]">Upcoming</p>
                <p className="text-xl font-semibold text-[#2E2A36]">
                  {summary?.upcomingSessions ?? 0}
                </p>
              </div> */}
              <div className="p-3 rounded-xl bg-[#3F2965]/5">
                <p className="text-xs text-[#5E5A6B]">Approved Upcoming</p>
                <p className="text-xl font-semibold text-[#2E2A36]">
                  {summary?.approvedUpcomingSessions ?? 0}
                </p>
              </div>
               <div className="p-3 rounded-xl bg-[#3F2965]/5">
                <p className="text-xs text-[#5E5A6B]">Pending Approval</p>
                <p className="text-xl font-semibold text-[#2E2A36]">
                  {summary?.pendingSessions ?? 0}
                </p>

              </div>
              <div className="p-3 rounded-xl bg-[#3F2965]/5">
                <p className="text-xs text-[#5E5A6B]">Completed</p>
                <p className="text-xl font-semibold text-[#2E2A36]">
                  {summary?.completedSessions ?? 0}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#3F2965]/5">
                <p className="text-xs text-[#5E5A6B]">Cancelled</p>
                <p className="text-xl font-semibold text-[#2E2A36]">
                  {summary?.cancelledSessions ?? 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Sessions (Approved)  */}
        <div className="mb-8">
          <h2 className="text-xl font-medium text-[#2E2A36] mb-4">
            Upcoming Sessions (Approved)
          </h2>
          {approvedUpcoming.length === 0 ? (
            <p className="text-sm text-[#5E5A6B] bg-white rounded-2xl p-4 border border-dashed border-[#3F2965]/20">
              You don&apos;t have any approved upcoming sessions. yet.
            </p>
          ) : (
            <div className="space-y-3">
              {approvedUpcoming.map((s) => (
                <div
                  key={s.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-[#3F2965]/10 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                >
                  <div>
                    <p className="text-sm font-medium text-[#2E2A36]">
                      {s.date ? new Date(s.date).toLocaleDateString() : "-"}
                    </p>
                    <p className="text-xs text-[#5E5A6B]">
                      {s.startTime} - {s.endTime} ({s.sessionType})
                      
                    </p>
                  </div>
                  {/* <StatusBadge type="approvedUpcoming" /> */}
                  <div className="flex items-center gap-3">
                    <StatusBadge type="approvedUpcoming" />

                    {/* 👉 VIEW DETAILS BUTTON */}
                    <button
                      onClick={() =>
                        router.push(`/appointment-status?id=${s.id}`)
                      }
                      className="px-3 py-1 rounded-full border border-[#3F2965] text-[#3F2965] text-xs hover:bg-[#3F2965]/10 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        

       {/* Upcoming Sessions (Pending Approval) */}
        <div className="mb-8">
          <h2 className="text-xl font-medium text-[#2E2A36] mb-4">
            Upcoming Sessions (Pending Approval)
          </h2>

          {pendingUpcoming.length === 0 ? (
            <p className="text-sm text-[#5E5A6B] bg-white rounded-2xl p-4 border border-dashed border-[#3F2965]/20">
              You don&apos;t have any pending approval sessions yet. 
            </p>
          ) : (
            <div className="space-y-3">
              {pendingUpcoming.map((s) => (
                <div
                  key={s.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-[#3F2965]/10"
                >
                  <div>
                  <p className="text-sm font-medium text-[#2E2A36]">
                    {s.date ? new Date(s.date).toLocaleDateString() : "-"}
                  </p>
                  <p className="text-xs text-[#5E5A6B]">
                   {s.startTime} - {s.endTime} ({s.sessionType})
                  </p>
                  </div>
                  {/* <StatusBadge type="pendingUpcoming" /> */}
                  <div className="flex items-center gap-3">
                    <StatusBadge type="pendingUpcoming" />

                    {/* 👉 VIEW DETAILS BUTTON */}
                    <button
                      onClick={() =>
                        router.push(`/appointment-status?id=${s.id}`)
                      }
                      className="px-3 py-1 rounded-full border border-amber-300 text-amber-700 text-xs hover:bg-amber-50 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>



        {/* Rejected Sessions */}
        <div className="mb-8">
          <h2 className="text-xl font-medium text-[#2E2A36] mb-4">
            Rejected Sessions
          </h2>
          {rejected.length === 0 ? (
            <p className="text-sm text-[#5E5A6B] bg-white rounded-2xl p-4 border border-dashed border-[#3F2965]/20">
              You don&apos;t have any rejected sessions.
            </p>
          ) : (
            <div className="space-y-3">
              {rejected.map((s) => (
                <div
                  key={s.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-[#3F2965]/10 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                >
                  <div>
                    <p className="text-sm font-medium text-[#2E2A36]">
                      {s.date ? new Date(s.date).toLocaleDateString() : "-"}
                    </p>
                    <p className="text-xs text-[#5E5A6B]">
                      {s.startTime} - {s.endTime} ({s.sessionType})
                    </p>
                    {s.rejectionReason && (
                    <p className="mt-1 text-xs text-red-600">
                      <span className="font-medium">Reason:</span> {s.rejectionReason}
                    </p>
                     )}
                  </div>
                  {/* <StatusBadge type="rejected" /> */}
                  <div className="flex flex-col items-end gap-2">
                    <StatusBadge type="rejected" />

                    <button
                      onClick={() => router.push(`/appointment-status?id=${s.id}`)}
                      className="px-4 py-1 rounded-full text-xs border border-red-300 text-red-700 hover:bg-red-50 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>


        {/* Completed Sessions */}
        <div>
          <h2 className="text-xl font-medium text-[#2E2A36] mb-4">
            Completed Sessions
          </h2>
          {completed.length === 0 ? (
            <p className="text-sm text-[#5E5A6B] bg-white rounded-2xl p-4 border border-dashed border-[#3F2965]/20">
              Completed sessions will appear here after they finish.
            </p>
          ) : (
            <div className="space-y-3">
              {completed.map((s) => (
                <div
                  key={s.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-[#3F2965]/10 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                >
                  <div>
                    <p className="text-sm font-medium text-[#2E2A36]">
                      {s.date ? new Date(s.date).toLocaleDateString() : "-"}
                    </p>
                    <p className="text-xs text-[#5E5A6B]">
                      {s.sessionType} session
                    </p>
                  </div>
                  <StatusBadge type="completed" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}