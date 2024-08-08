ALTER TABLE "Detail_Transaction" DROP CONSTRAINT "Detail_Transaction_book_id_Book_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Detail_Transaction" ADD CONSTRAINT "Detail_Transaction_book_id_Book_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."Book"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
