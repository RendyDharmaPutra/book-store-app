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
import TextBox from "~/components/form/text_box";
import Select from "~/components/form/select";

export async function loader() {
  const categories = getCategories();
  const publishers = getPublishers();

  return defer({
    categories,
    publishers,
  });
}

export default function AddBook() {
  const { categories, publishers } = useLoaderData<typeof loader>();
  const errors = useActionData<typeof action>();

  const { state } = useNavigation();
  const pending = state != "idle";

  return (
    <Form method="post" className="page">
      <h1 className="title">Tambah Buku</h1>
      <div className="px-4 row-section justify-between ">
        <section className="row-section flex-wrap gap-6 md:gap-4 md:w-1/2 ">
          <TextBox
            defaultValue=""
            name="title"
            label="Judul Buku"
            type="text"
            error={errors?.title || null}
          />
          <TextBox
            defaultValue=""
            name="writer"
            label="Penulis"
            type="text"
            error={errors?.writer || null}
          />
          <TextBox
            defaultValue=""
            name="year"
            label="Tahun Terbit"
            type="number"
            error={errors?.year || null}
          />
          <TextBox
            defaultValue=""
            name="price"
            label="Harga"
            type="number"
            error={errors?.price || null}
          />
        </section>
        <section className="row-section flex-wrap gap-6 md:gap-4 md:w-1/2 ">
          <Suspense fallback={<h1>Loading...</h1>}>
            <Await resolve={publishers}>
              {(publishers) => (
                <Select
                  defaultValue=""
                  name="publisher"
                  label="Penerbit"
                  datas={publishers}
                  error={errors?.publisher_id || null}
                />
              )}
            </Await>
          </Suspense>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Await resolve={categories}>
              {(categories) => (
                <Select
                  defaultValue=""
                  name="category"
                  label="Kategori"
                  datas={categories}
                  error={errors?.category_id || null}
                />
              )}
            </Await>
          </Suspense>
        </section>
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

  const result = await insertBook(validate.data);

  if (result) return redirect("/");
}
