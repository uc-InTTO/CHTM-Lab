"use client";

import { useState } from "react";
import type { ReturnBorrowing } from "../lib/data";

type Tab = "chtm" | "nonchtm";

export default function ReturnTabs({
  chtm,
  nonChtm,
}: {
  chtm: ReturnBorrowing[];
  nonChtm: ReturnBorrowing[];
}) {
  const [tab, setTab] = useState<Tab>("chtm");
  const [selected, setSelected] = useState<ReturnBorrowing | null>(null);

  const active = tab === "chtm" ? chtm : nonChtm;
  const emptyLabel = tab === "chtm" ? "No active borrowings" : "No active NON-CHTM borrows";
  const detailPlaceholder =
    tab === "chtm"
      ? "Search or tap a borrowing to process returns"
      : "Select a NON-CHTM borrow to process returns";
  const panelTitle = tab === "chtm" ? "Active Borrowings" : "Active NON-CHTM Borrows";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-1">
        <button
          onClick={() => { setTab("chtm"); setSelected(null); }}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors"
          style={
            tab === "chtm"
              ? { backgroundColor: "#3b82f6", color: "#fff" }
              : { backgroundColor: "#fff", color: "#6b7280", border: "1px solid #e5e7eb" }
          }
        >
          CHTM Borrowings
          <span
            className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
            style={
              tab === "chtm"
                ? { backgroundColor: "#2563eb", color: "#fff" }
                : { backgroundColor: "#f3f4f6", color: "#6b7280" }
            }
          >
            {chtm.length}
          </span>
        </button>

        <button
          onClick={() => { setTab("nonchtm"); setSelected(null); }}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors"
          style={
            tab === "nonchtm"
              ? { backgroundColor: "#7c3aed", color: "#fff" }
              : { backgroundColor: "#fff", color: "#6b7280", border: "1px solid #e5e7eb" }
          }
        >
          NON-CHTM Borrowings
          <span
            className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
            style={
              tab === "nonchtm"
                ? { backgroundColor: "#6d28d9", color: "#fff" }
                : { backgroundColor: "#f3f4f6", color: "#6b7280" }
            }
          >
            {nonChtm.length}
          </span>
        </button>
      </div>

      <div className="flex gap-4">
        <div className="bg-white rounded-2xl overflow-hidden flex-1">
          <div className="px-5 py-4 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">{panelTitle}</p>
          </div>
          {active.length === 0 ? (
            <div className="flex items-center justify-center py-14">
              <p className="text-sm text-gray-400">{emptyLabel}</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {active.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelected(b)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{b.studentName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">#{b.controlNo} · {b.station}</p>
                  </div>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: "#dbeafe", color: "#1d4ed8" }}
                  >
                    {b.status}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center bg-white rounded-2xl">
          {selected ? (
            <div className="w-full px-6 py-6">
              <p className="text-sm font-bold text-gray-900 mb-1">{selected.studentName}</p>
              <p className="text-xs text-gray-400">#{selected.controlNo} · {selected.station}</p>
            </div>
          ) : (
            <p className="text-sm text-gray-400">{detailPlaceholder}</p>
          )}
        </div>
      </div>
    </div>
  );
}
