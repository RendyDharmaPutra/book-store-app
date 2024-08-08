import { memo } from "react";
import { idr } from "utils/methods";

const BookList = memo(
  ({
    id,
    title,
    writer,
    price,
    qty,
    deleteItem,
  }: {
    id: string;
    title: string;
    writer: string;
    price: number;
    qty: number;
    deleteItem: (id: string, price: number, qty: number) => void;
  }) => {
    console.log(title);
    // Gunakan Cara ini untuk menghapus data buku yang dipesan
    // setItems((prevItems) => prevItems.filter((_, index) => index !== indexToRemove));
    return (
      <div className="px-3 py-2 flex flex-col gap-4 w-full sm:w-[24rem] min-h-[8rem] h-fit border border-gray-200 rounded-lg bg-white">
        <div className="flex flex-row justify-between ">
          <section className="flex flex-col gap-[2px]">
            <h1 className="font-semibold text-lg text-gray-800">{title}</h1>
            <h4 className="subtitle">{writer}</h4>
          </section>
          <button
            type="button"
            onClick={() => deleteItem(id, price, qty)}
            className="mt-1 p-[2px] w-fit h-fit rounded-full text-gray-500 hover:text-white border border-gray-200 hover:border-danger hover:bg-danger duration-200"
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
        <section className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h1 className="font-semibold text-gray-800">{idr.format(price)}</h1>
            <h4 className="subtitle">Kuantitas: {qty}</h4>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className="font-semibold text-gray-800">
              {idr.format(price * qty)}
            </h1>
          </div>
        </section>
      </div>
    );
  }
);

export default BookList;
