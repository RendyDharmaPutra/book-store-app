import { useSearchParams } from "@remix-run/react";

export default function Pagination() {
	let [searchParams, setSearchParams] = useSearchParams();
	const currentPage: number = Number(searchParams.get("page") || "1");

	function setPage(next: boolean): void {
		let params: URLSearchParams = new URLSearchParams(searchParams);

		const Newpage: string = next
			? String(currentPage + 1)
			: String(currentPage - 1);
		params.set("page", Newpage);

		setSearchParams(params);
	}

	return (
		<section className="flex flex-row justify-between items-center ">
			<h2 className="font-medium text-sm md:text-base text-gray-700 ">
				Halaman {currentPage}
			</h2>
			{/* <div className="flex flex-row overflow-hidden rounded-lg border-2 border-primary">
				<button
					disabled={currentPage === 1}
					onClick={() => setPage(false)}
					className={`${
						currentPage === 1
							? "px-2 py-1 text-center outline-none font-semibold text-gray-600"
							: "px-2 py-1 text-center outline-none font-semibold text-primary hover:bg-primary hover:text-white "
					}`}
				>
					Sebelumnya
				</button>
				<button
					onClick={() => setPage(true)}
					className="px-2 py-1 text-center outline-none font-semibold text-primary hover:bg-primary hover:text-white "
				>
					Selanjutnya
				</button>
			</div> */}
			<div className="flex flex-row gap-1 sm:gap-2">
				<button
					disabled={currentPage === 1}
					onClick={() => setPage(false)}
					className={`${
						currentPage === 1
							? "px-2 py-1 text-center outline-none rounded-md text-gray-600"
							: "btn-secondary"
					}`}
				>
					Sebelumnya
				</button>
				<button onClick={() => setPage(true)} className="btn-secondary">
					Selanjutnya
				</button>
			</div>
		</section>
	);
}
