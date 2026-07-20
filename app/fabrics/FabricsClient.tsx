"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import FabricCard from "./_components/FabricCard";
import MoodBoard from "./_components/MoodBoard";

import type { Fabric } from "../types/fabric";

const ITEMS_PER_PAGE = 10;

export default function FabricsClient({ fabrics }: { fabrics: Fabric[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") || "all";

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const categories = useMemo(() => {
    const allCategories = Array.from(
      new Set(fabrics.map((fabric) => fabric.category.trim())),
    ).sort();

    return ["all", ...allCategories];
  }, [fabrics]);

  const filtered = useMemo(() => {
    let result = fabrics;

    if (category !== "all") {
      result = result.filter(
        (fabric) =>
          fabric.category.trim().toLowerCase() ===
          category.trim().toLowerCase(),
      );
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();

      result = result.filter(
        (fabric) =>
          fabric.name.toLowerCase().includes(term) ||
          fabric.category.toLowerCase().includes(term) ||
          fabric.color?.toLowerCase().includes(term),
      );
    }

    return result;
  }, [category, searchTerm, fabrics]);

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const handleCategoryChange = (cat: string) => {
    setCurrentPage(1);

    const params = new URLSearchParams(searchParams.toString());

    if (cat === "all") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }

    router.replace(`/fabrics?${params.toString()}`, { scroll: false });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="relative h-100 w-full md:h-150">
        <Image
          src="/fabrics.jpg"
          alt="hero image of fabric"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 z-0 bg-black/30" />

        <div className="absolute bottom-16 left-1/2 z-10 -translate-x-1/2 px-4 text-center">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg sm:text-5xl">
            Fabrics for every story
          </h1>
          <p className="mt-2 text-sm font-medium text-white drop-shadow-md sm:text-lg">
            Textures that inspire. Quality that lasts.
          </p>
        </div>
      </div>

      <button
        onClick={() => setSideMenuOpen(true)}
        className="fixed left-0 top-1/2 z-40 block -translate-y-1/2 rounded-r-lg bg-black px-3 py-2 text-white shadow-lg hover:bg-gray-800 md:hidden"
      >
        fabrics →
      </button>

      <div
        className={`fixed left-0 top-0 z-50 h-full w-2/3 max-w-xs bg-white shadow-lg transition-transform duration-300 ease-in-out md:hidden ${
          sideMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-lg font-bold">Categories</h2>

          <button
            onClick={() => setSideMenuOpen(false)}
            className="text-2xl text-gray-600"
          >
            ×
          </button>
        </div>

        <ul className="space-y-2 p-4">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => {
                  handleCategoryChange(cat);
                  setSideMenuOpen(false);
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
                className={`w-full rounded-lg px-4 py-2 text-left font-medium capitalize transition ${
                  category === cat
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {sideMenuOpen && (
        <div
          onClick={() => setSideMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
        />
      )}

      <div className="bg-white px-6 pt-6 text-black md:hidden">
        <MoodBoard fabrics={fabrics} />
      </div>

      <div className="flex flex-col bg-white text-black md:flex-row">
        <aside className="hidden shrink-0 self-stretch border-r border-gray-300 bg-linear-to-b from-[#f5f7fa] to-[#c3cfe2]/50 shadow-inner md:block md:w-72 lg:w-80">
          <div className="sticky top-0 p-6">
            <div className="mb-6">
              <MoodBoard fabrics={fabrics} />
            </div>

            <h2 className="mb-4 text-xl font-bold uppercase tracking-wide text-gray-800">
              Categories
            </h2>

            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full rounded-lg px-4 py-2 text-left font-medium capitalize transition ${
                      category === cat
                        ? "bg-cyan-900 text-white shadow-md"
                        : "text-gray-900 hover:bg-[#ecf0f1] hover:text-black"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="flex-1 space-y-8 p-6 sm:p-8 md:p-10">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Explore Our Fabrics
            </h1>
            <p className="mt-2 max-w-md text-gray-600">
              Discover high-quality fabrics across all styles and categories.
              Use the filters to find your perfect material.
            </p>
          </div>

          <div className="max-w-2xl">
            <input
              type="text"
              placeholder="Search by name, category, or color..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((fabric) => (
              <FabricCard key={fabric.id} {...fabric} />
            ))}
          </div>

          {paginated.length === 0 && (
            <p className="mt-10 text-center text-lg text-gray-500">
              No fabrics found.
            </p>
          )}

          {totalPages > 1 && (
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`h-10 w-10 rounded-full text-sm font-medium transition ${
                    currentPage === i + 1
                      ? "bg-black text-white"
                      : "bg-gray-200 hover:bg-black/10"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
