"use client";

import { useState } from "react";
import InventoryView from "./inventory-view";
import type { InventoryCategory } from "../lib/data";

export default function GlobalSearch({
  allCategories,
  children
}: {
  allCategories: InventoryCategory[];
  children: React.ReactNode;
}) {
  const [search, setSearch] = useState("");
  // filter items based on the search query
  const filteredCategories = search 
    ? allCategories
        .map(category => ({
          ...category,
          items: category.items.filter(item => 
            item.name.toLowerCase().includes(search.toLowerCase())
          )
        }))
        .filter(category => category.items.length > 0) 
    : [];

  return (
    <div className="flex flex-col gap-6">
      
      {/* The Search Bar */}
      <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm focus-within:ring-2 focus-within:ring-green-600 focus-within:border-green-600 transition-all">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search all equipment across all floors..."
          className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
        />
        
        {search && (
          <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        )}
      </div>

      {search ? (
        <div className="animate-in fade-in duration-300">
          <h3 className="text-sm font-bold text-gray-700 mb-4 px-1">
            Search Results for {search}
          </h3>
          <InventoryView categories={filteredCategories} />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* If no search, render the accordions */}
          {children}
        </div>
      )}
    </div>
  );
}