"use server";

import { getAdminFirestore } from "./firebase-admin";
import { revalidatePath } from "next/cache";
import { getInventoryStats, getInventoryCategories } from "./data";

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
// export async function fetchFloorData(floor: string) {
//   // Fetch both the stats and categories for the floor
//   const [stats, categories] = await Promise.all([
//     getInventoryStats(floor),
//     getInventoryCategories(floor),
//   ]);

//   return { stats, categories };
// }

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