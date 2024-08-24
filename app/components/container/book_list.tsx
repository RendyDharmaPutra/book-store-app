import { memo } from "react";
import { idr } from "utils/methods";

type BookListType = {
  id: string;
  title: string;
  writer: string;
  price: number;
  qty: number;
  deleteItem: ((id: string, price: number, qty: number) => void) | null;
};

const BookList = memo((props: BookListType) => {
  return (
    <div className="px-3 py-2 flex flex-col gap-4 w-full sm:w-[24rem] h-fit border border-gray-200 rounded-lg bg-white">
      <div className="flex flex-row justify-between ">
        <section className="flex flex-col gap-[2px]">
          <h1 className="font-semibold text-lg text-gray-800">{props.title}</h1>
          <h4 className="subtitle">{props.writer}</h4>
        </section>
        {props.deleteItem && (
          <button
            type="button"
            onClick={() => props.deleteItem!(props.id, props.price, props.qty)}
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
        )}
      </div>
      <section className="flex flex-row justify-between">
        <div className="flex flex-col">
          <h1 className="font-semibold text-gray-800">
            {idr.format(props.price)}
          </h1>
          <h4 className="subtitle">Kuantitas: {props.qty}</h4>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-semibold text-gray-800">
            {idr.format(props.price * props.qty)}
          </h1>
        </div>
      </section>
    </div>
  );
});

export default BookList;
