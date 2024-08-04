ALTER TABLE "Transaction" RENAME COLUMN "address" TO "amount";--> statement-breakpoint
ALTER TABLE "User" ALTER COLUMN "address" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "year" smallint NOT NULL;--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "admin" boolean NOT NULL;