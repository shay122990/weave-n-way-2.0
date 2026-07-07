import type { ChangeEvent } from "react";

interface ImageFieldProps {
  error?: string;
  onFileChange: (file: File | null) => void;
}

export default function ImageField({ error, onFileChange }: ImageFieldProps) {
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onFileChange(e.target.files?.[0] ?? null)
        }
        className={`w-full rounded border p-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
