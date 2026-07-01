import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";

import FabricZoomImage from "../_components/FabricZoomImage";

export const dynamic = "force-dynamic";

interface Fabric {
  id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  color?: string;
}

async function getFabric(id: string): Promise<Fabric | null> {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  const res = await fetch(`${protocol}://${host}/api/fabrics/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const result = await res.json();

  return result.data ?? null;
}

export default async function FabricDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { id } = await params;
  const { category } = await searchParams;

  const fabric = await getFabric(id);

  if (!fabric) {
    notFound();
  }

  const categoryQuery = category
    ? `?category=${encodeURIComponent(category)}`
    : "";

  return (
    <main className="mx-auto mt-10 max-w-3xl rounded bg-white p-6 shadow-md">
      <div className="mb-6">
        <Link
          href={`/fabrics${categoryQuery}`}
          className="inline-block text-sm text-gray-600 underline transition hover:text-black"
        >
          ← Back to {category || "all"} fabrics
        </Link>
      </div>

      {fabric.image && (
        <div className="mb-6 mt-2">
          <FabricZoomImage src={fabric.image} alt={fabric.name} />
        </div>
      )}

      <h1 className="mb-2 text-2xl font-bold text-gray-800">{fabric.name}</h1>

      <h2 className="mb-4 text-lg text-gray-500">{fabric.title}</h2>

      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
          Category: {fabric.category}
        </span>

        {fabric.color && (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
            Color: {fabric.color}
          </span>
        )}
      </div>

      <p className="mt-6 text-sm leading-6 text-gray-800">
        {fabric.description}
      </p>
    </main>
  );
}
