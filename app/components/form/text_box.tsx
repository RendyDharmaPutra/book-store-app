import Input from "./input";

export default function TextBox({
  name,
  defaultValue,
  label,
  type,
  error,
}: {
  name: string;
  defaultValue: string | number;
  label: string;
  type: string;
  error: string[] | null;
}): JSX.Element {
  return (
    <Input label={label} name={name} error={error}>
      <input
        required
        id={name}
        name={name}
        type={type}
        disabled={name == "userDisplay" || name == "amountDisplay"}
        defaultValue={defaultValue}
        className="w-full input-primary"
      />
    </Input>
  );
}
