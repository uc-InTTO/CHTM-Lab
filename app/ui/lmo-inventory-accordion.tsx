"use client";

import { useState } from "react";
import InventoryView from "./inventory-view";
import { fetchFloorData } from "../lib/actions"; 
import type { InventoryStats, InventoryCategory } from "../lib/data";

export default function FloorAccordion({ floorName }: { floorName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [data, setData] = useState<{ stats: InventoryStats; categories: InventoryCategory[] } | null>(null);

  const toggleAccordion = async () => {
    if (!isOpen && !data) {
      setIsLoading(true);
      try {
        const result = await fetchFloorData(floorName);
        setData(result);
      } catch (error) {
        console.error("Failed to fetch floor data:", error);
      }
      setIsLoading(false);
    }
    
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <button 
        onClick={toggleAccordion} 
        className="w-full flex justify-between items-center px-6 py-5 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-gray-900">{floorName}</h2>
          {data && <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Loaded</span>}
        </div>
        <span className="text-gray-400">
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 15-6-6-6 6"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
          )}
        </span>
      </button>

      {isOpen && (
        <div className="p-6 border-t border-gray-100 bg-gray-50/30">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-sm text-gray-500">Loading {floorName} inventory...</span>
            </div>
          ) : data ? (
            <div className="animate-in fade-in duration-300">
                {/* specific floor */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm">
                  <p className="text-xs text-gray-400 mb-1">Equipment Types</p>
                  <p className="text-xl font-bold text-gray-900">{data.stats.equipmentTypes}</p>
                </div>
                <div className="bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm">
                  <p className="text-xs text-gray-400 mb-1">Total Inventory (pcs)</p>
                  <p className="text-xl font-bold text-gray-900">{data.stats.totalInventory}</p>
                </div>
                <div className="bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm">
                  <p className="text-xs text-gray-400 mb-1">Available to Borrow</p>
                  <p className="text-xl font-bold text-green-600">{data.stats.availableToBorrow}</p>
                </div>
                <div className="bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm">
                  <p className="text-xs text-gray-400 mb-1">In Kitchen Sets</p>
                  <p className="text-xl font-bold text-orange-500">{data.stats.inKitchenSets}</p>
                </div>
              </div>

              <InventoryView categories={data.categories} />
            </div>
          ) : (
            <p className="text-center text-sm text-gray-400 py-6">No data found for this floor.</p>
          )}
        </div>
      )}
    </div>
  );
}