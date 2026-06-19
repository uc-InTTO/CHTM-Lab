import {
  getLmoDashboardStats,
  getBorrowActivity,
  getLmoBreakages,
  getActiveIssuedBorrowings,
  getRecentNotifications,
  getRecentAnnouncements,
} from "../lib/data";
import LmoActivitySection from "../ui/lmo-activity-section";
import LmoBreakagesSection from "../ui/lmo-breakages-section";

function BellIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  );
}

function MegaphoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 11 19-9-9 19-2-8-8-2z"/>
    </svg>
  );
}

const statConfig = [
  { key: "activeBorrowings" as const, label: "Active Borrowings", subtitle: "currently issued", cardBg: "#fefce8", badgeBg: "#fef08a", badgeColor: "#854d0e", accentColor: "#eab308", Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg> },
  { key: "stationsInUse" as const, label: "Stations In Use", subtitle: "occupied stations", cardBg: "#faf5ff", badgeBg: "#e9d5ff", badgeColor: "#6b21a8", accentColor: "#a855f7", Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> },
  { key: "pendingReturns" as const, label: "Pending Returns", subtitle: "partial returns", cardBg: "#eff6ff", badgeBg: "#dbeafe", badgeColor: "#1e40af", accentColor: "#3b82f6", Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  { key: "pendingBreakages" as const, label: "Pending Breakages", subtitle: "unresolved", cardBg: "#f0fdf9", badgeBg: "#ccfbf1", badgeColor: "#0f766e", accentColor: "#0d9488", Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" x2="19.07" y1="4.93" y2="19.07"/></svg> },
  { key: "borrowRequests" as const, label: "Borrow Requests", subtitle: "awaiting approval", cardBg: "#fdf2f8", badgeBg: "#fce7f3", badgeColor: "#9d174d", accentColor: "#ec4899", Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg> },
];

export default async function LmoDashboardPage() {
  const [stats, activity, breakages, issuedBorrowings, notifications, announcements] = await Promise.all([
    getLmoDashboardStats(),
    getBorrowActivity(),
    getLmoBreakages(),
    getActiveIssuedBorrowings(),
    getRecentNotifications(),
    getRecentAnnouncements(),
  ]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-start justify-between px-8 pt-8 pb-5">
        <div>
          <p className="text-sm text-gray-500">Welcome to</p>
          <h1 className="text-2xl font-bold text-gray-900">LMO Dashboard</h1>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: "#111827" }}
        >
          <BellIcon size={14} />
          Notifications
        </button>
      </div>

      <div className="grid grid-cols-5 gap-3 px-8 pb-5">
        {statConfig.map((cfg) => (
          <div key={cfg.key} className="rounded-2xl p-4" style={{ backgroundColor: cfg.cardBg }}>
            <div className="flex items-start justify-between mb-5">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: cfg.badgeBg, color: cfg.badgeColor }}>
                {cfg.label}
              </span>
              <cfg.Icon />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats[cfg.key]}</p>
            <p className="text-xs text-gray-500 mt-0.5">{cfg.subtitle}</p>
            <div className="mt-4 h-1 rounded-full" style={{ backgroundColor: cfg.accentColor, width: "40px" }} />
          </div>
        ))}
      </div>

      <div className="flex flex-1 gap-4 px-8 pb-8 overflow-hidden">
        <div className="flex-1 min-w-0 flex flex-col gap-4 overflow-y-auto">
          <LmoActivitySection activity={activity} />
          <LmoBreakagesSection breakages={breakages} />
        </div>

        <div className="flex flex-col gap-4 shrink-0" style={{ width: "340px" }}>
          <div className="rounded-2xl p-5" style={{ backgroundColor: "#1a1f1a" }}>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2" style={{ backgroundColor: "#3b82f6", color: "#fff" }}>
              Active
            </span>
            <p className="text-xs mb-1" style={{ color: "#6b7280" }}>Currently Issued Equipment</p>
            <p className="text-base font-bold text-white mb-3">
              {issuedBorrowings.length} Active Borrowing{issuedBorrowings.length !== 1 ? "s" : ""}
            </p>
            {issuedBorrowings.length === 0 ? (
              <p className="text-xs mb-4" style={{ color: "#4b5563" }}>No active borrowings</p>
            ) : (
              <div className="flex flex-col gap-2 mb-4">
                {issuedBorrowings.map((b) => (
                  <div key={b.id} className="rounded-xl px-3 py-2.5" style={{ backgroundColor: "#2a2f2a" }}>
                    <p className="text-sm font-semibold text-white">{b.studentName}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>{b.station} · {b.itemCount} Item(s)</p>
                  </div>
                ))}
              </div>
            )}
            <button
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#f97316" }}
            >
              View all issued →
            </button>
          </div>

          <div className="bg-white rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-gray-800">
                <BellIcon size={14} />
                <h3 className="font-semibold text-sm">Notifications</h3>
              </div>
              <a href="#" className="text-xs text-gray-400 hover:text-gray-600">All &rsaquo;</a>
            </div>
            {notifications.length === 0 ? (
              <p className="text-xs text-gray-400">No notifications</p>
            ) : (
              <div className="flex flex-col gap-2">
                {notifications.map((n) => (
                  <div key={n.id} className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#f3f4f6" }}>
                      <BellIcon size={12} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-700">{n.sender}</p>
                      <p className="text-xs text-gray-400">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-gray-800">
                <MegaphoneIcon />
                <h3 className="font-semibold text-sm">Announcements</h3>
              </div>
              <a href="#" className="text-xs text-gray-400 hover:text-gray-600">All &rsaquo;</a>
            </div>
            {announcements.length === 0 ? (
              <p className="text-xs text-gray-400">No announcements</p>
            ) : (
              <div className="flex flex-col gap-2">
                {announcements.map((a) => (
                  <div key={a.id}>
                    <p className="text-xs font-medium text-gray-800">{a.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{a.body}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
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
