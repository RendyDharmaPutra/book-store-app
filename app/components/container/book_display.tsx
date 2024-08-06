import { memo } from "react";
import BookList from "./book_list";

const BookDisplay = memo(
  ({
    books,
    selectedBooks,
  }: {
    books: bookTransaction[];
    selectedBooks: selectedBook[];
  }) => {
    return (
      <>
        {selectedBooks.length < 1 ? (
          <h1 className="text-lg md:text-xl text-gray-600">
            Belum memilih Buku
          </h1>
        ) : (
          selectedBooks.map((selected, index) => {
            const book = books.find((book) => book.id == Number(selected.id));

            return (
              <BookList
                key={index}
                title={book!.title}
                writer={book!.writer}
                price={book!.price}
                qty={Number(selected.quantity)}
              />
            );
          })
        )}
      </>
    );
  }
);

export default BookDisplay;
