"use client";

import type { BorrowSession, BorrowItem } from "../lib/data";

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function LmoBorrowItemsPanel({
  session,
  items,
}: {
  session: BorrowSession;
  items: BorrowItem[];
}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden" style={{ width: "340px" }}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="text-sm font-bold text-gray-900">Items ({items.length})</h2>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" x2="12" y1="5" y2="19" />
            <line x1="5" x2="19" y1="12" y2="12" />
          </svg>
          Add Equipment
        </button>
      </div>

      <div className="px-4 pt-4 pb-2">
        <div className="rounded-xl px-4 py-3" style={{ backgroundColor: "#f3f4f6" }}>
          <p className="text-xs text-gray-400">Control No.</p>
          <p className="text-sm font-semibold" style={{ color: "#16a34a" }}>{session.controlNo}</p>
        </div>
      </div>

      <div className="px-4 py-6 min-h-24 flex items-center justify-center">
        {items.length === 0 ? (
          <p className="text-sm" style={{ color: "#f97316" }}>No items added</p>
        ) : (
          <div className="w-full flex flex-col gap-2">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-800">{item.name}</span>
                <span className="text-gray-500">×{item.quantity}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 pb-4">
        <button
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#16a34a" }}
        >
          <CheckIcon />
          Issue
        </button>
      </div>
    </div>
  );
}
