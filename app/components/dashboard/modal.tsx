import { Dispatch, SetStateAction } from "react";
// import FormDeleteButton from "./delete_button";
import { Form, useNavigation } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";

export default function Modal({
	idBook,
	title,
	isOpen,
	setShow,
}: {
	idBook: number;
	title: string;
	isOpen: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
}) {
	const { state } = useNavigation();
	const pending = state != "idle";

	return (
		<AnimatePresence mode="wait">
			{isOpen && (
				<motion.div
					initial={{ transitionDuration: "0.5", opacity: 0 }}
					animate={{ transitionDuration: "0.5", opacity: 1 }}
					exit={{ transitionDuration: "0.5", opacity: 0 }}
					className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
				>
					<section className="bg-white layout rounded-lg shadow-lg w-3/4 md:w-1/3">
						<h2 className="mb-4 headline">Hapus Buku</h2>
						<p className="mb-4 text-gray-600">
							Hapus buku berjudul{" "}
							<span className="font-semibold text-gray-800">{title}</span>?
						</p>
						<div className="flex flex-row items-end justify-end gap-4">
							<button
								onClick={() => setShow(false)}
								className="py-2 px-4 hover:bg-gray-200 text-gray-800 hover:text-gray-900 rounded duration-200"
							>
								Batal
							</button>
							<Form
								method="delete"
								className={`py-2 px-4 hover:bg-danger  text-danger hover:text-white rounded duration-200`}
							>
								<input
									id="idBook"
									name={"idBook"}
									value={idBook}
									type="hidden"
								/>
								<button
									type="submit"
									disabled={pending}
									aria-disabled={pending}
								>
									{pending ? "Menghapus..." : "Hapus"}
								</button>
							</Form>
						</div>
					</section>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
