export interface InventoryJsonImportRow {
  rowIndex: number;
  values: string[];
  primaryText: string;
  secondaryText: string;
  kind: "empty" | "heading" | "item";
  rawFields: string[];
}

export interface InventoryJsonImportResult {
  totalRows: number;
  importedRows: number;
  skippedRows: number;
  rows: InventoryJsonImportRow[];
}

function sanitizeText(value: unknown) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : String(value ?? "").replace(/\s+/g, " ").trim();
}

export function sanitizeDocPrefix(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "inventory-json";
}

export function parseInventoryJsonText(text: string): InventoryJsonImportResult {
  const parsed = JSON.parse(text) as unknown;

  if (!Array.isArray(parsed)) {
    throw new Error("Inventory JSON must be an array of table rows.");
  }

  const rows = parsed
    .map((row, index): InventoryJsonImportRow => {
      if (row === null || typeof row !== "object" || Array.isArray(row)) {
        return {
          rowIndex: index + 1,
          values: [],
          primaryText: "",
          secondaryText: "",
          kind: "empty",
          rawFields: [],
        };
      }

      const entries = Object.entries(row as Record<string, unknown>);
      const cleanedEntries = entries
        .map(([key, value]) => [sanitizeText(key), sanitizeText(value)] as const)
        .filter(([key, value]) => key.length > 0 || value.length > 0);
      const values = cleanedEntries.map(([, value]) => value).filter((value) => value.length > 0);
      const primaryText = values[0] ?? "";
      const secondaryText = values[1] ?? "";
      const hasPrimary = primaryText.length > 0;
      const hasSecondary = secondaryText.length > 0;

      return {
        rowIndex: index + 1,
        values,
        primaryText,
        secondaryText,
        kind: hasPrimary ? (hasSecondary ? "item" : "heading") : "empty",
        rawFields: cleanedEntries.map(([key, value]) => (value.length > 0 ? `${key}: ${value}` : key)).filter((field) => field.length > 0),
      };
    })
    .filter((row) => row.kind !== "empty");

  return {
    totalRows: parsed.length,
    importedRows: rows.length,
    skippedRows: parsed.length - rows.length,
    rows,
  };
}