export type StatCard = {
  badge: string;
  count: number;
  subtitle: string;
};

export type Notification = {
  id: number;
  audience: string;
  sender: string;
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
  id: number;
  controlNo: string;
  status: "Draft" | "Sent" | "Approved" | "Returned";
};

export type BorrowItem = {
  id: number;
  sessionId: number;
  name: string;
  quantity: number;
};

export async function getCurrentBorrowDraft(): Promise<BorrowSession | null> {
  return null;
}

export async function getBorrowItems(sessionId: number): Promise<BorrowItem[]> {
  return [];
}

export type BorrowApproval = {
  id: number;
  controlNo: string;
  requestedBy: string;
  submittedAt: string;
  itemCount: number;
};

export async function getPendingApprovals(): Promise<BorrowApproval[]> {
  return [];
}
