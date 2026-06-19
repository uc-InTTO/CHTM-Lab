import { getLmoCurrentIssueDraft, getBorrowItems } from "../../lib/data";
import LmoBorrowItemsPanel from "../../ui/lmo-borrow-items-panel";

function CartIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

export default async function LmoBorrowPage() {
  const session = await getLmoCurrentIssueDraft();
  const items = session ? await getBorrowItems(session.id) : [];

  return (
    <div className="flex flex-col h-full px-8 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Borrow Equipment</h1>
          <p className="text-sm text-gray-500 mt-0.5">Issue equipment to students</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ backgroundColor: "#2e7d32" }}
          >
            <CartIcon />
            New
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" x2="12" y1="5" y2="19" />
              <line x1="5" x2="19" y1="12" y2="12" />
            </svg>
            Add to Existing
          </button>
        </div>
      </div>

      {session ? (
        <>
          <div className="bg-white rounded-2xl mb-4">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-900">Borrowing Details</h2>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <PencilIcon />
              </button>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm font-semibold" style={{ color: "#16a34a" }}>#{session.controlNo}</p>
            </div>
          </div>

          <LmoBorrowItemsPanel session={session} items={items} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 text-gray-400">
          <p className="text-sm">No active issue session. Click <strong>New</strong> to start one.</p>
        </div>
      )}
    </div>
  );
}
