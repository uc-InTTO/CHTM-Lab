"use client";

import { useRef, useState } from "react";

export default function InventoryImportButton() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsImporting(true);
    setMessage(null);

    try {
      const jsonText = await file.text();
      const response = await fetch("/api/inventory-import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonText,
          sourceName: file.name,
          collectionPath: "inventoryImportRows",
        }),
      });

      if (!response.ok) {
        const errorBody = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(errorBody?.error ?? "Import failed.");
      }

      const result = (await response.json()) as { importedRows: number; sourceName: string };

      setMessage(`Imported ${result.importedRows} rows from ${result.sourceName}.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Import failed.");
    } finally {
      setIsImporting(false);
      event.target.value = "";
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isImporting}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ backgroundColor: "#16a34a" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" x2="12" y1="5" y2="19" />
          <line x1="5" x2="19" y1="12" y2="12" />
        </svg>
        {isImporting ? "Importing..." : "Add Equipment"}
      </button>

      <input ref={inputRef} type="file" accept="application/json,.json" className="hidden" onChange={handleFileChange} />

      {message ? <p className="max-w-xs text-right text-xs text-gray-500">{message}</p> : null}
    </div>
  );
}