import { useState } from "react";
import Modal from "./modal";
import { AnimatePresence } from "framer-motion";

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
        className="tbutton inline text-danger"
      >
        Hapus
      </button>
      <Modal idBook={id} title={title} isOpen={show} setShow={setShow} />
    </>
  );
}
