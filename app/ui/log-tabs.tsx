"use client";

import { useState } from "react";
import type { InstructorLog } from "../lib/data";

type Tab = "Active" | "Completed";

export default function LogTabs({ logs }: { logs: InstructorLog[] }) {
  const [tab, setTab] = useState<Tab>("Active");

  const active = logs.filter((l) => l.status === "Active");
  const completed = logs.filter((l) => l.status === "Completed");
  const visible = tab === "Active" ? active : completed;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setTab("Active")}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors"
          style={
            tab === "Active"
              ? { backgroundColor: "#3b82f6", color: "#fff" }
              : { backgroundColor: "#fff", color: "#16a34a", border: "1px solid #e5e7eb" }
          }
        >
          Active
          <span
            className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
            style={
              tab === "Active"
                ? { backgroundColor: "#2563eb", color: "#fff" }
                : { backgroundColor: "#dcfce7", color: "#16a34a" }
            }
          >
            {active.length}
          </span>
        </button>

        <button
          onClick={() => setTab("Completed")}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors"
          style={
            tab === "Completed"
              ? { backgroundColor: "#3b82f6", color: "#fff" }
              : { backgroundColor: "#fff", color: "#16a34a", border: "1px solid #e5e7eb" }
          }
        >
          Completed
          <span
            className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
            style={
              tab === "Completed"
                ? { backgroundColor: "#2563eb", color: "#fff" }
                : { backgroundColor: "#dcfce7", color: "#16a34a" }
            }
          >
            {completed.length}
          </span>
        </button>
      </div>

      <div className="bg-white rounded-2xl">
        {visible.length === 0 ? (
          <div className="flex items-center justify-center py-16">
            <p className="text-sm text-gray-400">
              No {tab.toLowerCase()} logs
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {visible.map((log) => (
              <div key={log.id} className="px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{log.subject}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{log.room} · {log.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{log.timeStart}{log.timeEnd ? ` – ${log.timeEnd}` : ""}</p>
                  <span
                    className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium"
                    style={
                      log.status === "Active"
                        ? { backgroundColor: "#dbeafe", color: "#1d4ed8" }
                        : { backgroundColor: "#dcfce7", color: "#166534" }
                    }
                  >
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
