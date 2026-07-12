"use client";

import { useState } from "react";
import type { InventoryCategory, InventoryItem } from "../lib/data";

type ViewTab = "all" | "available" | "sets";

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function DishIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" />
      <path d="M12 13V2" />
      <path d="M10 2h4" />
    </svg>
  );
}

function StatusBadge({ status }: { status: InventoryItem["status"] }) {
  const colors = {
    Good: { bg: "#dcfce7", color: "#15803d" },
    Fair: { bg: "#fef3c7", color: "#d97706" },
    Poor: { bg: "#fee2e2", color: "#dc2626" },
  };
  const c = colors[status];

  return (
    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: c.bg, color: c.color }}>
      {status}
    </span>
  );
}

export default function InventoryView({ categories }: { categories: InventoryCategory[] }) {
  const [viewTab, setViewTab] = useState<ViewTab>("all");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [search, setSearch] = useState("");

  const categoryOptions = ["All Categories", ...Array.from(new Set(categories.map((category) => category.name)))];
  const viewTabs: { key: ViewTab; label: string }[] = [
    { key: "all", label: "All Inventory" },
    { key: "available", label: "Available to Borrow" },
    { key: "sets", label: "Kitchen Sets" },
  ];

  const filteredCategories = categories
    .filter((category) => categoryFilter === "All Categories" || category.name === categoryFilter)
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => {
        if (viewTab === "available" && item.available === 0) return false;
        if (viewTab === "sets" && (item.inKitchenSet === null || item.inKitchenSet === 0)) return false;
        if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      }),
    }))
    .filter((category) => category.items.length > 0);

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2 flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2">
          <span className="text-gray-400"><SearchIcon /></span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm text-gray-700 outline-none"
            placeholder="Search equipment..."
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl flex mb-4 overflow-hidden border border-gray-100">
        {viewTabs.map((tab, index) => (
          <button
            key={tab.key}
            onClick={() => setViewTab(tab.key)}
            className="flex-1 py-2.5 text-sm font-medium transition-colors"
            style={{
              color: viewTab === tab.key ? "#111827" : "#9ca3af",
              borderBottom: viewTab === tab.key ? "2px solid #111827" : "2px solid transparent",
              borderRight: index < viewTabs.length - 1 ? "1px solid #f3f4f6" : "none",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {categoryOptions.map((category) => (
          <button
            key={category}
            onClick={() => setCategoryFilter(category)}
            className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
            style={
              categoryFilter === category
                ? { backgroundColor: "#16a34a", color: "#fff" }
                : { backgroundColor: "#fff", color: "#374151", border: "1px solid #e5e7eb" }
            }
          >
            {category}
          </button>
        ))}
      </div>

      {filteredCategories.length === 0 ? (
        <div className="bg-white rounded-2xl flex items-center justify-center py-16">
          <p className="text-sm text-gray-400">No equipment found</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredCategories.map((category) => {
            const totalAvail = category.items.reduce((sum, item) => sum + item.available, 0);
            const totalQty = category.items.reduce((sum, item) => sum + item.total, 0);

            return (
              <div key={category.name} className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500"><DishIcon /></span>
                    <p className="text-sm font-bold text-gray-900">{category.name}</p>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                      {category.items.length} items
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{category.totalPcs} total pcs</p>
                </div>

                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-50">
                      <th className="text-left px-5 py-2.5 text-xs font-medium text-gray-400 w-full">Equipment Name</th>
                      <th className="text-left px-3 py-2.5 text-xs font-medium text-gray-400 whitespace-nowrap">Unit</th>
                      <th className="text-right px-3 py-2.5 text-xs font-medium text-gray-400">Total</th>
                      <th className="text-right px-3 py-2.5 text-xs font-medium whitespace-nowrap" style={{ color: "#16a34a" }}>Available</th>
                      <th className="text-right px-3 py-2.5 text-xs font-medium whitespace-nowrap" style={{ color: "#f97316" }}>In Kitchen Set</th>
                      <th className="text-center px-3 py-2.5 text-xs font-medium text-gray-400">Status</th>
                      <th className="text-center px-5 py-2.5 text-xs font-medium text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {category.items.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3 text-sm text-gray-800">{item.name}</td>
                        <td className="px-3 py-3 text-sm text-gray-500">{item.unit}</td>
                        <td className="px-3 py-3 text-sm text-right text-gray-800">{item.total}</td>
                        <td className="px-3 py-3 text-sm text-right font-medium" style={{ color: "#16a34a" }}>{item.available}</td>
                        <td className="px-3 py-3 text-sm text-right font-medium" style={{ color: "#f97316" }}>{item.inKitchenSet ?? "—"}</td>
                        <td className="px-3 py-3 text-center">
                          <StatusBadge status={item.status} />
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center justify-center gap-2">
                            <button className="text-gray-400 hover:text-gray-600 transition-colors"><PencilIcon /></button>
                            <button className="hover:opacity-80 transition-opacity" style={{ color: "#ef4444" }}><TrashIcon /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-gray-100 bg-gray-50">
                      <td className="px-5 py-2.5 text-xs font-medium text-gray-400">Category Total</td>
                      <td></td>
                      <td className="px-3 py-2.5 text-xs font-medium text-right text-gray-700">{totalQty}</td>
                      <td className="px-3 py-2.5 text-xs font-medium text-right" style={{ color: "#16a34a" }}>{totalAvail}</td>
                      <td colSpan={3}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
