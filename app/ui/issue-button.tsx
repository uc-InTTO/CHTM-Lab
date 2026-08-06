"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "./toast";

export default function IssueButton({ sessionId }: { sessionId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleIssue = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/borrow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "issue", payload: { sessionId } }),
      });
      const json = await res.json();
      if (!res.ok || !json?.success) throw new Error(json?.message || "Issue failed");
      showToast("Session issued", "success");
      router.refresh();
    } catch (err) {
      showToast("Could not issue session", "error");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleIssue}
      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
      disabled={loading}
    >
      {loading ? "Issuing…" : "Tap to Issue"}
    </button>
  );
}
