import { getDashboardStats, getRecentNotifications, getRecentAnnouncements } from "../lib/data";

function BellIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function BookOpenIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
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

const cardMeta = [
  { key: "activeClasses" as const, icon: <BookOpenIcon />, cardBg: "#fffde8", badgeBg: "#fef08a", badgeColor: "#713f12", accentColor: "#eab308" },
  { key: "floorsInUse" as const, icon: <MapPinIcon />, cardBg: "#f5f0ff", badgeBg: "#e9d5ff", badgeColor: "#6b21a8", accentColor: "#a855f7" },
  { key: "studentRequests" as const, icon: <ClipboardIcon />, cardBg: "#e8f4fd", badgeBg: "#bae6fd", badgeColor: "#075985", accentColor: "#0ea5e9" },
];

export default async function DashboardPage() {
  const [stats, notifications, announcements] = await Promise.all([
    getDashboardStats(),
    getRecentNotifications(),
    getRecentAnnouncements(),
  ]);

  const statEntries = cardMeta.map((meta) => ({ ...meta, ...stats[meta.key] }));

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-start justify-between px-8 pt-8 pb-6">
        <div>
          <p className="text-sm text-gray-500">Welcome,</p>
          <h1 className="text-2xl font-bold text-gray-900">Demo Instructor</h1>
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
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-3 gap-4">
            {statEntries.map((card) => (
              <div key={card.badge} className="rounded-2xl p-5" style={{ backgroundColor: card.cardBg }}>
                <div className="flex items-start justify-between mb-8">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: card.badgeBg, color: card.badgeColor }}
                  >
                    {card.badge}
                  </span>
                  {card.icon}
                </div>
                <p className="text-4xl font-bold text-gray-900">{card.count}</p>
                <p className="text-sm text-gray-500 mt-1">{card.subtitle}</p>
                <div className="mt-5 h-1 rounded-full" style={{ backgroundColor: card.accentColor, width: "48px" }} />
              </div>
            ))}
          </div>
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
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-green-600" style={{ backgroundColor: "#dcfce7" }}>
                      <BellIcon size={14} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700">{n.message}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-teal-600">
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
