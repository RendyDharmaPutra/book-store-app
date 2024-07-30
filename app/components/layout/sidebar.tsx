import { Link } from "@remix-run/react";
import { useState } from "react";

export default function Sidebar() {
	const [show, setShow] = useState<boolean>(false);

	const routes = [
		{ route: "/", page: "Buku" },
		{ route: "/store", page: "Penyimpanan" },
		{ route: "/transaction", page: "Transaksi" },
	];

	return (
		<div
			className={`layout flex flex-col gap-6 ${
				show ? "min-w-[12rem] md:min-w-[16rem]" : "w-fit"
			} min-h-screen rounded-xl bg-white duration-200`}
		>
			<section
				className={`flex flex-row ${
					show ? "justify-start" : "justify-center"
				} items-center gap-2 min-h-[2rem]`}
			>
				<div
					className="rounded-full flex flex-col gap-1 justify-center h-full cursor-pointer hover:bg-gray-200 active:bg-stone-300 duration-200"
					onClick={() => setShow(!show)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="size-5 text-gray-700"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</div>
				<h1
					className={`${
						show ? "block" : "hidden"
					} font-semibold text-gray-800 text-lg md:text-xl`}
				>
					Book Store
				</h1>
			</section>
			<section className="mb-auto flex flex-col gap-2">
				{routes.map((element) => (
					<NavItem
						key={element.page}
						route={element.route}
						page={element.page}
						show={show}
					/>
				))}
			</section>
			<Link to={"/"} className="nav-item cursor-pointer">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-5 md:size-6 text-gray-600"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
					/>
				</svg>

				<h1 className={`font-medium ${!show && "hidden"} nav-text`}>
					Nama Pengguna
				</h1>
			</Link>
		</div>
	);
}

function NavItem({
	route,
	page,
	show,
}: {
	route: string;
	page: string;
	show: boolean;
}) {
	let pattern: string;

	switch (route) {
		case "/":
			pattern =
				"M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25";

			break;

		case "/store":
			pattern =
				"M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z";

			break;

		case "/transaction":
			pattern =
				"M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z";

			break;

		default:
			pattern =
				"M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25";

			break;
	}

	return (
		<Link to={route} className="nav-item">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="nav-icon"
			>
				<path strokeLinecap="round" strokeLinejoin="round" d={pattern} />
			</svg>

			<h1 className={`${!show && "hidden"} nav-text`}>{page}</h1>
		</Link>
	);
}
