import { memo } from "react";
import { idr } from "utils/currency";

const BookList = memo(
  ({
    title,
    writer,
    price,
    qty,
  }: {
    title: string;
    writer: string;
    price: number;
    qty: number;
  }) => {
    return (
      <div className="px-3 py-2 flex flex-col gap-4 w-full sm:w-[24rem] border border-gray-200 rounded-lg bg-white">
        <section className="flex flex-col gap-[2px]">
          <h1 className="font-semibold text-lg text-gray-800">{title}</h1>
          <h4 className="subtitle">{writer}</h4>
        </section>
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
