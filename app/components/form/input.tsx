import Select from "./select";

export default function Input({
	name,
	defaultValue,
	label,
	type,
	data,
}: {
	name: string;
	label: string;
	defaultValue: string | number;
	type: string;
	data: foreign[] | null;
}): JSX.Element {
	return (
		<div key={name} className={`flex flex-col gap-1 w-full sm:w-[24rem]`}>
			<label htmlFor={name} className="font-medium text-gray-800">
				{label}
			</label>
			{data === null ? (
				<input
					required
					id={name}
					name={name}
					type={type}
					defaultValue={defaultValue}
					className="w-full input-primary"
				/>
			) : (
				<Select
					defaultValue={defaultValue}
					label={label}
					name={name}
					datas={data!}
				/>
			)}
		</div>
	);
}
