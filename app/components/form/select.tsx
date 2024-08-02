export default function Select({
	name,
	datas,
	defaultValue,
}: {
	name: string;
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
			className="w-full max-h-[14rem] overflow-y-auto input-primary focus:bg-page"
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
	);
}
