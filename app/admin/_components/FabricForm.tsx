import type { ChangeEvent } from "react";
import InputField from "./InputField";
import ImageField from "./ImageField";

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

      <InputField
        name="name"
        value={form.name}
        placeholder="e.g. Silk"
        error={errors.name}
        onChange={onChange}
      />

      <InputField
        name="title"
        value={form.title}
        placeholder="e.g. Silk Fabric #12"
        error={errors.title}
        onChange={onChange}
      />

      <InputField
        name="category"
        value={form.category}
        placeholder="e.g. Silk"
        error={errors.category}
        onChange={onChange}
      />

      <ImageField error={errors.image} onFileChange={onFileChange} />

      <InputField
        name="color"
        value={form.color ?? ""}
        placeholder="e.g. Burgundy"
        onChange={onChange}
      />

      <InputField
        textarea
        name="description"
        value={form.description}
        placeholder="Brief description of the fabric"
        error={errors.description}
        onChange={onChange}
      />

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
