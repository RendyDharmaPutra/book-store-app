type InputType = {
  name: string;
  label: string;
  error: string[] | null;
  children: React.ReactNode;
};

export default function Input(props: InputType) {
  return (
    <div
      key={props.name}
      className={`relative flex flex-col gap-1 w-full sm:w-[24rem]`}
    >
      <label htmlFor={props.name} className="text-sm text-gray-600">
        {props.label}
      </label>
      {props.children}
      {props.error && <p className="text-sm text-danger">{props.error}</p>}
    </div>
  );
}
