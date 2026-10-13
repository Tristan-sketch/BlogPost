
import { showTaskBlog } from "@/db/actions"
import { blogSchema } from "@/db/schema";
import Link from "next/link";
import { db } from "@/db/index";
import Deleteblog from "@/app/blog/delete_blog";
import { PencilLine } from "lucide-react";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Dumbbell } from "lucide-react";
import { BookMarked } from "lucide-react";
import { Beef } from "lucide-react";
import { Users } from "lucide-react";
import { Ellipsis } from "lucide-react";



type Props = {
  params: {
    id: number;
  }
}

import React from 'react';
import { SignOutButton } from "@clerk/nextjs";


export default async function allBlogs({ params }: Props) {

  const user = await currentUser();
  const userId = user?.id;
  const blogs = await db.select().from(blogSchema);

  const mapThemeToIcon = (theme: string | null) => {
    switch (theme) {
      case 'Dumbbell':
        return <Dumbbell />;
      case 'BookMarked':
        return <BookMarked />;
      case 'Beef':
        return <Beef />;
      case 'Users':
        return <Users />;
      case 'Ellipsis':
        return <Ellipsis />;
      default:
        return <Ellipsis />;
    }
  };

  if (!userId) {
    return (
      <div className="flex justify-center items-center h-screen">
        Just Sign In
      </div>
    );
  } else {
    return (
      <main className="flex flex-col items-center p-4 w-full">
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <p className='text-violet-600 text-3xl font-semibold'>Account from {user.username}</p>
            <Link className="border text-white bg-violet-600 hover:bg-white hover:text-violet-600 hover:border-violet-600 rounded-md py-2 px-4" href="/blog/addblog">
              Create Blog
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="w-full md:w-1/2 bg-white rounded-md shadow-md p-4 mb-6 md:mb-0">
              <h2 className="text-violet-600 text-2xl font-semibold mb-4">User Information</h2>
              <p className="text-gray-700"><strong>Username:</strong> {user.username}</p>
              <p className="text-gray-700"><strong>First Name:</strong> {user.firstName}</p>
              <p className="text-gray-700"><strong>Last Name:</strong> {user.lastName}</p>
              <div className=" border rounded-md bg-red-400 hover:bg-white hover:border-red-400 hover:text-red-400 text-center px-2 p-1 m-2 text-white w-1/4 self-center">
                <SignOutButton />
              </div>

            </div>

            <div className="w-full md:w-1/2 bg-white rounded-md shadow-md p-4">
              <h2 className="text-violet-600 text-2xl font-semibold mb-4">Your Blogs</h2>
              <div className="flex flex-col space-y-4 overflow-y-auto max-h-96">
                {blogs.map(blog => {
                  const releaseDateBlog = new Date(blog.Release);
                  const formattedDateBlog = releaseDateBlog.toLocaleDateString('de-DE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  });

                return(
                  blog.clerkId === userId && (
                    <div className=" text-gray-700 border border-gray-300 rounded-md p-2 hover:bg-violet-100" key={blog.id}>
                      <div className="flex w-full flex-grow">
                        <Link href={`/blog/${blog.id}`} className="flex-grow text-xl p-1">
                          {blog.name}
                        </Link>
                        <div className="flex items-center space-x-2">
                          <div className="text-gray-400 hover:text-white hover:bg-violet-600 rounded-md p-1">
                            {mapThemeToIcon(blog.theme)}
                          </div>
                          <Link href={`/blog/editblog/${blog.id}`} className="text-gray-400 hover:text-white hover:bg-violet-600 rounded-md p-1">
                            <PencilLine />
                          </Link>
                          <div className="text-gray-400 hover:text-white hover:bg-red-400 rounded-md p-1">
                            <Deleteblog blogId={blog.id} />
                          </div>
                        </div>
                      </div>
                      <p className="p-1 clear-left flex flex-grow w-full">
                        von dir am {formattedDateBlog} veröffentlicht
                      </p>
                    </div>
                  )
                )})}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
