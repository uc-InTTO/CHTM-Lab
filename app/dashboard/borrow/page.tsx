import { getCurrentBorrowDraft, getBorrowItems } from "../../lib/data";
import BorrowItemsPanel from "../../ui/borrow-items-panel";

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

// popup modal when borrow log session is created
function BorrowLogModal() {
  return (
   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full h-150 ">
        <p className="text-lg font-bold text-gray-900 mb-4">Borrowing Details</p>
        <div className="flex flex-col gap-1.5">
          <p className="text-gray-500 text-sm">Student Name (SURNAME, FIRST NAME)</p>
          <input className="border border-gray-500/40 rounded-xl p-1"></input>

          <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-gray-500 text-sm">Floor</p>
              <input className="border border-gray-500/40 rounded-xl p-1 "></input>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Date</p>
              <input className="border border-gray-500/40 rounded-xl p-1 "></input>
            </div>
          </div>
            <div className="flex flex-row justify-between gap-3">
            <div>
              <p className="text-gray-500 text-sm">ID Number</p>
              <input className="border border-gray-500/40 rounded-xl p-1 w-full"></input>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Section</p>
              <input className="border border-gray-500/40 rounded-xl p-1 w-full"></input>
            </div>
          </div>
          <p className="text-gray-500 text-sm">Course / Subject</p>
          <input className="border border-gray-500/40 rounded-xl p-1"></input>
        </div>
        <div className="flex flex-row justify-between w-full">
            <div>
              <p className="text-gray-500 text-sm">Time In</p>
              <input className="border border-gray-500/40 rounded-xl p-1 "></input>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Time Out</p>
              <input className="border border-gray-500/40 rounded-xl p-1 "></input>
            </div>
        </div>
        <div className="gap-2">
          <div>
            <p className="text-gray-500 text-sm">Title of the Activity</p>
            <input className="border border-gray-500/40 rounded-xl p-1 w-full"></input>
          </div> 
          <div>
            <p className="text-gray-500 text-sm">Instructor</p>
            <input className="border border-gray-500/40 rounded-xl p-1 w-full"></input>
          </div>
          <div>         
            <p className="text-gray-500 text-sm">Custodian Issued</p>
            <input className="border border-gray-500/40 rounded-xl p-1 w-full"></input>
          </div>  
        </div>
        
        <div className="flex flex-row w-full justify-between mt-5 gap-2 mb-5">
          <button className="border rounded-xl border-gray-500/40 p-1.5 w-full hover:bg-gray-200/60">Cancel</button>  
          <button className="border text-white bg-emerald-700 rounded-xl border-gray-500/40 p-1 w-full hover:bg-green-700/80"> Save Details</button>
        </div>
      </div>
  </div>
  );
}


export default async function BorrowPage() {
  const session = await getCurrentBorrowDraft();
  const items = session ? await getBorrowItems(session.id) : [];

  return (
    <div className="flex flex-col h-full px-8 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Borrow Equipment</h1>
          <p className="text-sm text-gray-500 mt-0.5">Issue equipment to students</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-700 hover:bg-green-700/80 transition-colors">
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

          <BorrowItemsPanel session={session} items={items} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 text-gray-400">
          <p className="text-sm">No active borrow session. Click <strong>New</strong> to start one.</p>
        </div>
      )}
    </div>
  );
  }

