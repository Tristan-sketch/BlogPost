import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ClerkProvider, UserButton, SignedIn, SignedOut, SignInButton, useUser } from '@clerk/nextjs'
import { currentUser } from "@clerk/nextjs/server";
import { Github, Instagram } from "lucide-react";
import { userInfo } from "os";
import { blogSchema, commentSchema } from "@/db/schema";
import { Name } from 'drizzle-orm';
import {env} from "@/env"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Why??",
  description: "Created by Tristan Hartenstein",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await currentUser();
  const userId = user?.id
  const userName = user?.username

  return (
    <ClerkProvider publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body>
          <nav className=" p-4 w-screen bg-gradient-to-r from-sky-500 to-pink-500">
            <Link className="text-xl p-4 m-4 rounded-md text-white hover:bg-white hover:text-sky-500" href="./">
              Homepage          
            </Link>
            <Link className="text-xl p-4 m-4 rounded-md text-white hover:bg-white hover:text-blue-500" href="/blog">
              Blog Post
            </Link>
            {user !== null && <Link className="text-xl p-4 m-4 rounded-md text-white hover:bg-white hover:text-indigo-500" href="/personal">
              Personal
            </Link>}
            
            <div className="float-right text-xl p-1 ">
              <SignedOut>
                
                <SignInButton />

              </SignedOut>

              <SignedIn>

                <UserButton/>

              </SignedIn >
            </div>
          </nav>
          <div className="p-10">
            {children}
          </div>
          <footer className="w-screen bottom-0 p-2 fixed flex justify-between items-center bg-gradient-to-r from-sky-500 to-pink-500">

            {user !== null ?  (<div className="text-xl p-1 rounded-md text-white w-1/3">
              Nice to see you again {userName} :D 

            </div >) : (<div className="text-xl p-1 rounded-md text-white w-1/3">
              Log in now !!!
            </div>)}

            <div className="flex-grow flex justify-center border rounded-full bg-white w-1/3">
              <p className="text-2xl font-bold m-2 text-purple-500 border-white bg-white justify-center">
                Y
              </p>              
            </div>

            <div className="flex w-1/3 justify-end">
              <div className="text-xl p-1 rounded-md text-white hover:bg-white hover:text-pink-500">
                <a href="https://github.com/Tristan-Hartenstein/BlogPost" target="_blank" rel="noopener noreferrer">
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
    </ClerkProvider>
  );
}

