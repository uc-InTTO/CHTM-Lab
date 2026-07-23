"use client";

import React, { useState, useEffect } from "react";

interface AddEquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableInventory: any[];
  onAddEquipment: (itemName: string, qty: number) => void;
}

export default function AddEquipmentModal({
  isOpen,
  onClose,
  availableInventory,
  onAddEquipment,
}: AddEquipmentModalProps) {
  
  const categories = [
    "All items", "Flatware", "Dinnerware", "Knives", 
    "Chopping Board", "Mixing Bowls", "Measuring Tools", 
    "Cookware", "Baking Tools", "Glassware", "Equipments"
  ];
  const [activeCategory, setActiveCategory] = useState("All items");
  
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [quantityStr, setQuantityStr] = useState("0");

 
  const filteredItems = availableInventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeCategory === "All items") return matchesSearch;
    return matchesSearch && item.category === activeCategory;
  });

  
  const handleNumPress = (num: string) => {
    setQuantityStr((prev) => {
      if (prev === "0") return num;
      return prev + num;
    });
  };

  const handleClear = () => {
    setQuantityStr("0");
  };

  const handleBackspace = () => {
    setQuantityStr((prev) => {
      if (prev.length <= 1) return "0";
      return prev.slice(0, -1);
    });
  };

  const handleSetQuantitySubmit = () => {
    const qty = parseInt(quantityStr, 10);
    if (!selectedItem || qty <= 0) return;

    if (qty > selectedItem.available) {
      alert(`Requested amount exceeds available inventory stock tracking cap (${selectedItem.available} available).`);
      return;
    }

    onAddEquipment(selectedItem.name, qty);
    
    
    setSelectedItem(null);
    setSearchTerm("");
    setQuantityStr("0");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/60 z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-gray-100">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h2 className="text-md font-bold text-gray-900">Add Equipment</h2>
            <p className="text-xs text-gray-400 mt-0.5">Equipment List Catalogue</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-medium text-lg transition-colors">
            ✕
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden min-h-0">
          
          <div className="w-48 bg-gray-50/50 border-r border-gray-100 p-4 overflow-y-auto flex flex-col gap-1.5">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 mb-1">Category</p>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-100/70 hover:text-gray-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Add Equipment</p>
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Search equipment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-200 rounded-xl p-2.5 w-full text-xs focus:outline-emerald-600 bg-gray-50/30"
                />

                {searchTerm && !selectedItem && (
                  <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-40 overflow-y-auto z-20 text-xs">
                    {filteredItems.length === 0 ? (
                      <p className="p-3 text-gray-400">No items match your active query filtering filters</p>
                    ) : (
                      filteredItems.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setSelectedItem(item);
                            setSearchTerm(item.name);
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 hover:text-emerald-700 text-gray-700 border-b border-gray-50 last:border-0"
                        >
                          {item.name} <span className="text-gray-400 font-medium ml-1">(Available: {item.available})</span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 bg-gray-50/40 p-4 rounded-2xl border border-gray-100 flex-1 justify-center">
              <div className="flex items-center justify-between w-full max-w-xs mb-1">
                <p className="text-xs text-gray-400 font-medium">Tap an item above</p>
                <div className="bg-white border border-gray-200 px-4 py-1.5 rounded-xl text-sm font-bold text-gray-700 flex items-center gap-1 shadow-sm">
                  <span className="text-emerald-700 text-base">{quantityStr}</span> <span className="text-xs text-gray-400 font-normal">pcs</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 w-full max-w-xs text-sm font-bold text-gray-700">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                  <button key={num} type="button" onClick={() => handleNumPress(num)} className="bg-white border border-gray-200/80 p-3.5 rounded-xl hover:bg-gray-100 transition-colors shadow-sm active:scale-95 transform">
                    {num}
                  </button>
                ))}
                
                <button type="button" onClick={handleClear} className="bg-red-50 text-red-600 border border-red-100 p-3.5 rounded-xl hover:bg-red-100 transition-colors shadow-sm active:scale-95 transform font-semibold">
                  C
                </button>
                <button type="button" onClick={() => handleNumPress("0")} className="bg-white border border-gray-200/80 p-3.5 rounded-xl hover:bg-gray-100 transition-colors shadow-sm active:scale-95 transform">
                  0
                </button>
                <button type="button" onClick={handleBackspace} className="bg-amber-50 text-amber-600 border border-amber-100 p-3.5 rounded-xl hover:bg-amber-100 transition-colors shadow-sm active:scale-95 transform font-semibold">
                  ⌫
                </button>
              </div>

              <button
                type="button"
                onClick={handleSetQuantitySubmit}
                disabled={!selectedItem || quantityStr === "0"}
                className="w-full max-w-xs text-center py-2.5 rounded-xl font-semibold text-xs bg-emerald-700 text-white hover:bg-emerald-800 disabled:bg-gray-100 disabled:text-gray-400 transition-colors mt-2 shadow-sm flex items-center justify-center gap-1.5"
              >
                ✓ Set Quantity
              </button>
            </div>
          </div>

          <div className="w-64 bg-gray-50/30 border-l border-gray-100 p-5 overflow-y-auto flex flex-col gap-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Info</h4>
            
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center flex-1 shadow-sm">
              {selectedItem ? (
                <div className="w-full text-left flex flex-col gap-3 text-xs">
                  <div>
                    <p className="text-gray-400 font-medium mb-0.5">Asset Component Name</p>
                    <p className="font-bold text-gray-900 text-sm">{selectedItem.name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 border-t border-gray-50 pt-2.5">
                    <div>
                      <p className="text-gray-400 font-medium">Total Inventory</p>
                      <p className="font-semibold text-gray-800">{selectedItem.total || "—"}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-medium">Available Base</p>
                      <p className="font-bold text-emerald-600">{selectedItem.available || "—"}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 font-medium">Condition Status</p>
                      <p className="font-bold text-gray-800">{selectedItem.status || "Good"}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">Add items to see info</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

