"use client";

import { useState } from "react";
import type { WasteStats, WasteRecord } from "../lib/data";

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/>
      <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/>
      <path d="M7 3v4a1 1 0 0 0 1 1h7"/>
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
      <path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>
    </svg>
  );
}

function DropIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>
    </svg>
  );
}

export default function WastePanel({
  stats,
  records,
}: {
  stats: WasteStats;
  records: WasteRecord[];
}) {
  const [biodeg, setBiodeg] = useState("0");
  const [nonBio, setNonBio] = useState("0");
  const [usedOil, setUsedOil] = useState("0");

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {[
          { label: "Today's Waste", value: `${stats.todayKg.toFixed(1)} kg` },
          { label: "Avg / Session", value: `${stats.avgPerSession} kg` },
          { label: "Total Waste", value: `${stats.totalKg.toFixed(1)} kg` },
          { label: "Sessions Logged", value: `${stats.sessionsLogged}` },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl px-5 py-4">
            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        <div className="bg-white rounded-2xl px-5 py-4 flex flex-col items-center gap-1">
          <span style={{ color: "#16a34a" }}><LeafIcon /></span>
          <p className="text-xs text-gray-400">Biodegradable</p>
          <p className="text-xl font-bold text-gray-900">{stats.biodegKg.toFixed(1)} kg</p>
        </div>
        <div className="bg-white rounded-2xl px-5 py-4 flex flex-col items-center gap-1">
          <span style={{ color: "#f97316" }}><BoxIcon /></span>
          <p className="text-xs text-gray-400">Non-biodegradable</p>
          <p className="text-xl font-bold text-gray-900">{stats.nonBiodegKg.toFixed(1)} kg</p>
        </div>
        <div className="bg-white rounded-2xl px-5 py-4 flex flex-col items-center gap-1">
          <span style={{ color: "#3b82f6" }}><DropIcon /></span>
          <p className="text-xs text-gray-400">Used Oil</p>
          <p className="text-xl font-bold text-gray-900">{stats.usedOilKg.toFixed(1)} kg</p>
        </div>
      </div>

      <div className="flex gap-5">
        <div className="flex-1 bg-white rounded-2xl px-6 py-5">
          <div className="flex items-center gap-2 mb-5 text-gray-500">
            <TrashIcon />
            <p className="text-sm font-bold text-gray-900">Log Kitchen Waste</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Schedule</label>
              <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400 bg-white">
                <option value="">Schedule</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Section</label>
              <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400 bg-white">
                <option value="">Section</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-1">Course / Subject</label>
            <input className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400" />
          </div>

          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-1">Activity</label>
            <input className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400" />
          </div>

          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-1">Instructor</label>
            <input
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400"
              placeholder="Type or select instructor"
            />
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div>
              <label className="flex items-center gap-1 text-xs mb-1" style={{ color: "#16a34a" }}>
                <LeafIcon /> Biodeg. (kg)
              </label>
              <input
                type="number"
                value={biodeg}
                onChange={(e) => setBiodeg(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400"
              />
            </div>
            <div>
              <label className="flex items-center gap-1 text-xs mb-1" style={{ color: "#f97316" }}>
                <BoxIcon /> Non-bio (kg)
              </label>
              <input
                type="number"
                value={nonBio}
                onChange={(e) => setNonBio(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400"
              />
            </div>
            <div>
              <label className="flex items-center gap-1 text-xs mb-1" style={{ color: "#3b82f6" }}>
                <DropIcon /> Used Oil (kg)
              </label>
              <input
                type="number"
                value={usedOil}
                onChange={(e) => setUsedOil(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs text-gray-500 mb-1">Checked By (Custodian)</label>
            <input
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400"
              placeholder="Enter custodian name"
            />
          </div>

          <div className="mb-5">
            <label className="block text-xs text-gray-500 mb-1">Notes (Optional)</label>
            <textarea
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:border-gray-400 resize-none"
              rows={3}
            />
          </div>

          <button
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white"
            style={{ backgroundColor: "#16a34a" }}
          >
            <SaveIcon />
            Log Waste Record
          </button>
        </div>

        <div className="w-72 shrink-0 bg-white rounded-2xl px-5 py-5">
          <p className="text-sm font-semibold text-gray-900 mb-4">Waste Records</p>
          {records.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <p className="text-sm text-gray-400">No records yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {records.map((r) => (
                <div key={r.id} className="border border-gray-100 rounded-xl px-4 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-semibold text-gray-800">{r.section}</p>
                    <p className="text-xs text-gray-400">{r.date}</p>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{r.course} · {r.activity}</p>
                  <div className="flex items-center gap-3 text-xs">
                    <span style={{ color: "#16a34a" }}>{r.biodegKg} kg</span>
                    <span style={{ color: "#f97316" }}>{r.nonBiodegKg} kg</span>
                    <span style={{ color: "#3b82f6" }}>{r.usedOilKg} kg</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
