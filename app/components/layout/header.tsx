import { useState } from "react";
import Sidebar from "./sidebar";

export default function Header(): JSX.Element {
	const [show, setShow] = useState<boolean>(false);

	return (
		<>
			<div className="p-4 lg:p-5 xl:p-6 flex flex-row gap-4 w-full bg-white">
				<section
					className="group flex flex-col justify-evenly cursor-pointer"
					onClick={() => setShow(!show)}
				>
					<div
						className={`hamburger-item origin-top-left ${
							show && " rotate-[37deg]"
						}`}
					></div>
					<div className={`hamburger-item ${show && "opacity-0"}`}></div>
					<div
						className={`hamburger-item origin-bottom-left ${
							show && " -rotate-[37deg] "
						}`}
					></div>
				</section>
				<section className="flex flex-row gap-2">
					<svg
						className="w-8 h-8"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
					>
						<path
							d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
							fill="#00a499"
						></path>
					</svg>
					<h1 className="font-bold text-xl lg:text-2xl text-primary">
						Book App
					</h1>
				</section>
			</div>
			{/* <Sidebar show={show} /> */}
		</>
	);
}
