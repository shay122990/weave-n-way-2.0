import Search from "./Search";
import FabricItem from "./FabricItem";

import type { Fabric } from "../../types/fabric";

interface FabricListProps {
  fabrics: Fabric[];
  searchTerm: string;
  onSearch: (value: string) => void;
  onEdit: (fabric: Fabric) => void;
  onDelete: (id: string) => void;
}

export default function FabricList({
  fabrics,
  searchTerm,
  onSearch,
  onEdit,
  onDelete,
}: FabricListProps) {
  return (
    <div className="flex h-[85vh] flex-col bg-white p-6 shadow lg:col-span-2">
      <Search value={searchTerm} onChange={onSearch} />
      <ul className="mt-4 flex-1 overflow-y-auto space-y-4 pr-2">
        {fabrics.map((fabric) => (
          <FabricItem
            key={fabric.id}
            fabric={fabric}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}
