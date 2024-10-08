import { memo } from "react";
import BookList from "./book_list";

type BookDisplayType = {
  books: bookTransaction[];
  cart: selectedBook[];
  deleteItem: ((id: string, price: number, qty: number) => void) | null;
  height: string;
};

const BookDisplay = memo((props: BookDisplayType) => {
  return (
    <div
      className={`row-section md:flex-wrap justify-evenly gap-y-3 w-full ${props.height} md:max-h-[32rem] overflow-auto `}
    >
      {props.cart.length < 1 ? (
        <div className="flex center md:items-end w-full h-[20rem] md:h-[32rem] ">
          <h1 className="text-lg md:text-xl text-gray-600 ">
            Belum memilih Buku
          </h1>
        </div>
      ) : (
        props.cart.map((selected) => {
          const book = props.books.find(
            (book) => book.id == Number(selected.id)
          );

          if (book === undefined) {
            return (
              <div className="px-3 py-2 flex flex-col items-center justify-center w-full sm:w-[24rem] h-fit border border-gray-200 rounded-lg bg-white">
                <h1 className="font-semibold text-lg text-gray-800">
                  Buku telah dihapus
                </h1>
              </div>
            );
          }

          return (
            <BookList
              key={selected.id}
              id={String(selected.id)}
              title={book!.title}
              writer={book!.writer}
              price={book!.price}
              qty={Number(selected.quantity)}
              deleteItem={props.deleteItem}
            />
          );
        })
      )}
    </div>
  );
});

export default BookDisplay;
