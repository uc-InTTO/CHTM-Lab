// app/lmo/borrow/page.tsx
import { getLmoCurrentIssueDraft, getBorrowItems, getApprovedBorrowRequests } from "../../lib/data";
import LmoBorrowItemsPanel from "../../ui/lmo-borrow-items-panel";
import BorrowActionsPanel from "../../ui/borrow-actions-panel";
import { PencilIcon } from "../../ui/icons"; 

export default async function LmoBorrowPage() {
  const session = await getLmoCurrentIssueDraft();
  const items = session ? await getBorrowItems(session.id) : [];

  const approved = await getApprovedBorrowRequests(1);
  const pendingApprovedRequest = approved && approved.length > 0 ? approved[0] : null;

  return (
    <div className="flex flex-col h-full px-8 py-8 bg-gray-50/50 min-h-screen">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Borrow Equipment</h1>
          <p className="text-sm text-gray-500 mt-0.5">Issue equipment to students</p>
        </div>
        
        <BorrowActionsPanel prefilledRequest={session ? null : pendingApprovedRequest} />
      </div>

      {session ? (
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-900">Borrowing Details</h2>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <PencilIcon />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-5 py-4 text-xs bg-gray-50/50 rounded-b-2xl">
              <div>
                <p className="text-gray-400 font-medium mb-0.5">Control Number</p>
                <p className="text-sm font-bold text-emerald-600">#{session.controlNo}</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium mb-0.5">Student</p>
                <p className="font-semibold text-gray-800">{session.studentName}</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium mb-0.5">Floor & Section</p>
                <p className="font-semibold text-gray-800">Floor {session.floor} • {session.section}</p>
              </div>
              <div>
                <p className="text-gray-400 font-medium mb-0.5">Instructor</p>
                <p className="font-semibold text-gray-800">{session.instructor}</p>
              </div>
            </div>
          </div>

          <LmoBorrowItemsPanel session={session} items={items} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 text-gray-400 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200 py-12">
          <p className="text-sm">No active issue session. Select an existing slip above or click <strong>New</strong> to start a clear one.</p>
        </div>
      )}
    </div>
  );
}
