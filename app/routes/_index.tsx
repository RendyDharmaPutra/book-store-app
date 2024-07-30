import { LoaderFunctionArgs } from "@remix-run/node";
import { Await, defer, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";
import { getBook } from "utils/db/queries";
import ActionBar from "~/components/container/action_bar";
import Pagination from "~/components/container/pagination";
import Table from "~/components/container/table";

export async function loader({ request }: LoaderFunctionArgs) {
	const books = getBook();

	return defer({
		books,
	});
}

export default function Dashboard() {
	const { books } = useLoaderData<typeof loader>();

	return (
		<div className="page">
			<h1 className="title">Daftar Buku</h1>
			<ActionBar route="Buku" addRoute="/addBook" />
			<section className="flex flex-col w-full items-center sm:items-start">
				<Suspense fallback={<h1>Loading...</h1>}>
					<Await resolve={books}>{(books) => <Table books={books} />}</Await>
				</Suspense>
			</section>
			<Pagination />
		</div>
	);
}
