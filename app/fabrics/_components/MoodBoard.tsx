"use client";

import Image from "next/image";
import { useMemo } from "react";

interface Fabric {
  _id: string;
  name: string;
  image?: string;
}

interface MoodBoardProps {
  fabrics: Fabric[];
  max?: number;
}

const getScore = (value: string) => {
  let score = 0;

  for (let i = 0; i < value.length; i++) {
    score = (score * 31 + value.charCodeAt(i)) % 100000;
  }

  return score;
};

export default function MoodBoard({ fabrics, max = 6 }: MoodBoardProps) {
  const swatches = useMemo(() => {
    return fabrics
      .filter((fabric) => fabric.image)
      .toSorted((a, b) => getScore(a._id) - getScore(b._id))
      .slice(0, max);
  }, [fabrics, max]);

  if (swatches.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {swatches.map((fabric) => (
          <div
            key={fabric._id}
            className="w-20 h-20 min-w-[5rem] overflow-hidden rounded border border-gray-300 shadow-sm"
            title={fabric.name}
          >
            <Image
              src={fabric.image!}
              alt={fabric.name}
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
