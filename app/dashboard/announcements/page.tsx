import { getAllAnnouncements } from "../../lib/data";

function PencilIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}

export default async function AnnouncementsPage() {
  const announcements = await getAllAnnouncements();

  return (
    <div className="flex flex-col h-full px-8 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage and publish announcements</p>
        </div>
        <button
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ backgroundColor: "#2e7d32" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" x2="12" y1="5" y2="19" />
            <line x1="5" x2="19" y1="12" y2="12" />
          </svg>
          New
        </button>
      </div>

      {announcements.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-gray-400">
          <p className="text-sm">No announcements yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {announcements.map((a) => (
            <div key={a.id} className="bg-white rounded-2xl p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-gray-900">{a.title}</h2>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: a.status === "Published" ? "#dcfce7" : "#f3f4f6",
                      color: a.status === "Published" ? "#166534" : "#6b7280",
                    }}
                  >
                    {a.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <button className="hover:text-gray-600 transition-colors">
                    <PencilIcon />
                  </button>
                  <button className="hover:text-gray-600 transition-colors">
                    <EyeOffIcon />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {a.author} · {a.role}
              </p>
              <p className="text-sm text-gray-800 mt-3">{a.body}</p>
              <p className="text-xs text-gray-400 mt-2">{a.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
