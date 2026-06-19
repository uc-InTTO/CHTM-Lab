import { getBreakageStats, getBreakageReports } from "../../lib/data";
import BreakagesPanel from "../../ui/breakages-panel";

export default async function LmoBreakagesPage() {
  const [stats, reports] = await Promise.all([
    getBreakageStats(),
    getBreakageReports(),
  ]);

  return (
    <div className="flex flex-col h-full px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Breakages &amp; Damages</h1>
        <p className="text-sm text-gray-500 mt-0.5">Track equipment damage, breakages, and unreturned items</p>
      </div>

      <BreakagesPanel stats={stats} reports={reports} />
    </div>
  );
}
