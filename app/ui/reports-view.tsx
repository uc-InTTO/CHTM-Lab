"use client";

import { useState } from "react";
import type { ReportSummary, ReportRecord } from "../lib/data";

type Period = "daily" | "weekly" | "monthly" | "semester" | "yearly";
type ContentTab = "borrowings" | "breakages" | "waste";

function ClipboardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <path d="m9 11 3 3L22 4"/>
    </svg>
  );
}

function TriangleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <path d="M12 9v4"/><path d="M12 17h.01"/>
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
    </svg>
  );
}

function PrinterIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
      <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/>
      <rect width="12" height="8" x="6" y="14" rx="1"/>
    </svg>
  );
}

const PERIOD_LABELS: Record<Period, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  semester: "Semester",
  yearly: "Yearly",
};

export default function ReportsView({
  summary,
  records,
}: {
  summary: ReportSummary;
  records: ReportRecord[];
}) {
  const [period, setPeriod] = useState<Period>("daily");
  const [contentTab, setContentTab] = useState<ContentTab>("borrowings");
  const [dateStr, setDateStr] = useState(() => new Date().toISOString().split("T")[0]);

  const periodLabel = period === "daily"
    ? `Daily Report — ${dateStr}`
    : period === "weekly"
    ? `Weekly Report`
    : period === "monthly"
    ? `Monthly Report`
    : period === "semester"
    ? `Semester Report`
    : `Yearly Report`;

  return (
    <div>
      <div className="bg-white rounded-2xl overflow-hidden mb-5">
        <div className="flex border-b border-gray-100">
          {(["daily", "weekly", "monthly", "semester", "yearly"] as Period[]).map((p, i) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="flex-1 py-3 text-sm font-medium transition-colors"
              style={{
                color: period === p ? "#111827" : "#9ca3af",
                borderBottom: period === p ? "2px solid #111827" : "2px solid transparent",
                borderRight: i < 4 ? "1px solid #f3f4f6" : "none",
              }}
            >
              {PERIOD_LABELS[p]}
            </button>
          ))}
        </div>

        <div className="px-5 py-4">
          {(period === "daily" || period === "weekly" || period === "monthly") && (
            <input
              type="date"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-gray-400 mb-4"
            />
          )}

          <div
            className="flex items-center justify-between px-4 py-2.5 rounded-xl mb-4"
            style={{ backgroundColor: "#eff6ff", borderLeft: "3px solid #3b82f6" }}
          >
            <p className="text-sm font-semibold text-gray-800">{periodLabel}</p>
            <p className="text-xs text-gray-500">
              {summary.borrowings} borrowings · {summary.breakages} breakages · {summary.wasteLogs} waste logs
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4">
            <div className="rounded-xl px-4 py-3" style={{ backgroundColor: "#eff6ff" }}>
              <div className="flex items-center gap-2 mb-1" style={{ color: "#3b82f6" }}>
                <ClipboardIcon />
                <p className="text-xs font-medium">Borrowings</p>
              </div>
              <p className="text-2xl font-bold" style={{ color: "#1d4ed8" }}>{summary.borrowings}</p>
            </div>
            <div className="rounded-xl px-4 py-3" style={{ backgroundColor: "#f0fdf4" }}>
              <div className="flex items-center gap-2 mb-1" style={{ color: "#16a34a" }}>
                <CheckCircleIcon />
                <p className="text-xs font-medium">Returned</p>
              </div>
              <p className="text-2xl font-bold" style={{ color: "#15803d" }}>{summary.returned}</p>
            </div>
            <div className="rounded-xl px-4 py-3" style={{ backgroundColor: "#fff7ed" }}>
              <div className="flex items-center gap-2 mb-1" style={{ color: "#f97316" }}>
                <TriangleIcon />
                <p className="text-xs font-medium">Breakages</p>
              </div>
              <p className="text-2xl font-bold" style={{ color: "#c2410c" }}>{summary.breakages}</p>
            </div>
            <div className="rounded-xl px-4 py-3" style={{ backgroundColor: "#fefce8" }}>
              <div className="flex items-center gap-2 mb-1" style={{ color: "#d97706" }}>
                <TrashIcon />
                <p className="text-xs font-medium">Waste Logs</p>
              </div>
              <p className="text-2xl font-bold" style={{ color: "#b45309" }}>{summary.wasteLogs}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden mb-4">
        <div className="flex border-b border-gray-100">
          {([
            { key: "borrowings" as ContentTab, label: `Borrowings (${summary.borrowings})`, icon: <ClipboardIcon /> },
            { key: "breakages" as ContentTab, label: `Breakages (${summary.breakages})`, icon: <TriangleIcon /> },
            { key: "waste" as ContentTab, label: `Waste (${summary.wasteLogs})`, icon: <TrashIcon /> },
          ]).map((t, i) => (
            <button
              key={t.key}
              onClick={() => setContentTab(t.key)}
              className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors"
              style={{
                color: contentTab === t.key ? "#111827" : "#9ca3af",
                borderBottom: contentTab === t.key ? "2px solid #111827" : "2px solid transparent",
                borderRight: i < 2 ? "1px solid #f3f4f6" : "none",
              }}
            >
              {t.icon}{t.label}
            </button>
          ))}
        </div>
      </div>

      {contentTab === "borrowings" && (
        records.length === 0 ? (
          <div className="bg-white rounded-2xl flex items-center justify-center py-16">
            <p className="text-sm text-gray-400">No borrowing records for this period</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {records.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Control Number</p>
                    <p className="text-base font-bold" style={{ color: "#16a34a" }}>#{r.controlNo}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={r.status === "active" ? { backgroundColor: "#fef3c7", color: "#d97706" } : { backgroundColor: "#dcfce7", color: "#15803d" }}
                    >
                      {r.status === "active" ? "Active" : "Returned"}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors"><PrinterIcon /></button>
                  </div>
                </div>

                <div className="px-5 py-4">
                  <div className="grid grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Student</p>
                      <p className="text-sm font-semibold text-gray-800">{r.student}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">ID No.</p>
                      <p className="text-sm font-semibold text-gray-800">{r.studentId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Station</p>
                      <p className="text-sm font-semibold text-gray-800">{r.station}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Date</p>
                      <p className="text-sm font-semibold text-gray-800">{r.date}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Course</p>
                      <p className="text-sm font-semibold text-gray-800">{r.course || "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Section</p>
                      <p className="text-sm font-semibold text-gray-800">{r.section}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Instructor</p>
                      <p className="text-sm font-semibold text-gray-800">{r.instructor}</p>
                    </div>
                  </div>

                  <table className="w-full text-sm border border-gray-100 rounded-xl overflow-hidden">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-2 text-xs font-medium text-gray-500">ITEM</th>
                        <th className="text-right px-4 py-2 text-xs font-medium text-gray-500">ISSUED</th>
                        <th className="text-right px-4 py-2 text-xs font-medium text-gray-500">RETURNED</th>
                        <th className="text-right px-4 py-2 text-xs font-medium text-gray-500">UNIT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {r.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-2.5 text-gray-800">{item.name}</td>
                          <td className="px-4 py-2.5 text-right text-gray-700">{item.issued}</td>
                          <td className="px-4 py-2.5 text-right text-gray-700">{item.returned}</td>
                          <td className="px-4 py-2.5 text-right text-gray-500">{item.unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {contentTab !== "borrowings" && (
        <div className="bg-white rounded-2xl flex items-center justify-center py-16">
          <p className="text-sm text-gray-400">No {contentTab} for this period</p>
        </div>
      )}
    </div>
  );
}
