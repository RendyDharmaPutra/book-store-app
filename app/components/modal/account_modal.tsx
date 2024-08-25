import { Dispatch, memo, SetStateAction, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type AccountModalType = {
  status: string;
  isOpen: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

const AccountModal = memo((props: AccountModalType) => {
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
          className={`absolute top-10 md:right-2 layout w-[90%] md:w-1/4 border-l-[6px] border-${props.status} rounded-lg shadow bg-white`}
        >
          <div className="flex flex-row justify-between ">
            <h2 className="mb-4 bold text-lg md:text-xl">
              Akun tidak ditemukan
            </h2>
            <button
              onClick={() => props.setShow(false)}
              className="p-[2px] w-fit h-fit rounded-full text-gray-500 hover:text-white border border-gray-200 hover:border-danger hover:bg-danger duration-200"
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
          <p className="mb-4 text-sm md:text-base text-gray-600">
            Silahkan periksa kembali username dan password yang anda masukkan
          </p>
        </motion.section>
      )}
    </AnimatePresence>
  );
});

export default AccountModal;
