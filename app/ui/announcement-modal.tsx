"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "./toast";

export default function AnnouncementModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);

  async function handlePublish(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { title, body, status: "Published" };
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text();
        showToast(`Publish failed: ${txt}`, "error");
        setSaving(false);
        return;
      }

      showToast("Announcement published", "success");
      setOpen(false);
      setTitle("");
      setBody("");
      router.refresh();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      showToast("Publish failed", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
        style={{ backgroundColor: "#2e7d32" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" x2="12" y1="5" y2="19" />
          <line x1="5" x2="19" y1="12" y2="12" />
        </svg>
        New
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center text-gray-900 justify-center bg-black/50 bg-opacity-50 z-50">
          <form onSubmit={handlePublish} className="bg-white rounded-4xl p-6 max-w-lg w-full">
            <p className="text-lg font-bold text-gray-900 mb-4">New Announcement</p>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 rounded-2xl p-2" />

              <label className="text-sm text-gray-600">Content</label>
              <textarea value={body} onChange={(e) => setBody(e.target.value)} className="border border-gray-300 rounded-xl p-2 min-h-30" />
            </div>

            <div className="flex items-center justify-end gap-3 mt-4">
              <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded-2xl border">Cancel</button>
              <button type="submit" disabled={saving} className="px-4 py-2 rounded-2xl bg-emerald-700 text-white">
                {saving ? "Publishing..." : "Publish"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
