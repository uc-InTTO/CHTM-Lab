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
    createdAt: FieldValue.serverTimestamp
  };

  
  const ref = await db.collection(BORROW_SESSIONS_COLLECTION).add(documentPayload);

  revalidatePath("/borrow");
  return { 
    id: ref.id, 
    ...documentPayload,
    createdAt: new Date().toISOString() // 
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

  revalidatePath("/borrow");
  return { id: ref.id, sessionId, name, quantity };
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


