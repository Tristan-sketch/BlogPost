import { getDb } from ".";

export type Blog = {
  id: number;
  name: string;
  theme: string;
  text: string;
  createdAt: string;
  authorId: number;
  authorName: string;
};

export type Comment = {
  id: number;
  text: string;
  createdAt: string;
  blogId: number;
  authorId: number;
  authorName: string;
};

const selectBlog = `
  SELECT b.id, b.name, b.theme, b.text, b.created_at AS createdAt,
         b.author_id AS authorId, u.username AS authorName
  FROM blogs b JOIN users u ON u.id = b.author_id
`;

const selectComment = `
  SELECT c.id, c.text, c.created_at AS createdAt, c.blog_id AS blogId,
         c.author_id AS authorId, u.username AS authorName
  FROM comments c JOIN users u ON u.id = c.author_id
`;

export function getBlogs() {
  return getDb()
    .prepare(`${selectBlog} ORDER BY b.created_at DESC`)
    .all() as unknown as Blog[];
}

export function getBlogsByAuthor(authorId: number) {
  return getDb()
    .prepare(`${selectBlog} WHERE b.author_id = ? ORDER BY b.created_at DESC`)
    .all(authorId) as unknown as Blog[];
}

export function getBlog(id: number) {
  return getDb().prepare(`${selectBlog} WHERE b.id = ?`).get(id) as
    | Blog
    | undefined;
}

export function getComments(blogId: number) {
  return getDb()
    .prepare(`${selectComment} WHERE c.blog_id = ? ORDER BY c.created_at`)
    .all(blogId) as unknown as Comment[];
}

export function getComment(id: number) {
  return getDb().prepare(`${selectComment} WHERE c.id = ?`).get(id) as
    | Comment
    | undefined;
}
