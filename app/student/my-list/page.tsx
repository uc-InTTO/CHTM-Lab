import { getStudentBorrowings, getStudentBreakages } from "../../lib/data";
import StudentMyListTabs from "../../ui/student-my-list-tabs";

export default async function StudentMyListPage() {
  const [borrowings, breakages] = await Promise.all([
    getStudentBorrowings(),
    getStudentBreakages(),
  ]);

  return (
    <div className="flex flex-col h-full px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My List</h1>
        <p className="text-sm text-gray-500 mt-0.5">Your borrowed equipment and borrow requests</p>
      </div>

      <StudentMyListTabs borrowings={borrowings} breakages={breakages} />
    </div>
  );
}
