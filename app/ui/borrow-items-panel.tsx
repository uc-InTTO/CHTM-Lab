// app/ui/lmo-borrow-items-panel.tsx
"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "./toast";
import { fetchFloorData } from "../lib/actions";
import { BorrowItem } from "../lib/data";
import AddEquipmentModal from "./add-equipment-modal"; 
interface LmoBorrowItemsPanelProps {
  session: { id: string; floor: string };
  items: BorrowItem[];
}

export default function LmoBorrowItemsPanel({ session, items }: LmoBorrowItemsPanelProps) {
  const [isPending, startTransition] = useTransition();
  const [availableInventory, setAvailableInventory] = useState<any[]>([]);
  const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false); // ✅ Manage state indicator
  const router = useRouter();

  // Fetch available catalogue metrics tied onto active session floor layers
  useEffect(() => {
    async function loadInventory() {
      if (!session.floor) return;
      try {
        const data = await fetchFloorData(session.floor);
        // Map elements out into plain arrays with categories assigned matching structural options
        const itemsList = data.categories.flatMap((cat) => 
          (cat.items || []).map(i => ({ ...i, category: cat.name.includes("Kitchen") ? "Cookware" : "All items" }))
        );
        setAvailableInventory(itemsList);
      } catch (err) {
        console.error("Failed to parse catalogue inventory parameters:", err);
      }
    }
    loadInventory();
  }, [session.floor]);

  // Handle addition coming from the sub modal custom number pad trigger engine
  const handleModalAddEquipmentItem = (itemName: string, qty: number) => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/borrow", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "addItem", payload: { sessionId: session.id, name: itemName, quantity: qty } }),
        });
        const json = await res.json();
        if (!res.ok || !json?.success) throw new Error(json?.message || "Could not add item");
        showToast("Item added", "success");
        const router = useRouter();
        router.refresh();
      } catch (error) {
        alert("Failed to append equipment row to current tracking list.");
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Manifest Items Inventory Allocation Block List Context Header layout frame */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-900">Allocated Manifest Items</h3>
          
         
          <button
            type="button"
            onClick={() => setIsEquipmentModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 hover:bg-emerald-100 transition-colors shadow-sm"
          >
            + Add Equipment
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400 border border-dashed border-gray-100 rounded-xl bg-gray-50/30">
            <p className="text-xs">No items checked out under this draft log yet.</p>
          </div>
        ) : (
          <div className="border border-gray-100 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold">
                  <th className="p-3.5">Equipment Name</th>
                  <th className="p-3.5 text-center w-32">Quantity</th>
                  <th className="p-3.5 text-right w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {items.map((allocatedItem) => (
                  <tr key={allocatedItem.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-3.5 font-semibold text-gray-900">{allocatedItem.name}</td>
                    <td className="p-3.5 text-center font-bold text-gray-600 bg-gray-50/20">{allocatedItem.quantity} pc/s</td>
                    <td className="p-3.5 text-right">
                      <button type="button" className="text-red-500 hover:text-red-700 font-bold text-[11px]">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddEquipmentModal 
        isOpen={isEquipmentModalOpen}
        onClose={() => setIsEquipmentModalOpen(false)}
        availableInventory={availableInventory}
        onAddEquipment={handleModalAddEquipmentItem}
      />
    </div>
  );
}