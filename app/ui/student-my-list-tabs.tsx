"use client";

import { useState } from "react";
import type { StudentBorrowing, StudentBreakage } from "../lib/data";

type Tab = "Active" | "Returned" | "Requests" | "Breakages";

const tabColors: Record<Tab, { active: string; badge: string; badgeText: string }> = {
  Active:    { active: "#3b82f6",  badge: "#dbeafe", badgeText: "#1d4ed8" },
  Returned:  { active: "#16a34a",  badge: "#dcfce7", badgeText: "#166534" },
  Requests:  { active: "#7c3aed",  badge: "#f3e8ff", badgeText: "#6d28d9" },
  Breakages: { active: "#f59e0b",  badge: "#fef3c7", badgeText: "#92400e" },
};

function BoxIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

export default function StudentMyListTabs({
  borrowings,
  breakages,
}: {
  borrowings: StudentBorrowing[];
  breakages: StudentBreakage[];
}) {
  const [tab, setTab] = useState<Tab>("Active");

  const counts: Record<Tab, number> = {
    Active:    borrowings.filter((b) => b.status === "active").length,
    Returned:  borrowings.filter((b) => b.status === "returned").length,
    Requests:  borrowings.filter((b) => b.status === "requested").length,
    Breakages: breakages.length,
  };

  const visibleBorrowings = borrowings.filter((b) => {
    if (tab === "Active") return b.status === "active";
    if (tab === "Returned") return b.status === "returned";
    if (tab === "Requests") return b.status === "requested";
    return false;
  });

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {(["Active", "Returned", "Requests", "Breakages"] as Tab[]).map((t) => {
          const isActive = tab === t;
          const c = tabColors[t];
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors"
              style={
                isActive
                  ? { backgroundColor: c.active, color: "#fff" }
                  : { backgroundColor: "#fff", color: c.active, border: "1px solid #e5e7eb" }
              }
            >
              {t}
              <span
                className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
                style={
                  isActive
                    ? { backgroundColor: "rgba(255,255,255,0.25)", color: "#fff" }
                    : { backgroundColor: c.badge, color: c.badgeText }
                }
              >
                {counts[t]}
              </span>
            </button>
          );
        })}
      </div>

      {tab === "Breakages" ? (
        <div className="bg-white rounded-2xl">
          {breakages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <BoxIcon />
              <p className="text-sm text-gray-400">No breakage records</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {breakages.map((b) => (
                <div key={b.id} className="px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{b.itemName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Qty: {b.qty} · {b.date}</p>
                  </div>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: b.status === "resolved" ? "#dcfce7" : "#fef3c7",
                      color: b.status === "resolved" ? "#166534" : "#92400e",
                    }}
                  >
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {visibleBorrowings.length === 0 ? (
            <div className="bg-white rounded-2xl flex flex-col items-center justify-center py-16 gap-3">
              <BoxIcon />
              <p className="text-sm text-gray-400">No {tab.toLowerCase()} records</p>
            </div>
          ) : (
            visibleBorrowings.map((b) => {
              const c = tab === "Active" ? tabColors.Active : tab === "Returned" ? tabColors.Returned : tabColors.Requests;
              return (
                <div key={b.id} className="bg-white rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-bold" style={{ color: "#16a34a" }}>#{b.controlNo}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{b.date}</p>
                      <p className="text-xs text-gray-600 mt-1">{b.section}</p>
                      <p className="text-xs text-gray-500">Instructor: {b.instructor}</p>
                      <p className="text-xs text-gray-500">{b.floor} · {b.station}</p>
                    </div>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{ backgroundColor: c.badge, color: c.badgeText }}
                    >
                      {b.status}
                    </span>
                  </div>

                  {b.items.length > 0 && (
                    <div className="mt-3 border-t border-gray-100 pt-3">
                      <p className="text-xs font-semibold text-gray-400 tracking-wider mb-2">ITEMS</p>
                      <div className="flex flex-col gap-1.5">
                        {b.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <p className="text-sm text-gray-800">{item.name}</p>
                            <p className="text-xs text-gray-500">Issued: {item.issued} {item.unit}</p>
                          </div>
                        ))}
                        {b.items[0]?.timeIn && (
                          <p className="text-xs mt-1" style={{ color: "#16a34a" }}>
                            Time In: {b.items[0].timeIn}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
