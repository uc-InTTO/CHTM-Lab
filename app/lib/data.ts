import { getAdminFirestore } from "./firebase-admin";
import { FieldValue, type DocumentData } from "firebase-admin/firestore";

export type StatCard = {
  badge: string;
  count: number;
  subtitle: string;
};

export type Notification = {
  id: number;
  audience: string;
  sender: string;
  message: string;
  time: string;
  group: string;
};

export type Announcement = {
  id: number;
  title: string;
  status: "Published" | "Draft";
  author: string;
  role: string;
  body: string;
  time: string;
};

export type DashboardStats = {
  activeClasses: StatCard;
  floorsInUse: StatCard;
  studentRequests: StatCard;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  return {
    activeClasses: { badge: "Active Classes", count: 0, subtitle: "borrowings linked" },
    floorsInUse: { badge: "Floors In Use", count: 0, subtitle: "active floors" },
    studentRequests: { badge: "Student Requests", count: 0, subtitle: "pending approval" },
  };
}

export async function getRecentNotifications(): Promise<Notification[]> {
  return [];
}

export async function getAllNotifications(): Promise<Notification[]> {
  return [];
}

export async function getRecentAnnouncements(): Promise<Announcement[]> {
  return [];
}

export async function getAllAnnouncements(): Promise<Announcement[]> {
  return [];
}

export type InstructorLog = {
  id: number;
  status: "Active" | "Completed";
  subject: string;
  room: string;
  date: string;
  timeStart: string;
  timeEnd: string | null;
};

export type InstructorLogStats = {
  activeSessions: number;
  completed: number;
};

export async function getInstructorLogStats(): Promise<InstructorLogStats> {
  return { activeSessions: 0, completed: 0 };
}

export async function getInstructorLogs(): Promise<InstructorLog[]> {
  return [];
}

export type Floor = {
  id: number;
  floor: string;
  name: string;
  status: "Available" | "Occupied";
  sessionsToday: number;
  badgeBg: string;
  badgeColor: string;
};

export type FloorLog = {
  id: number;
  floorName: string;
  room: string;
  instructor: string;
  timeStart: string;
  timeEnd: string | null;
};

export async function getFloors(): Promise<Floor[]> {
  return [
    { id: 1, floor: "4th Floor", name: "Tribu", status: "Available", sessionsToday: 0, badgeBg: "#f3e8ff", badgeColor: "#7c3aed" },
    { id: 2, floor: "5th Floor", name: "Laundry Room", status: "Available", sessionsToday: 0, badgeBg: "#dbeafe", badgeColor: "#2563eb" },
    { id: 3, floor: "6th Floor", name: "Linen Room and Hotel Rooms", status: "Available", sessionsToday: 0, badgeBg: "#dbeafe", badgeColor: "#2563eb" },
    { id: 4, floor: "9th Floor", name: "Kitchen Laboratory and Supply Room", status: "Available", sessionsToday: 0, badgeBg: "#dcfce7", badgeColor: "#16a34a" },
    { id: 5, floor: "10th Floor", name: "Banquet Room, Canao Hall, Canao Kitchen and Lang-ayan Bar", status: "Available", sessionsToday: 0, badgeBg: "#fef3c7", badgeColor: "#d97706" },
  ];
}

export async function getActiveFloorLogs(): Promise<FloorLog[]> {
  return [];
}

export type BorrowSession = {
  id: string;
  controlNo: string;
  status: "Draft" | "Sent" | "Approved" | "Returned";
  studentName?: string;
  floor?: string;
  date?: string;
  idNumber?: string;
  section?: string;
  course?: string;
  timeIn?: string;
  timeOut?: string;
  activityTitle?: string;
  instructor?: string;
  custodianIssued?: string;
};


export type BorrowSessionDetails = Omit<BorrowSession, "id" | "controlNo" | "status">;

export type BorrowItem = {
  id: string;
  sessionId: string;
  name: string;
  quantity: number;
};

// firestore collections for the borrow log
const BORROW_SESSIONS_COLLECTION = "borrowSessions";
const BORROW_ITEMS_COLLECTION = "borrowItems";
const COUNTERS_COLLECTION = "counters";



