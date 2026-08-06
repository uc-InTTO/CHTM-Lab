"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "./toast";

export default function FloorLogModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [floorName, setFloorName] = useState("");
  const [room, setRoom] = useState("");
  const [instructor, setInstructor] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [saving, setSaving] = useState(false);

  const floorOptions = [
    "Tribu",
    "Laundry Room",
    "Linen Room and Hotel Rooms",
    "Kitchen Laboratory and Supply Room",
    "Banquet Room, Canao Hall, Canao Kitchen and Lang-ayan Bar",
  ];

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { floorName, room, instructor, timeStart, timeEnd, status: "Active" };
      const res = await fetch("/api/floor-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const txt = await res.text();
        showToast(`Save failed: ${txt}`, "error");
        setSaving(false);
        return;
      }

      showToast("Floor log saved", "success");
      setOpen(false);
      setFloorName("");
      setRoom("");
      setInstructor("");
      setTimeStart("");
      setTimeEnd("");
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
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
        style={{ backgroundColor: "#2e7d32" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" x2="12" y1="5" y2="19" />
          <line x1="5" x2="19" y1="12" y2="12" />
        </svg>
        Log Floor
      </button>

      {open && (
        <div className="fixed inset-0 z-50 text-gray-600 flex items-center justify-center bg-black/40">
          <form onSubmit={handleSave} className="w-180 bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center  justify-between mb-4">
              <h3 className="text-lg font-semibold">New Floor Log</h3>
              <button type="button" onClick={() => setOpen(false)} className="text-gray-500">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-600">Floor / Area</label>
                <select value={floorName} onChange={(e) => setFloorName(e.target.value)} className="mt-1 w-full border-gray-200 rounded-2xl border px-3 py-2">
                  <option value="">Select floor</option>
                  {floorOptions.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-600">Room</label>
                <input value={room} onChange={(e) => setRoom(e.target.value)} className="mt-1 w-full border-gray-200 rounded-2xl border px-3 py-2" />
              </div>

              <div>
                <label className="text-xs text-gray-600">Instructor</label>
                <input value={instructor} onChange={(e) => setInstructor(e.target.value)} className="mt-1 w-full border-gray-200 rounded-2xl border px-3 py-2" />
              </div>

              <div>
                <label className="text-xs text-gray-600">Start</label>
                <input type="datetime-local" value={timeStart} onChange={(e) => setTimeStart(e.target.value)} className="mt-1 w-full border-gray-200 rounded-2xl border px-3 py-2" />
              </div>

              <div>
                <label className="text-xs text-gray-600">End (optional)</label>
                <input type="datetime-local" value={timeEnd} onChange={(e) => setTimeEnd(e.target.value)} className="mt-1 w-full border-gray-200 rounded-2xl border px-3 py-2" />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 border-gray-200  rounded-2xl border">Cancel</button>
              <button type="submit" disabled={saving} className="px-4 py-2 rounded-2xl bg-green-700 text-white">
                {saving ? "Saving..." : "Save Log"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
