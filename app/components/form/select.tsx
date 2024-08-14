import Input from "./input";

export default function Select({
  name,
  label,
  error,
  datas,
  defaultValue,
}: {
  name: string;
  label: string;
  error: string[] | null;
  datas: foreign[];
  defaultValue: string | number;
}) {
  defaultValue == "" ? (defaultValue = 1) : defaultValue;

  return (
    <Input name={name} label={label} error={error}>
      <select
        required
        key={name}
        defaultValue={defaultValue}
        id={name}
        name={name}
        className="w-full max-h-[10rem] overflow-y-auto input-primary focus:bg-page"
      >
        {datas.map((data) => {
          return (
            <option
              key={data.id}
              value={data.id}
              className="text-gray-700 bg-white duration-200"
            >
              {data.name}
            </option>
          );
        })}
      </select>
    </Input>
  );
}
