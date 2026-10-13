"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { getBlog, getComment } from "@/db/queries";
import { requireUser } from "@/lib/auth";
import { isTheme } from "@/lib/themes";

// Returns the trimmed value, or null if it is empty or too long.
function text(formData: FormData, key: string, maxLength: number) {
  const value = String(formData.get(key) ?? "").trim();
  return value.length > 0 && value.length <= maxLength ? value : null;
}

export async function createBlog(formData: FormData) {
  const user = requireUser();
  const name = text(formData, "name", 200);
  const body = text(formData, "text", 10000);
  const theme = String(formData.get("theme"));
  if (!name || !body) return;

  getDb()
    .prepare("INSERT INTO blogs (name, theme, text, created_at, author_id) VALUES (?, ?, ?, ?, ?)")
    .run(name, isTheme(theme) ? theme : "Ellipsis", body, new Date().toISOString(), user.id);

  revalidatePath("/", "layout");
  redirect("/blog");
}

export async function updateBlog(blogId: number, formData: FormData) {
  const user = requireUser();
  const blog = getBlog(blogId);
  const name = text(formData, "name", 200);
  const body = text(formData, "text", 10000);
  if (!blog || blog.authorId !== user.id || !name || !body) return;

  getDb().prepare("UPDATE blogs SET name = ?, text = ? WHERE id = ?").run(name, body, blogId);

  revalidatePath("/", "layout");
  redirect("/blog");
}

export async function deleteBlog(blogId: number) {
  const user = requireUser();
  getDb().prepare("DELETE FROM blogs WHERE id = ? AND author_id = ?").run(blogId, user.id);
  revalidatePath("/", "layout");
}

export async function addComment(blogId: number, formData: FormData) {
  const user = requireUser();
  const body = text(formData, "text", 2000);
  if (!body || !getBlog(blogId)) return;

  getDb()
    .prepare("INSERT INTO comments (text, created_at, blog_id, author_id) VALUES (?, ?, ?, ?)")
    .run(body, new Date().toISOString(), blogId, user.id);

  revalidatePath(`/blog/${blogId}`);
}

export async function updateComment(commentId: number, formData: FormData) {
  const user = requireUser();
  const comment = getComment(commentId);
  const body = text(formData, "text", 2000);
  if (!comment || comment.authorId !== user.id || !body) return;

  getDb().prepare("UPDATE comments SET text = ? WHERE id = ?").run(body, commentId);

  revalidatePath(`/blog/${comment.blogId}`);
  redirect(`/blog/${comment.blogId}`);
}

export async function deleteComment(commentId: number) {
  const user = requireUser();
  const comment = getComment(commentId);
  if (!comment || comment.authorId !== user.id) return;

  getDb().prepare("DELETE FROM comments WHERE id = ?").run(commentId);
  revalidatePath(`/blog/${comment.blogId}`);
}
