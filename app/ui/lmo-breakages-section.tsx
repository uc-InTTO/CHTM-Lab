"use client";

import { useState } from "react";
import type { BreakageItem } from "../lib/data";

type Period = "Daily" | "Weekly" | "Monthly" | "Semester" | "All";

const periods: Period[] = ["Daily", "Weekly", "Monthly", "Semester", "All"];

export default function LmoBreakagesSection({
  breakages,
}: {
  breakages: BreakageItem[];
}) {
  const [period, setPeriod] = useState<Period>("All");

  const visible = period === "All"
    ? breakages
    : breakages.filter((b) => b.period === period.toLowerCase());

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="4.93" x2="19.07" y1="4.93" y2="19.07"/>
          </svg>
          <h2 className="text-sm font-bold text-gray-900">Pending Breakages</h2>
          <span className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#374151" }}>
            {breakages.length}
          </span>
        </div>
        <a href="#" className="text-xs font-medium" style={{ color: "#16a34a" }}>View all &rsaquo;</a>
      </div>

      <div className="flex items-center gap-2 px-5 pb-3">
        {periods.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
            style={
              period === p
                ? { backgroundColor: "#111827", color: "#fff" }
                : { backgroundColor: "#f3f4f6", color: "#6b7280" }
            }
          >
            {p}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="flex items-center justify-center py-12 border-t border-gray-100">
          <p className="text-sm text-gray-400">No pending breakages</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {visible.map((b) => (
            <div key={b.id} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-sm font-medium text-gray-900">{b.item} × {b.quantity}</p>
                <p className="text-xs text-gray-400 mt-0.5">{b.student} · {b.date}</p>
              </div>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={
                  b.status === "unreturned"
                    ? { backgroundColor: "#fef9c3", color: "#854d0e" }
                    : { backgroundColor: "#dcfce7", color: "#166534" }
                }
              >
                {b.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
