import {
  boolean,
  date,
  integer,
  pgTable,
  serial,
  smallint,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const User = pgTable("User", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 15 }).notNull(),
  password: varchar("password", { length: 12 }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  address: varchar("address", { length: 100 }).notNull(),
  birth_date: date("birth_date").notNull(),
  year: smallint("year").notNull(),
  admin: boolean("admin").notNull(),
});

export const Categories = pgTable("Categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 25 }).notNull(),
});

export const Publishers = pgTable("Publishers", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
});

export const Book = pgTable("Book", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  writer: varchar("writer", { length: 100 }).notNull(),
  year: smallint("year").notNull(),
  price: integer("price").notNull(),
  category_id: integer("category_id").references(() => Categories.id),
  publisher_id: integer("publisher_id").references(() => Publishers.id),
});

export const Transaction = pgTable("Transaction", {
  id: serial("id").primaryKey(),
  time: timestamp("time").notNull(),
  amount: integer("amount").notNull(),
  user_id: integer("user_id").references(() => User.id),
});

export const Detail_Transaction = pgTable("Detail_Transaction", {
  id: serial("id").primaryKey(),
  quantity: integer("quantity").notNull(),
  book_id: integer("book_id").references(() => Book.id),
  transaction_id: integer("transaction_id").references(() => Transaction.id),
});
