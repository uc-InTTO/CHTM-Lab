"use server";

import { getAdminFirestore } from "./firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";
import { getInventoryStats, getInventoryCategories, BorrowItem, BorrowSession, BorrowSessionDetails} from "./data";
import { db } from "./firebase";

const BORROW_SESSIONS_COLLECTION = "borrowSessions";
const BORROW_ITEMS_COLLECTION = "borrowItems"; 

export async function createNewBorrowSession() {
  const db = getAdminFirestore();
  // create new document in Firestore
  await db.collection('borrowSessions').add({
    status: 'Draft',
    createdAt: new Date().toISOString()
  });
  revalidatePath('/borrow'); // refreshes the page to show new session
}

export async function submitBorrowSession(sessionId: number) {
  const db = getAdminFirestore();
  
  try {
    // update the session status in Firestore
    await db.collection("borrowSessions").doc(String(sessionId)).update({
      status: "Sent",
      submittedAt: new Date().toISOString(),
    });

    // refresh the UI
    revalidatePath("/borrow"); 
    revalidatePath("/lmo/borrow-approvals");
    return { success: true };
  } catch (error) {
    console.error("Error submitting session:", error);
    return { success: false, message: "Could not submit log." };
  }
}


export async function createBorrowDraft(details: any) {
  const db = getAdminFirestore();
  const controlNo = await nextControlNo();
  const documentPayload = {
    controlNo,
    status: "Draft",
    studentName: details.studentName || "",
    floor: details.floor || "",
    date: details.date || "",
    idNumber: details.idNumber || "",
    section: details.section || "",
    courseSubject: details.courseSubject || "",
    timeIn: details.timeIn || "",
    timeOut: details.timeOut || "",
    activityTitle: details.activityTitle || "",
    instructor: details.instructor || "",
    custodianIssued: details.custodianIssued || "",
    createdAt: FieldValue.serverTimestamp()
  };

  
  const ref = await db.collection(BORROW_SESSIONS_COLLECTION).add(documentPayload);

  // Revalidate the borrow pages so server components pick up the new draft
  revalidatePath("/borrow");
  revalidatePath("/lmo/borrow");
  revalidatePath("/lmo/borrow-approvals");
  return {
    id: ref.id,
    ...documentPayload,
    createdAt: new Date().toISOString(),
  };
}



export async function addBorrowItem(sessionId: string, name: string, quantity: number): Promise<BorrowItem> {
  const db = getAdminFirestore();

  const sessionDoc = await db.collection(BORROW_SESSIONS_COLLECTION).doc(sessionId).get();
  if (!sessionDoc.exists) {
    throw new Error("Borrow session not found");
  }

  const ref = await db.collection(BORROW_ITEMS_COLLECTION).add({
    sessionId,
    name,
    quantity,
    createdAt: FieldValue.serverTimestamp(),
  });

  // Revalidate borrow pages
  revalidatePath("/borrow");
  revalidatePath("/lmo/borrow");
  revalidatePath("/lmo/borrow-approvals");
  return { id: ref.id, sessionId, name, quantity };
}

export async function approveBorrowSession(sessionId: string, approver: string | null = null) {
  const db = getAdminFirestore();
  try {
    const ref = db.collection(BORROW_SESSIONS_COLLECTION).doc(String(sessionId));
    const doc = await ref.get();
    if (!doc.exists) throw new Error("Borrow session not found");

    await ref.update({ status: "Approved", approvedAt: new Date().toISOString(), approvedBy: approver || "system" });
    revalidatePath("/lmo/borrow");
    revalidatePath("/borrow");
    revalidatePath("/lmo/borrow-approvals");
    return { id: doc.id, controlNo: doc.data()?.controlNo, status: "Approved" };
  } catch (err) {
    console.error("approveBorrowSession error", err);
    throw err;
  }
}

export async function issueBorrowSession(sessionId: string, issuer: string | null = null) {
  const db = getAdminFirestore();
  try {
    const ref = db.collection(BORROW_SESSIONS_COLLECTION).doc(String(sessionId));
    const doc = await ref.get();
    if (!doc.exists) throw new Error("Borrow session not found");

    await ref.update({ status: "Active", issuedAt: new Date().toISOString(), issuedBy: issuer || "system" });
    // revalidate relevant pages so active sessions show up
    revalidatePath("/lmo/borrow");
    revalidatePath("/borrow");
    revalidatePath("/lmo/borrow-approvals");
    return { id: doc.id, controlNo: doc.data()?.controlNo, status: "Active" };
  } catch (err) {
    console.error("issueBorrowSession error", err);
    throw err;
  }
}

export async function createDraftFromApproved(approvedSessionId: string) {
  const db = getAdminFirestore();
  const approvedRef = db.collection(BORROW_SESSIONS_COLLECTION).doc(String(approvedSessionId));
  const approvedDoc = await approvedRef.get();
  if (!approvedDoc.exists) throw new Error("Approved session not found");

  const data = approvedDoc.data() || {};

  // create a new draft copying relevant fields
  const payload: any = {
    controlNo: data.controlNo || (await nextControlNo()),
    status: "Draft",
    studentName: data.studentName || "",
    floor: data.floor || "",
    date: data.date || "",
    idNumber: data.idNumber || "",
    section: data.section || "",
    courseSubject: data.courseSubject || "",
    timeIn: data.timeIn || "",
    timeOut: data.timeOut || "",
    activityTitle: data.activityTitle || "",
    instructor: data.instructor || "",
    custodianIssued: data.custodianIssued || "",
    createdAt: FieldValue.serverTimestamp(),
  };

  const ref = await db.collection(BORROW_SESSIONS_COLLECTION).add(payload);
  revalidatePath("/lmo/borrow");
  return { id: ref.id, ...payload };
}

// MOCK DATA
export async function fetchFloorData(floor: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const mockStats = {
    equipmentTypes: 2,
    totalInventory: 150,
    availableToBorrow: 140,
    inKitchenSets: 10,
  };

  const mockCategories = [
    {
      name: `${floor} - Test Kitchen`,
      totalPcs: 150,
      items: [
        {
          id: 1,
          docId: "fake-doc-id-1",
          name: "Test Stainless Steel Pan",
          unit: "pc/s",
          total: 100,
          available: 95,
          inKitchenSet: 5,
          status: "Good" as const, 
        },
        {
          id: 2,
          docId: "fake-doc-id-2",
          name: "Test Mixing Bowl",
          unit: "pc/s",
          total: 50,
          available: 45,
          inKitchenSet: 5,
          status: "Fair" as const,
        },
      ],
    },
  ];

  return { stats: mockStats, categories: mockCategories };
}

//helper function


async function nextControlNo(): Promise<string> {
  const db = getAdminFirestore();
  
  try {
    // Attempt standard database counting aggregation
    const snapshot = await db.collection("borrowSessions").count().get();
    const currentCount = snapshot.data().count;
    const nextNum = 16500 + currentCount + 1;
    return `CTRL-${nextNum}`;
  } catch (error: any) {
    console.warn("Firebase collection quota hit. Using fallback identifier sequence.", error.message);

    const backupNum = Math.floor(1000 + Math.random() * 9000);
    return `CTRL-TEMP-${backupNum}`;
  }
}


