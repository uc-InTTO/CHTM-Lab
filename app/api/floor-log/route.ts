import { NextResponse } from "next/server";
import { getAdminFirestore } from "../../lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { floorName, room, instructor, timeStart, timeEnd, status } = body;

    const db = getAdminFirestore();
    const docRef = await db.collection("floorLogs").add({
      floorName: floorName || "",
      room: room || "",
      instructor: instructor || "",
      timeStart: timeStart || new Date().toISOString(),
      timeEnd: timeEnd || null,
      status: status || "Active",
      createdAt: FieldValue.serverTimestamp(),
    });

    try { revalidatePath("/lmo/floor-station"); } catch (e) {}

    return NextResponse.json({ id: docRef.id });
  } catch (err: any) {
    return new NextResponse(err?.message || String(err), { status: 500 });
  }
}
