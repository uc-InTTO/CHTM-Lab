"use client";

import { useState } from "react";
import type { HistoryBorrowing, HistoryBreakage, HistoryStationLog, HistoryWasteLog } from "../lib/data";

type TimePeriod = "all" | "today" | "week" | "month";
type TypeTab = "borrowings" | "breakages" | "stations" | "waste";

function FileIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  );
}

function TriangleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <path d="M12 9v4"/><path d="M12 17h.01"/>
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/>
      <line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
  );
}

const TIME_PERIODS: { key: TimePeriod; label: string }[] = [
  { key: "all", label: "All Time" },
  { key: "today", label: "Today" },
  { key: "week", label: "Week" },
  { key: "month", label: "Month" },
];

export default function HistoryView({
  borrowings,
  breakages,
  stationLogs,
  wasteLogs,
}: {
  borrowings: HistoryBorrowing[];
  breakages: HistoryBreakage[];
  stationLogs: HistoryStationLog[];
  wasteLogs: HistoryWasteLog[];
}) {
  const [search, setSearch] = useState("");
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("all");
  const [typeTab, setTypeTab] = useState<TypeTab>("borrowings");

  const typeTabs: { key: TypeTab; label: string; count: number; icon: React.ReactNode }[] = [
    { key: "borrowings", label: "Borrowings", count: borrowings.length, icon: <FileIcon /> },
    { key: "breakages", label: "Breakages", count: breakages.length, icon: <TriangleIcon /> },
    { key: "stations", label: "Station Logs", count: stationLogs.length, icon: <MapPinIcon /> },
    { key: "waste", label: "Waste Logs", count: wasteLogs.length, icon: <TrashIcon /> },
  ];

  const filteredBorrowings = borrowings.filter((b) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      b.student.toLowerCase().includes(q) ||
      b.controlNo.toLowerCase().includes(q) ||
      b.station.toLowerCase().includes(q) ||
      b.section.toLowerCase().includes(q)
    );
  });

  const filteredBreakages = breakages.filter((b) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return b.student.toLowerCase().includes(q) || b.itemName.toLowerCase().includes(q);
  });

  const filteredStationLogs = stationLogs.filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return s.station.toLowerCase().includes(q) || s.instructor.toLowerCase().includes(q);
  });

  const filteredWasteLogs = wasteLogs.filter((w) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return w.section.toLowerCase().includes(q) || w.course.toLowerCase().includes(q);
  });

  return (
    <div>
      <div className="mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-400"
          placeholder="Search by name, ID, control no., station..."
        />
      </div>

      <div className="flex gap-2 mb-4">
        {TIME_PERIODS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTimePeriod(t.key)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
            style={
              timePeriod === t.key
                ? { backgroundColor: "#16a34a", color: "#fff" }
                : { backgroundColor: "#fff", color: "#374151", border: "1px solid #e5e7eb" }
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl overflow-hidden mb-4 flex">
        {typeTabs.map((t, i) => (
          <button
            key={t.key}
            onClick={() => setTypeTab(t.key)}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors"
            style={{
              color: typeTab === t.key ? "#111827" : "#9ca3af",
              borderBottom: typeTab === t.key ? "2px solid #111827" : "2px solid transparent",
              borderRight: i < typeTabs.length - 1 ? "1px solid #f3f4f6" : "none",
            }}
          >
            {t.icon} {t.label} ({t.count})
          </button>
        ))}
      </div>

      {typeTab === "borrowings" && (
        filteredBorrowings.length === 0 ? (
          <div className="bg-white rounded-2xl flex items-center justify-center py-16">
            <p className="text-sm text-gray-400">No borrowing records</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredBorrowings.map((b) => (
              <div key={b.id} className="bg-white rounded-2xl px-5 py-4">
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{ backgroundColor: "#dcfce7", color: "#15803d" }}
                  >
                    {b.student.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{b.student}</p>
                    <p className="text-xs text-gray-400">
                      #{b.controlNo}{b.station ? ` · ${b.station}` : ""}{b.section ? ` · ${b.section}` : ""}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {b.items.map((it, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-full text-xs text-gray-600"
                          style={{ backgroundColor: "#f3f4f6" }}
                        >
                          {it.name} ×{it.qty}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-medium text-gray-700 mb-0.5">{b.instructor}</p>
                    <div className="flex items-center justify-end gap-1 text-xs text-gray-400 mb-0.5">
                      <CalendarIcon />
                      <span>{b.date}</span>
                    </div>
                    <p className="text-xs text-gray-400">In: {b.timeIn}</p>
                    {b.timeOut && (
                      <p className="text-xs" style={{ color: "#3b82f6" }}>Out: {b.timeOut}</p>
                    )}
                    <span
                      className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={
                        b.status === "active"
                          ? { backgroundColor: "#dbeafe", color: "#1d4ed8" }
                          : { backgroundColor: "#dcfce7", color: "#15803d" }
                      }
                    >
                      {b.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {typeTab === "breakages" && (
        filteredBreakages.length === 0 ? (
          <div className="bg-white rounded-2xl flex items-center justify-center py-16">
            <p className="text-sm text-gray-400">No breakage records</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredBreakages.map((b) => (
              <div key={b.id} className="bg-white rounded-2xl px-5 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{b.itemName} × {b.qty}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{b.student} · {b.damageType}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-1">{b.date}</p>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: "#ede9fe", color: "#7c3aed" }}>
                      {b.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {typeTab === "stations" && (
        filteredStationLogs.length === 0 ? (
          <div className="bg-white rounded-2xl flex items-center justify-center py-16">
            <p className="text-sm text-gray-400">No station log records</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredStationLogs.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl px-5 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{s.station}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.floor} · {s.instructor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-0.5">{s.date}</p>
                    <p className="text-xs text-gray-400">In: {s.timeStart}</p>
                    {s.timeEnd && <p className="text-xs" style={{ color: "#3b82f6" }}>Out: {s.timeEnd}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {typeTab === "waste" && (
        filteredWasteLogs.length === 0 ? (
          <div className="bg-white rounded-2xl flex items-center justify-center py-16">
            <p className="text-sm text-gray-400">No waste log records</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredWasteLogs.map((w) => (
              <div key={w.id} className="bg-white rounded-2xl px-5 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{w.section}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{w.course} · {w.date}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span style={{ color: "#16a34a" }}>{w.biodegKg} kg</span>
                    <span style={{ color: "#f97316" }}>{w.nonBiodegKg} kg</span>
                    <span style={{ color: "#3b82f6" }}>{w.usedOilKg} kg</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
