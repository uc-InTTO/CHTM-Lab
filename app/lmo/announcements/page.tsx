import { getAllAnnouncements } from "../../lib/data";
import AnnouncementModal from "../../ui/announcement-modal";
import AnnouncementEditor from "../../ui/announcement-editor";

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
function AddAnnouncementIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7.99998 3H8.99998C7.04998 8.84 7.04998 15.16 8.99998 21H7.99998" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15 3C16.95 8.84 16.95 15.16 15 21" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 9.0001C8.84 7.0501 15.16 7.0501 21 9.0001" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
  );
}

function AddAnnoncementModal() {
  return (
  <div className="fixed inset-0 flex text-gray-900 items-center justify-center bg-gray-100 bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full h-fit ">
        <p className="text-lg font-bold text-gray-900 mb-4">New Announcement</p>
        <div className="flex flex-col gap-1.5">
          <p className="text-gray-800 text-sm">Title</p>
          <input className="border text-gray-80 border-gray-500/40 rounded-xl p-1.5"></input>
          <p className="text-gray-800 text-sm">Content</p>
          <input className="border text-gray-80 border-gray-500/40 rounded-xl p-1 min-h-32"></input>
      
        {/* buttons remove cancel button to the x then + cancel modal */}
        <div className="flex flex-row w-full text-gray-800 justify-between mt-5 gap-2">
          <button className="border rounded-xl border-gray-500/40 p-1.5 w-full hover:bg-gray-200/60">Cancel</button>   
          <button className="border text-white bg-emerald-700 rounded-xl border-gray-500/40 p-1 w-full hover:bg-green-700/80"> 
          
          Publish
          </button>
        </div>
      </div>
  </div>
  </div>
);
}

export default async function LmoAnnouncementsPage() {
  const announcements = await getAllAnnouncements();

  return (
    <div className="flex flex-col h-full px-8 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage and publish announcements</p>
        </div>
        <AnnouncementModal />
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
                  <div className="flex items-center gap-2">
                    <AnnouncementEditor initial={{ id: a.id, title: a.title, body: a.body, status: a.status }} />
                  </div>
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
