interface Fabric {
  id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  color?: string;
}

interface FabricItemProps {
  fabric: Fabric;
  onEdit: (fabric: Fabric) => void;
  onDelete: (id: string) => void;
}

export default function FabricItem({
  fabric,
  onEdit,
  onDelete,
}: FabricItemProps) {
  return (
    <li className="border-b pb-2">
      <div className="flex justify-between">
        <div>
          <p className="font-semibold">{fabric.name}</p>
          <p className="text-sm">{fabric.title}</p>
        </div>

        <div className="space-x-2">
          <button onClick={() => onEdit(fabric)}>Edit</button>

          <button onClick={() => onDelete(fabric.id)}>Delete</button>
        </div>
      </div>
    </li>
  );
}
