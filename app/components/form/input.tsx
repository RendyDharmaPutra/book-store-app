import Select from "./select";

export default function Input({
  name,
  defaultValue,
  label,
  type,
  data,
  error,
}: {
  name: string;
  defaultValue: string | number;
  label: string;
  type: string;
  data: foreign[] | null;
  error: string[] | null;
}): JSX.Element {
  return (
    <div key={name} className={`flex flex-col gap-1 w-full sm:w-[24rem]`}>
      <label htmlFor={name} className="font-medium text-gray-700">
        {label}
      </label>
      {data === null ? (
        <input
          required
          id={name}
          name={name}
          type={type}
          disabled={name == "userDisplay" || name == "amountDisplay"}
          defaultValue={defaultValue}
          className="w-full input-primary"
        />
      ) : (
        <Select defaultValue={defaultValue} name={name} datas={data!} />
      )}
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}
