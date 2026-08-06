// app/ui/borrow-actions-panel.tsx
"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "./toast";
import { BorrowingModal } from "./new-session-button";
import { CartIcon } from "./icons"; // adjust based on your icon path

interface BorrowActionsPanelProps {
  prefilledRequest: any;
}

export default function BorrowActionsPanel({ prefilledRequest }: BorrowActionsPanelProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePrefill, setActivePrefill] = useState<any>(null);
  
  // Existing slip picker dropdown state controllers
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchCode, setSearchCode] = useState("");

  const mockDraftSlips = [
    { id: "sess_991", controlNo: "CTRL-16480", name: "ALVAREZ, MARIA" },
    { id: "sess_992", controlNo: "CTRL-16495", name: "SANTIAGO, KEVIN" },
  ];

  const filteredSlips = mockDraftSlips.filter((slip) =>
    slip.controlNo.toLowerCase().includes(searchCode.toLowerCase())
  );

  const handleSaveDraft = async (formData: any) => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/borrow", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "createDraft", payload: formData }),
        });
        const json = await res.json();
        if (!res.ok || !json?.success) throw new Error(json?.message || "Could not create draft");
        setIsModalOpen(false);
        setActivePrefill(null);
        showToast("Draft saved", "success");
        router.refresh();
      } catch (err) {
        showToast("Could not initialize document record draft", "error");
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
    
      {prefilledRequest && (
        <div className="sticky top-0 w-full z-10 flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-2xl px-5 py-3.5 shadow-sm animate-fade-in mb-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            <p className="text-sm text-emerald-800 font-medium">
              Approved Req. <span className="font-bold">#{prefilledRequest.controlNo}</span> — Ready to Issue
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={() => {
                setActivePrefill(prefilledRequest);
                setIsModalOpen(true);
              }}
              className="text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 px-4 py-2 rounded-xl shadow-sm transition-all"
            >
              Tap to Issue
            </button>

            <button
              type="button"
              onClick={async () => {
                try {
                  const res = await fetch("/api/borrow", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ action: "createDraftFromApproved", payload: { sessionId: prefilledRequest.id } }),
                  });
                  const json = await res.json();
                  if (!res.ok || !json?.success) throw new Error(json?.message || "Could not create draft");
                  showToast("Draft prepared — open Borrow page to add items", "success");
                  router.push("/lmo/borrow");
                } catch (err) {
                  showToast("Could not prepare draft for adding equipment.", "error");
                }
              }}
              className="text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 px-3 py-2 rounded-xl shadow-sm transition-all"
            >
              Add Equipment
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-end items-center gap-2 relative w-full">
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-sm"
        >
          Add to Existing
        </button>

        <BorrowingModal 
          CartIcon={CartIcon} 
          isPending={isPending} 
          onSave={handleSaveDraft}
          externalIsOpen={isModalOpen}
          setExternalIsOpen={setIsModalOpen}
          initialData={activePrefill}
        />

        {isDropdownOpen && (
          <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-2xl p-4 shadow-xl z-30 w-72 animate-fade-in text-xs text-gray-700">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
              Select Existing Borrowing Slip
            </label>
            <input
              type="text"
              placeholder="Type control number (e.g. 16480)..."
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="border border-gray-200 rounded-xl p-2 w-full focus:outline-emerald-600 bg-gray-50/50"
            />

            <div className="mt-2 divide-y divide-gray-50 border border-gray-100 rounded-xl max-h-32 overflow-y-auto bg-white shadow-inner">
              {filteredSlips.length === 0 ? (
                <p className="p-2.5 text-gray-400 text-center">No active drafts match</p>
              ) : (
                filteredSlips.map((slip) => (
                  <button
                    key={slip.id}
                    type="button"
                    onClick={() => {
                      setSearchCode(slip.controlNo);
                      setIsDropdownOpen(false);
                      alert(`Load tracking session workflow hook for: ${slip.id}`);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-emerald-50 text-gray-600 hover:text-emerald-700 transition-colors flex justify-between font-medium"
                  >
                    <span className="font-bold text-gray-900">#{slip.controlNo}</span>
                    <span className="text-[10px] text-gray-400 font-normal">{slip.name}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
