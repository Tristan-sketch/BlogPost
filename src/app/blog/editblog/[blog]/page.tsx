import { notFound } from "next/navigation";
import { updateBlog } from "@/app/actions/blog";
import { getBlog } from "@/db/queries";
import { requireUser } from "@/lib/auth";

type Props = {
  params: {
    blog: string;
  };
};

export default function EditBlog({ params }: Props) {
  const user = requireUser();
  const blog = getBlog(Number(params.blog));
  if (!blog || blog.authorId !== user.id) notFound();

  return (
    <main className="flex items-center p-4 flex-col">
      <div className="border border-gray-400 p-4 m-4 text-gray-700 rounded-md shadow-md">
        <form action={updateBlog.bind(null, blog.id)}>
          <label className="font-bold" htmlFor="name">Name</label>
          <br />
          <input
            id="name"
            name="name"
            required
            maxLength={200}
            defaultValue={blog.name}
            className="p-1 border-gray-400 border rounded-md"
          />
          <br />
          <label className="font-bold" htmlFor="text">Text</label>
          <br />
          <textarea
            id="text"
            name="text"
            required
            maxLength={10000}
            defaultValue={blog.text}
            className="p-1 border-gray-400 border rounded-md flex h-32 resize-none"
          />
          <br />
          <button className="m-2 hover:border-violet-600 hover:text-violet-600 rounded-md border hover:bg-white bg-violet-600 text-white p-2 w-40">
            Update Blog
          </button>
        </form>
      </div>
    </main>
  );
}
