"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "./toast";

export default function ApproveButton({ sessionId }: { sessionId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleApprove = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/borrow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve", payload: { sessionId } }),
      });
      const json = await res.json();
      if (!res.ok || !json?.success) throw new Error(json?.message || "Approve failed");
      showToast("Request approved", "success");
      router.refresh();
    } catch (err) {
      showToast("Could not approve request", "error");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleApprove}
      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
      style={{ backgroundColor: "#16a34a" }}
      disabled={loading}
    >
      {loading ? "Approving…" : "Approve"}
    </button>
  );
}
