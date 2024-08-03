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
import AddButton from "~/components/form/add_button";
import Input from "~/components/form/input";

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
			<div className="row-section flex-wrap gap-6 md:gap-4">
				<Input
					defaultValue=""
					name="title"
					label="Judul Buku"
					type="text"
					data={null}
					error={errors?.title || null}
				/>
				<Input
					defaultValue=""
					name="writer"
					label="Penulis"
					type="text"
					data={null}
					error={errors?.writer || null}
				/>
				<Input
					defaultValue=""
					name="year"
					label="Tahun Terbit"
					type="number"
					data={null}
					error={errors?.year || null}
				/>
				<Input
					defaultValue=""
					name="price"
					label="Harga"
					type="number"
					data={null}
					error={errors?.price || null}
				/>
				<Suspense fallback={<h1>Loading...</h1>}>
					<Await resolve={publishers}>
						{(publishers) => (
							<Input
								defaultValue=""
								name="publisher"
								label="Penerbit"
								type="select"
								data={publishers}
								error={errors?.publisher_id || null}
							/>
						)}
					</Await>
				</Suspense>
				<Suspense fallback={<h1>Loading...</h1>}>
					<Await resolve={categories}>
						{(categories) => (
							<Input
								defaultValue=""
								name="category"
								label="Kategori"
								type="select"
								data={categories}
								error={errors?.category_id || null}
							/>
						)}
					</Await>
				</Suspense>
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
