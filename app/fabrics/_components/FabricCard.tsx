"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface FabricProps {
  _id: string;
  name: string;
  title: string;
  description: string;
  image?: string;
  color?: string;
}

export default function FabricCard({ _id, name, color, image }: FabricProps) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl shadow hover:shadow-xl transition p-4 text-black space-y-4">
      {image && (
        <div className="relative w-full aspect-square rounded overflow-hidden group">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-210"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}

      <div className="flex justify-between items-center text-sm text-black">
        {color && <span>{color}</span>}
      </div>

      <h2 className="text-lg font-semibold text-black mt-1">{name}</h2>

      <Link
        href={`/fabrics/${_id}?category=${encodeURIComponent(currentCategory)}`}
        className="inline-block text-sm text-black hover:text-cyan-700 transition underline"
      >
        View More Details →
      </Link>
    </div>
  );
}
