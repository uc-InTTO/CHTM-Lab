import { getLmoMyListItems } from "../../lib/data";
import LmoMyListTabs from "../../ui/lmo-my-list-tabs";

export default async function LmoMyListPage() {
  const items = await getLmoMyListItems();

  return (
    <div className="flex flex-col h-full px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My List</h1>
        <p className="text-sm text-gray-500 mt-0.5">Your borrowed equipment and borrow requests</p>
      </div>

      <LmoMyListTabs items={items} />
    </div>
  );
}
