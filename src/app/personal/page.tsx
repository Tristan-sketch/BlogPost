import Link from "next/link";
import { PencilLine } from "lucide-react";
import DeleteBlog from "@/app/blog/delete_blog";
import { getBlogsByAuthor } from "@/db/queries";
import { requireUser } from "@/lib/auth";
import { formatDate } from "@/lib/format";
import { ThemeIcon } from "@/lib/themes";
import { logout } from "../actions/auth";

export default function Personal() {
  const user = requireUser();
  const blogs = getBlogsByAuthor(user.id);

  return (
    <main className="flex flex-col items-center p-4 w-full">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <p className="text-violet-600 text-3xl font-semibold">Account from {user.username}</p>
          <Link className="border text-white bg-violet-600 hover:bg-white hover:text-violet-600 hover:border-violet-600 rounded-md py-2 px-4" href="/blog/addblog">
            Create Blog
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6">
          <div className="w-full md:w-1/2 bg-white rounded-md shadow-md p-4 mb-6 md:mb-0">
            <h2 className="text-violet-600 text-2xl font-semibold mb-4">User Information</h2>
            <p className="text-gray-700"><strong>Username:</strong> {user.username}</p>
            <p className="text-gray-700"><strong>First Name:</strong> {user.firstName ?? "-"}</p>
            <p className="text-gray-700"><strong>Last Name:</strong> {user.lastName ?? "-"}</p>
            <form action={logout}>
              <button className="border rounded-md bg-red-400 hover:bg-white hover:border-red-400 hover:text-red-400 text-center px-2 p-1 m-2 text-white">
                Sign out
              </button>
            </form>
          </div>

          <div className="w-full md:w-1/2 bg-white rounded-md shadow-md p-4">
            <h2 className="text-violet-600 text-2xl font-semibold mb-4">Your Blogs</h2>
            <div className="flex flex-col space-y-4 overflow-y-auto max-h-96">
              {blogs.length === 0 && <p className="text-gray-500">You have not written a blog yet.</p>}

              {blogs.map((blog) => (
                <div className="text-gray-700 border border-gray-300 rounded-md p-2 hover:bg-violet-100" key={blog.id}>
                  <div className="flex w-full flex-grow">
                    <Link href={`/blog/${blog.id}`} className="flex-grow text-xl p-1">
                      {blog.name}
                    </Link>
                    <div className="flex items-center space-x-2">
                      <div className="text-gray-400 hover:text-white hover:bg-violet-600 rounded-md p-1">
                        <ThemeIcon theme={blog.theme} />
                      </div>
                      <Link href={`/blog/editblog/${blog.id}`} className="text-gray-400 hover:text-white hover:bg-violet-600 rounded-md p-1">
                        <PencilLine />
                      </Link>
                      <div className="text-gray-400 hover:text-white hover:bg-red-400 rounded-md p-1">
                        <DeleteBlog blogId={blog.id} />
                      </div>
                    </div>
                  </div>
                  <p className="p-1 clear-left flex flex-grow w-full">
                    von dir am {formatDate(blog.createdAt)} veröffentlicht
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
