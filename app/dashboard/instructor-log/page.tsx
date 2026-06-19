import { getInstructorLogStats, getInstructorLogs } from "../../lib/data";
import LogTabs from "../../ui/log-tabs";

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

export default async function InstructorLogPage() {
  const [stats, logs] = await Promise.all([
    getInstructorLogStats(),
    getInstructorLogs(),
  ]);

  return (
    <div className="flex flex-col h-full px-8 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Instructor Log</h1>
          <p className="text-sm text-gray-500 mt-0.5">Track instructor lab sessions</p>
        </div>
        <button
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ backgroundColor: "#2e7d32" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" x2="12" y1="5" y2="19" />
            <line x1="5" x2="19" y1="12" y2="12" />
          </svg>
          New Log
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#e0e7ff" }}>
            <ClockIcon />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Sessions</p>
            <p className="text-2xl font-bold text-gray-900">{stats.activeSessions}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#dcfce7" }}>
            <CheckCircleIcon />
          </div>
          <div>
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4 text-gray-900">
        <BookIcon />
        <h2 className="font-semibold text-sm">All Logs</h2>
      </div>

      <LogTabs logs={logs} />
    </div>
  );
}
