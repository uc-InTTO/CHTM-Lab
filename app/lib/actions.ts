"use server";

import { getAdminFirestore } from "./firebase-admin";
import { revalidatePath } from "next/cache";

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
