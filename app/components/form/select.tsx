import Input from "./input";

type SelectType = {
  name: string;
  label: string;
  error: string[] | null;
  datas: foreign[];
  defaultValue: string | number;
  edit?: () => void;
};

export default function Select(props: SelectType) {
  const defaultValue = props.defaultValue === "" ? 1 : props.defaultValue;

  return (
    <Input name={props.name} label={props.label} error={props.error}>
      <select
        required
        onChange={props.edit ?? undefined}
        key={props.name}
        defaultValue={defaultValue}
        id={props.name}
        name={props.name}
        className="w-full h-[3rem] overflow-y-auto input-primary focus:bg-page cursor-pointer"
      >
        {props.datas.map((data) => {
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
