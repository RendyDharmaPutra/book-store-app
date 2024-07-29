CREATE TABLE IF NOT EXISTS "Book" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"writer" varchar(100) NOT NULL,
	"year" smallint NOT NULL,
	"price" integer NOT NULL,
	"category_id" integer,
	"publisher_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(25) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Detail_Transaction" (
	"id" serial PRIMARY KEY NOT NULL,
	"quantity" integer NOT NULL,
	"book_id" integer,
	"transaction_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Publishers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Transaction" (
	"id" serial PRIMARY KEY NOT NULL,
	"time" timestamp NOT NULL,
	"address" integer NOT NULL,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(15) NOT NULL,
	"password" varchar(12) NOT NULL,
	"name" varchar(256) NOT NULL,
	"address" smallint NOT NULL,
	"birth_date" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Book" ADD CONSTRAINT "Book_category_id_Categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."Categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Book" ADD CONSTRAINT "Book_publisher_id_Publishers_id_fk" FOREIGN KEY ("publisher_id") REFERENCES "public"."Publishers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Detail_Transaction" ADD CONSTRAINT "Detail_Transaction_book_id_Book_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."Book"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Detail_Transaction" ADD CONSTRAINT "Detail_Transaction_transaction_id_Transaction_id_fk" FOREIGN KEY ("transaction_id") REFERENCES "public"."Transaction"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
