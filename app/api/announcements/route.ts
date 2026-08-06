import { NextResponse } from "next/server";
import { getAdminFirestore } from "../../lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, body: content, status = "Draft" } = body;

    const db = getAdminFirestore();
    const doc = await db.collection("announcements").add({
      title: title || "",
      body: content || "",
      status: status === "Published" ? "Published" : "Draft",
      author: "LMO System",
      role: "LMO Custodian",
      createdAt: FieldValue.serverTimestamp(),
    });

    try {
      revalidatePath("/lmo/announcements");
    } catch (e) {
      // ignore
    }

    return NextResponse.json({ id: doc.id });
  } catch (err: any) {
    return new NextResponse(err?.message || String(err), { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, body: content, status } = body;
    if (!id) return new NextResponse("Missing id", { status: 400 });

    const db = getAdminFirestore();
    const ref = db.collection("announcements").doc(id);
    const doc = await ref.get();
    if (!doc.exists) return new NextResponse("Not found", { status: 404 });

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.body = content;
    if (status !== undefined) updateData.status = status === "Published" ? "Published" : "Draft";
    updateData.updatedAt = FieldValue.serverTimestamp();

    await ref.update(updateData);

    try {
      revalidatePath("/lmo/announcements");
    } catch (e) {}

    return NextResponse.json({ id });
  } catch (err: any) {
    return new NextResponse(err?.message || String(err), { status: 500 });
  }
}
