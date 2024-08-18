import { useState } from "react";
import Modal from "./modal";

type ModalButtonProps = {
  headline: string;
  type: string;
  id: number;
  title: string;
};

export default function ModalButton(props: ModalButtonProps): JSX.Element {
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
        idBook={props.id}
        headline={props.headline}
        type={props.type}
        title={props.title}
        isOpen={show}
        setShow={setShow}
      />
    </>
  );
}
