"use server"

import { equal } from "assert";
import { Name, eq } from "drizzle-orm";
import { blogSchema, commentSchema } from "./schema";
import { db } from ".";



export async function showTaskBlog(blogId: number) {
  return await db.select().from(blogSchema).where(eq(blogSchema.id, blogId));
}

export async function showTaskComment(blogId: number) {
  return await db.select().from(commentSchema).where(eq(commentSchema.blogId, blogId));
}



export  async function dbInsertcomment(name: string,  blogId: number, clerkId: string, clerkName: string | null) {
  await db.insert(commentSchema).values({name, blogId, clerkId, clerkName});
}

export async function dbDeletecomment(id: number) {
  await db.delete(commentSchema).where(eq(commentSchema.id, id));
}

export async function dbDeleteblog(blogId: number) {
  await db.delete(blogSchema).where(eq(blogSchema.id, blogId))

}


export async function dbInsertblog(name: string, theme:string, text: string, clerkId: string, clerkName: string | null) {
  await db.insert(blogSchema).values({name,theme, text, clerkId, clerkName})
}




export async function dbEditcomment(name: string, blogId: number, comment_id: number) {
   await db.update(commentSchema).set({name}).where(eq(commentSchema.id, comment_id));
}

export async function dbGetcomment(comment_id: number) {
   return (await db.select().from(commentSchema).where(eq(commentSchema.id, comment_id))) [0];
}




export async function dbEditblog(name: string, text: string, blogId: number) {
   await db.update(blogSchema).set({name, text}).where(eq(blogSchema.id, blogId));
}

export async function dbGetblog(blogId: number) {
  return await db.select().from(blogSchema).where(eq(blogSchema.id, blogId));
}