async function nextControlNo(): Promise<string> {
  const db = getAdminFirestore();
  const counterRef = db.collection(COUNTERS_COLLECTION).doc("borrowSession");

  const seq = await db.runTransaction(async (tx) => {
    const doc = await tx.get(counterRef);
    const current = doc.exists ? ((doc.data()?.value as number) ?? 0) : 0;
    const next = current + 1;
    tx.set(counterRef, { value: next, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
    return next;
  });

  return `BRW-${new Date().getFullYear()}-${String(seq).padStart(5, "0")}`;
}

function toBorrowSession(id: string, data: DocumentData): BorrowSession {
  return {
    id,
    controlNo: data.controlNo,
    status: data.status,
    studentName: data.studentName,
    floor: data.floor,
    date: data.date,
    idNumber: data.idNumber,
    section: data.section,
    course: data.course,
    timeIn: data.timeIn,
    timeOut: data.timeOut,
    activityTitle: data.activityTitle,
    instructor: data.instructor,
    custodianIssued: data.custodianIssued,
  };
}


async function findDraftSession(): Promise<BorrowSession | null> {
  try {
    const db = getAdminFirestore();
    const snapshot = await db
      .collection(BORROW_SESSIONS_COLLECTION)
      .where("status", "==", "Draft")
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return toBorrowSession(doc.id, doc.data());
  } catch {
    return null;
  }
}

export async function getCurrentBorrowDraft(): Promise<BorrowSession | null> {
  return findDraftSession();
}

export async function getLmoCurrentIssueDraft(): Promise<BorrowSession | null> {
  return findDraftSession();
}

export async function getBorrowItems(sessionId: string): Promise<BorrowItem[]> {
  try {
    const db = getAdminFirestore();
    const snapshot = await db
      .collection(BORROW_ITEMS_COLLECTION)
      .where("sessionId", "==", sessionId)
      .orderBy("createdAt", "asc")
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, sessionId: data.sessionId, name: data.name, quantity: data.quantity };
    });
  } catch {
    return [];
  }
}


export async function createBorrowDraft(details: BorrowSessionDetails = {}): Promise<BorrowSession> {
  const db = getAdminFirestore();
  const controlNo = await nextControlNo();


  const cleanDetails = Object.fromEntries(
    Object.entries(details).filter(([, value]) => value !== undefined && value !== "")
  );

  const ref = await db.collection(BORROW_SESSIONS_COLLECTION).add({
    controlNo,
    status: "Draft",
    ...cleanDetails,
    createdAt: FieldValue.serverTimestamp(),
  });

  return { id: ref.id, controlNo, status: "Draft", ...cleanDetails };
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

  return { id: ref.id, sessionId, name, quantity };
}


export async function submitBorrowSession(sessionId: string): Promise<BorrowSession> {
  const db = getAdminFirestore();
  const ref = db.collection(BORROW_SESSIONS_COLLECTION).doc(sessionId);

  const [doc, items] = await Promise.all([ref.get(), getBorrowItems(sessionId)]);

  if (!doc.exists) {
    throw new Error("Borrow session not found");
  }

  const data = doc.data()!;

  if (data.status !== "Draft") {
    throw new Error(`Cannot submit a session with status "${data.status}"`);
  }

  if (items.length === 0) {
    throw new Error("Cannot submit a session with no items");
  }

  await ref.update({ status: "Sent", sentAt: FieldValue.serverTimestamp() });

  return { id: doc.id, controlNo: data.controlNo, status: "Sent" };
}

export type BorrowApproval = {
  id: string;
  controlNo: string;
  requestedBy: string;
  submittedAt: string;
  itemCount: number;
};

export async function getPendingApprovals(): Promise<BorrowApproval[]> {
  try {
    const db = getAdminFirestore();
    const snapshot = await db
      .collection(BORROW_SESSIONS_COLLECTION)
      .where("status", "==", "Sent")
      .orderBy("sentAt", "desc")
      .get();

    const approvals: BorrowApproval[] = [];
    for (const doc of snapshot.docs) {
      const data = doc.data();
      const itemsSnapshot = await db
        .collection(BORROW_ITEMS_COLLECTION)
        .where("sessionId", "==", doc.id)
        .get();

      approvals.push({
        id: doc.id,
        controlNo: data.controlNo || "",
        requestedBy: data.studentName || "",
        submittedAt: data.sentAt || "",
        itemCount: itemsSnapshot.size,
      });
    }

    return approvals;
  } catch (err) {
    return [];
  }
}

