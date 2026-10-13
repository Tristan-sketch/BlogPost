CREATE TABLE IF NOT EXISTS "blog" (
	"blog_id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"theme" varchar,
	"text" varchar,
	"release_date" timestamp DEFAULT now() NOT NULL,
	"clerk_id" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment" (
	"comment_id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"release_date" timestamp DEFAULT now() NOT NULL,
	"blog_id" integer,
	"clerk_id" varchar
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_blog_id_blog_blog_id_fk" FOREIGN KEY ("blog_id") REFERENCES "blog"("blog_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
