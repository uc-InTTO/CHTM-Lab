"use client";

import { useState } from "react";
import type { LmoMyListItem } from "../lib/data";

type Tab = "active" | "returned" | "requested";

const STATUS_BADGE: Record<Tab, { bg: string; color: string; label: string }> = {
  active: { bg: "#dbeafe", color: "#1d4ed8", label: "active" },
  returned: { bg: "#dcfce7", color: "#15803d", label: "returned" },
  requested: { bg: "#f3f4f6", color: "#6b7280", label: "requested" },
};

export default function LmoMyListTabs({ items }: { items: LmoMyListItem[] }) {
  const [tab, setTab] = useState<Tab>("active");

  const active = items.filter((i) => i.status === "active");
  const returned = items.filter((i) => i.status === "returned");
  const requested = items.filter((i) => i.status === "requested");

  const tabs: { key: Tab; label: string; count: number; activeBg: string; activeColor: string }[] = [
    { key: "active", label: "Active", count: active.length, activeBg: "#3b82f6", activeColor: "#fff" },
    { key: "returned", label: "Returned", count: returned.length, activeBg: "#16a34a", activeColor: "#fff" },
    { key: "requested", label: "Requests", count: requested.length, activeBg: "#7c3aed", activeColor: "#fff" },
  ];

  const visible = tab === "active" ? active : tab === "returned" ? returned : requested;

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors"
            style={
              tab === t.key
                ? { backgroundColor: t.activeBg, color: t.activeColor }
                : { backgroundColor: "#fff", color: "#6b7280", border: "1px solid #e5e7eb" }
            }
          >
            {t.label}
            <span
              className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
              style={
                tab === t.key
                  ? { backgroundColor: "rgba(255,255,255,0.25)", color: "#fff" }
                  : { backgroundColor: "#f3f4f6", color: "#6b7280" }
              }
            >
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="bg-white rounded-2xl flex items-center justify-center py-16">
          <p className="text-sm text-gray-400">No {tab} records</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {visible.map((item) => {
            const badge = STATUS_BADGE[item.status as Tab];
            return (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden">
                <div className="px-5 py-4 flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-0.5">#{item.controlNo}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                    <p className="text-xs text-gray-500">{item.section}</p>
                    <p className="text-xs text-gray-500">Instructor: {item.instructor}</p>
                    <p className="text-xs text-gray-500">{item.period} · {item.station}</p>
                  </div>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: badge.bg, color: badge.color }}
                  >
                    {badge.label}
                  </span>
                </div>

                <div style={{ backgroundColor: "#f9fafb" }} className="px-5 py-3">
                  <p className="text-xs font-bold text-gray-500 tracking-wider mb-2">ITEMS</p>
                  {item.items.map((it, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-sm text-gray-800">{it.name}</p>
                        <p className="text-xs text-gray-500">Issued: {it.issued} {it.unit}</p>
                      </div>
                      <p className="text-xs font-medium" style={{ color: "#16a34a" }}>Time In: {it.timeIn}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
