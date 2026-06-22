"use client";

import { useState } from "react";
import type { MyListRecord } from "../lib/data";

type Tab = "Active" | "Returned" | "Requests";

const tabConfig: Record<Tab, { activeColor: string; textColor: string; badgeBg: string; badgeColor: string; filterStatus: MyListRecord["status"] }> = {
  Active:   { activeColor: "#3b82f6", textColor: "#3b82f6",  badgeBg: "#dbeafe", badgeColor: "#2563eb", filterStatus: "Active" },
  Returned: { activeColor: "#16a34a", textColor: "#16a34a",  badgeBg: "#dcfce7", badgeColor: "#16a34a", filterStatus: "Returned" },
  Requests: { activeColor: "#7c3aed", textColor: "#7c3aed",  badgeBg: "#f3e8ff", badgeColor: "#7c3aed", filterStatus: "Requested" },
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

export default function MyListTabs({ records }: { records: MyListRecord[] }) {
  const [tab, setTab] = useState<Tab>("Active");

  const counts = {
    Active:   records.filter((r) => r.status === "Active").length,
    Returned: records.filter((r) => r.status === "Returned").length,
    Requests: records.filter((r) => r.status === "Requested").length,
  };

  const visible = records.filter((r) => r.status === tabConfig[tab].filterStatus);
  const cfg = tabConfig[tab];

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        {(["Active", "Returned", "Requests"] as Tab[]).map((t) => {
          const isActive = tab === t;
          const c = tabConfig[t];
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors"
              style={
                isActive
                  ? { backgroundColor: c.activeColor, color: "#fff" }
                  : { backgroundColor: "#fff", color: c.textColor, border: "1px solid #e5e7eb" }
              }
            >
              {t}
              <span
                className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
                style={
                  isActive
                    ? { backgroundColor: "rgba(255,255,255,0.25)", color: "#fff" }
                    : { backgroundColor: c.badgeBg, color: c.badgeColor }
                }
              >
                {counts[t]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <BoxIcon />
            <p className="text-sm text-gray-400">No borrowing records found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {visible.map((record) => (
              <div key={record.id} className="px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">#{record.controlNo}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{record.itemCount} item(s) · {record.date}</p>
                </div>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                  style={{ backgroundColor: cfg.badgeBg, color: cfg.badgeColor }}
                >
                  {record.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
