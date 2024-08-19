import { Dispatch, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Sheet({
  books,
  selected,
  isOpen,
  setShow,
  setAmount,
  select,
}: {
  books: bookTransaction[];
  selected: selectedBook[];
  isOpen: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setAmount: Dispatch<SetStateAction<number>>;
  select: Dispatch<SetStateAction<selectedBook[]>>;
}) {
  const [book, setBook] = useState<selectedBook>({
    id: String(books[0].id),
    quantity: "1",
  });

  const handleInputChange = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    setBook({
      ...book,
      [name]: value,
    });
  };

  const save = () => {
    const id = Number(book.id);
    let quantity: number = Number(book.quantity);

    if (quantity > 0) {
      const duplicate = selected.find(
        (bookSelected) => bookSelected.id === book.id
      );

      const submitedBook = books.find((singleBook) => singleBook.id === id);

      if (duplicate === undefined) {
        select((prevItems) => [...prevItems, book]);

        setAmount((prevItems) => (prevItems += submitedBook!.price * quantity));
      } else {
        setAmount((prevItems) => (prevItems += submitedBook!.price * quantity));

        book.quantity = String(quantity + Number(duplicate.quantity));

        select((prevItems) =>
          prevItems.map((item) =>
            item.id === book.id ? { ...item, quantity: book.quantity } : item
          )
        );
      }

      setBook({
        id: String(books[0].id),
        quantity: "1",
      });

      setShow(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          onClick={() => setShow(false)}
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-start justify-end z-50"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{
              opacity: 0,
              translateX: "50vh",
            }}
            animate={{
              opacity: 1,
              translateX: "0vh",
            }}
            exit={{
              opacity: 0,
              translateX: "50vh",
            }}
            className="layout w-3/4 md:w-1/4 h-full shadow bg-white"
          >
            <section className="mb-4 flex flex-row items-center justify-between ">
              <h2 className="title">Pilih Buku</h2>
              <button
                type="button"
                onClick={() => setShow(false)}
                className="p-[2px] rounded-full text-gray-500 hover:text-white border border-gray-300 hover:border-danger hover:bg-danger duration-200"
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
            </section>
            <section className="flex flex-col items-center gap-3">
              <div className={`flex flex-col gap-1 w-full`}>
                <label htmlFor="book" className="font-medium text-gray-700">
                  Buku
                </label>
                <select
                  required
                  onChange={(e) => handleInputChange(e.target)}
                  key="id"
                  defaultValue={String(book.id)}
                  id="id"
                  name="id"
                  className="w-full max-h-[10rem] overflow-y-auto input-primary focus:bg-page cursor-pointer"
                >
                  {books.map((book) => {
                    return (
                      <option
                        key={book.id}
                        value={book.id}
                        className="flex flex-col h-[6rem] text-gray-700 bg-white duration-200"
                      >
                        {book.title}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={`flex flex-col gap-1 w-full`}>
                <label htmlFor="quantity" className="font-medium text-gray-700">
                  Kuantitas
                </label>
                <input
                  required
                  onChange={(e) => handleInputChange(e.target)}
                  id="quantity"
                  name="quantity"
                  type="number"
                  defaultValue={book.quantity}
                  className="w-full input-primary"
                />
              </div>
              <button
                type="button"
                onClick={save}
                className={`mt-4  self-end w-full md:w-fit btn-primary h-[2.5rem]`}
              >
                Simpan
              </button>
            </section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
