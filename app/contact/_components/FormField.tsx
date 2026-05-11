type FormFieldProps = {
  label: string;
  id: string;
  name: string;
  value: string;
  type?: string;
  rows?: number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

export default function FormField({
  label,
  id,
  name,
  value,
  type = "text",
  rows,
  onChange,
}: FormFieldProps) {
  const baseClasses =
    "w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black";

  return (
    <div>
      <label htmlFor={id} className="mb-1 block font-medium">
        {label}
      </label>

      {rows ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          required
          className={baseClasses}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
          className={baseClasses}
        />
      )}
    </div>
  );
}
