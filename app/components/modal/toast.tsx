import { Dispatch, memo, SetStateAction, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useTable from "utils/hooks/table_hook";

type AccountModalType = {
  type: string;
  status: string;
  isOpen: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

const AccountModal = memo((props: AccountModalType) => {
  const { headline } = useTable();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      props.setShow(false);
    }, 2000);

    return () => clearTimeout(timeOut);
  }, [props.isOpen]);

  return (
    <AnimatePresence mode="wait">
      {props.isOpen && (
        <motion.section
          onClick={(e) => e.stopPropagation()}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className={`absolute md:top-20 md:right-2 layout w-[90%] md:w-1/4 border-l-[6px] border-${props.status} rounded-lg shadow-md bg-white`}
        >
          <div className="flex flex-row justify-between ">
            <h2 className="bold text-lg md:text-xl">
              Berhasil {props.type} {headline}
            </h2>
            <button
              onClick={() => props.setShow(false)}
              className="absolute top-3 right-3 p-[2px] w-fit h-fit rounded-full text-gray-500 hover:text-white border border-gray-200 hover:border-danger hover:bg-danger duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
});

export default AccountModal;
