"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import FabricList from "./_components/FabricList";
import AdminHeader from "./_components/AdminHeader";
import FabricForm from "./_components/FabricForm";

interface Fabric {
  id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  color?: string;
}

type FabricForm = Omit<Fabric, "id">;

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // console.log(selectedFile);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchFabrics = async () => {
    const res = await fetch("/api/fabrics", { cache: "no-store" });
    const result = await res.json();

    setFabrics(result.data || []);
  };

  const capitalizeWords = (value: string) =>
    value.replace(/\b\w/g, (char) => char.toUpperCase());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    const fieldsToCapitalize = ["name", "title", "category", "color"];

    setForm((prev) => ({
      ...prev,
      [name]: fieldsToCapitalize.includes(name)
        ? capitalizeWords(value)
        : value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleAddOrUpdateFabric = async () => {
    try {
      setSaving(true);

      const cleanedForm = {
        ...form,
        name: form.name.trim().replace(/\s+/g, " "),
        title: form.title.trim().replace(/\s+/g, " "),
        category: form.category.trim().replace(/\s+/g, " "),
        color: form.color?.trim().replace(/\s+/g, " "),
        description: form.description.trim(),
      };

      const formData = new FormData();

      formData.append("name", cleanedForm.name);
      formData.append("title", cleanedForm.title);
      formData.append("category", cleanedForm.category);
      formData.append("description", cleanedForm.description);

      if (cleanedForm.color) {
        formData.append("color", cleanedForm.color);
      }

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const res = await fetch(
        editingId ? `/api/fabrics/${editingId}` : "/api/fabrics",
        {
          method: editingId ? "PUT" : "POST",
          body: formData,
        },
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      resetForm();
      setSelectedFile(null);
      await fetchFabrics();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteFabric = async (id: string) => {
    if (!confirm("Delete this fabric?")) return;

    const res = await fetch(`/api/fabrics/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete");
      return;
    }

    await fetchFabrics();
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
    setEditingId(fabric.id);

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
      <AdminHeader onLogout={handleLogout} />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* <FabricForm
        form={form}
        editing={!!editingId}
        saving={saving}
        onChange={handleChange}
        onSubmit={handleAddOrUpdateFabric}
        onCancel={resetForm}
        onDeleteAll={handleDeleteAll}
      /> */}
        <FabricForm
          form={form}
          editing={!!editingId}
          saving={saving}
          onChange={handleChange}
          onFileChange={setSelectedFile}
          onSubmit={handleAddOrUpdateFabric}
          onCancel={resetForm}
          onDeleteAll={handleDeleteAll}
        />

        <FabricList
          fabrics={filteredFabrics}
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
          onEdit={handleEdit}
          onDelete={handleDeleteFabric}
        />
      </div>
    </main>
  );
}
