import { getPendingApprovals } from "../../lib/data";
import ApproveButton from "../../ui/approve-button";
import { getApprovedBorrowRequests } from "../../lib/data";
import AddEquipmentApprovedButton from "../../ui/add-equipment-approved-button";
import IssueButton from "../../ui/issue-button";

function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

async function ApprovedList() {
  const approved = await getApprovedBorrowRequests(10);
  if (!approved || approved.length === 0) {
    return (
      <div className="flex items-center justify-center py-6 text-sm text-gray-400">No approved requests</div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {approved.map((a) => (
        <div key={a.id} className="px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900">#{a.controlNo}</p>
            <p className="text-xs text-gray-400 mt-0.5">{a.studentName} · {a.instructor} · Floor {a.floor}</p>
          </div>
            <div className="flex items-center gap-2">
            <AddEquipmentApprovedButton sessionId={String(a.id)} />
            <IssueButton sessionId={String(a.id)} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function LmoBorrowApprovalsPage() {
  const pending = await getPendingApprovals();

  return (
    <div className="flex flex-col h-full px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Borrow Approvals</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Review and approve equipment requests &middot;{" "}
          <span className="font-medium" style={{ color: "#16a34a" }}>Live</span>{" "}
          <span className="inline-block w-2.5 h-2.5 rounded-full align-middle" style={{ backgroundColor: "#22c55e" }} />
        </p>
      </div>

      <div className="mt-6 mb-3">
        <h3 className="text-sm font-bold text-gray-900">Approved — Ready to Issue</h3>
      </div>

      <div className="rounded-2xl flex flex-col mb-6" style={{ border: "1.5px dashed #d1d5db" }}>
 
        <ApprovedList />
      </div>

      <div className="flex items-center gap-2 text-gray-400 mb-3">
        <ClockIcon />
        <p className="text-xs font-bold tracking-wider">PENDING ({pending.length})</p>
      </div>

      <div
        className="rounded-2xl flex flex-col"
        style={{ border: "1.5px dashed #d1d5db" }}
      >
        {pending.length === 0 ? (
          <div className="flex items-center justify-center py-14">
            <p className="text-sm text-gray-400">No pending requests</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {pending.map((approval) => (
              <div key={approval.id} className="px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">#{approval.controlNo}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {approval.requestedBy} · {approval.itemCount} item(s) · {approval.submittedAt}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ApproveButton sessionId={String(approval.id)} />
                  <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
