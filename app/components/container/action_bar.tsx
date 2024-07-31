import { Link, useSearchParams } from "@remix-run/react";
import { useState } from "react";

export default function ActionBar({
	route,
	addRoute,
}: {
	route: string;
	addRoute: string;
}) {
	const [searchParams, setSearchParams] = useSearchParams();

	const [query, setQuery] = useState<string>(searchParams.get("search") || "");

	function updateSearch(newQuery: string): void {
		let params: URLSearchParams = new URLSearchParams(searchParams);

		params.delete("page");

		if (query.length > 0) {
			params.set("search", newQuery);
		} else {
			params.delete("search");
		}

		setSearchParams(params);
	}

	return (
		<section className="row-section md:justify-between gap-4">
			<div className="flex flex-row gap-2">
				<input
					type="text"
					placeholder={`Cari Judul atau Penulis ${route}`}
					onChange={(e) => setQuery(e.target.value)}
					defaultValue={query}
					className="w-full md:w-[20rem] input-primary"
				/>
				<button
					onClick={() => updateSearch(query)}
					className="flex flex-row justify-center items-center min-h-[2.5rem] btn-primary"
				>
					<svg
						className="w-4 h-4"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
					>
						<path
							d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
							fill="white"
						></path>
					</svg>
				</button>
			</div>
			<div className="row-section gap-2">
				<Link
					prefetch="viewport"
					to={addRoute}
					className="w-full md:w-fit min-h-[2.5rem] btn-primary"
				>
					Tambah {route}
				</Link>
			</div>
		</section>
	);
}
