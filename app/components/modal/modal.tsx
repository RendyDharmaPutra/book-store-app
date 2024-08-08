import { Dispatch, memo, SetStateAction } from "react";
// import FormDeleteButton from "./delete_button";
import { Form, useNavigation } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";

const Modal = memo(
  ({
    idBook,
    title,
    isOpen,
    setShow,
  }: {
    idBook: number;
    title: string;
    isOpen: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
  }) => {
    const { state } = useNavigation();
    const pending = state != "idle";

    return (
      <AnimatePresence mode="wait">
        {isOpen && (
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
            onClick={() => setShow(false)}
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
              <h2 className="mb-4 title">Hapus Buku</h2>
              <p className="mb-4 text-gray-600">
                Hapus buku berjudul{" "}
                <span className="font-medium text-gray-800">{title}</span>?
              </p>
              <div className="flex flex-row items-end justify-end gap-4">
                <button
                  onClick={() => setShow(false)}
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
                    value={idBook}
                    type="hidden"
                  />
                  <button
                    type="submit"
                    disabled={pending}
                    aria-disabled={pending}
                    className="py-2 px-4"
                  >
                    {pending ? "Menghapus..." : "Hapus"}
                  </button>
                </Form>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

export default Modal;
