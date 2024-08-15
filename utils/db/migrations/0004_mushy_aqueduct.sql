ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_user_id_User_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