export async function getApprovedBorrowRequests(limit = 10): Promise<BorrowSession[]> {
  try {
    const db = getAdminFirestore();
    const snapshot = await db
      .collection(BORROW_SESSIONS_COLLECTION)
      .where("status", "==", "Approved")
      .orderBy("approvedAt", "desc")
      .limit(limit)
      .get();

    return snapshot.docs.map((doc) => toBorrowSession(doc.id, doc.data()));
  } catch (err) {
    return [];
  }
}

export type MyListRecord = {
  id: number;
  controlNo: string;
  status: "Active" | "Returned" | "Requested";
  itemCount: number;
  date: string;
};

export async function getMyListRecords(): Promise<MyListRecord[]> {
  return [];
}

export type LmoDashboardStats = {
  activeBorrowings: number;
  stationsInUse: number;
  pendingReturns: number;
  pendingBreakages: number;
  borrowRequests: number;
};

export type BorrowActivity = {
  id: number;
  borrower: string;
  station: string;
  date: string;
  status: "active" | "returned";
  period: "daily" | "weekly" | "monthly" | "semester";
};

export type BreakageItem = {
  id: string;
  item: string;
  quantity: number;
  student: string;
  date: string;
  status: "unreturned" | "resolved";
  period: "daily" | "weekly" | "monthly" | "semester";
};

export type ActiveIssuedBorrowing = {
  id: number;
  studentName: string;
  station: string;
  itemCount: number;
};

export async function getLmoDashboardStats(): Promise<LmoDashboardStats> {
  return { activeBorrowings: 0, stationsInUse: 0, pendingReturns: 0, pendingBreakages: 0, borrowRequests: 0 };
}

export async function getBorrowActivity(): Promise<BorrowActivity[]> {
  return [];
}

export async function getLmoBreakages(): Promise<BreakageItem[]> {
  return [];
}

export async function getActiveIssuedBorrowings(): Promise<ActiveIssuedBorrowing[]> {
  return [];
}

export type ReturnBorrowing = {
  id: number;
  studentName: string;
  controlNo: string;
  station: string;
  status: "active" | "partial";
};

export type NonChtmBorrowing = {
  id: number;
  controlNo: string;
  student: string;
  college: string;
  borrowDate: string;
  returnDate: string;
  itemTypes: number;
  contact: string;
  status: "pending" | "approved" | "returned";
};

export async function getChtmReturnBorrowings(): Promise<ReturnBorrowing[]> {
  return [];
}

export async function getNonChtmReturnBorrowings(): Promise<ReturnBorrowing[]> {
  return [];
}

export async function getNonChtmBorrowings(): Promise<NonChtmBorrowing[]> {
  return [];
}

export type BreakageStats = {
  pending: number;
  assessed: number;
  charged: number;
  resolved: number;
};

export type BreakageReport = {
  id: number;
  itemName: string;
  qty: number;
  student: string;
  studentId: string;
  amount: number;
  damageType: "broken" | "missing_replacement" | "missing_paid" | "damaged" | "unreturned";
  status: "pending" | "assessed" | "charged" | "resolved";
};

export async function getBreakageStats(): Promise<BreakageStats> {
  return { pending: 0, assessed: 0, charged: 0, resolved: 0 };
}

export async function getBreakageReports(): Promise<BreakageReport[]> {
  return [];
}

export type WasteStats = {
  todayKg: number;
  avgPerSession: number;
  totalKg: number;
  sessionsLogged: number;
  biodegKg: number;
  nonBiodegKg: number;
  usedOilKg: number;
};

export type WasteRecord = {
  id: number;
  schedule: string;
  section: string;
  course: string;
  activity: string;
  instructor: string;
  biodegKg: number;
  nonBiodegKg: number;
  usedOilKg: number;
  checkedBy: string;
  notes: string;
  date: string;
};

export async function getWasteStats(): Promise<WasteStats> {
  return { todayKg: 0, avgPerSession: 0, totalKg: 0, sessionsLogged: 0, biodegKg: 0, nonBiodegKg: 0, usedOilKg: 0 };
}

export async function getWasteRecords(): Promise<WasteRecord[]> {
  return [];
}

export type LmoMyListItem = {
  id: number;
  controlNo: string;
  date: string;
  section: string;
  instructor: string;
  period: string;
  station: string;
  status: "active" | "returned" | "requested";
  items: { name: string; issued: number; unit: string; timeIn: string }[];
};

