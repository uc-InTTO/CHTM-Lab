import { getNonChtmBorrowings } from "../../lib/data";
import NonChtmBorrowTabs from "../../ui/non-chtm-borrow-tabs";

export default async function LmoNonChtmBorrowPage() {
  const borrowings = await getNonChtmBorrowings();

  return (
    <div className="flex flex-col h-full px-8 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Non-CHTM Borrow</h1>
          <p className="text-sm text-gray-500 mt-0.5">Equipment loans for non-CHTM departments</p>
        </div>
        <button
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ backgroundColor: "#2e7d32" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" x2="12" y1="5" y2="19" />
            <line x1="5" x2="19" y1="12" y2="12" />
          </svg>
          New Borrowing
        </button>
      </div>

      <NonChtmBorrowTabs borrowings={borrowings} />
    </div>
  );
}
