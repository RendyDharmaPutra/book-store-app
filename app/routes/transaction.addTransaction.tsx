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
import { Suspense } from "react";
import { getCategories, getPublishers, insertBook } from "utils/db/queries";
import { BookSchema } from "utils/validation";
import BookList from "~/components/container/book_list";
import AddButton from "~/components/form/add_button";
import Input from "~/components/form/input";

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
  const publishers = getPublishers();

  return defer({
    publishers,
  });
}

export default function AddBook() {
  // MENDAPATKAN AKUN USER DARI COOKIE
  const { publishers } = useLoaderData<typeof loader>();
  const errors = useActionData<typeof action>();

  const { state } = useNavigation();
  const pending = state != "idle";

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
          error={errors?.title || null}
        />
        <Input
          defaultValue=""
          name="amount"
          label="Total Harga"
          type="number"
          data={null}
          error={errors?.writer || null}
        />
        <Suspense fallback={<h1>Loading...</h1>}>
          <Await resolve={publishers}>
            {(publishers) => (
              <Input
                defaultValue="Nama Kasir"
                name="user"
                label="Kasir"
                type="text"
                data={null}
                error={errors?.publisher_id || null}
              />
            )}
          </Await>
        </Suspense>
        <button
          type="button"
          onClick={() => console.log("Open Dialog")}
          className="flex flex-col justify-center items-center w-full sm:w-[24rem] h-[3rem] border border-gray-200 rounded-lg bg-white darker-hover"
        >
          <h1 className="font-medium text-lg md:text-xl text-gray-800">
            Tambah Buku
          </h1>
        </button>
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

  const book: bookData = {
    title: String(body.get("title")),
    writer: String(body.get("writer")),
    year: Number(body.get("year")),
    price: Number(body.get("price")),
    category_id: Number(body.get("category")),
    publisher_id: Number(body.get("publisher")),
  };

  const validate = BookSchema.safeParse(book);

  if (!validate.success) {
    return json(validate.error.flatten().fieldErrors, { status: 400 });
  }

  // const result = await insertBook(validate.data);

  // if (result) return redirect("/");
}
