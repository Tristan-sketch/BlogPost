import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";

// The database is a single SQLite file. It is created on first use.
const databasePath =
  process.env.DATABASE_PATH ?? path.join(process.cwd(), "data", "blog.db");

const schema = `
  CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    username      TEXT NOT NULL UNIQUE COLLATE NOCASE,
    first_name    TEXT,
    last_name     TEXT,
    password_hash TEXT NOT NULL,
    created_at    TEXT NOT NULL
  );

  -- id is the SHA-256 hash of the session token stored in the cookie.
  CREATE TABLE IF NOT EXISTS sessions (
    id         TEXT PRIMARY KEY,
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS blogs (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    theme      TEXT NOT NULL,
    text       TEXT NOT NULL,
    created_at TEXT NOT NULL,
    author_id  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS comments (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    text       TEXT NOT NULL,
    created_at TEXT NOT NULL,
    blog_id    INTEGER NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
    author_id  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS comments_blog_id ON comments(blog_id);
  CREATE INDEX IF NOT EXISTS blogs_author_id ON blogs(author_id);
`;

function openDatabase() {
  fs.mkdirSync(path.dirname(databasePath), { recursive: true });
  const db = new DatabaseSync(databasePath);
  db.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;");
  db.exec(schema);
  return db;
}

// Keep a single connection, also across hot reloads in development.
const globalForDb = globalThis as unknown as { db?: DatabaseSync };

export function getDb() {
  globalForDb.db ??= openDatabase();
  return globalForDb.db;
}
