import {
  getStudentDashboardStats,
  getStudentBorrowRequests,
  getRecentNotifications,
  getRecentAnnouncements,
} from "../lib/data";
import StudentBorrowRequestsPanel from "../ui/student-borrow-requests-panel";

function BellIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function MegaphoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 11 19-9-9 19-2-8-8-2z" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

const cardMeta = [
  { key: "itemsIssued" as const,     icon: <BoxIcon />,   label: "Items Issued",    subtitle: "currently out",     cardBg: "#fffde8", badgeBg: "#fef08a", badgeColor: "#713f12", accent: "#eab308" },
  { key: "itemsReturned" as const,   icon: <ClockIcon />, label: "Items Returned",  subtitle: "completed",         cardBg: "#fdf4ff", badgeBg: "#f3e8ff", badgeColor: "#6b21a8", accent: "#a855f7" },
  { key: "pendingRequests" as const, icon: <ClockIcon />, label: "Pending Requests",subtitle: "awaiting approval", cardBg: "#eff6ff", badgeBg: "#bfdbfe", badgeColor: "#1e40af", accent: "#3b82f6" },
  { key: "activeSlips" as const,     icon: <FileIcon />,  label: "Active Slips",    subtitle: "open borrowings",   cardBg: "#f0fdf4", badgeBg: "#bbf7d0", badgeColor: "#166534", accent: "#22c55e" },
];

export default async function StudentDashboardPage() {
  const [stats, requests, notifications, announcements] = await Promise.all([
    getStudentDashboardStats(),
    getStudentBorrowRequests(),
    getRecentNotifications(),
    getRecentAnnouncements(),
  ]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-start justify-between px-8 pt-8 pb-6">
        <div>
          <p className="text-sm text-gray-500">Welcome,</p>
          <h1 className="text-2xl font-bold text-gray-900">Demo Student</h1>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: "#111827" }}
        >
          <BellIcon size={15} />
          Notifications
        </button>
      </div>

      <div className="flex flex-1 gap-5 px-8 pb-8 overflow-hidden">
        <div className="flex-1 min-w-0 flex flex-col gap-4 overflow-y-auto">
          <div className="grid grid-cols-4 gap-4">
            {cardMeta.map((meta) => {
              const count = stats[meta.key];
              return (
                <div key={meta.key} className="rounded-2xl p-5" style={{ backgroundColor: meta.cardBg }}>
                  <div className="flex items-start justify-between mb-8">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: meta.badgeBg, color: meta.badgeColor }}
                    >
                      {meta.label}
                    </span>
                    {meta.icon}
                  </div>
                  <p className="text-4xl font-bold text-gray-900">{count}</p>
                  <p className="text-sm text-gray-500 mt-1">{meta.subtitle}</p>
                  <div className="mt-5 h-1 rounded-full" style={{ backgroundColor: meta.accent, width: "48px" }} />
                </div>
              );
            })}
          </div>

          <StudentBorrowRequestsPanel requests={requests} />
        </div>

        <div className="flex flex-col gap-4 shrink-0" style={{ width: "360px" }}>
          <div className="bg-white rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-gray-800">
                <BellIcon size={16} />
                <h3 className="font-semibold text-sm">Notifications</h3>
              </div>
              <a href="#" className="text-xs text-gray-400 hover:text-gray-600">All &rsaquo;</a>
            </div>
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-400">No notifications</p>
            ) : (
              <div className="flex flex-col gap-3">
                {notifications.map((n) => (
                  <div key={n.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#dcfce7" }}>
                      <BellIcon size={14} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">{n.sender}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MegaphoneIcon />
                <h3 className="font-semibold text-sm text-gray-800">Announcements</h3>
              </div>
              <a href="#" className="text-xs text-gray-400 hover:text-gray-600">All &rsaquo;</a>
            </div>
            {announcements.length === 0 ? (
              <p className="text-sm text-gray-400">No announcements</p>
            ) : (
              <div className="flex flex-col gap-3">
                {announcements.map((a) => (
                  <div key={a.id}>
                    <p className="text-sm font-medium text-gray-800">{a.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{a.body}</p>
                    <p className="text-xs text-gray-400 mt-1">{a.time}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
