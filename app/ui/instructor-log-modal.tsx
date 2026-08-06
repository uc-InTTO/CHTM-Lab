"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "./toast";

export default function InstructorLogModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [instructor, setInstructor] = useState("");
  const [section, setSection] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");
  const [floors, setFloors] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const floorOptions = [
    "4th Floor - Tribu",
    "5th Floor - Laundry Room",
    "6th Floor - Linen Room and Hotel Rooms",
    "9th Floor - Kitchen Laboratory and Supply Room",
    "10th Floor - Banquet Room, Canao Hall, Canao Kitchen and Lang-ayan Bar",
  ];

  function toggleFloor(name: string) {
    setFloors((s) => (s.includes(name) ? s.filter((f) => f !== name) : [...s, name]));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { instructor, section, course, date, timeIn, timeOut, floors };
      const res = await fetch("/api/instructor-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        showToast(`Save failed: ${text}`, "error");
        setSaving(false);
        return;
      }

      showToast("Log saved", "success");
      setOpen(false);
      setInstructor("");
      setSection("");
      setCourse("");
      setDate("");
      setTimeIn("");
      setTimeOut("");
      setFloors([]);
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
        New Log
      </button>

      {open && (
        <div className="fixed inset-0 z-50 text-gray-600 flex items-center justify-center bg-black/40">
          <form onSubmit={handleSave} className="w-180 bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center  justify-between mb-4">
              <h3 className="text-lg font-semibold">Instructor Log Entry</h3>
              <button type="button" onClick={() => setOpen(false)} className="text-gray-500">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-600">Instructor Name (SURNAME, FIRST NAME)</label>
                <input value={instructor} onChange={(e) => setInstructor(e.target.value)} className="mt-1 w-full border-gray-200 rounded-2xl border px-3 py-2" />
              </div>

              <div>
                <label className="text-xs text-gray-600">Section</label>
                <input value={section} onChange={(e) => setSection(e.target.value)} className="mt-1 w-full border-gray-200 rounded-2xl border px-3 py-2" />
              </div>

              <div>
                <label className="text-xs text-gray-600">Course / Subject</label>
                <input value={course} onChange={(e) => setCourse(e.target.value)} className="mt-1 w-full border-gray-200 rounded-2xl border px-3 py-2" />
              </div>

              <div>
                <label className="text-xs text-gray-600">Schedule</label>
                <input placeholder="MM/DD HH:MM - HH:MM" className="mt-1 w-full border-gray-200 rounded-2xl border px-3 py-2" />
              </div>

              <div>
                <label className="text-xs text-gray-600">Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full border-gray-200 rounded-2xl border px-3 py-2" />
              </div>

              <div>
                <label className="text-xs text-gray-600">Time In</label>
                <input type="time" value={timeIn} onChange={(e) => setTimeIn(e.target.value)} className="mt-1 w-full border-gray-200 rounded-2xl border px-3 py-2" />
              </div>

              <div>
                <label className="text-xs text-gray-600">Time Out</label>
                <input type="time" value={timeOut} onChange={(e) => setTimeOut(e.target.value)} className="mt-1 w-full border-gray-200 rounded-2xl border px-3 py-2" />
              </div>

              <div className="col-span-2">
                <label className="text-xs text-gray-600">Floors / Areas (multi-select)</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {floorOptions.map((f) => (
                    <label key={f} className="inline-flex items-center gap-2">
                      <input type="checkbox" checked={floors.includes(f)} onChange={() => toggleFloor(f)} />
                      <span className="text-sm">{f}</span>
                    </label>
                  ))}
                </div>
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
