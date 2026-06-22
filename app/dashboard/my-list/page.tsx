import { getMyListRecords } from "../../lib/data";
import MyListTabs from "../../ui/my-list-tabs";

export default async function MyListPage() {
  const records = await getMyListRecords();

  return (
    <div className="flex flex-col h-full px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My List</h1>
        <p className="text-sm text-gray-500 mt-0.5">Your borrowed equipment and borrow requests</p>
      </div>

      <MyListTabs records={records} />
    </div>
  );
}
