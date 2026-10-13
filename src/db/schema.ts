import { sql } from "drizzle-orm";
import {
  serial,
  text,
  timestamp,
  pgTable,
  varchar,
  integer,
  date,
  uuid,
} from "drizzle-orm/pg-core";



export  type Blog =  typeof blogSchema.$inferSelect;

export const blogSchema = pgTable("blog", {
  id: serial("blog_id").primaryKey(),
  name: varchar("name"),
  theme: varchar("theme"),
  text: varchar("text"),
  Release: timestamp("release_date", { mode: "date"})
    .notNull()
    .default(sql`now()`),
  clerkId: varchar("clerk_id"),
  clerkName: varchar("clerk_name")
});

export const commentSchema = pgTable("comment", {
  id: serial("comment_id").primaryKey(),
  name: varchar("name"),
  Release: timestamp("release_date", { mode: "date"})
    .notNull() 
    .default(sql`now()`),
  blogId:  integer("blog_id").references(()=>blogSchema.id, { onDelete: "cascade"}),
  clerkId: varchar("clerk_id"),
  clerkName: varchar("clerk_name")
});