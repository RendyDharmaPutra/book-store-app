import { Dispatch, memo, SetStateAction } from "react";
import { Form, useNavigation } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../boundary/loading";

type ModalProps = {
  headline: string;
  type: string;
  idBook: number;
  title: string;
  isOpen: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

const Modal = memo((props: ModalProps) => {
  const { state } = useNavigation();
  const pending = state != "idle";

  return (
    <AnimatePresence mode="wait">
      {props.isOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          onClick={() => props.setShow(false)}
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.section
            onClick={(e) => e.stopPropagation()}
            initial={{
              opacity: 0,
              translateY: "-50vh",
            }}
            animate={{
              opacity: 1,
              translateY: "0vh",
            }}
            exit={{
              opacity: 0,
              translateY: "-50vh",
            }}
            className="bg-white layout rounded-lg shadow-lg w-3/4 md:w-1/3"
          >
            <h2 className="mb-4 title">Hapus {props.headline}</h2>
            <p className="mb-4 text-gray-600">
              Hapus {props.headline} {props.type}{" "}
              <span className="font-medium text-gray-800">{props.title}</span>?
            </p>
            <div className="flex flex-row items-end justify-end gap-4">
              <button
                onClick={() => props.setShow(false)}
                className="py-2 px-4 hover:bg-gray-200 text-gray-600 hover:text-gray-800 rounded duration-200"
              >
                Batal
              </button>
              <Form
                method="delete"
                className={` hover:bg-danger  text-danger hover:text-white rounded duration-200`}
              >
                <input
                  id="idBook"
                  name={"idBook"}
                  value={props.idBook}
                  type="hidden"
                />
                <button
                  type="submit"
                  disabled={pending}
                  aria-disabled={pending}
                  className="py-2 px-4"
                >
                  {pending ? <Loading /> : "Hapus"}
                </button>
              </Form>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default Modal;