export async function getLmoMyListItems(): Promise<LmoMyListItem[]> {
  return [];
}

export type InventoryStats = {
  equipmentTypes: number;
  totalInventory: number;
  availableToBorrow: number;
  inKitchenSets: number;
};

export type InventoryItem = {
  id: number;
  name: string;
  unit: string;
  total: number;
  available: number;
  inKitchenSet: number | null;
  status: "Good" | "Fair" | "Poor";
};

export type InventoryCategory = {
  name: string;
  items: InventoryItem[];
  totalPcs: number;
};

interface InventoryImportDoc {
  rowIndex?: number;
  kind?: "heading" | "item" | "empty" | string;
  primaryText?: string;
  secondaryText?: string;
  values?: string[];
  sourceName?: string;
}

const INVENTORY_COLLECTION = "inventoryImportRows";

const INVENTORY_METADATA_ROWS = new Set([
  "AY 2025-2026",
  "I. Inventory/Preventive Maintenance",
  "ITEM DESCRIPTION",
  "Actual inventory dates: April 20-28, 2026",
  "Qty",
  "ONHAND",
]);

const CATEGORY_HINTS = [
  " area",
  "kitchen",
  "room",
  "section",
  "floor",
  "hall",
  "lab",
  "laboratory",
  "bed set",
  "bed skirting",
  "bed pads",
  "bed runners",
  "bed sheets",
  "pillows",
  "pillow cases",
  "towels",
  "carpets",
  "blanket",
  "comforter",
  "duvet cover",
  "duvet filler",
  "seat cover",
  "table cloth",
  "table skirting",
  "table runner",
  "table mat",
  "long table cloth",
  "bathrobe",
];

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function isMetadataRow(text: string) {
  const normalized = normalizeText(text);
  return INVENTORY_METADATA_ROWS.has(normalized) || normalized.toLowerCase().includes("inventory/preventive maintenance");
}

function parseQuantity(text: string) {
  const matches = text.match(/\d+/g);
  if (!matches || matches.length === 0) {
    return null;
  }

  return Number.parseInt(matches[matches.length - 1], 10);
}

