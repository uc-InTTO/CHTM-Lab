"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "./toast";

export default function AddEquipmentApprovedButton({ sessionId }: { sessionId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateDraft = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/borrow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "createDraftFromApproved", payload: { sessionId } }),
      });
      const json = await res.json();
      if (!res.ok || !json?.success) throw new Error(json?.message || "Could not create draft");
      showToast("Draft prepared — open Borrow page to add items", "success");
      router.push("/lmo/borrow");
    } catch (err) {
      showToast("Could not create draft from approved request", "error");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCreateDraft}
      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
      style={{ backgroundColor: "#10b981" }}
      disabled={loading}
    >
      {loading ? "Preparing…" : "Add Equipment"}
    </button>
  );
}
