import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
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
import {
  getBook,
  getCategories,
  getPublishers,
  updateBook,
} from "utils/db/queries";
import { BookSchema } from "utils/validation";
import ErrorCard from "~/components/boundary/error_card";
import Divider from "~/components/container/divider";
import Select from "~/components/form/select";
import TextBox from "~/components/form/text_box";

export async function loader({ params }: LoaderFunctionArgs) {
  const book = getBook(Number(params.id));
  const categories = getCategories();
  const publishers = getPublishers();

  return defer({
    book,
    categories,
    publishers,
  });
}

export default function EditBook() {
  const { book, categories, publishers } = useLoaderData<typeof loader>();
  const errors = useActionData<typeof action>();

  const { state } = useNavigation();
  const pending = state === "submitting";

  return (
    <Form method="post" className="page">
      <h1 className="title">Tambah Buku</h1>
      <div className="px-4 row-section justify-between gap-6">
        <Suspense>
          <Await resolve={book}>
            {(book) => (
              <>
                <input type="hidden" name="id" value={book.id} />
                <section className="form-section">
                  <TextBox
                    defaultValue={book.title}
                    name="title"
                    label="Judul Buku"
                    type="text"
                    error={errors?.title || null}
                  />
                  <TextBox
                    defaultValue={book.writer}
                    name="writer"
                    label="Penulis"
                    type="text"
                    error={errors?.writer || null}
                  />
                  <TextBox
                    defaultValue={book.year}
                    name="year"
                    label="Tahun Terbit"
                    type="number"
                    error={errors?.year || null}
                  />
                  <TextBox
                    defaultValue={book.price}
                    name="price"
                    label="Harga"
                    type="number"
                    error={errors?.price || null}
                  />
                </section>
                <Divider />
                <section className="form-section">
                  <Suspense fallback={<h1>Loading...</h1>}>
                    <Await resolve={publishers}>
                      {(publishers) => (
                        <Select
                          defaultValue={book.publisher_id!}
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
                          defaultValue={book.category_id!}
                          name="category"
                          label="Kategori"
                          datas={categories}
                          error={errors?.category_id || null}
                        />
                      )}
                    </Await>
                  </Suspense>
                </section>
              </>
            )}
          </Await>
        </Suspense>
      </div>
      <button
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        className={`mt-auto md:mt-0 self-end w-full md:w-fit ${
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

  const result = await updateBook(Number(body.get("id")), validate.data);

  if (result) return redirect("/");
}

export function ErrorBoundary() {
  return <ErrorCard name="Buku" route="/" />;
}
