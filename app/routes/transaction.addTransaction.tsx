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
import { memo, Suspense, useState } from "react";
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
  // MENDAPATKAN AKUN USER DARI COOKIE
  const { books } = useLoaderData<typeof loader>();
  const errors = useActionData<typeof action>();

  const [selectedBooks, selectBook] = useState<selectedBook[]>([]);
  const [amount, setAmount] = useState(0);

  const { state } = useNavigation();
  const pending = state != "idle";

  const getSelectedBooks = () => {
    return JSON.stringify(selectedBooks);
  };

  const Amount = memo(({ amount }: { amount: number }) => {
    return (
      <>
        <input type="hidden" name="amount" value={amount} />
        <Input
          defaultValue={idr.format(amount)}
          name="amountDisplay"
          label="Total Harga"
          type="text"
          data={null}
          error={errors?.amount || null}
        />
      </>
    );
  });

  return (
    <Form method="post" className="page">
      <h1 className="title">Tambah Transaksi</h1>
      <div className="row-section flex-wrap gap-6 md:gap-4">
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
        <Input
          defaultValue="Nama Kasir"
          name="userDisplay"
          label="Kasir"
          type="text"
          data={null}
          error={errors?.user_id || null}
        />
        <Suspense fallback={<h1>Loading...</h1>}>
          <Await resolve={books}>
            {(books) => (
              <section className="flex flex-col items-center gap-2 ">
                <BookDisplay books={books} selectedBooks={selectedBooks} />
                <SheetButton
                  books={books}
                  selected={selectedBooks}
                  setAmount={setAmount}
                  select={selectBook}
                />
              </section>
            )}
          </Await>
        </Suspense>
        <Amount amount={amount} />
        <input type="hidden" name="detail" value={getSelectedBooks()} />
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

  if (details.length >= 1) {
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
  }

  return null;
}
