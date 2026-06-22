import { getReportSummary, getReportRecords } from "../../lib/data";
import ReportsView from "../../ui/reports-view";

function DownloadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" x2="12" y1="15" y2="3"/>
    </svg>
  );
}

export default async function LmoReportsPage() {
  const [summary, records] = await Promise.all([
    getReportSummary(),
    getReportRecords(),
  ]);

  return (
    <div className="flex flex-col h-full px-8 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-500 mt-0.5">Generate and view period reports</p>
        </div>
        <div className="flex items-center gap-2">
          {[
            { label: "Report PDF" },
            { label: "Borrowings CSV" },
            { label: "Breakages CSV" },
          ].map((btn) => (
            <button
              key={btn.label}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <DownloadIcon />
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <ReportsView summary={summary} records={records} />
    </div>
  );
}
