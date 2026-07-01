import Search from "./Search";
import FabricItem from "./FabricItem";

interface Fabric {
  id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  color?: string;
}

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
    <div className="bg-white p-6 shadow lg:col-span-2">
      <Search value={searchTerm} onChange={onSearch} />

      <ul className="space-y-4">
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
