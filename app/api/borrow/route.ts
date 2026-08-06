import { NextResponse } from "next/server";
import { createBorrowDraft, submitBorrowSession, addBorrowItem, approveBorrowSession } from "../../lib/actions";
import { createDraftFromApproved } from "../../lib/actions";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, payload } = body || {};

    if (action === "createDraft") {
      const result = await createBorrowDraft(payload || {});
      return NextResponse.json({ success: true, data: result });
    }

    if (action === "submit") {
      const result = await submitBorrowSession(payload?.sessionId);
      return NextResponse.json(result);
    }

    if (action === "addItem") {
      const result = await addBorrowItem(payload?.sessionId, payload?.name, payload?.quantity);
      return NextResponse.json({ success: true, data: result });
    }

    if (action === "approve") {
      const result = await approveBorrowSession(payload?.sessionId, payload?.approver || null);
      return NextResponse.json({ success: true, data: result });
    }

    if (action === "createDraftFromApproved") {
      const result = await createDraftFromApproved(payload?.sessionId);
      return NextResponse.json({ success: true, data: result });
    }

    return NextResponse.json({ success: false, message: "Unknown action" }, { status: 400 });
  } catch (error: any) {
    console.error("/api/borrow error:", error);
    return NextResponse.json({ success: false, message: error?.message || "Server error" }, { status: 500 });
  }
}
