import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminFirestore } from "../../lib/firebase-admin";
import { parseInventoryJsonText, sanitizeDocPrefix } from "../../lib/inventory-json-import";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { jsonText?: string; sourceName?: string; collectionPath?: string };

    if (!body.jsonText || body.jsonText.trim().length === 0) {
      return NextResponse.json({ error: "JSON content is required." }, { status: 400 });
    }

    const parsed = parseInventoryJsonText(body.jsonText);
    const collectionPath = body.collectionPath ?? "inventoryImportRows";
    const sourceName = body.sourceName ?? "tableConvert.json";
    const docPrefix = sanitizeDocPrefix(sourceName);
    const db = getAdminFirestore();
    const batchSize = 400;

    let batch = db.batch();
    let writesInBatch = 0;

    for (const row of parsed.rows) {
      if (writesInBatch === batchSize) {
        await batch.commit();
        batch = db.batch();
        writesInBatch = 0;
      }

      const documentRef = db.collection(collectionPath).doc(`${docPrefix}-${String(row.rowIndex).padStart(5, "0")}`);

      batch.set(documentRef, {
        sourceName,
        rowIndex: row.rowIndex,
        kind: row.kind,
        primaryText: row.primaryText,
        secondaryText: row.secondaryText,
        values: row.values,
        rawFields: row.rawFields,
        createdAt: FieldValue.serverTimestamp(),
      });

      writesInBatch += 1;
    }

    if (writesInBatch > 0) {
      await batch.commit();
    }

    return NextResponse.json({
      collectionPath,
      sourceName,
      totalRows: parsed.totalRows,
      importedRows: parsed.importedRows,
      skippedRows: parsed.skippedRows,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Import failed.";
    const status = message.includes("Missing Firebase Admin credentials") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}