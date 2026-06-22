import StudentLookup from "../../ui/student-lookup";

export default function LmoMyRecordsPage() {
  return (
    <div className="flex flex-col h-full px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Records</h1>
        <p className="text-sm text-gray-500 mt-0.5">View borrowings, breakages, and clearance status</p>
      </div>

      <StudentLookup />
    </div>
  );
}
