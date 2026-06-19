import { getWasteStats, getWasteRecords } from "../../lib/data";
import WastePanel from "../../ui/waste-panel";

export default async function LmoWastePage() {
  const [stats, records] = await Promise.all([
    getWasteStats(),
    getWasteRecords(),
  ]);

  return (
    <div className="flex flex-col h-full px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Waste Monitoring</h1>
        <p className="text-sm text-gray-500 mt-0.5">Track and analyze kitchen waste from lab sessions</p>
      </div>

      <WastePanel stats={stats} records={records} />
    </div>
  );
}
