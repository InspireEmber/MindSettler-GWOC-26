"use client";

import { useEffect, useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminSlotsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [slots, setSlots] = useState([]);

  const [weekStartDate, setWeekStartDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("17:00");
  const [duration, setDuration] = useState(60);
  const [sessionMode, setSessionMode] = useState("both");
  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const [filterDate, setFilterDate] = useState("");
  const [filterType, setFilterType] = useState("all");

  async function loadSlots({ date, sessionType } = {}) {
    const params = new URLSearchParams();
    if (date) params.set("date", date);
    if (sessionType && sessionType !== "all") params.set("sessionType", sessionType);

    const query = params.toString();
    const url = query ? `${API_BASE_URL}/slots?${query}` : `${API_BASE_URL}/slots`;

    const res = await fetch(url, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to load slots");
    const data = await res.json();
    setSlots(data.data || []);
  }

  useEffect(() => {
    let cancelled = false;

    async function initialLoad() {
      try {
        await loadSlots();
      } catch (e) {
        if (!cancelled) setError(e.message || "Failed to load slots");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    initialLoad();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleGenerate(e) {
    e.preventDefault();
    setFormMessage("");
    setSubmitting(true);
    try {
      if (!weekStartDate) {
        throw new Error("Please select a week start date");
      }
      const sessionTypes =
        sessionMode === "both"
          ? ["online", "offline"]
          : sessionMode === "online"
          ? ["online"]
          : ["offline"];

      const res = await fetch(`${API_BASE_URL}/slots/generate-week`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weekStartDate,
          startTime,
          endTime,
          slotDurationMinutes: Number(duration),
          sessionTypes,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || "Failed to generate weekly slots");
      }
      setFormMessage(
        `Generated ${data.createdCount ?? 0} slots, skipped ${data.skippedCount ?? 0} existing.`,
      );
      // Refresh slots list with current filters
      try {
        await loadSlots({
          date: filterDate || undefined,
          sessionType: filterType || undefined,
        });
      } catch (e) {
        // ignore here; main form message already set
      }
    } catch (err) {
      setFormMessage(err.message || "Failed to generate weekly slots");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div className="text-[#5E5A6B]">Loading slots...</div>;
  if (error) return <div className="text-red-600 text-sm">{error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-light text-[#2E2A36]">Slots</h1>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#3F2965]/10 mb-2 text-xs md:text-sm flex flex-col md:flex-row md:items-end gap-3">
        <div>
          <label className="block text-xs font-medium text-[#2E2A36] mb-1">
            Filter by date
          </label>
          <input
            type="date"
            value={filterDate}
            onChange={async (e) => {
              const value = e.target.value;
              setFilterDate(value);
              setLoading(true);
              setError("");
              try {
                await loadSlots({
                  date: value || undefined,
                  sessionType: filterType || undefined,
                });
              } catch (err) {
                setError(err.message || "Failed to load slots");
              } finally {
                setLoading(false);
              }
            }}
            className="w-full px-3 py-2 rounded-lg border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[#2E2A36] mb-1">
            Session type
          </label>
          <select
            value={filterType}
            onChange={async (e) => {
              const value = e.target.value;
              setFilterType(value);
              setLoading(true);
              setError("");
              try {
                await loadSlots({
                  date: filterDate || undefined,
                  sessionType: value || undefined,
                });
              } catch (err) {
                setError(err.message || "Failed to load slots");
              } finally {
                setLoading(false);
              }
            }}
            className="w-full px-3 py-2 rounded-lg border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none bg-white"
          >
            <option value="all">All</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>

      {/* Weekly Slot Generator Form */}
      <form
        onSubmit={handleGenerate}
        className="bg-white rounded-2xl p-4 shadow-sm border border-[#3F2965]/10 space-y-4 text-sm"
      >
        <h2 className="text-base font-medium text-[#2E2A36]">
          Weekly Slot Generator
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#2E2A36] mb-1">
              Week start date
            </label>
            <input
              type="date"
              value={weekStartDate}
              onChange={(e) => setWeekStartDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#2E2A36] mb-1">
              Daily start time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#2E2A36] mb-1">
              Daily end time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#2E2A36] mb-1">
              Slot duration (minutes)
            </label>
            <input
              type="number"
              min={15}
              max={480}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#2E2A36] mb-1">
              Session types
            </label>
            <select
              value={sessionMode}
              onChange={(e) => setSessionMode(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none bg-white"
            >
              <option value="online">Online only</option>
              <option value="offline">Offline only</option>
              <option value="both">Online & Offline</option>
            </select>
          </div>
        </div>
        {formMessage && (
          <p className="text-xs text-[#5E5A6B]">{formMessage}</p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded-full bg-[#3F2965] text-white text-xs font-medium hover:bg-[#3F2965]/90 disabled:opacity-60"
        >
          {submitting ? "Generating..." : "Generate Weekly Slots"}
        </button>
      </form>

      <div className="space-y-3 text-xs text-[#5E5A6B]">
        {slots.map((s) => (
          <div
            key={s._id}
            className="bg-white rounded-2xl p-4 shadow-sm border border-[#3F2965]/10 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
          >
            <div>
              <p className="font-medium text-[#2E2A36]">
                {s.date ? new Date(s.date).toLocaleDateString() : "-"}  b7 {s.startTime} - {s.endTime}
              </p>
              <p>
                {s.sessionType}  b7 {s.isBooked ? "Booked" : s.isAvailable ? "Available" : "Unavailable"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}