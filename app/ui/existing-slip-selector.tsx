"use client";

import React, { useState } from "react";

export default function ExistingSlipSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchCode, setSearchCode] = useState("");

  // Mock list of open active drafts floating around the system database
  const mockDraftSlips = [
    { id: "sess_991", controlNo: "CTRL-16480", name: "ALVAREZ, MARIA" },
    { id: "sess_992", controlNo: "CTRL-16495", name: "SANTIAGO, KEVIN" },
  ];

  const filteredSlips = mockDraftSlips.filter((slip) =>
    slip.controlNo.toLowerCase().includes(searchCode.toLowerCase())
  );

  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm w-full transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-bold border border-amber-200/50">
            Option ②
          </div>
          <p className="text-sm font-semibold text-gray-700">
            Need to append items onto an open slip instead?
          </p>
        </div>
        
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-all shadow-sm"
        >
          {isOpen ? "Hide Panel" : "Select Existing Borrowing Slip"}
        </button>
      </div>

      {/* Expanded Inline Selection Field Mappings */}
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in max-w-md">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
            Enter or Select Control Number
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Type control sequence (e.g. 16480)..."
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="border border-gray-200 rounded-xl p-2.5 w-full text-xs focus:outline-emerald-600 bg-gray-50/40"
            />

            {searchCode && (
              <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-36 overflow-y-auto z-10 text-xs">
                {filteredSlips.length === 0 ? (
                  <p className="p-3 text-gray-400">No active matching open drafts found</p>
                ) : (
                  filteredSlips.map((slip) => (
                    <button
                      key={slip.id}
                      type="button"
                      onClick={() => {
                        setSearchCode(slip.controlNo);
                        alert(`Load workflow hook for document session: ${slip.id}`);
                        // You can wire this up to a server actions redirect or local status loader!
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 hover:text-emerald-700 text-gray-700 transition-colors border-b last:border-0 border-gray-50 flex justify-between items-center"
                    >
                      <span className="font-bold text-gray-900">#{slip.controlNo}</span>
                      <span className="text-gray-400 text-[11px]">{slip.name}</span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
