import { asc, eq, ilike, or } from "drizzle-orm";
import { db } from "../.";
import {
  Book,
  Categories,
  Detail_Transaction,
  Publishers,
  Transaction,
  User,
} from "../schema";

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

export const insertTransaction = async (data: transaction) => {
  const result = await db
    .insert(Transaction)
    .values(data)
    .returning({ id: Transaction.id });

  return result[0].id;
};

export const insertDetail = async (data: detailTransaction) => {
  const result = await db.insert(Detail_Transaction).values(data);

  return result;
};
