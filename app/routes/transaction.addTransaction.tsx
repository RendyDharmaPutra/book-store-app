import { ActionFunctionArgs } from "@remix-run/node";
import {
  Await,
  defer,
  Form,
  json,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { Suspense, useCallback, useState } from "react";
import { getCurrentDateTimeLocal } from "utils/methods";
import {
  getBooks,
  insertDetail,
  insertTransaction,
} from "utils/db/queries/transaction";
import { TransactionSchema } from "utils/validation";
import BookDisplay from "~/components/container/book_display";
import SheetButton from "~/components/modal/sheet_button";
import TextBox from "~/components/form/text_box";
import Amount from "~/components/form/amount";

export async function loader() {
  // AKSES AKUN USER DARI COOKIE
  const books = getBooks();

  return defer({
    books,
  });
}

export default function AddBook() {
  // MENDAPATKAN AKUN USER DARI COOKIE
  const { books } = useLoaderData<typeof loader>();
  const errors = useActionData<typeof action>();

  const [cart, setCart] = useState<selectedBook[]>([]);
  const [amount, setAmount] = useState(0);

  const { state } = useNavigation();
  const pending = state !== "submitting";

  const deleteItem = useCallback((id: string, price: number, qty: number) => {
    setCart((prevItems) => prevItems.filter((item) => item.id != id));
    setAmount((prevItems) => (prevItems -= price * qty));
  }, []);

  const getcart = () => {
    return JSON.stringify(cart);
  };

  return (
    <Form method="post" className="page">
      <h1 className="title">Tambah Transaksi</h1>
      <div className=" row-section gap-5 md:justify-between w-full h-[38rem] ">
        <section className="md:px-4 flex flex-col md:justify-normal items-start gap-8 md:gap-10 md:w-1/2 ">
          <TextBox
            defaultValue={getCurrentDateTimeLocal()}
            name="time"
            label="Waktu"
            type="datetime-local"
            error={errors?.time || null}
          />
          {/* Akses User Disini */}
          <input type="hidden" name="user" value={"3"} />
          <div className="flex flex-row justify-start md:justify-center items-start md:items-center gap-3  ">
            <h2 className="font-medium text-gray-800 text-base md:text-lg">
              Kasir :{" "}
            </h2>
            <h3 className="text-gray-600 text-base md:text-lg">Nama Kasir</h3>
          </div>
          <Amount amount={amount} />
        </section>
        <section className="flex flex-col items-center justify-between w-full md:w-[50rem] h-full ">
          <Suspense fallback={<h1>Loading...</h1>}>
            <Await resolve={books}>
              {(books) => (
                <>
                  <BookDisplay
                    books={books}
                    cart={cart}
                    deleteItem={deleteItem}
                  />
                  <SheetButton
                    books={books}
                    selected={cart}
                    setAmount={setAmount}
                    select={setCart}
                  />
                </>
              )}
            </Await>
          </Suspense>
        </section>
        <input type="hidden" name="detail" value={getcart()} />
      </div>
      <button
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        className={`self-end w-full md:w-fit ${
          pending ? "bg-gray-200 text-gray-800 btn" : "btn-primary"
        } h-[2.5rem] `}
      >
        {pending ? "Menyimpan..." : "Simpan"}
      </button>
    </Form>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();

  const details: selectedBook[] = JSON.parse(String(body.get("detail")));

  const transaction = {
    time: String(body.get("time")),
    amount: Number(body.get("amount")),
    user_id: Number(body.get("user")),
  };

  const validate = TransactionSchema.safeParse(transaction);

  if (!validate.success) {
    return json(validate.error.flatten().fieldErrors, { status: 400 });
  }

  const result = await insertTransaction(validate.data!);

  details.map(async (detail) => {
    const data = {
      quantity: Number(detail.quantity),
      book_id: Number(detail.id),
      transaction_id: Number(result),
    };
    await insertDetail(data);
  });

  if (result) return redirect("/transaction");

  return null;
}
