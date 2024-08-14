import { Dispatch, SetStateAction, useState } from "react";
import Sheet from "./sheet";

export default function SheetButton({
  books,
  selected,
  setAmount,
  select,
}: {
  books: bookTransaction[];
  selected: selectedBook[];
  setAmount: Dispatch<SetStateAction<number>>;
  select: Dispatch<SetStateAction<selectedBook[]>>;
}) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShow(true)}
        className="mt-4 flex flex-col justify-center items-center w-full lg:w-[24rem] h-[3rem] text-primary hover:text-white border border-primary rounded-lg bg-white hover:bg-primary active:bg-secondary duration-200"
      >
        <h1 className="font-medium text-base md:text-lg">Tambah Buku</h1>
      </button>
      <Sheet
        books={books}
        selected={selected}
        select={select}
        isOpen={show}
        setAmount={setAmount}
        setShow={setShow}
      />
    </>
  );
}
