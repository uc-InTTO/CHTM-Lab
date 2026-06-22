"use client";

import { useState } from "react";

function PersonIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.3-4.3"/>
    </svg>
  );
}

export default function StudentLookup() {
  const [query, setQuery] = useState("");

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl px-8 py-10">
        <div className="flex flex-col items-center mb-6">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
            style={{ backgroundColor: "#dcfce7", color: "#16a34a" }}
          >
            <PersonIcon />
          </div>
          <p className="text-base font-bold text-gray-900">Student Lookup</p>
          <p className="text-sm text-gray-400">Enter Student ID or Name</p>
        </div>

        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-400"
            placeholder="e.g. 22-1234-567 or DELA CRUZ"
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          />
          <button
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
            style={{ backgroundColor: "#16a34a" }}
          >
            <SearchIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
