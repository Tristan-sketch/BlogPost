import Link from "next/link";
import { PencilLine } from "lucide-react";
import { getBlogs } from "@/db/queries";
import { requireUser } from "@/lib/auth";
import { formatDate } from "@/lib/format";
import { ThemeIcon } from "@/lib/themes";
import DeleteBlog from "./delete_blog";

export default function AllBlogs() {
  const user = requireUser();
  const blogs = getBlogs();

  return (
    <main className="flex items-center p-2 flex-col w-full">
      <div className="flex w-3/4">
        <p className="text-violet-600 text-3xl w-1/2 font-bold">Blogs</p>
        <Link className="w-1/2 text-2xl border-gray-400 rounded-md border text-center hover:border-violet-600 hover:bg-white bg-violet-600 hover:text-violet-600 text-white" href="/blog/addblog">
          Create Blog
        </Link>
      </div>

      <div className="flex items-center flex-col m-4 h-96 overflow-y-auto w-3/4 overflow-x-hidden border border-gray-400 p-3 py-8 rounded-md">
        {blogs.length === 0 && <p className="text-gray-500">No blogs yet. Write the first one!</p>}

        {blogs.map((blog) => (
          <div className="text-gray-700 m-3 border-gray-400 rounded-md border w-full hover:bg-violet-100" key={blog.id}>
            <div className="w-full justify-between flex">
              <p className="float-right m-2 text-white bg-violet-400 rounded-md p-2">
                {blog.authorName}
              </p>

              <Link href={`/blog/${blog.id}`} className="m-3 float-left flex-grow text-2xl">
                {blog.name}
              </Link>

              <div className="float-right m-2 hover:text-white hover:bg-violet-600 rounded-md p-2 text-gray-400">
                <ThemeIcon theme={blog.theme} />
              </div>
              {blog.authorId === user.id && (
                <div>
                  <Link href={`/blog/editblog/${blog.id}`} className="float-right m-2 hover:text-white hover:bg-violet-600 text-gray-400 rounded-md p-2">
                    <PencilLine />
                  </Link>
                  <div className="float-right m-2 hover:bg-red-400 hover:text-white rounded-md text-gray-400 p-2">
                    <DeleteBlog blogId={blog.id} />
                  </div>
                </div>
              )}
            </div>
            <p className="m-1 p-1 w-full flex-grow flex">
              <Link href={`/blog/${blog.id}`} className="flex-grow w-full">
                am {formatDate(blog.createdAt)} veröffentlicht
              </Link>
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
