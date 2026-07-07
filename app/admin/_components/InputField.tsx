import type { ChangeEvent } from "react";

interface InputFieldProps {
  name: string;
  value: string;
  placeholder: string;
  error?: string;
  textarea?: boolean;
  rows?: number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function InputField({
  name,
  value,
  placeholder,
  error,
  textarea = false,
  rows = 5,
  onChange,
}: InputFieldProps) {
  const className = `w-full rounded border p-2 ${
    error ? "border-red-500" : "border-gray-300"
  }`;

  return (
    <div>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          rows={rows}
          placeholder={placeholder}
          onChange={onChange}
          className={className}
        />
      ) : (
        <input
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={className}
        />
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
