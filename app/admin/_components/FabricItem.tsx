import Image from "next/image";
import type { Fabric } from "../../types/fabric";

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
    <li className="rounded-lg border border-gray-200 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="flex gap-4">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded border bg-gray-100">
            {fabric.image ? (
              <Image
                src={fabric.image}
                alt={fabric.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-gray-400">
                No Image
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="text-lg font-semibold">{fabric.name}</h3>

            <p className="text-sm text-gray-600">{fabric.title}</p>

            {fabric.color && (
              <p className="mt-1 text-sm">
                <span className="font-medium">Color:</span> {fabric.color}
              </p>
            )}

            <p className="mt-2 line-clamp-3 text-sm text-gray-700">
              {fabric.description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 gap-2 self-start sm:flex-col">
          <button
            onClick={() => onEdit(fabric)}
            className="rounded bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(fabric.id)}
            className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
