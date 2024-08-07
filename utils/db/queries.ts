import { asc, eq, ilike, or } from "drizzle-orm";
import { db } from ".";
import { Book, Categories, Publishers, Transaction, User } from "./schema";
import { idr } from "utils/methods";

export const getBooks = async (search: string, page: number) => {
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
      or(ilike(Book.title, `%${search}%`), ilike(Book.writer, `%${search}%`))
    )
    .orderBy(asc(Book.title))
    .limit(10)
    .offset((page - 1) * 10)
    .execute();

  const result = data.map((book) => ({
    ...book,
    price: idr.format(book.price),
  }));

  return result;
};

export const getBook = async (idBook: number) => {
  const data = await db.select().from(Book).where(eq(Book.id, idBook));

  return data[0];
};

export const insertBook = async (data: bookData) => {
  const result = await db.insert(Book).values(data);

  return result;
};

export const updateBook = async (idBook: number, data: bookData) => {
  const result = await db.update(Book).set(data).where(eq(Book.id, idBook));

  return result;
};

export const deleteBook = async (id: number) => {
  const result = await db.delete(Book).where(eq(Book.id, id));

  return result;
};

export const getCategories = async () => {
  const data = await db.select().from(Categories).orderBy(asc(Categories.name));

  return data;
};

export const getPublishers = async () => {
  const data = await db.select().from(Publishers).orderBy(asc(Publishers.name));

  return data;
};

export const getTransaction = async (search: string, page: number) => {
  const data = await db
    .select({
      id: Transaction.id,
      time: Transaction.time,
      amount: Transaction.amount,
      user: User.name,
    })
    .from(Transaction)
    .innerJoin(User, eq(Transaction.user_id, User.id))
    .where(
      or(
        // ilike(Transaction.time, `%${search}%`),
        ilike(User.name, `%${search}%`)
      )
    )
    .orderBy(Transaction.time)
    .limit(10)
    .offset((page - 1) * 10)
    .execute();

  const result = data.map((transaction) => ({
    ...transaction,
    amount: idr.format(transaction.amount),
    time: String(transaction.time).slice(0, -34),
  }));

  return result;
};

export const deleteTransaction = async (id: number) => {
  const result = await db.delete(Transaction).where(eq(Transaction.id, id));

  return result;
};
