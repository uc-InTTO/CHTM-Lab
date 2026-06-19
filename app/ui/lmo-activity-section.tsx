"use client";

import { useState } from "react";
import type { BorrowActivity } from "../lib/data";

type Period = "Daily" | "Weekly" | "Monthly" | "Semester" | "All";

const periods: Period[] = ["Daily", "Weekly", "Monthly", "Semester", "All"];

export default function LmoActivitySection({
  activity,
}: {
  activity: BorrowActivity[];
}) {
  const [period, setPeriod] = useState<Period>("All");

  const visible = period === "All"
    ? activity
    : activity.filter((a) => a.period === period.toLowerCase());

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          <h2 className="text-sm font-bold text-gray-900">Recent Borrowing Activity</h2>
          <span className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#374151" }}>
            {activity.length}
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
          <p className="text-sm text-gray-400">No borrowing activity</p>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-t border-gray-100">
              <th className="px-5 py-2.5 text-left text-xs font-semibold text-gray-400 tracking-wider">BORROWER</th>
              <th className="px-5 py-2.5 text-left text-xs font-semibold text-gray-400 tracking-wider">STATION</th>
              <th className="px-5 py-2.5 text-left text-xs font-semibold text-gray-400 tracking-wider">DATE</th>
              <th className="px-5 py-2.5 text-right text-xs font-semibold text-gray-400 tracking-wider">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {visible.map((row) => (
              <tr key={row.id}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: "#6b7280" }}>
                      {row.borrower[0]}
                    </span>
                    <span className="text-sm text-gray-800">{row.borrower}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-sm" style={{ color: "#16a34a" }}>{row.station}</td>
                <td className="px-5 py-3 text-sm text-gray-500">{row.date}</td>
                <td className="px-5 py-3 text-right">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={
                      row.status === "active"
                        ? { backgroundColor: "#dbeafe", color: "#1d4ed8" }
                        : { backgroundColor: "#dcfce7", color: "#166534" }
                    }
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
