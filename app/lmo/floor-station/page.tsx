import { getFloors, getActiveFloorLogs } from "../../lib/data";

export default async function LmoFloorStationPage() {
  const [floors, activeLogs] = await Promise.all([
    getFloors(),
    getActiveFloorLogs(),
  ]);

  return (
    <div className="flex flex-col h-full px-8 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Floor Log</h1>
          <p className="text-sm text-gray-500 mt-0.5">Monitor UC-CHTM floor usage</p>
        </div>
        <button
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ backgroundColor: "#2e7d32" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" x2="12" y1="5" y2="19" />
            <line x1="5" x2="19" y1="12" y2="12" />
          </svg>
          Log Floor
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {floors.map((floor) => (
          <div
            key={floor.id}
            className="bg-white rounded-2xl p-5 flex flex-col justify-between min-h-40 cursor-pointer hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: floor.badgeBg, color: floor.badgeColor }}
              >
                {floor.floor}
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: floor.status === "Available" ? "#dcfce7" : "#fee2e2",
                  color: floor.status === "Available" ? "#16a34a" : "#dc2626",
                }}
              >
                {floor.status}
              </span>
            </div>

            <p className="text-base font-bold text-gray-900 mt-4">{floor.name}</p>

            <p className="text-xs text-gray-400 mt-3">
              {floor.sessionsToday} session(s) today &middot;{" "}
              <span className="text-green-600 font-medium">Tap for details →</span>
            </p>
          </div>
        ))}
      </div>

      <div>
        <p className="text-xs font-semibold tracking-wider text-gray-400 mb-4">ACTIVE FLOOR LOGS</p>
        <div className="bg-white rounded-2xl">
          {activeLogs.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <p className="text-sm text-gray-400">No active floor logs.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {activeLogs.map((log) => (
                <div key={log.id} className="px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{log.floorName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{log.room} · {log.instructor}</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    {log.timeStart}{log.timeEnd ? ` – ${log.timeEnd}` : ""}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