function looksLikeCategory(text: string) {
  const normalized = normalizeText(text);
  if (!normalized) {
    return false;
  }

  const lower = normalized.toLowerCase();

  if (normalized.length <= 40 && /^[A-Z0-9\s,&/'"().-]+$/.test(normalized)) {
    return true;
  }

  return CATEGORY_HINTS.some((hint) => lower.includes(hint));
}

async function loadInventoryImportRows(): Promise<InventoryImportDoc[]> {
  try {
    const db = getAdminFirestore();
    const snapshot = await db.collection(INVENTORY_COLLECTION).orderBy("rowIndex", "asc").get();

    return snapshot.docs.map((document) => document.data() as InventoryImportDoc);
  } catch {
    return [];
  }
}

function buildInventoryCategories(rows: InventoryImportDoc[]): InventoryCategory[] {
  const categories = new Map<string, InventoryItem[]>();
  let currentCategory = "Imported Inventory";
  let nextItemId = 1;

  const ensureCategory = (name: string) => {
    if (!categories.has(name)) {
      categories.set(name, []);
    }
  };

  ensureCategory(currentCategory);

  for (const row of rows) {
    const primaryText = normalizeText(row.primaryText ?? "");
    const secondaryText = normalizeText(row.secondaryText ?? "");
    const values = row.values ?? [];

    if (!primaryText || isMetadataRow(primaryText) || isMetadataRow(secondaryText)) {
      continue;
    }

    const quantity = parseQuantity(secondaryText) ?? values.map(parseQuantity).find((value) => value !== null) ?? null;
    const isCategory = row.kind === "heading" && quantity === null && looksLikeCategory(primaryText);

    if (isCategory) {
      currentCategory = primaryText;
      ensureCategory(currentCategory);
      continue;
    }

    ensureCategory(currentCategory);

    const total = quantity ?? 1;
    const item: InventoryItem = {
      id: nextItemId,
      name: primaryText,
      unit: "pc/s",
      total,
      available: total,
      inKitchenSet: null,
      status: total > 10 ? "Good" : total > 3 ? "Fair" : "Poor",
    };

    categories.get(currentCategory)?.push(item);
    nextItemId += 1;
  }

  return Array.from(categories.entries())
    .map(([name, items]) => ({
      name,
      items,
      totalPcs: items.reduce((sum, item) => sum + item.total, 0),
    }))
    .filter((category) => category.items.length > 0);
}

export async function getInventoryStats(): Promise<InventoryStats> {
  const categories = await getInventoryCategories();

  return {
    equipmentTypes: categories.reduce((sum, category) => sum + category.items.length, 0),
    totalInventory: categories.reduce((sum, category) => sum + category.totalPcs, 0),
    availableToBorrow: categories.reduce((sum, category) => sum + category.items.reduce((itemSum, item) => itemSum + item.available, 0), 0),
    inKitchenSets: categories.reduce((sum, category) => sum + category.items.reduce((itemSum, item) => itemSum + (item.inKitchenSet ?? 0), 0), 0),
  };
}

export async function getInventoryCategories(): Promise<InventoryCategory[]> {
  const rows = await loadInventoryImportRows();
  return buildInventoryCategories(rows);
}

export type ReportSummary = {
  label: string;
  borrowings: number;
  returned: number;
  breakages: number;
  wasteLogs: number;
};

export type ReportRecord = {
  id: number;
  controlNo: string;
  status: "active" | "returned";
  student: string;
  studentId: string;
  station: string;
  date: string;
  course: string;
  section: string;
  instructor: string;
  items: { name: string; issued: number; returned: number; unit: string }[];
};

export async function getReportSummary(): Promise<ReportSummary> {
  return { label: "", borrowings: 0, returned: 0, breakages: 0, wasteLogs: 0 };
}

export async function getReportRecords(): Promise<ReportRecord[]> {
  return [];
}

export type HistoryBorrowing = {
  id: number;
  controlNo: string;
  student: string;
  station: string;
  section: string;
  instructor: string;
  date: string;
  timeIn: string;
  timeOut: string | null;
  status: "active" | "returned";
  items: { name: string; qty: number }[];
};

export type HistoryBreakage = {
  id: number;
  itemName: string;
  qty: number;
  student: string;
  date: string;
  damageType: string;
  status: string;
};

export type HistoryStationLog = {
  id: number;
  floor: string;
  station: string;
  instructor: string;
  date: string;
  timeStart: string;
  timeEnd: string | null;
  status: string;
};

export type HistoryWasteLog = {
  id: number;
  date: string;
  section: string;
  course: string;
  biodegKg: number;
  nonBiodegKg: number;
  usedOilKg: number;
};

export async function getHistoryBorrowings(): Promise<HistoryBorrowing[]> {
  return [];
}

export async function getHistoryBreakages(): Promise<HistoryBreakage[]> {
  return [];
}

export async function getHistoryStationLogs(): Promise<HistoryStationLog[]> {
  return [];
}

export async function getHistoryWasteLogs(): Promise<HistoryWasteLog[]> {
  return [];
}

export type StudentDashboardStats = {
  itemsIssued: number;
  itemsReturned: number;
  pendingRequests: number;
  activeSlips: number;
};

export type StudentBorrowRequest = {
  id: number;
  controlNo: string;
  status: "Pending" | "Approved" | "Received";
  submittedAt: string;
  itemCount: number;
};

export type StudentBorrowing = {
  id: number;
  controlNo: string;
  date: string;
  section: string;
  instructor: string;
  floor: string;
  station: string;
  status: "active" | "returned" | "requested";
  items: { name: string; issued: number; unit: string; timeIn: string }[];
};

export type StudentBreakage = {
  id: number;
  itemName: string;
  qty: number;
  date: string;
  status: "pending" | "resolved";
};

export async function getStudentDashboardStats(): Promise<StudentDashboardStats> {
  return { itemsIssued: 0, itemsReturned: 0, pendingRequests: 0, activeSlips: 0 };
}

export async function getStudentBorrowRequests(): Promise<StudentBorrowRequest[]> {
  return [];
}

export async function getStudentBorrowDraft(): Promise<BorrowSession | null> {
  return findDraftSession();
}

export async function getStudentBorrowings(): Promise<StudentBorrowing[]> {
  return [];
}

export async function getStudentBreakages(): Promise<StudentBreakage[]> {
  return [];
}