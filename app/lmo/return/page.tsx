import { getChtmReturnBorrowings, getNonChtmReturnBorrowings } from "../../lib/data";
import ReturnTabs from "../../ui/return-tabs";

export default async function LmoReturnPage() {
  const [chtm, nonChtm] = await Promise.all([
    getChtmReturnBorrowings(),
    getNonChtmReturnBorrowings(),
  ]);

  return (
    <div className="flex flex-col h-full px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Return Equipment</h1>
        <p className="text-sm text-gray-500 mt-0.5">Process equipment returns by control number</p>
      </div>

      <div className="flex gap-3 mb-5">
        <input
          className="flex-1 bg-white rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none border border-gray-200 focus:border-gray-400"
          placeholder="Control No., Student Name, or ID No."
          readOnly
        />
        <button
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ backgroundColor: "#2e7d32" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          Search
        </button>
      </div>

      <ReturnTabs chtm={chtm} nonChtm={nonChtm} />
    </div>
  );
}
