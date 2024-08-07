import { memo } from "react";
import BookList from "./book_list";

const BookDisplay = memo(
  ({
    books,
    cart,
    deleteItem,
  }: {
    books: bookTransaction[];
    cart: selectedBook[];
    deleteItem: (id: string, price: number, qty: number) => void;
  }) => {
    return (
      <>
        {cart.length < 1 ? (
          <h1 className="text-lg md:text-xl text-gray-600">
            Belum memilih Buku
          </h1>
        ) : (
          cart.map((selected, index) => {
            const book = books.find((book) => book.id == Number(selected.id));

            return (
              <BookList
                key={index}
                id={selected.id}
                title={book!.title}
                writer={book!.writer}
                price={book!.price}
                qty={Number(selected.quantity)}
                deleteItem={deleteItem}
              />
            );
          })
        )}
      </>
    );
  }
);

export default BookDisplay;
