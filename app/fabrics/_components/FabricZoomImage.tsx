"use client";

import Image from "next/image";
import { useState } from "react";

export default function FabricZoomImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="relative w-full lg:max-w-[500px] lg:h-[500px] mx-auto overflow-hidden rounded"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Image
        width={500}
        height={500}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-300 ${
          isHovering ? "scale-150" : "scale-100"
        }`}
      />
    </div>
  );
}
