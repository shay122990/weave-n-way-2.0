import type { ChangeEvent } from "react";

interface FabricFormData {
  name: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  color?: string;
}

interface FabricFormProps {
  form: FabricFormData;
  editing: boolean;
  saving: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onDeleteAll: () => void;
  onFileChange: (file: File | null) => void;
}

export default function FabricForm({
  form,
  editing,
  saving,
  onChange,
  onSubmit,
  onCancel,
  onDeleteAll,
  onFileChange,
}: FabricFormProps) {
  return (
    <div className="space-y-4 rounded bg-white p-4 shadow">
      <h2 className="text-lg font-semibold">
        {editing ? "Edit Fabric" : "Add Fabric"}
      </h2>
      <input
        name="name"
        value={form.name}
        onChange={onChange}
        placeholder="e.g. Fabric Name 12"
        className="w-full border p-2"
      />
      <input
        name="title"
        value={form.title}
        onChange={onChange}
        placeholder="e.g. Silk Fabric #12"
        className="w-full border p-2"
      />
      <input
        name="category"
        value={form.category}
        onChange={onChange}
        placeholder="e.g. Silk"
        className="w-full border p-2"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
        className="w-full border p-2"
      />

      <input
        name="color"
        value={form.color}
        onChange={onChange}
        placeholder="e.g. Burgundy"
        className="w-full border p-2"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={onChange}
        placeholder="Brief description of the fabric"
        className="w-full border p-2"
      />
      <button
        onClick={onSubmit}
        disabled={saving}
        className="w-full bg-black py-2 text-white"
      >
        {saving ? "Saving..." : editing ? "Update" : "Add"}
      </button>
      {editing && (
        <button onClick={onCancel} className="w-full bg-gray-200 py-2">
          Cancel
        </button>
      )}
      <button
        onClick={onDeleteAll}
        className="w-full bg-red-500 py-2 text-white"
      >
        Delete All
      </button>
    </div>
  );
}
