import { NextResponse } from "next/server";
import { getAdminFirestore } from "../../lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      controlNo,
      station,
      studentName,
      idNumber,
      itemDescription,
      damageType,
      quantity,
      amount,
      receiptNo,
      remarks,
    } = body;

    const db = getAdminFirestore();
    const docRef = await db.collection("breakages").add({
      controlNo: controlNo || null,
      station: station || null,
      studentName: studentName || "",
      idNumber: idNumber || "",
      itemDescription: itemDescription || "",
      damageType: damageType || "broken",
      quantity: quantity || 1,
      amount: amount || 0,
      receiptNo: receiptNo || null,
      remarks: remarks || "",
      status: "unreturned",
      createdAt: FieldValue.serverTimestamp(),
    });

    try { revalidatePath("/lmo/breakages"); } catch (e) {}

    return NextResponse.json({ id: docRef.id });
  } catch (err: any) {
    return new NextResponse(err?.message || String(err), { status: 500 });
  }
}
