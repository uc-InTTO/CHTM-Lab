"use client";

import { useState } from "react";
import type { BreakageStats, BreakageReport } from "../lib/data";

type SubTab = "report" | "unreturned" | "all";
type FilterType = "all" | "broken" | "missing_replacement" | "missing_paid" | "damaged" | "unreturned";

function WarningIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <path d="M12 9v4"/><path d="M12 17h.01"/>
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}

const FILTER_LABELS: { key: FilterType; label: string }[] = [
  { key: "all", label: "All Types" },
  { key: "broken", label: "Broken" },
  { key: "missing_replacement", label: "Missing (Replacement)" },
  { key: "missing_paid", label: "Missing (Paid)" },
  { key: "damaged", label: "Damaged" },
  { key: "unreturned", label: "Unreturned" },
];

const SUB_TAB_LABELS: Record<SubTab, string> = {
  report: "Report Breakage",
  unreturned: "Unreturned Items",
  all: "All Reports",
};

export default function BreakagesPanel({
  stats,
  reports,
}: {
  stats: BreakageStats;
  reports: BreakageReport[];
}) {
  const [subTab, setSubTab] = useState<SubTab>("report");
  const [filter, setFilter] = useState<FilterType>("all");
  const [qty, setQty] = useState(1);
  const [damageType, setDamageType] = useState("Broken");

  const unreturnedCount = reports.filter((r) => r.damageType === "unreturned").length;

  const filterCount = (key: FilterType) =>
    key === "all" ? reports.length : reports.filter((r) => r.damageType === key).length;

  const visible =
    subTab === "unreturned"
      ? reports.filter((r) => r.damageType === "unreturned")
      : filter === "all"
      ? reports
      : reports.filter((r) => r.damageType === filter);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: "Pending", value: stats.pending, color: "#f97316" },
          { label: "Assessed", value: stats.assessed, color: "#111827" },
          { label: "Charged", value: stats.charged, color: "#111827" },
          { label: "Resolved", value: stats.resolved, color: "#111827" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl px-5 py-4">
            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {FILTER_LABELS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
            style={
              filter === f.key
                ? { backgroundColor: "#16a34a", color: "#fff" }
                : { backgroundColor: "#fff", color: "#374151", border: "1px solid #e5e7eb" }
            }
          >
            {f.label} ({filterCount(f.key)})
          </button>
        ))}
      </div>

      <div className="flex gap-1 mb-5">
        {(["report", "unreturned", "all"] as SubTab[]).map((t) => (
          <button
            key={t}
            onClick={() => setSubTab(t)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-colors"
            style={
              subTab === t
                ? { backgroundColor: "#fff", color: "#111827", fontWeight: 600, border: "1px solid #d1d5db" }
                : { color: "#6b7280" }
            }
          >
            {SUB_TAB_LABELS[t]}
            {t === "unreturned" && unreturnedCount > 0 && (
              <span
                className="flex items-center justify-center w-4 h-4 rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: "#ef4444" }}
              >
                {unreturnedCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {subTab === "report" ? (
        <div className="flex gap-5">
          <div className="flex-1 bg-white rounded-2xl px-6 py-5">
            <div className="flex items-center gap-2 mb-5">
              <span style={{ color: "#f59e0b" }}><WarningIcon /></span>
              <p className="text-sm font-bold text-gray-900">Report Breakage / Damage</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Control No. (Optional)</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400"
                  placeholder="Auto-fill from record"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Station</label>
                <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400 bg-white">
                  <option value="">Station</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Student Name</label>
                <input className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">ID No.</label>
                <input className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400" />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs text-gray-500 mb-1">Item Description</label>
              <input className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Damage Type</label>
                <select
                  value={damageType}
                  onChange={(e) => setDamageType(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400 bg-white"
                >
                  <option>Broken</option>
                  <option>Missing (Replacement)</option>
                  <option>Missing (Paid)</option>
                  <option>Damaged</option>
                  <option>Unreturned</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Quantity</label>
                <div className="flex items-center gap-3 mt-1">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 text-base hover:bg-gray-50 transition-colors"
                  >
                    −
                  </button>
                  <span className="text-sm font-medium text-gray-800 w-4 text-center">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-base"
                    style={{ backgroundColor: "#16a34a" }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Amount (₱)</label>
                <input
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400"
                  defaultValue="0.00"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Official Receipt No.</label>
                <input className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400" />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-xs text-gray-500 mb-1">Description / Remarks</label>
              <textarea
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400 resize-none"
                rows={3}
              />
            </div>

            <button
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white"
              style={{ backgroundColor: "#16a34a" }}
            >
              <SendIcon />
              Submit Report
            </button>
          </div>

          <div className="w-72 shrink-0">
            <p className="text-sm font-semibold text-gray-900 mb-3">Recent Reports</p>
            {reports.length === 0 ? (
              <div className="bg-white rounded-2xl flex items-center justify-center py-14">
                <p className="text-xs text-gray-400">No recent reports</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {reports.slice(0, 6).map((r) => (
                  <div key={r.id} className="bg-white rounded-2xl px-4 py-3">
                    <div className="flex items-start justify-between mb-0.5">
                      <p className="text-sm font-medium text-gray-900">{r.itemName} × {r.qty}</p>
                      <span className="text-gray-400 mt-0.5"><ChevronDownIcon /></span>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{r.student} · {r.studentId}</p>
                    {r.amount > 0 && (
                      <p className="text-xs font-semibold text-gray-700 mb-2">₱{r.amount.toFixed(2)}</p>
                    )}
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: "#ede9fe", color: "#7c3aed" }}>
                        Unreturned
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: "#dcfce7", color: "#16a34a" }}>
                        {r.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl">
          {visible.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <p className="text-sm text-gray-400">
                {subTab === "unreturned" ? "No unreturned items" : "No reports"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {visible.map((r) => (
                <div key={r.id} className="px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{r.itemName} × {r.qty}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{r.student} · {r.studentId}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: "#ede9fe", color: "#7c3aed" }}>
                      {r.damageType.replace("_", " ")}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: "#dcfce7", color: "#16a34a" }}>
                      {r.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
