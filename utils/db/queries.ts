import { eq } from "drizzle-orm";
import { db } from ".";
import { Book, Categories, Publishers } from "./schema";

export const getBook = async () => {
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
		.innerJoin(Publishers, eq(Book.publisher_id, Publishers.id));

	return data;
};
