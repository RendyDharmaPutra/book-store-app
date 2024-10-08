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
import Divider from "~/components/container/divider";
import Loading from "~/components/boundary/loading";

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
  const pending = state === "submitting";

  return (
    <>
      <Form method="post" className="page">
        <h1 className="title">Tambah Buku</h1>
        <div className="px-4 row-section justify-between gap-6">
          <section className="form-section">
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
          <Divider />
          <section className="form-section">
            <Suspense fallback={<Loading />}>
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
            <Suspense fallback={<Loading />}>
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
          className={`self-end mt-auto md:mt-0 w-full md:w-fit ${
            pending ? "btn-disabled" : "btn-primary"
          } h-[2.5rem]`}
        >
          {pending ? <Loading /> : "Simpan"}
        </button>
      </Form>
    </>
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

  if (result) return redirect("/?status=add");
}
