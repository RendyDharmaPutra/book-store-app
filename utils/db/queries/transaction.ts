import { asc, desc, eq, ilike, or } from "drizzle-orm";
import { db } from "../.";
import { Book, Detail_Transaction, Transaction, User } from "../schema";
import { idr, timeFormat } from "utils/methods";

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
    .where(or(ilike(User.name, `%${search}%`)))
    .orderBy(desc(Transaction.time))
    .limit(10)
    .offset((page - 1) * 10)
    .execute();

  const result = data.map((transaction) => ({
    ...transaction,
    amount: idr.format(transaction.amount),
    time: timeFormat(String(transaction.time)),
  }));

  return result;
};

export const getTransactionDetail = async (id: number) => {
  const data = await db
    .select({
      id: Transaction.id,
      time: Transaction.time,
      amount: Transaction.amount,
      user_id: User.id,
      user_name: User.name,
    })
    .from(Transaction)
    .innerJoin(User, eq(Transaction.user_id, User.id))
    .where(eq(Transaction.id, id))
    .execute();

  const result = data.map((transaction) => ({
    ...transaction,
    time: timeFormat(String(transaction.time)),
  }));

  return result[0];
};

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

export const deleteTransaction = async (id: number) => {
  const result = await db.delete(Transaction).where(eq(Transaction.id, id));

  return result;
};

export const getDetailTransaction = async (id: number) => {
  const data = await db
    .select({
      id: Detail_Transaction.book_id,
      quantity: Detail_Transaction.quantity,
    })
    .from(Detail_Transaction)
    .where(eq(Detail_Transaction.transaction_id, id));

  const result = data.map((transaction) => ({
    ...transaction,
    id: String(transaction.id),
    quantity: String(transaction.quantity),
  }));

  return result;
};

export const insertDetail = async (data: detailTransaction) => {
  const result = await db.insert(Detail_Transaction).values(data);

  return result;
};

export const deleteDetail = async (id: number) => {
  const result = await db
    .delete(Detail_Transaction)
    .where(eq(Detail_Transaction.transaction_id, id));

  return result;
};
