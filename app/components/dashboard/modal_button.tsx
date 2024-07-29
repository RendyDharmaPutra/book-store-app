import { useState } from "react";
import Modal from "./modal";

export default function ModalButton({
	id,
	title,
}: {
	id: number;
	title: string;
}): JSX.Element {
	const [show, setShow] = useState<boolean>(false);

	return (
		<>
			<button
				onClick={() => {
					setShow(true);
				}}
				type="submit"
				className="ml-2 tbutton inline text-danger"
			>
				Hapus
			</button>
			<Modal idBook={id} title={title} isOpen={show} setShow={setShow} />
		</>
	);
}
