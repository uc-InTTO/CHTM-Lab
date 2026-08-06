import { NextResponse } from "next/server";
import { getAdminFirestore } from "../../lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { instructor, section, course, date, timeIn, timeOut, floors } = body;

    const db = getAdminFirestore();
    const doc = await db.collection("instructorLogs").add({
      instructor: instructor || "",
      section: section || "",
      course: course || "",
      date: date || null,
      timeIn: timeIn || null,
      timeOut: timeOut || null,
      floors: Array.isArray(floors) ? floors : [],
      status: "Active",
      createdAt: FieldValue.serverTimestamp(),
    });

    // revalidate the LMO instructor log page so server components update
    try {
      revalidatePath("/lmo/instructor-log");
    } catch (e) {
      // ignore if revalidation not supported in environment
    }

    return NextResponse.json({ id: doc.id });
  } catch (err: any) {
    return new NextResponse(err?.message || String(err), { status: 500 });
  }
}
