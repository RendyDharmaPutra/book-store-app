import { useState } from "react";
import Modal from "./modal";

export default function ModalButton({
  headline,
  id,
  title,
}: {
  headline: string;
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
      <Modal
        headline={headline}
        idBook={id}
        title={title}
        isOpen={show}
        setShow={setShow}
      />
    </>
  );
}
