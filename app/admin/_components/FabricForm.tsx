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
  errors: Partial<Record<keyof FabricFormData, string>>;
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
  errors,
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

      <div>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="e.g. Fabric Name"
          className={`w-full rounded border p-2 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <input
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="e.g. Silk Fabric"
          className={`w-full rounded border p-2 ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title}</p>
        )}
      </div>

      <div>
        <input
          name="category"
          value={form.category}
          onChange={onChange}
          placeholder="e.g. Silk"
          className={`w-full rounded border p-2 ${
            errors.category ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.category && (
          <p className="mt-1 text-sm text-red-500">{errors.category}</p>
        )}
      </div>

      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
          className={`w-full rounded border p-2 ${
            errors.image ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.image && (
          <p className="mt-1 text-sm text-red-500">{errors.image}</p>
        )}
      </div>

      <div>
        <input
          name="color"
          value={form.color}
          onChange={onChange}
          placeholder="e.g. Burgundy"
          className="w-full rounded border border-gray-300 p-2"
        />
      </div>

      <div>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="Brief description of the fabric"
          rows={5}
          className={`w-full rounded border p-2 ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      <button
        onClick={onSubmit}
        disabled={saving}
        className="w-full rounded bg-black py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? "Saving..." : editing ? "Update Fabric" : "Add Fabric"}
      </button>

      {editing ? (
        <button
          onClick={onCancel}
          className="w-full rounded bg-gray-200 py-2 hover:bg-gray-300"
        >
          Cancel
        </button>
      ) : (
        <button
          onClick={onDeleteAll}
          className="w-full rounded bg-red-600 py-2 text-white hover:bg-red-700"
        >
          Delete All Fabrics
        </button>
      )}
    </div>
  );
}
