import {
  getHistoryBorrowings,
  getHistoryBreakages,
  getHistoryStationLogs,
  getHistoryWasteLogs,
} from "../../lib/data";
import HistoryView from "../../ui/history-view";

export default async function LmoHistoryPage() {
  const [borrowings, breakages, stationLogs, wasteLogs] = await Promise.all([
    getHistoryBorrowings(),
    getHistoryBreakages(),
    getHistoryStationLogs(),
    getHistoryWasteLogs(),
  ]);

  return (
    <div className="flex flex-col h-full px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">History</h1>
        <p className="text-sm text-gray-500 mt-0.5">Searchable log of all records</p>
      </div>

      <HistoryView
        borrowings={borrowings}
        breakages={breakages}
        stationLogs={stationLogs}
        wasteLogs={wasteLogs}
      />
    </div>
  );
}
