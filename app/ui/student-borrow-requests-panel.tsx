"use client";

import { useState } from "react";
import type { StudentBorrowRequest } from "../lib/data";

type Tab = "Pending" | "Approved" | "Received";

const tabColors: Record<Tab, { active: string; badge: string; badgeText: string }> = {
  Pending:  { active: "#f59e0b", badge: "#fef3c7", badgeText: "#92400e" },
  Approved: { active: "#16a34a", badge: "#dcfce7", badgeText: "#166534" },
  Received: { active: "#3b82f6", badge: "#dbeafe", badgeText: "#1d4ed8" },
};

export default function StudentBorrowRequestsPanel({ requests }: { requests: StudentBorrowRequest[] }) {
  const [tab, setTab] = useState<Tab>("Pending");

  const counts: Record<Tab, number> = {
    Pending:  requests.filter((r) => r.status === "Pending").length,
    Approved: requests.filter((r) => r.status === "Approved").length,
    Received: requests.filter((r) => r.status === "Received").length,
  };

  const visible = requests.filter((r) => r.status === tab);
  const total = requests.length;

  return (
    <div className="bg-white rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          </svg>
          <h3 className="font-semibold text-sm text-gray-800">My Borrow Requests</h3>
          <span
            className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
            style={{ backgroundColor: "#f3f4f6", color: "#374151" }}
          >
            {total}
          </span>
        </div>
        <a href="#" className="text-xs text-gray-400 hover:text-gray-600">View all &rsaquo;</a>
      </div>

      <div className="flex items-center gap-2 mb-4">
        {(["Pending", "Approved", "Received"] as Tab[]).map((t) => {
          const isActive = tab === t;
          const c = tabColors[t];
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
              style={
                isActive
                  ? { backgroundColor: c.active, color: "#fff" }
                  : { backgroundColor: "#f3f4f6", color: "#6b7280" }
              }
            >
              {t}
              <span
                className="flex items-center justify-center w-4 h-4 rounded-full text-xs font-bold"
                style={
                  isActive
                    ? { backgroundColor: "rgba(255,255,255,0.25)", color: "#fff" }
                    : { backgroundColor: "#e5e7eb", color: "#374151" }
                }
              >
                {counts[t]}
              </span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm text-gray-400">No {tab.toLowerCase()} requests</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {visible.map((r) => (
            <div key={r.id} className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ backgroundColor: "#f9fafb" }}>
              <div>
                <p className="text-sm font-semibold text-gray-900">#{r.controlNo}</p>
                <p className="text-xs text-gray-400 mt-0.5">{r.itemCount} item(s) · {r.submittedAt}</p>
              </div>
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                style={{ backgroundColor: tabColors[r.status].badge, color: tabColors[r.status].badgeText }}
              >
                {r.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
