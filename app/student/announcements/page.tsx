import { getAllAnnouncements } from "../../lib/data";

export default async function StudentAnnouncementsPage() {
  const announcements = await getAllAnnouncements();

  return (
    <div className="flex flex-col h-full px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
        <p className="text-sm text-gray-500 mt-0.5">Latest announcements</p>
      </div>

      {announcements.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-gray-400">
          <p className="text-sm">No announcements yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {announcements.map((a) => (
            <div key={a.id} className="bg-white rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-1">
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
              <p className="text-sm" style={{ color: "#16a34a" }}>
                {a.author}
                <span className="text-gray-400"> · {a.role}</span>
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
