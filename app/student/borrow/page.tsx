import { getStudentBorrowDraft, getBorrowItems, getInventoryCategories } from "../../lib/data";
import StudentBorrowView from "../../ui/student-borrow-view";

export default async function StudentBorrowPage() {
  const session = await getStudentBorrowDraft();
  const [items, categories] = await Promise.all([
    session ? getBorrowItems(session.id) : Promise.resolve([]),
    getInventoryCategories(),
  ]);

  return <StudentBorrowView session={session} items={items} categories={categories} />;
}
