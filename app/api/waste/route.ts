import { NextResponse } from "next/server";
import { getAdminFirestore } from "../../lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      schedule,
      section,
      course,
      activity,
      instructor,
      biodegKg,
      nonBiodegKg,
      usedOilKg,
      checkedBy,
      notes,
    } = body;

    const db = getAdminFirestore();
    const docRef = await db.collection("waste").add({
      schedule: schedule || null,
      section: section || null,
      course: course || "",
      activity: activity || "",
      instructor: instructor || "",
      biodegKg: Number(biodegKg) || 0,
      nonBiodegKg: Number(nonBiodegKg) || 0,
      usedOilKg: Number(usedOilKg) || 0,
      checkedBy: checkedBy || "",
      notes: notes || "",
      createdAt: FieldValue.serverTimestamp(),
    });

    try { revalidatePath("/lmo/waste"); } catch (e) {}

    return NextResponse.json({ id: docRef.id });
  } catch (err: any) {
    return new NextResponse(err?.message || String(err), { status: 500 });
  }
}
