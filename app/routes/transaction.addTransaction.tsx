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
import { memo, Suspense, useCallback, useState } from "react";
import { getCurrentDateTimeLocal, idr } from "utils/methods";
import {
  getBooks,
  insertDetail,
  insertTransaction,
} from "utils/db/queries/transaction";
import { TransactionSchema } from "utils/validation";
import BookDisplay from "~/components/container/book_display";
import Input from "~/components/form/input";
import SheetButton from "~/components/modal/sheet_button";

export async function loader() {
  // AKSES AKUN USER DARI COOKIE
  const books = getBooks();

  return defer({
    books,
  });
}

export default function AddBook() {
  // TODOS : BUAT MEMO COMPONENT HANYA DIRENDER ULANG KETIKA QUANTITY NYA BERUBAH, GUNAKAN MEMOIZE DENGAN CONDITIONAL RENDERING
  // TODOS : GUNAKAN CONTEXT UNTUK STATE PADA MEMO COMPONENT SUPAYA PARENT TIDAK TERKENA RERENDER KETIKA MEMO COMPONENT DIRERENDER
  // TODOS : PERBAIKI LAYOUT FORM
  // MENDAPATKAN AKUN USER DARI COOKIE
  const { books } = useLoaderData<typeof loader>();
  const errors = useActionData<typeof action>();

  const [cart, setCart] = useState<selectedBook[]>([]);
  const [amount, setAmount] = useState(0);

  const { state } = useNavigation();
  const pending = state != "idle";

  const deleteItem = useCallback((id: string, price: number, qty: number) => {
    setCart((prevItems) => prevItems.filter((item) => item.id != id));
    setAmount((prevItems) => (prevItems -= price * qty));
  }, []);

  const getcart = () => {
    return JSON.stringify(cart);
  };

  const Amount = memo(({ amount }: { amount: number }) => {
    return (
      <>
        <input type="hidden" name="amount" value={amount} />
        <div className="md:self-end flex flex-row justify-start md:justify-center items-start  md:items-center gap-3  ">
          <h2 className=" text-gray-800 text-lg md:text-2xl">Total Harga : </h2>
          <h3 className="font-medium text-gray-800 text-lg md:text-2xl">
            {idr.format(amount)}
          </h3>
        </div>
      </>
    );
  });

  return (
    <Form method="post" className="page">
      <h1 className="title">Tambah Transaksi</h1>
      <div className=" row-section gap-8 md:justify-between w-full h-[38rem] ">
        <section className="md:px-4 flex flex-col md:justify-normal items-start gap-8 md:gap-10 md:w-1/2 h-full ">
          <Input
            defaultValue={getCurrentDateTimeLocal()}
            name="time"
            label="Waktu"
            type="datetime-local"
            data={null}
            error={errors?.time || null}
          />
          {/* Akses User Disini */}
          <input type="hidden" name="user" value={"3"} />
          <div className="flex flex-row justify-start md:justify-center items-start  md:items-center gap-3  ">
            <h2 className="font-medium text-gray-800 text-base md:text-lg">
              Kasir :{" "}
            </h2>
            <h3 className="text-gray-600 text-base md:text-lg">Nama Kasir</h3>
          </div>
          <Amount amount={amount} />
        </section>
        <section className="flex flex-col items-center justify-center gap-2 w-full md:w-[50rem] ">
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
          pending ? "bg-gray-50 text-gray-600 btn" : "btn-primary"
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
