import { getInventoryStats, getInventoryCategories } from "../../lib/data";
import InventoryImportButton from "../../ui/inventory-import-button";
import FloorAccordion from "../../ui/lmo-inventory-accordion"; 
import GlobalSearch from "../../ui/lmo-search"; 

export const revalidate = 3600; 

export default async function LmoInventoryPage() {
  const [stats, allCategories] = await Promise.all([
    getInventoryStats("All"),
    getInventoryCategories("All")
  ]);

  const utilizationRate = stats.totalInventory > 0 
    ? Math.round(((stats.totalInventory - stats.availableToBorrow) / stats.totalInventory) * 100) 
    : 0;

  const floors = [
    "4th Floor",
    "5th Floor",
    "6th Floor",
    "9th Floor",
    "10th Floor",
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">Inventory</h1>
          <p className="text-sm text-gray-500 mt-1 sm:mt-0.5 break-words">
            All equipment — total inventory, available for borrowing, and kitchen sets
          </p>
        </div>
        <div className="shrink-0 w-full sm:w-auto">
          <div className="w-full sm:w-auto flex justify-start sm:justify-end">
            <InventoryImportButton />
          </div>
        </div>
      </div>

      {/* Global Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 mb-1">Equipment Types</p>
          <p className="text-2xl font-bold text-gray-900">{stats.equipmentTypes}</p>
        </div>
        <div className="bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 mb-1">Total Inventory (pcs)</p>
          <p className="text-2xl font-bold text-gray-900">{stats.totalInventory}</p>
        </div>
        <div className="bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 mb-1">Available to Borrow</p>
          <p className="text-2xl font-bold text-green-600">{stats.availableToBorrow}</p>
        </div>
        <div className="bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 mb-1">In Kitchen Sets</p>
          <p className="text-2xl font-bold text-orange-500">{stats.inKitchenSets}</p>
        </div>
        <div className="bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 mb-1">Utilization Rate</p>
          <p className="text-2xl font-bold text-blue-600">{utilizationRate}%</p>
        </div>
      </div>

      {/* 4. Wrap the Accordions in the Global Search Component */}
      <GlobalSearch allCategories={allCategories}>
        {floors.map((floor) => (
          <FloorAccordion key={floor} floorName={floor} />
        ))}
      </GlobalSearch>
      
    </div>
  );
}