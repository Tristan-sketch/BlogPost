import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Github, Instagram, LogOut } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { logout } from "./actions/auth";

export const metadata: Metadata = {
  title: "Why??",
  description: "Created by Tristan Hartenstein",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = getCurrentUser();

  return (
    <html lang="en">
      <body>
        <nav className="p-4 w-screen bg-gradient-to-r from-sky-500 to-pink-500 flex items-center">
          <Link className="text-xl p-4 m-4 rounded-md text-white hover:bg-white hover:text-sky-500" href="/">
            Homepage
          </Link>
          <Link className="text-xl p-4 m-4 rounded-md text-white hover:bg-white hover:text-blue-500" href="/blog">
            Blog Post
          </Link>
          {user && (
            <Link className="text-xl p-4 m-4 rounded-md text-white hover:bg-white hover:text-indigo-500" href="/personal">
              Personal
            </Link>
          )}

          <div className="ml-auto flex items-center text-xl">
            {user ? (
              <>
                <span className="text-white p-2">{user.username}</span>
                <form action={logout}>
                  <button className="p-2 rounded-md text-white hover:bg-white hover:text-pink-500" title="Sign out">
                    <LogOut />
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link className="p-2 m-1 rounded-md text-white hover:bg-white hover:text-pink-500" href="/login">
                  Sign in
                </Link>
                <Link className="p-2 m-1 rounded-md text-white hover:bg-white hover:text-pink-500" href="/register">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
        <div className="p-10 pb-24">
          {children}
        </div>
        <footer className="w-screen bottom-0 p-2 fixed flex justify-between items-center bg-gradient-to-r from-sky-500 to-pink-500">
          <div className="text-xl p-1 rounded-md text-white w-1/3">
            {user ? `Nice to see you again ${user.username} :D` : "Log in now !!!"}
          </div>

          <div className="flex-grow flex justify-center border rounded-full bg-white w-1/3">
            <p className="text-2xl font-bold m-2 text-purple-500 border-white bg-white justify-center">
              Y
            </p>
          </div>

          <div className="flex w-1/3 justify-end">
            <div className="text-xl p-1 rounded-md text-white hover:bg-white hover:text-pink-500">
              <a href="https://github.com/Tristan-sketch/BlogPost" target="_blank" rel="noopener noreferrer">
                <Github />
              </a>
            </div>
            <div className="text-xl p-1 rounded-md text-white hover:bg-white hover:text-pink-500">
              <a href="https://www.instagram.com/tr_istan2034/" target="_blank" rel="noopener noreferrer">
                <Instagram />
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
