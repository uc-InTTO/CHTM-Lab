// QUOTA REACHED BOSET
// import { getAdminFirestore } from "./firebase-admin";


// export interface BorrowSession {
//   id: string;
//   status: string;
//   createdAt: string;
//   student?: string; 
//   itemCount?: number;
// }

// export interface BreakageItem {
//   id: string;
//   item: string;
//   quantity: number;
//   student: string;
//   date: string;
//   status: string;
//   period: string;
// }

// export interface DashboardAnalytics {
//   stats: {
//     activeBorrowings: number;
//     stationsInUse: number;
//     pendingReturns: number;
//     pendingBreakages: number;
//     borrowRequests: number;
//   };
//   recentBorrowings: BorrowSession[];
//   pendingBreakagesList: BreakageItem[];
// }

// export async function getDashboardAnalytics(): Promise<DashboardAnalytics> {
//   const db = getAdminFirestore();


//   const activeBorrowingsCount = db.collection("borrowSessions").where("status", "==", "Active").count().get();
//   const stationsCount = db.collection("stations").where("status", "==", "Occupied").count().get();
//   const pendingReturnsCount = db.collection("returns").where("status", "==", "Partial").count().get();
//   const pendingBreakagesCount = db.collection("breakages").where("status", "in", ["unreturned", "unresolved"]).count().get();
//   const borrowRequestsCount = db.collection("borrowRequests").where("status", "==", "Pending").count().get();


//   const recentActivityQuery = db.collection("borrowSessions").orderBy("createdAt", "desc").limit(10).get();
//   const breakagesListQuery = db.collection("breakages").where("status", "in", ["unreturned", "unresolved"]).orderBy("date", "desc").limit(10).get();


//   const [
//     activeSnap,
//     stationsSnap,
//     returnsSnap,
//     breakagesCountSnap,
//     requestsSnap,
//     recentActivitySnap,
//     breakagesListSnap
//   ] = await Promise.all([
//     activeBorrowingsCount,
//     stationsCount,
//     pendingReturnsCount,
//     pendingBreakagesCount,
//     borrowRequestsCount,
//     recentActivityQuery,
//     breakagesListQuery
//   ]);


//   const recentBorrowings: BorrowSession[] = recentActivitySnap.docs.map(doc => ({
//     id: doc.id,
//     ...(doc.data() as Omit<BorrowSession, 'id'>)
//   }));

//   const pendingBreakagesList: BreakageItem[] = breakagesListSnap.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data()
//   } as BreakageItem));

//   return {
//     stats: {
//       activeBorrowings: activeSnap.data().count,
//       stationsInUse: stationsSnap.data().count,
//       pendingReturns: returnsSnap.data().count,
//       pendingBreakages: breakagesCountSnap.data().count,
//       borrowRequests: requestsSnap.data().count,
//     },
//     recentBorrowings,
//     pendingBreakagesList,
//   };
// }



export interface BorrowSession {
  id: string;
  status: string;
  createdAt: string;
  student?: string; 
  itemCount?: number;
}

export interface BreakageItem {
  id: string | number;
  item: string;
  quantity: number;
  student: string;
  date: string;
  status: string;
  period: "Daily" | "Weekly" | "Monthly" | "Semester" | "All"; 
}

export interface DashboardAnalytics {
  stats: {
    activeBorrowings: number;
    stationsInUse: number;
    pendingReturns: number;
    pendingBreakages: number;
    borrowRequests: number;
  };
  recentBorrowings: BorrowSession[];
  pendingBreakagesList: BreakageItem[];
}

export async function getDashboardAnalytics(): Promise<DashboardAnalytics> {
  
  return {
    stats: {
      activeBorrowings: 14,
      stationsInUse: 6,
      pendingReturns: 3,
      pendingBreakages: 2,
      borrowRequests: 7,
    },
    recentBorrowings: [
      {
        id: "mock-session-1",
        status: "Active",
        createdAt: "2026-07-23T08:00:00Z",
        student: "Jane Doe",
        itemCount: 3,
      },
      {
        id: "mock-session-2",
        status: "Draft",
        createdAt: "2026-07-22T14:30:00Z",
        student: "Mark Smith",
        itemCount: 1,
      }
    ],
    pendingBreakagesList: [
      {
        id: "mock-break-1",
        item: "Wine Glass",
        quantity: 2,
        student: "Jane Doe",
        date: "July 23, 2026",
        status: "unreturned",
        period: "Daily",
      },
      {
        id: "mock-break-2",
        item: "Dinner Plate",
        quantity: 1,
        student: "Mark Smith",
        date: "July 20, 2026",
        status: "unresolved",
        period: "Weekly",
      }
    ],
  };
}