"use client";

import { useState } from "react";
import { showToast } from "./toast";
import { useRouter } from "next/navigation";

type Initial = {
  id?: string;
  title?: string;
  body?: string;
  status?: "Published" | "Draft";
};

export default function AnnouncementEditor({ initial }: { initial?: Initial }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [saving, setSaving] = useState(false);

  async function handleSave(e: React.FormEvent, publish = true) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: any = { title, body, status: publish ? "Published" : "Draft" };

      let res: Response;
      if (initial?.id) {
        payload.id = initial.id;
        res = await fetch("/api/announcements", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      } else {
        res = await fetch("/api/announcements", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      }

      if (!res.ok) {
        const txt = await res.text();
        showToast(`Save failed: ${txt}`, "error");
        setSaving(false);
        return;
      }

      showToast(initial?.id ? "Announcement updated" : "Announcement created", "success");
      setOpen(false);
      router.refresh();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      showToast("Save failed", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <button onClick={() => setOpen(true)} className="p-1 hover:bg-gray-100 rounded-md">
        {initial ? "Edit" : "New"}
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center text-gray-800 justify-center bg-black/50 bg-opacity-50 z-50">
          <form onSubmit={(e) => handleSave(e, true)} className="bg-white rounded-4xl p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-4">
              <p className="text-lg font-bold text-gray-900">{initial ? "Edit Announcement" : "New Announcement"}</p>
              <button type="button" onClick={() => setOpen(false)} className="text-gray-500">✕</button>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 rounded-xl p-2" />

              <label className="text-sm text-gray-600">Content</label>
              <textarea value={body} onChange={(e) => setBody(e.target.value)} className="border border-gray-300 rounded-xl p-2 min-h-30" />
            </div>

            <div className="flex items-center justify-end gap-3 mt-4">
              <button type="button" onClick={() => handleSave(new Event("submit") as unknown as React.FormEvent, false)} className="px-4 py-2 rounded-xl border">Save Draft</button>
              <button type="submit" disabled={saving} className="px-4 py-2 rounded-xl bg-emerald-700 text-white">{saving ? "Saving..." : initial ? "Update" : "Publish"}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
