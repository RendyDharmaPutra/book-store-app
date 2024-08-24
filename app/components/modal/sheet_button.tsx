import { Dispatch, SetStateAction, useState } from "react";
import Sheet from "./sheet";

type SheetButtonType = {
  books: bookTransaction[];
  selected: selectedBook[];
  setAmount: Dispatch<SetStateAction<number>>;
  select: Dispatch<SetStateAction<selectedBook[]>>;
};

export default function SheetButton(props: SheetButtonType) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShow(true)}
        className="mt-4 flex flex-col justify-center items-center w-full lg:w-[24rem] h-[3rem] text-primary hover:text-white border border-primary rounded-lg bg-white hover:bg-primary active:brightness-90 duration-200"
      >
        <h1 className="font-medium text-base md:text-lg">Pilih Buku</h1>
      </button>
      <Sheet
        books={props.books}
        selected={props.selected}
        select={props.select}
        isOpen={show}
        setAmount={props.setAmount}
        setShow={setShow}
      />
    </>
  );
}
