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
import { idr } from "utils/currency";
import { getBooks } from "utils/db/queries/transaction";
import { TransactionSchema } from "utils/validation";
import BookDisplay from "~/components/container/book_display";
import Input from "~/components/form/input";
import SheetButton from "~/components/modal/sheet_button";

function getCurrentDateTimeLocal() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

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
  const [amount, setAmount] = useState<number>(0);

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
        <input type="hidden" name="user" value={"3"} />
        <Input
          defaultValue="Nama Kasir"
          name="userDisplay"
          label="Kasir"
          type="text"
          data={null}
          error={errors?.user || null}
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
  const time = String(body.get("time"));

  const details: selectedBook[] = JSON.parse(String(body.get("detail")));

  details.map((detail) => console.log(detail));

  const transaction = {
    user: Number(body.get("user")),
    time: time.slice(0, 10) + " " + time.slice(11),
    amount: Number(body.get("amount")),
  };

  console.log(transaction);

  const validate = TransactionSchema.safeParse(transaction);

  if (!validate.success) {
    return json(validate.error.flatten().fieldErrors, { status: 400 });
  }

  return null;

  // console.log(body);

  // const result = await insertBook(validate.data);

  // if (result) return redirect("/");
}
