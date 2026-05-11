"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Search from "./_components/Search";

interface Fabric {
  _id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  color?: string;
}

type FabricForm = Omit<Fabric, "_id">;

const emptyForm: FabricForm = {
  name: "",
  title: "",
  category: "",
  description: "",
  image: "",
  color: "",
};

export default function AdminClient({
  initialFabrics,
}: {
  initialFabrics: Fabric[];
}) {
  const router = useRouter();

  const [fabrics, setFabrics] = useState<Fabric[]>(initialFabrics);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState<FabricForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchFabrics = async () => {
    const res = await fetch("/api/fabrics", { cache: "no-store" });
    const result = await res.json();

    setFabrics(result.data || []);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleAddOrUpdateFabric = async () => {
    try {
      setSaving(true);

      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/fabrics/${editingId}` : "/api/fabrics";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      resetForm();
      await fetchFabrics();
    } catch {
      alert("Failed to save fabric");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFabric = async (id: string) => {
    if (!confirm("Delete this fabric?")) return;

    await fetch(`/api/fabrics/${id}`, {
      method: "DELETE",
    });

    fetchFabrics();
  };

  const handleDeleteAll = async () => {
    if (!confirm("Delete ALL fabrics?")) return;

    await fetch("/api/fabrics", {
      method: "DELETE",
    });

    resetForm();
    fetchFabrics();
  };

  const handleEdit = (fabric: Fabric) => {
    setEditingId(fabric._id);

    setForm({
      name: fabric.name,
      title: fabric.title,
      category: fabric.category,
      description: fabric.description,
      image: fabric.image || "",
      color: fabric.color || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    router.push("/admin/login");
    router.refresh();
  };

  const filteredFabrics = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    if (!query) return fabrics;

    return fabrics.filter((f) => {
      return (
        f.name.toLowerCase().includes(query) ||
        f.title.toLowerCase().includes(query) ||
        f.category.toLowerCase().includes(query) ||
        f.description.toLowerCase().includes(query) ||
        f.color?.toLowerCase().includes(query)
      );
    });
  }, [fabrics, searchTerm]);

  return (
    <main className="mx-auto max-w-7xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Panel</h1>

        <button
          onClick={handleLogout}
          className="rounded bg-red-600 px-4 py-2 text-white"
        >
          Logout
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 rounded bg-white p-4 shadow">
          <h2 className="text-lg font-semibold">
            {editingId ? "Edit Fabric" : "Add Fabric"}
          </h2>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Internal name (e.g. Cotton Green 1)"
            className="w-full border p-2"
          />

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Display title (e.g. Premium Cotton – Green)"
            className="w-full border p-2"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category (e.g. cotton, silk, linen)"
            className="w-full border p-2"
          />

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="/fabrics/image-name.jpg (must exist in /public/fabrics)"
            className="w-full border p-2"
          />

          <input
            name="color"
            value={form.color}
            onChange={handleChange}
            placeholder="Color (e.g. mustard green, off-white)"
            className="w-full border p-2"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2"
          />

          <button
            onClick={handleAddOrUpdateFabric}
            disabled={saving}
            className="w-full bg-black text-white py-2"
          >
            {saving ? "Saving..." : editingId ? "Update" : "Add"}
          </button>

          {editingId && (
            <button onClick={resetForm} className="w-full bg-gray-200 py-2">
              Cancel
            </button>
          )}

          <button
            onClick={handleDeleteAll}
            className="w-full bg-red-500 text-white py-2"
          >
            Delete All
          </button>
        </div>

        <div className="lg:col-span-2 bg-white p-6 shadow">
          <Search value={searchTerm} onChange={setSearchTerm} />

          <ul className="space-y-4">
            {filteredFabrics.map((fabric) => (
              <li key={fabric._id} className="border-b pb-2">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">{fabric.name}</p>
                    <p className="text-sm">{fabric.title}</p>
                  </div>

                  <div className="space-x-2">
                    <button onClick={() => handleEdit(fabric)}>Edit</button>
                    <button onClick={() => handleDeleteFabric(fabric._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
