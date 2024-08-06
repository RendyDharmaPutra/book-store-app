import { asc, eq, ilike, or } from "drizzle-orm";
import { db } from "../.";
import { Book, Categories, Publishers, Transaction, User } from "../schema";

export const getBooks = async () => {
  const data = await db
    .select({
      id: Book.id,
      title: Book.title,
      writer: Book.writer,
      year: Book.year,
      price: Book.price,
    })
    .from(Book)
    .orderBy(asc(Book.title))
    .execute();

  return data;
};
