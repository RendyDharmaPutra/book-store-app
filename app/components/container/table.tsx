import { Link } from "@remix-run/react";
import ModalButton from "../dashboard/modal_button";
import NotFound from "../dashboard/not_found";

export default function Table({ books }: { books: book[] }): JSX.Element {
	return (
		<div className="flex flex-col w-[95%] sm:w-full h-[36rem] sm:h-[26rem] overflow-scroll rounded-lg text-gray-800 bg-zinc-50">
			{books.length == 0 ? (
				<NotFound />
			) : (
				<table className="text-left table-auto md:table-fixed">
					<thead className="bg-zinc-100">
						<tr>
							<THead name="Judul" />
							<THead name="Kategori" />
							<THead name="Penulis" />
							<THead name="Penerbit" />
							<THead name="Tahun Terbit" />
							<THead name="Harga" />
							<THead name="Aksi" />
						</tr>
					</thead>
					<tbody>
						{books.map((book) => (
							<TBody
								key={book.id}
								id={book.id}
								title={book.title}
								writer={book.writer}
								publisher={book.publisher}
								category={book.category}
								year={book.year}
								price={book.price}
							/>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}

function THead({ name }: { name: string }): JSX.Element {
	return (
		<th className="p-4 border-b border-gray-200">
			<p className="block text-sm antialiased font-semibold leading-none text-gray-600">
				{name}
			</p>
		</th>
	);
}

function TBody({
	id,
	title,
	writer,
	publisher,
	category,
	year,
	price,
}: book): JSX.Element {
	let idr = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	});

	return (
		<tr>
			<TCol content={title} />
			<TCol content={category} />
			<TCol content={writer} />
			<TCol content={publisher} />
			<TCol content={year} />
			<TCol content={idr.format(price)} />
			<td className="p-4 border-b border-gray-50">
				<Link
					prefetch="viewport"
					to={`/${id}`}
					className="mr-2 tbutton text-primary"
				>
					Ubah
				</Link>
				<ModalButton id={id} title={title} />
			</td>
		</tr>
	);
}

function TCol({ content }: { content: string | number }): JSX.Element {
	return (
		<td className="p-4 border-b border-gray-50">
			<p className="block text-sm antialiased font-normal leading-normal text-gray-900">
				{content}
			</p>
		</td>
	);
}
