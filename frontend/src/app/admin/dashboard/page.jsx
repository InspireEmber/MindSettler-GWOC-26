"use client";

import { useEffect, useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/stats/overview`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to load stats");
        const data = await res.json();
        if (cancelled) return;
        setStats(data.data || null);
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load stats");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <div className="text-[#5E5A6B]">Loading stats...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-sm">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-light text-[#2E2A36]">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Total Appointments" value={stats?.totalAppointments} />
        <StatCard label="Completed" value={stats?.completedAppointments} />
        <StatCard label="Upcoming" value={stats?.upcomingAppointments} />
        <StatCard label="Total Users" value={stats?.totalUsers} />
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#3F2965]/10">
      <p className="text-xs text-[#5E5A6B] mb-1">{label}</p>
      <p className="text-2xl font-semibold text-[#2E2A36]">
        {value ?? 0}
      </p>
    </div>
  );
}