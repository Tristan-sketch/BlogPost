"use server";

import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { createSession, deleteSession, hashPassword, verifyPassword } from "@/lib/auth";

export type AuthState = { error?: string };

function field(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function register(_state: AuthState, formData: FormData): Promise<AuthState> {
  const username = field(formData, "username");
  const password = String(formData.get("password") ?? "");
  const firstName = field(formData, "firstName") || null;
  const lastName = field(formData, "lastName") || null;

  if (!/^[a-zA-Z0-9_.-]{3,32}$/.test(username)) {
    return { error: "Username must be 3–32 characters (letters, numbers, _ . -)." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters long." };
  }

  const db = getDb();
  if (db.prepare("SELECT 1 FROM users WHERE username = ?").get(username)) {
    return { error: "This username is already taken." };
  }

  const { lastInsertRowid } = db
    .prepare(
      `INSERT INTO users (username, first_name, last_name, password_hash, created_at)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .run(username, firstName, lastName, hashPassword(password), new Date().toISOString());

  createSession(Number(lastInsertRowid));
  redirect("/blog");
}

export async function login(_state: AuthState, formData: FormData): Promise<AuthState> {
  const username = field(formData, "username");
  const password = String(formData.get("password") ?? "");

  const user = getDb()
    .prepare("SELECT id, password_hash AS passwordHash FROM users WHERE username = ?")
    .get(username) as { id: number; passwordHash: string } | undefined;

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { error: "Wrong username or password." };
  }

  createSession(user.id);
  redirect("/blog");
}

export async function logout() {
  deleteSession();
  redirect("/");
}
