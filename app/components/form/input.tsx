export default function Input({
  name,
  label,
  error,
  children,
}: {
  name: string;
  label: string;
  error: string[] | null;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div key={name} className={`flex flex-col gap-1  w-full sm:w-[24rem]`}>
      <label htmlFor={name} className="text-sm text-gray-600">
        {label}
      </label>
      {children}
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}
