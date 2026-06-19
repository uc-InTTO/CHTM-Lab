import { getInventoryStats, getInventoryCategories } from "../../lib/data";
import InventoryView from "../../ui/inventory-view";

export default async function LmoInventoryPage() {
  const [stats, categories] = await Promise.all([
    getInventoryStats(),
    getInventoryCategories(),
  ]);

  return (
    <div className="flex flex-col h-full px-8 py-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="text-sm text-gray-500 mt-0.5">All equipment — total inventory, available for borrowing, and kitchen sets</p>
        </div>
        <button
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ backgroundColor: "#16a34a" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/>
          </svg>
          Add Equipment
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl px-5 py-4">
          <p className="text-xs text-gray-400 mb-1">Equipment Types</p>
          <p className="text-2xl font-bold text-gray-900">{stats.equipmentTypes}</p>
        </div>
        <div className="bg-white rounded-2xl px-5 py-4">
          <p className="text-xs text-gray-400 mb-1">Total Inventory (pcs)</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalInventory}</p>
        </div>
        <div className="bg-white rounded-2xl px-5 py-4">
          <p className="text-xs text-gray-400 mb-1">Available to Borrow</p>
          <p className="text-2xl font-bold" style={{ color: "#16a34a" }}>{stats.availableToBorrow}</p>
        </div>
        <div className="bg-white rounded-2xl px-5 py-4">
          <p className="text-xs text-gray-400 mb-1">In Kitchen Sets</p>
          <p className="text-2xl font-bold" style={{ color: "#f97316" }}>{stats.inKitchenSets}</p>
        </div>
      </div>

      <InventoryView categories={categories} />
    </div>
  );
}
