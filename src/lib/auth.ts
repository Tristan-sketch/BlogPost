import crypto from "node:crypto";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/db";

export const SESSION_COOKIE = "session";
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export type User = {
  id: number;
  username: string;
  firstName: string | null;
  lastName: string | null;
};

// Passwords are stored as "salt:hash" using scrypt.
export function hashPassword(password: string) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, 64);
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

export function verifyPassword(password: string, stored: string) {
  const [saltHex, hashHex] = stored.split(":");
  const expected = Buffer.from(hashHex, "hex");
  const actual = crypto.scryptSync(password, Buffer.from(saltHex, "hex"), expected.length);
  return crypto.timingSafeEqual(actual, expected);
}

// Only a hash of the token is stored, so a leaked database cannot be used to log in.
function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function createSession(userId: number) {
  const db = getDb();
  const token = crypto.randomBytes(32).toString("base64url");
  const expiresAt = Date.now() + SESSION_DURATION_MS;

  db.prepare("DELETE FROM sessions WHERE expires_at < ?").run(Date.now());
  db.prepare("INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)").run(
    hashToken(token),
    userId,
    expiresAt,
  );

  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export function deleteSession() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (token) {
    getDb().prepare("DELETE FROM sessions WHERE id = ?").run(hashToken(token));
  }
  cookies().delete(SESSION_COOKIE);
}

export const getCurrentUser = cache((): User | null => {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const row = getDb()
    .prepare(
      `SELECT u.id, u.username, u.first_name AS firstName, u.last_name AS lastName,
              s.expires_at AS expiresAt
       FROM sessions s JOIN users u ON u.id = s.user_id
       WHERE s.id = ?`,
    )
    .get(hashToken(token)) as (User & { expiresAt: number }) | undefined;

  if (!row || row.expiresAt < Date.now()) return null;
  return { id: row.id, username: row.username, firstName: row.firstName, lastName: row.lastName };
});

export function requireUser() {
  const user = getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
