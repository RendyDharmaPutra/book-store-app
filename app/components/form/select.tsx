export default function Select({
  name,
  label,
  datas,
  defaultValue,
}: {
  name: string;
  label: string;
  datas: foreign[];
  defaultValue: string | number;
}) {
  defaultValue == "" ? (defaultValue = 1) : defaultValue;

  return (
    <select
      required
      key={name}
      defaultValue={defaultValue}
      id={name}
      name={name}
      className="w-full input-primary"
    >
      {/* <option value="placeholder" disabled>
        Nama {label}
      </option> */}
      {datas.map((data) => {
        return (
          <option key={data.id} value={data.id}>
            {data.name}
          </option>
        );
      })}
    </select>
  );
}
