"use client";

import { useState } from "react";
import type { NonChtmBorrowing } from "../lib/data";

type Tab = "status" | "calendar" | "all";

function FileIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

export default function NonChtmBorrowTabs({
  borrowings,
}: {
  borrowings: NonChtmBorrowing[];
}) {
  const [tab, setTab] = useState<Tab>("status");

  const pending = borrowings.filter((b) => b.status === "pending");
  const visible = tab === "status" ? pending : tab === "all" ? borrowings : [];

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: "status", label: "Status", count: pending.length },
    { key: "calendar", label: "Calendar" },
    { key: "all", label: "All Records", count: borrowings.length },
  ];

  return (
    <div>
      <div className="bg-white rounded-2xl overflow-hidden mb-4 flex">
        {tabs.map((t, i) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="flex-1 py-3 text-sm font-medium transition-colors"
            style={{
              color: tab === t.key ? "#111827" : "#9ca3af",
              borderBottom: tab === t.key ? "2px solid #111827" : "2px solid transparent",
              borderRight: i < tabs.length - 1 ? "1px solid #f3f4f6" : "none",
            }}
          >
            {t.label}
            {t.count !== undefined && ` (${t.count})`}
          </button>
        ))}
      </div>

      {tab === "calendar" ? (
        <div className="bg-white rounded-2xl flex items-center justify-center py-20">
          <p className="text-sm text-gray-400">Calendar view coming soon</p>
        </div>
      ) : visible.length === 0 ? (
        <div className="bg-white rounded-2xl flex items-center justify-center py-20">
          <p className="text-sm text-gray-400">No records</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {visible.map((b) => (
            <div key={b.id} className="bg-white rounded-2xl px-5 py-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-bold" style={{ color: "#16a34a" }}>#{b.controlNo}</p>
                <div className="flex items-center gap-2">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium border"
                    style={{ borderColor: "#d1d5db", color: "#6b7280" }}
                  >
                    {b.status}
                  </span>
                  <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-gray-200 text-xs text-gray-500 hover:bg-gray-50 transition-colors">
                    <FileIcon />
                    Letter
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                {b.student} · {b.college}
              </p>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Borrow Date</p>
                  <p className="text-sm font-medium text-gray-800">{b.borrowDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Return Date</p>
                  <p className="text-sm font-medium" style={{ color: "#f97316" }}>{b.returnDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Items</p>
                  <p className="text-sm font-medium text-gray-800">{b.itemTypes} type(s)</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Contact</p>
                  <p className="text-sm font-medium text-gray-800">{b.contact}</p>
                </div>
              </div>

              <button className="px-4 py-1.5 rounded-lg border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Approve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
