import { asc, eq, like, or } from "drizzle-orm";
import { db } from ".";
import { Book, Categories, Publishers } from "./schema";

export const getBook = async (search: string, page: number) => {
	const data = await db
		.select({
			id: Book.id,
			title: Book.title,
			writer: Book.writer,
			year: Book.year,
			price: Book.price,
			category: Categories.name,
			publisher: Publishers.name,
		})
		.from(Book)
		.innerJoin(Categories, eq(Book.category_id, Categories.id))
		.innerJoin(Publishers, eq(Book.publisher_id, Publishers.id))
		.where(
			or(like(Book.title, `%${search}%`), like(Book.writer, `%${search}%`)),
		)
		.orderBy(asc(Book.title))
		.limit(6)
		.offset((page - 1) * 6)
		.execute();

	return data;
};

export const deleteBook = async (idBook: number) => {
	const result = await db.delete(Book).where(eq(Book.id, idBook));

	return result;
};
