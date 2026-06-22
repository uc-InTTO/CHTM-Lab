"use client";

import { useState, useMemo } from "react";
import type { BorrowSession, BorrowItem, InventoryCategory, InventoryItem } from "../lib/data";

function PlusIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function RequestIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function AddEquipmentModal({
  categories,
  onClose,
  onDone,
}: {
  categories: InventoryCategory[];
  onClose: () => void;
  onDone: (items: { item: InventoryItem; qty: number }[]) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [search, setSearch] = useState("");
  const [activeItem, setActiveItem] = useState<InventoryItem | null>(null);
  const [quantityStr, setQuantityStr] = useState("0");
  const [cart, setCart] = useState<Map<number, { item: InventoryItem; qty: number }>>(new Map());

  const allItems = useMemo(() => categories.flatMap((c) => c.items), [categories]);

  const categoryForItem = useMemo(() => {
    const map = new Map<number, string>();
    categories.forEach((c) => c.items.forEach((i) => map.set(i.id, c.name)));
    return map;
  }, [categories]);

  const filteredItems = useMemo(() => {
    const items =
      selectedCategory === "All Items"
        ? allItems
        : (categories.find((c) => c.name === selectedCategory)?.items ?? []);
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter((i) => i.name.toLowerCase().includes(q));
  }, [selectedCategory, search, allItems, categories]);

  const totalInCart = useMemo(() => {
    let total = 0;
    cart.forEach((v) => (total += v.qty));
    return total;
  }, [cart]);

  function commitCurrent(item: InventoryItem | null, qtyStr: string) {
    if (!item) return;
    const qty = parseInt(qtyStr, 10) || 0;
    setCart((prev) => {
      const next = new Map(prev);
      if (qty > 0) {
        next.set(item.id, { item, qty });
      } else {
        next.delete(item.id);
      }
      return next;
    });
  }

  function handleItemClick(item: InventoryItem) {
    commitCurrent(activeItem, quantityStr);
    setActiveItem(item);
    const existing = cart.get(item.id);
    setQuantityStr(existing ? String(existing.qty) : "0");
  }

  function handleKeypad(key: string) {
    if (!activeItem) return;
    if (key === "C") {
      setQuantityStr("0");
    } else if (key === "⌫") {
      setQuantityStr((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else {
      setQuantityStr((prev) => (prev === "0" ? key : prev + key));
    }
  }

  function handleDone() {
    commitCurrent(activeItem, quantityStr);
    onDone(Array.from(cart.values()));
  }

  const categoryNames = ["All Items", ...categories.map((c) => c.name)];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div
        className="bg-white rounded-2xl w-full mx-4 flex flex-col"
        style={{ maxWidth: "860px", maxHeight: "90vh" }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Add Equipment</h2>
            <p className="text-sm text-gray-400">Equipment List</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Category sidebar */}
          <div className="w-40 border-r border-gray-100 overflow-y-auto py-3 shrink-0">
            <p className="text-xs font-semibold text-gray-400 px-4 mb-2 tracking-wider">CATEGORY</p>
            {categoryNames.map((name) => (
              <button
                key={name}
                onClick={() => setSelectedCategory(name)}
                className="w-full text-left px-4 py-2 text-sm transition-colors rounded-xl mx-1"
                style={{
                  backgroundColor: selectedCategory === name ? "#16a34a" : "transparent",
                  color: selectedCategory === name ? "white" : "#374151",
                  width: "calc(100% - 8px)",
                }}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Center column */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-4 pt-3 pb-2 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-400 tracking-wider mb-2">ADD EQUIPMENT</p>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search equipment..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg text-sm bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredItems.length === 0 ? (
                <div className="flex items-center justify-center py-12 text-sm text-gray-400">
                  No equipment found
                </div>
              ) : (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                    style={{ backgroundColor: activeItem?.id === item.id ? "#f0fdf4" : undefined }}
                    onClick={() => handleItemClick(item)}
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-400">
                        {categoryForItem.get(item.id) ?? ""} · {item.available} avail
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {cart.has(item.id) && (
                        <span className="text-xs font-semibold text-green-600">
                          ×{cart.get(item.id)!.qty}
                        </span>
                      )}
                      <button
                        className="w-7 h-7 rounded-full flex items-center justify-center text-green-600 hover:bg-green-50 transition-colors border border-green-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemClick(item);
                        }}
                      >
                        <PlusIcon />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Keypad */}
            <div className="border-t border-gray-100 px-4 py-3 shrink-0">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-400">
                  {activeItem ? activeItem.name : "Tap an item above"}
                </p>
                <div className="text-2xl font-bold text-gray-900 tabular-nums">
                  {quantityStr}{" "}
                  <span className="text-sm font-normal text-gray-400">pcs</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "⌫"].map((key) => (
                  <button
                    key={key}
                    onClick={() => handleKeypad(key)}
                    disabled={!activeItem}
                    className="py-3 rounded-xl text-sm font-semibold transition-colors disabled:opacity-30"
                    style={{
                      backgroundColor:
                        key === "C" ? "#fee2e2" : key === "⌫" ? "#fef9c3" : "#f3f4f6",
                      color:
                        key === "C" ? "#dc2626" : key === "⌫" ? "#854d0e" : "#374151",
                    }}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Info panel */}
          <div className="w-44 border-l border-gray-100 p-4 flex flex-col shrink-0">
            <p className="text-sm font-semibold text-gray-700 mb-3">Info</p>
            {activeItem ? (
              <div>
                <p className="text-sm font-medium text-gray-900">{activeItem.name}</p>
                <p className="text-xs text-gray-400 mt-1">{activeItem.available} available</p>
              </div>
            ) : (
              <p className="text-xs text-gray-400">Add items to see info</p>
            )}
            <div className="mt-auto">
              <p className="text-xs text-gray-400">
                Total:{" "}
                <span className="font-semibold text-gray-700">{totalInCart} pcs</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end px-6 py-4 border-t border-gray-100">
          <button
            onClick={handleDone}
            className="px-6 py-2 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StudentBorrowView({
  session,
  items,
  categories,
}: {
  session: BorrowSession | null;
  items: BorrowItem[];
  categories: InventoryCategory[];
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col h-full px-8 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Borrow Equipment</h1>
          <p className="text-sm text-gray-500 mt-0.5">Issue equipment to students</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ backgroundColor: "#16a34a" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            New
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors">
            <PlusIcon size={13} />
            Add to Existing
          </button>
        </div>
      </div>

      {session ? (
        <div className="flex flex-col gap-4 max-w-xl">
          {/* Borrowing Details */}
          <div className="bg-white rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-gray-900">Borrowing Details</h2>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                </svg>
              </button>
            </div>
            <p className="text-base font-bold" style={{ color: "#16a34a" }}>#{session.controlNo}</p>
          </div>

          {/* Items panel */}
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-900">Items ({items.length})</h2>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <PlusIcon />
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
                <p className="text-sm text-gray-400">No items added</p>
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
                style={{ backgroundColor: "#f59e0b" }}
              >
                <RequestIcon />
                Request
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 gap-3">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          <p className="text-sm text-gray-400">No active borrowing. Click <strong>New</strong> to start.</p>
        </div>
      )}

      {showModal && (
        <AddEquipmentModal
          categories={categories}
          onClose={() => setShowModal(false)}
          onDone={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
